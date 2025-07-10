"use client"

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Button } from './ui/button'
import { DialogClose } from '@radix-ui/react-dialog'
import { useRouter } from 'next/navigation'


const ResetPassword = ({open, setOpen}) => {

    const router = useRouter()
  return (
    <Dialog open={open} onOpenChange={setOpen}>
              <form>
                
                <DialogContent className={"sm:max-w-[400px] max-w-[489px] h-[343px] px-15 py-10 bg-white"} showCloseButton={false}>
                  <DialogHeader className={"bg-white"}>
                    <DialogTitle className={"text-[16px] text-black/50 font-bold font-sans"}>Reset your password</DialogTitle>

                    
                    <DialogDescription className={"text-[12px] text-black/50 mt-1 font-sans"}>
                        Enter your email and we will send you a password reset link
                    </DialogDescription>

                    
                  </DialogHeader>
                  <div className='mt-5'>
                    

                    <div className='border-b border-black w-full space-y-2'>
                      <label htmlFor="email" className='text-black/50 text-[12px] font-sans block'>Your Email</label>
                      <input type="text" className='w-full outline-none font-sans text-[16px] text-black/50'
                        // placeholder='writeprovidence@gmail.com'
                      />
                    </div>


                  </div>
                  <DialogFooter className={"w-full text-center mt-5"}>
                    <div className='w-full space-y-1 text-[16px] font-medium'>
                      <Button type={"submit"} className={"w-full block bg-[#198038] font-sans hover:bg-black text-white h-12"}>Reset Password</Button>
                      <DialogClose className='w-full h-12 rounded-md hover:scale-105 text-black/50 font-sans' onClick={() => router.push("/") }>cancel</DialogClose>
                    </div>
                  </DialogFooter>

                </DialogContent>
              </form>
            </Dialog>
  )
}

export default ResetPassword