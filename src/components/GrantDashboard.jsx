import { Card, CardContent } from "@/components/ui/card";
import { Clock, ArrowRight, DollarSign, Layers, RefreshCcw, Share2, Archive, CircleDollarSign, Bolt } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ConnectButton } from "@rainbow-me/rainbowkit";


export default function GrantDashboard() {

    const metricData = [

        {
            title: "Total Amount",
            value: "$7,508,841",
            img: "/grant-icons/active-round-icon.svg",
            footer: { text: " Active Funding", icon: "/card-icons/funding-icon.svg" },
        },

        {
            title: "Opportunities",
            value: "10",
            img: "/grant-icons/ecosystem-icon.svg",
            footer: { text: "Open Applications", icon: "/card-icons/ongoing-round-icon.svg" },
        },

        {
            title: "Upcoming Round",
            value: "2",
            img: "/grant-icons/upcoming-round-icon.svg",
            footer: { text: "Next", icon: "/card-icons/upcoming-label-icon.svg" },
        },



    ];

    const sideCardData = [
        {
            title: "Past Funding",
            value: "12",
            img: "/grant-icons/previous-funding-icon.svg",
            footer: { text: "Archive", icon: "/card-icons/archive-round-icon.svg" },
        },

        {
            title: "Total Project",
            value: "5,853",
            img: "/grant-icons/total-project-icon.svg",
            footer: { text: "Funded", icon: "/card-icons/funded-icon.svg" },
        },

        {
            title: "Cumulative",
            value: "$20,649,987",
            img: "/grant-icons/cumulative-raise-icon.svg",
            footer: { text: "Payout", icon: "/card-icons/Vector.png" },
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

        <div className="font-sans">
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
                            className="min-h-[160px] py-6 px-5 rounded-xl border-2 border-[#0000004D]/30 shadow-sm bg-white flex flex-col justify-between "
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
                            <div className="text-xl font-extrabold text-black font-sans   mb-4 py-4 ">
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
                <div className="w-full flex flex-wrap gap-5 font-sans py-10">

                    <div className="lg:w-[43%] w-full border rounded-2xl p-6 flex flex-col justify-between text-center lg:h-[90vh]">
                        <div>
                            <div className="w-full flex justify-center items-center py-2 mt-3 font-">
                                <img src="/grantDashboard-icons/good.png" alt="" />
                            </div>

                            <h1 className="text-center text-[24px] font-sans text-[#00AFFF] leading-7  font-black mt-5">
                                Empower Communities. <br />Maximize Impact
                            </h1>
                            <div className="flex justify-center mt-6">
                                <img
                                    src="/grantDashboard-icons/flower.png"
                                    alt="Good Collective"
                                    className="w-[220px] h-[200px]"
                                />
                            </div>
                            <p className="mb-10 py-4 text-[#00000080]/70 leading-3.5 mx-auto text-[14px] font-bold">
                                GoodCollective is committed to empowering individuals and communities
                                by providing direct digital payments to those who need it most.
                            </p>
                            <div className="">
                                <Link href={"/"} >
                                    <button className="mb-8 text-[#3A7768]  py-2 px-12 font-black items-center justify-center rounded-full bg-[#95EED8]  text-[16px] font-sans">
                                        Donate Now
                                    </button>
                                </Link>
                                <p className="text-xs text-gray-500 underline mt-2 mb-5">
                                    Powered by <a href="#" className="">GoodDollar</a>
                                </p>
                            </div>
                        </div>

                    </div>

                    {/* Right Column */}
                    <div className="lg:w-[54%] w-full flex flex-col gap-5 font-sans">
                        <div className="border rounded-2xl p-6 flex flex-col lg:h-[48vh]">
                            <h3 className="text-lg font-semibold py-1 mb-2">Recent Grant recipient</h3>
                            <div className="px-2 sm:px-4">
                                <div className="pl-8 relative mb-6">
                                    {/* Round Icon */}
                                    <div className="absolute -left-6 top-0 w-11 h-11 bg-[#CDE1DD] rounded-full flex items-center justify-center">
                                        <Clock className="w-6 h-6 text-[#008767]" />
                                    </div>
                                    <span className="text-[16px] font-medium text-[#999999]">July 24, 2025</span>
                                    {/* Content */}
                                    <div className="flex flex-col w-5/6 mt-1">
                                        <Link href={"/"} className="relative">
                                            <p className="text-[14px]">
                                                <span className="text-[#008767]">Growthepie </span>
                                                raised 23.875 ETH in octant epoch 8
                                            </p>


                                        </Link>
                                    </div>
                                </div>

                                <div className="relative border-l-2 border-gray-200">

                                    <div className="pl-8 relative mb-6">
                                        <div className="absolute -left-6 top-0 w-11 h-11 bg-[#CDE1DD] rounded-full flex items-center justify-center">
                                            <Clock className="w-6 h-6 text-[#008767]" />
                                        </div>
                                        <span className="text-[16px] font-medium text-[#999999]">July 24, 2025</span>
                                        <div className="flex flex-col w-5/6 mt-1">


                                            <p className="text-[14px]">
                                                <span className="text-[#008767]">Growthepie </span>
                                                raised 23.875 ETH in octant epoch 8
                                            </p>

                                            <Link href={"/"}>
                                                <div className="mt-1 flex items-center gap-2">
                                                    <span className="text-[14px] font-medium">round</span>
                                                    <svg
                                                        width="14"
                                                        height="14"
                                                        viewBox="0 0 14 14"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            d="M0 6.11616V7.88384H10.6061L5.74495 12.7449L7 14L14 7L7 0L5.74495 1.25505L10.6061 6.11616H0Z"
                                                            fill="#008767"
                                                        />
                                                    </svg>
                                                </div>
                                            </Link>

                                        </div>
                                    </div>


                                    <div className="pl-8 relative mb-6">
                                        <div className="absolute -left-6 top-0 w-11 h-11 bg-[#CDE1DD] rounded-full flex items-center justify-center">
                                            <Clock className="w-6 h-6 text-[#008767]" />
                                        </div>
                                        <span className="text-[16px] font-medium text-[#999999]">July 24, 2025</span>
                                        <div className="flex flex-col w-5/6 mt-1">


                                            <p className="text-[14px]">
                                                <span className="text-[#008767]">Dappnode</span>
                                                raised 22.868 ETH in octant epoch 8
                                            </p>
                                            <Link href={"/"}>
                                                <div className="mt-1 flex items-center gap-2">
                                                    <span className="text-[14px] font-medium">round</span>
                                                    <svg
                                                        width="14"
                                                        height="14"
                                                        viewBox="0 0 14 14"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            d="M0 6.11616V7.88384H10.6061L5.74495 12.7449L7 14L14 7L7 0L5.74495 1.25505L10.6061 6.11616H0Z"
                                                            fill="#008767"
                                                        />
                                                    </svg>
                                                </div>
                                            </Link>

                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div
                            className="border rounded-2xl p-6 flex flex-col justify-between relative w-full lg:min-h-[39vh]"
                            style={{
                                backgroundImage: "url('/grantDashboard-icons/funding-stream-image.svg')",
                                backgroundRepeat: "no-repeat",
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                            }}
                        >
                            <div className="w-full sm:w-[80%] lg:w-[70%] pl-2 sm:pl-4 lg:pl-5">
                                <h2 className="text-[22px] sm:text-[28px] lg:text-[35px] font-black text-[#273142] font-inter leading-snug sm:leading-tight">
                                    Funding Stream
                                </h2>
                                <p className="text-[14px] sm:text-[15px] lg:text-[16px] text-[#273142] mt-3 sm:mt-4 leading-relaxed sm:leading-normal lg:leading-7">
                                    Access Grant, bounties and gigs across Web3 ecosystem helping Builders to
                                    earn, innovate and grow.
                                </p>
                                <Link
                                    href="/funding-stream"
                                    className="inline-flex items-center justify-center bg-[#FFFFFF] rounded-[50px] mt-6 sm:mt-8 px-8 sm:px-10 lg:px-12 py-2 text-sm sm:text-[15px] lg:text-[16px] font-medium hover:bg-gray-100"
                                >
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