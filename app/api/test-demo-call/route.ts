import { NextResponse } from "next/server";
import {
    AgentDispatchClient,
    RoomServiceClient,
} from "livekit-server-sdk";

import { makeOutboundCall } from "@/lib/calls/makeOutboundCall";
import { env } from "@/lib/env";

export async function POST() {
    const requestId = `demo-${Date.now()}`;
    const roomName = `demo-call-${Date.now()}`;
    const participantIdentity = "lead-demo-lead";

    try {
        if (!env.TEST_PHONE_NUMBER) {
            return NextResponse.json(
                { error: "Missing TEST_PHONE_NUMBER" },
                { status: 500 }
            );
        }

        console.log(`[${requestId}] [route] Starting demo call flow`, {
            roomName,
            phone: env.TEST_PHONE_NUMBER,
            agentName: env.LIVEKIT_AGENT_NAME,
            participantIdentity,
        });

        const roomService = new RoomServiceClient(
            env.LIVEKIT_URL,
            env.LIVEKIT_API_KEY,
            env.LIVEKIT_API_SECRET
        );

        const dispatchClient = new AgentDispatchClient(
            env.LIVEKIT_URL,
            env.LIVEKIT_API_KEY,
            env.LIVEKIT_API_SECRET
        );


        await roomService.createRoom({ name: roomName });

        console.log(`[${requestId}] [route] Room created`, { roomName });

        const dispatch = await dispatchClient.createDispatch(
            roomName,
            env.LIVEKIT_AGENT_NAME,
            {
                metadata: JSON.stringify({
                    requestId,
                    phoneNumber: env.TEST_PHONE_NUMBER,
                    participantIdentity,
                    source: "test-demo-call",
                }),
            }
        );

        console.log(`[${requestId}] [route] Agent dispatch created`, {
            id: dispatch.id,
            room: dispatch.room,
            agentName: dispatch.agentName,
            metadata: dispatch.metadata,
        });

        const outboundCall = await makeOutboundCall({
            leadId: "demo-lead",
            phoneNumber: env.TEST_PHONE_NUMBER,
            roomName,
            participantName: "Demo Callee",
            participantIdentity,
            requestId,
        });

        console.log(`[${requestId}] [route] Demo call flow completed`, {
            roomName,
            participantId: outboundCall.participantId,
            sipCallId: outboundCall.sipCallId,
        });

        return NextResponse.json({
            success: true,
            requestId,
            roomName,
            dispatch,
            outboundCall,
        });
    } catch (error: any) {
        console.error(`[${requestId}] [route] ERROR`, {
            message: error?.message,
            status: error?.status,
            code: error?.code,
            name: error?.name,
            stack: error?.stack,
            roomName,
        });

        // Clean up the orphaned room so it doesn't linger
        try {
            const roomService = new RoomServiceClient(
                env.LIVEKIT_URL,
                env.LIVEKIT_API_KEY,
                env.LIVEKIT_API_SECRET
            );
            await roomService.deleteRoom(roomName);
            console.log(`[${requestId}] [route] Cleaned up room after error`, { roomName });
        } catch (cleanupError: any) {
            console.warn(`[${requestId}] [route] Room cleanup failed`, {
                message: cleanupError?.message,
            });
        }

        // Detect SIP-specific errors for clearer responses
        const errorMsg = error?.message || "Unknown error";
        const isSipBusy = errorMsg.includes("486");
        const isSipTimeout = errorMsg.includes("408") || errorMsg.includes("timeout");
        const isSipNoAnswer = errorMsg.includes("480") || errorMsg.includes("487");

        let userMessage = "Failed to start demo call";
        if (isSipBusy) userMessage = "Phone is busy. Wait a minute and try again.";
        else if (isSipTimeout) userMessage = "Call timed out. The phone may be unreachable.";
        else if (isSipNoAnswer) userMessage = "No answer. The phone may be switched off or unavailable.";

        return NextResponse.json(
            {
                success: false,
                error: userMessage,
                details: errorMsg,
                roomName,
            },
            { status: 500 }
        );
    }
}

