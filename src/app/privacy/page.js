"use client"

import NavHeader from "@/components/navHeader";
import { useState } from "react";
import Footer from "@/components/Footer";
import MenuDropdown from "@/components/menuDropdown";

export default function PrivacyPolicy() {
  const policy = {
    title: "Privacy Policy",
    effectiveDate: "Effective Date: March 9, 2026",
    paragraph: `At ClearFund, we are committed to transparency and the privacy of our global community. This policy explains how we handle information as you navigate our platform to discover and support high-impact projects through on-chain tipping.`,
    content: [
      {
        heading: "1. Information We Collect",
        text: `As a decentralized discovery platform, we minimize data collection:
        - Wallet Information: When you connect your wallet, we only see your public wallet address. We never have access to your private keys or personal funds.
        - User Submissions: Information provided when submitting projects, including descriptions, images, and contact details.
        - Technical Data: Basic usage statistics, browser type, and interaction data to help us improve the platform experience.`,
      },
      {
        heading: "2. How We Use Information",
        text: `We use the information collected to:
        - Facilitate the discovery of impact projects and enable direct tipping.
        - Maintain a transparent, on-chain record of community support and impact.
        - Enhance platform functionality and curate relevant funding opportunities in climate, education, and social sectors.`,
      },
      {
        heading: "3. Blockchain Transparency",
        text: `ClearFund interacts with public blockchains (such as Celo and Ethereum). Transactions made through the platform are:
        - Public: Anyone can view transaction history associated with a wallet address.
        - Permanent: Blockchain records cannot be altered or deleted.
        - Decentralized: We do not control the blockchain networks or the funds sent through them.`,
      },
      {
        heading: "4. Cookies and Analytics",
        text: `We use essential cookies and basic analytics to understand how users interact with ClearFund. You can manage cookie preferences through your browser settings, though some features may be affected.`,
      },
      {
        heading: "5. Data Security & Responsibility",
        text: `While we implement industry-standard security measures for our platform, the security of your digital assets depends on your own wallet management. You are solely responsible for protecting your private keys and recovery phrases.`,
      },
      {
        heading: "6. Third-Party Ecosystem",
        text: `ClearFund aggregates opportunities from various Web3 platforms (Gitcoin, Giveth, etc.). We are not responsible for the privacy practices of these third parties and encourage you to review their respective policies when visiting their sites.`,
      },
      {
        heading: "7. Updates to This Policy",
        text: `We may refine this policy as the platform evolves. Any changes will be updated here with a new "Effective Date." Your continued use of the platform signifies your acceptance of these terms.`
      },
      {
        heading: "Contact Us",
        text: `For questions regarding our privacy practices or the ClearFund ecosystem, please reach out to us at phweb3connect@gmail.com.`
      },
    ],
  };

  return (

    <section>
      <NavHeader />


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


