
import { GoogleGenAI, Type } from "@google/genai";
import { VocalAnalysis } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzeVocalStyle = async (artistName: string): Promise<VocalAnalysis> => {
  const response = await ai.models.generateContent({
    model: "gemini-3-pro-preview",
    contents: `Analyze the vocal style of ${artistName}. Focus on: vibrato, breathiness, vocal range, and sonic texture. Provide practical recording tips to emulate this style for a voice cloning pipeline.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          vibrato: { type: Type.STRING },
          breathiness: { type: Type.STRING },
          range: { type: Type.STRING },
          texture: { type: Type.STRING },
          technicalTips: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          }
        },
        required: ["vibrato", "breathiness", "range", "texture", "technicalTips"]
      }
    }
  });

  return JSON.parse(response.text);
};
