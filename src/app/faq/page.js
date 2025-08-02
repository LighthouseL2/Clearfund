"use client";

import { useState } from "react";
import { FiPlus, FiMinus } from "react-icons/fi";
import Image from "next/image";
import NavHeader from "@/components/navHeader";
import MenuDropdown from "@/components/menuDropdown";
import Footer from "@/components/Footer";

const faqs = [
  {
    question: "How often is the data updated?",
    answer:
      "We update regularly to reflect new grants, active rounds, and funding outcomes.",
  },
  {
    question: "Can I filter grants by platform or round?",
    answer:
      "Yes, you can explore grants by platform, round, category, and timeline.",
  },
  {
    question: "Can I suggest a new feature or improvement?",
    answer:
      "Yes! We welcome suggestions. If you have ideas to make ClearFund better, please contact us and share your feedback.",
  },
  {
    question: "Is ClearFund part of any grant platform?",
    answer:
      "No, we are an independent archive and transparency tool. We aggregate data across platforms.",
  },
  {
    question: "Can I use ClearFund data for research or reporting?",
    answer:
      "Absolutely. Our platform is open for researchers, analysts, and storytellers.",
  },
  {
    question: "How do I stay updated on new grant rounds?",
    answer:
      "Follow us on social media or subscribe to our updates for alerts on new opportunities.",
  },
  {
    question: "Does ClearFund include non-Web3 or traditional funding?",
    answer:
      "No, we focus specifically on Web3 public goods funding ecosystems.",
  },
];

export default function FaqSection() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [open, setOpen] = useState(true)
    const [openMenu, setOpenMenu] = useState(false)
    const [blur, setBlur] = useState(false)

    const toggleIndex = (index) => {
      setActiveIndex(index === activeIndex ? null : index);
    };

    return (
        <main className="bg-[#FAFAFA]">
          <NavHeader setToggle={setOpen} toggle={open} openMenu={openMenu}
            setOpenMenu={setOpenMenu} setBlur={setBlur}
        />
        <MenuDropdown
            openMenu={openMenu}
            setOpenMenu={setOpenMenu}
            toggle={open}
            setToggle={setOpen}
        />
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
      <h1 className="font-extrabold text-5xl sm:text-6xl md:text-6xl mb-4 leading-tight text-center">
        <span className="text-white font-extrabold">Frequently</span> asked
        questions
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
            <div className="px-6 pb-12 text-black text-sm sm:text-base leading-relaxed">
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
