
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
    <div className="grid lg:grid-cols-2 gap-10 bg-black p-[5%] text-white mb-10 lg:mb-0">
        <div className="space-y-10">
            <h2 className="text-5xl">Your questions, answered simply</h2>
            <Fragment>
                <p>Quick answers to common funding questions</p>
                <a href="" className="py-4 px-10 bg-green-500 text-black font-semibold rounded-md">Learn more</a>
            </Fragment>
        </div>

        <div className="">
            {questionsData.map((data, index) => (
                <div className="border-b-2 space-y-2 pb-5 mb-5" key={index}>
                    <h3 className="text-xl">{data.question}</h3>
                    <p>{data.ans}</p>
                </div>
            ))}
        </div>
    </div>
  )
}

export default FaqSection