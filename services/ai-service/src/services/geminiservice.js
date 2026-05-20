import genAI from '../config/gemini.js';

export const askGemini = async (prompt) => {
    const model = genAI.getGenerativeModel({model: 'gemini-3.5-flash'});

    const result = await model.generateContent(prompt);
    return result.response.text();
}