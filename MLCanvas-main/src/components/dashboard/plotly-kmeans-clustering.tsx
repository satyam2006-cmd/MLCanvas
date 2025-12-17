'use client';

import React, { useContext, useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import { CsvDataContext } from '@/contexts/csv-data-context';
import { Skeleton } from '../ui/skeleton';
import { PCA } from 'ml-pca';
import kmeans from 'ml-kmeans';
import { Label } from '../ui/label';
import { Slider } from '../ui/slider';
import { Button } from '../ui/button';

const Plot = dynamic(() => import('react-plotly.js'), { ssr: false });

const chartColors = [
  'hsl(var(--chart-1))',
  'hsl(var(--chart-2))',
  'hsl(var(--chart-3))',
  'hsl(var(--chart-4))',
  'hsl(var(--chart-5))',
  '#FF6347', '#4682B4', '#32CD32', '#FFD700', '#6A5ACD'
];


export function PlotlyKmeansClustering() {
  const { csvData, isLoading, numericFeatures } = useContext(CsvDataContext);
  const [numClusters, setNumClusters] = useState(3);
  const [key, setKey] = useState(0); // Used to force re-render

  const { projection, clusters, error } = useMemo(() => {
    if (!csvData || csvData.length === 0) {
      return { projection: null, clusters: null, error: null };
    }
    
    if (numericFeatures.length < 2) {
      return { projection: null, clusters: null, error: 'At least two numeric columns are required.' };
    }

    const numericData = csvData.map((row) =>
      numericFeatures.map((key) => {
        const val = row[key];
        return typeof val === 'number' && isFinite(val) ? val : 0;
      })
    );
    
    try {
      // Always run PCA to get a 2D representation for plotting
      const pca = new PCA(numericData);
      const proj = pca.predict(numericData, { nComponents: 2 }).to2DArray();
      
      // Run K-Means on the original high-dimensional data
      const ans = kmeans(numericData, numClusters, {seed: 42});
      
      return { projection: proj, clusters: ans.clusters, error: null };
    } catch (e) {
      console.error("K-Means/PCA Error:", e);
      const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred';
      return { projection: null, clusters: null, error: `Failed to compute clusters: ${errorMessage}` };
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [csvData, numericFeatures, key, numClusters]); // Rerun when data or K changes

  const handleRunClustering = () => {
    setKey(prev => prev + 1);
  }

  if (isLoading) {
    return <Skeleton className="h-96 w-full" />;
  }

  if (error) {
    return (
      <div className="flex h-96 w-full items-center justify-center text-muted-foreground">
        <p>
          {error}
        </p>
      </div>
    );
  }

  if (!projection || !clusters) {
     return (
      <div className="flex h-96 w-full items-center justify-center text-muted-foreground">
        <p>
          Could not perform clustering. Ensure you have sufficient numeric data.
        </p>
      </div>
    );
  }


  const traces = Array.from({ length: numClusters }, (_, i) => {
    const pointsInCluster = projection.filter((_, index) => clusters[index] === i);
    return {
      x: pointsInCluster.map(p => p[0]),
      y: pointsInCluster.map(p => p[1]),
      mode: 'markers',
      type: 'scatter',
      name: `Cluster ${i + 1}`,
      marker: { 
        color: chartColors[i % chartColors.length],
        size: 8 
      },
    };
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4 items-center rounded-lg border p-4">
        <div className="flex-1 space-y-3">
          <div className="flex justify-between">
            <Label htmlFor="num-clusters">Number of Clusters (K)</Label>
            <span className="text-sm text-muted-foreground font-mono">
              {numClusters}
            </span>
          </div>
          <Slider
            id="num-clusters"
            min={2}
            max={10}
            step={1}
            value={[numClusters]}
            onValueChange={(vals) => setNumClusters(vals[0])}
          />
        </div>
        <Button onClick={handleRunClustering}>
          Run Clustering
        </Button>
      </div>
      <Plot
        data={traces}
        layout={{
          title: `K-Means Clustering (K=${numClusters}) on PCA Projection`,
          autosize: true,
          height: 600,
          xaxis: { title: 'Principal Component 1' },
          yaxis: { title: 'Principal Component 2' },
          showlegend: true,
        }}
        useResizeHandler={true}
        className="h-full w-full"
      />
    </div>
  );
}
