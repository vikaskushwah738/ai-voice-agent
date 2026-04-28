import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type CallWebhookBody = {
    roomName: string;
    leadId: string;
    queueId?: string;
    status: "completed" | "failed" | "no_answer" | "busy";
    transcript?: string;
    summary?: string;
    recordingUrl?: string;
    errorMessage?: string;
};

export async function POST(req: Request) {
    try {
        const body = (await req.json()) as CallWebhookBody;

        const endedAt = new Date();

        await prisma.callLog.updateMany({
            where: {
                roomName: body.roomName,
            },
            data: {
                status: body.status,
                transcript: body.transcript ?? undefined,
                summary: body.summary ?? undefined,
                recordingUrl: body.recordingUrl ?? undefined,
                errorMessage: body.errorMessage ?? undefined,
                endedAt,
            },
        });

        if (body.queueId) {
            await prisma.callQueue.update({
                where: { id: body.queueId },
                data: {
                    status: body.status,
                    finishedAt: endedAt,
                    errorMessage: body.errorMessage ?? undefined,
                },
            });
        }

        await prisma.lead.update({
            where: { id: body.leadId },
            data: {
                calledAt: endedAt,
                callStatus: body.status,
            },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Call webhook error:", error);
        return NextResponse.json(
            { success: false, message: "Failed to handle webhook" },
            { status: 500 }
        );
    }
}