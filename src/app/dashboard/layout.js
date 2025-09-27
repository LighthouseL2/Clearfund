"use client";

import { useEffect, useState } from "react";

import Sidebar from "@/components/Sidebar";
import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils"; // if using classNames utility
import GrantDashboard from "@/components/GrantDashboard";
import ProtectedRoute from "@/lib/withAuth";




function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter()



  return (
    <ProtectedRoute>
        <div className="min-h-screen flex flex-col md:flex-row bg-white text-gray-800 relative">
      {/* Sidebar imported */}
            <Sidebar />

            <main className="flex-1 p-4 md:px-6 md:ml-64">
                { children }
            </main>
        </div>
    </ProtectedRoute>
  );
}


// export default withAuth(Dashboard)
export default DashboardLayout