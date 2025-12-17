import {z} from 'genkit';

export const ExplainIndividualPredictionInputSchema = z.object({
  modelType: z.string().describe('The type of machine learning model used.'),
  featureValues: z.record(z.string(), z.number()).describe('The values of the features used in the prediction.'),
  prediction: z.number().describe('The prediction made by the model.'),
  modelCoefficients: z.record(z.string(), z.number()).optional().describe('The coefficients of the model, if applicable.'),
  shapValues: z.record(z.string(), z.number()).optional().describe('The SHAP values for each feature, if available.'),
  localExplanations: z.array(z.string()).optional().describe('Local explanations for the prediction, if available.'),
});
export type ExplainIndividualPredictionInput = z.infer<typeof ExplainIndividualPredictionInputSchema>;

export const ExplainIndividualPredictionOutputSchema = z.object({
  explanation: z.string().describe('The explanation of the prediction.'),
});
export type ExplainIndividualPredictionOutput = z.infer<typeof ExplainIndividualPredictionOutputSchema>;
