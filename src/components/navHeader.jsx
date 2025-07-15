"use client"


import { Menu } from "lucide-react"
import Link from "next/link"
import { useState } from "react"


const NavHeader = ({toggle, setToggle, setOpenMenu, openMenu}) => {

  return (
    <nav className="px-[5%] flex justify-between items-center h-[8vh] sticky top-0 z-50 bg-white ">
        <div className="md:w-[150px] w-[100px] relative flex items-center">
          <Link href="/"><img src="/projectLogo.png" alt="logo" /></Link>
        </div>

        <ul className="md:flex w-[45%] gap-10 hidden items-center">
            <li><Link className="font-sans text-[16px]" href={"https://github.com/LighthouseL2/Clearfund"}>Github</Link></li>
            <li><Link className="font-sans text-[16px]" href={"/about"}>About</Link></li>
            <li><Link className="font-sans text-[16px]" href={"/"}>Blog</Link></li>
        </ul>

         
        <Link href="/?route=login"
          className="w-[159.17px] flex items-center font-sans justify-center
            font-medium hover:bg-black bg-[#198038]
          text-white text-[16px] h-[52px]  rounded-md" onClick={() => setToggle(!toggle)}>
            Login / Register
        </Link>
        
        <div className="flex items-center gap-5 ">
          <button onClick={() => setOpenMenu(!openMenu)} className="lg:hidden items-center justify-center flex flex-col group w-8 h-8">
            <span
                className={`w-6 h-[3px] bg-black transition-all duration-300 ease-in-out ${openMenu && " rotate-45 translate-y-3"}`}
            />
            <span
                className={`${!toggle && "mt-1"} w-6 h-[3px] bg-black transition-all duration-300 ease-in-out ${openMenu && "opacity-0"}`}
            />
            <span
                className={`${!toggle && "mt-1"} w-6 h-[3px] bg-black transition-all duration-300 ease-in-out ${openMenu && "-rotate-45 -translate-y-0"}`}
            />
          </button>
        </div>
    </nav>
  )
}

export default NavHeader