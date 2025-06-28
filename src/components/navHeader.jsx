
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu"
import { ChevronDown } from "lucide-react"


const NavHeader = ({toggle, setToggle}) => {
  return (
    <nav className="px-[5%] flex justify-between items-center h-[8vh] sticky top-0 z-50 bg-white shadow">
        <h1 className="text-2xl w-[25%]">ClearFund</h1>

        <ul className="md:flex w-[45%] gap-10 text-xl hidden">
            <li className="relative">
              <DropdownMenu>
                <DropdownMenuTrigger className="outline-none">
                    <div className="flex items-center justify-center">
                      <span>Features</span> <ChevronDown />
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
            <li>About</li>
            <li>Blog</li>
        </ul>

        <div className="flex gap-5 items-center " onClick={() => setToggle(!toggle)}>
            <a href="#" className="bg-green-500 font-semibold hover:bg-purple-900 hover:text-white py-2 px-10 rounded-md">Sign in</a>
        </div>
    </nav>
  )
}

export default NavHeader