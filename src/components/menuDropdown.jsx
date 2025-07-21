import Link from "next/link"

const MenuDropdown = ({openMenu, setOpenMenu, toggle, setToggle}) => {
  return (
    <div className={`md:hidden p-5 bg-white w-full h-screen top-0 fixed z-50  transition-transform
        duration-300 left-0 ease-in-out ${!openMenu ? "-translate-y-full "
            : "translate-y-14 -translate-x-0"} transform`}>

            <ul className="w-full bg-white h-fit space-y-5">
                <li className="hover:bg-white/50 block w-full p-3 rounded-md font-bold font-sans">
                    <Link target="_blank" href={"https://github.com/LighthouseL2/Clearfund"} onClick={() =>setOpenMenu(false)}>Github</Link>
                </li>
                <li className="hover:bg-white/50 block w-full p-3 rounded-md font-bold font-sans">
                    <Link target="_blank" href={"/about"} onClick={() =>setOpenMenu(false)}>About</Link>
                </li>
                <li className="hover:bg-white/50 block w-full p-3 font-bold rounded-md font-sans">
                    <Link target="_blank" href={"/"} onClick={() =>setOpenMenu(false)}>Blog</Link>
                </li>
            </ul>

            <div className="flex justify-center items-center w-full mt-20">
                <Link href="/?route=login"
                    className="w-[159.17px] md:hidden items-center font-sans justify-center
                        font-medium hover:bg-black bg-[#198038] flex
                        text-white text-[16px] h-[52px]  rounded-md" onClick={() => {
                            setOpenMenu(false)
                            setToggle(!toggle)
                        }}>
                        Login / Register
                </Link>
            </div>
    </div>
  )
}

export default MenuDropdown