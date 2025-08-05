import Image from 'next/image';
import NavHeader from "@/components/navHeader";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <div className="bg-white text-black">
      <NavHeader />

      {/* Top Logo Background */}
      <section
  className="w-full h-[25vh] bg-center bg-no-repeat bg-[length:250px] sm:bg-[length:250px] md:bg-[length:900px]"
  style={{ backgroundImage: "url('clearfund-bg-logo.svg')" }}
/>

      {/* Hero Section */}
      <div className='w-full h-[80vh] relative'>
        <section
        className="w-full h-full bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('aboutHero.jpg') "}}
        />

        <div className='w-full h-full bg-black/80 absolute top-0 '>

        </div>
      </div>

      {/* Public Goods Info Section */}
      <section className="bg-[#F7F2EF] px-4 py-16 flex items-center justify-center  h-[65vh]">
        <div className="mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-[72px] font-bold text-[#198038] mb-6 md:whitespace-nowrap">
            Unifying Web3 Grant Data
          </h1>
          <p className="text-[20px] md:w-4xl mx-auto text-center text-gray-800 mb-20">
            ClearFund is a Web3 data and insights platform focused on aggregating 
            and visualizing funding history across leading public goods platforms.
             It makes it easy to follow the money and understand the impact.
          </p>
          <a href='https://giveth.io/project/clearfund' target='_blank' className="bg-[#198038] text-white block mx-auto py-4 text-sm rounded
           hover:bg-green-800 transition w-[202.1923828125px]">
            Support Us
          </a>
          
        </div>
      </section>

      {/* About Section with Background Image */}
      <section className="relative h-auto min-h-[500px] w-full pb-[3rem]">
        <div className="absolute inset-0 z-0">
          <Image
            src="/about-hero.svg"
            alt="About Background"
            fill
            priority
            className="object-cover w-full h-full"
          />
        </div>

        <div className="relative z-10 px-6 md:px-20 py-20 max-w-5xl text-white">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">About</h2>
          <p className="mb-6 text-base md:text-lg leading-relaxed">
            From the early days of Gitcoin’s Quadratic Funding rounds to
            the emergence of new players like Octant, Celo and others thousands
            of projects have received vital support. However, the problem
             persists: information about what’s been funded, where, and how much
             is scattered across platforms, dashboards, and governance forums.
             That’s where ClearFund comes in.
          </p>

          <h2 className='mt-10 mb-10 bold text-[20px]'>What Is ClearFund?</h2>
          <p className='text-[18px]'>ClearFund is a data aggregation and transparency platform for the Web3 public goods funding ecosystem. It brings together past funding data from decentralized grant platforms into one accessible, searchable archive. Whether you’re a grantee, donor, DAO contributor, researcher, or policymaker, ClearFund makes it easy to trace funding histories, identify trends, and assess the real-world impact of Web3 funding. 

            We solve the problem of fragmented information, a major barrier to transparency and accountability in decentralized ecosystems by creating a unified home for past grant data.</p>

          <h2 className='mt-10 mb-10 bold text-[20px]'>Why This Matters:</h2>
          <p>Public goods funding in Web3 has grown significantly. But as more platforms experiment with new models Retroactive Public Goods Funding, Quadratic Funding, streaming grants, on-chain bounties the data trail has become messy. Each platform publishes funding outcomes in its own format. Some share spreadsheets, others release blog summaries, while many projects receive funding with minimal public visibility.</p>

          <h2 className='mt-10 mb-10 bold text-[20px]'>Problems:</h2>

          <ul className='list-disc ml-10 space-y-10'>
            <li>Fragmented Funding Data: Information about funded projects is spread across various individual platforms, making it challenging to get a comprehensive view. ClearFund brings all this data together into one place, making it easier to explore, compare, and analyze projects across the Web3 funding ecosystem.</li>
            <li>Difficult to measure impact: Without organized data, it’s hard to evaluate how effective grant programs have been.</li>
            <li>Inaccessible to non-experts: Community members, students, and even funders struggle to understand what’s happening across the broader ecosystem.</li>
            <li>Limited interoperability: Data is not structured in a way that supports cross-platform analysis or integration into DAO governance tools.</li>
          </ul>
          {/* <p className="mb-6 text-base md:text-lg leading-relaxed">
            By providing clear, data-driven overviews, we make it easy to understand where funding is going, who’s
            receiving it, and how it’s creating impact.
          </p>
          <p className="text-base md:text-lg leading-relaxed">
            Whether you’re a builder seeking visibility, a donor seeking transparency, or a curious onlooker exploring
            the ReFi space, ClearFund is here to guide your journey.
          </p> */}
          <p className='mt-10'>ClearFund was created to address these challenges head-on.</p>
        </div>
      </section>

      {/* Mission, Vision, and Values Section */}
      {/* <section className='bg-[#F7F2EF]'>
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
      </section> */}

      <Footer />
    </div>
  );
}


`





ClearFund was created to address these challenges head-on.
`