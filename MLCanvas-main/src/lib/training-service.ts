import { Matrix, pseudoInverse } from "ml-matrix";
// import KNN from "ml-knn";
// import { DecisionTreeClassifier } from "ml-cart";
import { execFileSync } from "child_process";
import * as fs from "fs";
import * as os from "os";
import * as path from "path";

interface TrainingData {
  X_train: number[][];
  y_train: number[];
  X_test: number[][];
  y_test: number[];
}

interface ModelResult {
  loss: number[];
  accuracy: number;
  epochs: number[];
  coefficients: Record<string, number> | null;
}

interface LogisticRegressionOptions {
  numEpochs: number;
  learningRate: number;
}

interface KnnOptions {
  k: number;
}

interface DecisionTreeOptions {
  maxDepth: number;
}

/**
 * Trains a logistic regression model iteratively to track loss per epoch.
 *
 * @param data - The training and testing data.
 * @param options - The training options like epochs and learning rate.
 * @returns An object containing the loss history and final accuracy.
 */
export function trainLogisticRegression(
  data: TrainingData,
  options: LogisticRegressionOptions,
): Omit<ModelResult, "epochs"> & { lossHistory: number[]; weights: number[] } {
  const { X_train, y_train, X_test, y_test } = data;
  const { numEpochs, learningRate } = options;
  if (X_train.length === 0 || y_train.length === 0 || X_train[0].length === 0) {
    throw new Error(
      "Training data or features cannot be empty for Logistic Regression.",
    );
  }

  // Prefer Python-based training (scikit-learn) for more robust and familiar
  // ML tooling. We serialize the dataset to a temporary JSON file, invoke the
  // Python trainer, then parse its JSON output.
  const payload = {
    X_train,
    y_train,
    X_test,
    y_test,
    numEpochs,
    learningRate,
  };

  const tmpDir = os.tmpdir();
  const tmpPath = path.join(tmpDir, `mlcanvas_train_${Date.now()}.json`);
  fs.writeFileSync(tmpPath, JSON.stringify(payload));

  const originalScriptPath = path.resolve(
    process.cwd(),
    "src",
    "lib",
    "train_model.py",
  );
  const tmpScriptPath = path.join(
    tmpDir,
    `mlcanvas_train_script_${Date.now()}.py`,
  );

  try {
    // If the source script exists in the repo, copy it into tmp and execute
    if (fs.existsSync(originalScriptPath)) {
      const scriptContent = fs.readFileSync(originalScriptPath, {
        encoding: "utf8",
      });
      fs.writeFileSync(tmpScriptPath, scriptContent, { encoding: "utf8" });
    }

    const stdout = execFileSync("python", [tmpScriptPath, tmpPath], {
      encoding: "utf8",
      maxBuffer: 10 * 1024 * 1024,
    });
    const result = JSON.parse(stdout);
    // Expecting { lossHistory: number[], accuracy: number, weights: number[] }
    return {
      lossHistory: result.lossHistory || [],
      accuracy: typeof result.accuracy === "number" ? result.accuracy : 0,
      weights: result.weights || [],
    };
  } catch (err: any) {
    throw new Error(`Python training failed: ${err?.message || err}`);
  } finally {
    try {
      fs.unlinkSync(tmpPath);
    } catch {}
    try {
      if (fs.existsSync(tmpScriptPath)) fs.unlinkSync(tmpScriptPath);
    } catch {}
  }
}

