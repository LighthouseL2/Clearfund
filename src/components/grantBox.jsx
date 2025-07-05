
import Image from "next/image";
import { CornerDownRight, ChevronRight } from "lucide-react";

const GrantBox = () => {

    const box = [
        {
            image: "/logo.jpg",
            title: "Epoch 8 cohort",
            network: "Octant",
            status: "Upcoming",
            amount: "$400K",
            desc: `Octant is funding teams advancing Ethereum's roadmap in direct protocol improvements
                    shared infracstructure, Open Dashboards, datasets, or studies and protocol level
                    research and specification work`,
            coin: "USDC"
        },

        {
            image: "/disc2.jpg",
            title: "Public Goods Accelerator",
            status: "Active",
            network: "ReFi DAO",
            desc: `Refi DAO is Supporting digital public goods and open-source projects that
                benefit the btoader web3 and ReFi ecosystem`,
            amount: "$600K",
            coin: "Celo"
        },

        {
            image: "/disc3.jpg",
            title: "ReFi Infrastructure Build",
            status: "Active",
            network: "Gitcoin",
            desc: `Gitcoin is funding projects building the foundational tools and protocols
                needed for regenerative finance to scale`,
            amount: "$750K",
            coin: "USDC"
        },
    ]

  return (
    <div className="px-[5%]  py-[5%]">
        <header className="py-5 space-y-3">
            <h1 className="font-semibold text-[36px] text-black">Recent Grant Rounds</h1>
            <p className="text-black opacity-50 text-[24px]">Latest funding oppourtunities in ReFi ecosystem</p>
        </header>

        <div className="grid lg:grid-cols-3 w-full text-black gap-15 mt-10">
            {box && box.map((boxItem, index) => (
                <div className="w-full border rounded-md lg:h-[400px]" key={index}>
                    <div className="h-[56px] relative">
                        <Image
                        fill
                        objectFit="cover"
                        src={boxItem.image}
                        alt=""
                        className="object-cover object-top h-auto rounded-t-md"
                        />
                    </div>

                    <div className="mt-10 px-8">
                        <div className="flex justify-between items-center">
                            <h3 className="text-[18px]">{boxItem.title}</h3>
                            <p className={`${boxItem.status === "Active" ? "bg-[#D1F9E5] text-[#009951]" : "bg-[#E6F2FF] text-[#007AFF]"} rounded-full px-3`}>{boxItem.status}</p>
                        </div>

                        <div className="flex justify-between items-center mt-3">
                            <a href="#" className="text-red-500 border-1 px-2 rounded-md text-[16px]">{boxItem.network}</a>
                            <p className="text-[12px]">11-07-2025</p>
                        </div>

                        <p className="mt-5 text-[14px]">
                            {boxItem.desc.slice(0, 150) + "..."}
                        </p>
                        <p className="border py-1 px-3 w-fit mt-10 flex gap-4 text-[#7F7F7F]"><span className="font-bold text-black">{boxItem.amount}</span> {boxItem.coin}</p>
                    </div>

                    <div className="py-5 border-t mt-3 rounded-b-md gap-5 flex px-[10%] text-[#00CD5D] items-center">
                        <CornerDownRight/> <a href="#" className="text-[16px] font-semibold">Learn more</a>
                    </div>
                </div>
            ))}

        </div>

        <div className="flex items-center justify-center py-10 mt-14">
            <a href="" className="text-xl text-[#00CD5D] text-[18px] font-semibold flex items-center gap-3">View All <ChevronRight /></a> 
        </div>
    </div>
  )
}

export default GrantBox