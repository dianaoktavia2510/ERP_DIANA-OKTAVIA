import { GoogleGenAI } from "@google/genai";

// Initialize Gemini
// Note: In a real production app, ensure strict backend proxying for keys.
// For this demo, we assume the key is in process.env.API_KEY or we degrade gracefully.
const apiKey = process.env.API_KEY || '';
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export const generateFinancialInsight = async (dataContext: string): Promise<string> => {
  if (!ai) {
    return "AI Insight Unavailable: Please configure API_KEY to enable Gemini-powered analytics.";
  }

  try {
    const model = 'gemini-2.5-flash';
    const prompt = `
      You are an expert Hospital CFO and Financial Analyst AI named HOSPI-A.I.
      Analyze the following financial context snippet and provide a brief, high-level executive summary 
      identifying any anomalies, positive trends, or areas for cost optimization.
      Keep it professional, concise (under 50 words), and actionable.

      Context: ${dataContext}
    `;

    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
    });

    return response.text || "Analysis complete. No specific anomalies detected.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Unable to generate real-time insight at this moment.";
  }
};

export const analyzeJournalEntry = async (description: string, amount: number, type: 'credit' | 'debit'): Promise<{ riskScore: number; reason: string }> => {
  if (!ai) {
    return { riskScore: 0, reason: "AI Analysis Disabled (Missing Key)" };
  }

  try {
    const model = 'gemini-2.5-flash';
    const prompt = `
      You are an AI Auditor for a hospital ERP. Analyze this journal entry for fraud risk or accounting anomalies.
      
      Transaction:
      - Description: "${description}"
      - Amount: $${amount}
      - Type: ${type}
      
      Return ONLY a JSON object (no markdown) with:
      1. "riskScore" (number 0-100, where >50 is high risk).
      2. "reason" (short string explaining the score).
      
      High risk examples: Round numbers, generic descriptions like "Consultant Fees" without detail, unusually high amounts for "Petty Cash".
    `;

    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
    });
    
    // Simple parsing wrapper in case the model adds markdown code blocks
    const text = response.text || "{}";
    const jsonStr = text.replace(/```json|```/g, '').trim();
    
    return JSON.parse(jsonStr);
  } catch (error) {
    console.error("Gemini Audit Error:", error);
    return { riskScore: 50, reason: "Manual review recommended (AI unavailable)" };
  }
};