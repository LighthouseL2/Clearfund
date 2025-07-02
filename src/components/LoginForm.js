"use client"


import { Dialog, DialogContent,  DialogFooter, DialogHeader, DialogTitle } from './ui/dialog'
import { Button } from './ui/button'
import Link from 'next/link'


const LoginForm = ({open, setOpen }) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
        <form>
            
            <DialogContent className={"sm:max-w-[425px] max-w-[400px] p-10 bg-white  shadow-2xl"}>
                <DialogHeader className={"space-y-10 bg-white"}>
                    <DialogTitle className={"text-center  text-3xl"}>Log In</DialogTitle>

                    <div className='space-y-5 flex justify-center flex-col items-center'>
                        <p>Haven&apos;t signed up yet? <Link href="/?route=signup" className='text-blue-600' onClick={(e) => {

                        }}>create account</Link></p>
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
                    <Link href="/?route=reset" className='underline text-xs' >Forgot password</Link>
                    </div>

                </div>
                <DialogFooter className={"w-full text-center"}>
                    <div className='w-full space-y-5'>
                    <Button type={"submit"} className={"w-full block bg-green-500 text-black font-semibold"}>Continue</Button>
                    <p className='text-[14px]'>By logging in I agree to the <a href=""><span className='text-blue-500'>Terms </span>& <span className='text-blue-500'>Privacy Policy</span></a></p>
                    </div>
                </DialogFooter>
            </DialogContent>
        </form>
    </Dialog>
  )
}

export default LoginForm