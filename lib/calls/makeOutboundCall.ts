//Only handles:

// room creation
// SIP participant creation
// returns call metadata

// LiveKit’s JS Server SDK uses RoomServiceClient and SipClient, and outbound calls are placed by creating
// a SIP participant in a room with your outbound SIP trunk ID.

import { SipClient } from "livekit-server-sdk";
import { env } from "@/lib/env";
import { MakeOutboundCallArgs } from "@/types/call";

export async function makeOutboundCall({
    leadId,
    phoneNumber,
    roomName,
    participantName,
    participantIdentity,
    requestId = `call-${Date.now()}`,
}: MakeOutboundCallArgs) {
    const sipClient = new SipClient(
        env.LIVEKIT_URL,
        env.LIVEKIT_API_KEY,
        env.LIVEKIT_API_SECRET
    );

    try {
        console.log(`[${requestId}] [makeOutboundCall] Creating SIP participant`, {
            trunkId: env.SIP_OUTBOUND_TRUNK_ID,
            phoneNumber,
            participantName,
            participantIdentity,
            roomName,
        });

        const participant = await sipClient.createSipParticipant(
            env.SIP_OUTBOUND_TRUNK_ID,
            phoneNumber,
            roomName,
            {
                participantIdentity,
                participantName,
                waitUntilAnswered: true, // Wait for user to pick up before agent starts
                participantAttributes: {
                    leadId,
                    phoneNumber,
                    source: "outbound-call",
                },
            }
        );

        console.log(`[${requestId}] [makeOutboundCall] SIP participant created`, {
            participantId: participant.participantId,
            participantIdentity: participant.participantIdentity,
            sipCallId: participant.sipCallId,
            roomName,
        });

        return {
            roomName,
            participantId: participant.participantId,
            participantIdentity: participant.participantIdentity,
            sipCallId: participant.sipCallId,
        };
    } catch (error: any) {
        console.error(`[${requestId}] [makeOutboundCall] ERROR`, {
            message: error?.message,
            status: error?.status,
            code: error?.code,
            name: error?.name,
            stack: error?.stack,
            roomName,
            phoneNumber,
            leadId,
        });
        throw error;
    }
}