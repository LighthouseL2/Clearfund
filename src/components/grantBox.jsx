
import Image from "next/image";
import Link from "next/link";


const GrantBox = () => {

  return (
    <div className="px-[5%]  py-[5rem] relative pb-[7rem] ">
        <header className="py-[3rem] text-center">
            <h1 className="font-extrabold leading-15 mb-5 text-[56px] text-black w-full text-center">
                Uncover What’s Next in <span className="text-[#7CB53E]">Web3 Funding</span>
            </h1>
            {/* <p className="text-[25px] font-medium">View past grant history, active and upcoming funding opportunities all in one place.</p> */}
        </header>

        <div className="grid lg:grid-cols-3 w-full text-black gap-10  mt-10 mx-auto">

            <div  className="xl:w-[24.7rem]  mb-10 bg-[#00995E] rounded-3xl relative
                hover:scale-105 hover:shadow-2xl hover:shadow-black h-[458px]  border-2 border-black transition-all">
                <div className="flex justify-center items-center mt-14">
                    <img src="/grant-box/mask3.png" alt="grant box icon" />
                </div>

                <div className="flex justify-center items-center flex-col py-10 px-10">
                    <h1 className="mb-5 font-extrabold text-[24px]">Grant Opportunities</h1>
                    <p className="text-center text-[16px] font-sans">Discover open grant applications and other funding opportunities across several ecosystem.</p>
                </div>
            </div>


            <div  className="xl:w-[24.7rem]  mb-10 bg-[#058CD7] rounded-3xl relative
                hover:scale-105 hover:shadow-2xl hover:shadow-black h-[458px]  border-2 border-black transition-all">
                <div className="flex justify-center items-center mt-14">
                    <img src="/grant-box/mask2.png" alt="grant box icon" />
                </div>

                <div className="flex justify-center items-center flex-col py-10 px-10">
                    <h1 className="mb-5 font-extrabold text-[24px]">Grantee Directory</h1>
                    <p className="text-center text-[16px] font-sans">
                        Directory of previous funding data and list of all individuals and projects that
                        have received funding.
                    </p>
                </div>
            </div>


            <div  className="xl:w-[24.7rem]  mb-10 bg-[#00995E] rounded-3xl relative
                hover:scale-105 hover:shadow-2xl hover:shadow-black h-[458px]  border-2 border-black transition-all">
                <div className="flex justify-center items-center mt-14">
                    <img src="/grant-box/mask2.png" alt="grant box icon" />
                </div>

                <div className="flex justify-center items-center flex-col py-10 px-10">
                    <h1 className="mb-5 font-extrabold text-[24px]">Retrospective</h1>
                    <p className="text-center text-[16px] font-sans">
                        A summarized report of funding rounds, capturing key highlights, funding
                        patterns, and ecosystem trends.
                    </p>
                </div>
            </div>

        </div>
    </div>
  )
}

export default GrantBox