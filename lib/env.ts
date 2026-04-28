// src/lib/config/env.ts
function getEnv(name: string): string {
    const value = process.env[name];
    if (!value) {
        throw new Error(`Missing required environment variable: ${name}`);
    }
    return value;
}

export type SarvamSttModel = "saaras:v3" | "saaras:v2.5";
export type SarvamTtsModel = "bulbul:v3";

type DeepgramSTTModel = 'nova-2' | 'nova-2-general' | 'nova-2-meeting' | 'nova-2-phonecall' | 'nova-2-voiceai' | 'nova-2-chirp' | 'nova-3' | 'nova-3-general' | 'enhanced' | 'base' | 'whisper' | 'whisper-tiny' | 'whisper-base' | 'whisper-small' | 'whisper-medium' | 'whisper-large';

function getDeepgramModel(): DeepgramSTTModel {
    const value = process.env.DEEPGRAM_MODEL;
    // List of valid models (match plugin's STTModels)
    const validModels: DeepgramSTTModel[] = ['nova-2', 'nova-2-general', 'nova-2-meeting', 'nova-2-phonecall', 'nova-2-voiceai', 'nova-2-chirp', 'nova-3', 'nova-3-general'];
    if (value && validModels.includes(value as DeepgramSTTModel)) {
        return value as DeepgramSTTModel;
    }
    return 'nova-2'; // default
}

function getSarvamSttModel(): SarvamSttModel {
    const value = process.env.SARVAM_STT_MODEL;
    if (
        value === "saaras:v3" ||
        value === "saaras:v2.5"

    ) {
        return value;
    }
    return "saaras:v3";
}

function getSarvamTtsModel(): SarvamTtsModel {
    const value = process.env.SARVAM_TTS_MODEL;
    if (value === "bulbul:v3") {
        return value;
    }
    return "bulbul:v3";
}

export const env = {
    // LiveKit
    LIVEKIT_URL: getEnv("LIVEKIT_URL"),
    LIVEKIT_API_KEY: getEnv("LIVEKIT_API_KEY"),
    LIVEKIT_API_SECRET: getEnv("LIVEKIT_API_SECRET"),
    SIP_OUTBOUND_TRUNK_ID: getEnv("SIP_OUTBOUND_TRUNK_ID"),
    LIVEKIT_AGENT_NAME: getEnv("LIVEKIT_AGENT_NAME"),

    // OpenAI
    OPENAI_API_KEY: getEnv("OPENAI_API_KEY"),
    OPENAI_MODEL: process.env.OPENAI_MODEL || "gpt-4o-mini",

    // Sarvam
    SARVAM_API_KEY: getEnv("SARVAM_API_KEY"),
    //  SARVAM_STT_MODEL: getSarvamSttModel(),
    SARVAM_TTS_MODEL: getSarvamTtsModel(),
    SARVAM_VOICE: process.env.SARVAM_VOICE || "shubh",
    SARVAM_LANGUAGE_CODE: process.env.SARVAM_LANGUAGE_CODE || "hi-IN",

    // Deepgram (new)
    DEEPGRAM_API_KEY: getEnv("DEEPGRAM_API_KEY"),      // now required
    DEEPGRAM_MODEL: getDeepgramModel(),           // configurable via .env
    DEEPGRAM_LANGUAGE: process.env.DEEPGRAM_LANGUAGE || "multi",
    DEEPGRAM_SMART_FORMAT: process.env.DEEPGRAM_SMART_FORMAT !== "false",
    DEEPGRAM_PUNCTUATE: process.env.DEEPGRAM_PUNCTUATE !== "false",
    DEEPGRAM_INTERIM_RESULTS: process.env.DEEPGRAM_INTERIM_RESULTS === "true",
    DEEPGRAM_ENDPOINTING: parseInt(process.env.DEEPGRAM_ENDPOINTING || "500", 10),

    // Testing
    TEST_PHONE_NUMBER: process.env.TEST_PHONE_NUMBER || "",
};