
import Image from "next/image";
import Link from "next/link";


const GrantBox = () => {

    // const box = [
    //     {
    //         image: "/mask.png",
    //         title: "Celo Support Streams (S0)",
    //         network: "Celo",
    //         status: "Active",
    //         amount: "100K",
    //         desc: `Celo Support Streams are Celo Protocol Incentives that are
    //                 distributed once every two weeks to Protocols on Celo
    //                 through vote in the celoPG Aragon deployment.`,
    //         coin: "Celo",
    //         date: "End- Jul 30, 2025"
    //     },

    //     {
    //         image: "/mask.png",
    //         title: "Good Dollar Builders (2)",
    //         status: "Active",
    //         network: "Good Dollar",
    //         desc: `The GoodBuilders Program is a year-long initiative fueling innovation with G$,
    //                 offering support, funding, and mentorship to builders.`,
    //         amount: "250K",
    //         coin: "USD",
    //         date: "End- Oct, 2025"
    //     },

    //     {
    //         image: "/mask.png",
    //         title: "Proof-of-Ship- Season 6",
    //         status: "Active",
    //         network: "Celo",
    //         desc: `Proof-of-Ship is a monthly program for builders to grow their onchain
    //                 reputation and earn rewards in the Celo ecosystem.`,
    //         amount: "30K",
    //         coin: "cUSD",
    //         date: "End- Jul 31, 2025"
    //     },
    // ]

  return (
    <div className="px-[5%]  py-[5rem] relative pb-[7rem] ">
        <header className="py-[3rem] text-center">
            <h1 className="font-bold font-sans leading-15 mb-5 text-[56px] text-black w-full text-center">
                Uncover What’s Next in <span className="text-[#7CB53E]">Web3 Funding</span>
            </h1>
            <p className="text-[25px] font-medium">View past grants, active rounds, and upcoming opportunities all in one place.</p>
        </header>

        <div className="grid lg:grid-cols-3 w-full text-black  mt-10">
            {/* {box && box.map((boxItem, index) => (
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
            ))} */}

            <Link href={"/dashboard"} className="xl:w-[24.51rem] mb-10 bg-[#00995E] rounded-3xl relative">
                <div className="absolute py-10 px-10">
                    <h1 className="flex items-center gap-2 text-[24px] font-bold font-sans">Active Grant <span>
                        <svg width="18" height="15" viewBox="0 0 18 15" fill="none" xmlns="http://www.w3.org/2000/svg"
                            className="hover:translate-x-5 hover:-translate-y-1 transition-all"
                            >
                            <path d="M16.0247 7.60352L9.82162 13.8066M16.0247 7.60352L9.82162 1.40039M16.0247 7.60352H1.55078" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>

                    </span></h1>
                    <p className="text-[16px] font-medium mt-3">
                        Discover live ReFi and public goods funding rounds happening across the ecosystem.
                    </p>
                </div>
                <img src="/mask1.png" alt="mask image"/>
            </Link>

            <Link href={"/dashboard"} className="xl:w-[24.51rem] bg-[#058CD7] mb-10 rounded-3xl relative">
                <div className="absolute py-10 px-10">
                    <h1 className="flex items-center gap-2 text-[24px] font-bold font-sans">Previous Funding <span>
                        <svg width="18" height="15" viewBox="0 0 18 15" fill="none" xmlns="http://www.w3.org/2000/svg"
                            className="hover:translate-x-5 hover:-translate-y-1 transition-all">
                            <path d="M16.0247 7.60352L9.82162 13.8066M16.0247 7.60352L9.82162 1.40039M16.0247 7.60352H1.55078" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>

                    </span></h1>
                    <p className="text-[16px] font-medium mt-3">
                        See who’s been funded, how much they raised, and where it came from and when?
                    </p>
                </div>
                <img src="/mask3.png" alt="mask image"/>
            </Link>


            <Link href={"/dashboard"} className="xl:w-[24.51rem] w-full bg-[#00995E] mb-10 rounded-3xl relative">
                <div className="absolute py-10 px-10">
                    <h1 className="flex items-center gap-2 text-[24px] font-extrabold font-sans">Upcoming grant <span>
                        <svg width="18" height="15" viewBox="0 0 18 15" fill="none" xmlns="http://www.w3.org/2000/svg"
                            className="hover:translate-x-5 hover:-translate-y-1 transition-all">
                            <path d="M16.0247 7.60352L9.82162 13.8066M16.0247 7.60352L9.82162 1.40039M16.0247 7.60352H1.55078" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>

                    </span></h1>
                    <p className="text-[16px] font-medium mt-3">
                        View a list of upcoming Web3 grants and funding opportunities.
                    </p>
                </div>
                <img src="/mask4.png" alt="mask image"/>
            </Link>
        </div>

        {/* <div className="mt-10 w-full lg:hidden">
            <a href="#" className="font-sans text-[18px] text-[#198038] flex items-center gap-1 justify-center">
                View All
                <svg width="6" height="18" viewBox="0 0 6 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.0820312 12.3096L5.87305 6.51855L0.0820312 0.727539V12.3096Z" fill="#198038"/>
                </svg>

            </a>
        </div> */}
    </div>
  )
}

export default GrantBox