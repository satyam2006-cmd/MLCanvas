declare module 'ml-cart' {
  export class DecisionTreeClassifier {
    constructor(options?: { maxDepth?: number });
    
    train(features: number[][], labels: number[]): void;
    
    predict(features: number[][]): number[];
    
    predict(features: number[]): number;
  }
}
