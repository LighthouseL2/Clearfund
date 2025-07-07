"use client";

import { useState } from "react";
import { FiPlus, FiMinus } from "react-icons/fi";
import Image from "next/image";
import NavHeader from "@/components/navHeader";
import Footer from "@/components/Footer";

const faqs = [
  {
    question: "Who is ClearFund for?",
    answer:
      "ClearFund is built for builders, funders, ecosystem contributors, researchers, and anyone curious about the flow of public goods funding in Web3. Whether you're seeking funding or tracking impact, ClearFund gives you the insights you need.",
  },
  {
    question: "How does ClearFund work?",
    answer:
      "ClearFund aggregates and visualizes funding data from multiple Web3 sources, providing tools to analyze funding trends and ecosystem impact.",
  },
  {
    question: "Can I suggest a new feature or improvement?",
    answer:
      "Absolutely! We are open to community feedback. Use the Suggest Feature option or reach out via our contact page.",
  },
  {
    question: "Is ClearFund open–source?",
    answer:
      "Parts of ClearFund are open source, and we plan to expand community contributions in future updates.",
  },
  {
    question: "What can I do with ClearFund?",
    answer:
      "You can explore past funding data, monitor trends, discover grant opportunities, and stay updated on public goods initiatives.",
  },
  {
    question: "How is ClearFund different from grant platforms?",
    answer:
      "ClearFund doesn’t run grants. Instead, it helps you track and understand the broader funding landscape across many platforms.",
  },
];

export default function FaqSection() {
    const [activeIndex, setActiveIndex] = useState(0);

    const toggleIndex = (index) => {
      setActiveIndex(index === activeIndex ? null : index);
    };

    return (
        <main>
            <NavHeader />
            <header
      className="bg-center bg-fixed bg-no-repeat bg-cover h-[75vh] relative"
      style={{
        backgroundImage: `url('/support-bg.svg')`,
      }}
    >
      {/* hero section  */}
      <div className="h-full w-full flex items-center justify-center md:justify-start px-4 md:px-24">
        <div className="text-white max-w-3xl text-center md:text-left">
          <h1 className="font-extrabold text-5xl sm:text-6xl md:text-6xl mb-4 leading-tight">
            <span className="text-white">Frequently</span> asked <br />
           questions
          </h1>
        </div>
      </div>
    </header>

            <section className="max-w-3xl mx-auto px-4 py-16">
      {faqs.map((item, index) => (
        <div
          key={index}
          className="border rounded-xl mb-4 bg-white overflow-hidden shadow-sm"
        >
          <button
            type="button"
            onClick={() => toggleIndex(index)}
            className="w-full flex items-center justify-between text-left px-6 py-5 focus:outline-none"
          >
            <span
              className={`text-base sm:text-lg transition font-medium ${
                activeIndex === index ? 'font-semibold' : 'font-bold'
              }`}
            >
              {item.question}
            </span>
            <span className="ml-4 text-black">
              {activeIndex === index ? (
                <FiMinus size={20} />
              ) : (
                <FiPlus size={20} />
              )}
            </span>
          </button>

          {activeIndex === index && (
            <div className="px-6 pb-5 text-black text-sm sm:text-base leading-relaxed">
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
