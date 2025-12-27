import svgPaths from "../components/imports/svg";
import { X } from "lucide-react";

// Load fonts
const interFont = "font-['Inter']";
const modernEraFont = "font-['Modern_Era']";

// X/Twitter icon for the small button
export function XIcon() {
  return (
    <div className="relative w-3.5 h-[13px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 13">
        <g>
          <path d={svgPaths.p1d6b7300} fill="white" />
        </g>
      </svg>
    </div>
  );
}

// Close button icon (circle with X)
export function CloseIcon() {
  return (
    <div className="relative w-[33px] h-[33px] cursor-pointer hover:opacity-80 transition-opacity">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 33 33">
        <g>
          <path d={svgPaths.p3a81900} fill="black" fillOpacity="0.9" />
        </g>
      </svg>
    </div>
  );
}

// Small close icon next to Overview
export function SmallCloseIcon() {
  return (
    <div className="relative w-7 h-7 flex items-center justify-center bg-black rounded-full cursor-pointer hover:bg-[#9CA3AF] transition-colors">
      <div className="relative w-7 h-7">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 28">
          <circle cx="14" cy="14" fill="black" fillOpacity="0.25" r="14" />
        </svg>
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <XIcon />
      </div>
    </div>
  );
}

// Badge component
export function Badge({ children }) {
    return (
    <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#D1FAE5] rounded-full">
      <div className="w-2 h-2 rounded-full bg-[#10B981]" />
      <p className={`text-[12px] font-bold text-[#059669] ${interFont}`}>{children}</p>
    </div>
  );
}


// Apply button
export function ApplyButton({link, setToggle}) {
  return (
    <button className="flex items-center justify-center px-8 py-3 rounded-full border-2 border-[#10B981] bg-[#D1FAE5] hover:bg-[#A7F3D0] transition-colors" onClick={() => setToggle(false)}>
      <a href={link} className={`text-[15px] font-bold text-[#059669] ${modernEraFont}`}>Click here to apply</a>
    </button>
  );
}

export default function Application() {
  return (
    <div className={`min-h-screen fixed z-50 lg:left-32 w-full flex items-center justify-center p-4 md:p-8 `}>
      {/* Modal Card */}
      <div className="relative w-[900px] h-[563px] bg-white rounded-2xl shadow-2xl p-8 md:p-10">
        {/* Close button - top right */}
        <div className=" top-6 right-6">
          {/* <X size={40}/> */}
          <SmallCloseIcon />
        </div>

        {/* Badges */}
        <div className="flex flex-wrap items-center gap-6 mb-8">
          <Badge>Direct Grants</Badge>
          <Badge>Early Stage Startups</Badge>
          <Badge>Open source project</Badge>
        </div>

        {/* Overview Section */}
        <div className="mb-6">
          <div className="flex items-center gap-2.5 mb-4">
            <h1 className="text-[24px] font-bold text-black">Overview</h1>
          </div>

          {/* Description */}
          <div className="space-y-4 mb-8">
            <p className="text-[15px] leading-[1.6] text-[#4B5563]">
              PG Builder Grants program is designed to support foundational public goods in the Ethereum and Web3 ecosystems. The program aims to empower projects that have demonstrated exceptional usefulness and impact for developers and users alike.
            </p>
            <p className="text-[15px] leading-[1.6] text-[#4B5563]">
              By providing significant financial support, we help projects continue to drive innovation and growth within the ecosystem. Whether you&apos;re building infrastructure, developing tools, or creating educational resources, PG Builder Grants offer a pathway to secure the funding you need to make a lasting difference.
            </p>
          </div>
        </div>

        {/* Application Period Section */}
        <div className="space-y-2">
          <h2 className="text-[18px] font-bold text-black">Application Period</h2>
          <div className="flex items-center justify-between">
            <p className="text-[15px] font-semibold text-[#059669]">Sep 26 - Mar 1, 2026</p>
            <ApplyButton />
          </div>
        </div>
      </div>
    </div>
  );
}