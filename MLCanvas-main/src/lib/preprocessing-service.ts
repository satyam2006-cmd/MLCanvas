// src/lib/preprocessing-service.ts
export type CsvData = Record<string, any>[];

export type ProcessedData = {
  X: number[][];
  y: number[];
  featureNames: string[];
};

export type PreprocessingSummary = {
  originalRows: number;
  processedRows: number;
  originalColumns: number;
  processedColumns: number;
  droppedColumns: string[];
  encodedColumns: Record<string, string>;
  missingValues: Record<string, { before: number; after: number }>;
  problemType: "regression" | "binary" | "multiclass" | null;
};

// --- UTILITY FUNCTIONS ---

type ColumnType = "numeric" | "categorical" | "id" | "unknown";
type ColumnStats = {
  type: ColumnType;
  mean?: number;
  median?: number;
  mode?: string | number;
  missing: number;
  unique: number;
  isIdLike: boolean;
};

function isNumeric(value: unknown): boolean {
  if (value === null || value === undefined) return false;
  return !isNaN(Number(value)) && isFinite(Number(value));
}

function detectColumnType(values: unknown[]): ColumnType {
  const nonNullValues = values.filter(
    (v) => v !== null && v !== undefined && v !== "",
  );
  if (nonNullValues.length === 0) return "unknown";

  // Check if all non-null values are numbers
  const allNumeric = nonNullValues.every((val) => isNumeric(val));
  if (allNumeric) return "numeric";

  // Check if values look like IDs (mostly unique strings/numbers)
  const uniqueRatio = new Set(nonNullValues).size / nonNullValues.length;
  if (uniqueRatio > 0.9) return "id";

  return "categorical";
}

function getColumnStats(data: CsvData, column: string): ColumnStats {
  const values = data.map((row) => row[column]);
  const nonMissingValues = values.filter(
    (val) => val !== null && val !== undefined && val !== "",
  );

  if (nonMissingValues.length === 0) {
    return {
      type: "unknown",
      mean: 0,
      median: 0,
      missing: values.length,
      unique: 0,
      isIdLike: false,
    };
  }

  const type = detectColumnType(values);
  const uniqueValues = new Set(nonMissingValues);
  const missing = values.length - nonMissingValues.length;

  if (type === "numeric") {
    const numericValues = nonMissingValues.map(Number);
    const sorted = [...numericValues].sort((a, b) => a - b);
    const mean =
      numericValues.reduce((a, b) => a + b, 0) / numericValues.length;
    const median =
      sorted.length % 2 === 0
        ? (sorted[sorted.length / 2 - 1] + sorted[sorted.length / 2]) / 2
        : sorted[Math.floor(sorted.length / 2)];

    return {
      type,
      mean,
      median,
      missing,
      unique: uniqueValues.size,
      isIdLike: uniqueValues.size / data.length > 0.9,
    };
  } else {
    // For categorical or ID columns
    const counts = new Map<string | number, number>();
    let maxCount = 0;
    let mode: string | number | undefined = undefined;

    for (const val of nonMissingValues) {
      const key = String(val);
      const count = (counts.get(key) || 0) + 1;
      counts.set(key, count);

      if (count > maxCount) {
        maxCount = count;
        mode = isNumeric(val) ? Number(val) : key;
      }
    }

    return {
      type,
      mode,
      missing,
      unique: uniqueValues.size,
      isIdLike: type === "id" || uniqueValues.size / data.length > 0.9,
    };
  }
}

