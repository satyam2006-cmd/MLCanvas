import {z} from 'genkit';

export const RecommendModelInputSchema = z.object({
  problemType: z.enum(['classification', 'regression']).describe('The type of machine learning problem.'),
  rowCount: z.number().describe('The number of rows in the dataset.'),
  featureCount: z.number().describe('The total number of features.'),
  numericFeatureCount: z.number().describe('The number of numerical features.'),
  categoricalFeatureCount: z.number().describe('The number of categorical features.'),
  targetVariable: z.string().describe('The name of the target variable.'),
});
export type RecommendModelInput = z.infer<typeof RecommendModelInputSchema>;

export const RecommendModelOutputSchema = z.object({
  recommendation: z.string().describe('The recommendation for the best model and the reasoning, formatted as Markdown.'),
});
export type RecommendModelOutput = z.infer<typeof RecommendModelOutputSchema>;
