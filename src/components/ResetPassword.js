"use client"

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Button } from './ui/button'
import { useState } from 'react'
import { DialogClose } from '@radix-ui/react-dialog'
import { useRouter } from 'next/navigation'


const ResetPassword = ({open, setOpen}) => {

    const router = useRouter()
  return (
    <Dialog open={open} onOpenChange={setOpen}>
              <form >
                
                <DialogContent className={"sm:max-w-[425px] max-w-[400px] p-10 bg-white"} showCloseButton={false}>
                  <DialogHeader className={"space-y-10 bg-white"}>
                    <DialogTitle className={"text-3xl"}>Reset your password</DialogTitle>

                    
                    <DialogDescription>
                        Enter your email and we will send you a password reset link
                    </DialogDescription>

                    
                  </DialogHeader>
                  <div className='space-y-5'>
                    

                    <div className='border-b border-black w-full space-y-10'>
                      <label htmlFor="email" className='opacity-60 text-[14px]'>Email</label>
                      <input type="text" className='w-full outline-none '
                        placeholder='writeprovidence@gmail.com'
                      />
                    </div>

                    

                  </div>
                  <DialogFooter className={"w-full text-center mt-10"}>
                    <div className='w-full space-y-5'>
                      <Button type={"submit"} className={"w-full block bg-green-500 text-black font-semibold"}>Submit</Button>
                      <DialogClose className='hover:bg-red-500 w-full py-2 rounded-md hover:text-white' onClick={() => router.back() }>cancel</DialogClose>
                    </div>
                  </DialogFooter>
                  
                </DialogContent>
              </form>
            </Dialog>
  )
}

export default ResetPassword