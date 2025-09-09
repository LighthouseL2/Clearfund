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

      <div className='h-screen w-full bg-black mt-20'>

      </div>
      <Footer />
    </div>
  );
}



`
 By aggregating funding opportunities, ClearFund helps developers, startups, innovators, and community members to find relevant opportunities to innovate and grow.

`