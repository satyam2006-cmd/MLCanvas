declare module 'ml-knn' {
  export default class KNN {
    constructor(trainingSet: number[][], trainingLabels: number[], options?: { k?: number });
    
    predict(testSet: number[][]): number[];
    
    predict(testSet: number[]): number;
  }
}
