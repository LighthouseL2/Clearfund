import Image from "next/image";
import Link from "next/link";

const GrantRoundCard = ({ grants, grantStatus }) => {
  return (
    <div className="relative mb-6">
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10 mt-16 w-full text-black justify-items-center">
        {grants.map((item, index) => (
          <div
            key={index}
            className="flex flex-col justify-between h-full w-full max-w-[360px] border-1 rounded-xl border-[#000000]/40 bg-white hover:shadow-md transition"
          >
            
            <div className="rounded-t-xl overflow-hidden w-full h-[166px]  relative">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="w-full h-auto object-cover rounded-t-xl"
              />

            </div>
            {/* Card content */}
            <div className="flex-grow mt-4 px-5 pb-4 flex flex-col">
              <div>
                <div className="flex justify-between items-center pt-4 mb-2">
                  <h3 className="text-[16px] text-[#000000] font-bold leading-snug">
                    {item.title}
                  </h3>
                  <p className="inline-flex items-center border bg-[#D1FAE5] border-black/15 text-[#198038] rounded-[5px] px-2 gap-1 text-[14px]  font-medium  w-fit">
                    <span className="font-bold">{item.amount}</span>
                    {/* <span>{item.coin}</span> */}
                  </p>
                </div>

                <p className="text-[14px] leading-snug text-gray-700 mb-8 pt-4">
                  {item.desc}
                </p>
              </div>
              <div className="px-5 py-2 mb-2 mt-auto">
                {item.link && (
                  item.status === "past" ? (
                    <span
                      style={{ fontSize: '16px' }}
                      className="block  bg-[#A6E7D8]/50 border-1 border-[#008767] text-[#008767] opacity-60 cursor-not-allowed transition w-full py-2.5 text-center font-medium rounded-full"
                    >
                      Ended
                    </span>
                  ) : (
                    <Link
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ fontSize: '16px' }}
                      className="block  bg-[#A6E7D8]/50 border-1 border-[#008767] text-[#008767] transition w-full py-2.5 text-center font-bold rounded-full"
                    >
                      Apply
                    </Link>
                  )
                )}
              </div>
              <hr className=" mt-4" />
              <div className="flex items-start mt-3 py-2">
                <p className="text-[10px] text-[#000000]  font-medium border bg-[#FFFFFF] border-black/15 rounded-[50px] px-2 py-1">{item.date}</p>
              </div>
            </div>

          </div>

        ))}
      </div>
    </div>
  );
};

export default GrantRoundCard;
