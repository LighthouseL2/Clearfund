
"use client"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Button } from './ui/button'
import { useState } from 'react'
import { DialogClose } from '@radix-ui/react-dialog'
import Link from 'next/link'



const SignupForm = ({ open, setOpen}) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
              <form >
                {/* <DialogTrigger asChild>
                  <button className="bg-[#00CD5D] font-semibold text-black px-5 py-3 rounded-md" onClick={() =>setOpen(!open)}>
                    Get started
                  </button>
                </DialogTrigger> */}
                <DialogContent className={"sm:max-w-[425px] max-w-[400px] p-10 bg-white"}>
                  <DialogHeader className={"space-y-10 bg-white"}>
                    <DialogTitle className={"text-center  text-3xl"}>Sign up</DialogTitle>

                    <div className='space-y-5 flex justify-center flex-col items-center'>
                        <p>or <Link href="/?route=login" className='text-blue-600'>log in to your account</Link></p>
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

                    {/* <div className='flex justify-end'>
                      <a href="#" className='underline text-xs'>Forgot password</a>
                    </div> */}

                  </div>
                  <DialogFooter className={"w-full text-center mt-5"}>
                    <div className='w-full space-y-5'>
                      <Button type={"submit"} className={"w-full block bg-green-500 text-black font-semibold"}>Sign up</Button>
                      <p className='text-[14px]'>By signing up you agree with our <a href=""><span className='text-blue-500'>Terms </span>& <span className='text-blue-500'>Privacy Policy</span></a></p>
                    </div>
                  </DialogFooter>
                </DialogContent>
              </form>
            </Dialog>
  )
}

export default SignupForm