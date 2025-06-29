"use client"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Button } from './ui/button'
import { useState } from 'react'
import { DialogClose } from '@radix-ui/react-dialog'
import LoginForm from './LoginForm'
import SignupForm from './SignupForm'
import ResetPassword from './ResetPassword'
import { useSearchParams } from "next/navigation";

const HeroSection = ({open, setOpen}) => {

    // const [login, setLogin] = useState("login")
    const searchParams = useSearchParams()
    const modal = searchParams.get("route")
//   const [reset, setReset] = useState(false)

  return (
    <div className="px-[5%] h-[80vh] flex justify-center items-center md:w-[85%] mx-auto text-center flex-col space-y-10">
        <h1 className="capitalize text-3xl md:text-6xl font-extrabold tracking-wide ">Track Previous grants. explore new ones. get real-time Alerts.</h1>
        <p className="text-xl md:w-[60%]">
            Explore past grants data, find new funding oppourtunities and stay updated with real-time
            alerts from Web3 grants platforms
        </p>

        <Button className="bg-[#00CD5D] font-semibold text-black px-8 py-6 rounded-md" onClick={() =>setOpen(!open)}>
          Get started
        </Button>

        {
          modal === "login" ? (
            <LoginForm open={open} setOpen={setOpen} />
          ) : modal === "signup" ? (
            <SignupForm open={open}  setOpen={setOpen}/>
          ) : modal === "reset" && (
            <ResetPassword open={open}  setOpen={setOpen}/>
          )
        }
        {/* { modal === "login" && <LoginForm open={open} setOpen={setOpen}/>}
        { modal === "signup" && <SignupForm open={open} setOpen={setOpen}/>}
        { modal === "reset" && <ResetPassword open={open} setOpen={setOpen}/>} */}
    </div>
  )
}

export default HeroSection