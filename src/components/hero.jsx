"use client"


import LoginForm from './LoginForm'
// import SignupForm from './SignupForm'
// import ResetPassword from './ResetPassword'
import { useSearchParams } from "next/navigation";
import Link from 'next/link'
import { usePrivy } from '@privy-io/react-auth';
// import CustomPrivyModal from './CustomPrivyModal';
import { useState } from 'react';

const HeroSection = () => {

  // const [ isOpen, setIsOpen ] = useState(false)
  const { login, user, connectWallet } = usePrivy()

  async function handleLogin() {
    try {
      login()
      if(user) window.location.href = "/dashboard"
    } catch (error) {
      console.error("login Failed", error)
    }
  }

  return (
    <div className="px-[5%]  flex justify-center items-center mx-auto text-center flex-col">
        <h1 className="mt-[103.5px] lg:w-[53.8rem] font-extrabold text-4xl md:text-[64px] mb-10">
          Track Grants. Discover   <br className='hidden sm:block'/>Open <span className='text-[#7CB53E]'>Applications.</span>
        </h1>
        <p className="text-[18px] md:text-[20px] lg:w-[60.8rem] mb-14 font-medium font-sans">
            ClearFund provides clarity and access to Web3 funding by aggregating past
             <br className='hidden lg:block'/>funding data, open and upcoming funding opportunities
             in one place.
        </p>


        <button
          className="w-[202.19px] mb-30 flex items-center justify-center font-semibold
              hover:scale-105 transition-all
             hover:bg-black bg-[#198038] text-white text-[16px] h-[52px] px-8 rounded-md"
             onClick={handleLogin}>
            Get started
        </button>


        {/* <Link
          href="/?route=login"
          className="bg-[#00CD5D] hover:bg-black font-semibold text-white px-8 py-3 rounded-md text-[16px]"
          onClick={() =>setOpen(!open)}
          >
            Get started
        </Link> */}

        {/* {
          modal === "login" ? (
            <LoginForm open={open} setOpen={setOpen} blur={blur} setBlur={setBlur}/>
          ) : modal === "signup" ? (
            <LoginForm open={open}  setOpen={setOpen}/>
          ) : modal === "reset" && (
            <LoginForm open={open}  setOpen={setOpen}/>
          )
        } */}

        {/* <CustomPrivyModal isOpen={isOpen}/> */}
    </div>
  )
}

export default HeroSection