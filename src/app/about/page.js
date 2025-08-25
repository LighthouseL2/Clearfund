"use client"

import Image from 'next/image';
import { useState } from 'react';
import NavHeader from "@/components/navHeader";
import Footer from "@/components/Footer";
import MenuDropdown from "@/components/menuDropdown";

export default function HomePage() {

    const [open, setOpen] = useState(true)
    const [openMenu, setOpenMenu] = useState(false)
    const [blur, setBlur] = useState(false)


  return (
    <div className="bg-white text-black font-sans">
      <NavHeader setToggle={setOpen} toggle={open} openMenu={openMenu}
            setOpenMenu={setOpenMenu} setBlur={setBlur}
        />
        <MenuDropdown
            openMenu={openMenu}
            setOpenMenu={setOpenMenu}
            toggle={open}
            setToggle={setOpen}
        />

      {/* Top Logo Background */}
      <section
  className="w-full h-[25vh] bg-center bg-no-repeat bg-[length:250px] sm:bg-[length:250px] md:bg-[length:900px]"
  style={{ backgroundImage: "url('clearfund-bg-logo.svg')" }}
/>

      {/* Hero Section */}
      <div className='w-full h-[80vh] relative font-sans'>
        <section
        className="w-full h-full bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('aboutImg.jpg') "}}
        />

        <div className='w-full h-full bg-black/80 absolute top-0 '>

        </div>
      </div>

      {/* Public Goods Info Section */}
      <section className="bg-[#F7F2EF] px-4 py-16 flex items-center justify-center  md:h-[70vh]">
        <div className="mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-[72px] font-bold text-[#198038] mb-6 md:whitespace-nowrap">
            Unifying Web3 Grant Data
          </h1>
          <p className="text-[20px] md:w-4xl mx-auto text-center text-gray-800 mb-10">
            ClearFund is a data aggregation and transparency platform for Web3 public
            goods funding. It unifies past funding data and ongoing funding opportunities
            into one accessible and searchable place.
          </p>
          <a href='https://giveth.io/project/clearfund' target='_blank' className="bg-[#198038] text-white block mx-auto py-4 text-sm rounded
           hover:bg-green-800 transition w-[202.1923828125px] font-bold">
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

        <div className="relative z-10 px-6  py-[7rem] md:max-w-[660px] w-full text-white mx-auto text-center">
          <h2 className="text-3xl md:text-[64px] font-bold mb-10 text-white/90">About</h2>
          <p className="mb-6 text-[16px] leading-relaxed text-white/90">
            ClearFund is a data aggregation and transparency platform for the Web3 public
            goods funding ecosystem. It brings together past funding data and ongoing grant
            applications from decentralized grant platforms into one accessible and 
            searchable place. 
 
          </p>

          <p className="mb-6 text-[16px] leading-relaxed text-white/90">
            Whether you’re a grantee, donor, DAO contributor, researcher, or policymaker,
            ClearFund makes it easy to trace funding histories, discover active funding
            opportunities, identify trends, and assess the real-world impact of Web3 funding.

          </p>
            
          <p className="mb-6 text-[16px] leading-relaxed text-white/90">
            We solve the problem of fragmented information, a major barrier to transparency
            and accountability in decentralized ecosystems by creating a unified home for
            both historical grant data and active grant listings.


          </p>

          <h2 className='mt-20 mb-10 font-bold text-3xl md:text-[64px]'>Why This Matters: </h2>
          <p className='text-[16px] text-white/90 mb-10'>
            Public goods funding in Web3 has grown significantly. But as more platforms
            experiment with new models Retroactive Public Goods Funding, Quadratic Funding,
            streaming grants, on-chain bounties, the data trail has become messy.

          </p>


          <p className='text-[16px] text-white/90 mb-10'>
            Each platform publishes funding outcomes and active rounds in its own format.
            Some share spreadsheets, others release blog summaries, while many projects
            receive or seek funding with minimal public visibility.
          </p>

        </div>
      </section>
      <Footer />
    </div>
  );
}