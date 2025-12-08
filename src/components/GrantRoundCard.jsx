"use client";

import Image from "next/image";
import Link from "next/link";
import { usePrivy } from "@privy-io/react-auth";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";



const GrantRoundCard = ({ grants, setToggle }) => {
  const { ready, authenticated, login, logout, user } = usePrivy()
  const [targetLink, setTargetLink] = useState(null)
  const router = useRouter()

  const start = new Date()

  useEffect(() => {
    if(ready && authenticated && targetLink) {
        router.push(targetLink)
        setTargetLink(null)
        setToggle(false)
    }
  }, [authenticated, router, targetLink, ready])
  
  
    const handleGrantClick = async (link) => {
        // if(!ready) return

        if(authenticated){
            // router.push(link)
            if (typeof window !== 'undefined') {
                window.open(link, "_blank")
            }
        }else {
            setTargetLink(link)
            setToggle(true)
        }
    }

  return (
    <div className="relative mb-6">
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10 mt-16 w-full text-black justify-items-center">
        {grants.map((item, index) => {

          const end = new Date(item.deadline)

          let status;
          if(start > end ) status = "past"
          else status = "active"

          {/* const isEnded = start > end */}

          return (
            <div
            key={index}
            className="flex flex-col hover:scale-105 shadow-2xl justify-between h-full w-full max-w-[360px] border-1 rounded-xl border-[#000000]/40 bg-white hover:shadow-md transition"
          >

            <div className="rounded-t-xl overflow-hidden w-full h-[166px]  relative">
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="w-full h-auto object-cover rounded-t-xl"
              />

            </div>
            {/* Card content */}
            <div className="flex-grow mt-4 px-5 pb-4 flex flex-col">
              <div>
                <div className="flex justify-between items-center pt-4 mb-2">
                  <h2 className="text-[16px] text-[#000000] font-black leading-snug w-2/3">
                    {item.title}
                  </h2>

                  <p className={item.amount !== null ? "inline-flex items-center border bg-[#D1FAE5] border-black/15 text-[#198038] rounded-[5px] px-2 gap-1 text-[14px]  font-medium  w-fit" : undefined}>
                    <span className="font-bold">{item.amount}</span>
                    {/* <span>{item.coin}</span> */}
                  </p>
                </div>

                <div className="pt-4">
                  <h3 className="underline font-black text-[16px] font-sans">{item.subTitle}</h3>

                <p className="text-[14px] leading-snug text-gray-700 mb-8">
                  {item.desc}
                </p>
                </div>
              </div>
              
                
                  <div className="px-5 py-2 mb-2 mt-auto">
                    {item.link && (
                      status === "past" ? (
                        <span
                          style={{ fontSize: '16px' }}
                          className="block  bg-[#A6E7D8]/50 border-1 border-[#008767] text-[#008767] opacity-60 cursor-not-allowed transition w-full py-2.5 text-center font-medium rounded-full"
                        >
                          Ended
                        </span>
                      ) : (
                        <button
                          // href={item.link}
                          onClick={() => handleGrantClick(item.link)}
                          // target="_blank"
                          rel="noopener noreferrer"
                          style={{ fontSize: '16px' }}
                          className="block  bg-[#A6E7D8]/50 border-1 border-[#008767] cursor-pointer
                          text-[#008767] transition w-full py-2.5 text-center font-bold rounded-full"
                        >
                          {item.label}
                        </button>
                      )
                    )}
                  </div>
              <hr className=" mt-4" />
              <div className="flex items-start mt-3 py-2 ">
                <p className="text-[10px] text-[#000000] w-[116.5px] h-[23px] flex items-center justify-center  font-medium border bg-[#FFFFFF] border-black/15 rounded-[50px]">{item.date}</p>
              </div>
            </div>

          </div>
          )
        })}
      </div>
    </div>
  );
};

export default GrantRoundCard;
