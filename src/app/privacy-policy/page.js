"use client"

import NavHeader from "@/components/navHeader";
import { useState } from "react";
import Footer from "@/components/Footer";
import MenuDropdown from "@/components/menuDropdown";

export default function PrivacyPolicy() {

  const [open, setOpen] = useState(true)
  const [openMenu, setOpenMenu] = useState(false)
  const [blur, setBlur] = useState(false)



  const policy = {
    title: "Privacy Policy",
    effectiveDate: "Effective Date: July 1, 2025",
    paragraph: `At ClearFund ("we", "us", or "our"), your privacy matters. This Privacy Policy outlines how we handle information when you access or use our platform`,
    content: [
      {
        heading: "1. No Personal Data Collection",
        text: `ClearFund allows users to create accounts and log in using Google OAuth. When you sign up or log in with your Google account, we collect the following information from your Google profile (with your consent): Email address, Google user ID (non-public, used for authentication). We do not access your Google password or other sensitive account information.
        
        Authentication is securely handled through Google’s OAuth system, and we only receive the minimum information required to manage your account. We may also collect: Basic usage analytics to understand and improve the platform, Optional information you provide via forms or newsletters. We do not sell or share your personal data with third parties for marketing purposes.`,
      },
      {
        heading: "2. What We Display",
        text: `The information on ClearFund includes: 1. Publicly available data about past and ongoing grant rounds, 2. Grant round details such as project names, funding amounts, round names, and platforms (e.g., Gitcoin, Giveth, Octant), 3. Data presented through charts, tables, and visualizations for transparency and educational purposes. This data is either publicly accessible or submitted by users with consent for display.`,
      },
      {
        heading: "3. Cookies & Analytics",
        text: `We may use basic cookies or third-party analytics tools (such as Google Analytics) to understand how users interact with our site purely to improve performance and content delivery. These cookies do not track personal identity, and you can disable them in your browser settings.`,
      },
      {
        heading: "4. Third-Party Links",
        text: `ClearFund may contain links to third-party websites and platforms (e.g., funding platforms or project sites). We are not responsible for the privacy practices of those websites. Please review their privacy policies before interacting with them.`,
      },
      {
        heading: "5. Data Security",
        text: `We prioritize the protection of your personal information and implement strong security measures to safeguard it. Authentication is handled securely via Google OAuth, meaning we do not collect or store your Google password. We only receive minimal information from Google (such as your email address) needed to create and manage your account.`,
      },
      {
        heading: "6. Changes to This Policy",
        text: `We may update this Privacy Policy from time to time. The latest version will always be available on this page with the revised "Effective Date."`,
      },
      {
        heading: "7. Contact Us",
        text: `If you have any questions or concerns regarding this Privacy Policy or our data practices, please contact us at phweb3connect@gmail.com `,
      },
    ],
  };

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

 <div className="min-h-screen flex items-center font-sans justify-center px-4 pb-[7rem] pt-[5rem] bg-[#FAFAFA]">
      <div className="max-w-4xl w-full  p-8 ">
        <h1 className="text-3xl font-bold mb-4">{policy.title}</h1>
        <p className="text-[16px] text-black mb-10">{policy.effectiveDate}</p>
        <p className="text-[16px] text-black mb-10">{policy.paragraph} {' '}<a
            href="https://clearfund.netlify.app"
            className="text-blue-600 underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            clearfund.netlify.app
          </a>
        </p>


        {policy.content.map((section, index) => (
          <div key={index} className="mb-10">
            <h2 className="font-bold text-lg mb-1">{section.heading}</h2>
            <p className="text-black text-[16px] whitespace-pre-line">{section.text}</p>
          </div>
        ))}
      </div>
    
      </div>
     
      <Footer />
    </section>

   
    
  );
}
