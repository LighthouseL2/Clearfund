"use client"


import { MenuIcon, X } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"



const NavHeader = ({ toggle, setToggle, setOpenMenu, openMenu, setBlur }) => {


  const [modalOpen, setModalOpen] = useState(false)
  const router = useRouter()
  // const { isConnected, account } = useAccount()


  useEffect(() => {
    if (modalOpen) {
      // setRedirected(false)
      router.push("/dashboard")
      setModalOpen(false)
    }
  }, [router, modalOpen])



  return (
    <nav className="px-[5%] flex justify-between items-center py-0 mt-0 sticky top-0 z-50 bg-white">
      <div className="md:w-[150px] w-[100px] relative flex items-center justify-center">
        <Link href="/"><img src="/projectLogo.png" alt="logo" /></Link>
      </div>

      <ul className="md:flex md:w-[45%] lg:w-[55%] xl:w-[65%] gap-10 hidden items-center">
        <li><Link className="font-sans font-bold text-[16px] hover:scale-105 transition-all block hover:text-[#198038]" target="_blank" href={"https://github.com/LighthouseL2/Clearfund"}>Github</Link></li>
        <li><Link className="font-sans font-bold text-[16px] hover:scale-105 transition-all block hover:text-[#198038]" href={"/about"}>About</Link></li>
      </ul>


      <Link href={"/grants"} className="w-[159.16796875] h-[52px] bg-[#39B54A] md:flex items-center justify-center text-white
          text-[16px] font-sans rounded-full font-black hidden hover:bg-black ">
        Open App
      </Link>

      <div className="flex items-center md:hidden" onClick={() => setOpenMenu(!openMenu)}>
        {!openMenu ? <MenuIcon /> :
          <X />}
      </div>
    </nav>
  )
}

export default NavHeader