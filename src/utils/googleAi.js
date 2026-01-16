import { GoogleGenAI } from "@google/genai";

const apiKey = import.meta.env.VITE_GEMINI_KEY;

if (!apiKey) {
  console.error("VITE_GEMINI_KEY is missing. Check .env file.");
}

// Initialization for the NEW SDK (@google/genai)
// MUST pass an object: { apiKey: "..." } since we are in a browser environment
const genAI = new GoogleGenAI({ apiKey: apiKey });

// Export the client directly
export const aiClient = genAI;