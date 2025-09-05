
import Image from "next/image";
import Link from "next/link";


const GrantBox = () => {

  return (
    <div className="px-[5%]  py-[5rem] relative pb-[7rem] ">
        <header className="py-[3rem] text-center">
            <h1 className="font-extrabold sm:leading-16 mb-5 text-4xl sm:text-[64px] text-black w-full text-center">
                Uncover What’s Next in Web3 <br className="hidden xl:block"/><span className="text-[#7CB53E]">Funding</span>
            </h1>
            {/* <p className="text-[25px] font-medium">View past grant history, active and upcoming funding opportunities all in one place.</p> */}
        </header>

        {/* <div className="grid lg:grid-cols-3 w-full text-black gap-10  mt-10 mx-auto">

            <div  className="xl:w-[24.7rem]  mb-10 bg-[#00995E] rounded-3xl relative
                hover:scale-105 hover:shadow-2xl hover:shadow-black h-[458px]  border-2 border-black transition-all">
                <div className="flex justify-center items-center mt-14">
                    <img src="/grant-box/mask3.png" alt="grant box icon" />
                </div>

                <div className="flex justify-center items-center flex-col py-10 px-10">
                    <h1 className="mb-5 font-extrabold text-[24px]">Grant Opportunities</h1>
                    <p className="text-center text-[16px] font-sans font-bold">Discover open grant applications and other funding opportunities across several ecosystem.</p>
                </div>
            </div>


            <div  className="xl:w-[24.7rem]  mb-10 bg-[#058CD7] rounded-3xl relative
                hover:scale-105 hover:shadow-2xl hover:shadow-black h-[458px]  border-2 border-black transition-all">
                <div className="flex justify-center items-center mt-14">
                    <img src="/grant-box/mask2.png" alt="grant box icon" />
                </div>

                <div className="flex justify-center items-center flex-col py-10 px-10">
                    <h1 className="mb-5 font-extrabold text-[24px]">Grantee Directory</h1>
                    <p className="text-center text-[16px] font-sans font-bold">
                        Directory of previous funding data and list of all individuals and projects that
                        have received funding.
                    </p>
                </div>
            </div>


            <div  className="xl:w-[24.7rem]  mb-10 bg-[#00995E] rounded-3xl relative
                hover:scale-105 hover:shadow-2xl hover:shadow-black h-[458px]  border-2 border-black transition-all">
                <div className="flex justify-center items-center mt-14">
                    <img src="/grant-box/mak1.png" alt="grant box icon" />
                </div>

                <div className="flex justify-center items-center flex-col py-10 px-10">
                    <h1 className="mb-5 font-extrabold text-[24px]">Retrospective</h1>
                    <p className="text-center text-[16px] font-sans font-bold">
                        A summarized report of funding rounds, capturing key highlights, funding
                        patterns, and ecosystem trends.
                    </p>
                </div>
            </div>

        </div> */}

        <div className="xl:w-[57rem] mx-auto flex flex-col lg:gap-20">
            <div className="flex justify-between w-full flex-wrap space-y-20 lg:space-y-0">
                <div className="md:w-[215px]">
                    <img src="/uncover-icons/img1.png" alt="Opportunities icon" className="w-[70px] h-[70px]"/>
                    <h1 className="font-extrabold text-[24px] mt-4">Opportunities</h1>
                    <p className="text-[15px] mt-5">
                        Discover open grant applications and other funding opportunities across several ecosystem.
                    </p>
                </div>
                <div className="md:w-[231px] ">
                    <img src="/uncover-icons/img2.png" alt="" className="w-[70px] h-[70px]"/>
                    <h1 className="font-extrabold text-[24px] mt-4">Open Directory</h1>
                    <p className="text-[15px] mt-5">
                        Directory of previous funding data and projects that have received funding,
                        insights into funding flows.
                    </p>
                </div>
                <div className="md:w-[201px] ">
                    <img src="/uncover-icons/img3.png" alt="" className="w-[70px] h-[70px]"/>
                    <h1 className="font-bold text-[24px] mt-4">Analytics</h1>
                    <p className="text-[15px] mt-5">
                        Dashboard of past funding rounds showcasing key highlights, funding patterns, and data perspectives.
                    </p>
                </div>
            </div>
            
            <div className="flex flex-wrap xl:gap-28 lg:gap-40 md:gap-25 w-full ">
                <div className="md:w-[240px] ">
                    <img src="/uncover-icons/img4.png" alt="" className="w-[70px] h-[70px]"/>
                    <h1 className="font-bold text-[24px] mt-4">Add Grant</h1>
                    <p className="text-[15px] mt-5">
                        Add grant, bounties and paid gigs on ClearFund help builders and creators access the support they need.
                    </p>
                </div>

                <div className="md:w-[243px]">
                    <div className="w-[70px] h-[70px] flex items-center justify-center bg-[#FF3B3030] rounded-2xl">
                        <img src="/uncover-icons/money.png" alt="" className=""/>
                    </div>
                    <h1 className="font-bold text-[24px] mt-4">GoodCollective</h1>
                    <p className="text-[15px] mt-5">
                        Support GoodCollective on ClearFund, your donation delivers direct digital payments to those who need it most.
                    </p>
                </div>
            </div>

            


        </div>
    </div>
  )
}

export default GrantBox