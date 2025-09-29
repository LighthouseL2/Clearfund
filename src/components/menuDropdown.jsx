import Link from "next/link"
import { ConnectButton } from "@rainbow-me/rainbowkit"

const MenuDropdown = ({openMenu, setOpenMenu, toggle, setToggle, setModalOpen}) => {
  return (
    <div className={`md:hidden p-5 bg-white w-full h-screen  top-0 fixed z-50  transition-transform
        duration-300 left-0 ease-in-out ${!openMenu ? "-translate-y-full "
            : "translate-y-14 -translate-x-0"} transform`}>

            <ul className="w-full bg-white h-fit space-y-5 font-sans">
                <li className="hover:bg-white/50 block w-full p-3 rounded-md font-bold hover:scale-105 transition-all hover:text-[#198038]">
                    <Link target="_blank" href={"https://github.com/LighthouseL2/Clearfund"} onClick={() =>setOpenMenu(false)}>Github</Link>
                </li>
                <li className="hover:bg-white/50 hover:scale-105 transition-all block hover:text-[#198038] w-full p-3 rounded-md font-bold ">
                    <Link href={"/about"} onClick={() =>setOpenMenu(false)}>About</Link>
                </li>
                <li className="hover:bg-white/50 hover:scale-105 transition-all block hover:text-[#198038] w-full p-3 font-bold rounded-md">
                    <Link target="_blank" href={"https://clearfund.substack.com"} onClick={() =>setOpenMenu(false)}>Blog</Link>
                </li>
            </ul>

            <div className="flex justify-center items-center w-full mt-20">
                {/* <Link href="/?route=login"
                    className="w-[159.17px] md:hidden font-sans hover:scale-105 transition-all hover:text-[#198038] items-center justify-center
                        font-medium hover:bg-black bg-[#198038] flex
                        text-white text-[16px] h-[52px]  rounded-md" onClick={() => {
                            setOpenMenu(false)
                            setToggle(!toggle)
                        }}>
                        Login / Register
                </Link> */}

                {/* <ConnectButton.Custom>
                    {({ account, openConnectModal, openAccountModal, mounted }) => {
                    const connected = mounted && account
        
                    const handleClick = async () => {
                        setModalOpen(true)
                        openConnectModal()
                        setOpenMenu(false)
                        setToggle(!toggle)
                        localStorage.setItem("login", "true")
                        
                    }
        
                    return (
                        <button onClick={handleClick}
                        className='btn bg-[#39B54A] h-[52px]  hover:scale-105 transition-all
                        text-white text-[16px] flex items-center font-sans justify-center
                            font-bold hover:bg-black w-[202.19px] rounded-full'>
                        {connected ? "Connect wallet" : "Connect wallet"}
                        </button>
                    )
                    }}
                </ConnectButton.Custom> */}
            </div>
    </div>
  )
}

export default MenuDropdown