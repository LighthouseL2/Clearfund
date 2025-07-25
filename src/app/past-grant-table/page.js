'use client';

import { useState } from 'react'
import { Download } from 'lucide-react'
import { ArrowLeft } from 'lucide-react';


export default function Home() {
  const projects = [
  { name: 'ReFi Podcast', contributions: 59, crowdfunded: 228.81, matchedUSD: null, matchedUSDGLO: 2483, totalUSD: null },
  { name: 'ReFi Lagos', contributions: 34, crowdfunded: 75.88, matchedUSD: null, matchedUSDGLO: 1552, totalUSD: null },
  { name: 'Greenpill Kenya', contributions: 48, crowdfunded: 267, matchedUSD: null, matchedUSDGLO: 1918, totalUSD: null },
  { name: 'ReFi Colombia', contributions: 29, crowdfunded: 198.64, matchedUSD: null, matchedUSDGLO: 1302, totalUSD: null },
  { name: 'ReFi Cape Town', contributions: 23, crowdfunded: 30.71, matchedUSD: null, matchedUSDGLO: 276, totalUSD: null },
  { name: 'Greenpill Ottawa', contributions: 32, crowdfunded: 260.69, matchedUSD: null, matchedUSDGLO: 1626, totalUSD: null },
  { name: 'ReFi Italia', contributions: 27, crowdfunded: 117.87, matchedUSD: null, matchedUSDGLO: 465, totalUSD: null },
  { name: 'Greenpill NYC', contributions: 27, crowdfunded: 61.06, matchedUSD: null, matchedUSDGLO: 864, totalUSD: null },
  { name: 'Greenpill Nigeria', contributions: 36, crowdfunded: 129.62, matchedUSD: null, matchedUSDGLO: 2244, totalUSD: null },
  { name: 'Greenpill Germany', contributions: 19, crowdfunded: 33.43, matchedUSD: null, matchedUSDGLO: 325, totalUSD: null },
  { name: 'Bioregional Builders', contributions: 19, crowdfunded: 50.79, matchedUSD: null, matchedUSDGLO: 305, totalUSD: null },
  { name: 'GreenPill Mexico', contributions: 18, crowdfunded: 51.02, matchedUSD: null, matchedUSDGLO: 519, totalUSD: null },
  { name: 'Regens Unite', contributions: 46, crowdfunded: 221.37, matchedUSD: null, matchedUSDGLO: 2628, totalUSD: null },
  { name: 'Celo Europe DAO', contributions: 15, crowdfunded: 23.28, matchedUSD: null, matchedUSDGLO: 352, totalUSD: null },
  { name: 'ReFi Mexico', contributions: 36, crowdfunded: 136.89, matchedUSD: null, matchedUSDGLO: 1853, totalUSD: null },
  { name: 'GreenPill Writers Guild', contributions: 35, crowdfunded: 125.11, matchedUSD: null, matchedUSDGLO: 1533, totalUSD: null },
  { name: 'GreenPill Citizens', contributions: 32, crowdfunded: 121.91, matchedUSD: null, matchedUSDGLO: 1292, totalUSD: null },
  { name: 'Celo Mexico', contributions: 29, crowdfunded: 210.34, matchedUSD: null, matchedUSDGLO: 2360, totalUSD: null },
  { name: 'ReFi Barcelona', contributions: 32, crowdfunded: 80.1, matchedUSD: null, matchedUSDGLO: 1845, totalUSD: null },
  { name: 'ReFi PDX', contributions: 23, crowdfunded: 170.89, matchedUSD: null, matchedUSDGLO: 487, totalUSD: null },
  { name: 'ReFi Latam', contributions: 24, crowdfunded: 158.84, matchedUSD: null, matchedUSDGLO: 813, totalUSD: null },
  { name: 'ReFi Tulum', contributions: 34, crowdfunded: 125.3, matchedUSD: null, matchedUSDGLO: 1738, totalUSD: null },
  { name: 'GreenPill India', contributions: 35, crowdfunded: 85.79, matchedUSD: null, matchedUSDGLO: 530, totalUSD: null },
  { name: 'Bloom Network', contributions: 28, crowdfunded: 133.1, matchedUSD: null, matchedUSDGLO: 1365, totalUSD: null },
  { name: 'GreenPill TO', contributions: 23, crowdfunded: 151.73, matchedUSD: null, matchedUSDGLO: 443, totalUSD: null },
  { name: 'ReFi Phangan', contributions: 31, crowdfunded: 462.66, matchedUSD: null, matchedUSDGLO: 1667, totalUSD: null },
  { name: 'ReFi Atlántico', contributions: 23, crowdfunded: 59.46, matchedUSD: null, matchedUSDGLO: 574, totalUSD: null },
  { name: 'ReFi DAO', contributions: 30, crowdfunded: 137.64, matchedUSD: null, matchedUSDGLO: 1913, totalUSD: null },
  { name: 'Refi Uganda', contributions: 27, crowdfunded: 57.76, matchedUSD: null, matchedUSDGLO: 915, totalUSD: null },
  { name: 'GreenPill Taiwan', contributions: 23, crowdfunded: 33.94, matchedUSD: null, matchedUSDGLO: 136, totalUSD: null },
  { name: 'ReFi The Hague', contributions: 27, crowdfunded: 1675.13, matchedUSD: null, matchedUSDGLO: 497, totalUSD: null },
  { name: 'Greenpill Brasil', contributions: 36, crowdfunded: 114.93, matchedUSD: null, matchedUSDGLO: 1151, totalUSD: null },
  { name: 'Celatam', contributions: 23, crowdfunded: 110.58, matchedUSD: null, matchedUSDGLO: 799, totalUSD: null },
  { name: 'GreenPill CIV', contributions: 18, crowdfunded: 50.01, matchedUSD: null, matchedUSDGLO: 104, totalUSD: null },
  { name: 'ReFi Costa Rica', contributions: 29, crowdfunded: 58.95, matchedUSD: null, matchedUSDGLO: 1199, totalUSD: null },
  { name: 'ReFi Red Hook', contributions: 16, crowdfunded: 25.14, matchedUSD: null, matchedUSDGLO: 201, totalUSD: null },
  { name: 'ReFi BayArea', contributions: 30, crowdfunded: 416.68, matchedUSD: null, matchedUSDGLO: 451, totalUSD: null },
  { name: 'Uncommons', contributions: 20, crowdfunded: 56.69, matchedUSD: null, matchedUSDGLO: 141, totalUSD: null },
  { name: '************', contributions: null, crowdfunded: null, matchedUSD: null, matchedUSDGLO: null, totalUSD: null },
  { name: 'ReFi Lisboa', contributions: 24, crowdfunded: 227.21, matchedUSD: null, matchedUSDGLO: 1099, totalUSD: null },
  { name: 'Celo Africa DAO', contributions: 39, crowdfunded: 327.23, matchedUSD: null, matchedUSDGLO: 1747, totalUSD: null },
  { name: 'Celo Arabia', contributions: 14, crowdfunded: 24.83, matchedUSD: null, matchedUSDGLO: 304, totalUSD: null },
  { name: 'ReFi Tanzania', contributions: 42, crowdfunded: 129.86, matchedUSD: null, matchedUSDGLO: 1747, totalUSD: null },
  { name: 'Celo Canada', contributions: 13, crowdfunded: 30.22, matchedUSD: null, matchedUSDGLO: 195, totalUSD: null },
  { name: 'ReFi MedellÃ­n', contributions: 50, crowdfunded: 409.25, matchedUSD: null, matchedUSDGLO: 2392, totalUSD: null },
  { name: 'Greenpill Dev Guild', contributions: 43, crowdfunded: 709.44, matchedUSD: null, matchedUSDGLO: 1274, totalUSD: null },
  ]

  const [search, setSearch] = useState("")
  const [sortType, setSortType] = useState("Sort by:")
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 10

  const filteredProjects = projects
    .filter(p => p.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sortType === "Top Ten") return b.matchedUSDGLO - a.matchedUSDGLO
      if (sortType === "Bottom Ten") return a.matchedUSDGLO - b.matchedUSDGLO
      return 0
    })

  const paginated = filteredProjects.slice((currentPage - 1) * pageSize, currentPage * pageSize)

  return (
      <section className="bg-white min-h-screen py-10 px-4">
        <div className="flex justify-between mb-4 items-center">
    <div className="flex items-center gap-2 cursor-pointer">
  <ArrowLeft size={20} />
  <p className="text-sm">Back</p>
</div>
          <button className="flex items-center gap-2 bg-[#198038] text-white px-5 py-3 border-2 rounded-sm hover:bg-[#198038] transition">
            <Download size={18} />
            Download
          </button>
        </div>
      {/* Centered container with white background */}
      <div className="max-w-6xl mx-auto bg-white p-6 rounded-2xl shadow-xl border-2">

        {/* Main content */}
        <main >
          <div className="flex justify-between mb-4 items-center">
            <div>
              <h2 className="text-xl font-semibold">
                GG21 REGEN COORDI-NATION GENESIS - ROUND
              </h2>
              <p className="text-sm text-black">
                Type: Quadratic Funding • August, 2024
              </p>
            </div>
            <h2 className="text-sm text-black">Matching Pool: USDGLO 50K</h2>
          </div>

          <div className="flex justify-end space-x-2 items-center mb-6">
         <div className="relative w-56">
  <input
    type="text"
    placeholder="Search"
    className="rounded-sm pl-10 pr-3 py-2 w-full bg-[#34C7591A] focus:outline-none"
    value={search}
    onChange={(e) => setSearch(e.target.value)}
  />
  <svg
    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <path d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z" />
  </svg>
</div>

            <select
              className="border px-3 py-2 rounded bg-[#34C7591A]"
              value={sortType}
              onChange={(e) => setSortType(e.target.value)}
            >
              <option value="All">All</option>
              <option value="Top Ten">Top Ten</option>
              <option value="Bottom Ten">Bottom Ten</option>
            </select>
          </div>

          <table className="min-w-full bg-white border">
            <thead className="bg-gray-100 text-sm text-left">
              <tr>
                <th className="p-3 border">Project Name</th>
                <th className="p-3 border">Contributions</th>
                <th className="p-3 border">Crowdfunded USD</th>
                <th className="p-3 border">Matched USD</th>
                <th className="p-3 border">Matched USDGLO</th>
                <th className="p-3 border">Total USD</th>
                <th className="p-3 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((project, i) => (
                <tr key={i} className="text-sm hover:bg-gray-50">
                  <td className="p-3 border">{project.name}</td>
                  <td className="p-3 border">{project.contributions}</td>
                  <td className="p-3 border"> ${(project.crowdfunded ?? 0).toFixed(2)}</td>
                  <td className="p-3 border text-gray-400">$NaN</td>
                  <td className="p-3 border">{project.matchedUSDGLO} USDGLO</td>
                  <td className="p-3 border text-gray-400">$NaN</td>
                  <td className="p-3 border">
                    <button className="bg-[#A6E7D8] text-[#26A17B] px-3 py-1 rounded font-bold hover:bg-[#A6E7D8]">
                   Learn more
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
<div className="flex justify-between mt-6 items-center text-sm text-gray-500">
  <span>
    Showing {(currentPage - 1) * pageSize + 1} to{" "}
    {Math.min(currentPage * pageSize, filteredProjects.length)} of{" "}
    {filteredProjects.length} entries
  </span>

  <div className="flex items-center space-x-2">
    {/* Left Arrow */}
    <button
      disabled={currentPage === 1}
      onClick={() => setCurrentPage(currentPage - 1)}
      className="w-9 h-9 flex items-center justify-center border border-gray-200 rounded-md text-black font-extrabold hover:bg-gray-100 disabled:opacity-50"
    >
      &lt;
    </button>

    {/* Page Numbers */}
    {Array.from({ length: Math.ceil(filteredProjects.length / pageSize) }).map((_, i) => {
      const page = i + 1;
      return (
        <button
          key={page}
          onClick={() => setCurrentPage(page)}
          className={`w-9 h-9 flex items-center justify-center rounded-md border ${
            currentPage === page
              ? "bg-[#198038] text-white"
              : "border-gray-200 text-gray-700 hover:bg-gray-100"
          }`}
        >
          {page}
        </button>
      );
    })}

    {/* Right Arrow */}
    <button
      disabled={currentPage === Math.ceil(filteredProjects.length / pageSize)}
      onClick={() => setCurrentPage(currentPage + 1)}
      className="w-9 h-9 flex items-center justify-center border border-gray-200 rounded-md text-black font-extrabold hover:bg-gray-100 disabled:opacity-50"
    >
      &gt;
    </button>
  </div>
</div>

        </main>
      </div>
    </section>
  )
}