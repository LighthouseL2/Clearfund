import NavHeader from "@/components/navHeader";
import Footer from "@/components/Footer";

export default function PrivacyPolicy() {
  const policy = {
    title: "Privacy Policy",
    effectiveDate: "Effective Date: July 1, 2025",
    paragraph: "At ClearFund (\"we\", \"us\", or \"our\"), your privacy matters. This Privacy Policy outlines how we handle information when you access or use our platform",
    content: [
      {
        heading: "1. No Personal Data Collection",
        text: `ClearFund is a read-only, informational platform. We do not collect or store any personally identifiable information (PII) from our users, unless you voluntarily provide it (e.g., through a contact form or newsletter subscription).`,
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
        text: `Since we do not store user accounts or sensitive data, our primary focus is on keeping the platform secure, transparent, and publicly accessible. If any form submissions or newsletter tools are used, we ensure they are secured using industry-standard protocols.`,
      },
      {
        heading: "6. Changes to This Policy",
        text: `We may update this Privacy Policy from time to time. The latest version will always be available on this page with the revised "Effective Date."`,
      },
      {
        heading: "7. Contact Us",
        text: `If you have any questions or concerns regarding this Privacy Policy or our data practices, please contact us at info@clearfund.com`,
      },
    ],
  };

  return (

    <section>
      <NavHeader/>
 <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-3xl w-full  p-8 ">
        <h1 className="text-3xl font-bold mb-4">{policy.title}</h1>
        <p className="text-sm text-black mb-6">{policy.effectiveDate}</p>
        <p className="text-sm text-black mb-6">{policy.paragraph} {' '}<a
            href="https://clearfund.netlify.app"
            className="text-blue-600 underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            clearfund.netlify.app
          </a></p>
       

        {policy.content.map((section, index) => (
          <div key={index} className="mb-5">
            <h2 className="font-semibold text-lg mb-1">{section.heading}</h2>
            <p className="text-black text-sm whitespace-pre-line">{section.text}</p>
          </div>
        ))}
      </div>
    
      </div>
     
      <Footer />
    </section>

   
    
  );
}
