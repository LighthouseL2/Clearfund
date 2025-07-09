"use client"


import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu"
import { ChevronDown } from "lucide-react"
import Link from "next/link"


const NavHeader = ({toggle, setToggle}) => {
  return (
    <nav className="px-[5%] flex justify-between items-center h-[8vh] sticky top-0 z-50 bg-white ">
        <div className="md:w-[155px] w-[120px] relative flex items-center">
          {/* <Image
            src={"/projectLogo.png"}
            fill
            alt="logo"
            className="w-full h-auto"
          /> */}
          <Link href="/"><img src="/projectLogo.png" alt="logo" /></Link>
        </div>

        <ul className="md:flex w-[45%] gap-10 hidden items-center">
            <li className="relative text-[16px]">
              {/* <DropdownMenu>
                <DropdownMenuTrigger className="outline-none">
                    <div className="flex items-center justify-center group gap-2">
                      <span className="text-[16px]">Features</span> <ChevronDown className="group-hover:rotate-180 transition-all"/>
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className={"mt-3"}>
                  <DropdownMenuItem>
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    Profile
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu> */}
              <Link href={"/"}>Github</Link>
            </li>
            <li className="text-[16px]"><Link href={"/"}>About</Link></li>
            <li className="text-[16px]"><Link href={"/"}>Blog</Link></li>
        </ul>

         
        <Link href="/?route=login"
          className="w-[202.19px] flex items-center justify-center font-semibold hover:bg-black bg-[#198038] text-white text-[16px] h-[52px] px-8 rounded-md" onClick={() => setToggle(!toggle)}>
            Sign in
        </Link>
        
    </nav>
  )
}

export default NavHeader