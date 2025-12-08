// import imgImages5 from "../imports/figma:asset/81e4423f33f222c09352ac3d12f03fbff9690375.png";
import { imgImages4 } from "../components/imports/svgImage";

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
  logo,
}) {
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
          <span className="inline-flex items-center h-[19px] px-2 bg-emerald-100 border-[0.5px] border-[#198038] rounded-[50px] font-['Inter:Bold',sans-serif] font-bold text-[10px] leading-[20px] text-[#198038]">
            {amount}
          </span>
        </div>

        {/* Details Button */}
        <button className="flex items-center gap-2 text-[#198038] hover:underline transition-all group flex-shrink-0">
          <span className="font-['Modern_Era:Bold',sans-serif] text-[14px] leading-[20px]">
            Details
          </span>
          <div className="h-[6px] w-[18px] relative">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 8">
              <path d="M16 1L19 4M19 4L16 7M19 4H1" stroke="#198038" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            </svg>
          </div>
        </button>
      </div>
    </div>
  );
}
