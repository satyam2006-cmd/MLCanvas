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
  return recommendModelFlow(input);
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
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  },
);
