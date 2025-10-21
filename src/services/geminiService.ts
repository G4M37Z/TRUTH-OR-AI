import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import type { ChallengeType } from '../types';

// A helper function to add a timeout to any promise
const promiseWithTimeout = <T>(
  promise: Promise<T>,
  ms: number,
  timeoutError = new Error('API call timed out')
): Promise<T> => {
  const timeout = new Promise<never>((_, reject) => {
    setTimeout(() => {
      reject(timeoutError);
    }, ms);
  });
  return Promise.race([promise, timeout]);
};


const getSystemInstruction = (type: ChallengeType) => {
    // Consolidated the common parts of the instruction to be more DRY and explicit.
    const baseInstruction = "You are a witty AI playing 'Truth or Dare'. Your persona is casual and street-smart. Your entire response must be ONLY the challenge text itself, under 20 words, with no quotes or introductory phrases like 'Here is your dare:'.";
    if (type === 'truth') {
        return `${baseInstruction} Generate a 'Truth' question that is insightful or a little spicy, but SFW.`;
    } else {
        return `${baseInstruction} Generate a 'Dare' that is funny or bold, but SFW and easy to do right now.`;
    }
}

const MAX_RETRIES = 3;
const API_TIMEOUT = 8000; // 8 seconds

export const getChallenge = async (type: ChallengeType): Promise<string> => {
    // Initialize the AI client once to be reused across retries.
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    for (let i = 0; i < MAX_RETRIES; i++) {
        try {
            // Wrap the API call in our timeout helper
            const apiCall = ai.models.generateContent({
                model: 'gemini-2.5-flash',
                // Simplified the prompt as the system instruction is very specific.
                contents: `A ${type} challenge.`,
                config: {
                    systemInstruction: getSystemInstruction(type),
                    temperature: 1.0, // Increased temperature slightly for more variety
                }
            });
            
            const response = await promiseWithTimeout(apiCall, API_TIMEOUT);

            // FIX: The type of `response` was inferred as `unknown` because `GenerateContentResponse` was not imported.
            // Importing it allows TypeScript to correctly infer the type and access the `.text` property.
            const text = response.text.trim();
            
            if (text) {
                // The system instruction now tells the AI not to use quotes, 
                // but this is a good safeguard.
                return text.replace(/^"|"$/g, '');
            }
            
            console.warn(`Gemini API returned an empty response. Attempt ${i + 1} of ${MAX_RETRIES}.`);

        } catch (error) {
            console.error(`Error on attempt ${i + 1}:`, error instanceof Error ? error.message : String(error));
        }

        // Wait before retrying with exponential backoff
        if (i < MAX_RETRIES - 1) {
            await new Promise(resolve => setTimeout(resolve, 500 + i * 500));
        }
    }

    console.error("All retries failed. Returning a fallback challenge.");
    return "The AI is pondering its next move... try again in a moment.";
};