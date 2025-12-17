
'use server';

/**
 * @fileOverview Recommends a machine learning model based on dataset characteristics.
 *
 * - recommendModel - A function that handles the model recommendation process.
 */

import {ai} from '@/ai/genkit';
import { RecommendModelInputSchema, RecommendModelOutputSchema, type RecommendModelInput } from '@/ai/schemas/recommend-model-schema';

export async function recommendModel(input: RecommendModelInput) {
  return recommendModelFlow(input);
}

const prompt = ai.definePrompt({
  name: 'recommendModelPrompt',
  input: {schema: RecommendModelInputSchema},
  output: {schema: RecommendModelOutputSchema},
  prompt: `
  You are an expert data scientist providing guidance to a user in an interactive machine learning application.
  Your task is to recommend the best machine learning model for their dataset.

  Here are the characteristics of the user's dataset:
  - **Problem Type**: {{{problemType}}}
  - **Target Variable**: '{{{targetVariable}}}'
  - **Dataset Size**: {{{rowCount}}} rows
  - **Number of Features**: {{{featureCount}}} ({{{numericFeatureCount}}} numerical, {{{categoricalFeatureCount}}} categorical)

  Based on this information, provide:
  1.  **Recommended Model**: State the single best model you recommend.
  2.  **Reasoning**: In 4-5 lines, explain *why* this model is a good choice. Consider the dataset size, the mix of feature types, the problem type, and the model's strengths (e.g., performance, interpretability, speed).

  Do not suggest alternatives. Keep the tone encouraging and educational. The user is here to learn.
  `,
});

const recommendModelFlow = ai.defineFlow(
  {
    name: 'recommendModelFlow',
    inputSchema: RecommendModelInputSchema,
    outputSchema: RecommendModelOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

