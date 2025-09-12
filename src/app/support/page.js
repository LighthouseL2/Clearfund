"use client"

import Image from "next/image";
import NavHeader from "@/components/navHeader";
import HeroSection from "@/components/HeroSection";
import MenuDropdown from "@/components/menuDropdown";
import { useState } from "react";
import Footer from "@/components/Footer";
import Link from "next/link";

const cards = [
  {
    icon: "/support-icons/question.png",
    alt: "Question Icon",
    title: "Got a question?",
    description: "We are here to help. Reach out and we will get back\nto you as soon as possible.",
    buttonText: "Ask Here",
    link: "https://form.typeform.com/to/ujmDipM7"
  },
  {
    icon: "/support-icons/feedback.png",
    alt: "Feedback Icon",
    title: "Give Feedback",
    description: "Tell us what you think, your input helps us\ngrow and improve.",
    buttonText: "Your Feedback",
    link: "https://form.typeform.com/to/qJv3uhi8"
  },
  {
    icon: "/support-icons/bug.png",
    alt: "Bug Icon",
    title: "Flag a bug",
    description: "Notice something broken or off? Let us know so\nwe can fix it quickly.",
    buttonText: "Flag a bug",
    link: "https://form.typeform.com/to/qNFZI89F"
  },
  {
    icon: "/support-icons/feature.png",
    alt: "Feature Icon",
    title: "Suggest a Feature",
    description: "Have an idea that could make ClearFund better?\nWe would love to hear it!",
    buttonText: "Suggest Here",
    link: "https://form.typeform.com/to/d7bfOU8G"
  },
];

export default function SupportSection() {

  const [open, setOpen] = useState(true)
  const [openMenu, setOpenMenu] = useState(false)
  const [blur, setBlur] = useState(false)


  return (
    <section>
      <NavHeader setToggle={setOpen} toggle={open} openMenu={openMenu}
        setOpenMenu={setOpenMenu} setBlur={setBlur}
      />
      <MenuDropdown
        openMenu={openMenu}
        setOpenMenu={setOpenMenu}
        toggle={open}
        setToggle={setOpen}
      />
      <HeroSection />

      <div className="px-4 py-16 bg-gray-50 font-sans">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-10
           -mt-44 z-10 relative">
          {cards.map((card, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-lg  flex flex-col mb-20
              items-center justify-center text-center shadow-sm hover:shadow-md transition
              duration-300 md:h-[531px] h-[450px]"
            >
              <Image
                src={card.icon}
                alt={card.alt}
                width={64}
                height={64}
                className="mb-4"
              />
              <h3 className="text-[32px] font-medium text-[#1C4B2A] mb-2">{card.title}</h3>
              <p className="text-base text-gray-700 mb-6 whitespace-pre-line text-[16px]">{card.description}</p>
              <Link href={card.link} target="_blank" className="rounded-full w-[202.1923828125px] h-[52px] bg-[#39B54A]
                text-white text-sm font-medium hover:bg-green-800 transition flex items-center justify-center">
                {card.buttonText}
              </Link>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </section>
  );
}