export function preprocessDataset(
  rawData: CsvData,
  selectedColumns: Record<string, boolean>,
  targetColumn: string,
): { processedData: CsvData; summary: PreprocessingSummary } {
  if (rawData.length === 0) {
    throw new Error("Input data is empty.");
  }

  // Create a deep copy of the data
  let data = JSON.parse(JSON.stringify(rawData)) as CsvData;
  const originalColumns = Object.keys(rawData[0] || {});

  // Initialize summary
  const summary: PreprocessingSummary = {
    originalRows: data.length,
    processedRows: 0,
    originalColumns: originalColumns.length,
    processedColumns: 0,
    droppedColumns: [],
    encodedColumns: {},
    missingValues: {},
    problemType: null,
  };

  console.log("[preprocessDataset] Starting column filtering", {
    selectedColumns,
    targetColumn,
    originalColumns,
  });

  // --- 1. Filter selected columns ---
  console.log(
    "[preprocessDataset] Raw selectedColumns:",
    JSON.stringify(selectedColumns, null, 2),
  );

  // Always include the target column even if not explicitly selected
  const columnsToKeep = [
    // Include all columns that are either:
    // 1. Explicitly selected (selectedColumns[col] === true) OR
    // 2. Is the target column
    ...Object.entries(selectedColumns)
      .filter(([col, keep]) => keep || col === targetColumn)
      .map(([col]) => col),
  ];

  // Remove duplicates (in case targetColumn was already included)
  const uniqueColumns = Array.from(new Set(columnsToKeep));

  console.log(
    "[preprocessDataset] Columns to keep after filtering:",
    uniqueColumns,
  );

  // Track dropped columns (columns in original but not in our keep list)
  summary.droppedColumns = originalColumns.filter(
    (col) => !uniqueColumns.includes(col),
  );
  console.log("[preprocessDataset] Dropped columns:", summary.droppedColumns);

  // Filter data to only keep selected columns
  data = data.map((row: Record<string, unknown>, index) => {
    const newRow: Record<string, unknown> = {};
    uniqueColumns.forEach((col) => {
      if (!(col in row)) {
        console.warn(
          `[preprocessDataset] Column '${col}' not found in row ${index}`,
        );
        return;
      }
      newRow[col] = row[col];
    });
    return newRow;
  });

  // --- 2. Handle missing values ---
  columnsToKeep.forEach((column) => {
    const stats = getColumnStats(data, column);

    // Count missing values before imputation
    const missingBefore = stats.missing;

    // Impute missing values based on column type
    data.forEach((row: Record<string, unknown>) => {
      if (
        row[column] === null ||
        row[column] === undefined ||
        row[column] === ""
      ) {
        if (column === targetColumn) {
          // For target column, we might want to drop rows with missing values
          // or handle differently based on problem type
          row[column] = null; // We'll handle this after determining problem type
        } else if (stats.type === "numeric") {
          row[column] = stats.median ?? 0;
        } else {
          row[column] = stats.mode ?? "Unknown";
        }
      }
    });

    // Count missing values after imputation
    const missingAfter = data.filter(
      (row: Record<string, unknown>) =>
        row[column] === null || row[column] === undefined || row[column] === "",
    ).length;

    // Update summary
    summary.missingValues[column] = {
      before: missingBefore,
      after: missingAfter,
    };

    // Track encoding
    if (stats.type === "categorical" && column !== targetColumn) {
      summary.encodedColumns[column] =
        stats.unique > 10 ? "LabelEncoder" : "OneHotEncoder";
    }
  });

  // --- 3. Handle target variable ---
  if (targetColumn) {
    // Remove rows with missing target values
    const initialCount = data.length;
    data = data.filter(
      (row: Record<string, unknown>) =>
        row[targetColumn] !== null &&
        row[targetColumn] !== undefined &&
        row[targetColumn] !== "",
    ) as CsvData;

    // Determine problem type
    const targetStats = getColumnStats(data, targetColumn);
    if (targetStats.type === "numeric") {
      summary.problemType = "regression";
    } else {
      // Check if binary or multiclass
      summary.problemType = targetStats.unique <= 2 ? "binary" : "multiclass";
    }

    // Update summary with target handling
    summary.processedRows = data.length;
    summary.droppedColumns = [
      ...summary.droppedColumns,
      ...Array(initialCount - data.length).fill(
        `(rows with missing ${targetColumn})`,
      ),
    ];
  }

  // --- 4. ENCODING: One-hot encode all non-target categoricals ---
  // Identify categorical columns (excluding target)
  const categoricalColumns = uniqueColumns.filter((col) => {
    if (col === targetColumn) return false;
    const stats = getColumnStats(data, col);
    return stats.type === "categorical";
  });

  // Build new processedData with one-hot encoding for categoricals
  let processedData: CsvData = [];
  for (const row of data) {
    let newRow: Record<string, any> = {};
    for (const col of uniqueColumns) {
      if (categoricalColumns.includes(col)) {
        // One-hot encode
        const uniqueVals = Array.from(new Set(data.map((r) => r[col])))
          .filter((v) => v !== null && v !== undefined && v !== "")
          .sort();
        if (uniqueVals.length <= 1) {
          newRow[`${col}_${uniqueVals[0] || "single_value"}`] = 0;
        } else if (uniqueVals.length === 2) {
          newRow[`${col}_${uniqueVals[0]}`] =
            row[col] === uniqueVals[0] ? 1 : 0;
        } else {
          for (let j = 1; j < uniqueVals.length; j++) {
            newRow[`${col}_${uniqueVals[j]}`] =
              row[col] === uniqueVals[j] ? 1 : 0;
          }
        }
      } else {
        newRow[col] = row[col];
      }
    }
    processedData.push(newRow);
  }

  summary.processedColumns =
    processedData.length > 0 ? Object.keys(processedData[0]).length : 0;

  return {
    processedData,
    summary,
  };
}

