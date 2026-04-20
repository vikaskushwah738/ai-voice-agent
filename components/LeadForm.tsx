"use client";
import { PROJECT } from "@/data/home";
import { useState } from "react";


interface Props {
    variant?: "light" | "dark";
    compact?: boolean;
    title?: string;
    subtitle?: string;
}

export function LeadForm({
    variant = "light",
    compact = false,
    title = "Reserve a Private Preview",
    subtitle = "Limited residences. Pre-launch pricing closes soon.",
}: Props) {
    const [submitted, setSubmitted] = useState(false);
    const dark = variant === "dark";

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
    };

    const inputClass = dark
        ? "w-full bg-transparent border-b border-ivory/30 py-3 text-ivory placeholder:text-ivory/50 focus:border-[var(--gold)] focus:outline-none transition-colors"
        : "w-full bg-transparent border-b border-ink/20 py-3 text-ink placeholder:text-ink/40 focus:border-[var(--gold)] focus:outline-none transition-colors";

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
                    <span className="text-[#9D7A5C] ">Private Enquiry</span>
                    <h3 className="font-serif text-3xl mt-3 leading-tight">{title}</h3>
                    <p className={`mt-3 text-sm text-[#59534D] leading-relaxed ${dark ? "text-ivory/70" : "text-muted-foreground"}  `}>
                        {subtitle}
                    </p>
                </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-5">
                <input required type="text" placeholder="Full Name" className={inputClass} />
                <input required type="tel" placeholder="Mobile Number" className={inputClass} />
                <input required type="email" placeholder="Email Address" className={inputClass} />
                <select required defaultValue="" className={`${inputClass} appearance-none cursor-pointer`}>
                    <option value="" disabled className="text-ink">I'm interested in…</option>
                    <option className="text-ink">3 BHK Sky Residence</option>
                    <option className="text-ink">4 BHK Sky Residence</option>
                    <option className="text-ink">Penthouse</option>
                    <option className="text-ink">Business Space</option>
                </select>
                <button type="submit" className="text-gray-50 w-full bg-black  hover:bg-[#000000]/90 text-lg font-medium py-3 px-6 rounded-md transition-colors duration-500">
                    Request Callback
                </button>
                <p className={`text-[11px] leading-relaxed ${dark ? "text-ivory/50" : "text-muted-foreground"}`}>
                    By submitting, you authorise {PROJECT.brand} to contact you regarding {PROJECT.name}, overriding any DNCR registration.
                </p>
            </form>
        </div>
    );
}
