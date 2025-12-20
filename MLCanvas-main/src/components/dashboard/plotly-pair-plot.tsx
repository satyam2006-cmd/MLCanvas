'use client';

import React, { useContext, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { CsvDataContext } from '@/contexts/csv-data-context';
import { Skeleton } from '../ui/skeleton';

const Plot = dynamic(() => import('react-plotly.js'), { ssr: false });

export function PlotlyPairPlot() {
  const { csvData, isLoading } = useContext(CsvDataContext);

  const { dimensions } = useMemo(() => {
    if (!csvData || csvData.length === 0) {
      return { dimensions: [] };
    }

    const numericKeys = Object.keys(csvData[0]).filter(
      (key) => typeof csvData[0][key] === 'number'
    );

    const plotDimensions = numericKeys.map((key) => ({
      label: key,
      values: csvData.map((row) => row[key]),
    }));

    return { dimensions: plotDimensions };
  }, [csvData]);

  if (isLoading) {
    return <Skeleton className="h-96 w-full" />;
  }

  if (dimensions.length < 2) {
    return (
      <div className="flex h-96 w-full items-center justify-center text-muted-foreground">
        <p>
          At least two numeric columns are required to generate a pair plot.
        </p>
      </div>
    );
  }

  return (
    <Plot
      data={[
        {
          type: 'splom',
          dimensions: dimensions,
          diagonal: { visible: false },
          marker: {
            color: 'hsl(var(--primary))',
            size: 5,
            line: {
              color: 'white',
              width: 0.5,
            },
          },
        },
      ]}
      layout={{
        title: 'Pair Correlation Plot (Scatter Plot Matrix)',
        autosize: true,
        height: 800,
        xaxis: { automargin: true },
        yaxis: { automargin: true },
      }}
      useResizeHandler={true}
      className="h-full w-full"
    />
  );
}
