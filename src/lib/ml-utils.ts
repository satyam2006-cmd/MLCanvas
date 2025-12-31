import { CsvData } from './preprocessing-service';

export interface ColumnStats {
  type: 'numeric' | 'categorical';
  min?: number;
  max?: number;
  mean?: number;
  uniqueValues: number;
  missing: number;
  topValues?: Array<{ value: string; count: number }>;
}

export function detectColumnTypes(data: CsvData): Record<string, 'numeric' | 'categorical'> {
  if (!data || data.length === 0) return {};

  const firstRow = data[0];
  const columnTypes: Record<string, 'numeric' | 'categorical'> = {};

  for (const [key, value] of Object.entries(firstRow)) {
    // Try to convert to number
    const numValue = Number(value);
    const isNumeric = !isNaN(numValue) && value !== null && value !== '';

    // If all values in the column are numbers, consider it numeric
    const allNumeric = data.every(row => {
      const val = row[key];
      return val === null || val === '' || !isNaN(Number(val));
    });

    columnTypes[key] = allNumeric ? 'numeric' : 'categorical';
  }

  return columnTypes;
}

export function generateModelRecommendations(data: any) {
  if (!data) return [];

  const isClassification = Array.isArray(data.y_train) &&
    data.y_train.some((y: any) => Number.isInteger(y));

  const sampleSize = data.X_train?.length || 0;
  const featureCount = data.X_train?.[0]?.length || 0;

  if (isClassification) {
    if (sampleSize < 1000) {
      return [
        {
          name: 'Random Forest',
          description: 'Good for small to medium datasets with mixed feature types',
          code: `from sklearn.ensemble import RandomForestClassifier
model = RandomForestClassifier(n_estimators=100, random_state=42)`
        },
        {
          name: 'Gradient Boosting',
          description: 'Powerful ensemble method that works well on structured data',
          code: `from sklearn.ensemble import GradientBoostingClassifier
model = GradientBoostingClassifier(random_state=42)`
        }
      ];
    } else {
      return [
        {
          name: 'XGBoost',
          description: 'Optimized gradient boosting that works well on large datasets',
          code: `from xgboost import XGBClassifier
model = XGBClassifier(random_state=42, n_jobs=-1)`
        },
        {
          name: 'LightGBM',
          description: 'Fast, distributed, high performance gradient boosting',
          code: `from lightgbm import LGBMClassifier
model = LGBMClassifier(random_state=42, n_jobs=-1)`
        }
      ];
    }
  } else {
    // Regression
    if (featureCount > 100) {
      return [
        {
          name: 'Lasso Regression',
          description: 'Good for high-dimensional data with many features',
          code: `from sklearn.linear_model import Lasso
model = Lasso(alpha=0.1, random_state=42)`
        },
        {
          name: 'ElasticNet',
          description: 'Linear regression with combined L1 and L2 priors',
          code: `from sklearn.linear_model import ElasticNet
model = ElasticNet(random_state=42)`
        }
      ];
    } else {
      return [
        {
          name: 'XGBoost',
          description: 'Powerful for structured data with non-linear relationships',
          code: `from xgboost import XGBRegressor
model = XGBRegressor(random_state=42, n_jobs=-1)`
        },
        {
          name: 'Random Forest',
          description: 'Works well for medium-sized datasets with non-linear relationships',
          code: `from sklearn.ensemble import RandomForestRegressor
model = RandomForestRegressor(n_estimators=100, random_state=42, n_jobs=-1)`
        }
      ];
    }
  }
}

export function encodeCategoricalData(data: CsvData, columnTypes: Record<string, string>) {
  const encoders: Record<string, any> = {};
  const encodedData = JSON.parse(JSON.stringify(data));

  for (const [col, type] of Object.entries(columnTypes)) {
    if (type === 'categorical') {
      const uniqueValues = [...new Set(data.map(row => row[col]))];
      const valueToIndex = Object.fromEntries(uniqueValues.map((val, idx) => [val, idx]));

      encoders[col] = {
        type: 'label',
        classes: uniqueValues,
        transform: (val: any) => valueToIndex[val] ?? -1
      };

      // Apply encoding
      encodedData.forEach((row: any) => {
        row[col] = valueToIndex[row[col]] ?? -1;
      });
    }
  }

  return { data: encodedData, encoders };
}

export function normalizeData(data: CsvData, columnTypes: Record<string, string>) {
  const scalers: Record<string, any> = {};
  const normalizedData = JSON.parse(JSON.stringify(data));

  for (const [col, type] of Object.entries(columnTypes)) {
    if (type === 'numeric') {
      const values = data.map(row => parseFloat(row[col])).filter(v => !isNaN(v));
      if (values.length === 0) continue;

      const min = Math.min(...values);
      const max = Math.max(...values);
      const range = max - min || 1; // Avoid division by zero

      scalers[col] = {
        type: 'minmax',
        min,
        max,
        transform: (val: number) => (val - min) / range
      };

      // Apply normalization
      normalizedData.forEach((row: any) => {
        const numVal = parseFloat(row[col]);
        row[col] = isNaN(numVal) ? 0 : (numVal - min) / range;
      });
    }
  }

  return { data: normalizedData, scalers };
}

export function splitDataset(
  data: CsvData,
  targetColumn: string,
  testSize: number = 0.2
) {
  if (!data || data.length === 0) {
    return { X_train: [], X_test: [], y_train: [], y_test: [] };
  }

  // Shuffle data
  const shuffled = [...data].sort(() => Math.random() - 0.5);

  // Split into features and target
  const X = shuffled.map(row => {
    const features = { ...row };
    delete features[targetColumn];
    return Object.values(features).map(v => typeof v === 'number' ? v : 0);
  });

  const y = shuffled.map(row => row[targetColumn] || 0);

  // Split into train/test
  const splitIndex = Math.floor(data.length * (1 - testSize));

  return {
    X_train: X.slice(0, splitIndex),
    X_test: X.slice(splitIndex),
    y_train: y.slice(0, splitIndex),
    y_test: y.slice(splitIndex)
  };
}
