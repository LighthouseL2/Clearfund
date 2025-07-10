"use client"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Button } from './ui/button'
import { useState } from 'react'
import { DialogClose } from '@radix-ui/react-dialog'
import LoginForm from './LoginForm'
import SignupForm from './SignupForm'
import ResetPassword from './ResetPassword'
import { useSearchParams } from "next/navigation";
import Link from 'next/link'

const HeroSection = ({open, setOpen}) => {

    
    const searchParams = useSearchParams()
    const modal = searchParams.get("route")
//   const [reset, setReset] = useState(false)

  return (
    <div className="px-[5%]  flex justify-center items-center md:w-[85%] mx-auto text-center flex-col">
        <h1 className="capitalize mt-[203.5px] text-3xl md:text-[64px] mb-10 font-bold">Track Previous Grants. Find New Ones. Get Real-Time Alerts.</h1>
        <p className="text-[20px] md:w-[78%]  mb-14">
            Explore past grant data, discover impactful ReFi projects, find
            new funding opportunities, and stay updated with real-time alerts
            from leading Web3 grant platforms.
        </p>


        <Link href="/?route=login"
          className="w-[202.19px] mb-30 flex items-center justify-center font-semibold hover:bg-black bg-[#198038] text-white text-[16px] h-[52px] px-8 rounded-md" onClick={() => setOpen(!open)}>
            Get started
        </Link>

        
        {/* <Link
          href="/?route=login"
          className="bg-[#00CD5D] hover:bg-black font-semibold text-white px-8 py-3 rounded-md text-[16px]"
          onClick={() =>setOpen(!open)}
          >
            Get started
        </Link> */}

        {
          modal === "login" ? (
            <LoginForm open={open} setOpen={setOpen} />
          ) : modal === "signup" ? (
            <SignupForm open={open}  setOpen={setOpen}/>
          ) : modal === "reset" && (
            <ResetPassword open={open}  setOpen={setOpen}/>
          )
        }
    </div>
  )
}

export default HeroSection