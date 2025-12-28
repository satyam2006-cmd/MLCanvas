'use client';

import React, { useContext, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { CsvDataContext } from '@/contexts/csv-data-context';
import { Skeleton } from '../ui/skeleton';

const Plot = dynamic(() => import('react-plotly.js'), { ssr: false });

function calculateCorrelationMatrix(data: Record<string, any>[]) {
  const numericKeys =
    data.length > 0
      ? Object.keys(data[0]).filter((key) => typeof data[0][key] === 'number')
      : [];
  const n = numericKeys.length;
  const correlationMatrix: number[][] = Array(n)
    .fill(0)
    .map(() => Array(n).fill(0));
  const means: { [key: string]: number } = {};
  const stdDevs: { [key: string]: number } = {};

  // Calculate means
  for (const key of numericKeys) {
    means[key] = data.reduce((acc, row) => acc + row[key], 0) / data.length;
  }

  // Calculate standard deviations
  for (const key of numericKeys) {
    stdDevs[key] = Math.sqrt(
      data.reduce((acc, row) => acc + Math.pow(row[key] - means[key], 2), 0) /
        (data.length -1)
    );
  }

  // Calculate correlation
  for (let i = 0; i < n; i++) {
    for (let j = i; j < n; j++) {
      const key1 = numericKeys[i];
      const key2 = numericKeys[j];
      const covariance =
        data.reduce(
          (acc, row) => acc + (row[key1] - means[key1]) * (row[key2] - means[key2]),
          0
        ) / (data.length -1);
      
      const correlation = covariance / (stdDevs[key1] * stdDevs[key2]);
      correlationMatrix[i][j] = correlation;
      correlationMatrix[j][i] = correlation;
    }
  }

  return { matrix: correlationMatrix, labels: numericKeys };
}

export function PlotlyCorrelationHeatmap() {
  const { csvData, isLoading } = useContext(CsvDataContext);

  const { matrix, labels } = useMemo(() => {
    if (!csvData || csvData.length === 0) {
      return { matrix: [], labels: [] };
    }
    return calculateCorrelationMatrix(csvData);
  }, [csvData]);

  if (isLoading) {
    return <Skeleton className="h-96 w-full" />;
  }

  if (labels.length === 0) {
    return (
      <div className="flex h-96 w-full items-center justify-center text-muted-foreground">
        <p>Upload a dataset with numeric columns to see a correlation matrix.</p>
      </div>
    );
  }

  return (
    <Plot
      data={[
        {
          z: matrix,
          x: labels,
          y: labels,
          type: 'heatmap',
          colorscale: 'Viridis',
          reversescale: true,
        },
      ]}
      layout={{
        title: {
          text: 'Correlation Heatmap',
          font: {
            size: 16,
            family: 'Arial',
          },
        },
        autosize: true,
        xaxis: { automargin: true },
        yaxis: { automargin: true },
      }}
      useResizeHandler={true}
      className="h-full w-full"
    />
  );
}
