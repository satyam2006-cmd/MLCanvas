import { z } from "genkit";

export const RecommendModelInputSchema = z.object({
  problemType: z
    .enum(["classification", "regression"])
    .describe("The type of machine learning problem."),
  rowCount: z.number().describe("The number of rows in the dataset."),
  featureCount: z.number().describe("The total number of features."),
  numericFeatureCount: z.number().describe("The number of numerical features."),
  categoricalFeatureCount: z
    .number()
    .describe("The number of categorical features."),
  targetVariable: z.string().describe("The name of the target variable."),
});
export type RecommendModelInput = z.infer<typeof RecommendModelInputSchema>;

export const ModelRecommendationSchema = z.object({
  model: z.string().describe("The name of the model."),
  reasoning: z
    .string()
    .describe("Why this model is a good choice for the dataset."),
});
export type ModelRecommendation = z.infer<typeof ModelRecommendationSchema>;

export const RecommendModelOutputSchema = z.object({
  topModels: z
    .array(ModelRecommendationSchema)
    .length(3)
    .describe("Top 3 recommended models with their reasoning."),
});
export type RecommendModelOutput = z.infer<typeof RecommendModelOutputSchema>;
