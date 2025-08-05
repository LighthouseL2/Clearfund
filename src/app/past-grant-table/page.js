'use client';
import Link from "next/link";
import { useState } from 'react'
import { Download } from 'lucide-react'
import { ArrowLeft, ChevronDown } from 'lucide-react';


export default function Home() {
  const options = ["All", "Top Ten", "Bottom Ten"]
  const projects = [
    { name: 'ReFi Podcast', contributions: 59, crowdfunded: 228.81, matchedUSD: null, matchedUSDGLO: 2483, totalUSD: null, link: 'https://x.com/ReFiPodcast', },
    { name: 'ReFi Lagos', contributions: 34, crowdfunded: 75.88, matchedUSD: null, matchedUSDGLO: 1552, totalUSD: null, link: 'https://x.com/refilagos01' },
    { name: 'Greenpill Kenya', contributions: 48, crowdfunded: 267, matchedUSD: null, matchedUSDGLO: 1918, totalUSD: null, link: 'https://x.com/GreenpillKenya' },
    { name: 'ReFi Colombia', contributions: 29, crowdfunded: 198.64, matchedUSD: null, matchedUSDGLO: 1302, totalUSD: null, link: 'https://x.com/RefiColombia' },
    { name: 'ReFi Cape Town', contributions: 23, crowdfunded: 30.71, matchedUSD: null, matchedUSDGLO: 276, totalUSD: null, link: 'https://x.com/reficapetown' },
    { name: 'Greenpill Ottawa', contributions: 32, crowdfunded: 260.69, matchedUSD: null, matchedUSDGLO: 1626, totalUSD: null, link: 'https://x.com/greenpillottawa' },
    { name: 'ReFi Italia', contributions: 27, crowdfunded: 117.87, matchedUSD: null, matchedUSDGLO: 465, totalUSD: null, link: 'https://x.com/ReFi_Italia' },
    { name: 'Greenpill NYC', contributions: 27, crowdfunded: 61.06, matchedUSD: null, matchedUSDGLO: 864, totalUSD: null, link: 'https://x.com/greenpillnyc' },
    { name: 'Greenpill Nigeria', contributions: 36, crowdfunded: 129.62, matchedUSD: null, matchedUSDGLO: 2244, totalUSD: null, link: 'https://x.com/greenpillnaija' },
    { name: 'Greenpill Germany', contributions: 19, crowdfunded: 33.43, matchedUSD: null, matchedUSDGLO: 325, totalUSD: null, link: 'https://x.com/GreenPillGER' },
    { name: 'Bioregional Builders', contributions: 19, crowdfunded: 50.79, matchedUSD: null, matchedUSDGLO: 305, totalUSD: null, link: 'https://x.com/bioregionbuild' },
    { name: 'GreenPill Mexico', contributions: 18, crowdfunded: 51.02, matchedUSD: null, matchedUSDGLO: 519, totalUSD: null, link: 'https://x.com/GreenPillMexico' },
    { name: 'Regens Unite', contributions: 46, crowdfunded: 221.37, matchedUSD: null, matchedUSDGLO: 2628, totalUSD: null, link: 'https://x.com/regensunite' },
    { name: 'Celo Europe DAO', contributions: 15, crowdfunded: 23.28, matchedUSD: null, matchedUSDGLO: 352, totalUSD: null, link: 'https://x.com/CeloEurope' },
    { name: 'ReFi Mexico', contributions: 36, crowdfunded: 136.89, matchedUSD: null, matchedUSDGLO: 1853, totalUSD: null, link: 'https://x.com/ReFiMexico' },
    { name: 'GreenPill Writers Guild', contributions: 35, crowdfunded: 125.11, matchedUSD: null, matchedUSDGLO: 1533, totalUSD: null, link: 'https://greenpill.network' },
    { name: 'GreenPill Citizens', contributions: 32, crowdfunded: 121.91, matchedUSD: null, matchedUSDGLO: 1292, totalUSD: null, link: 'https://greenpill.network' },
    { name: 'Celo Mexico', contributions: 29, crowdfunded: 210.34, matchedUSD: null, matchedUSDGLO: 2360, totalUSD: null, link: 'https://x.com/celomexico' },
    { name: 'ReFi Barcelona', contributions: 32, crowdfunded: 80.1, matchedUSD: null, matchedUSDGLO: 1845, totalUSD: null, link: 'https://refibcn.cat/Home' },
    { name: 'ReFi PDX', contributions: 23, crowdfunded: 170.89, matchedUSD: null, matchedUSDGLO: 487, totalUSD: null, link: 'https://x.com/ReFi_PDX' },
    { name: 'ReFi Latam', contributions: 24, crowdfunded: 158.84, matchedUSD: null, matchedUSDGLO: 813, totalUSD: null, link: 'https://x.com/refithehague' },
    { name: 'ReFi Tulum', contributions: 34, crowdfunded: 125.3, matchedUSD: null, matchedUSDGLO: 1738, totalUSD: null, link: 'https://x.com/refitulum' },
    { name: 'GreenPill India', contributions: 35, crowdfunded: 85.79, matchedUSD: null, matchedUSDGLO: 530, totalUSD: null, link: 'https://x.com/GreenPill_IND' },
    { name: 'Bloom Network', contributions: 28, crowdfunded: 133.1, matchedUSD: null, matchedUSDGLO: 1365, totalUSD: null, link: 'https://x.com/ourbloomnetwork' },
    { name: 'GreenPill TO', contributions: 23, crowdfunded: 151.73, matchedUSD: null, matchedUSDGLO: 443, totalUSD: null, link: 'https://x.com/GreenPillTO' },
    { name: 'ReFi Phangan', contributions: 31, crowdfunded: 462.66, matchedUSD: null, matchedUSDGLO: 1667, totalUSD: null, link: 'https://x.com/GreenPillTO' },
    { name: 'ReFi Atlántico', contributions: 23, crowdfunded: 59.46, matchedUSD: null, matchedUSDGLO: 574, totalUSD: null, link: 'https://x.com/refiatlantico' },
    { name: 'ReFi DAO', contributions: 30, crowdfunded: 137.64, matchedUSD: null, matchedUSDGLO: 1913, totalUSD: null, link: 'https://x.com/ReFiDAOist' },
    { name: 'Refi Uganda', contributions: 27, crowdfunded: 57.76, matchedUSD: null, matchedUSDGLO: 915, totalUSD: null, link: 'https://linktr.ee/refiuganda' },
    { name: 'GreenPill Taiwan', contributions: 23, crowdfunded: 33.94, matchedUSD: null, matchedUSDGLO: 136, totalUSD: null, link: 'https://x.com/GreenSofa_TW' },
    { name: 'ReFi The Hague', contributions: 27, crowdfunded: 1675.13, matchedUSD: null, matchedUSDGLO: 497, totalUSD: null, link: 'https://x.com/refithehague' },
    { name: 'Greenpill Brasil', contributions: 36, crowdfunded: 114.93, matchedUSD: null, matchedUSDGLO: 1151, totalUSD: null, link: 'https://x.com/GreenPillBrasil' },
    { name: 'Celatam', contributions: 23, crowdfunded: 110.58, matchedUSD: null, matchedUSDGLO: 799, totalUSD: null, link: 'https://x.com/CeLatamOrg' },
    { name: 'GreenPill CIV', contributions: 18, crowdfunded: 50.01, matchedUSD: null, matchedUSDGLO: 104, totalUSD: null, link: 'https://x.com/greenpillciv' },
    { name: 'ReFi Costa Rica', contributions: 29, crowdfunded: 58.95, matchedUSD: null, matchedUSDGLO: 1199, totalUSD: null, link: 'https://x.com/reficostarica_' },
    { name: 'ReFi Red Hook', contributions: 16, crowdfunded: 25.14, matchedUSD: null, matchedUSDGLO: 201, totalUSD: null, link: 'https://x.com/ReFiRedHook' },
    { name: 'ReFi BayArea', contributions: 30, crowdfunded: 416.68, matchedUSD: null, matchedUSDGLO: 451, totalUSD: null, link: 'https://x.com/ReFiBayArea' },
    { name: 'Uncommons', contributions: 20, crowdfunded: 56.69, matchedUSD: null, matchedUSDGLO: 141, totalUSD: null, link: 'https://x.com/Un__commons' },
    { name: 'ReFi Venezuela', contributions: 19, crowdfunded: 227.21, matchedUSD: null, matchedUSDGLO: 378, totalUSD: null, link: 'https://x.com/RefiVenezuela' },
    { name: 'ReFi Lisboa', contributions: 24, crowdfunded: 227.21, matchedUSD: null, matchedUSDGLO: 1099, totalUSD: null, link: 'https://x.com/ReFiLisboa' },
    { name: 'Celo Africa DAO', contributions: 39, crowdfunded: 327.23, matchedUSD: null, matchedUSDGLO: 1747, totalUSD: null, link: 'https://www.celoafricadao.xyz' },
    { name: 'Celo Arabia', contributions: 14, crowdfunded: 24.83, matchedUSD: null, matchedUSDGLO: 304, totalUSD: null, link: 'https://x.com/CeloArabia' },
    { name: 'ReFi Tanzania', contributions: 42, crowdfunded: 129.86, matchedUSD: null, matchedUSDGLO: 1747, totalUSD: null, link: 'https://x.com/ReFiTanzania' },
    { name: 'Celo Canada', contributions: 13, crowdfunded: 30.22, matchedUSD: null, matchedUSDGLO: 195, totalUSD: null, link: 'https://forum.celo.org/t/draft-celo-canada-h2-2024-regional-dao/8535' },
    { name: 'ReFi MedellÃ­n', contributions: 50, crowdfunded: 409.25, matchedUSD: null, matchedUSDGLO: 2392, totalUSD: null, link: 'https://x.com/refimedellin' },
    { name: 'Greenpill Dev Guild', contributions: 43, crowdfunded: 709.44, matchedUSD: null, matchedUSDGLO: 1274, totalUSD: null, link: 'https://x.com/greenpilldevs' },
  ]

  const [search, setSearch] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 10
  const [selectedSort, setSelectedSort] = useState("Amount")
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const filteredProjects = projects
    .filter(p => p.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (selectedSort === "Top Ten") return b.matchedUSDGLO - a.matchedUSDGLO
      if (selectedSort === "Bottom Ten") return a.matchedUSDGLO - b.matchedUSDGLO
      return 0
    })

  const paginated = filteredProjects.slice((currentPage - 1) * pageSize, currentPage * pageSize)


  return (
    <section className="bg-white min-h-screen py-10 px-4">
      <div className="flex flex-wrap justify-center sm:justify-end w-full px-2 py-2 mb-6">
        <button className="flex items-center gap-1 px-12 sm:px-10 py-3.5 text-white bg-[#198038] rounded-sm text-sm sm:text-md hover:bg-green-800 transition whitespace-nowrap mr-0 lg:mr-13">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4"
            />
          </svg>
          Download
        </button>
      </div>


      {/* Centered container with white background */}
      <div className="max-w-7xl mx-auto bg-white p-4 sm:p-6 rounded-2xl shadow-xl border-2 overflow-x-auto">
        {/* Main content */}
        <main className="w-full">
          <div className="flex flex-col sm:flex-row justify-between mb-6 items-start sm:items-center py-5 gap-4">
            <div>
              <h2 className="text-lg sm:text-xl font-semibold">
                GG21 REGEN COORDI-NATION GENESIS - ROUND
              </h2>
              <p className="text-sm text-black pt-3 font-extrabold">
                Type: Quadratic Funding • August, 2024
              </p>
            </div>
            <h2 className="text-sm text-black">
              <span className="font-bold text-black/70">Matching Pool: </span> USDGLO 50K
            </h2>
          </div>

          <div className="flex flex-col lg:flex-row justify-end items-start sm:items-center gap-4 mb-6 lg:mb-27">
            {/* Search Input */}
            <div className="relative w-full sm:w-64">
              <input
                type="text"
                placeholder="Search"
                className="rounded-sm pl-10 pr-3 py-3 w-full bg-[#34C7591A] text-[#202224]/70 focus:outline-none"
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

            {/* Dropdown */}
            <div className="relative w-full sm:w-52">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="w-full border px-3 py-2 rounded-sm bg-[#34C7591A] flex justify-between items-center"
              >
                <span className="flex items-center gap-1 whitespace-nowrap">
                  <span className="text-black/60">Sort by:</span>
                  <span className="font-medium text-[#000000]">{selectedSort}</span>
                </span>
                <ChevronDown
                  className={`w-5 h-5 ml-2 text-[#000000] transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
                />
              </button>

              {dropdownOpen && (
                <ul className="absolute mt-1 w-full bg-white border rounded-sm shadow z-10">
                  {["All", "Top Ten", "Bottom Ten"].map((option) => (
                    <li
                      key={option}
                      onClick={() => {
                        setSelectedSort(option);
                        setDropdownOpen(false);
                      }}
                      className={`flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-[#34C7591A] ${option === selectedSort ? "bg-[#34C7591A] font-medium" : ""}`}
                    >
                      <input
                        type="checkbox"
                        checked={option === selectedSort}
                        readOnly
                        className="form-checkbox text-[#34C759] border-gray-300 rounded-sm"
                      />
                      {option}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>


          {/* Responsive Table */}
          <div className="overflow-x-auto p-4 sm:p-6 md:p-10">
            <table className="min-w-[800px] w-full bg-white text-sm">
              <thead className="bg-white text-left">
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
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="p-3 border">{project.name}</td>
                    <td className="p-3 border">{project.contributions}</td>
                    <td className="p-3 border">${(project.crowdfunded ?? 0).toFixed(2)}</td>
                    <td className="p-3 border text-gray-400">$NaN</td>
                    <td className="p-3 border">{project.matchedUSDGLO} USDGLO</td>
                    <td className="p-3 border text-gray-400">$NaN</td>
                    <td className="p-3 border">
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-[#A6E7D8] text-[#26A17B] px-3 py-2 rounded font-medium hover:bg-[#A6E7D8] border border-solid border-[#008767] whitespace-nowrap min-w-max inline-block text-center"
                        >
                          Learn more
                        </a>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex flex-col items-center justify-center sm:flex-row sm:justify-between mt-6 text-sm text-gray-500 gap-3">
            <span className="text-center sm:text-left">
              Showing {(currentPage - 1) * pageSize + 1} to{" "}
              {Math.min(currentPage * pageSize, filteredProjects.length)} of{" "}
              {filteredProjects.length} entries
            </span>

            <div className="flex flex-wrap justify-center sm:justify-start items-center gap-1 sm:gap-2">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
                className="w-8 h-8 sm:w-9 sm:h-9 text-xs sm:text-sm flex items-center justify-center border border-gray-200 rounded-md text-black font-bold hover:bg-gray-100 disabled:opacity-50"
              >
                &lt;
              </button>

              {Array.from({ length: Math.ceil(filteredProjects.length / pageSize) }).map((_, i) => {
                const page = i + 1;
                return (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-8 h-8 sm:w-9 sm:h-9 text-xs sm:text-sm flex items-center justify-center rounded-md border ${currentPage === page
                        ? "bg-[#198038] text-white"
                        : "border-gray-200 text-gray-700 hover:bg-gray-100"
                      }`}
                  >
                    {page}
                  </button>
                );
              })}

              <button
                disabled={currentPage === Math.ceil(filteredProjects.length / pageSize)}
                onClick={() => setCurrentPage(currentPage + 1)}
                className="w-8 h-8 sm:w-9 sm:h-9 text-xs sm:text-sm flex items-center justify-center border border-gray-200 rounded-md text-black font-bold hover:bg-gray-100 disabled:opacity-50"
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