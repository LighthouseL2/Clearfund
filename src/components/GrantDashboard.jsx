import { Card, CardContent } from "@/components/ui/card";
import { Clock, ArrowRight, DollarSign, Layers, RefreshCcw, Share2, Archive, CircleDollarSign, Bolt } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ConnectButton } from "@rainbow-me/rainbowkit";


export default function GrantDashboard() {

    const metricData = [
        {
            title: "Cumulative Raised",
            value: "$8,649,987",
            img: "/grant-icons/cumulative-raise-icon.svg",
            footer: { text: "Disbursed", icon: "/card-icons/Vector.png" },
        },
        {
            title: "Total Project",
            value: "3,853",
            img: "/grant-icons/total-project-icon.svg",
            footer: { text: "Funded", icon: "/card-icons/funded-icon.svg" },
        },

        {
            title: "Active Round",
            value: "14",
            img: "/grant-icons/active-round-icon.svg",
            footer: { text: "Ongoing", icon: "/card-icons/ongoing-round-icon.svg" },
        },


    ];

    const sideCardData = [


        {
            title: "Funding Data",
            value: "12",
            img: "/grant-icons/previous-funding-icon.svg",
            footer: { text: "Archive", icon: "/card-icons/archive-round-icon.svg" },
        },
        {
            title: "Ecosystem",
            value: "13",
            img: "/grant-icons/ecosystem-icon.svg",
            footer: { text: "Funding", icon: "/card-icons/funding-icon.svg" },
        },
        {
            title: "Upcoming Round",
            value: "2",
            img: "/grant-icons/upcoming-round-icon.svg",
            footer: { text: "Next", icon: "/card-icons/upcoming-label-icon.svg" },
        },

    ];




    const timelineData = [
        {
            date: "July 24, 2025",
            title: "Octant epoch 8",
            description: "Octant epoch 8 ended with 787.2165 ETH raised",
            link: ''
        },
        {
            date: "July 24, 2025",
            title: "Growthepie",
            description: "Growthepie raised 23.875 ETH in octant epoch 8 round",
            link: 'https://octant.app/project/8/0x9438b8B447179740cD97869997a2FCc9b4AA63a2'
        },


    ];
    const timelineDatas = [
        {
            date: "July 24, 2025",
            title: " Solidity ",
            description: "raised 22.364 ETH in octant epoch 8 round",
            link: 'https://octant.app/project/8/0xe2F7cF9C2b12c0BfcdAB571F9E50418fC08F4AD1'
        },
        {
            date: "July 24, 2025",
            title: "Dappnode",
            description: "raised 22.868 ETH in octant epoch 8 round",
            link: 'https://octant.app/project/8/0x54E38C5F55c1F7A9AfF534132544dA3e5b77cd89'
        },
        {
            date: "July 24, 2025",
            title: "Protocol Guild ",
            description: "raised 17.215 ETH in octant epoch 8 round",
            link: 'https://octant.app/project/8/0xdddd576bAF106bAAe54bDE40BCac602bB4a7cf79'
        }

    ];

    return (

        <div className="">
            <div className="flex justify-end items-center gap-5 mb-10 px-8 text-[#008767]">
                {/* <p className="rounded-full px-3 py-1 border font-bold text-[14px]">Celo</p> */}
                <div className="flex items-center gap-5  py-1 px-2 rounded-full font-sans">
                    {/* <span className="text-[14px] font-bold">G$ 122.10</span> */}
                    <div className="flex items-center gap-1">
                        <ConnectButton
                            // showBalance={true}
                        />
                    </div>
                </div>
            </div>


            <div className="px-4 sm:px-6 lg:px-8 py-6 space-y-6">
                {/* Metric Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-gray-800">
                    {[...metricData, ...sideCardData].map((item, index) => (
                        <div
                            key={index}
                            className="min-h-[160px] py-4 px-5 rounded-xl border-2 border-[#0000004D]/30 shadow-sm bg-white flex flex-col justify-between"
                        >
                            <div className="flex items-center justify-between">
                                <span className="text-[16px] text-black/50 break-words font-bold">{item.title}</span>
                                <div className="relative w-10 h-10 flex-shrink-0">
                                    <Image
                                        src={item.img}
                                        alt={item.title}
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                            </div>
                            <div className="text-xl font-extrabold text-black font-sans   mb-4 py-2 ">
                                {item.value}
                            </div>

                            {item.footer && (
                                <div className="flex items-center gap-2 text-gray-600 text-sm mt-3">
                                    <Image
                                        src={item.footer.icon}
                                        alt={item.footer.text}
                                        width={20}
                                        height={20}
                                        className="object-contain"
                                    />
                                    <p className="px-1 text-[14px] font-bold">{item.footer.text}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Timeline */}
                <div className="text-gray-800 py-14 flex gap-5 flex-wrap w-full">

                    <div className="lg:w-[44%] w-full border lg:h-[83vh] rounded-xl py-10">
                        <div className="w-full flex justify-center items-center">
                            <img src="/grantDashboard-icons/good.png" alt="" />
                        </div>

                        <h1 className="text-center text-[24px] font-sans text-[#00AFFF] leading-7 mt-5">
                            Empower Communities. <br />Maximize Impact
                        </h1>

                        <div className="w-full flex justify-center items-center">
                            <img src="/grantDashboard-icons/flower.png" alt="" />
                        </div>
                        <p className="w-[333px] text-black/70 leading-3.5 mt-2 text-[12px] mx-auto text-center">
                            GoodCollective is committed to empowering individuals and communities
                            by providing direct digital payments to those who need it most.
                        </p>

                        <Link href="/donate" className="flex w-[251px] items-center justify-center rounded-full
                        bg-[#95EED8] mx-auto mt-12 h-[50px] text-[16px] font-sans">
                            Donate
                        </Link>

                        <small className="underline mt-12 block text-center text-black/80 text-[12px] font-sans">
                            Powered by GoodDollar
                        </small>
                    </div>



                    <div className="lg:w-[44%] w-full lg:h-[83vh]">
                        <div className="bg-white rounded-xl font-sans shadow-sm p-6 border-2">
                            <h3 className="text-lg font-semibold mb-12 py-3">Recent Grant recipient</h3>

                            <div className="px-2 sm:px-4 lg:pb-8 pb-10">
                                <div className="relative border-l-2 border-gray-200">
                                    {/* {timelineData.map((item, index) => (
                                        
                                    ))} */}

                                    <div
                                            
                                            className={`pl-8 relative`}
                                        >
                                            <div className="absolute -left-6 top-0 w-11 h-11 bg-[#CDE1DD] rounded-full flex items-center justify-center">
                                                <Clock className="w-6 h-6 text-[#008767]" />
                                            </div>
                                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm text-gray-500 mb-1">July 24, 2025</p>
                                                    
                                                    <Link href={"/"} className="flex relative w-5/6">
                                                        <p><span className="text-[#008767]">Octant epoch 8</span> ended with 787.2165 ETH raised</p>
                                                        <p className="absolute left-10 bottom-1">
                                                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M0 6.11616V7.88384H10.6061L5.74495 12.7449L7 14L14 7L7 0L5.74495 1.25505L10.6061 6.11616H0Z" fill="#008767"/>
                                                            </svg>
                                                        </p>
                                                    </Link>
                                                </div>
                                                
                                            </div>
                                    </div>
                                    <div className={`pl-8 relative mt-10`}>
                                        <div className="absolute -left-6 top-0 w-11 h-11 bg-[#CDE1DD] rounded-full flex items-center justify-center">
                                            <Clock className="w-6 h-6 text-[#008767]" />
                                        </div>
                                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                            <Link href={"/"} className="flex relative w-5/6">
                                                <p className="text-[16px]"><span className="text-[#008767]">Growthepie </span> raised 23.875 ETH in octant epoch 8 round</p>
                                                <p className="absolute left-24 bottom-1">
                                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M0 6.11616V7.88384H10.6061L5.74495 12.7449L7 14L14 7L7 0L5.74495 1.25505L10.6061 6.11616H0Z" fill="#008767"/>
                                                    </svg>
                                                </p>
                                            </Link>
                                            {/* {item.link && (
                                                <a href={item.link} target="_blank" rel="noopener noreferrer">
                                                    <ArrowRight className="w-6 h-6 text-[#26A17B] mt-1" />
                                                </a>
                                            )} */}
                                        </div>
                                    </div>
                                </div>

                                <div className="h-10 border-l-2 border-gray-200 ml-[-1px]"></div>

                                {/* <p className="py-5 text-[#00000099]">Thurs July 24, 2025</p> */}

                                {/* <div className="relative border-l-2 border-gray-200">
                                    {timelineDatas.map((item, index) => (
                                        <div
                                            key={index}
                                            className={`pl-8 relative ${index !== timelineDatas.length - 1 ? 'mb-8' : ''}`}
                                        >
                                            <div className="absolute -left-6 top-0 w-11 h-11 bg-[#CDE1DD] rounded-full flex items-center justify-center">
                                                <Clock className="w-6 h-6 text-[#008767]" />
                                            </div>
                                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm text-gray-500">{item.date}</p>
                                                    <p className="text-sm break-words text-black font-extrabold">
                                                        <span className="text-[#008767] font-medium">{item.title}</span> {item.description}
                                                    </p>
                                                </div>
                                                {item.link && (
                                                    <a href={item.link} target="_blank" rel="noopener noreferrer">
                                                        <ArrowRight className="w-6 h-6 text-[#26A17B] mt-1" />
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="h-10 border-l-2 border-gray-200 ml-[-1px]"></div> */}
                                
                            </div>
                        </div>

                        <div className="w-full h-[281px] mt-10 lg:mt-2 relative" style={{backgroundImage: "url(/grantDashboard-icons/money.png)", backgroundRepeat: "no-repeat"}}>
                            <div className="w-2/3 absolute right-0 py-5 ">
                                <h1 className="text-[35px] font-extrabold text-[#273142]">Funding Stream</h1>
                                <p className="mt-3  w-[245.5px] text-[16px] font-sans text-[#273142]">
                                    Access Grant, bounties and gigs across Web3 ecosytem that can help
                                    Builders and creators earn, innovate and grow.
                                </p>

                                <Link href={"/"} className="w-[202.1923828125px] h-[50px] flex items-center justify-center mt-5 bg-white rounded text-[16px] font-semibold">
                                    Explore
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}