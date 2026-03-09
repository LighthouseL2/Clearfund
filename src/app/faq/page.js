"use client";

import { useState } from "react";
import { FiPlus, FiMinus } from "react-icons/fi";
import Image from "next/image";
import NavHeader from "@/components/navHeader";
import MenuDropdown from "@/components/menuDropdown";
import Footer from "@/components/Footer";

const faqs = [
  {
    question: "How often are opportunities updated on ClearFund?",
    answer:
      "We update regularly to ensure creators and builders have access to the latest funding programs, grants, and gigs in Web3.",
  },
  {
    question: "What ecosystems does ClearFund cover?",
    answer:
      "ClearFund covers multiple Web3 ecosystems, including DeFi, DAOs, ReFi, NFTs, and blockchain networks like Celo, Ethereum, Polygon, and more.",
  },
  {
    question: "Can I suggest a new feature or improvement?",
    answer:
      "Yes! We welcome suggestions. If you have ideas to make ClearFund better, please contact us and share your feedback.",
  },
  {
    question: "What is the role of GoodCollective on ClearFund?",
    answer:
      "GoodCollective is a public good initiative of Gooddollar that provides direct digital payments to people who need it most.",
  },
  {
    question: "Can I use ClearFund data for research or reporting?",
    answer:
      "Absolutely. Our platform is open for researchers, analysts, and storytellers.",
  },
  {
    question: "How does ClearFund ensure transparency in Web3 funding?",
    answer:
      "We curate past and ongoing opportunities in one place, making it easier to track programs, recipients, and overall funding activity.",
  },
  {
    question: "Does ClearFund include non-Web3 or traditional funding?",
    answer:
      "No, we focus specifically on Web3 public goods funding ecosystems.",
  },
];

export default function FaqSection() {
  const [activeIndex, setActiveIndex] = useState(0);


  const toggleIndex = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <main className="bg-[#FAFAFA]">
      <NavHeader />

      <header
        className="bg-center bg-fixed bg-no-repeat bg-cover h-[75vh] relative"
        style={{
          backgroundImage: `url('/support-bg.svg')`,
        }}
      >
        <div className="absolute inset-0 bg-[#000000E5] bg-opacity-60 z-0"></div>

        {/* Hero section content */}
        <div className="h-full w-full flex items-center justify-center px-4 md:px-24 relative z-10">
          <div className="text-white text-center ">
            <h1 className="font-extrabold text-[75px] mb-4 leading-tight text-center">
              FAQS
            </h1>
          </div>
        </div>
      </header>

      <section className="max-w-3xl mx-auto px-4 py-48">
        {faqs.map((item, index) => (
          <div
            key={index}
            className="border rounded-sm mb-4 bg-white overflow-hidden shadow-sm"
          >
            <button
              type="button"
              onClick={() => toggleIndex(index)}
              className="w-full flex items-center justify-between text-left px-6 py-5 focus:outline-none"
            >
              <span
                className={`text-base sm:text-[22px] transition font-medium ${activeIndex === index ? 'font-semibold' : 'font-bold'
                  }`}
              >
                {item.question}
              </span>
              <span className="ml-4">
                {activeIndex === index ? (
                  <FiMinus size={20} className="text-black/60" />
                ) : (
                  <FiPlus size={20} className="text-black/60" />
                )}
              </span>
            </button>

            {activeIndex === index && (
              <div className="px-6 pb-12 text-black text-[15px] sm:text-base leading-relaxed">
                {item.answer}
              </div>
            )}
          </div>
        ))}
      </section>

      <Footer />
    </main>

  );
}