export function trainLinearRegression(
  data: TrainingData,
  featureNames: string[],
) {
  const { X_train, y_train, X_test, y_test } = data;

  // Add intercept term to X_train
  const X_train_intercept = X_train.map((row) => [1, ...row]);
  const X_matrix = new Matrix(X_train_intercept);
  const y_matrix = new Matrix([y_train]).transpose();

  // Normal Equation: weights = (X^T * X)^-1 * X^T * y
  const XT = X_matrix.transpose();
  const XTX = XT.mmul(X_matrix);
  const XTX_inv = pseudoInverse(XTX);
  const XTY = XT.mmul(y_matrix);
  const weights_matrix = XTX_inv.mmul(XTY);

  const intercept = weights_matrix.get(0, 0);
  const model_coefficients = weights_matrix.to1DArray().slice(1);

  const coefficients: Record<string, number> = {
    _intercept: intercept,
  };
  featureNames.forEach((name, index) => {
    coefficients[name] = model_coefficients[index];
  });

  // Make predictions on test set
  const X_test_intercept = X_test.map((row) => [1, ...row]);
  const predictions = new Matrix(X_test_intercept)
    .mmul(weights_matrix)
    .to1DArray();

  // Calculate Mean Squared Error (MSE)
  let mse = 0;
  if (y_test.length > 0) {
    for (let i = 0; i < y_test.length; i++) {
      mse += Math.pow(y_test[i] - predictions[i], 2);
    }
    mse /= y_test.length;
  }

  // R-squared
  const y_mean =
    y_test.length > 0 ? y_test.reduce((a, b) => a + b, 0) / y_test.length : 0;
  const ss_tot = y_test.reduce((acc, y) => acc + Math.pow(y - y_mean, 2), 0);
  const ss_res = y_test.reduce(
    (acc, y, i) => acc + Math.pow(y - predictions[i], 2),
    0,
  );
  const r2 = ss_tot === 0 ? 1 : 1 - ss_res / ss_tot;

  return {
    loss: [mse],
    accuracy: r2, // R-squared
    epochs: [1],
    coefficients,
  };
}

/**
 * Trains a K-Nearest Neighbors model.
 *
 * @param data - The training and testing data.
 * @param options - The training options (k value).
 * @returns An object containing the final accuracy.
 */
export function trainKnn(data: TrainingData, options: KnnOptions): ModelResult {
  const { X_train, y_train, X_test, y_test } = data;
  const { k } = options;

  if (X_train.length === 0 || y_train.length === 0) {
    throw new Error("Training data cannot be empty for KNN.");
  }

  const knn = new KNN(X_train, y_train, { k });

  const predictions = knn.predict(X_test);

  let correctPredictions = 0;
  for (let i = 0; i < y_test.length; i++) {
    if (predictions[i] === y_test[i]) {
      correctPredictions++;
    }
  }
  const accuracy = y_test.length > 0 ? correctPredictions / y_test.length : 0;

  return {
    accuracy,
    loss: [1 - accuracy], // Using classification error as a stand-in for loss
    epochs: [1],
    coefficients: null, // No weights for KNN
  };
}

export function trainDecisionTree(
  data: TrainingData,
  options: DecisionTreeOptions,
): ModelResult {
  const { X_train, y_train, X_test, y_test } = data;
  const { maxDepth } = options;

  if (X_train.length === 0 || y_train.length === 0) {
    throw new Error("Training data cannot be empty for Decision Tree.");
  }

  // Validate input shapes to avoid runtime RangeErrors inside the library
  if (
    !Array.isArray(X_train) ||
    X_train.length === 0 ||
    !Array.isArray(X_train[0]) ||
    X_train[0].length === 0
  ) {
    throw new Error(
      "Invalid X_train shape for Decision Tree. Ensure features are a 2D numeric array.",
    );
  }
  if (!Array.isArray(y_train) || y_train.length !== X_train.length) {
    throw new Error(
      "y_train must be a 1D array with the same length as X_train for Decision Tree.",
    );
  }

  const classifier = new DecisionTreeClassifier({ maxDepth });
  classifier.train(X_train, y_train);

  const predictions = classifier.predict(X_test);

  let correct = 0;
  for (let i = 0; i < y_test.length; i++) {
    if (predictions[i] === y_test[i]) {
      correct++;
    }
  }
  const accuracy = y_test.length > 0 ? correct / y_test.length : 0;

  return {
    accuracy,
    loss: [1 - accuracy], // Classification error
    epochs: [1],
    coefficients: null, // No simple weights for DT
  };
}
