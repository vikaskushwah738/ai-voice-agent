"use client";

import Link from "next/link";
import Image from "next/image";
import { LeadForm } from "../LeadForm";
import { PROJECT } from "@/data/home";

const HeroSection = () => {
    return (
        <section className="relative min-h-screen flex items-end overflow-hidden">

            {/* Background Image */}
            <Image
                src="/hero-aerial.jpg"
                alt="Aerial twilight view of Godrej International masterplan"
                fill
                priority
                className="object-cover"
            />

            {/* Overlays */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/40" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/10 to-transparent lg:via-black/5" />


            <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 lg:px-12 pb-16 lg:pb-24 pt-32">
                <div className="grid lg:grid-cols-12 gap-12 items-end">

                    {/* Left Content */}
                    <div className="lg:col-span-7 ">
                        <p className="font-medium text-sm text-[#E5B579] flex items-center gap-3">
                            <span className="h-[1px] w-10 bg-[#CE9A43]" />
                            Pre-Launch · {PROJECT.location.split(",").slice(-1)[0].trim()}
                        </p>

                        <h1 className="mt-6 text-[#FFFFF0] font-serif text-5xl md:text-7xl lg:text-[5.5rem] leading-[0.98] tracking-tight">
                            An Address <em className="text-[#CE9A43] not-italic">Beyond</em>
                            <br />
                            Borders.
                        </h1>

                        <p className="mt-7 max-w-xl text-base lg:text-lg text-[#FFFFF0] leading-relaxed">
                            A 12-acre mixed-use estate of sky residences, Grade-A business spaces and curated retail — by Godrej Properties.
                        </p>

                        {/* Stats */}
                        <div className="mt-8 grid grid-cols-3 gap-6 max-w-xl border-t border-[#FFFFF033] pt-6">
                            <div>
                                <p className="text-[10px] uppercase tracking-widest text-[#A8A684]">
                                    Configuration
                                </p>
                                <p className="font-serif text-xl mt-2 text-[#FDFAF4]">3 & 4 BHK</p>
                            </div>

                            <div>
                                <p className="text-[10px] uppercase tracking-widest text-[#A8A684]">
                                    Pricing
                                </p>
                                <p className="font-serif text-xl mt-2 text-[#FDFAF4]">
                                    {PROJECT.pricing}
                                </p>
                            </div>

                            <div>
                                <p className="text-[10px] uppercase tracking-widest text-[#A8A684]">
                                    Estate
                                </p>
                                <p className="font-serif text-xl mt-2 text-[#FDFAF4]">12 Acres</p>
                            </div>
                        </div>

                        {/* CTA Buttons (FIXED) */}
                        <div className="mt-10 flex flex-wrap gap-4">

                            <Link
                                href="/reach-us"
                                className="bg-[#CE9A43] text-ink hover:bg-[#CE9A43]/90 text-lg font-medium py-3 px-6 rounded-md transition-colors duration-500"
                            >
                                Book Site Visit
                            </Link>

                            <Link
                                href="/floor-plans"
                                className="border border-ivory/50 text-[#FDFAF4] hover:bg-ivory/10 text-lg font-medium py-3 px-6 rounded-md transition-colors duration-500"
                            >
                                Download Brochure
                            </Link>

                        </div>
                    </div>

                    {/* Lead Form */}
                    <div className="lg:col-span-5 hidden lg:block">
                        <div className="bg-[#F3F0ED] backdrop-blur-md p-8 shadow-[var(--shadow-elevated)]">
                            <LeadForm compact={false} title="Reserve a Private Preview" />
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default HeroSection;