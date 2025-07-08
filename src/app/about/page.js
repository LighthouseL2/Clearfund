import Image from 'next/image';
import NavHeader from "@/components/navHeader";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <div className="bg-white text-black">
      <NavHeader />

      {/* Top Logo Background */}
      <section
  className="w-full h-[45vh] bg-center bg-no-repeat bg-[length:250px] sm:bg-[length:250px] md:bg-[length:900px]"
  style={{ backgroundImage: "url('clearfund-bg-logo.svg')" }}
/>

      {/* Hero Section */}
      <section
        className="w-full h-[75vh] bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('clearfund-about-hero.svg')" }}
      />

      {/* Public Goods Info Section */}
      <section className="bg-[#F7F2EF] px-4 py-16 flex items-center justify-center  h-[65vh]">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-green-700 mb-6 md:whitespace-nowrap">
            Clarity in Public Goods Funding
          </h1>
          <p className="text-base md:text-lg text-gray-800 mb-8">
            ClearFund helps you explore past grants, discover projects building on Regenerative
            Finance (ReFi) and uncover new funding opportunities with full transparency.
          </p>
          <button className="bg-green-700 text-white px-6 py-2 text-sm rounded hover:bg-green-800 transition">
            Support Us
          </button>
        </div>
      </section>

      {/* About Section with Background Image */}
      <section className="relative h-auto min-h-[500px] w-full">
        <div className="absolute inset-0 z-0">
          <Image
            src="/about-hero.svg"
            alt="About Background"
            fill
            priority
            className="object-cover w-full h-full"
          />
        </div>

        <div className="relative z-10 px-6 md:px-20 py-20 max-w-4xl text-white">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">About</h2>
          <p className="mb-6 text-base md:text-lg leading-relaxed">
            ClearFund is designed to bring clarity and transparency to the evolving landscape of Web3 public goods
            funding. ClearFund helps individuals, communities, and ecosystem contributors discover impactful ReFi
            projects, track previous funding rounds across platforms like Gitcoin, Giveth, Octant and others, and explore
            new funding opportunities in real-time.
          </p>
          <p className="mb-6 text-base md:text-lg leading-relaxed">
            By providing clear, data-driven overviews, we make it easy to understand where funding is going, who’s
            receiving it, and how it’s creating impact.
          </p>
          <p className="text-base md:text-lg leading-relaxed">
            Whether you’re a builder seeking visibility, a donor seeking transparency, or a curious onlooker exploring
            the ReFi space, ClearFund is here to guide your journey.
          </p>
        </div>
      </section>

      {/* Mission, Vision, and Values Section */}
      <section className='bg-[#F7F2EF]'>
        <div className="py-16 px-6 md:px-16 w-full">
          <div className="grid md:grid-cols-2 gap-16 mb-20">
            <div>
              <h2 className="text-3xl font-semibold text-green-700 mb-4">Our Mission</h2>
              <p className="text-base sm:text-lg leading-relaxed">
                To bridge the gap between public goods funding platforms and the Web3 community
                through transparent, discoverable, and data–informed funding opportunities.
              </p>
            </div>
            <div>
              <h2 className="text-3xl font-semibold text-green-700 mb-4">Our Vision</h2>
              <p className="text-base sm:text-lg leading-relaxed">
                To build a future where public goods funding across the Web3 ecosystem is transparent,
                discoverable, and driven by open, data–informed participation.
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-semibold text-green-700 mb-10">Our Values</h2>

            <div className="mb-10">
              <h3 className="text-2xl font-semibold text-green-700 mb-4">Transparency First:</h3>
              <ul className="list-disc pl-5 space-y-2 text-base sm:text-lg">
                <li>We make funding data easily accessible and understandable for everyone.</li>
                <li>All project and grant insights are sourced from public, verifiable platforms.</li>
                <li>We visualize complex funding flows to simplify decision–making for builders and donors.</li>
              </ul>
            </div>

            <div className="mb-10">
              <h3 className="text-2xl font-semibold text-green-700 mb-4">Empowering Communities:</h3>
              <ul className="list-disc pl-5 space-y-2 text-base sm:text-lg">
                <li>We help builders, donors, and learners navigate the Web3 funding landscape with clarity and confidence.</li>
                <li>By surfacing grant opportunities and past funding data, we enable communities to take informed action.</li>
                <li>We highlight underrepresented ReFi projects and make their stories visible.</li>
                <li>We believe access to funding knowledge is a right, not a privilege.</li>
              </ul>
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-green-700 mb-4">Built for Regeneration:</h3>
              <ul className="list-disc pl-5 space-y-2 text-base sm:text-lg">
                <li>We prioritize projects that align with regenerative principles building for people, planet, and long–term value.</li>
                <li>ClearFund showcases ReFi initiatives and their funding journeys to amplify their visibility and impact.</li>
                <li>We help donors and communities discover who’s building solutions that restore, sustain, and empower.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
