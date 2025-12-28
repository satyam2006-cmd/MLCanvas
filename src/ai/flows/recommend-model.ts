"use server";

/**
 * @fileOverview Recommends a machine learning model based on dataset characteristics.
 *
 * - recommendModel - A function that handles the model recommendation process.
 */

import { ai } from "@/ai/genkit";
import {
  RecommendModelInputSchema,
  RecommendModelOutputSchema,
  type RecommendModelInput,
} from "@/ai/schemas/recommend-model-schema";

export async function recommendModel(input: RecommendModelInput) {
  // Check if AI is available (has valid API key)
  const apiKey = process.env.GOOGLE_API_KEY;
  const hasValidApiKey = apiKey && apiKey !== 'your-api-key-here' && apiKey.length > 0;
  
  if (!hasValidApiKey) {
    // Return fallback recommendations when AI is not available
    const fallbackRecommendations = getFallbackRecommendations(input);
    return fallbackRecommendations;
  }
  
  try {
    return await recommendModelFlow(input);
  } catch (error) {
    console.error('AI recommendation failed, using fallback:', error);
    // Return fallback recommendations if AI fails
    const fallbackRecommendations = getFallbackRecommendations(input);
    return fallbackRecommendations;
  }
}

function getFallbackRecommendations(input: RecommendModelInput) {
  const { problemType } = input;
  
  if (problemType === 'regression') {
    return {
      topModels: [
        {
          model: 'Linear Regression',
          reasoning: 'Simple and interpretable baseline for regression tasks. Good for linear relationships.'
        },
        {
          model: 'Random Forest',
          reasoning: 'Handles non-linear relationships well and is robust to outliers.'
        },
        {
          model: 'Ridge Regression',
          reasoning: 'Prevents overfitting by adding regularization to linear regression.'
        }
      ]
    };
  } else {
    return {
      topModels: [
        {
          model: 'Logistic Regression',
          reasoning: 'Simple and interpretable baseline for classification tasks.'
        },
        {
          model: 'Random Forest',
          reasoning: 'Handles non-linear relationships well and provides feature importance.'
        },
        {
          model: 'K-Nearest Neighbors',
          reasoning: 'Non-parametric method that works well for smaller datasets.'
        }
      ]
    };
  }
}

const prompt = ai.definePrompt({
  name: "recommendModelPrompt",
  input: { schema: RecommendModelInputSchema },
  output: { schema: RecommendModelOutputSchema },
  prompt: `
  You are an expert data scientist recommending machine learning models for a user's dataset.

  Dataset characteristics:
  - **Problem Type**: {{{problemType}}}
  - **Target Variable**: '{{{targetVariable}}}'
  - **Size**: {{{rowCount}}} rows
  - **Features**: {{{featureCount}}} ({{{numericFeatureCount}}} numeric, {{{categoricalFeatureCount}}} categorical)

  Recommend the TOP 3 BEST models for this dataset. For each model:
  1. Give the exact model name (e.g., 'Random Forest Classifier', 'Ridge Regression', 'K-Nearest Neighbors')
  2. Provide 2-3 lines of reasoning explaining why it suits this dataset

  Only recommend from: Logistic Regression, Linear Regression, Ridge Regression, Lasso Regression, ElasticNet, Support Vector Machine, K-Nearest Neighbors, Decision Tree, Random Forest, Gradient Boosting, Naive Bayes, K-Means (for clustering).
  `,
});

const recommendModelFlow = ai.defineFlow(
  {
    name: "recommendModelFlow",
    inputSchema: RecommendModelInputSchema,
    outputSchema: RecommendModelOutputSchema,
  },
  async (input: RecommendModelInput) => {
    const { output } = await prompt(input);
    return output!;
  },
);
