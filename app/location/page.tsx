import { SectionHeading } from '@/components/HeaderSection'
import { LANDMARKS, PROJECT } from '@/data/home'
import React from 'react'

const Location = () => {
    return (
        <main>
            <section className="pt-40 pb-16 lg:pt-48 lg:pb-20 bg-[#F5EDE1]">
                <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
                    <SectionHeading
                        eyebrow="Location"
                        title="At the <em class='text-[#906847] not-italic'>centre</em> of New Gurugram."
                        subtitle={PROJECT.location}
                    />
                </div>
            </section>

            <section className="grid lg:grid-cols-5">
                <div className="lg:col-span-3 relative aspect-[4/3] lg:aspect-auto lg:min-h-[640px] bg-sand">
                    <iframe
                        title="Map of Godrej International"
                        src="https://www.google.com/maps?q=Sector+49+Golf+Course+Extension+Road+Gurugram&output=embed"
                        className="absolute inset-0 w-full h-full border-0 grayscale"
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    />
                </div>
                <div className="lg:col-span-2 bg-ink text-ivory px-6 lg:px-12 py-16 lg:py-20">
                    <p className="eyebrow text-[var(--gold)]">Travel Times</p>
                    <h2 className="mt-4 font-serif text-3xl lg:text-4xl">A city, perfectly within reach.</h2>
                    <ul className="mt-10 divide-y divide-ivory/15">
                        {LANDMARKS.map((l) => (
                            <li key={l.place} className="py-5 flex items-baseline justify-between gap-4">
                                <span className="font-serif text-lg lg:text-xl">{l.place}</span>
                                <span className="text-[var(--gold)] tracking-wider text-sm shrink-0 font-medium">{l.time}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            <section className="py-24 bg-ivory">
                <div className="max-w-3xl mx-auto px-6 text-center">
                    <p className="eyebrow">The Micro-Market</p>
                    <h2 className="mt-4 font-serif text-3xl lg:text-4xl text-ink leading-tight">
                        Golf Course Extension Road —<br />Gurugram's most coveted address.
                    </h2>
                    <p className="mt-6 text-muted-foreground leading-relaxed">
                        Bordered by lush green corridors and flanked by the Aravalli ridge, this stretch has emerged as the city's premier address for global business, hospitality, and luxury living.
                    </p>
                </div>
            </section>
        </main>
    )
}


export default Location