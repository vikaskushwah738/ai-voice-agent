import { SectionHeading } from '@/components/HeaderSection'


const FEATURED = [
    { title: "Rooftop Infinity Pool", img: '/images/amenity-pool.jpg', body: "A 35-metre pool suspended on the 32nd floor, with sunset cabanas, fire bowls and uninterrupted skyline views." },
    { title: "Members' Clubhouse", img: '/images/amenity-clubhouse.jpg', body: "Double-height residents' lounge with library, fireplace, screening room and bar — designed by an internationally celebrated atelier." },
    { title: "Sanctuary Spa", img: '/amenity-spa.jpg', body: "Treatment suites, sauna, steam, vitality pool and relaxation gardens — operated by a luxury hospitality partner." },
    { title: "Performance Gym", img: '/amenity-gym.jpg', body: "Technogym-equipped, with dedicated studios for pilates, yoga and functional training, overlooking the central gardens." },
];

const ALL = [
    "Rooftop Infinity Pool", "Members' Clubhouse", "Wellness Spa", "Performance Gym",
    "Squash & Badminton Courts", "Cinema & Screening Lounge", "Library & Reading Room",
    "Sky Dining Pavilion", "Co-Working Suites", "Children's Edutainment",
    "Pet Park", "Banquet Hall", "Cigar Lounge", "Tea Garden",
    "EV Charging", "24×7 Concierge", "Valet Parking", "Smart Home Pre-fit",
];

const Amenities = () => {
    return (
        <>
            <section className="pt-40 pb-20 lg:pt-48 lg:pb-24 bg-[#F5EDE1]">
                <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
                    <SectionHeading
                        eyebrow="The Wellness Club"
                        title="Seventy thousand square feet of <em class='text-[#906847] not-italic'>sanctuary</em>."
                        subtitle="Designed not as a list of amenities, but as a complete world — spaces for stillness, for celebration, for the small luxuries of an ordinary Tuesday."
                    />
                </div>
            </section>

            {FEATURED.map((f, i) => (
                <section key={f.title} className="grid lg:grid-cols-2">
                    <div className={`relative min-h-[420px] lg:min-h-[600px] ${i % 2 ? "order-2" : ""}`}>
                        <img src={f.img} alt={f.title} loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
                    </div>
                    <div className={`px-6 lg:px-20 py-20 lg:py-28 flex flex-col justify-center ${i % 2 ? "bg-[#FDFAF4]" : "bg-[#F5EDE1]"}`}>
                        <p className="text-[#906847]">0{i + 1}</p>
                        <h2 className="mt-4 font-serif text-4xl lg:text-5xl text-ink leading-tight">{f.title}</h2>
                        <p className="mt-6 text-[#5A544E] leading-relaxed max-w-md">{f.body}</p>
                    </div>
                </section>
            ))}

            <section className="py-24 lg:py-32 bg-[#15110C] text-ivory">
                <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
                    <div className="max-w-2xl">
                        <p className="eyebrow text-[#906847]">The Full List</p>
                        <h2 className="mt-4 font-serif text-4xl lg:text-5xl text-[#FDFAF4] leading-tight">Forty-plus considered <em className="text-[#CE9A43] not-italic">indulgences</em>.</h2>
                    </div>
                    <ul className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-ivory/10">
                        {ALL.map((a, i) => {
                            const isLastCol = (i + 1) % 3 === 0;
                            const isLastRow = i >= ALL.length - (ALL.length % 3 || 3);

                            return (
                                <li
                                    key={a}
                                    className={`
          bg-ink py-6 px-6 font-serif text-xl text-[#FDFAF4]
          border-[#2C2823]
          ${!isLastCol ? "border-r" : ""}
          ${!isLastRow ? "border-b" : ""}
        `}
                                >
                                    <span className="text-[#CE9A43] mr-3">✦</span>
                                    {a}
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </section>
        </>
    )
}


export default Amenities