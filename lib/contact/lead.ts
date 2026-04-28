// lib/lead.ts

export interface LeadPayload {
    name: string;
    phone: string;
    email: string | null;
    interest: string | null;
}

export async function submitLead(data: LeadPayload) {
    try {
        // Example: call your API route
        const res = await fetch("/api/contact-me", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (!res.ok) {
            throw new Error("Failed to submit lead");
        }

        return await res.json();
    } catch (error) {
        console.error("Submit error:", error);
        throw error;
    }
}