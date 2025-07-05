
import { Fragment } from "react";

const FaqSection = () => {

    const questionsData = [
        {
            question: "What is grant round explorer?",
            ans: `Explorer shows ongoing and upcoming grant rounds tailored to public goods, ReFi and Web3 innovation.`
        },

        {
            question: "How do I check project funding",
            ans: `Login into the app and view the project's funding history, including who supported it and when. Stay informed and transparent`
        },

        {
            question: "What are grant alerts?",
            ans: `Get notified when new grants open so you never miss a chance to apply or support a project`
        },

        {
            question: "How does application help work?",
            ans: `We walk you through each step of applying, making it easy to apply and submit application`
        },
    ]


  return (
    <div className="grid lg:grid-cols-2 gap-10 bg-black p-[5%] text-white pb-10 mb-10 lg:mb-0">
        <div className="w-full md:w-[425px] h-full">
            <h2 className="text-[36px] mb-10">Your questions, answered simply</h2>
            
            <p className="text-[16px] mb-17">Quick answers to common funding questions</p>
            <a href="" className="py-4 px-10 bg-[#198038] mt-10 text-white text-[16px] font-semibold rounded-md">Learn more</a>
            
        </div>

        <div className="">
            {questionsData.map((data, index) => (
                <div className="border-b-2 space-y-2 pb-5 mb-5" key={index}>
                    <h3 className="text-[24px]">{data.question}</h3>
                    <p className="text-[16px]">{data.ans}</p>
                </div>
            ))}
        </div>
    </div>
  )
}

export default FaqSection