import { SectionHeading } from "@/components/HeaderSection";
import HeroSection from "@/components/home/HeroSection";
import { LeadForm } from "@/components/LeadForm";
import { HIGHLIGHTS, LANDMARKS } from "@/data/home";
import { ChevronRight } from "lucide-react";
import Link from "next/link";


export default function Home() {
  return (
    <main>
      {/* HERO */}
      <HeroSection />

      {/* MOBILE LEAD FORM */}
      <section className="lg:hidden bg-[#F5EDE1] py-12 px-6">
        <LeadForm />
      </section>

      {/* HIGHLIGHTS */}
      <section className="py-24 lg:py-32 bg-[#FDFAF4]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <SectionHeading
            eyebrow="Project Highlights"
            title="A new <em class='text-[#906847] not-italic'>standard</em> for integrated living."
          />
          <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-ink/10">
            {HIGHLIGHTS.map((h, i) => {
              const isLastCol = (i + 1) % 3 === 0;
              const isLastRow = i >= HIGHLIGHTS.length - (HIGHLIGHTS.length % 3 || 3);
              return (

                <div key={i}
                  className={`
          bg-[#FDFAF4] p-9 font-serif text-xl text-[#FDFAF4]
          border-[#E5E3DC]  hover:bg-[#F5EDE1] transition-colors duration-500 group
          ${!isLastCol ? "border-r" : ""}
          ${!isLastRow ? "border-b" : ""}
        `}
                >
                  <span className="font-serif text-5xl text-[#CE9C43] block">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-6 font-serif text-2xl text-[#15110C] leading-tight">{h.title}</h3>
                  <p className="mt-3 text-sm text-[#5A544E] leading-relaxed">{h.body}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ABOUT — split */}
      <section className="bg-[#F5EDE1]">
        <div className="grid lg:grid-cols-2">
          <div className="relative min-h-[480px] lg:min-h-[640px]">
            <img src='/interior-living.jpg' alt="Sky residence interior" loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
          </div>
          <div className="px-6 lg:px-20 py-20 lg:py-32 flex flex-col justify-center">
            <p className="text-[#936C47] uppercase text-xs">About the Estate</p>
            <h2 className="mt-4 font-serif text-4xl lg:text-5xl leading-tight text-ink">
              Where the <em className="text-[#936847] not-italic">city's most considered</em> hours unfold.
            </h2>
            <p className="mt-6 text-[#5A544E] leading-relaxed">
              Godrej International is conceived as a self-contained world — six residential towers ringing a 4-acre central park, anchored by a Grade-A business district and a curated F&B promenade. Every threshold has been considered by globally awarded architects, landscape designers and interior ateliers.
            </p>
            <p className="mt-4 text-[#5A544E] leading-relaxed">
              Two homes per floor. Private elevator lobbies. Floor-to-ceiling glazing oriented to maximise the soft northern light and the green of Aravalli ridge.
            </p>
            <button className="mt-10 self-start ">
              <Link href="/project" className="flex gap-3 justify-center items-center uppercase border border-[#99938A] text-sm text-[#15110C] px-6 py-2.5">Discover the Vision <ChevronRight className="size-4" /></Link>
            </button>
          </div>
        </div>
      </section>

      {/* AMENITIES preview */}
      <section className="py-24 lg:py-32 bg-[#FDFAF4]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <SectionHeading
              eyebrow="The Wellness Club"
              title="70,000 square feet of <em class='text-[#906847] not-italic'>sanctuary</em>."
            />
            <Link href="/amenities" className="flex gap-3 justify-center items-center text-xs text-[#906847]">View all amenities <ChevronRight className="size-3" /></Link>
          </div>

          <div className="mt-16 grid md:grid-cols-3 gap-6">
            {[
              { img: "/images/amenity-pool.jpg", label: "Rooftop Infinity Pool", sub: "Panoramic city views, sunset cabanas." },
              { img: "/images/amenity-clubhouse.jpg", label: "Members' Clubhouse", sub: "Library, lounge, fine dining, cinema." },
              { img: "/images/landscape-boulevard.jpg", label: "Landscaped Boulevard", sub: "Reflecting canals, palm-lined walks." },
            ].map((a) => (
              <article key={a.label} className="group">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img src={a.img} alt={a.label} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <h3 className="mt-5 font-serif text-2xl text-ink">{a.label}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{a.sub}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* BUSINESS spaces */}
      <section className="relative py-24 lg:py-32 bg-[#111111] text-[#FDFAF4] overflow-hidden">
        <img src='/business-lobby.jpg' alt="Business lobby" loading="lazy" className="absolute inset-0 w-full h-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#111111] via-[#111111]/55 to-transparent" />
        <div className="relative max-w-[1400px] mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-12">
          <div>
            <p className="eyebrow text-[#CE9A43]">Business Spaces</p>
            <h2 className="mt-4 font-serif text-4xl lg:text-5xl leading-tight">
              The new <em className="text-[#CE9A43] not-italic">business address</em> of New Gurugram.
            </h2>
            <p className="mt-6 text-[#FDFAF4]/70 leading-relaxed max-w-xl">
              Grade-A office floors with double-height lobbies, sky terraces, EV-ready parking and concierge-grade hospitality. Designed for India's next generation of headquarters.
            </p>
            <div className="mt-10 flex gap-4">
              <button className="bg-[#CE9A43] text-black px-6 py-2.5"><Link href="/reach-us">Enquire Now</Link></button>
              <button className="border border-[#99938A] text-[#15110C] px-6 py-2.5 text-gray-50"><Link href="/project">Learn More</Link></button>
            </div>
          </div>
        </div>
      </section>

      {/* LOCATION preview */}
      <section className="py-24 lg:py-32 bg-[#F5EDE1]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-16">
          <SectionHeading
            eyebrow="Location"
            title="At the <em class='text-[#906847] not-italic'>centre</em> of everything that matters."
            subtitle="Golf Course Extension Road — Gurugram's most coveted micro-market, with seamless access to Cyber City, IGI Airport, and the city's finest schools and hospitals."
          />
          <ul className="divide-y divide-[#DED7CB]">
            {LANDMARKS.map((l) => (
              <li
                key={l.place}
                className="py-5 flex items-baseline justify-between gap-6"
              >
                <span className="font-serif text-xl text-black">
                  {l.place}
                </span>

                <span className="text-[#9D6847] font-medium tracking-wider text-sm shrink-0">
                  {l.time}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* DEVELOPER trust */}
      <section className="py-24 lg:py-32 bg-[#FDFAF4] text-center">
        <div className="max-w-3xl mx-auto px-6">
          <p className="uppercase text-[#906847] text-xs tracking-widest">The Developer</p>
          <h2 className="mt-4 font-serif text-4xl lg:text-5xl text-ink leading-tight">
            Godrej Properties.<br /><em className="text-[#906847] not-italic">125 years of trust.</em>
          </h2>
          <p className="mt-6 text-[#5A544E] leading-relaxed">
            India's most awarded real estate developer of the last decade. Builders of more than 250 landmarks across 12 cities, with a heritage of integrity that began in 1897.
          </p>
          <div className="mt-12 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            {[
              { n: "125+", l: "Years of legacy" },
              { n: "250+", l: "Landmarks delivered" },
              { n: "12", l: "Cities" },
            ].map((s) => (
              <div key={s.l}>
                <p className="font-serif text-5xl text-[#CE9A43]">{s.n}</p>
                <p className="mt-2 text-[#906847]">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-[#15110C] text-[#FDFAF4]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-20 lg:py-28 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="eyebrow text-[#CE9A43]">Limited Pre-Launch Inventory</p>
            <h2 className="mt-4 font-serif text-4xl lg:text-6xl leading-tight">
              Schedule a private<br /><em className="text-[#CE9A43] not-italic">site visit</em> today.
            </h2>
            <p className="mt-6 text-ivory/70 max-w-md">
              Visit our experience centre. Walk through scale models, material libraries and a 1:1 mockup of the sky residence interior.
            </p>
          </div>
          <div className="bg-[#211C17] border border-[#37322D] p-8 lg:p-10">
            <LeadForm variant="dark" title="Reserve Your Slot" subtitle="Our concierge will confirm your appointment within the hour." />
          </div>
        </div>
      </section>
    </main>
  );
}
