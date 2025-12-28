// Simplified training service - only provides code generation functionality
// No actual ML model training since we're providing code snippets to users

export interface TrainingData {
  X_train: number[][];
  y_train: number[];
  X_test: number[][];
  y_test: number[];
}

export interface ModelResult {
  loss: number[];
  accuracy: number;
  epochs: number[];
  coefficients: Record<string, number> | null;
}

export interface LogisticRegressionOptions {
  numEpochs: number;
  learningRate: number;
}

export interface KnnOptions {
  k: number;
}

export interface DecisionTreeOptions {
  maxDepth: number;
}

// Simplified function that returns mock results for code generation
export function trainLogisticRegression(
  data: TrainingData,
  options: LogisticRegressionOptions,
): Omit<ModelResult, "epochs"> & { lossHistory: number[]; weights: number[] } {
  // Return mock results for code generation purposes
  return {
    loss: [0.1, 0.08, 0.06, 0.05, 0.04],
    lossHistory: [0.1, 0.08, 0.06, 0.05, 0.04],
    accuracy: 0.85,
    weights: [0.5, -0.3, 0.2, 0.1],
    coefficients: {
      _intercept: 0.5,
      feature_1: -0.3,
      feature_2: 0.2,
      feature_3: 0.1,
    },
  };
}

// Simplified function that returns mock results for code generation
export function trainLinearRegression(
  data: TrainingData,
  featureNames: string[],
): ModelResult {
  // Return mock results for code generation purposes
  return {
    loss: [0.05],
    accuracy: 0.92, // R-squared
    epochs: [1],
    coefficients: {
      _intercept: 0.3,
      ...Object.fromEntries(featureNames.map((name, i) => [name, 0.1 * (i + 1)])),
    },
  };
}

// Simplified function that returns mock results for code generation
export function trainKnn(data: TrainingData, options: KnnOptions): ModelResult {
  // Return mock results for code generation purposes
  return {
    accuracy: 0.88,
    loss: [0.12], // Using classification error as a stand-in for loss
    epochs: [1],
    coefficients: null, // No weights for KNN
  };
}

// Simplified function that returns mock results for code generation
export function trainDecisionTree(
  data: TrainingData,
  options: DecisionTreeOptions,
): ModelResult {
  // Return mock results for code generation purposes
  return {
    accuracy: 0.90,
    loss: [0.10], // Classification error
    epochs: [1],
    coefficients: null, // No simple weights for DT
  };
}
