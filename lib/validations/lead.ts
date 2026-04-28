import { z } from "zod";

export const leadSchema = z.object({
    name: z
        .string()
        .trim()
        .min(2, "Name must be at least 2 characters"),

    phone: z
        .string()
        .trim()
        .regex(/^(\+91)?[6-9]\d{9}$/, "Invalid Indian mobile number"),

    email: z
        .string()
        .trim()
        .email("Invalid email")
        .optional()
        .or(z.literal("")),

    interest: z
        .string()
        .trim()
        .optional()
        .or(z.literal("")),
});

export type LeadInput = z.infer<typeof leadSchema>;