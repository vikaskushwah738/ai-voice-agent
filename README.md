
For Indian providers:
Exotel
Knowlarity
MyOperator

👉 All support 16k — you need to configure it

→ LiveKit Agents (real-time audio infra) 

→ Sarvam Saaras v3 (Hindi STT) 

→ Sarvam Bulbul v3 (Hindi TTS — Kavya, Rohan, Priya voices) 

→ OpenAI / Groq (LLM brain)

→ Vobiz (Indian SIP telephony)

→ Python + FastAPI (backend + custom UI)

→ Supabase (database, CRM, call logs, recordings) 

→ Google Calendar / cal.com (appointment booking) 

→ Telegram Bot API (confirmation notifications)

→ Coolify + VPS (self-hosted deployment)



*****************************************************************************************************
#####################################################################################################

• Real estate lead qualification 

• Solar appointment booking 

• Agency client projects 

• Healthcare reminders

• Any repetitive calling


*****************************************************************************************************
#####################################################################################################

💰 COST BREAKDOWN:

MY AGENT: $0.028/min ($30/month)

VAPI: $0.09/min ($90/month)

SAVE: 70% ($720/year)

*****************************************************************************************************
#####################################################################################################

https://console.vobiz.ai
https://cloud.livekit.io

https://dashboard.sarvam.ai

https://groq.com


Best simple MVP stack
LiveKit for call transport / room
Sarvam STT for Hindi speech-to-text
Sarvam TTS for Hindi voice output
Groq for fast LLM reasoning
MongoDB for lead and call logs



*****************************************************************************************************
#####################################################################################################

Test in this order:

lead API works
queue row created
Inngest delayed event fires
LiveKit outbound dial works
unique room is created per lead
webhook updates queue and lead status

*****************************************************************************************************
#####################################################################################################


Phone call via Vobiz → LiveKit room → Agent listens with Sarvam STT → LLM decides response → Sarvam TTS speaks back into the room

pnpm add @livekit/agents @livekit/agents-plugin-openai @livekit/agents-plugin-sarvam

What goes where:

-Vobiz handles telecom and SIP trunking.
-LiveKit handles the real-time room and media routing.
-Sarvam STT converts caller speech to text.
-Your LLM decides what to say next.
-Sarvam TTS converts that response into spoken audio back to the caller.

1. Vobiz

Handles:

telecom
outbound trunk
phone number routing


2. LiveKit

Handles:

room creation
SIP participant join
audio media transport between phone and agent

LiveKit’s telephony flow is exactly this: use an outbound SIP trunk, create a SIP participant, and place that participant into a LiveKit room.

3. Sarvam STT + TTS

Handles:

caller speech → text
agent text → spoken reply

LiveKit has official Sarvam plugins for both STT and TTS in Node.js, and the Sarvam LiveKit guide is specifically for real-time voice agents.

4. LLM

Handles:

response generation
qualification logic
objection handling
booking logic

For your current stage, use gpt-4o-mini as the text brain. OpenAI model names are passed in code, not selected inside the API key

User clicks button / form submit
        ↓
POST /api/test-demo-call
        ↓
route.ts
        ↓ imports
makeOutboundCall.ts
        ↓
LiveKit room created
        ↓
SIP participant created with Vobiz trunk
        ↓
Phone joins LiveKit room
        ↓
LiveKit agent worker joins same room
        ↓
outboundVoiceAgent.ts starts pipeline
        ↓
Sarvam STT hears caller
        ↓
LLM decides reply
        ↓
Sarvam TTS speaks back into room

Use this file responsibility split:

route.ts → creates room, dispatches agent, creates SIP participant
makeOutboundCall.ts → only room/SIP logic
outboundVoiceAgent.ts → Sarvam STT + OpenAI + Sarvam TTS
llm.ts → OpenAI helper only, if you want separation
env.ts → shared env access




++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
npx tsx lib/agents/outboundVoiceAgent.ts dev