
'use server';

import { explainIndividualPrediction } from '@/ai/flows/explain-individual-prediction';
import type { ExplainIndividualPredictionInput } from '@/ai/schemas/explain-individual-prediction-schema';
import { recommendModel } from '@/ai/flows/recommend-model';
import type { RecommendModelInput } from '@/ai/schemas/recommend-model-schema';
import { trainLogisticRegression, trainLinearRegression, trainKnn, trainDecisionTree } from '@/lib/training-service';
import { processDataForModel, type CsvData, type ProcessedData } from '@/lib/preprocessing-service';

export async function getExplanationAction(
  input: ExplainIndividualPredictionInput
) {
  try {
    const result = await explainIndividualPrediction(input);
    return { success: true, explanation: result.explanation };
  } catch (error) {
    console.error('Error getting explanation:', error);
    let errorMessage =
      'An unknown error occurred while generating the explanation.';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return {
      success: false,
      error: `Failed to get explanation. ${errorMessage}`,
    };
  }
}

export async function getModelRecommendationAction(input: RecommendModelInput) {
  try {
    const result = await recommendModel(input);
    return { success: true, recommendation: result.recommendation };
  } catch (error) {
    console.error('Error getting recommendation:', error);
    let errorMessage =
      'An unknown error occurred while generating the recommendation.';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return {
      success: false,
      error: `Failed to get recommendation. ${errorMessage}`,
    };
  }
}


import Papa from "papaparse";

export async function trainModelAction(
  rawData: CsvData,
  targetVariable: string,
  trainingOptions: {
    modelType: string;
    learningRate: number;
    epochs: number;
    trainTestSplit: number;
    k: number;
    maxDepth: number;
    nEstimators: number;
  }
) {
  try {
    // Preprocess data for ML
    const { X, y, featureNames } = processDataForModel(rawData, targetVariable, trainingOptions.modelType);
    // Map UI modelType to backend model name
    let backendModel = trainingOptions.modelType;
    if (backendModel === "logistic") backendModel = "logistic_regression";
    if (backendModel === "linear") backendModel = "linear_regression";
    if (backendModel === "knn") backendModel = "knn";
    if (backendModel === "dt") backendModel = "decision_tree";
    if (backendModel === "rf") backendModel = "random_forest";
    const payload = {
      X,
      y,
      featureNames,
      model_name: backendModel,
      target: targetVariable,
      k: trainingOptions.k,
      max_depth: trainingOptions.maxDepth,
      n_estimators: trainingOptions.nEstimators
    };
    const resp = await fetch("http://localhost:8000/train", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    let result;
    try {
      result = await resp.json();
    } catch (jsonErr) {
      const text = await resp.text();
      return {
        success: false,
        error: `Backend error: ${text}`,
      };
    }
    if (result.error) {
      return { success: false, error: result.error };
    }
    return {
      success: true,
      accuracy: result.accuracy,
      r2: result.r2,
      mse: result.mse,
      modelType: result.model_type,
      // Optionally add more fields as needed
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error during training.",
    };
  }
}

