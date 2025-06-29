"use client"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Button } from './ui/button'
import { useState } from 'react'

const HeroSection = ({open, setOpen}) => {

  const [login, setLogin] = useState(true)

  return (
    <div className="px-[5%] h-[80vh] flex justify-center items-center md:w-[85%] mx-auto text-center flex-col space-y-10">
        <h1 className="capitalize text-3xl md:text-6xl font-extrabold tracking-wide ">Track Previous grants. explore new ones. get real-time Alerts.</h1>
        <p className="text-xl md:w-[60%]">
            Explore past grants data, find new funding oppourtunities and stay updated with real-time
            alerts from Web3 grants platforms
        </p>

        {/* <button className="bg-[#00CD5D] font-semibold text-black px-5 py-3 rounded-md" onClick={() =>setToggle(!toggle)}>
          Get started
        </button> */}

        {
          login ? (
            <Dialog>
          <form action="">
            <DialogTrigger asChild>
              <button className="bg-[#00CD5D] font-semibold text-black px-5 py-3 rounded-md" onClick={() =>setOpen(!open)}>
                Get started
              </button>
            </DialogTrigger>
            <DialogContent className={"sm:max-w-[425px] max-w-[400px] p-10 bg-white"}>
              <DialogHeader className={"space-y-10 bg-white"}>
                <DialogTitle className={"text-center  text-3xl"}>Log In</DialogTitle>

                <div className='space-y-5 flex justify-center flex-col items-center'>
                    <p>Haven't signed up yet? <a href="#" className='text-blue-600' onClick={() => setLogin(false)}>create account</a></p>
                    <span>ClearFund</span>
                </div>

                
              </DialogHeader>
              <div className='space-y-5'>
                <div className='border border-black flex justify-center items-center py-3 rounded-md opacity-50'>
                    <a href="#" className=''>Connect Wallet... Comming soon</a>
                </div>

                <div className='border border-black flex justify-center items-center py-3 rounded-md'>
                    <a href="">Log in with Google</a>
                </div>

                <span className='text-center block'>or</span>

                <div className='border-b border-black w-full'>
                  <label htmlFor="email" className='opacity-60'>Email</label>
                  <input type="text" className='w-full outline-none'/>
                </div>

                <div className='border-b border-black w-full'>
                  <label htmlFor="password" className='opacity-60'>Password</label>
                  <input type="password" className='w-full outline-none'/>
                </div>

                <div className='flex justify-end'>
                  <a href="" className='underline text-xs'>Forgot password</a>
                </div>

              </div>
              <DialogFooter className={"w-full text-center"}>
                <div className='w-full space-y-5'>
                  <Button className={"w-full block bg-green-500 text-black font-semibold"}>Continue</Button>
                  <p className='text-[14px]'>By logging in I agree to the <a href=""><span className='text-blue-500'>Terms </span>& <span className='text-blue-500'>Privacy Policy</span></a></p>
                </div>
              </DialogFooter>
            </DialogContent>
          </form>
        </Dialog>
          ) : (

            <Dialog>
          <form action="">
            <DialogTrigger asChild>
              <button className="bg-[#00CD5D] font-semibold text-black px-5 py-3 rounded-md" onClick={() =>setOpen(!open)}>
                Get started
              </button>
            </DialogTrigger>
            <DialogContent className={"sm:max-w-[425px] max-w-[400px] p-10 bg-white"}>
              <DialogHeader className={"space-y-10 bg-white"}>
                <DialogTitle className={"text-center  text-3xl"}>Sign up</DialogTitle>

                <div className='space-y-5 flex justify-center flex-col items-center'>
                    <p>or <a href="#" className='text-blue-600' onClick={() => setLogin(true)}>log in your account</a></p>
                    <span>ClearFund</span>
                </div>

                
              </DialogHeader>
              <div className='space-y-5'>
                <div className='border border-black flex justify-center items-center py-3 rounded-md opacity-50'>
                    <a href="#" className=''>Connect Wallet... Comming soon</a>
                </div>

                <div className='border border-black flex justify-center items-center py-3 rounded-md'>
                    <a href="">Sign up with Google</a>
                </div>

                <span className='text-center block'>or</span>

                <div className='border-b border-black w-full'>
                  <label htmlFor="email" className='opacity-60'>Email</label>
                  <input type="text" className='w-full outline-none'/>
                </div>

                <div className='border-b border-black w-full'>
                  <label htmlFor="password" className='opacity-60'>Password</label>
                  <input type="password" className='w-full outline-none'/>
                </div>

                <div className='flex justify-end'>
                  <a href="#" className='underline text-xs'>Forgot password</a>
                </div>

              </div>
              <DialogFooter className={"w-full text-center"}>
                <div className='w-full space-y-5'>
                  <Button className={"w-full block bg-green-500 text-black font-semibold"}>Sign up</Button>
                  <p className='text-[14px]'>By signing up you agree with our <a href=""><span className='text-blue-500'>Terms </span>& <span className='text-blue-500'>Privacy Policy</span></a></p>
                </div>
              </DialogFooter>
            </DialogContent>
          </form>
        </Dialog>
          )
        }
    </div>
  )
}

export default HeroSection