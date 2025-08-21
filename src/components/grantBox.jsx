
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

        <div className="grid lg:grid-cols-3 w-full text-black gap-10  mt-10 mx-auto ">

            <div  className="xl:w-[24.54rem]  mb-10 bg-[#00995E] rounded-3xl relative
                hover:scale-105 hover:shadow-2xl hover:shadow-black group border-2 border-black transition-all">
                <div className="absolute py-6 px-8">
                    <h1 className="flex items-center w-full justify-between gap-2 text-[24px] font-extrabold font-sans">
                        Grant Opportunities <span>
                        <svg width="18" height="15" viewBox="0 0 18 15" fill="none" xmlns="http://www.w3.org/2000/svg"
                            className="transform rotate-90 transition-all group-hover:block hidden
                                group-hover:animate-up-down"
                            >
                            <path d="M16.0247 7.60352L9.82162 13.8066M16.0247 7.60352L9.82162 1.40039M16.0247 7.60352H1.55078" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>

                    </span></h1>
                    <p className="text-[16px] font-medium mt-5">
                        Discover open grant applications other and funding opportunities across the ecosystem.
                    </p>
                </div>
                <img src="/mask1.png" alt="mask image"/>
            </div>

            <div  className="xl:w-[24.54rem] bg-[#058CD7] mb-10 rounded-3xl relative
                hover:scale-105 hover:shadow-2xl hover:shadow-black group border-2 border-black transition-all">
                <div className="absolute py-6 px-8">
                    <h1 className="flex items-center justify-between gap-2 text-[24px] font-extrabold font-sans">Grant History <span>
                        <svg width="18" height="15" viewBox="0 0 18 15" fill="none" xmlns="http://www.w3.org/2000/svg"
                            className="transform rotate-90 transition-all hidden
                                group-hover:animate-up-down group-hover:block">
                            <path d="M16.0247 7.60352L9.82162 13.8066M16.0247 7.60352L9.82162 1.40039M16.0247 7.60352H1.55078" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>

                    </span></h1>
                    <p className="text-[16px] font-medium mt-5 text-black">
                        See who’s been funded, how much they raised, and where it came from and when?
                    </p>
                </div>
                <img src="/mask3.png" alt="mask image"/>
            </div>


            <div className="xl:w-[24.54rem] w-full bg-[#00995E] mb-10 rounded-3xl relative
                hover:scale-105 hover:shadow-2xl hover:shadow-black group border-2 border-black transition-all">
                <div className="absolute py-6 px-8 ">
                    <h1 className="flex items-center gap-2 justify-between text-[24px] font-extrabold font-sans">Visualization <span>
                        <svg width="18" height="15" viewBox="0 0 18 15" fill="none" xmlns="http://www.w3.org/2000/svg"
                            className="transition-all transform rotate-90 hidden
                                group-hover:animate-up-down group-hover:block">
                            <path d="M16.0247 7.60352L9.82162 13.8066M16.0247 7.60352L9.82162 1.40039M16.0247 7.60352H1.55078" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>

                    </span></h1>
                    <p className="text-[16px] font-medium mt-5">
                        View interactive charts and visuals that simplify funding insights
                    </p>
                </div>
                <img src="/mask4.png" alt="mask image"/>
            </div>
        </div>
    </div>
  )
}

export default GrantBox