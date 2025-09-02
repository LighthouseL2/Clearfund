"use client"


import { Dialog, DialogContent,  DialogFooter, DialogHeader, DialogTitle } from './ui/dialog'
import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

import { usePrivy, useWallets } from '@privy-io/react-auth'
import { ethers }from 'ethers'



const LoginForm = ({open, setOpen, blur, setBlur }) => {

    const { login, authenticated, ready } = usePrivy()
    const { wallets } = useWallets()
    const router = useRouter()

    // const handleLogin = async () => {
    //     try {
    //         const result = await signInWithPopup(auth, provider)
    //         const user = result.user


    //         const token = await user.getIdToken()
    //         const decoded = jwtDecode(token)

    //         console.log("Decoded", decoded);

    //         localStorage.setItem("token", token)
    //         router.push("/dashboard")

    //         return { user, token, decoded }
    //     } catch (error) {
    //         console.error("login failed", error);
    //     }
    // }

    useEffect(() => {
        if(ready && authenticated) {
            router.push("/dashboard")
        }
    }, [ready, authenticated, router])



    const handleLoginPrivy = async () => {
        try {
             login()
            
        } catch (error) {
            console.log("Error logging In", error);
        }
    }






    function handleDialog(){
        setOpen(!open)
        // setShowPassword(false)
        // setFormdata(initialFormData)
        setBlur(false)
        // setErrors(null)
    }

  return (
    <Dialog open={open} onOpenChange={handleDialog}>
        <form>

            <DialogContent className={`sm:max-w-[431px] max-w-[387px]
                flex items-center justify-center h-[326px] p-10 bg-white shadow-2xl`}>
                <DialogHeader className={"bg-white"}>
                    <DialogTitle className={"text-center font-bold font-sans text-[14px] text-black/50 hidden"}>Log in</DialogTitle>


                        <div className='mt-16  justify-center items-center hidden'>
                            <Image
                                width={154.32}
                                height={33.07}
                                src={"/projectLogo.png"}
                                alt='clearfund logo'
                            />
                        </div>
                </DialogHeader>


                    <div className='w-[321px]'>
                        {/* <div className='shadow mt-5 border border-black/20 w-full flex px-3 items-center h-[49px] rounded-md mb-6'>


                            <button onClick={handleLogin} className='flex font-sans border-0
                            justify-center w-full items-center outline-0 cursor-pointer'>
                                <div className='flex items-center gap-2'>
                                    <Image
                                        src={"/google.png"}
                                        alt='google logo'
                                        width={23.11}
                                        height={23.11}
                                    />
                                    <span className='text-[14px] font-sans font-medium text-black/60'>
                                    Sign in with Google
                                    </span>
                                </div>
                            </button>
                        </div> */}

                        <div className='shadow mt-5  w-full border border-black/20 flex px-3 items-center h-[49px] rounded-md mb-6'>


                            <button className='flex font-sans border-0
                            justify-center w-full items-center outline-0' onClick={handleLoginPrivy}>
                                <div className='flex items-center gap-2'>
                                    <Image
                                        src={"/ethLogo.png"}
                                        alt='google logo'
                                        width={23.11}
                                        height={23.11}
                                    />
                                    <span className='text-[14px] font-sans font-medium text-black/60'>
                                    Sign in with Privy
                                    </span>
                                </div>
                            </button>
                        </div>
                    </div>

            </DialogContent>
        </form>
    </Dialog>
  )
}

export default LoginForm