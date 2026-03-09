"use client"


import NavHeader from "@/components/navHeader";
import MenuDropdown from "@/components/menuDropdown";
import { useState } from "react";
import Footer from "@/components/Footer";

export default function TermsAndConditions() {
  const terms = {

    title: "Terms and Conditions",
    effectiveDate: "Effective Date: March 9, 2026",
    content: [
      {
        heading: "1. The ClearFund Mission",
        text: `ClearFund is a decentralized impact discovery platform designed to connect global tippers with high-impact projects in education, climate action, and social equity. Our mission is to facilitate transparent, direct tipping (in USD/Crypto) to builders and organizations creating verifiable real-world change.`,
      },
      {
        heading: "2. Eligibility",
        text: `To use ClearFund, you must: Be at least 18 years old (or meet your country’s age of majority). Have the legal right and capacity to enter into these Terms. Comply with all applicable laws, regulations, and community guidelines.
      `,
      },
      {
        heading: "3. Use of Information",
        text: `Information provided on ClearFund is for general informational purposes only. While we aim to curate accurate opportunities, we do not guarantee completeness, reliability, or outcomes. Any reliance you place on such information is at your own risk.`,
      },
      {
        heading: "4. Contributions and Tips",
        text: `ClearFund provides a 'Tip' and 'Support' mechanism for direct project tipping. All contributions are processed transparently on-chain. While we aim to list only high-integrity projects, ClearFund does not guarantee the success or specific deliverables of any project. Tippers are encouraged to perform their own due diligence.`,
      },
      {
        heading: "5. Wallet & Payments",
        text: `ClearFund may require wallet connection for certain features. You are solely responsible for managing your wallet and safeguarding your digital assets. ClearFund does not store private keys or hold custody of your funds.`,
      },
      {
        heading: "6. User Submissions",
        text: `If you submit any feedback, suggestions, or content (e.g., corrections or funding opportunities), you grant us a non-exclusive, royalty-free, perpetual license to use and display that content on the Platform.`,
      },
      {
        heading: "7. Disclaimers",
        text: `ClearFund is provided on an “as is” and “as available” basis. We do not guarantee uninterrupted service, success in funding, or accuracy of third-party listings. Use of the Platform is at your own risk.`,
      },
      {
        heading: "8. No Financial or Investment Advice",
        text: `ClearFund does not provide financial, legal, or investment advice. Opportunities listed are independent third-party offerings. You are solely responsible for conducting your own due diligence before engaging in any tipping, bounty, or gig.`,
      },
      {
        heading: "9. Limitation of Liability",
        text: `To the fullest extent permitted by law, ClearFund is not liable for: Losses arising from participation in third-party opportunities. Security breaches due to user negligence (e.g., lost private keys). Any indirect, incidental, or consequential damages.`,
      },
      {
        heading: "10. Third-Party Links",
        text: `The Platform may contain links to third-party websites or tipping platforms. We do not endorse or take responsibility for the content, terms, or policies of those third-party platforms.`,
      },
      {
        heading: "11. Intellectual Property",
        text: `All ClearFund branding, design, and content are the intellectual property of ClearFund unless otherwise stated. You may not copy, modify, or distribute our materials without prior written permission.
      `,
      },

      {
        heading: "12. Prohibited Uses",
        text: `You agree not to: I. Use the Platform for any illegal or unauthorized purpose. II. Attempt to reverse engineer, scrape, or extract large volumes of data without permission. III. Upload or transmit any malicious code or material.`
      },


      {
        heading: "13. Changes to the Platform",
        text: `We reserve the right to modify or discontinue the Platform, or any part of it, at any time, with or without notice.`
      },


      {
        heading: "14. Limitation of Liability",
        text: `ClearFund and its contributors are not liable for any damages or losses arising from your use of, or reliance on, the Platform. All services are provided “as is” and “as available.`
      },


      {
        heading: "15. Modifications to These Terms",
        text: `We may update these terms periodically. Any changes will be posted here with a revised "Effective Date." Continued use of the Platform after changes constitutes your acceptance of the new Terms.`
      },


      {
        heading: "16. Governing Law",
        text: `These Terms shall be governed and construed in accordance with the laws of the jurisdiction in which the ClearFund project is primarily maintained, without regard to its conflict of law provisions. However, since ClearFund is an open-source, global platform, users agree that any legal matters shall be resolved in a fair and neutral manner, prioritizing cooperative resolution.

      By using ClearFund, you acknowledge that local laws may apply depending on your location, and you are responsible for compliance with them.`
      },


    ],
  };

  return (
    <section className="bg-[#FAFAFA]">
      <NavHeader />

      <div className="min-h-screen font-sans flex items-center justify-center px-4 pb-[8rem] pt-[5rem]">

        <div className="max-w-4xl w-full p-8">
          <h1 className="text-3xl font-bold mb-4">{terms.title}</h1>
          <p className="text-[16px] text-black mb-6">{terms.effectiveDate}</p>
          <p className="text-[16px] text-black mb-6">
            {`Welcome to ClearFund ("we", "our", or "us"). These Terms and Conditions ("Terms") govern your access to and use of our platform `}
            <a
              href="https://clearfund.netlify.app"
              className="text-blue-600 underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              clearfund.netlify.app
            </a>{" "}
            and any related services (collectively, the &quot;Platform&quot;). By using or accessing ClearFund, you agree to be bound by these Terms. If you do not agree, please do not use the Platform.
          </p>


          {terms.content.map((section, index) => (
            <div key={index} className="mb-10">
              <h2 className="font-bold text-lg mb-1">{section.heading}</h2>
              <p className="text-black text-[16px] whitespace-pre-line">
                {section.text}
              </p>
            </div>
          ))}
          <p className="text-black text-[16px] whitespace-pre-line">By using ClearFund, you acknowledge that local laws may apply depending on your location, and you are responsible for compliance with them.</p>
        </div>
      </div>
      <Footer />
    </section>
  );
}

