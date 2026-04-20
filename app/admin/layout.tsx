import type { ReactNode } from "react";
import Link from "next/link";
import { Sidebar } from "@/components/admin/Sidebar";

export const metadata = {
    title: "Admin Panel",
    description: "Admin dashboard layout",
};

type AdminLayoutProps = {
    children: ReactNode;
};

export default function AdminLayout({ children }: AdminLayoutProps) {
    return (
        <div className="min-h-screen bg-gray-100 text-gray-900">
            <div className="flex min-h-screen">

                {/* Sidebar */}
                <Sidebar />
                {/* Main content */}
                <div className="flex flex-1 flex-col">
                    {/* Header */}
                    <header className="flex items-center justify-between border-b bg-white px-6 p-6 shadow-sm">
                        <h2 className="text-lg font-semibold">Admin Dashboard</h2>
                    </header>

                    {/* Page content */}
                    <main className="flex-1 p-6">{children}</main>
                </div>
            </div>
        </div>
    );
}