import { leadSchema } from "@/lib/validations/lead";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
    try {
        const body = await request.json();

        console.log(" ✅ Received lead data:", body);
        // ✅ Zod validation
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

        // ✅ DB call
        const lead = await prisma.lead.create({
            data: {
                name: data.name,
                phone: data.phone,
                email: data.email ? data.email.toLowerCase() : null,
                message: data.message,
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



export async function GET() {
    try {
        const clientinfo = await prisma.lead.findMany();
        return NextResponse.json(clientinfo, { status: 200 });
    } catch (error) {
        console.log('Error fetching client info:', error);
        return NextResponse.json({ message: 'Clould not find client info' }, { status: 500 })
    }
}