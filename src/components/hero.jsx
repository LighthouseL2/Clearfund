"use client"


import Link from 'next/link'
import { useEffect, useState } from 'react';




const HeroSection = ({ setModalOpen }) => {
  const content = [
    {
      heading: "Your Gateway to Web3 Funding and Opportunities.",
      subtext: "ClearFund connects builders to vital funding resources to drive continuous innovation and scalable growth.",
      btnText: "Explore",
      btnLink: "/grants"
    },
    {
      heading: "Support GoodCollective \n And Empower Communities.",
      subtext: "Tip tokens today to directly fund essential initiatives and create lasting\nsocial change.",
      btnText: "Tip Now",
      btnLink: "/donate"
    }
  ]
  const [currentIndex, setCurrentIndex] = useState(0)
  const [text, setText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  const currentContent = content[currentIndex]

  useEffect(() => {
    let timeout;
    const currentHeading = currentContent.heading

    if (isDeleting) {
      timeout = setTimeout(() => {
        setText(currentHeading.substring(0, text.length - 1))
        if (text.length === 0) {
          setIsDeleting(false)
          setCurrentIndex((prev) => (prev + 1) % content.length)
        }
      }, 20)
    } else {
      if (text.length === currentHeading.length) {
        timeout = setTimeout(() => setIsDeleting(true), 4000)
      } else {
        timeout = setTimeout(() => {
          setText(currentHeading.substring(0, text.length + 1))
        }, 40)
      }
    }

    return () => clearTimeout(timeout)
  }, [text, isDeleting, currentIndex, currentContent.heading])

  return (
    <div className="px-[5%] flex justify-center items-center mx-auto text-center flex-col pt-20 lg:pt-32 max-w-[1000px] w-full">
      <h1 className="font-black text-[40px] md:text-[56px] lg:text-[64px] leading-[1.12] mb-8 min-h-[140px] md:min-h-[160px] flex items-center justify-center text-[#111827] tracking-tighter whitespace-pre-line">
        <span>
          {text}
          <span className="text-[#00AFAA] font-light animate-pulse inline-block ml-1">|</span>
        </span>
      </h1>

      <p className={`font-sans text-[17px] md:text-[20px] mb-10 text-gray-500 transition-opacity duration-500 max-w-4xl mx-auto leading-relaxed font-semibold whitespace-pre-line ${text.length < currentContent.heading.length / 2 && !isDeleting ? 'opacity-0' : 'opacity-100'}`}>
        {currentContent.subtext}
      </p>

      <Link
        href={currentContent.btnLink}
        className={`flex items-center justify-center bg-[#00AFAA] text-white w-[160px] h-[52px] rounded-full text-[16px] font-sans font-black hover:bg-black transition-all transform hover:scale-105 duration-300 shadow-sm mx-auto ${text.length < currentContent.heading.length / 2 && !isDeleting ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}
      >
        {currentContent.btnText}
      </Link>
    </div>
  )
}

export default HeroSection