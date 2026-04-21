import LeadsPage from "@/components/admin/GetLeadsData"


const AdminPAge = () => {
    return (
        <main>
            <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
            <p>Welcome to the admin dashboard. Here you can manage your application.</p>

            <LeadsPage />
        </main>
    )
}

export default AdminPAge