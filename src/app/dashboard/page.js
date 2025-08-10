"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { LogOut, Settings, ChevronRight, Menu, X } from "lucide-react";
import BackgroundSlider from "@/components/BackgroundSlider";
import Sidebar from "@/components/Sidebar";
import withAuth from "@/lib/withAuth";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { logout } from "@/features/user/userSlice";
import { Clock, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils"; // if using classNames utility
import GrantDashboard from "@/components/GrantDashboard";
// import { checkAuth } from "@/features/user/userSlice";

function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter()




  // useEffect(() => {
  //     dispatch(checkAuth()).then((res) => {
  //       console.log(res.payload);
  //       if(!res.payload.success) return router.push("https://clearfund.netlify.app/?route=login")
  //     })
  // }, [router, dispatch])

  // useEffect(() => {
  //   const params = new URLSearchParams(window.location.search)
  //   const token = params.get('token')
  //   if(token) {
  //     localStorage.setItem("token", token)
  //     router.replace("/dashboard")
  //   }
  // })

  


  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white text-gray-800 relative font-sans">
      {/* Sidebar imported */}
      <Sidebar />

      <main className="flex-1 p-4 md:p-6 md:ml-64">
     <GrantDashboard />
      </main>
    </div>
  );
}


// export default withAuth(Dashboard)
export default Dashboard