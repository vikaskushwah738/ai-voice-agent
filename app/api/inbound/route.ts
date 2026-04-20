//               Customer calls 📞
//               ↓
//               Twilio receives call
//               ↓
//               Streams audio to GPT Realtime
//               ↓
//               AI responds live
//               ↓
//               Voice goes back to caller


// CRM lead form → Twilio outbound call → Twilio Media Stream → Sarvam STT(saaras: v3) → GPT decision engine(gpt - 4o)
//  → Sarvam TTS(bulbul: v3) → Google Calendar booking → CRM update → optional human transfer


//                   [Website Form / CRM Lead]
//                              |
//                              v
//                      [Backend Trigger]
//                              |
//                              v
//                      [Backend Trigger]
//                              |
//                              v
//                   [Twilio Outbound Call]
//                             |
//                             v
//               [Twilio Media Streams WebSocket]
//                             |
//                             v
//                 [Sarvam STT: saaras:v3]
//                             |
//                             v
//              [GPT Decision Engine: gpt - 4o]
//                             |
//               -----------------------------
//               |             |             |
//               v             v             v
//          [Book Slot]   [Transfer]   [End / Callback]
//                             |
//                             v
//                   [Google Calendar API]
//                             |
//                             v
//                        [CRM Update]
//                             |
//                             v
//                    [Sarvam TTS: bulbul:v3]
//                             |
//                             v
//             [Twilio plays AI response to caller]


// https://developers.openai.com/api/docs/models/gpt-4o


// New Lead
// → Assigned to Fresher

// Fresher handles:
// → initial call
// → qualification

// IF lead becomes valuable OR fresher stuck:
// → Transfer to Senior(single lead)

// IF agent leaves:
// → Bulk transfer to other agents

// Final Owner:
// → Senior handles closing + site visits


//Lead → Fresher → Senior → Deal Closed → Relationship Manager(RM)


import { leadSchema } from "@/lib/validations/lead";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // ✅ Zod validation
        const result = leadSchema.safeParse(body);

        if (!result.success) {
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

        // ✅ DB call
        const lead = await prisma.lead.create({
            data: {
                name: data.name,
                phone: data.mobile,
                email: data.email ? data.email.toLowerCase() : null,
                projectName: data.projectName,
            },
        });

        return NextResponse.json(
            {
                success: true,
                message: "Lead created successfully",
                data: lead,
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

//vikas
// Vikas12376