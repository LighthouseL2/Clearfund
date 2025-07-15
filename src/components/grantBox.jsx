
import Image from "next/image";
import Link from "next/link";

const GrantBox = () => {

    const box = [
        {
            image: "/mask.png",
            title: "Celo Support Streams (S0)",
            network: "Celo",
            status: "Active",
            amount: "100K",
            desc: `Celo Support Streams are Celo Protocol Incentives that are
                    distributed once every two weeks to Protocols on Celo
                    through vote in the celoPG Aragon deployment.`,
            coin: "Celo",
            date: "End- Jul 30, 2025"
        },

        {
            image: "/mask.png",
            title: "Good Dollar Builders (2)",
            status: "Active",
            network: "Good Dollar",
            desc: `The GoodBuilders Program is a year-long initiative fueling innovation with G$,
                    offering support, funding, and mentorship to builders.`,
            amount: "250K",
            coin: "USD",
            date: "End- Oct, 2025"
        },

        {
            image: "/mask.png",
            title: "Proof-of-Ship- Season 6",
            status: "Active",
            network: "Celo",
            desc: `Proof-of-Ship is a monthly program for builders to grow their onchain
                    reputation and earn rewards in the Celo ecosystem.`,
            amount: "30K",
            coin: "cUSD",
            date: "End- Jul 31, 2025"
        },
    ]

  return (
    <div className="px-[5%]  py-[5%] relative">
        <header className="py-5 flex items-end justify-between">
            <h1 className="font-semibold font-sans text-[36px] text-black w-[434px]">Funding opportunities for Builders in ReFi</h1>

            <a href="#" className="font-sans hidden text-[18px] text-[#198038] lg:flex items-center gap-1 justify-center">
                View All
                <svg width="6" height="18" viewBox="0 0 6 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.0820312 12.3096L5.87305 6.51855L0.0820312 0.727539V12.3096Z" fill="#198038"/>
                </svg>

            </a>{/* <p className="text-black opacity-50 text-[24px]">Latest funding oppourtunities in ReFi ecosystem</p> */}
        </header>

        <div className="grid lg:grid-cols-3 w-full text-black gap-15 mt-10">
            {box && box.map((boxItem, index) => (
                <div className="w-full border rounded-md lg:h-[400px] bg-black] relative" key={index}>
                    <div className="h-[56px] relative">
                        <Image
                        fill
                        objectFit="cover"
                        src={boxItem.image}
                        alt=""
                        className="object-cover object-top h-auto rounded-t-md"
                        />
                    </div>

                    <div className="mt-5 px-8">
                        <div className="flex justify-between items-center">
                            <h3 className="text-[16px] text-black font-extrabold font-sans">{boxItem.title}</h3>
                            <p className={`font-sans ${boxItem.status === "Active" ? "bg-[#D1F9E5] text-[#009951]" : "bg-[#E6F2FF] text-[#007AFF]"} rounded-full px-3`}>{boxItem.status}</p>
                        </div>

                        <div className="flex justify-between items-end mt-1">
                            <a href="#" className="bg-black text-white border-1 px-2 font-sans font-bold  text-[16px]">{boxItem.network}</a>
                            <p className="text-[12px] text-[#198038] font-sans">{boxItem.date}</p>
                        </div>

                        <p className="mt-5 text-[14px] font-sans">
                            {boxItem.desc}
                        </p>
                        
                        <p className="border bg-[#D8D8D833] mt-10 mb-5 lg:mt-0 lg:mb-0 border-black/20 rounded lg:absolute bottom-[90px] py-1 px-3 w-fit flex gap-1">
                            <span className="font-extrabold text-black font-sans text-[14px]">{boxItem.amount}
                            </span>
                            <span className="font-sans text-[14px] text-black/40">{boxItem.coin}</span>
                        </p>
                    </div>

                    <div className="px-5 py-3  border-t w-full lg:absolute bottom-0 rounded-b-md">
                        <Link href="" className="block font-sans bg-[#198038] rounded-md hover:bg-black w-full py-3 text-center text-white">Apply</Link>
                    </div>
                </div>
            ))}

        </div>

        <div className="mt-10 w-full lg:hidden">
            <a href="#" className="font-sans text-[18px] text-[#198038] flex items-center gap-1 justify-center">
                View All
                <svg width="6" height="18" viewBox="0 0 6 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.0820312 12.3096L5.87305 6.51855L0.0820312 0.727539V12.3096Z" fill="#198038"/>
                </svg>

            </a>
        </div>
    </div>
  )
}

export default GrantBox