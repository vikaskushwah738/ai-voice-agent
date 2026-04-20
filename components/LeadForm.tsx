"use client";

import { PROJECT } from "@/data/home";
import { leadSchema, type LeadInput } from "@/lib/validations/lead";
import { useState } from "react";

interface Props {
    variant?: "light" | "dark";
    compact?: boolean;
    title?: string;
    subtitle?: string;
}

type FormErrors = Partial<Record<keyof LeadInput, string>>;

export function LeadForm({
    variant = "light",
    compact = false,
    title = "Reserve a Private Preview",
    subtitle = "Limited residences. Pre-launch pricing closes soon.",
}: Props) {
    const [form, setForm] = useState<LeadInput>({
        name: "",
        mobile: "",
        email: "",
        message: "",
    });

    const [errors, setErrors] = useState<FormErrors>({});
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const dark = variant === "dark";

    const inputClass = dark
        ? "w-full bg-transparent border-b border-ivory/30 py-3 text-ivory placeholder:text-ivory/50 focus:border-[var(--gold)] focus:outline-none transition-colors"
        : "w-full bg-transparent border-b border-ink/20 py-3 text-ink placeholder:text-ink/40 focus:border-[var(--gold)] focus:outline-none transition-colors";

    const validateField = (name: keyof LeadInput, value: string) => {
        const fieldSchema = leadSchema.shape[name];
        const result = fieldSchema.safeParse(value);

        setErrors((prev) => ({
            ...prev,
            [name]: result.success ? "" : result.error.issues[0]?.message || "Invalid value",
        }));
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target as {
            name: keyof LeadInput;
            value: string;
        };

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));

        validateField(name, value);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const result = leadSchema.safeParse(form);

        if (!result.success) {
            const fieldErrors: FormErrors = {};

            for (const issue of result.error.issues) {
                const fieldName = issue.path[0] as keyof LeadInput;
                fieldErrors[fieldName] = issue.message;
            }

            setErrors(fieldErrors);
            return;
        }

        setLoading(true);

        try {
            console.log("Submitted lead:", form);

            setSubmitted(true);
            setForm({
                name: "",
                mobile: "",
                email: "",
                message: "",
            });
            setErrors({});
        } catch (error) {
            console.error("Lead submit error:", error);
        } finally {
            setLoading(false);
        }
    };

    if (submitted) {
        return (
            <div className={`text-center py-12 ${dark ? "text-ivory" : "text-ink"}`}>
                <div className="text-[#CE9A43] text-5xl mb-4">✦</div>
                <h3 className="font-serif text-2xl mb-3">Thank you</h3>
                <p className={`text-sm ${dark ? "text-ivory/70" : "text-muted-foreground"}`}>
                    A relationship manager will reach out within the next business hour.
                </p>
            </div>
        );
    }

    return (
        <div className={dark ? "text-ivory" : "text-ink"}>
            {!compact && (
                <div className="mb-6">
                    <span className="text-[#9D7A5C]">Private Enquiry</span>
                    <h3 className="font-serif text-3xl mt-3 leading-tight">{title}</h3>
                    <p className={`mt-3 text-sm leading-relaxed ${dark ? "text-ivory/70" : "text-[#59534D]"}`}>
                        {subtitle}
                    </p>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                    <input
                        name="name"
                        required
                        type="text"
                        placeholder="Full Name"
                        value={form.name}
                        autoComplete="off"
                        onChange={handleChange}
                        className={inputClass}
                    />
                    {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                </div>

                <div>
                    <input
                        name="mobile"
                        required
                        type="tel"
                        placeholder="Mobile Number"
                        value={form.mobile}
                        autoComplete="off"
                        onChange={handleChange}
                        className={inputClass}
                    />
                    {errors.mobile && <p className="mt-1 text-sm text-red-500">{errors.mobile}</p>}
                </div>

                <div>
                    <input
                        name="email"
                        type="email"
                        placeholder="Email Address"
                        value={form.email}
                        autoComplete="off"
                        onChange={handleChange}
                        className={inputClass}
                    />
                    {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                </div>

                <div>
                    <select
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        className={inputClass}
                        defaultValue=""

                    >
                        <option disabled value="">Select enquiry type</option>
                        <option value="Pricing">3 BHk Sky Residency</option>
                        <option value="Site Visit">4 BHk Sky Residency</option>
                        <option value="Floor Plans">Penthouse</option>
                        <option value="Availability">Business Spaces</option>
                    </select>
                    {errors.message && <p className="mt-1 text-sm text-red-500">{errors.message}</p>}
                </div>

                <button
                    disabled={loading}
                    type="submit"
                    className="w-full bg-black hover:bg-black/90 text-gray-50 text-lg font-medium py-3 px-6 rounded-md transition-colors duration-500 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                    {loading ? "Submitting..." : "Request Callback"}
                </button>

                <p className={`text-[11px] leading-relaxed ${dark ? "text-ivory/50" : "text-muted-foreground"}`}>
                    By submitting, you authorise {PROJECT.brand} to contact you regarding {PROJECT.name}, overriding any DNCR registration.
                </p>
            </form>
        </div>
    );
}