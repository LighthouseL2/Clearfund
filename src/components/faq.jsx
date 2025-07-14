
import { Fragment } from "react";
import Link from "next/link";

const FaqSection = () => {

    const questionsData = [
        {
            question: "What is grant round explorer?",
            ans: `Explorer shows ongoing and upcoming grant rounds tailored to public goods,
                ReFi, and Web3 innovation.`
        },

        {
            question: "How do I check project funding",
            ans: `Login into the app and view project’s funding history, including who supported
                it and when. Stay informed and transparent.`
        },

        {
            question: "What are grant alerts?",
            ans: `Get notified when new grants open so you never miss a chance to apply or support a project.`
        },

        {
            question: "How can I use ClearFund to discover ReFi projects?",
            ans: `ClearFund features a curated directory of (ReFi) projects from across
                the Web3 ecosystem. You can browse by category and funding history.`
        },
    ]


  return (
    <div className="grid lg:grid-cols-2 gap-10 bg-black px-[5%] pb-[7%] text-white pt-[7%] mb-10 lg:mb-0">
        <div className="w-full md:w-[424px] h-full">
            <h2 className="text-[36px] mb-5 font-sans">Your questions, answered simply</h2>
            
            <p className="text-[16px] mb-10 font-sans">Quick answers to common funding questions</p>
        
            <Link href="/?route=login"
                className="w-[202.19px] font-sans flex items-center justify-center font-semibold
                 bg-[#198038] text-white text-[16px] h-[52px] rounded-md" onClick={() => setOpen(!open)}>
                Learn More
            </Link>
        </div>

        <div className="">
            {questionsData.map((data, index) => (
                <div className="border-b-2 space-y-2 pb-5 mb-5" key={index}>
                    <h3 className="text-[24px] font-sans">{data.question}</h3>
                    <p className="text-[16px] font-sans">{data.ans}</p>
                </div>
            ))}
        </div>
    </div>
  )
}

export default FaqSection