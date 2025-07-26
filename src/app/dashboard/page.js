"use client";

import Sidebar from "@/components/Sidebar";
import BackgroundSlider from "@/components/BackgroundSlider";
import Image from "next/image";

export default function Dashboard() {
  const stats = [
    {
      title: "Total Funding",
      value: "$40,689",
      icon: "/grant-icons/total-funding-icon.svg",
      label: "Active round",
      labelIcon: "/card-icons/active-round-icon.svg",
    },
    {
      title: "Active Grant",
      value: "10",
      icon: "/grant-icons/active-grant-icon.svg",
      label: "Ongoing",
      labelIcon: "/card-icons/ongoing-round-icon.svg",
    },
    {
      title: "ReFi Project",
      value: "14",
      icon: "/grant-icons/refi-project-icon.svg",
      label: "Building on ReFi",
      labelIcon: "/card-icons/building-round-icon.svg",
    },
    {
      title: "Public Goods",
      value: "12",
      icon: "/grant-icons/grant-data-icon.svg",
      label: "Past Grant",
      labelIcon: "/card-icons/archive-round-icon.svg",
    },
  ];

  const grants = [
    {
      logo: "/grant-logo/gitcoin.svg",
      title: "Ocean Plastic Cleanup Network",
      org: "Gitcoin",
      amount: "$3k",
      date: "56 days ago",
    },
    {
      logo: "/grant-logo/gitcoin.svg",
      title: "Gitcoin Grant (GG22) Climate Round",
      org: "Gitcoin",
      amount: "$2k",
      date: "3 days ago",
    },
    {
      logo: "/grant-logo/celo-icon.svg",
      title: "Solar Energy Microgrid for Rural Kenya",
      org: "Celo Foundation",
      amount: "$1k",
      date: "6 days ago",
    },
    {
      logo: "/grant-logo/eth-icon.svg",
      title: "Regenerative Agriculture Data Platform",
      org: "Ethereum Foundation",
      amount: "$1k",
      date: "9 days ago",
    },
    {
      logo: "/grant-logo/octant-icon.svg",
      title: "Ocean Plastic Cleanup Network",
      org: "Octant",
      amount: "$3k",
      date: "12 days ago",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50 text-gray-800 relative">
      {/* Sidebar imported */}
      <Sidebar />

      {/* Main content */}
      <main className="flex-1 p-4 md:p-6 md:ml-64">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-md shadow-sm px-4 py-2 flex flex-col justify-between border-gray-100"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-sm text-black p-2">{stat.title}</h4>
                  <p className="text-2xl font-semibold text-black p-2">{stat.value}</p>
                </div>
                <div className="relative w-10 h-10 flex-shrink-0">
                  <Image
                    src={stat.icon}
                    alt={stat.title}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
              <div className="flex items-center gap-2 mt-4 text-sm text-black">
                <div className="relative w-4 h-4 flex-shrink-0">
                  <Image
                    src={stat.labelIcon}
                    alt={stat.title}
                    fill
                    className="object-contain"
                  />
                </div>
                <span className="truncate">{stat.label}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Featured Section */}
        <section className="mb-6 md:mb-12 md:my-16">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3">
            <div>
              <h2 className="text-lg font-semibold">Featured Grant Rounds</h2>
              <p className="text-sm text-black mb-4">
                Active funding opportunities for public goods project
              </p>
            </div>
            <a href="#" className="text-sm text-black">
              View All
            </a>
          </div>
          <BackgroundSlider />
        </section>

        {/* Bottom Sections */}
        <div className="grid md:grid-cols-2 gap-6 mb-12 md:my-16">
          {/* Email Updates */}
          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-lg font-semibold mb-2">
              Stay Updated on Grant Opportunities
            </h3>
            <p className="text-sm text-black mb-4">
              Get notified about new ReFi grants that match your interest
            </p>
            <label className="text-sm text-black mb-4">Email Address</label>
            <input
              type="email"
              placeholder="you@email.com"
              className="w-full mb-4 p-2 border rounded-lg"
            />
            <p className="mb-3 text-bold text-black text-md">
              Categories Of Interest
            </p>
            <div className="grid grid-cols-2 gap-2 text-sm text-gray-700 mb-4">
              {[
                "Public Goods",
                "Climate",
                "Education",
                "DeSci",
                "Local Impact",
                "Research",
                "Community",
                "Event",
              ].map((cat) => (
                <label key={cat} className="flex items-center space-x-2">
                  <input type="checkbox" /> <span>{cat}</span>
                </label>
              ))}
            </div>
            <button className="w-full bg-green-600 text-white font-semibold py-2 rounded">
              Subscribe For Updates
            </button>
          </div>

          {/* Recent Grant Recipients */}
          <div className="bg-white p-6 rounded-xl shadow">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold">Recent Grant Recipients</h3>
              <a href="#" className="text-sm text-gray-500">
                View All
              </a>
            </div>
            <div className="space-y-5">
              {grants.map((grant, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="relative w-9 h-9 rounded-full overflow-hidden bg-gray-100">
                      <Image
                        src={grant.logo}
                        alt={grant.org}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {grant.title}
                      </div>
                      <div className="text-sm text-gray-500">{grant.org}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900">
                      {grant.amount}
                    </div>
                    <div className="text-sm text-gray-500">{grant.date}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
