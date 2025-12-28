import { genkit } from "genkit";
import { googleAI } from "@genkit-ai/google-genai";

// Check if we have a valid API key before initializing Google AI
const apiKey = process.env.GOOGLE_API_KEY;
const hasValidApiKey = apiKey && apiKey !== 'your-api-key-here' && apiKey.length > 0;

// Create a mock AI instance when no valid API key is available
const createMockAI = () => {
  const mockAI = {
    definePrompt: () => ({
      generate: async () => ({ text: "AI service not available" })
    }),
    defineFlow: () => async () => ({}),
    generate: async () => ({ text: "AI service not available" })
  };
  return mockAI as any;
};

export const ai = hasValidApiKey 
  ? genkit({
      plugins: [googleAI({ apiKey })],
      model: "googleai/gemini-2.5-flash",
    })
  : createMockAI();
