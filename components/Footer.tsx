import { PROJECT } from "@/data/home";
import Link from "next/link";


export default function Footer() {
    return (
        <footer className="bg-ink text-ivory bg-[#15110C] text-white">
            <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-20">
                <div className="grid lg:grid-cols-4 gap-12 lg:gap-16">
                    <div className="lg:col-span-2">
                        <h3 className="font-serif text-3xl leading-tight">
                            Godrej <em className="text-[#CE9A43] not-italic">International</em>
                        </h3>
                        <p className="mt-5 text-[#8A9D8F] text-sm leading-relaxed max-w-md">
                            An integrated mixed-use development of sky residences, Grade-A business spaces and curated retail, on Golf Course Extension Road, Gurugram.
                        </p>
                        <p className="mt-8 eyebrow text-[#CE9A43]">RERA Registration</p>
                        <p className="mt-2 text-[11px] text-[#8A9D8F] font-mono break-all">{PROJECT.rera}</p>
                    </div>

                    <div>
                        <h3 className="eyebrow text-[#CE9A43]">Explore</h3>
                        <ul className="mt-5 space-y-3 text-sm">
                            <li><Link href="/project" className="text-ivory/70 hover:text-ivory">The Project</Link></li>
                            <li><Link href="/amenities" className="text-ivory/70 hover:text-ivory">Amenities</Link></li>
                            <li><Link href="/floor-plans" className="text-ivory/70 hover:text-ivory">Residences</Link></li>
                            <li><Link href="/gallery" className="text-ivory/70 hover:text-ivory">Gallery</Link></li>
                            <li><Link href="/location" className="text-ivory/70 hover:text-ivory">Location</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="eyebrow text-[#CE9A43]">Sales Gallery</h3>
                        <ul className="mt-5 space-y-3 text-sm text-ivory/70">
                            <li><a href={`tel:${PROJECT.phoneTel}`} className="hover:text-ivory">{PROJECT.phoneDisplay}</a></li>
                            <li><a href={`mailto:${PROJECT.email}`} className="hover:text-ivory break-all">{PROJECT.email}</a></li>
                            <li className="text-[#8A9D8F] leading-relaxed pt-2">{PROJECT.location}</li>
                        </ul>
                    </div>
                </div>

                <div className="mt-16 pt-8 border-t border-[#8A9D8F] flex flex-col md:flex-row gap-4 justify-between text-[11px] text-[#8A9D8F]">
                    <p>© {new Date().getFullYear()} {PROJECT.brand}. All rights reserved.</p>
                    <p>Disclaimer: Images are artistic impressions. Specifications subject to change.</p>
                </div>
            </div>
        </footer>
    );
}
