

import ProtectedRoute from "@/lib/withAuth"
import Sidebar from "@/components/Sidebar"

const GoodCollective = () => {
  return (
    <ProtectedRoute>
      <div className="min-h-screen flex flex-col md:flex-row bg-white text-gray-800 relative font-sans">
      {/* Sidebar imported */}
      <Sidebar />

      <main className="flex-1 p-4 md:p-6 md:ml-64 font-sans">
        GoodCollective
      </main>
    </div>
    </ProtectedRoute>
  )
}

export default GoodCollective