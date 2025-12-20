'use client';

import React, { useContext, useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import { CsvDataContext } from '@/contexts/csv-data-context';
import { Skeleton } from '../ui/skeleton';
import { PCA } from 'ml-pca';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '../ui/label';

const Plot = dynamic(() => import('react-plotly.js'), { ssr: false });

const MAX_COMPONENTS = 5;

export function PlotlyPcaProjection() {
  const { csvData, isLoading, numericFeatures } = useContext(CsvDataContext);
  const [xAxisComponent, setXAxisComponent] = useState('1');
  const [yAxisComponent, setYAxisComponent] = useState('2');

  const { projection, availableComponents, error } = useMemo(() => {
    if (!csvData || csvData.length === 0) {
      return { projection: null, availableComponents: 0, error: null };
    }

    if (numericFeatures.length < 2) {
      return {
        projection: null,
        availableComponents: 0,
        error: 'At least two numeric columns are required for PCA projection.',
      };
    }

    const numericData = csvData.map((row) =>
      numericFeatures.map((key) => {
        const val = row[key];
        return typeof val === 'number' && isFinite(val) ? val : 0;
      })
    );

    try {
      const pca = new PCA(numericData);
      const componentsToGet = Math.min(MAX_COMPONENTS, numericFeatures.length);
      const proj = pca.predict(numericData, { nComponents: componentsToGet }).to2DArray();
      return {
        projection: proj,
        availableComponents: componentsToGet,
        error: null,
      };
    } catch (e) {
      console.error('PCA Error:', e);
      const errorMessage =
        e instanceof Error ? e.message : 'An unknown error occurred';
      return {
        projection: null,
        availableComponents: 0,
        error: `Failed to compute PCA: ${errorMessage}`,
      };
    }
  }, [csvData, numericFeatures]);

  if (isLoading) {
    return <Skeleton className="h-96 w-full" />;
  }

  if (error || !projection) {
    return (
      <div className="flex h-96 w-full items-center justify-center text-muted-foreground">
        <p>
          {error ||
            'Could not perform PCA. Ensure you have at least two valid numeric columns.'}
        </p>
      </div>
    );
  }

  const componentOptions = Array.from(
    { length: availableComponents },
    (_, i) => (i + 1).toString()
  );
  
  const xIndex = parseInt(xAxisComponent, 10) - 1;
  const yIndex = parseInt(yAxisComponent, 10) - 1;

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4 items-center rounded-lg border p-4">
        <div className="flex-1 space-y-2">
          <Label>X-Axis Component</Label>
          <Select value={xAxisComponent} onValueChange={setXAxisComponent}>
            <SelectTrigger>
              <SelectValue placeholder="Select Component" />
            </SelectTrigger>
            <SelectContent>
              {componentOptions.map((val) => (
                <SelectItem key={`x-${val}`} value={val} disabled={val === yAxisComponent}>
                  Principal Component {val}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex-1 space-y-2">
          <Label>Y-Axis Component</Label>
          <Select value={yAxisComponent} onValueChange={setYAxisComponent}>
            <SelectTrigger>
              <SelectValue placeholder="Select Component" />
            </SelectTrigger>
            <SelectContent>
              {componentOptions.map((val) => (
                <SelectItem key={`y-${val}`} value={val} disabled={val === xAxisComponent}>
                  Principal Component {val}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <Plot
        data={[
          {
            x: projection.map((p) => p[xIndex]),
            y: projection.map((p) => p[yIndex]),
            mode: 'markers',
            type: 'scatter',
            marker: {
              color: 'hsl(var(--primary))',
              size: 8,
            },
          },
        ]}
        layout={{
          title: `PCA Projection (PC${xAxisComponent} vs PC${yAxisComponent})`,
          autosize: true,
          height: 600,
          xaxis: { title: `Principal Component ${xAxisComponent}` },
          yaxis: { title: `Principal Component ${yAxisComponent}` },
        }}
        useResizeHandler={true}
        className="h-full w-full"
      />
    </div>
  );
}
