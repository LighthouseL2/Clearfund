import Image from "next/image";
import Link from "next/link";

const GrantRoundCard = ({ grants }) => {
  return (
    <div className="relative mb-6">
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10 mt-16 w-full text-black justify-items-center">
        {grants.map((item, index) => (
          <div
            key={index}
            className="flex flex-col justify-between h-full w-full max-w-[360px] border border-gray-200 rounded-lg shadow-sm bg-white hover:shadow-md transition"
          >
            {/* Top image */}
            <div className="h-[56px] relative">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover object-top rounded-t-lg"
              />
            </div>

            {/* Card content */}
            <div className="flex-grow mt-5 px-6 pb-6">
              {/* Title and status */}
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-[16px] text-black font-semibold leading-snug">
                  {item.title}
                </h3>
                <span className="text-[12px] font-medium rounded-full px-3 py-1 bg-[#D1F9E5] text-[#009951]">
                  {item.status}
                </span>
              </div>

              {/* Network and date */}
              <div className="flex justify-between items-end mt-1 mb-3">
                <span className="inline-block bg-black text-white text-[12px] font-bold font-sans rounded px-2 py-1">
                  {item.network}
                </span>
                <p className="text-[12px] text-[#198038] font-sans">{item.date}</p>
              </div>

              {/* Description */}
              <p className="text-[14px] font-sans leading-snug text-gray-700 mb-6">
                {item.desc}
              </p>

              {/* Amount */}
              <p className="inline-flex items-center border bg-[#D8D8D833] border-black/20 rounded py-1 px-3 gap-1 text-[14px] font-sans font-medium">
                <span className=" text-black font-extrabold">{item.amount}</span>
                <span className="text-black/50">{item.coin}</span>
              </p>
            </div>

            {/* Apply button pinned to bottom */}
            <div className="px-5 py-3 border-t border-gray-200 mt-auto">
              {item.link && (
                <Link
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block font-sans bg-[#198038] hover:bg-[#198038] transition rounded-md w-full py-3 text-center text-white text-sm font-medium"
                >
                  Apply
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GrantRoundCard;
