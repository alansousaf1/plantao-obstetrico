import { GoogleGenerativeAI } from "@google/generative-ai";

// A correção principal está aqui: usar import.meta.env
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

if (!apiKey) {
    console.error("⚠️ CRÍTICO: Chave da API não detectada! Verifique o arquivo .env");
}

const genAI = new GoogleGenerativeAI(apiKey || "");

export const getGeminiResponse = async (prompt: string) => {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const result = await model.generateContent(prompt);
        const response = await result.response;
        return response.text();
    } catch (error) {
        console.error("Erro na comunicação com a IA:", error);
        return "Erro: Falha na conexão com a Inteligência Artificial.";
    }
};
