import { z } from "zod";

export const leadSchema = z.object({
    name: z
        .string()
        .min(2, "Name must be at least 2 characters")
        .trim(),

    mobile: z
        .string()
        .regex(/^\+?[1-9]\d{7,14}$/, "Invalid international mobile number"),


    email: z
        .string()
        .email("Invalid email")
        .optional()
        .or(z.literal("")), // allows empty string

    city: z
        .string()
        .min(1, "City is required")
        .trim(),

    projectName: z
        .string()
        .min(1, "Project name is required")
        .trim(),
});

// 👉 Type inference (important for TS)
export type LeadInput = z.infer<typeof leadSchema>;