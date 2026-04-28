export function normalizeIndianPhone(phone: string): string {
    const cleaned = phone.replace(/[^\d+]/g, "").trim();

    if (cleaned.startsWith("+91") && cleaned.length === 13) {
        return cleaned;
    }

    if (/^\d{10}$/.test(cleaned)) {
        return `+91${cleaned}`;
    }

    throw new Error("Invalid phone number. Expected 10-digit Indian mobile or +91 format.");
}