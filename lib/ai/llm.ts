// src/lib/ai/llm.ts
// Optional helper for plain OpenAI text generation.
// You may not even need this if you use the LiveKit OpenAI plugin directly in the agent.

// OpenAI model choice is set in code as a model string, and gpt - 
// 4o - mini is a current API model family rather than something selected on the key itself

import OpenAI from "openai";
import { env } from "../env";

const openai = new OpenAI({
    apiKey: env.OPENAI_API_KEY,
});

export async function generateReply(input: string) {
    try {
        const response = await openai.responses.create({
            model: env.OPENAI_MODEL,
            input,
        });

        return response.output_text ?? "";
    } catch (error: any) {
        console.error("[llm] ERROR", {
            message: error?.message,
            status: error?.status,
            code: error?.code,
            name: error?.name,
            stack: error?.stack,
        });
        throw error;
    }
}