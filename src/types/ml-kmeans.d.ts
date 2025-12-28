declare module 'ml-kmeans' {
  interface KMeansResult {
    clusters: number[];
    centroids: { centroid: number[]; size: number }[];
    converged: boolean;
    iterations: number;
  }

  function kmeans(
    data: number[][],
    k: number,
    options?: {
      maxIterations?: number;
      tolerance?: number;
      withIterations?: boolean;
      initialization?: 'kmeans++' | 'random' | number[][];
      seed?: number;
    }
  ): KMeansResult;

  export = kmeans;
}
