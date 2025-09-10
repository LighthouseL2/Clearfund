
import { Fragment, useState } from "react";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import FAQAccordion from "@/components/accordion"
import { Minus, Plus } from "lucide-react";

const FaqSection = () => {

    const [openIndex, setOpenIndex] = useState(null);
    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index)};

    const questionsData = [
        {
            question: "Who is ClearFund for?",
            ans: `ClearFund is for donors, builders, and community members who want
                funding opportunities and transparency in public goods funding.`,
            id: 1
        },

        {
            question: "Why does ClearFund matter?",
            ans: `ClearFund provides clarity and access to Web3 funding by
                aggregating past grants and future opportunities in one transparent hub.`,
            id: 2
        },

        {
            question: "What problem does ClearFund solve?",
            ans: `ClearFund solves the challenge of scattered and hard-to-find
                funding data by bringing past grants, open and upcoming funding opportunities
                into one accessible place.`,
            id: 3
        },

        {
            question: "Can I submit a platform to be included?",
            ans: `Yes, we welcome community input. The submission form is available,
                reach out via our social or support.`,
            id: 4
        },

        {
            question: "How do I stay updated on new grant rounds?",
            ans: `Follow us on our socials and always login into clearfund app for new opportunities.`,
            id: 5
        },
    ]


  return (
    <div className="bg-black px-[5%] pb-[8rem] text-white pt-[7rem] mb-10 lg:mb-0">
        <h1 className="text-[75px] mb-20 font-extrabold">FAQs</h1>
        {questionsData.map((faq, index) => (
            <div key={index} className="py-5 border-t border-b">
                <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full flex justify-between items-center text-left focus:outline-none"
                    >
                    <span className="text-[22px] font-sans font-medium">{faq.question}</span>
                    <span
                    className={`relative w-3 h-3 transition-transform duration-300 ease-in-out ${
                        openIndex === index ? "rotate-180" : "rotate-0"
                    }`}
                    >

                    <span className="absolute top-1/2 left-0 w-3 h-0.5 bg-white transform -translate-y-1/2" />

                    <span
                        className={`absolute top-0 left-1/2 h-3 w-0.5 bg-white transform -translate-x-1/2 transition-opacity duration-300 ease-in-out ${
                        openIndex === index ? "opacity-0" : "opacity-100"
                        }`}
                    />
                    </span>

                </button>
            <div
                className={`transition-all duration-500 ease-in-out overflow-hidden ${
                openIndex === index
                    ? "max-h-40 opacity-100 translate-y-0"
                    : "max-h-0 opacity-0 -translate-y-2"
                }`}
            >
                <p className="mt-2 text-white/70 text-[22px]">{faq.ans}</p>
            </div>
            </div>
        ))}
        


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