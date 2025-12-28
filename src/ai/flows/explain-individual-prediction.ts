'use server';

/**
 * @fileOverview Explains an individual prediction made by a machine learning model.
 *
 * - explainIndividualPrediction - A function that handles the explanation process.
 */

import {ai} from '@/ai/genkit';
import { ExplainIndividualPredictionInputSchema, ExplainIndividualPredictionOutputSchema, type ExplainIndividualPredictionInput } from '@/ai/schemas/explain-individual-prediction-schema';

export async function explainIndividualPrediction(input: ExplainIndividualPredictionInput) {
  return explainIndividualPredictionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'explainIndividualPredictionPrompt',
  input: {schema: ExplainIndividualPredictionInputSchema},
  output: {schema: ExplainIndividualPredictionOutputSchema},
  prompt: `You are an AI expert explaining a prediction made by a machine learning model.

  The model type is: {{{modelType}}}
  The prediction is: {{{prediction}}}
  The feature values are:
  {{#each featureValues}}
  - {{{@key}}}: {{{this}}}
  {{/each}}

  {{#if modelCoefficients}}
  The model coefficients are:
  {{#each modelCoefficients}}
  - {{{@key}}}: {{{this}}}
  {{/each}}
  {{/if}}

  {{#if shapValues}}
  The SHAP values are:
  {{#each shapValues}}
  - {{{@key}}}: {{{this}}}
  {{/each}}
  {{/if}}

  {{#if localExplanations}}
  Local explanations:
  {{#each localExplanations}}
  - {{{this}}}
  {{/each}}
  {{/if}}

  Explain why the model made this prediction, considering the provided information. Focus on providing an understandable and clear explanation.
  `,config: {
    safetySettings: [
      {
        category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
        threshold: 'BLOCK_ONLY_HIGH',
      },
      {
        category: 'HARM_CATEGORY_HATE_SPEECH',
        threshold: 'BLOCK_ONLY_HIGH',
      },
    ],
  },
});

const explainIndividualPredictionFlow = ai.defineFlow(
  {
    name: 'explainIndividualPredictionFlow',
    inputSchema: ExplainIndividualPredictionInputSchema,
    outputSchema: ExplainIndividualPredictionOutputSchema,
  },
  async (input: ExplainIndividualPredictionInput) => {
    const {output} = await prompt(input);
    return output!;
  }
);
