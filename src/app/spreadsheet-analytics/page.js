"use client";
import Image from "next/image";

export default function DashboardCards() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center py-10 font-sans">
      <div className="w-full max-w-6xl flex justify-center sm:justify-start mb-8">
        <button
          className="px-7 py-1 rounded-[5px] text-xs sm:text-sm border-2 border-[#26A17B] bg-[#A6E7D8]/40 text-[#26A17B] font-medium transition"
        >
          Back
        </button>
      </div>
      <div className="flex flex-wrap justify-center gap-10 mt-12 w-full px-4">
        <div className="w-full sm:w-90 h-80 bg-white flex flex-col justify-between p-6 border-[3px] border-[#0000004D]/30 rounded-[20px]">
          <div className="flex flex-col items-center text-center">
            <Image
              src="/spreadsheet-icon.svg"
              alt="Open Directory"
              width={80}
              height={80}
              className="mb-4"
            />
            <h3 className="text-lg font-semibold text-gray-900">
              Open Directory
            </h3>
            <p className="text-sm text-gray-600 mt-2 whitespace-pre-line">
              Access list of grantees and <br />
              funding details.
            </p>
          </div>
          <button className="mx-auto mt-6 bg-[#39B54A] text-white text-sm font-medium py-4 px-14 rounded-[5px] transition">
            View
          </button>
        </div>
        <div className="w-full sm:w-90 h-80 bg-white flex flex-col justify-between p-6 border-[3px] border-[#0000004D]/30 rounded-[20px]">
          <div className="flex flex-col items-center text-center">
            <Image
              src="/analytics-icon.svg"
              alt="Analytics"
              width={80}
              height={80}
              className="mb-4"
            />
            <h3 className="text-lg font-semibold text-gray-900">
              Analytics
            </h3>
            <p className="text-sm text-gray-600 mt-2 whitespace-pre-line">
              Dashboard showcasing funding <br />
              patterns and data insights.
            </p>
          </div>
          <button
            className="mx-auto mt-6 bg-[#39B54A] text-white text-sm font-medium py-4 px-8 rounded-[5px] cursor-not-allowed"
            disabled
          >
            Coming Soon
          </button>
        </div>
      </div>
    </div>
  );
}
