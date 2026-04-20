import { SectionHeading } from "@/components/HeaderSection";
import Link from "next/link";


const Project = () => {
    return (
        <>
            <section className="relative pt-40 pb-20 lg:pt-48 lg:pb-32 bg-[#F5EDE1]">
                <div className="max-w-[1400px] mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-12 lg:gap-20 items-end">
                    <div>
                        <p className="text-[#906847]  uppercase text-xs">The Project</p>
                        <h1 className="mt-5 font-serif text-5xl lg:text-7xl leading-[1.02] text-ink">
                            A vision of <em className="text-[#906847] not-italic">integrated</em> living.
                        </h1>
                    </div>
                    <p className="text-[#5A544E] leading-relaxed text-lg max-w-xl">
                        Godrej International is more than a development. It is a quietly ambitious master-planned estate — designed to bring together the most considered residences, the most prestigious business addresses, and the most curated retail of the city, on twelve contiguous acres.
                    </p>
                </div>
            </section>

            <section className="relative aspect-[16/8]">
                <img src='/exterior-tower.jpg' alt="Tower exterior" className="w-full h-full object-cover" />
            </section>

            <section className="py-24 lg:py-32 bg-ivory">
                <div className="max-w-[1100px] mx-auto px-6 lg:px-12 grid lg:grid-cols-3 gap-16">
                    <SectionHeading eyebrow="The Master Plan" title="Conceived as a <em class='text-[var(--bronze)] not-italic'>city within the city</em>." />
                    <div className="lg:col-span-2 space-y-6 text-muted-foreground leading-relaxed">
                        <p>Six sculptural residential towers ring a four-acre central park. Two crescent-form business blocks open to a tree-lined retail boulevard with reflecting canals. A 70,000 sq.ft. wellness club anchors the residents' realm; a hospitality-grade lobby anchors the business address.</p>
                        <p>Designed by an internationally awarded studio with deep experience in integrated developments across Asia and the Middle East, every threshold has been studied for light, air, and the unhurried rhythm of arrival.</p>
                        <p>82% of the estate is given to landscape, water and open sky.</p>
                    </div>
                </div>
            </section>

            <section className="grid lg:grid-cols-2">
                <div className="bg-ink text-ivory px-6 lg:px-16 py-20 lg:py-28">
                    <p className="eyebrow text-[var(--gold)]">Sky Residences</p>
                    <h2 className="mt-4 font-serif text-4xl lg:text-5xl leading-tight">
                        Two homes <em className="text-[var(--gold)] not-italic">per floor</em>.
                    </h2>
                    <p className="mt-6 text-ivory/70 leading-relaxed">
                        3 and 4 BHK residences with private elevator lobbies, double-glazed floor-to-ceiling glass, and 9-foot ceilings. Penthouses on the upper levels claim entire floors.
                    </p>
                    <button className="mt-10"><Link href="/floor-plans">View Floor Plans</Link></button>
                </div>
                <div className="relative min-h-[420px]">
                    <img src='/images/landscape-boulevard.jpg' alt="Boulevard" loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
                </div>
            </section>

            <section className="grid lg:grid-cols-2">
                <div className="relative min-h-[420px] order-2 lg:order-1">
                    <img src='/business-lobby.jpg' alt="Business lobby" loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
                </div>
                <div className="bg-sand text-ink px-6 lg:px-16 py-20 lg:py-28 order-1 lg:order-2">
                    <p className="eyebrow">Business Spaces</p>
                    <h2 className="mt-4 font-serif text-4xl lg:text-5xl leading-tight">
                        A new <em className="text-[var(--bronze)] not-italic">commercial</em> standard.
                    </h2>
                    <p className="mt-6 text-muted-foreground leading-relaxed">
                        Grade-A office floors with double-height lobbies, sky terraces and concierge-grade hospitality. Half-floor and full-floor configurations available, EV-ready parking, dedicated business lounge.
                    </p>
                    <button className="mt-10"><Link href="/contact">Enquire</Link></button>
                </div>
            </section>
        </>
    )
}

export default Project;
