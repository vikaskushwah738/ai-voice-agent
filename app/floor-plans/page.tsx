import { SectionHeading } from '@/components/HeaderSection'
import { FLOORPLANS } from '@/data/home'
import Link from 'next/link'
import React from 'react'

const page = () => {
    return (
        <>
            <section className="pt-40 pb-16 lg:pt-48 lg:pb-20 bg-[#F5EDE1]">
                <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
                    <SectionHeading
                        eyebrow="Residences"
                        title="Two homes per floor.<br/><em class='text-[#906847] not-italic'>One uncompromised</em> view."
                        subtitle="3 and 4 BHK sky residences and full-floor penthouses, configured for natural light, cross-ventilation and privacy."
                    />
                </div>
            </section>

            <section className="bg-[#FDFAF4] py-16 lg:py-24">
                <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
                    <div className="border-y border-ink/15 divide-y divide-ink/15">
                        {FLOORPLANS.map((p) => (
                            <div key={p.type} className="grid grid-cols-12 gap-6 py-8 lg:py-10 items-baseline">
                                <div className="col-span-12 lg:col-span-5">
                                    <p className="eyebrow text-[#9E6847]">Type</p>
                                    <h3 className="mt-2 font-serif text-2xl lg:text-3xl text-ink">{p.type}</h3>
                                </div>
                                <div className="col-span-6 lg:col-span-3">
                                    <p className="eyebrow text-[#9E6847]">Carpet Area</p>
                                    <p className="mt-2 font-serif text-xl text-ink">{p.area}</p>
                                </div>
                                <div className="col-span-6 lg:col-span-2">
                                    <p className="eyebrow text-[#9E6847]">Pricing</p>
                                    <p className="mt-2 font-serif text-xl text-ink">{p.price}</p>
                                </div>
                                <div className="col-span-12 lg:col-span-2 lg:text-right">
                                    <button className='border border-ink/30 px-6 py-2 rounded-md text-sm text-ink hover:bg-ink/5 transition'>
                                        <Link href="/reach-us">Request Plan</Link>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="relative aspect-[16/9] lg:aspect-[16/7]">
                <img src='/interior-living.jpg' alt="Residence interior" loading="lazy" className="w-full h-full object-cover" />
            </section>

            <section className="py-24 bg-ivory text-center">
                <div className="max-w-2xl mx-auto px-6">
                    <h2 className="font-serif text-3xl lg:text-4xl text-ink">Detailed plans available on request.</h2>
                    <p className="mt-4 text-muted-foreground">Our concierge will share the unit plans, specifications and pricing within the hour.</p>
                    <button className="mt-8"><Link href="/reach-us">Request Brochure</Link></button>
                </div>
            </section>
        </>
    )
}

export default page