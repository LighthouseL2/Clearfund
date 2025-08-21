import Image from "next/image";
import Link from "next/link";

const GrantRoundCard = ({ grants }) => {
  return (
    <div className="relative mb-6">
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10 mt-16 w-full text-black justify-items-center">
        {grants.map((item, index) => (
          <div
            key={index}
            className="flex flex-col justify-between h-full w-full max-w-[360px] border-2 border-[#0000004D]/30  shadow-sm bg-white hover:shadow-md transition"
          >
            {/* Top image */}
            <div className="flex items-center justify-center w-full h-auto">
              <Image
                src={item.image}
                alt={item.title}
                width={298}
                height={149}
                className="object-contain py-0 sm:py-2 md:py-2.5 lg:py-3.5 xl:py-4"
              />
            </div>
            {/* Card content */}
            <div className="flex-grow mt-5 px-6 pb-6 flex flex-col">

              <div>
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-[16px] text-[#000000] font-bold leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-[10px] text-[#198038] font-sans font-bold border bg-[#D1FAE5] border-black/15 rounded-[10px] px-3">{item.date}</p>
                </div>

                <p className="text-[12px] font-sans leading-snug text-gray-700 mb-3 py-3">
                  {item.desc}
                </p>
              </div>
              <div className="flex-grow"></div>
              <p className="inline-flex items-center border bg-[#D1FAE5] border-black/15 text-[#198038] rounded-[10px] px-3 gap-1 text-[14px] font-sans font-medium mt-4 w-fit">
                <span className=" font-extrabold ">{item.amount}</span>
                <span className="">{item.coin}</span>
              </p>
            </div>
            <div className="px-5 py-3 mb-1.5 mt-auto">
              {item.link && (
                <Link
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontSize: '16px' }}
                  className="block font-sans bg-[#A6E7D8]/50 border-1 border-[#008767] text-[#008767] transition  w-full py-3 text-center font-medium "
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
