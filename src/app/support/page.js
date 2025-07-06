import Image from "next/image";
import NavHeader from "@/components/navHeader";
import HeroSection from "@/components/HeroSection";
import Footer from "@/components/Footer";

const cards = [
  {
    icon: "question-icon.svg",
    alt: "Question Icon",
    title: "Got a question?",
    description: "We are here to help. Reach out and we will get back\nto you as soon as possible.",
    buttonText: "Ask Here",
  },
  {
    icon: "feedback-icon.svg",
    alt: "Feedback Icon",
    title: "Give Feedback",
    description: "Tell us what you think, your input helps us\ngrow and improve.",
    buttonText: "Your Feedback",
  },
  {
    icon: "bug-icon.svg",
    alt: "Bug Icon",
    title: "Flag a bug",
    description: "Notice something broken or off? Let us know so\nwe can fix it quickly.",
    buttonText: "Flag a bug",
  },
  {
    icon: "feature-icon.svg",
    alt: "Feature Icon",
    title: "Suggest a Feature",
    description: "Have an idea that could make ClearFund better?\nWe would love to hear it!",
    buttonText: "Suggest Here",
  },
];

export default function SupportSection() {
  return (
    <section>
      <NavHeader />
      <HeroSection />

      <div className="px-4 py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
          {cards.map((card, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-lg p-8 flex flex-col items-center text-center shadow-sm hover:shadow-md transition duration-300"
            >
              <Image
                src={`/${card.icon}`}
                alt={card.alt}
                width={64}
                height={64}
                className="mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{card.title}</h3>
              <p className="text-base text-gray-700 mb-6 whitespace-pre-line">{card.description}</p>
              <button className="w-40 h-10 bg-green-700 text-white text-sm font-medium rounded hover:bg-green-800 transition flex items-center justify-center">
                {card.buttonText}
              </button>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </section>
  );
}
