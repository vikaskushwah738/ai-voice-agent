import "dotenv/config";

import {
    cli,
    defineAgent,
    voice,
    WorkerOptions,
} from "@livekit/agents";

import * as deepgramPlugin from "@livekit/agents-plugin-deepgram";
import * as sarvam from "@livekit/agents-plugin-sarvam";
import * as openaiPlugin from "@livekit/agents-plugin-openai";
import * as silero from "@livekit/agents-plugin-silero";

import { env } from "../env";
import { knowledge } from "@/data/knowledge";
import { prompts } from "@/data/prommpt";

import path from "node:path";
import { fileURLToPath } from "node:url";

console.log("[agent-worker] process started");

function timer(label: string, jobId: string) {
    const start = Date.now();

    return {
        end(extra?: Record<string, unknown>) {
            const durationMs = Date.now() - start;
            console.log(`[${jobId}] [timer] ${label}`, {
                durationMs,
                ...(extra || {}),
            });
        },
    };
}

function getInstructions() {
    return `
${prompts}

Knowledge Base:
${knowledge}

VERY IMPORTANT SPEED RULES:
- ALWAYS start your reply with a single filler word ONLY: "Haan," or "Hmm," or "Acha," — nothing else first.
- After the filler, give your actual reply in 1 short sentence.
- Phone-call style only. Maximum 2 sentences total.
- One question at a time.
- Do not explain or elaborate.
- Avoid long Hindi/English mixed sentences.
`;
}

export default defineAgent({
    entry: async (ctx) => {
        const jobId = ctx.job?.id || `job-${Date.now()}`;
        const totalTimer = timer("TOTAL_JOB", jobId);

        try {
            console.log(`[${jobId}] job received`, {
                metadata: ctx.job?.metadata,
            });

            const connectTimer = timer("ctx.connect", jobId);
            await ctx.connect();
            connectTimer.end({ roomName: ctx.room.name });

            let metadata: Record<string, any> = {};

            try {
                metadata = ctx.job?.metadata ? JSON.parse(ctx.job.metadata) : {};
            } catch (error: any) {
                console.error(`[${jobId}] metadata parse failed`, error?.message);
            }

            const participantIdentity = metadata.participantIdentity;

            const participant = participantIdentity
                ? await ctx.waitForParticipant(participantIdentity)
                : await ctx.waitForParticipant();

            console.log(`[${jobId}] caller joined`, {
                identity: participant.identity,
                name: participant.name,
            });

            const sessionTimer = timer("create AgentSession", jobId);

            const session = new voice.AgentSession({
                vad: await silero.VAD.load({
                    minSpeechDuration: 0.1,
                    minSilenceDuration: 0.3, // Reduced for faster cut-in
                } as any),

                stt: new deepgramPlugin.STT({
                    model: env.DEEPGRAM_MODEL as any,
                    language: env.DEEPGRAM_LANGUAGE,

                    smartFormat: true,
                    punctuate: true,

                    // faster response — reads from env so config is single source of truth
                    interimResults: true,
                    endpointing: env.DEEPGRAM_ENDPOINTING, // 300ms from env
                } as any),

                llm: new openaiPlugin.LLM({
                    model: env.OPENAI_MODEL,
                    temperature: 0.4, // Slightly higher for more natural filler words
                }),

                tts: new sarvam.TTS({
                    model: env.SARVAM_TTS_MODEL,
                    speaker: env.SARVAM_VOICE,
                    targetLanguageCode: env.SARVAM_LANGUAGE_CODE,
                    streaming: true,
                }),
            });

            sessionTimer.end({
                sttModel: env.DEEPGRAM_MODEL,
                ttsModel: env.SARVAM_TTS_MODEL,
                llmModel: env.OPENAI_MODEL,
            });

            session.on(voice.AgentSessionEventTypes.UserInputTranscribed, (event) => {
                const transcript = event.transcript?.trim();

                if (!transcript) {
                    console.log(`[${jobId}] empty transcript`, {
                        isFinal: event.isFinal,
                    });
                    return;
                }

                console.log(`[${jobId}] USER SAID`, {
                    transcript,
                    isFinal: event.isFinal,
                });
            });

            const startTimer = timer("session.start", jobId);

            await session.start({
                room: ctx.room,
                agent: new voice.Agent({
                    instructions: getInstructions(),
                }),
            });

            startTimer.end();

            const greeting = "Hi, Bhavani bol rahi hoon. Baat kar sakte ho?";

            const greetingTimer = timer("greeting", jobId);

            await session.say(greeting, {
                allowInterruptions: true,
            });

            greetingTimer.end();

            await new Promise((resolve) => {
                let finished = false;
                let timeout: NodeJS.Timeout;

                const done = (reason: string) => {
                    if (finished) return;
                    finished = true;
                    clearTimeout(timeout);
                    console.log(`[${jobId}] call ending`, { reason });
                    resolve(null);
                };

                timeout = setTimeout(() => {
                    done("timeout");
                }, 5 * 60 * 1000);

                ctx.room.on("disconnected", () => {
                    done("room_disconnected");
                });

                ctx.room.on("participantDisconnected", (p) => {
                    if (p.identity === participant.identity) {
                        done("participant_disconnected");
                    }
                });
            });

            totalTimer.end();
        } catch (error: any) {
            console.error(`[${jobId}] ERROR`, {
                message: error?.message,
                stack: error?.stack,
            });

            totalTimer.end({ failed: true });
        }
    },
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const agentEntry = path.resolve(__dirname, "outboundVoiceAgent.ts");

cli.runApp(
    new WorkerOptions({
        agent: agentEntry,
        agentName: "godrej",
    })
);