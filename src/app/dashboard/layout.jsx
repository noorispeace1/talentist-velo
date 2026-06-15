import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";

const DashBoardLayout = ({ children }) => {
    return (
        <div className="flex min-h-[calc(100vh-80px)] bg-zinc-950 text-zinc-100">
            <DashboardSidebar />
            <main className="flex-1 w-full overflow-y-auto">
                {children}
            </main>
        </div>
    );
};

export default DashBoardLayout;