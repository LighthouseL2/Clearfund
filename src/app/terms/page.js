import NavHeader from "@/components/navHeader";
import Footer from "@/components/Footer";

export default function TermsAndConditions() {
  const terms = {
    title: "Terms and Conditions",
    effectiveDate: "Effective Date: July 1, 2025",
    content: [
      {
        heading: "1. Use of the Platform",
        text: `ClearFund help users discover project making impact, explore funding opportunities, display historical funding data from platforms like Gitcoin, Giveth, Octant, Celo, and others, visualize data and project participation to promote transparency in the regenerative and public goods funding ecosystem. We do not distribute grants or collect applications.`,
      },
      {
        heading: "2. Use of Information",
        text: `The information provided on ClearFund is for informational and educational purposes only. While we strive for accuracy, we do not guarantee the completeness, timeliness, or accuracy of any data, visualizations, or insights displayed. You are responsible for verifying any data before making decisions based on it.`,
      },
      {
        heading: "3. User Submissions",
        text: `If you submit any feedback, suggestions, or content (e.g., corrections or insights), you grant us a non-exclusive, royalty-free, perpetual license to use and display that content on the Platform.`,
      },
      {
        heading: "4. No Financial or Investment Advice",
        text: `Nothing on the Platform constitutes financial, investment, legal, or professional advice. ClearFund is not a funding body, grant provider, or investment advisor. Always consult appropriate professionals before making funding or grant-related decisions.`,
      },
      {
        heading: "5. Third-Party Links",
        text: `The Platform may contain links to third-party websites or funding platforms. We do not endorse or take responsibility for the content, terms, or policies of those third-party platforms.`,
      },
      {
        heading: "6. Intellectual Property",
        text: `ClearFund is an open-source and public-good platform. All content on ClearFund including logos, graphics, dashboards, data, visualizations, and written content is made available under the Creative Commons CC0 1.0 Universal (Public Domain Dedication).

                You are free to copy, modify, distribute, and use the content even for commercial purposes without asking permission or providing attribution. We encourage reuse and remixing in the spirit of transparency and collaboration in the Web3 ecosystem.`,
      },
      {
        heading: "7. Prohibited Uses",
        text: `You agree not to: I. Use the Platform for any illegal or unauthorized purpose. II. Attempt to reverse engineer, scrape, or extract large volumes of data without permission. III. Upload or transmit any malicious code or material.`,
      },
      {
        heading: "8. Changes to the Platform",
        text: `We reserve the right to modify or discontinue the Platform, or any part of it, at any time, with or without notice.`,
      },
      {
        heading: "9. Limitation of Liability",
        text: `ClearFund and its contributors are not liable for any damages or losses arising from your use of, or reliance on, the Platform. All services are provided “as is” and “as available."`,
      },
      {
        heading: "10. Modifications to These Terms",
        text: `We may update these Terms periodically. Any changes will be posted here with a revised "Effective Date." Continued use of the Platform after changes constitutes your acceptance of the new Terms.`,
      },
      {
        heading: "11. Governing Law",
        text: `These Terms shall be governed and construed in accordance with the laws of the jurisdiction in which the ClearFund project is primarily maintained, without regard to its conflict of law provisions. However, since ClearFund is an open-source, global platform, users agree that any legal matters shall be resolved in a fair and neutral manner, prioritizing cooperative resolution. By using ClearFund, you acknowledge that local laws may apply depending on your location, and you are responsible for compliance with them.`,
      },
    ],
  };

  return (
    <section>
      <NavHeader />
      <div className="min-h-screen flex items-center justify-center px-4 py-[5rem]">
        <div className="max-w-3xl w-full p-8">
          <h1 className="text-3xl font-bold mb-4">{terms.title}</h1>
          <p className="text-sm text-black mb-6">{terms.effectiveDate}</p>
          <p className="text-sm text-black mb-6">
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
            <div key={index} className="mb-5">
              <h2 className="font-semibold text-lg mb-1">{section.heading}</h2>
              <p className="text-black text-sm whitespace-pre-line">
                {section.text}
              </p>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </section>
  );
}
