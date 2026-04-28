import { LeadForm } from "@/components/LeadForm";
import DemoCallButton from "@/components/TestCall";
import { PROJECT } from "@/data/home";
import { Phone, MessageCircle, Mail, MapPin } from "lucide-react";

const ReachUs = () => {
    return (
        <main>
            <section className="pt-32 lg:pt-40 min-h-screen bg-[#FDFAF4]">
                <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-16 lg:py-24 grid lg:grid-cols-2 gap-16 lg:gap-24">
                    <div>
                        <p className="text-[#906847]">Contact</p>

                        <h1 className="mt-4 font-serif text-5xl lg:text-7xl leading-[1.02] text-[]">
                            Schedule a
                            <br />
                            <em className="text-[#906847] not-italic">private preview.</em>
                        </h1>

                        <p className="mt-6 text-muted-foreground max-w-md leading-relaxed">
                            Visit our experience centre. Walk through scale models, material libraries, and a 1:1 mockup of the sky residence interior.
                        </p>

                        <div className=" h-20 w-50 bg-green-500">
                            <DemoCallButton />
                        </div>

                        <div className="mt-12 space-y-6">
                            <ContactRow
                                icon={<Phone className="size-4" />}
                                label="Sales Concierge"
                                value={PROJECT.phoneDisplay}
                                href={`tel:${PROJECT.phoneTel}`}
                            />

                            <ContactRow
                                icon={<MessageCircle className="size-4" />}
                                label="WhatsApp"
                                value="Chat instantly"
                                href={`https://wa.me/${PROJECT.whatsapp}`}
                            />

                            <ContactRow
                                icon={<Mail className="size-4" />}
                                label="Email"
                                value={PROJECT.email}
                                href={`mailto:${PROJECT.email}`}
                            />

                            <ContactRow
                                icon={<MapPin className="size-4" />}
                                label="Experience Centre"
                                value={PROJECT.location}
                            />
                        </div>

                        <div className="mt-12 pt-10 border-t border-ink/10">
                            <p className="eyebrow text-[#906847]">Hours</p>
                            <p className="mt-3 text-ink">Monday - Sunday · 10:00 to 19:00 IST</p>
                            <p className="mt-1 text-sm text-muted-foreground">Visits by appointment only.</p>
                        </div>
                    </div>

                    <div className="bg-[#F5EDE1] p-8 lg:p-12 rounded-2xl">
                        <LeadForm
                            title="Reserve Your Slot"
                            subtitle="A relationship manager will confirm your appointment within the hour."
                        />
                    </div>
                </div>
            </section>
        </main>
    );
};

export default ReachUs;

function ContactRow({
    icon,
    label,
    value,
    href,
}: {
    icon: React.ReactNode;
    label: string;
    value: string;
    href?: string;
}) {
    const inner = (
        <>
            <span className="size-12 rounded-full bg-[#F6ECDA] text-[#906847] flex items-center justify-center shrink-0">
                {icon}
            </span>

            <span>
                <span className="block eyebrow text-[#906847]">{label}</span>
                <span className="block mt-1 font-serif text-xl text-ink">{value}</span>
            </span>
        </>
    );

    return href ? (
        <a
            href={href}
            className="flex items-start gap-4 group hover:opacity-80 transition"
        >
            {inner}
        </a>
    ) : (
        <div className="flex items-start gap-4">{inner}</div>
    );
}