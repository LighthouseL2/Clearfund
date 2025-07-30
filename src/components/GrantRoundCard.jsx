import Image from "next/image";
import Link from "next/link";

const GrantBox = () => {
  const box = [
    {
      image: "/mask.png",
      title: "Proof-of-Ship- Season 6",
      network: "Celo",
      status: "Active",
      desc: `Proof-of-Ship is a monthly program for builders to grow their onchain reputation and earn rewards in the Celo ecosystem.`,
      amount: "30K",
      coin: "cUSD",
      date: "End– Jul 31, 2025",
        link: "https://celo.lemonade.social/e/RPfvWoWI"
    },
    {
      image: "/mask.png",
      title: "Celo Support Streams (S0)",
      network: "Celo",
      status: "Active",
      desc: `Celo Support Streams are Celo Protocol Incentives that are distributed once every two weeks to Protocols on Celo through vote in the celoPG Aragon deployment.`,
      amount: "100K",
      coin: "Celo",
      date: "End– Jul 30, 2025",
        link: "https://app.charmverse.io/celopg/celo-support-streams-08274005568032872"
    },
    {
      image: "/mask.png",
      title: "Proof of Impact (S0)",
      network: "Celo",
      status: "Active",
      desc: `CeloPG and Divvi are excited to host Celo Proof of Impact Season 0, the first fully onchain monthly reward program.`,
      amount: "150K",
      coin: "Celo",
      date: "End– Jul 31, 2025",
        link: "https://app.divvi.xyz/builders/onboarding"
    },
    {
      image: "/mask.png",
      title: "USDGLO Flywheel",
      network: "Glo Dollar",
      status: "Active",
      desc: `CeloPG and Glodollar are collaborating on this Spinach campaign to help builders earn more.`,
      amount: "6K USDGLO + 10K",
      coin: "Celo",
      date: "End– Jul 31, 2025",
        link: "https://www.spinach.fi/"
      },
     {
      image: "/mask.png",
      title: "Builder Rewards",
      network: "Cello",
      status: "Active",
      desc: `With Farcaster now supporting Celo it’s time to ship and get rewarded a share of 10,000$ celo each month by being an active builders.`,
      amount: "30k",
      coin: "Celo",
       date: "End– Jul 31, 2025",
        link: "https://celo.builderscore.xyz/"
      },
       {
      image: "/mask.png",
      title: "CeloPG & Farcaster",
      network: "Cello",
      status: "Active",
      desc: `This joint campaign between CeloPG and Farcaster aims to support builders who create MiniApps on Celo.`,
      amount: "50k",
      coin: "Celo",
         date: "End– Jul 31, 2025",
        link: "https://farcaster.xyz/celo/0x30d42443"
      },
         {
      image: "/mask.png",
      title: "Good Dollar Builders",
      network: "Good Dollar",
      status: "Active",
      desc: `The GoodBuilders Program is a year-long initiative fueling innovation with G$, offering support, funding, and mentorship to builders.`,
      amount: "250k",
      coin: "Celo",
           date: "End– Jul 31, 2025",
        link: "https://medium.com/gooddollar/goodbuilders-goes-streaming-8de59dbd7383"
    },
  ];

  return (
    <div className="relative">
     <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10 mt-16 w-full text-black justify-items-center">
  {box.map((item, index) => (
    <div
      key={index}
      className="flex flex-col justify-between h-full w-full max-w-[360px] border border-gray-200 rounded-lg shadow-sm bg-white hover:shadow-md transition"
    >
      {/* Top image */}
      <div className="h-[56px] relative">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover object-top rounded-t-lg"
        />
      </div>

      {/* Card content */}
      <div className="flex-grow mt-5 px-6 pb-6">
        {/* Title and status */}
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-[16px] text-black font-semibold leading-snug">
            {item.title}
          </h3>
          <span className="text-[12px] font-medium rounded-full px-3 py-1 bg-[#D1F9E5] text-[#009951]">
            {item.status}
          </span>
        </div>

        {/* Network and date */}
        <div className="flex justify-between items-end mt-1 mb-3">
          <span className="inline-block bg-black text-white text-[12px] font-bold font-sans rounded px-2 py-1">
            {item.network}
          </span>
          <p className="text-[12px] text-[#198038] font-sans">{item.date}</p>
        </div>

        {/* Description */}
        <p className="text-[14px] font-sans leading-snug text-gray-700 mb-6">
          {item.desc}
        </p>

        {/* Amount */}
        <p className="inline-flex items-center border bg-[#D8D8D833] border-black/20 rounded py-1 px-3 gap-1 text-[14px] font-sans font-medium">
          <span className=" text-black">{item.amount}</span>
          <span className="text-black/50">{item.coin}</span>
        </p>
      </div>

      {/* Apply button pinned to bottom */}
      <div className="px-5 py-3 border-t border-gray-200 mt-auto">
      {item.link && (
  <Link
    href={item.link}
    target="_blank"
    rel="noopener noreferrer"
    className="block font-sans bg-[#198038] hover:bg-[#198038] transition rounded-md w-full py-3 text-center text-white text-sm font-medium"
  >
    Apply
  </Link>
)}
      </div>
    </div>
  ))}
</div>

    </div>
  );
};

export default GrantBox;
