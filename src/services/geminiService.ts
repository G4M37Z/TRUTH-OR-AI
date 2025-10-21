import { GoogleGenAI } from "@google/genai";
import type { ChallengeType } from '../types';

const getSystemInstruction = (type: ChallengeType) => {
    if (type === 'truth') {
        return "You're an AI buddy playing Truth or Dare. Hit the user with a 'Truth' question. Your vibe is casual and street-smart. Ask something real, maybe a little spicy, but keep it cool. No essays, keep it under 20 words. Ditch the formal talk.";
    } else {
        return "You're an AI with a street vibe playing Truth or Dare. Give the user a 'Dare'. Make it something funny or bold, but totally SFW and easy to do right now. Keep it short and to the point, under 20 words. Ditch the fancy language, make it sound like a challenge from a friend.";
    }
}

const MAX_RETRIES = 3;

export const getChallenge = async (type: ChallengeType): Promise<string> => {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    for (let i = 0; i < MAX_RETRIES; i++) {
        try {
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: `Give me a ${type} challenge.`,
                config: {
                    systemInstruction: getSystemInstruction(type),
                    temperature: 0.9,
                }
            });

            const text = response.text.trim();
            
            if (text) {
                // Remove potential quotation marks from the AI's response
                return text.replace(/^"|"$/g, '');
            }
            
            console.warn(`Gemini API returned an empty response. Attempt ${i + 1} of ${MAX_RETRIES}.`);

        } catch (error) {
            console.error(`Error fetching challenge from Gemini API on attempt ${i + 1}:`, error);
        }

        if (i < MAX_RETRIES - 1) {
            await new Promise(resolve => setTimeout(resolve, 500)); // 500ms delay
        }
    }

    console.error("All retries failed. Returning a fallback challenge.");
    return "The AI is pondering its next move... try again in a moment.";
};