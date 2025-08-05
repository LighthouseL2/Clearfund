
import { Fragment } from "react";
import Link from "next/link";

const FaqSection = () => {

    

    const questionsData = [
        {
            question: "Who is ClearFund for?",
            ans: `It’s for grant seekers, funders, researchers, DAO contributors, and data analysts.`
        },

        {
            question: "Why does ClearFund matter?",
            ans: `It helps you understand where funding goes, who receives it, and what impact it creates.`
        },

        {
            question: "What problem does ClearFund solve?",
            ans: `Public goods funding in Web3 is spread across many platforms,
            making it hard to track where funds go and who receives them.
            ClearFund solves this by bringing all that data into one place making
            funding information easy to access, understand, and use.`
        },

        {
            question: "Can I submit a platform to be included?",
            ans: `Yes, we welcome community input. The submission form is available,
            reach out via our social or support.`
        },
    ]


  return (
    <div className="grid lg:grid-cols-2 gap-10 bg-black px-[5%] pb-[7rem] text-white pt-[7rem] mb-10 lg:mb-0">
        <div className="w-full md:w-[424px] h-full">
            <h2 className="text-[36px] mb-5 font-extrabold font-sans">Your questions, answered simply</h2>

            <p className="text-[16px] mb-10 font-sans">Quick answers to few questions.</p>

            <Link href="/faq"
                className="w-[202.19px] font-sans hidden lg:flex items-center justify-center font-semibold
                 bg-[#198038] hover:bg-white hover:text-black hover:scale-105 transition-all text-white text-[16px] h-[52px] rounded-md" onClick={() => setOpen(!open)}>
                Learn More
            </Link>
        </div>

        <div className="">
            {questionsData.map((data, index) => (
                <div className="border-b-2 space-y-2 pb-5 mb-5" key={index}>
                    <h3 className="text-[24px] font-sans font-bold">{data.question}</h3>
                    <p className="text-[16px] font-sans w-[95%]">{data.ans}</p>
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