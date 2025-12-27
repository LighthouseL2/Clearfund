// import imgImages5 from "../imports/figma:asset/81e4423f33f222c09352ac3d12f03fbff9690375.png";
import Link from "next/link";
import { useGrantStore } from "@/store/grantStore";
import { useRouter } from "next/navigation";
import { imgImages4 } from "../components/imports/svgImage";
import { X } from "lucide-react";
import { Badge, ApplyButton, CloseIcon, XIcon } from "./overview";
import { useState } from "react";

// interface GrantCardProps {
//   title: string;
//   description: string;
//   category: string;
//   status: string;
//   amount: string;
//   logo?: string;
// }

export default function GrantCard({
  title,
  description,
  category,
  status,
  amount,
  displayGrant,
  index,
  link,
  deadline,
  logo,
}) {

  const [showDetails, setShowDetails] = useState(false)
  // const router = useRouter()
  // const setGrant = useGrantStore((s) => s.setGrant)
  return (
    <div className="bg-white rounded-[10px] border border-[rgba(0,0,0,0.2)] p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start gap-6 mb-4">
        {/* Logo */}
        {/* <div
          className="w-11 h-11 rounded-full overflow-hidden flex-shrink-0"
          style={{
            maskImage: `url('${imgImages4}')`,
            maskSize: 'cover',
          }}
        >
          <img
            src={logo }
            alt={title}
            className="w-full h-full object-cover"
          />
        </div> */}

        {/* Title */}
        <h3 className="font-['Inter:Black',sans-serif] font-black text-[16px] text-[#323f4b] flex-1">
          {title}
        </h3>
      </div>

      {/* Description */}
      <p className="font-['Inter:Regular',sans-serif] font-normal text-[16px] leading-[25px] text-[rgba(0,0,0,0.7)] mb-6 line-clamp-3">
        {description}
      </p>

      {/* Tags and Details */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 flex-wrap">
          {/* Category Badge */}
          <span className="inline-flex items-center h-[19px] px-3 bg-[#f2ebfd] border-[0.5px] border-purple-600 rounded-[50px] font-['Modern_Era:Bold',sans-serif] text-[12px] leading-[20px] text-purple-600">
            {category}
          </span>

          {/* Status Badge */}
          <span className="inline-flex items-center h-[19px] px-3 bg-[#21c45d] rounded-[50px] font-['Modern_Era:Bold',sans-serif] text-[12px] leading-[20px] text-white">
            {status}
          </span>

          {/* Amount Badge */}
          <span className={`${amount && "inline-flex items-center h-[19px] px-2 bg-emerald-100 border-[0.5px] border-[#198038] rounded-[50px] font-['Inter:Bold',sans-serif] font-bold text-[10px] leading-[20px] text-[#198038]"} `}>
            {amount}
          </span>
        </div>

        {/* Details Button */}
        <button
          onClick={() => setShowDetails(true)}
          className="flex items-center gap-2 text-[#198038] hover:underline transition-all group shrink-0">
          <span className="font-['Modern_Era:Bold',sans-serif] text-[14px] leading-5">
            Details
          </span>
          <div className="h-1.5 w-[18px] relative">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 8">
              <path d="M16 1L19 4M19 4L16 7M19 4H1" stroke="#198038" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            </svg>
          </div>
        </button>



        {
          showDetails && (
            <div className={`min-h-screen fixed top-0 z-50 lg:left-32 w-full flex items-center justify-center p-4 md:p-8 `}>
            {/* Modal Card */}
            <div className="relative w-[900px] h-[563px] bg-white rounded-2xl shadow-2xl p-8 md:p-10">
              {/* Close button - top right */}
              <div className="absolute top-6 right-6">
                {/* <CloseIcon /> */}
                <button onClick={() => setShowDetails(false)}>
                  <X className='opacity-80'/>
                </button>
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
                  <h1 className="text-[24px] font-bold text-black">{title}</h1>
                </div>
      
                {/* Description */}
                <div className="space-y-4 mb-8">
                  <p className="text-[15px] leading-[1.6] text-[#4B5563]">
                    {description}
                    {/* PG Builder Grants program is designed to support foundational public goods in the Ethereum and Web3 ecosystems. The program aims to empower projects that have demonstrated exceptional usefulness and impact for developers and users alike. */}
                  </p>
                  <p className="text-[15px] leading-[1.6] text-[#4B5563]">
                    By providing significant financial support, we help projects continue to drive innovation and growth within the ecosystem. Whether you&apos;re building infrastructure, developing tools, or creating educational resources, PG Builder Grants offer a pathway to secure the funding you need to make a lasting difference.
                  </p>
                </div>
              </div>
      
              {/* Application Period Section */}
              <div className="space-y-2">
                <h2 className="text-[18px] font-bold text-black">Application Deadline</h2>
                <div className="flex items-center justify-between">
                  <p className="text-[15px] font-semibold text-[#059669]">{deadline}</p>
                  <ApplyButton link={link} setToggle={setShowDetails}/>
                </div>
              </div>
            </div>
      </div>
          )
        }
      </div>

      



      
      
    </div>
  );
}
