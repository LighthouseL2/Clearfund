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
        heading: "1. The ClearFund Vision",
        text: `ClearFund is a decentralized gateway for global impact discovery. We connect tippers with high-impact projects in climate action, education, and social equity. Our platform is designed to facilitate transparent, direct on-chain tipping to builders and organizations creating verifiable change.`,
      },
      {
        heading: "2. Acceptance of Terms",
        text: `By accessing or using ClearFund, you agree to comply with and be bound by these Terms and Conditions. If you do not agree, you must immediately cease all use of the platform.`,
      },
      {
        heading: "3. Tipping & Contributions",
        text: `ClearFund provides a mechanism for direct tipping to impact projects. Please note:
        - Irreversibility: Once a tip is sent to a project on-chain, it cannot be reversed, canceled, or refunded by ClearFund.
        - Direct Support: Funds are sent directly to project-controlled addresses or smart contracts.
        - No Guarantees: While we curate projects for impact, we do not guarantee the specific outcomes, deliverables, or success of any project.`,
      },
      {
        heading: "4. No Financial Advice",
        text: `ClearFund is an informational aggregator and discovery platform. We do not provide financial, investment, or legal advice. Tippers are encouraged to conduct their own due diligence before supporting any project.`,
      },
      {
        heading: "5. Wallet Responsibility",
        text: `The use of ClearFund requires connection to a third-party wallet. You are solely responsible for:
        - Safeguarding your wallet, private keys, and seed phrases.
        - Ensuring the accuracy of transaction details.
        - Any losses resulting from compromised wallet security or user error.`,
      },
      {
        heading: "6. Platform Role",
        text: `ClearFund acts as a bridge between tippers and builders. We do not hold custody of funds, nor do we act as an intermediary in the transfer of value. We reserve the right to curate, add, or remove project listings at our discretion to maintain platform integrity.`,
      },
      {
        heading: "7. Prohibited Use",
        text: `You agree not to use ClearFund for:
        - Any illegal or fraudulent activities.
        - Money laundering or financing of terrorism.
        - Attempting to exploit platform vulnerabilities or reverse engineer the service.`,
      },
      {
        heading: "8. Limitation of Liability",
        text: `ClearFund and its contributors are not liable for any damages, losses, or security breaches arising from your use of the platform or the blockchain networks it interacts with. All services are provided "as is" and "as available."`,
      },
      {
        heading: "9. Modifications",
        text: `We may update these terms periodically to reflect platform growth or regulatory changes. Continued use of the platform after updates constitutes acceptance of the revised Terms.`,
      },
      {
        heading: "10. Governing Law",
        text: `These Terms are governed by the principles of decentralized governance and the laws of the jurisdiction where ClearFund's core infrastructure is maintained. Any disputes will be resolved through cooperative community-led resolution.`,
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

