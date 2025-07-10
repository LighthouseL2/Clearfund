"use client"


import Link from "next/link"


const NavHeader = ({toggle, setToggle}) => {
  return (
    <nav className="px-[5%] flex justify-between items-center h-[8vh] sticky top-0 z-50 bg-white ">
        <div className="md:w-[155px] w-[120px] relative flex items-center">
          <Link href="/"><img src="/projectLogo.png" alt="logo" /></Link>
        </div>

        <ul className="md:flex w-[45%] gap-10 hidden items-center">
            <li className="text-[16px]"><Link href={"https://github.com/LighthouseL2/Clearfund"}>Github</Link></li>
            <li className="text-[16px]"><Link href={"/about"}>About</Link></li>
            <li className="text-[16px]"><Link href={"/"}>Blog</Link></li>
        </ul>

         
        <Link href="/?route=login"
          className="w-[202.19px] flex items-center justify-center font-semibold hover:bg-black bg-[#198038] text-white text-[16px] h-[52px] px-8 rounded-md" onClick={() => setToggle(!toggle)}>
            Login / Register
        </Link>
        
    </nav>
  )
}

export default NavHeader