export function processDataForModel(
  rawData: CsvData,
  targetVariable: string,
  modelType: string,
  isSingleRow: boolean = false,
): ProcessedData {
  if (rawData.length === 0) {
    throw new Error("Input data is empty.");
  }

  let data = JSON.parse(JSON.stringify(rawData)); // Deep copy
  const allHeaders = Object.keys(data[0]);
  const numericFeatures: string[] = [];
  const categoricalFeatures: string[] = [];

  // Separate features and handle missing values
  for (const header of allHeaders) {
    if (header === targetVariable) continue;

    const firstValue = data[0][header];
    const isNumeric = typeof firstValue === "number";

    if (isNumeric) {
      numericFeatures.push(header);
      const stats = getColumnStats(data, header);
      const mean = stats.mean ?? 0;
      data.forEach((row: Record<string, unknown>) => {
        if (
          row[header] === null ||
          row[header] === undefined ||
          row[header] === ""
        ) {
          row[header] = mean;
        }
      });
    } else {
      categoricalFeatures.push(header);
      const stats = getColumnStats(data, header);
      const mode = stats.mode ?? "";
      data.forEach((row: Record<string, unknown>) => {
        if (
          row[header] === null ||
          row[header] === undefined ||
          row[header] === ""
        ) {
          row[header] = mode;
        }
      });
    }
  }

  // --- 2. ROBUST ONE-HOT ENCODING ---
  const finalFeatureNames: string[] = [...numericFeatures];
  const encodedCategoricalData: number[][] = Array(data.length)
    .fill(0)
    .map(() => []);

  for (const col of categoricalFeatures) {
    const uniqueValues = [...new Set(rawData.map((r) => r[col]))]
      .filter((v) => v !== null && v !== undefined && v !== "")
      .sort();

    if (uniqueValues.length <= 1) {
      // If only one category, it provides no info, but we create a column of zeros to maintain feature dimension
      finalFeatureNames.push(`${col}_${uniqueValues[0] || "single_value"}`);
      for (let i = 0; i < data.length; i++) {
        encodedCategoricalData[i].push(0);
      }
    } else if (uniqueValues.length === 2) {
      // For binary, just encode one category
      finalFeatureNames.push(`${col}_${uniqueValues[0]}`);
      for (let i = 0; i < data.length; i++) {
        encodedCategoricalData[i].push(
          data[i][col] === uniqueValues[0] ? 1 : 0,
        );
      }
    } else {
      // Standard one-hot, dropping first category to avoid multicollinearity
      for (let j = 1; j < uniqueValues.length; j++) {
        finalFeatureNames.push(`${col}_${uniqueValues[j]}`);
        for (let i = 0; i < data.length; i++) {
          encodedCategoricalData[i].push(
            data[i][col] === uniqueValues[j] ? 1 : 0,
          );
        }
      }
    }
  }

  // --- 3. BUILD THE FINAL FEATURE MATRIX 'X' ---
  const X: number[][] = data.map((row: Record<string, unknown>, i: number) => {
    const numericRowPart = numericFeatures.map((col) => Number(row[col]));
    const categoricalRowPart = encodedCategoricalData[i];
    return [...numericRowPart, ...categoricalRowPart];
  });

  // --- 4. TARGET VARIABLE PROCESSING ---
  if (isSingleRow) {
    return { X, y: [], featureNames: finalFeatureNames };
  }

  const targetValuesSet = new Set(data.map((row) => row[targetVariable]));
  const isClassification =
    targetValuesSet.size <= 10 || typeof data[0][targetVariable] !== "number";

  let y: number[] = [];
  if (isClassification) {
    const sortedTargets = [...targetValuesSet].sort();
    const positiveClass = sortedTargets[sortedTargets.length - 1]; // Assume the "highest" value is positive
    y = data.map((row) => (row[targetVariable] === positiveClass ? 1 : 0));
  } else {
    y = data.map((row: Record<string, unknown>) => Number(row[targetVariable]));
  }

  if (X.length !== y.length) {
    throw new Error(
      "Mismatch between number of samples in X and y after processing.",
    );
  }
  if (X.length > 0 && X[0].length === 0 && allHeaders.length > 1) {
    throw new Error(
      "Preprocessing resulted in a dataset with 0 features. Check if all your columns have only a single unique value.",
    );
  }

  return { X, y, featureNames: finalFeatureNames };
}
