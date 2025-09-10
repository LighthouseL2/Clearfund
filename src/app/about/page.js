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
    <div className="bg-white text-black">
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
      <div className='w-full flex flex-wrap justify-between  px-[5%] lg:h-[80vh]'>
          <div className='lg:w-1/2 flex w-full flex-col mt-30 justify-center lg:justify-start'>
            <p className='text-[#00000080]'>OPPORTUNITY TO EARN</p>
            <h1 className='text-[96px] mt-10'>About</h1>
            <div className='lg:w-[456px] font-sans text-[18px] space-y-10'>
              <p>
              ClearFund is designed as a dedicated platform that helps builders navigate Web3 opportunities by searching, curating, and presenting open grants, bounties, and paid gigs across the ecosystem.
            </p>

            <p>
               By aggregating funding opportunities, ClearFund helps developers, startups, innovators, and community members to find relevant opportunities to innovate and grow.
            </p>
            </div>
          </div>

          <div className='lg:w-1/2 xl:w-[620.9999389648438px] w-full relative h-[566px] flex items-center justify-center lg:mt-32'>
            <Image
              src={"/about-icons/money.png"}
              alt='about icon'
              fill
            />
          </div>
      </div>

      <div className='w-full bg-black/50 mt-20'>
          <div className='py-[5%] px-10 lg:px-[10%]'>
            <div className='lg:h-[145px] bg-white mt-20 flex flex-wrap'>
              <div className='px-10 py-5 lg:w-3/5 bg-[#D9D9D9]'>
                <h3 className='mb-3 text-[#54295B] text-[14px]'>DECENTRALIZATION</h3>
                <p className='font-sans text-[16px] font-bold'>
                  Web3 is built on decentralization, but with decentralization comes a level of
                  complexity. Opportunities for funding and collaboration are scattered across
                  multiple platforms, protocols, and ecosystems.
                </p>
              </div>

              <div className='flex items-center bg-white w-full lg:w-2/5 justify-center py-5 lg:py-0'>
                <Image
                  src={"/about-icons/3d.png"}
                  alt='about icon'
                  width={109.5}
                  height={110.64219665527344}
                />
              </div>
            </div>

            <div className='w-full py-5 mt-20 flex gap-5 lg:gap-20'>
              <ul className='flex flex-col gap-5'>
                <li className='bg-white w-5 h-5 rounded-full p-5'></li>
                <li className='bg-white w-5 h-5 rounded-full p-5'></li>
                <li className='bg-white w-5 h-5 rounded-full p-5'></li>
              </ul>

              <div>
                <small className='font-sans text-[12px]'>DATA-DRIVEN APPROACH</small>
                <h1 className='lg:text-[96px] text-[43px] leading-16 lg:leading-24 font-bold mt-5'>Insights and Transparency</h1>

                <div className='space-y-10 mt-20 pb-10'>
                  <p>
                    A developer could use ClearFund to study how past Gitcoin or Giveth rounds were distributed, which projects received support, and what impact those projects created. This data-driven approach transforms ClearFund into more than a directory; it becomes a decision-making tool that helps builders prioritize opportunities and strategize effectively.
                  </p>
                  <hr />
                  

                  <p>
                    ClearFund is not just about individual success stories. By centralizing, curating, and clarifying the Web3 funding landscape, ClearFund contributes to a stronger, more transparent ecosystem where innovation thrives. It ensures that resources flow efficiently to the builders, creators, and communities who are driving Web3 forward.
                  </p>

                  <p>
                    In practice, this means fewer missed opportunities, less wasted time, and more projects that can reach their potential. It also means funders whether DAOs, protocols, or ecosystems can connect with the right builders more effectively, ensuring that their resources are put to good use.
                  </p>

                  <p>
                    As Web3 continues to grow, the need for tools like ClearFund will only increase. The next wave of innovation will be built not just on decentralized technology but on accessible infrastructure for funding and collaboration. ClearFund is positioned to play a pivotal role in this evolution by expanding coverage of new protocols and ecosystems.
                  </p>
                </div>
              </div>


              
            </div>

            
          </div>

          <div></div>
      </div>
      <Footer />
    </div>
  );
}



`

ClearFund is not just about individual success stories. By centralizing, curating, and clarifying the Web3 funding landscape, ClearFund contributes to a stronger, more transparent ecosystem where innovation thrives. It ensures that resources flow efficiently to the builders, creators, and communities who are driving Web3 forward.

In practice, this means fewer missed opportunities, less wasted time, and more projects that can reach their potential. It also means funders whether DAOs, protocols, or ecosystems can connect with the right builders more effectively, ensuring that their resources are put to good use.

As Web3 continues to grow, the need for tools like ClearFund will only increase. The next wave of innovation will be built not just on decentralized technology but on accessible infrastructure for funding and collaboration. ClearFund is positioned to play a pivotal role in this evolution by expanding coverage of new protocols and ecosystems.



`