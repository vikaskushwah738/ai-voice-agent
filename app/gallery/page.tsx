import { SectionHeading } from "@/components/HeaderSection"

const TILES = [
    { src: '/hero-aerial.jpg', label: "Aerial Masterplan", span: "lg:col-span-2 lg:row-span-2" },
    { src: '/interior-living.jpg', label: "Sky Residence Interior", span: "" },
    { src: '/images/amenity-pool.jpg', label: "Rooftop Infinity Pool", span: "" },
    { src: '/exterior-tower.jpg', label: "Tower Arrival", span: "lg:col-span-2" },
    { src: '/images/amenity-clubhouse.jpg', label: "Members' Clubhouse", span: "" },
    { src: '/amenity-spa.jpg', label: "Sanctuary Spa", span: "" },
    { src: '/amenity-gym.jpg', label: "Performance Gym", span: "" },
    { src: '/business-lobby.jpg', label: "Business Lobby", span: "lg:col-span-2" },
    { src: '/images/landscape-boulevard.jpg', label: "Central Boulevard", span: "" },
];

const Gallery = () => {
    return (
        <main>
            <section className="pt-40 pb-16 lg:pt-48 lg:pb-20 bg-[#FDFAF4]">
                <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
                    <SectionHeading
                        eyebrow="Gallery"
                        title="A visual <em class='text-[#906847] not-italic'>itinerary</em>."
                    />
                </div>
            </section>

            <section className="pb-24 lg:pb-32 bg-[#FFFFFF]">
                <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
                    <div className="grid grid-cols-2 lg:grid-cols-4 auto-rows-[220px] lg:auto-rows-[280px] gap-3 lg:gap-4">
                        {TILES.map((t) => (
                            <figure key={t.label} className={`relative overflow-hidden group ${t.span}`}>
                                <img src={t.src} alt={t.label} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                                <figcaption className="absolute inset-x-0 bottom-0 p-4 text-[#FDFAF4] text-xs uppercase tracking-widest bg-gradient-to-t from-black/80 to-transparent">
                                    {t.label}
                                </figcaption>
                            </figure>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    )
}

export default Gallery
