"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import {
  AlertTriangle,
  Download,
  Code,
  CheckCircle,
  Info,
  BarChart2,
  PieChart,
  LineChart,
  Table,
} from "lucide-react";
import React, { useContext, useState, useEffect, useMemo } from "react";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { CsvDataContext } from "@/contexts/csv-data-context";
import { PreprocessingContext } from "@/contexts/preprocessing-context";
import {
  type CsvData,
  type ProcessedData,
  type PreprocessingSummary,
  processDataForModel,
} from "@/lib/preprocessing-service";
import { recommendModel } from "@/ai/flows/recommend-model";

const generateColabCode = (
  summary: PreprocessingSummary,
  featureNames: string[],
  targetVariable?: string,
  modelNames?: string[],
): Record<string, string> => {
  const targetCol = targetVariable || "target";
  const baseCode = `# Import necessary libraries
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split

# Load your dataset
# df = pd.read_csv('your_dataset.csv')

# Separate features and target
X = df[${JSON.stringify(featureNames)}]
y = df[${JSON.stringify(targetCol)}]

# Split the data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
`;

  const plotCode = `\n# Plot Predicted vs Actual
plt.figure(figsize=(10, 6))
plt.scatter(y_test, y_pred, alpha=0.6)
plt.plot([y_test.min(), y_test.max()], [y_test.min(), y_test.max()], 'r--', lw=2)
plt.xlabel('Actual ${targetCol}')
plt.ylabel('Predicted ${targetCol}')
plt.title('Predicted vs Actual Values')
plt.show()`;

  const codes: Record<string, string> = {
    "Logistic Regression": `${baseCode}
from sklearn.linear_model import LogisticRegression

# Initialize and train the model
model = LogisticRegression(random_state=42, max_iter=1000)
model.fit(X_train, y_train)

# Make predictions
y_pred = model.predict(X_test)

# Evaluate the model
from sklearn.metrics import accuracy_score, classification_report
print("Accuracy:", accuracy_score(y_test, y_pred))
print("\\nClassification Report:")
print(classification_report(y_test, y_pred))`,

    "Linear Regression": `${baseCode}
from sklearn.linear_model import LinearRegression

# Initialize and train the model
model = LinearRegression()
model.fit(X_train, y_train)

# Make predictions
y_pred = model.predict(X_test)

# Evaluate the model
from sklearn.metrics import mean_squared_error, r2_score
print("R² Score:", r2_score(y_test, y_pred))
print("RMSE:", np.sqrt(mean_squared_error(y_test, y_pred)))
${plotCode}`,

    "Ridge Regression": `${baseCode}
from sklearn.linear_model import Ridge

# Initialize and train the model
model = Ridge(alpha=1.0, random_state=42)
model.fit(X_train, y_train)

# Make predictions
y_pred = model.predict(X_test)

# Evaluate the model
from sklearn.metrics import mean_squared_error, r2_score
print("R² Score:", r2_score(y_test, y_pred))
print("RMSE:", np.sqrt(mean_squared_error(y_test, y_pred)))
${plotCode}`,

    "Lasso Regression": `${baseCode}
from sklearn.linear_model import Lasso

# Initialize and train the model
model = Lasso(alpha=0.1, random_state=42)
model.fit(X_train, y_train)

# Make predictions
y_pred = model.predict(X_test)

# Evaluate the model
from sklearn.metrics import mean_squared_error, r2_score
print("R² Score:", r2_score(y_test, y_pred))
print("RMSE:", np.sqrt(mean_squared_error(y_test, y_pred)))
${plotCode}`,

    ElasticNet: `${baseCode}
from sklearn.linear_model import ElasticNet

# Initialize and train the model
model = ElasticNet(alpha=0.1, l1_ratio=0.5, random_state=42)
model.fit(X_train, y_train)

# Make predictions
y_pred = model.predict(X_test)

# Evaluate the model
from sklearn.metrics import mean_squared_error, r2_score
print("R² Score:", r2_score(y_test, y_pred))
print("RMSE:", np.sqrt(mean_squared_error(y_test, y_pred)))
${plotCode}`,

    "Support Vector Machine": `${baseCode}
from sklearn.svm import SVR${(summary.problemType === "binary" || summary.problemType === "multiclass") ? " as SVM" : ""}
from sklearn.preprocessing import StandardScaler

# Scale the data
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# Initialize and train the model
model = SVR(kernel='rbf', C=100, gamma='scale')
model.fit(X_train_scaled, y_train)

# Make predictions
y_pred = model.predict(X_test_scaled)

# Evaluate the model
from sklearn.metrics import mean_squared_error, r2_score
print("R² Score:", r2_score(y_test, y_pred))
print("RMSE:", np.sqrt(mean_squared_error(y_test, y_pred)))
${plotCode}`,

    "K-Nearest Neighbors": `${baseCode}
from sklearn.neighbors import KNeighborsRegressor${(summary.problemType === "binary" || summary.problemType === "multiclass") ? " as KNN" : ""}

# Initialize and train the model
model = KNeighborsRegressor(n_neighbors=5)
model.fit(X_train, y_train)

# Make predictions
y_pred = model.predict(X_test)

# Evaluate the model
from sklearn.metrics import mean_squared_error, r2_score
print("R² Score:", r2_score(y_test, y_pred))
print("RMSE:", np.sqrt(mean_squared_error(y_test, y_pred)))
${plotCode}`,

    "Decision Tree": `${baseCode}
from sklearn.tree import DecisionTreeRegressor${(summary.problemType === "binary" || summary.problemType === "multiclass") ? " as DecisionTree" : ""}

# Initialize and train the model
model = DecisionTreeRegressor(max_depth=10, random_state=42)
model.fit(X_train, y_train)

# Make predictions
y_pred = model.predict(X_test)

# Evaluate the model
from sklearn.metrics import mean_squared_error, r2_score
print("R² Score:", r2_score(y_test, y_pred))
print("RMSE:", np.sqrt(mean_squared_error(y_test, y_pred)))
${plotCode}`,

    "Random Forest": `${baseCode}
from sklearn.ensemble import RandomForest${summary.problemType === "regression" ? "Regressor" : "Classifier"}

# Initialize and train the model
model = RandomForest${summary.problemType === "regression" ? "Regressor" : "Classifier"}(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Make predictions
y_pred = model.predict(X_test)

# Evaluate the model
from sklearn.metrics import ${summary.problemType === "regression" ? "mean_squared_error, r2_score" : "accuracy_score"}
${summary.problemType === "regression"
        ? `print("R² Score:", r2_score(y_test, y_pred))
print("RMSE:", np.sqrt(mean_squared_error(y_test, y_pred)))
${plotCode}`
        : `print("Accuracy:", accuracy_score(y_test, y_pred))`
      }`,

    "Gradient Boosting": `${baseCode}
from sklearn.ensemble import GradientBoosting${summary.problemType === "regression" ? "Regressor" : "Classifier"}

# Initialize and train the model
model = GradientBoosting${summary.problemType === "regression" ? "Regressor" : "Classifier"}(n_estimators=100, learning_rate=0.1, random_state=42)
model.fit(X_train, y_train)

# Make predictions
y_pred = model.predict(X_test)

# Evaluate the model
from sklearn.metrics import ${summary.problemType === "regression" ? "mean_squared_error, r2_score" : "accuracy_score"}
${summary.problemType === "regression"
        ? `print("R² Score:", r2_score(y_test, y_pred))
print("RMSE:", np.sqrt(mean_squared_error(y_test, y_pred)))
${plotCode}`
        : `print("Accuracy:", accuracy_score(y_test, y_pred))`
      }`,

    "Naive Bayes": `${baseCode}
from sklearn.naive_bayes import GaussianNB

# Initialize and train the model
model = GaussianNB()
model.fit(X_train, y_train)

# Make predictions
y_pred = model.predict(X_test)

# Evaluate the model
from sklearn.metrics import accuracy_score, classification_report
print("Accuracy:", accuracy_score(y_test, y_pred))
print("\\nClassification Report:")
print(classification_report(y_test, y_pred))`,

    "K-Means": `${baseCode}
from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler

# Scale the data
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)

# Initialize and train the model
model = KMeans(n_clusters=3, random_state=42)
model.fit(X_train_scaled)

# Get cluster labels
labels = model.labels_
print("Cluster labels:", np.unique(labels))
print("Number of samples per cluster:", np.bincount(labels))`,
  };

  // If specific models are requested, filter to those
  if (modelNames && modelNames.length > 0) {
    const filtered: Record<string, string> = {};
    modelNames.forEach((name) => {
      if (codes[name]) {
        filtered[name] = codes[name];
      }
    });
    return filtered;
  }

  return codes;
};

