
import { Fragment } from "react";
import Link from "next/link";

const FaqSection = () => {

    

    const questionsData = [
        {
            question: "Who is ClearFund for?",
            ans: `ClearFund is for donors, builders, and community members who want
                funding opportunities and transparency in public goods funding.`
        },

        {
            question: "Why does ClearFund matter?",
            ans: `ClearFund provides clarity and access to Web3 funding by aggregating past
                grants and future opportunities in one transparent hub.`
        },

        {
            question: "What problem does ClearFund solve?",
            ans: `ClearFund solves the challenge of scattered and hard-to-find funding data
                by bringing past grants, live and upcoming funding opportunities into one
                accessible place.`
        },

        {
            question: "Can I submit a platform to be included?",
            ans: `Yes, we welcome community input. The submission form is available,
                reach out via our social or support.`
        },
    ]


  return (
    <div className="grid lg:grid-cols-2 gap-10 bg-black px-[5%] pb-[8rem] text-white pt-[7rem] mb-10 lg:mb-0">
        <div className="w-full md:w-[450px] h-full">
            <h2 className="text-[36px] mb-5 font-bold ">Your questions, answered simply</h2>

            <p className="text-[16px] mb-10 ">Quick answers to few questions.</p>

            <Link href="/faq"
                className="w-[202.19px] hidden lg:flex items-center justify-center font-semibold
                 bg-[#198038] hover:bg-white hover:text-black hover:scale-105 transition-all text-white text-[16px] h-[52px] rounded-md" onClick={() => setOpen(!open)}>
                Learn More
            </Link>
        </div>

        <div className="font-sans">
            {questionsData.map((data, index) => (
                <div className="border-b-2 space-y-2 pb-5 mb-5" key={index}>
                    <h3 className="text-[24px] font-bold font-sans">{data.question}</h3>
                    <p className="text-[16px] font-sans  w-full font-sans">{data.ans}</p>
                </div>
            ))}
        </div>

        <div className="flex lg:hidden justify-center items-center w-full mt-5">
            <Link href="/faq"
                className="w-[202.19px] font-sans flex items-center justify-center font-semibold
                    bg-[#198038] hover:bg-white transition-all hover:scale-105 hover:text-black text-white text-[16px] h-[52px] rounded-md" onClick={() => setOpen(!open)}>
                Learn More
            </Link>
        </div>
    </div>
  )
}

export default FaqSection