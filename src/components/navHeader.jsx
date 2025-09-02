"use client"


import { Menu, MenuIcon, X } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { usePrivy } from '@privy-io/react-auth'


const NavHeader = ({toggle, setToggle, setOpenMenu, openMenu, setBlur}) => {

  const { login } = usePrivy()

  return (
    <nav className="px-[5%] flex justify-between items-end py-4 sticky top-0 z-50 bg-white ">
        <div className="md:w-[150px] w-[100px] relative flex items-center">
          <Link href="/"><img src="/projectLogo.png" alt="logo" /></Link>
        </div>

        <ul className="md:flex md:w-[45%] lg:w-[55%] xl:w-[65%] gap-10 hidden items-center">
            <li><Link className="font-sans font-bold text-[16px] hover:scale-105 transition-all block hover:text-[#198038]" target="_blank" href={"https://github.com/LighthouseL2/Clearfund"}>Github</Link></li>
            <li><Link className="font-sans font-bold text-[16px] hover:scale-105 transition-all block hover:text-[#198038]" href={"/about"}>About</Link></li>
            <li><Link className="font-sans font-bold text-[16px] hover:scale-105 transition-all block hover:text-[#198038]" target="_blank" href={"https://clearfund.substack.com"}>Blog</Link></li>
        </ul>


        <button
          className="w-[159.17px] md:flex items-center font-sans justify-center
            font-bold hover:bg-black bg-[#198038] hidden hover:scale-105 transition-all
          text-white text-[16px] h-[52px]  rounded-md" onClick={login}>
            Login / Register
        </button>

        <div className="flex items-center md:hidden" onClick={() => setOpenMenu(!openMenu)}>
          {/* <button onClick={() => setOpenMenu(!openMenu)} className="lg:hidden border-0 items-center justify-center flex flex-col group w-8 h-8">
            <span
                className={`w-6 h-[3px] bg-black transition-all duration-300 ease-in-out ${openMenu && " rotate-45 translate-y-3"}`}
            />
            <span
                className={`${!toggle && "mt-1"} w-6 h-[3px] bg-black transition-all duration-300 ease-in-out ${openMenu && "opacity-0"}`}
            />
            <span
                className={`${!toggle && "mt-1"} w-6 h-[3px] bg-black transition-all duration-300 ease-in-out ${openMenu && "-rotate-45 -translate-y-0"}`}
            />
          </button> */}
          {!openMenu ? <MenuIcon /> :
          <X />}
        </div>
    </nav>
  )
}

export default NavHeader