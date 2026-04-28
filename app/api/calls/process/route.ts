
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { makeOutboundCall } from "@/lib/livekit/outbound";

const MAX_CONCURRENT_CALLS = 1;

export async function POST() {
    try {
        console.log("🧠 [QUEUE] Checking pending calls at:", new Date().toISOString());

        const activeCalls = await prisma.callQueue.count({
            where: {
                status: "processing",
            },
        });

        if (activeCalls >= MAX_CONCURRENT_CALLS) {
            return NextResponse.json({
                success: true,
                message: "All call slots are busy",
            });
        }

        const nextQueue = await prisma.callQueue.findFirst({
            where: {
                status: "pending",
                scheduledAt: {
                    lte: new Date(),
                },
            },
            orderBy: [
                { priority: "desc" },
                { scheduledAt: "asc" },
                { createdAt: "asc" },
            ],
            include: {
                lead: true,
            },
        });

        console.log("📦 [QUEUE] Next queue item:", nextQueue?.id ?? null);

        if (!nextQueue) {
            return NextResponse.json({
                success: true,
                message: "No pending queue item ready to process",
            });
        }

        const roomName = `lead-${nextQueue.leadId}-${Date.now()}`;

        const claimed = await prisma.callQueue.updateMany({
            where: {
                id: nextQueue.id,
                status: "pending",
            },
            data: {
                status: "processing",
                startedAt: new Date(),
                attempts: {
                    increment: 1,
                },
                roomName,
            },
        });

        if (claimed.count === 0) {
            console.log("⚠️ [QUEUE] Queue already claimed by another process:", nextQueue.id);

            return NextResponse.json({
                success: true,
                message: "Queue already claimed",
            });
        }

        console.log("✅ [QUEUE] Claimed queue:", nextQueue.id);

        const outboundResult = await makeOutboundCall({
            leadId: nextQueue.leadId,
            phoneNumber: nextQueue.phone,
            roomName,
            participantName: nextQueue.lead.name,
        });

        console.log("📲 [QUEUE] Outbound call started:", {
            queueId: nextQueue.id,
            roomName,
            participant: outboundResult?.participant ?? null,
        });

        return NextResponse.json({
            success: true,
            message: "Call started successfully",
            queueId: nextQueue.id,
            roomName,
        });
    } catch (error) {
        console.error("❌ [QUEUE] Process queue error:", error);

        return NextResponse.json(
            {
                success: false,
                message: "Failed to process queue",
            },
            { status: 500 }
        );
    }
}

