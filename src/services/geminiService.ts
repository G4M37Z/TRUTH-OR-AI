import { GoogleGenAI } from "@google/genai";
import type { ChallengeType } from '../types';

const getSystemInstruction = (type: ChallengeType) => {
    if (type === 'truth') {
        return "You're an AI buddy playing Truth or Dare. Hit the user with a 'Truth' question. Your vibe is casual and street-smart. Ask something real, maybe a little spicy, but keep it cool. No essays, keep it under 20 words. Ditch the formal talk.";
    } else {
        return "You're an AI with a street vibe playing Truth or Dare. Give the user a 'Dare'. Make it something funny or bold, but totally SFW and easy to do right now. Keep it short and to the point, under 20 words. Ditch the fancy language, make it sound like a challenge from a friend.";
    }
}

export const getChallenge = async (type: ChallengeType): Promise<string> => {
    try {
        // Fix: Use process.env.API_KEY as per the guidelines to fix the TypeScript error.
        if (!process.env.API_KEY) {
            // In a real app, you might want to show a more user-friendly message.
            return "API Key not found. Please configure your environment.";
        }
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `Generate a single '${type}' prompt.`,
            config: {
                systemInstruction: getSystemInstruction(type),
                temperature: 0.9,
            }
        });

        const text = response.text.trim();
        // Remove potential quotation marks from the AI's response
        return text.replace(/^"|"$/g, '');

    } catch (error) {
        console.error("Error fetching challenge from Gemini API:", error);
        return "The AI is pondering its next move... try again in a moment.";
    }
};