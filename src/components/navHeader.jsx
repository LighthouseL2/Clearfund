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
            <li className="relative">
              <DropdownMenu>
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
              </DropdownMenu>
            </li>
            <li className="text-[16px]">About</li>
            <li className="text-[16px]">Blog</li>
        </ul>

        <div className="flex gap-5 items-center " onClick={() => setToggle(!toggle)}>
            <Link href="/?route=login" className="bg-[#00CD5D] font-semibold hover:bg-black text-white text-[16px] py-2 px-8 rounded-md">Sign in</Link>
        </div>
    </nav>
  )
}

export default NavHeader