interface TrainingLabProps { }

export function TrainingLab({ }: TrainingLabProps) {
  const { toast } = useToast();
  const { targetVariable, csvData } = useContext(CsvDataContext);
  const preprocessingContext = useContext(PreprocessingContext);
  const processedData = preprocessingContext?.processedData || null;
  const preprocessingSummary =
    preprocessingContext?.preprocessingSummary || null;
  const isPreprocessing = preprocessingContext?.isPreprocessing || false;

  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [processedDataset, setProcessedDataset] =
    useState<ProcessedData | null>(null);
  const [topModels, setTopModels] = useState<
    Array<{ model: string; reasoning: string }>
  >([]);
  const [codeSnippets, setCodeSnippets] = useState<Record<string, string>>({});
  const [columnStats, setColumnStats] = useState<Record<string, any>>({});

  // Calculate column statistics when processedData changes
  useEffect(() => {
    if (!processedData || processedData.length === 0) {
      return;
    }

    const stats: Record<string, any> = {};
    const columns = Object.keys(processedData[0] || {});

    columns.forEach((col) => {
      const values = processedData.map((row) => row[col]);
      const nonNullValues = values.filter(
        (v) => v !== null && v !== undefined && v !== "",
      );
      const numericValues = nonNullValues
        .filter((v) => isNumeric(v))
        .map(Number);
      const uniqueValues = new Set(nonNullValues);

      stats[col] = {
        type: numericValues.length > 0 ? "numeric" : "categorical",
        missing: values.length - nonNullValues.length,
        missingPct:
          (
            ((values.length - nonNullValues.length) / values.length) *
            100
          ).toFixed(1) + "%",
        unique: uniqueValues.size,
        uniquePct:
          ((uniqueValues.size / nonNullValues.length) * 100).toFixed(1) + "%",
        isNumeric: numericValues.length > 0,
        stats: {},
      };

      if (numericValues.length > 0) {
        const sorted = [...numericValues].sort((a, b) => a - b);
        stats[col].stats = {
          min: Math.min(...numericValues).toFixed(2),
          max: Math.max(...numericValues).toFixed(2),
          mean: (
            numericValues.reduce((a, b) => a + b, 0) / numericValues.length
          ).toFixed(2),
          median: sorted[Math.floor(sorted.length / 2)].toFixed(2),
          std: Math.sqrt(
            numericValues.reduce(
              (sq, n) =>
                sq + Math.pow(n - parseFloat(stats[col].stats.mean), 2),
              0,
            ) / numericValues.length,
          ).toFixed(2),
        };
      } else {
        const valueCounts = nonNullValues.reduce(
          (acc: Record<string, number>, val) => {
            acc[String(val)] = (acc[String(val)] || 0) + 1;
            return acc;
          },
          {},
        );

        const sortedCounts = Object.entries(valueCounts)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 5);

        stats[col].stats = {
          topValues: sortedCounts,
          valueCount: sortedCounts.length,
        };
      }
    });

    setColumnStats(stats);
  }, [processedData]);

  // Helper function to check if value is numeric
  const isNumeric = (value: any): boolean => {
    if (value === null || value === undefined || value === "") return false;
    return !isNaN(Number(value)) && isFinite(Number(value));
  };

  // Update model training when preprocessed data changes
  useEffect(() => {
    if (isPreprocessing) {
      return;
    }

    if (
      processedData &&
      processedData.length > 0 &&
      targetVariable &&
      preprocessingSummary
    ) {
      const processData = async () => {
        try {
          setIsLoading(true);

          // Convert the preprocessed data to the format expected by the model
          const processed = await processDataForModel(
            processedData,
            targetVariable,
            preprocessingSummary.problemType || "regression",
            false,
          );

          if (!processed) {
            throw new Error("Failed to process data for model training");
          }

          // We'll store just the processed data without the summary
          // since the summary is already available in preprocessingSummary
          setProcessedDataset(processed);

          // Call Gemini API for model recommendation
          try {
            const input = {
              problemType: preprocessingSummary.problemType,
              rowCount: processedData.length,
              featureCount: processed.featureNames.length,
              numericFeatureCount: processed.featureNames.filter((f) => {
                const stat = columnStats[f];
                return stat && stat.type === "numeric";
              }).length,
              categoricalFeatureCount: processed.featureNames.filter((f) => {
                const stat = columnStats[f];
                return stat && stat.type !== "numeric";
              }).length,
              targetVariable: targetVariable,
            };
            const geminiResult = await recommendModel(input);
            setTopModels(geminiResult.topModels);

            // Generate code only for recommended models
            const recommendedModelNames = geminiResult.topModels.map(
              (m: any) => m.model,
            );
            const snippets = generateColabCode(
              preprocessingSummary,
              processed.featureNames,
              targetVariable,
              recommendedModelNames,
            );
            setCodeSnippets(snippets);
          } catch (err) {
            console.error("Error getting recommendation:", err);
            toast({
              title: "Recommendation Error",
              description: "Could not get model recommendations from Gemini.",
              variant: "destructive",
            });
          }
        } catch (error) {
          console.error("Error in model preparation:", error);
          toast({
            title: "Error",
            description:
              "Failed to prepare data for model training: " +
              (error instanceof Error ? error.message : "Unknown error"),
            variant: "destructive",
          });
        } finally {
          setIsLoading(false);
        }
      };

      processData();
    }
  }, [processedData, targetVariable, preprocessingSummary, toast]);

  const handleDownloadProcessed = () => {
    if (!processedData) return;

    try {
      // Create CSV content from processed data
      const headers = Object.keys(processedData[0] || {});
      const csvContent = [
        headers.join(","),
        ...processedData.map((row: Record<string, unknown>) =>
          headers.map((header) => JSON.stringify(row[header] || "")).join(","),
        ),
      ].join("\n");

      // Create a download link
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "processed_dataset.csv";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast({
        title: "Download Complete",
        description: "Processed dataset downloaded successfully",
        variant: "default",
      });
    } catch (error) {
      console.error("Error downloading processed data:", error);
      toast({
        title: "Error",
        description: "Failed to download processed dataset",
        variant: "destructive",
      });
    }
  };

  if (!processedData || processedData.length === 0 || !targetVariable) {
    return (
      <Card className="h-full flex items-center justify-center">
        <div className="text-center text-muted-foreground p-8">
          <AlertTriangle className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <h3 className="font-semibold text-lg mb-2">No Data Available</h3>
          <p>
            Please upload a dataset and select a target variable above to begin.
          </p>
        </div>
      </Card>
    );
  }

  if (isLoading) {
    return (
      <Card className="h-full flex items-center justify-center">
        <div className="text-center text-muted-foreground p-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <h3 className="font-semibold text-lg mb-2">Processing Dataset</h3>
          <p>Analyzing and preprocessing your data...</p>
        </div>
      </Card>
    );
  }

  if (!processedDataset || !processedData || !targetVariable) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Model Training</CardTitle>
          <CardDescription>
            {!targetVariable
              ? "Please select a target variable to enable model training."
              : "Preprocess your data to enable model training."}
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">
            Exploratory Data Analysis
          </CardTitle>
          <CardDescription>
            Explore and analyze your dataset before training models.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="space-y-4"
          >
            <TabsList>
              <TabsTrigger value="overview">
                <Info className="mr-2 h-4 w-4" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="variables">
                <Table className="mr-2 h-4 w-4" />
                Variables
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              {!processedData || processedData.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <p>No data available for analysis.</p>
                  <p className="text-sm">Please preprocess your data first.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">
                          Dataset Rows
                        </CardTitle>
                        <CardDescription className="text-2xl font-bold">
                          {processedData.length.toLocaleString()}
                        </CardDescription>
                      </CardHeader>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">
                          Features
                        </CardTitle>
                        <CardDescription className="text-2xl font-bold">
                          {processedData[0]
                            ? Object.keys(processedData[0]).length - 1
                            : 0}
                        </CardDescription>
                      </CardHeader>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">
                          Target
                        </CardTitle>
                        <CardDescription className="text-2xl font-bold">
                          {targetVariable || "Not set"}
                        </CardDescription>
                      </CardHeader>
                    </Card>
                  </div>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm font-medium">
                        Missing Values
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {Object.entries(columnStats)
                        .filter(([_, stats]) => stats.missing > 0)
                        .sort((a, b) => b[1].missing - a[1].missing)
                        .map(([col, stats]) => (
                          <div key={col} className="space-y-1">
                            <div className="flex justify-between text-sm">
                              <span>{col}</span>
                              <span className="text-muted-foreground">
                                {stats.missing} ({stats.missingPct})
                              </span>
                            </div>
                            <Progress
                              value={
                                (1 - stats.missing / processedData.length) * 100
                              }
                              className="h-2"
                            />
                          </div>
                        ))}
                      {Object.values(columnStats).every(
                        (stats: any) => stats.missing === 0,
                      ) && (
                          <div className="text-center py-4 text-muted-foreground">
                            No missing values found in any column.
                          </div>
                        )}
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm font-medium">
                        Column Types
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                      {Object.entries(columnStats).map(([col, stats]) => (
                        <div
                          key={col}
                          className="flex items-center space-x-2 p-2 border rounded-md"
                        >
                          <div
                            className={`w-3 h-3 rounded-full ${stats.type === "numeric"
                              ? "bg-blue-500"
                              : "bg-green-500"
                              }`}
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">
                              {col}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {stats.type} • {stats.unique} unique values
                            </p>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>
              )}
            </TabsContent>

            <TabsContent value="variables" className="space-y-4">
              {!processedData || processedData.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <p>No data available for analysis.</p>
                  <p className="text-sm">Please preprocess your data first.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {Object.entries(columnStats).map(([col, stats]) => (
                    <Card key={col}>
                      <CardHeader>
                        <CardTitle className="text-sm font-medium">
                          {col}
                        </CardTitle>
                        <div className="flex items-center space-x-2">
                          <Badge
                            variant={
                              stats.type === "numeric" ? "outline" : "secondary"
                            }
                          >
                            {stats.type}
                          </Badge>
                          {stats.missing > 0 && (
                            <Badge variant="destructive" className="text-xs">
                              {stats.missing} missing values
                            </Badge>
                          )}
                        </div>
                      </CardHeader>
                      <CardContent>
                        {stats.type === "numeric" ? (
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div>
                              <p className="text-xs text-muted-foreground">
                                Mean
                              </p>
                              <p className="font-mono">{stats.stats.mean}</p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">
                                Min
                              </p>
                              <p className="font-mono">{stats.stats.min}</p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">
                                Max
                              </p>
                              <p className="font-mono">{stats.stats.max}</p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">
                                Std Dev
                              </p>
                              <p className="font-mono">{stats.stats.std}</p>
                            </div>
                          </div>
                        ) : (
                          <div>
                            <p className="text-sm font-medium mb-2">
                              Top Values
                            </p>
                            <div className="space-y-2">
                              {stats.stats.topValues?.map(
                                ([value, count]: [string, number]) => (
                                  <div
                                    key={value}
                                    className="flex items-center"
                                  >
                                    <div className="w-1/4 text-sm font-mono">
                                      {value}
                                    </div>
                                    <div className="flex-1 px-2">
                                      <div
                                        className="h-4 bg-blue-100 rounded-sm"
                                        style={{
                                          width: `${(count / processedData.length) * 100}%`,
                                        }}
                                      />
                                    </div>
                                    <div className="w-16 text-right text-xs text-muted-foreground">
                                      {count} (
                                      {(
                                        (count / processedData.length) *
                                        100
                                      ).toFixed(1)}
                                      %)
                                    </div>
                                  </div>
                                ),
                              )}
                            </div>
                            {stats.unique > 5 && (
                              <p className="text-xs text-muted-foreground mt-2">
                                ... and {stats.unique - 5} more unique values
                              </p>
                            )}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="font-heading">
            Model Training Data Preview
          </CardTitle>
          <CardDescription>
            Preview the fully processed and encoded dataset used for model
            training. You can also download it for use in Colab or other tools.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto mb-4">
            {processedData && processedData.length > 0 ? (
              <table className="min-w-full text-xs border">
                <thead>
                  <tr>
                    {Object.keys(processedData[0]).map((header) => (
                      <th
                        key={header}
                        className="px-2 py-1 border-b text-left whitespace-nowrap"
                      >
                        {header}
                        {header === targetVariable && (
                          <span className="ml-1 text-primary">(Target)</span>
                        )}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {processedData.slice(0, 10).map((row, i) => (
                    <tr key={i}>
                      {Object.values(row).map((value, j) => (
                        <td
                          key={j}
                          className="px-2 py-1 border-b whitespace-nowrap"
                        >
                          {String(value)}
                        </td>
                      ))}
                    </tr>
                  ))}
                  {processedData.length > 10 && (
                    <tr>
                      <td
                        colSpan={Object.keys(processedData[0]).length}
                        className="text-center text-muted-foreground"
                      >
                        Showing 10 of {processedData.length} rows
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            ) : (
              <div className="text-center text-muted-foreground">
                No processed data available.
              </div>
            )}
          </div>
          <div className="flex justify-center">
            <Button
              onClick={handleDownloadProcessed}
              disabled={!processedData}
              size="lg"
            >
              <Download className="w-5 h-5 mr-2" />
              Download Processed CSV
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Gemini Model Recommendation - Top 3 Models */}
      {topModels.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">
              Top 3 Recommended Models (by Our AI)
            </CardTitle>
            <CardDescription>
              Best models for your dataset based on our AI analysis.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topModels.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 border rounded-lg bg-gradient-to-r from-blue-50 to-transparent"
                >
                  <div className="flex items-start gap-3">
                    <Badge variant="secondary" className="mt-1">
                      #{idx + 1}
                    </Badge>
                    <div className="flex-1">
                      <h4 className="font-semibold text-lg">{item.model}</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        {item.reasoning}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Google Colab Code Snippets */}
      {Object.keys(codeSnippets).length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="font-headline flex items-center gap-2">
              <Code className="h-5 w-5" />
              Google Colab Code Snippets
            </CardTitle>
            <CardDescription>
              Copy-paste ready code for training models in Google Colab.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {Object.entries(codeSnippets).map(([model, code]) => (
              <div key={model} className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-lg">{model}</h4>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      navigator.clipboard.writeText(code);
                      toast({
                        title: "Copied!",
                        description: `${model} code copied to clipboard`,
                      });
                    }}
                  >
                    Copy Code
                  </Button>
                </div>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                  <pre className="text-sm whitespace-pre-wrap font-mono">
                    {code}
                  </pre>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
