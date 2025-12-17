export type CsvData = Record<string, any>[];

export type ProcessingSummary = {
  originalRows: number;
  finalRows: number;
  duplicatesRemoved: number;
  columnsDropped: string[];
  columnsEncoded: Array<{
    column: string;
    encodingType: 'one-hot' | 'label';
    uniqueValues: number;
  }>;
  missingValueStrategy: Record<string, 'median' | 'unknown'>;
  finalFeatures: string[];
  problemType: 'classification' | 'regression';
};

export type ProcessedDataset = {
  data: number[][];
  featureNames: string[];
  targetColumn: number[];
  summary: ProcessingSummary;
};

function getMedian(values: number[]): number {
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 0 
    ? (sorted[mid - 1] + sorted[mid]) / 2 
    : sorted[mid];
}

function detectColumnType(values: any[]): 'numeric' | 'categorical' {
  const nonNullValues = values.filter(v => v !== null && v !== undefined && v !== '');
  if (nonNullValues.length === 0) return 'categorical';
  
  const numericCount = nonNullValues.filter(v => !isNaN(Number(v)) && isFinite(Number(v))).length;
  return numericCount / nonNullValues.length > 0.8 ? 'numeric' : 'categorical';
}

function labelEncode(values: string[]): number[] {
  const uniqueValues = [...new Set(values)].sort();
  const labelMap: Record<string, number> = {};
  uniqueValues.forEach((value, index) => {
    labelMap[value] = index;
  });
  return values.map(v => labelMap[v] || 0);
}

export function preprocessDataset(
  rawData: CsvData,
  targetVariable: string
): ProcessedDataset {
  if (rawData.length === 0) {
    throw new Error("Input data is empty.");
  }

  const originalRows = rawData.length;
  let data = JSON.parse(JSON.stringify(rawData)); // Deep copy

  // 1. Remove duplicate rows
  const uniqueRows = new Set(data.map((row: any) => JSON.stringify(row)));
  data = Array.from(uniqueRows).map(rowStr => JSON.parse(rowStr));
  const duplicatesRemoved = originalRows - data.length;

  // 2. Separate features and target
  const allColumns = Object.keys(data[0]);
  const featureColumns = allColumns.filter(col => col !== targetVariable);

  // 3. Analyze and process each column
  const summary: ProcessingSummary = {
    originalRows,
    finalRows: data.length,
    duplicatesRemoved,
    columnsDropped: [],
    columnsEncoded: [],
    missingValueStrategy: {},
    finalFeatures: [],
    problemType: 'classification'
  };

  const processedFeatures: number[][] = [];
  const finalFeatureNames: string[] = [];

  for (const column of featureColumns) {
    const columnValues = data.map((row: any) => row[column]);
    const columnType = detectColumnType(columnValues);

    // Handle missing values
    const missingValueStrategy = columnType === 'numeric' ? 'median' : 'unknown';
    summary.missingValueStrategy[column] = missingValueStrategy;

    let filledValues: any[] = [];
    if (columnType === 'numeric') {
      const numericValues = columnValues
        .filter((v: any) => v !== null && v !== undefined && v !== '' && !isNaN(Number(v)))
        .map((v: any) => Number(v));
      
      const median = numericValues.length > 0 ? getMedian(numericValues) : 0;
      filledValues = columnValues.map((v: any) => 
        (v === null || v === undefined || v === '' || isNaN(Number(v))) ? median : Number(v)
      );
    } else {
      // Categorical - fill with "Unknown"
      filledValues = columnValues.map((v: any) => 
        (v === null || v === undefined || v === '') ? 'Unknown' : String(v)
      );
    }

    // Encode categorical columns
    if (columnType === 'categorical') {
      const uniqueValues = [...new Set(filledValues)];
      
      if (uniqueValues.length < 15) {
        // One-Hot Encode
        summary.columnsEncoded.push({
          column,
          encodingType: 'one-hot',
          uniqueValues: uniqueValues.length
        });

        // Create one-hot columns (drop first to avoid multicollinearity)
        const sortedValues = uniqueValues.sort();
        for (let i = 1; i < sortedValues.length; i++) {
          const value = sortedValues[i];
          const columnName = `${column}_${value}`;
          finalFeatureNames.push(columnName);
          
          const oneHotColumn = filledValues.map((v: any) => v === value ? 1 : 0);
          if (processedFeatures.length === 0) {
            oneHotColumn.forEach((val: number, idx: number) => {
              processedFeatures[idx] = [val];
            });
          } else {
            oneHotColumn.forEach((val: number, idx: number) => {
              processedFeatures[idx].push(val);
            });
          }
        }
      } else {
        // Label Encode
        summary.columnsEncoded.push({
          column,
          encodingType: 'label',
          uniqueValues: uniqueValues.length
        });

        const labelEncoded = labelEncode(filledValues as string[]);
        finalFeatureNames.push(column);
        
        if (processedFeatures.length === 0) {
          labelEncoded.forEach((val: number, idx: number) => {
            processedFeatures[idx] = [val];
          });
        } else {
          labelEncoded.forEach((val: number, idx: number) => {
            processedFeatures[idx].push(val);
          });
        }
      }
    } else {
      // Numeric column - keep as is
      finalFeatureNames.push(column);
      
      if (processedFeatures.length === 0) {
        filledValues.forEach((val: any, idx: number) => {
          processedFeatures[idx] = [val];
        });
      } else {
        filledValues.forEach((val: any, idx: number) => {
          processedFeatures[idx].push(val);
        });
      }
    }
  }

  // 4. Process target variable
  const targetValues = data.map((row: any) => row[targetVariable]);
  const targetType = detectColumnType(targetValues);
  
  let targetColumn: number[];
  if (targetType === 'numeric') {
    targetColumn = targetValues.map((v: any) => {
      const num = Number(v);
      return isNaN(num) ? 0 : num;
    });
    summary.problemType = 'regression';
  } else {
    // Classification - label encode target
    targetColumn = labelEncode(targetValues.map((v: any) => String(v)));
    summary.problemType = 'classification';
  }

  // 5. Finalize summary
  summary.finalFeatures = finalFeatureNames;
  summary.finalRows = processedFeatures.length;

  return {
    data: processedFeatures,
    featureNames: finalFeatureNames,
    targetColumn,
    summary
  };
}

