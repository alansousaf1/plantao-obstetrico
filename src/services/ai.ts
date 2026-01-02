import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

const genAI = new GoogleGenerativeAI(API_KEY || '');
// Using 1.5-flash as it is fast and supports vision
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function generateQuestions(qp: string): Promise<string[]> {
    if (!API_KEY) throw new Error("API Key not configured");

    const prompt = `Como médico obstetra/ginecologista experiente, liste 5 perguntas clínicas curtas e diretas essenciais para anamnese de uma paciente com queixa de: "${qp}". Foco em diagnóstico diferencial e gravidade. Retorne apenas as perguntas em lista, sem numeração ou texto adicional.`;

    try {
        const result = await model.generateContent(prompt);
        const text = result.response.text();
        return text
            .split('\n')
            .map(q => q.trim())
            .filter(q => q.length > 0)
            .map(q => q.replace(/^\d+[\.|)]\s*|-\s*/, ''));
    } catch (e) {
        console.error("AI Error:", e);
        throw e;
    }
}

export async function generateAnamnesisText(qp: string, qaPairs: { question: string, answer: string }[]): Promise<string> {
    if (!API_KEY) throw new Error("API Key not configured");

    const context = qaPairs.map(qa => `Pergunta: ${qa.question}\nResposta: ${qa.answer}`).join('\n\n');
    const prompt = `Atue como médico. Com base na QP: "${qp}" e nas seguintes respostas da anamnese:\n\n${context}\n\nRedija um texto coerente, técnico e fluido para o campo "História da Doença Atual" (HDA) de um prontuário médico. Use termos técnicos médicos padrão. Não use tópicos, faça um parágrafo narrativo.`;

    try {
        const result = await model.generateContent(prompt);
        return result.response.text();
    } catch (e) {
        console.error("AI Error:", e);
        throw e;
    }
}

export async function extractDataFromFile(fileBase64: string, mimeType: string): Promise<any> {
    if (!API_KEY) throw new Error("API Key not configured");

    const prompt = `Extraia dados médicos para JSON estrito: nome, idade, prontuario, gpa, ultimo_parto, filhos_vivos, curetagem, ig_usg, ts, toxo, gj, totg, comorbidades, muc, alergias, cirurgias, habitos, pn_count, gbs, maturacao, qp, hda, pa, fc, abd, dinamica, afu, bcf, mf, especular, tv, mmii, apae1, apae2, usg_1t, usg_morf, usg_ultimo, dum, sexarca, mac. Responda APENAS o JSON.`;

    try {
        const result = await model.generateContent([
            prompt,
            {
                inlineData: {
                    data: fileBase64,
                    mimeType: mimeType
                }
            }
        ]);

        const text = result.response.text();
        // Clean up potential markdown code blocks
        const jsonString = text.replace(/```json/g, '').replace(/```/g, '').trim();
        return JSON.parse(jsonString);
    } catch (e) {
        console.error("AI Error:", e);
        throw e;
    }
}
