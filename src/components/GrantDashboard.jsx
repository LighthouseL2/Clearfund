import { Card, CardContent } from "@/components/ui/card";
import { Clock, ArrowRight, DollarSign, Layers, RefreshCcw, Share2, Archive, CircleDollarSign, Bolt } from "lucide-react";
import Image from "next/image";

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

            value: "6",


            img: "/grant-icons/active-round-icon.svg",
            footer: { text: "Ongoing", icon: "/card-icons/ongoing-round-icon.svg" },
        },


    ];

    const sideCardData = [


        {
            title: "Funding Data",
            value: "11",
            img: "/grant-icons/previous-funding-icon.svg",
            footer: { text: "Archive", icon: "/card-icons/archive-round-icon.svg" },
        },
        {
            title: "Ecosystem",
            value: "5",
            img: "/grant-icons/ecosystem-icon.svg",
            footer: { text: "Funding", icon: "/card-icons/funding-icon.svg" },
        },
        {
            title: "Upcoming Round",
            value: "1",
            img: "/grant-icons/upcoming-round-icon.svg",
            footer: { text: "Next", icon: "/card-icons/upcoming-label-icon.svg" },
        },

    ];




    const timelineData = [
        {
            date: "July 24, 2025",
            title: "Octant epoch 8",
            description: "ended with 787.2165 ETH raised",
            link: ''
        },
        {
            date: "July 24, 2025",
            title: "Growthepie",
            description: "raised 23.875 ETH in octant epoch 8 round",
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

        <div className="px-4 sm:px-6 lg:px-8 py-6 space-y-6">
            {/* Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-gray-800">
                {[...metricData, ...sideCardData].map((item, index) => (
                    <div
                        key={index}
                        className="min-h-[160px] p-5 border rounded-xl shadow-sm bg-white flex flex-col justify-between"
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

                        <div className="text-[24px] font-bold text-black font-sans mt-3">
                            {item.value}
                        </div>

                        {item.footer && (
                            <div className="flex items-center gap-2 text-gray-600 text-sm mt-2">
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
            <div className="text-gray-800 font-sans py-14">
                <div className="bg-white rounded-xl shadow-sm p-6 border-2">
                    <h3 className="text-lg font-semibold mb-12 py-3">Recent Grant recipient</h3>

                    <div className="px-2 sm:px-4">
                        <div className="relative border-l-2 border-gray-200">
                            {timelineData.map((item, index) => (
                                <div
                                    key={index}
                                    className={`pl-8 relative ${index !== timelineData.length - 1 ? 'mb-8' : ''}`}
                                >
                                    <div className="absolute -left-6 top-0 w-11 h-11 bg-[#CDE1DD] rounded-full flex items-center justify-center">
                                        <Clock className="w-6 h-6 text-[#008767]" />
                                    </div>
                                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm text-gray-500">{item.date}</p>
                                            <p className="text-sm break-words  text-black font-extrabold">
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

                        <div className="h-10 border-l-2 border-gray-200 ml-[-1px]"></div>

                        <p className="py-5 text-[#00000099]">Thurs July 24, 2025</p>

                        <div className="relative border-l-2 border-gray-200">
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
                         <div className="h-10 border-l-2 border-gray-200 ml-[-1px]"></div>
                        
                    </div>
                </div>
            </div>
        </div>

    );
}
