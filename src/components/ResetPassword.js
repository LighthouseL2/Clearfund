"use client"

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Button } from './ui/button'
import { DialogClose } from '@radix-ui/react-dialog'
import { useRouter } from 'next/navigation'


const DeleteAccountDialog = ({open, setOpen, deleteAccount}) => {

    const router = useRouter()
  return (
    <Dialog open={open} onOpenChange={setOpen}>
              <form>

                <DialogContent className={"w-[360px] rounded  sm:w-[32rem] md:ml-30 max-w-[32rem] md:h-[22.73rem] p-8 bg-white"} showCloseButton={false}>
                  <DialogHeader className={"bg-white"}>
                    <DialogTitle className={"text-[18px] text-black/80 font-bold font-sans"}>
                      Are you absolutely sure?
                    </DialogTitle>

                    
                    <DialogDescription className={"text-[14px] text-black/60 font-sans"}>
                        This action cannot be undone. This will permanently
                        delete your account and remove all your data from our servers.
                    </DialogDescription>

                    
                  </DialogHeader>
                  <div className='mt-3'>
                    
                    <p className='text-[14px] font-bold text-black/80'>Please tell us why you’re leaving (optional):</p>


                    <textarea className='w-full h-[5.118rem] border text-[14px] border-black/40 mt-2 p-3
                     text-black/40' placeholder='Your feeback helps us improve'>

                    </textarea>


                  </div>
                  <DialogFooter className={"w-full text-center mt-3 flex"}>
                    <div className='w-full space-y-1 text-[14px] font-medium flex justify-end gap-2'>
                      <DialogClose  className={"w-fit bg-[#D9D9D9] px-5 hover:scale-105 hover:text-white rounded text-black/70 font-sans hover:bg-black  h-[32px]"}>Cancel</DialogClose>
                      <Button className='w-fit h-[32px] px-5 bg-[#DC2828] rounded text-white hover:scale-105 font-sans' onClick={deleteAccount}>Confirm</Button>
                    </div>
                  </DialogFooter>

                </DialogContent>
              </form>
            </Dialog>
  )
}

export default DeleteAccountDialog