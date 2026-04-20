"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PROJECT } from "@/data/home";

const NAV = [
    { to: "/", label: "Overview" },
    { to: "/project", label: "The Project" },
    { to: "/amenities", label: "Amenities" },
    { to: "/floor-plans", label: "Residences" },
    { to: "/gallery", label: "Gallery" },
    { to: "/location", label: "Location" },
    { to: "/reach-us", label: "Contact" },
];

export function Header() {
    const pathname = usePathname();
    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 24);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const isHome = pathname === "/";

    const tone = isHome
        ? (scrolled ? "text-black" : "text-white")
        : "text-black";

    const toneSoft = isHome
        ? (scrolled
            ? "text-black/70 hover:text-black"
            : "text-white/80 hover:text-white")
        : "text-black/70 hover:text-black";

    return (
        <header
            className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled
                ? "bg-[#FDFAF4] backdrop-blur-md border-b border-ink/10 py-3"
                : "bg-transparent py-5"
                }`}
        >
            <div className="max-w-[1400px] mx-auto h-20 px-6 lg:px-12 flex items-center justify-between gap-6">

                {/* Logo */}
                <Link href="/" className={`flex flex-col leading-none ${tone}`}>
                    <span className={` ${toneSoft} font-serif text-2xl tracking-tight ${scrolled ? "text-ink" : "text-[#FDFAF4]"
                        }`}>
                        Godrej{" "}
                        <span
                            className={`italic ${scrolled ? "text-[#CE9A43]" : "text-[#CE9A43]"
                                }`}
                        >
                            Demo
                        </span>
                    </span>
                    <span
                        className={`text-[9px] mt-1 ${scrolled ? "" : "text-[#999393]"
                            }`}
                    >
                        By So Efforts Solution
                    </span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden lg:flex items-center gap-7 xl:gap-9">
                    {NAV.map((n) => {
                        const isActive = pathname === n.to;

                        return (
                            <Link
                                key={n.to}
                                href={n.to}
                                className={`
                  whitespace-nowrap text-[11px] uppercase tracking-[0.22em] font-medium transition-colors
                  ${toneSoft}
                  ${isActive
                                        ? `underline underline-offset-8 decoration-[#CE9A43] ${scrolled ? "text-ink" : "text-[#FDFAF4]"
                                        }`
                                        : ""
                                    }
                `}
                            >
                                {n.label}
                            </Link>
                        );
                    })}
                </nav>

                {/* Right Section */}
                <div className="hidden lg:flex items-center gap-4">
                    <a
                        href={`tel:${PROJECT.phoneTel}`}
                        className={`text-xs tracking-wider ${toneSoft}`}
                    >
                        {PROJECT.phoneDisplay}
                    </a>

                    {/* ⚠️ Fix: Don't wrap Link inside button */}
                    <Link
                        href="/reach-us"
                        className="text-sm text-ink hover:text-ink/80 bg-[#CE9A43] hover:bg-[#CE9A43]/90 text-ivory py-2 px-4 rounded-md transition-colors duration-300"
                    >
                        Book Site Visit
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <button
                    aria-label="Open menu"
                    className={`lg:hidden p-2 ${tone}`}
                    onClick={() => setOpen(true)}
                >
                    <Menu className="size-5" />
                </button>
            </div>

            {/* Mobile Menu */}
            {open && (
                <div className="fixed inset-0 z-50 bg-ivory flex flex-col lg:hidden">
                    <div className="flex items-center justify-between px-6 py-5 border-b border-ink/10">
                        <span className="font-serif text-xl text-ink">
                            Godrej{" "}
                            <em className="text-[var(--bronze)] not-italic">
                                International
                            </em>
                        </span>

                        <button onClick={() => setOpen(false)} className="p-2">
                            <X className="size-5" />
                        </button>
                    </div>

                    <nav className="flex-1 flex flex-col px-6 py-8 gap-1">
                        {NAV.map((n) => (
                            <Link
                                key={n.to}
                                href={n.to}
                                onClick={() => setOpen(false)}
                                className="font-serif text-3xl py-3 text-ink border-b border-ink/5"
                            >
                                {n.label}
                            </Link>
                        ))}
                    </nav>

                    <div className="p-6 border-t border-ink/10 flex flex-col gap-3">
                        <a href={`tel:${PROJECT.phoneTel}`} className="text-sm text-ink/70">
                            {PROJECT.phoneDisplay}
                        </a>

                        <Link
                            href="/reach-us"
                            onClick={() => setOpen(false)}
                            className="text-sm font-medium text-ink hover:text-ink/80"
                        >
                            Book Site Visit
                        </Link>
                    </div>
                </div>
            )}
        </header>
    );
}