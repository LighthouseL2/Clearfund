
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
            ans: `ClearFund is an open platform that connects builders, creators, and communities with grants, bounties, paid gigs, and other funding opportunities in Web3.`,
            id: 1
        },

        {
            question: "Who can use ClearFund?",
            ans: `Anyone in the Web3 space builders, creators, communities, or enthusiasts can explore and benefit from opportunities listed on ClearFund.`,
            id: 2
        },

        {
            question: "What kind of opportunities are listed on ClearFund?",
            ans: `You’ll find curated grants, bounties, paid gigs, and other funding programs across multiple Web3 ecosystems.`,
            id: 3
        },

        {
            question: "How does ClearFund help creators and builders?",
            ans: `By providing a single platform where they can discover earning opportunities, apply for funding, and grow their projects.`,
            id: 4
        },

        {
            question: "Does ClearFund provide funding directly?",
            ans: `No, ClearFund does not fund projects directly. Instead, we curate and connect you to verified funding sources and programs.`,
            id: 5
        },

        {
            question: "Can I post opportunities on ClearFund?",
            ans: `Yes, if you are an organization or community running grants, bounties, or gigs, you can share your opportunities on ClearFund.`,
            id: 6
        },
    ]


  return (
    <div className="bg-black px-[5%] pb-[10rem] text-white pt-[7rem] mb-10 lg:mb-0">
        <h1 className="text-[75px] mb-20 font-extrabold">FAQs</h1>
        {questionsData.map((faq, index) => (
            <div key={index} className="py-7 border-t border-b">
                <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full flex justify-between items-center text-left focus:outline-none"
                    >
                    <span className="text-[22px] font-extrabold">{faq.question}</span>
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
                <p className="mt-2 text-white/70 font-sans text-[20px]">{faq.ans}</p>
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