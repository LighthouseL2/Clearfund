import Image from "next/image";
import NavHeader from "@/components/navHeader";
import Footer from "@/components/Footer";

const cards = [
  {
    icon: "telegram-icon.svg",
    alt: "Telegram Icon",
    title: "Telegram",
    description: "Be part of the conversation! Join our Telegram\ngroup to connect, ask questions, and explore\npublic goods funding together.",
    buttonText: "Join us on Telegram",
  },
  {
    icon: "x-icon.svg",
    alt: "X(Twitter) Icon",
    title: "X(Twitter)",
    description: "Follow us on X for real-time updates,\nplatform news, and highlights from across\nthe public goods ecosystem.",
    buttonText: "Join us on X",
  },
  {
    icon: "paragraph-icon.svg",
    alt: "Paragraph Icon",
    title: "Paragraph",
    description: "Want funding updates in your inbox? Subscribe\nto our Paragraph and never miss a beat in Web3\npublic goods.",
    buttonText: "Subscribe",
  },
  {
    icon: "youtube-icon.svg",
    alt: "Youtube Icon",
    title: "Youtube",
    description: "Learn, explore, and stay informed on the latest in\nWeb3 public goods. Subscribe to our YouTube\nfor updates.",
    buttonText: "Subscribe",
  },
];

export default function SupportSection() {
  return (
    <section>
          <NavHeader />
          <header
      className="bg-center bg-fixed bg-no-repeat bg-cover h-[75vh] relative"
      style={{
        backgroundImage: `url('/support-bg.svg')`,
      }}
    >
      {/* Overlay */}
      <div className="h-full w-full flex items-center justify-center px-4 md:px-24">
        <div className="text-white max-w-3xl text-center md:text-left">
          <h1 className="font-extrabold text-5xl text-center sm:text-6xl md:text-6xl mb-4 leading-tight">
          Connect with Us
          </h1>
        </div>
      </div>
    </header>

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
