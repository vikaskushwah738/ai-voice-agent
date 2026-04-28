import { leadSchema } from "@/lib/validations/lead";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
// import { inngest } from "@/lib/inngest/client";

function normalizeIndianPhone(phone: string) {
    console.log("📞 [PHONE] Raw input:", phone);

    const cleaned = phone.replace(/[^\d+]/g, "").trim();

    console.log("📞 [PHONE] Cleaned value:", cleaned);

    if (cleaned.startsWith("+91") && cleaned.length === 13) {
        console.log("✅ [PHONE] Already in +91 format:", cleaned);
        return cleaned;
    }

    if (/^\d{10}$/.test(cleaned)) {
        const normalized = `+91${cleaned}`;
        console.log("✅ [PHONE] Converted to +91 format:", normalized);
        return normalized;
    }

    console.error("❌ [PHONE] Invalid number after cleaning:", cleaned);

    throw new Error("Invalid phone number");
}


export async function POST(request: Request) {
    try {
        const body = await request.json();

        console.log("✅ Received lead data:", body);

        const result = leadSchema.safeParse(body);

        if (!result.success) {
            console.warn("❌ Validation failed:", result.error.flatten().fieldErrors);

            return NextResponse.json(
                {
                    success: false,
                    message: "Validation failed",
                    errors: result.error.flatten().fieldErrors,
                },
                { status: 400 }
            );
        }

        const data = result.data;

        let normalizedPhone: string;

        try {
            normalizedPhone = normalizeIndianPhone(data.phone);
        } catch {
            console.log("❌ Phone normalization failed for:", data.phone);
            return NextResponse.json(
                {
                    success: false,
                    message: "Invalid phone number format",
                },
                { status: 400 }
            );
        }

        // prevent duplicate lead within last 10 minutes
        const existingLead = await prisma.lead.findFirst({

            where: {
                phone: normalizedPhone,
                createdAt: {
                    gte: new Date(Date.now() - 10 * 60 * 1000),
                },
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        if (existingLead) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Lead already submitted recently",
                },
                { status: 409 }
            );
        }

        // const callDelayMinutes = 1; // delay call by 1 minute to allow for lead creation and queueing
        // const scheduledAt = new Date(Date.now() + callDelayMinutes * 60 * 1000);

        const delaySeconds = 10;  // delay call by 10 seconds to allow for lead creation and queueing
        const scheduledAt = new Date(Date.now() + delaySeconds * 1000);

        console.log(`⏰ Scheduling call for ${scheduledAt.toISOString()}`);

        // transaction: create lead + queue together
        const { lead, queue } = await prisma.$transaction(async (tx) => {
            const lead = await tx.lead.create({
                data: {
                    name: data.name,
                    phone: normalizedPhone,
                    email: data.email ? data.email.toLowerCase() : null,
                    interest: data.interest || null,
                    status: "NEW",
                    callStatus: "pending",
                    callScheduledAt: scheduledAt,
                    source: "website",
                },
            });
            console.log(`✅ Lead created with ID ${lead.id}`);
            const queue = await tx.callQueue.create({
                data: {
                    leadId: lead.id,
                    phone: normalizedPhone,
                    scheduledAt,
                    status: "pending",
                    attempts: 0,
                    priority: 0,
                },
            });
            console.log(`✅ Queue created with ID ${queue.id} for Lead ID ${lead.id}`);
            return { lead, queue };
        });

        // schedule delayed event
        // await inngest.send({
        //     name: "lead/call.requested",
        //     data: {
        //         leadId: lead.id,
        //         queueId: queue.id,
        //     },
        //     ts: scheduledAt.getTime(),
        // });
        console.log(`✅ Lead created with ID ${lead.id} and queued with ID ${queue.id}`);
        return NextResponse.json(
            {
                success: true,
                message: "Lead created successfully",
                data: lead,
                queueId: queue.id,
                scheduledAt,
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("POST /lead error:", error);

        return NextResponse.json(
            {
                success: false,
                message: "Something went wrong",
            },
            { status: 500 }
        );
    }
}



export async function GET() {
    try {
        const leads = await prisma.lead.findMany({
            orderBy: {
                createdAt: "desc",
            },
        });

        return NextResponse.json(leads, {
            headers: {
                "Cache-Control": "no-store",
            },
        });
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to fetch leads" },
            { status: 500 }
        );
    }
}