"use client"


import { Dialog, DialogContent,  DialogFooter, DialogHeader, DialogTitle } from './ui/dialog'
import { Button } from './ui/button'
import Link from 'next/link'
import Image from 'next/image'
import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'
import { initialFormData } from '@/lib/config'
import { loginUser } from '@/features/user/userSlice'
import { signInWithPopup } from 'firebase/auth'
import { auth, provider } from '@/lib/firebase'



const LoginForm = ({open, setOpen, blur, setBlur }) => {

    // const [showPassword, setShowPassword] = useState(false)
    // const [errors, setErrors] = useState(null)

    // const [formData, setFormdata] = useState(initialFormData)
    // const dispatch = useDispatch()
    const router = useRouter()


    // const validate = () => {
    //     const newErrors = {}

    //     if(!formData.password) {
    //         newErrors.password = "Password cannot be empty"
    //         setErrors("Incorrect email or password, please try again.")
    //     }

    //     if(!formData.password) {
    //         newErrors.password = "Password cannot be empty"
    //         setErrors("Incorrect email or password, please try again.")
    //     }

    //     if(!formData.email.trim()) {
    //         newErrors.email = "Email is required"
    //         setErrors("Incorrect email or password, please try again.")
    //     }else {
    //         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    //         if(!emailRegex.test(formData.email)){
    //             newErrors.email = "Enter a valid email"
    //             setErrors("Incorrect email or password, please try again.")
    //         }
    //     }

    //     // setErrors(newErrors)
    //     console.log(Object.keys(newErrors).length  === 0);
    //     return errors === null && Object.keys(newErrors).length  === 0
    // }

    const handleLogin = async () => {
        try {
            await signInWithPopup(auth, provider)
            router.push("/dashboard")
        } catch (error) {
            console.error("login failed", error);
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
                flex items-center justify-center h-[289.390625px] p-10 bg-white shadow-2xl`}>
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


                    <div className='shadow mt-5 shadow-[#00000040] w-[239.978515625px] border-black/30 flex px-3 items-center h-[55.2138671875px] rounded-md mb-6'>


                        <button onClick={handleLogin} className='flex font-sans border-0
                           justify-center w-full items-center outline-0 cursor-pointer'>
                            <div className='flex items-center gap-2'>
                                <Image
                                    src={"/google.png"}
                                    alt='google logo'
                                    width={23.11}
                                    height={23.11}
                                />
                                <span className='text-[16px] font-sans font-medium text-black/60'>
                                   Sign in with Google
                                </span>
                            </div>
                        </button>
                    </div>
            </DialogContent>
        </form>
    </Dialog>
  )
}

export default LoginForm