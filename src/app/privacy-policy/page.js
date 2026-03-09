"use client"

import NavHeader from "@/components/navHeader";
import { useState } from "react";
import Footer from "@/components/Footer";
import MenuDropdown from "@/components/menuDropdown";

export default function PrivacyPolicy() {
  const policy = {

    title: "Privacy Policy",
    effectiveDate: "Effective Date: March 9, 2026",
    paragraph: `Your privacy is our priority. This policy outlines how ClearFund ("we", "us", or "our") manages information during your tipping journey to global impact projects.`,
    content: [
      {
        heading: "1. Information We Collect",
        text: `When you use ClearFund, we may collect: Wallet Information: Public wallet addresses you connect. User Submissions: Content, applications, or information you provide. Usage Data: Non-personal data such as browser type, device, and platform interactions.`,
      },
      {
        heading: "2. How We Use Information",
        text: `We use information to:
        - Facilitate direct tips to impact projects.
        - Verify community impact through on-chain transparency.
        - Improve platform discovery for high-impact initiatives in climate, education, and social sectors.`,
      },
      {
        heading: "3. Wallet & Blockchain Data",
        text: `Interactions with ClearFund may involve blockchain transactions. Please note: Blockchain transactions are public and permanent. We do not control or alter blockchain records. You are solely responsible for safeguarding your wallet and private keys.`,
      },
      {
        heading: "4. Cookies & Tracking",
        text: `We may use cookies or similar technologies to: Analyze platform usage. Improve performance and user experience. Store your preferences. You can disable cookies in your browser, but some features may not work properly.`,
      },
      {
        heading: "5. Data Security",
        text: `We use reasonable measures to protect your information. However, no method of transmission over the internet or blockchain is 100% secure. Use the Platform at your own risk.`,
      },
      {
        heading: "6. Third-Party Links",
        text: `ClearFund may link to third-party websites. We are not responsible for their privacy practices. We encourage you to review their privacy policies.`,
      },
      {
        heading: "7. Children’s Privacy",
        text: `ClearFund is not intended for users under 18 years of age (or the legal age of majority in your region). We do not knowingly collect personal information from minors.`,
      },

      {
        heading: "8. Changes to This Policy",
        text: `We may update this Privacy Policy from time to time. Updates will be posted with a revised “Effective Date.” Continued use of ClearFund after updates means you accept the changes.`
      },

      {
        heading: "Contact Us",
        text: `If you have any questions or concerns regarding this Privacy Policy or our data practices, please contact us at phweb3connect@gmail.com.`
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


