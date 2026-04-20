import Link from "next/link"


export const Sidebar = () => {
    return (
        <aside className="w-64 bg-white border-r shadow-sm">
            <div className="p-6 border-b">
                <h1 className="text-xl font-bold">Admin Panel</h1>
            </div>

            <nav className="p-4 space-y-2">
                <Link
                    href="/admin"
                    className="block rounded-lg px-4 py-2 hover:bg-gray-100"
                >
                    Dashboard
                </Link>
                <Link
                    href="/admin/users"
                    className="block rounded-lg px-4 py-2 hover:bg-gray-100"
                >
                    Users
                </Link>
                <Link
                    href="/admin/orders"
                    className="block rounded-lg px-4 py-2 hover:bg-gray-100"
                >
                    Orders
                </Link>
                <Link
                    href="/admin/settings"
                    className="block rounded-lg px-4 py-2 hover:bg-gray-100"
                >
                    Settings
                </Link>

                <button className="rounded-lg bg-black px-4 py-2 text-white hover:opacity-90">
                    Logout
                </button>
            </nav>
        </aside>
    )
}
