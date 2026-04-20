interface Props {
    eyebrow?: string;
    title: string;
    subtitle?: string;
    align?: "left" | "center";
}

export function SectionHeading({ eyebrow, title, subtitle, align = "left" }: Props) {
    const a = align === "center" ? "text-center mx-auto" : "text-left";
    return (
        <div className={`max-w-2xl ${a}`}>
            {eyebrow && (
                <p className="text-[#A0774C] uppercase text-xs flex items-center gap-3 justify-start">
                    {align === "center" && (
                        <span className="h-[1px] w-10 bg-[#CE9A43]" />
                    )}
                    {eyebrow}
                    <span className="h-[1px] w-10 bg-[#CE9A43]" />
                </p>
            )}
            <h2
                className="mt-4 font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.05] text-ink"
                dangerouslySetInnerHTML={{ __html: title }}
            />
            {subtitle && (
                <p className="mt-5 text-base text-[#5A544E] leading-relaxed">{subtitle}</p>
            )}
        </div>
    );
}