export function generateModelSuggestions(summary: ProcessingSummary): string[] {
  if (summary.problemType === 'classification') {
    return ['Logistic Regression', 'Decision Tree', 'Random Forest'];
  } else {
    return ['Linear Regression', 'Random Forest Regressor'];
  }
}

export function generateColabCode(
  summary: ProcessingSummary,
  featureNames: string[]
): Record<string, string> {
  const featuresStr = featureNames.map(f => `'${f}'`).join(', ');
  
  const commonCode = `# ML Canvas - Google Colab Code
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, mean_squared_error, r2_score
import matplotlib.pyplot as plt

# Load the processed dataset
df = pd.read_csv('processed_dataset.csv')

# Display basic information
print("Dataset Shape:", df.shape)
print("\\nFirst 5 rows:")
print(df.head())
print("\\nDataset Info:")
df.info()

# Prepare features and target
X = df[[${featuresStr}]]
y = df['target']

# Split the data (80% train, 20% test)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

print(f"\\nTraining set shape: {X_train.shape}")
print(f"Test set shape: {X_test.shape}")
`;

  const snippets: Record<string, string> = {};

  if (summary.problemType === 'classification') {
    snippets['Logistic Regression'] = `${commonCode}
# Logistic Regression
from sklearn.linear_model import LogisticRegression

print("\\n=== LOGISTIC REGRESSION ===")

# Create and train the model
model = LogisticRegression(random_state=42, max_iter=1000)
model.fit(X_train, y_train)

# Make predictions
y_pred = model.predict(X_test)

# Calculate accuracy
accuracy = accuracy_score(y_test, y_pred)
print(f"Accuracy: {accuracy:.4f} ({accuracy*100:.2f}%)")

# Detailed classification report
from sklearn.metrics import classification_report, confusion_matrix
print("\\nClassification Report:")
print(classification_report(y_test, y_pred))

print("\\nConfusion Matrix:")
print(confusion_matrix(y_test, y_pred))
`;

    snippets['Decision Tree'] = `${commonCode}
# Decision Tree
from sklearn.tree import DecisionTreeClassifier, plot_tree

print("\\n=== DECISION TREE ===")

# Create and train the model
model = DecisionTreeClassifier(random_state=42, max_depth=5)
model.fit(X_train, y_train)

# Make predictions
y_pred = model.predict(X_test)

# Calculate accuracy
accuracy = accuracy_score(y_test, y_pred)
print(f"Accuracy: {accuracy:.4f} ({accuracy*100:.2f}%)")

# Feature importance
feature_importance = pd.DataFrame({
    'feature': X.columns,
    'importance': model.feature_importances_
}).sort_values('importance', ascending=False)

print("\\nTop 10 Important Features:")
print(feature_importance.head(10))

# Visualize the tree (optional)
plt.figure(figsize=(20, 10))
plot_tree(model, feature_names=X.columns, filled=True, rounded=True, fontsize=8)
plt.title("Decision Tree Visualization")
plt.show()
`;

    snippets['Random Forest'] = `${commonCode}
# Random Forest
from sklearn.ensemble import RandomForestClassifier

print("\\n=== RANDOM FOREST ===")

# Create and train the model
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Make predictions
y_pred = model.predict(X_test)

# Calculate accuracy
accuracy = accuracy_score(y_test, y_pred)
print(f"Accuracy: {accuracy:.4f} ({accuracy*100:.2f}%)")

# Feature importance
feature_importance = pd.DataFrame({
    'feature': X.columns,
    'importance': model.feature_importances_
}).sort_values('importance', ascending=False)

print("\\nTop 10 Important Features:")
print(feature_importance.head(10))

# Detailed classification report
from sklearn.metrics import classification_report, confusion_matrix
print("\\nClassification Report:")
print(classification_report(y_test, y_pred))
`;
  } else {
    snippets['Linear Regression'] = `${commonCode}
# Linear Regression
from sklearn.linear_model import LinearRegression

print("\\n=== LINEAR REGRESSION ===")

# Create and train the model
model = LinearRegression()
model.fit(X_train, y_train)

# Make predictions
y_pred = model.predict(X_test)

# Calculate metrics
mse = mean_squared_error(y_test, y_pred)
rmse = np.sqrt(mse)
r2 = r2_score(y_test, y_pred)

print(f"Mean Squared Error: {mse:.4f}")
print(f"Root Mean Squared Error: {rmse:.4f}")
print(f"R² Score: {r2:.4f} ({r2*100:.2f}%)")

# Display coefficients
coefficients = pd.DataFrame({
    'feature': X.columns,
    'coefficient': model.coef_
}).sort_values('coefficient', key=abs, ascending=False)

print("\\nCoefficients (sorted by importance):")
print(coefficients)

# Visualize predictions vs actual
plt.figure(figsize=(10, 6))
plt.scatter(y_test, y_pred, alpha=0.6)
plt.plot([y_test.min(), y_test.max()], [y_test.min(), y_test.max()], 'r--', lw=2)
plt.xlabel('Actual Values')
plt.ylabel('Predicted Values')
plt.title('Predictions vs Actual Values')
plt.grid(True, alpha=0.3)
plt.show()
`;

    snippets['Random Forest Regressor'] = `${commonCode}
# Random Forest Regressor
from sklearn.ensemble import RandomForestRegressor

print("\\n=== RANDOM FOREST REGRESSOR ===")

# Create and train the model
model = RandomForestRegressor(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Make predictions
y_pred = model.predict(X_test)

# Calculate metrics
mse = mean_squared_error(y_test, y_pred)
rmse = np.sqrt(mse)
r2 = r2_score(y_test, y_pred)

print(f"Mean Squared Error: {mse:.4f}")
print(f"Root Mean Squared Error: {rmse:.4f}")
print(f"R² Score: {r2:.4f} ({r2*100:.2f}%)")

# Feature importance
feature_importance = pd.DataFrame({
    'feature': X.columns,
    'importance': model.feature_importances_
}).sort_values('importance', ascending=False)

print("\\nTop 10 Important Features:")
print(feature_importance.head(10))

# Visualize predictions vs actual
plt.figure(figsize=(10, 6))
plt.scatter(y_test, y_pred, alpha=0.6)
plt.plot([y_test.min(), y_test.max()], [y_test.min(), y_test.max()], 'r--', lw=2)
plt.xlabel('Actual Values')
plt.ylabel('Predicted Values')
plt.title('Predictions vs Actual Values')
plt.grid(True, alpha=0.3)
plt.show()
`;
  }

  return snippets;
}
