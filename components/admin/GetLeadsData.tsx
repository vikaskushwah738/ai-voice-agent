"use client";

import { useEffect, useState } from "react";

type Lead = {
    id: string;
    name: string;
    phone: string;
    email: string | null;
    message: string | null;
    createdAt: string;
};

export default function LeadsPage() {
    const [leads, setLeads] = useState<Lead[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchLeads = async () => {
        try {
            const res = await fetch("/api/contact-me", {
                cache: "no-store",
            });

            if (!res.ok) {
                throw new Error("Failed to fetch leads");
            }

            const data = await res.json();
            setLeads(data);
        } catch (error) {
            console.error("Error fetching leads:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLeads();

        const interval = setInterval(() => {
            fetchLeads();
        }, 3000); // every 3 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <section className="min-h-screen bg-[#f8f5ef] px-6 py-10">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-semibold text-black">All Leads</h1>
                    <p className="text-sm text-gray-600 mt-2">
                        Total Leads: {leads.length}
                    </p>
                </div>

                <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
                    <table className="min-w-full border-collapse">
                        <thead className="bg-black text-white">
                            <tr>
                                <th className="px-4 py-3 text-left text-sm font-medium">#</th>
                                <th className="px-4 py-3 text-left text-sm font-medium">Name</th>
                                <th className="px-4 py-3 text-left text-sm font-medium">Phone</th>
                                <th className="px-4 py-3 text-left text-sm font-medium">Email</th>
                                <th className="px-4 py-3 text-left text-sm font-medium">Message</th>
                                <th className="px-4 py-3 text-left text-sm font-medium">Created At</th>
                            </tr>
                        </thead>

                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                                        Loading...
                                    </td>
                                </tr>
                            ) : leads.length > 0 ? (
                                leads.map((lead, index) => (
                                    <tr key={lead.id} className="border-t border-gray-200">
                                        <td className="px-4 py-3 text-sm text-gray-700">{index + 1}</td>
                                        <td className="px-4 py-3 text-sm text-gray-900">{lead.name}</td>
                                        <td className="px-4 py-3 text-sm text-gray-900">{lead.phone}</td>
                                        <td className="px-4 py-3 text-sm text-gray-900">{lead.email || "-"}</td>
                                        <td className="px-4 py-3 text-sm text-gray-900">{lead.message || "-"}</td>
                                        <td className="px-4 py-3 text-sm text-gray-700">
                                            {new Date(lead.createdAt).toLocaleString("en-IN")}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                                        No leads found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
}