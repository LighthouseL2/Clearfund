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



const LoginForm = ({open, setOpen, blur, setBlur }) => {

    // const [showPassword, setShowPassword] = useState(false)
    const [errors, setErrors] = useState(null)

    const [formData, setFormdata] = useState(initialFormData)
    const dispatch = useDispatch()
    const router = useRouter()


    const validate = () => {
        const newErrors = {}

        if(!formData.password) {
            newErrors.password = "Password cannot be empty"
            setErrors("Incorrect email or password, please try again.")
        }

        // if(!formData.password) {
        //     newErrors.password = "Password cannot be empty"
        //     setErrors("Incorrect email or password, please try again.")
        // }

        if(!formData.email.trim()) {
            newErrors.email = "Email is required"
            setErrors("Incorrect email or password, please try again.")
        }else {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            if(!emailRegex.test(formData.email)){
                newErrors.email = "Enter a valid email"
                setErrors("Incorrect email or password, please try again.")
            }
        }

        // setErrors(newErrors)
        console.log(Object.keys(newErrors).length  === 0);
        return errors === null && Object.keys(newErrors).length  === 0
    }

    // const handleSubmit = async () => {
    //     if(validate()){
    //         // api call
    //         await dispatch(loginUser(formData)).then((data) => {
    //             if(data.payload){
    //                 router.push("/dashboard")
    //             }
    //         })
    //     }
    // }

    function handleDialog(){
        setOpen(!open)
        // setShowPassword(false)
        setFormdata(initialFormData)
        setBlur(false)
        setErrors(null)
    }

  return (
    <Dialog open={open} onOpenChange={handleDialog}>
        <form>

            <DialogContent className={`sm:max-w-[507.15234375px] max-w-[387px]
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

                {/* <div className='border-2'> */}
                        
                    <div className='shadow mt-5 shadow-[#00000040] w-[239.978515625px] border-black/30 flex px-3 items-center py-3 rounded-md mb-6'>

                        <Link href={`https://clearfund.onrender.com/api/auth/google`} className='flex font-sans
                           justify-center w-full items-center'>
                            <div className='flex items-center gap-2'>
                                <Image
                                    src={"/google.png"}
                                    alt='google logo'
                                    width={23.11}
                                    height={23.11}
                                />
                                <span className='text-[16px] font-sans font-medium text-black/50'>
                                    Sign in with Google
                                </span>


                            </div>
                        </Link>


                        
                    </div>

                    

                    {/* <div className='border border-black/50 flex opacity-50 px-3 items-center py-3 rounded-md mb-5'>
                        <Link href="#" className='flex gap-1 items-center justify-between w-full'>
                            <div className='flex items-center gap-2'>
                                <svg width="28" height="22" viewBox="0 0 28 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M11.3386 -0.0078125H15.1652C17.4252 -0.0078125 19.2155 -0.00781235 20.616 0.180317C22.0571 0.374595 23.224 0.782824 24.145 1.70257C25.2811 2.83995 25.6439 4.36221 25.7754 6.33818C26.4849 6.64927 27.021 7.30957 27.0788 8.1457C27.085 8.22071 27.085 8.30063 27.085 8.37441V13.1281C27.085 13.2018 27.085 13.2818 27.08 13.3555C27.021 14.1917 26.4849 14.8532 25.7754 15.1655C25.6439 17.1403 25.2811 18.6625 24.145 19.7999C23.224 20.7197 22.0571 21.1279 20.616 21.3222C19.2143 21.5103 17.4252 21.5103 15.1652 21.5103H11.3386C9.07862 21.5103 7.28831 21.5103 5.88779 21.3222C4.44669 21.1279 3.27979 20.7197 2.35882 19.7999C1.43907 18.8789 1.03084 17.712 0.836567 16.2709C0.648438 14.8692 0.648438 13.0801 0.648438 10.8201V10.6824C0.648438 8.42237 0.648438 6.63206 0.836567 5.23154C1.03084 3.79044 1.43907 2.62354 2.35882 1.70257C3.27979 0.782824 4.44669 0.374595 5.88779 0.180317C7.28954 -0.00781235 9.07862 -0.0078125 11.3386 -0.0078125ZM23.9101 15.3623H21.5271C18.8896 15.3623 16.6321 13.3605 16.6321 10.7512C16.6321 8.14201 18.8896 6.14022 21.5259 6.14022H23.9089C23.7687 4.49132 23.4527 3.61952 22.8391 3.00718C22.319 2.48706 21.6058 2.17474 20.3689 2.00874C19.1061 1.83906 17.4399 1.8366 15.0951 1.8366H11.4063C9.0614 1.8366 7.39651 1.83906 6.13125 2.00874C4.8955 2.17474 4.18232 2.48706 3.6622 3.00718C3.14208 3.5273 2.83099 4.24048 2.66499 5.47623C2.49531 6.74026 2.49285 8.40515 2.49285 10.75C2.49285 13.0949 2.49531 14.761 2.66499 16.025C2.83099 17.2608 3.14331 17.9739 3.66343 18.4941C4.18355 19.0142 4.89673 19.3265 6.13371 19.4925C7.39774 19.6622 9.06263 19.6647 11.4075 19.6647H15.0963C17.4412 19.6647 19.1073 19.6622 20.3713 19.4925C21.6071 19.3265 22.3202 19.0142 22.8404 18.4941C23.4539 17.8817 23.7699 17.0112 23.9101 15.361M5.56686 5.83282C5.56686 5.58823 5.66402 5.35366 5.83697 5.18072C6.00991 5.00777 6.24448 4.91061 6.48907 4.91061H11.4075C11.6521 4.91061 11.8866 5.00777 12.0596 5.18072C12.2325 5.35366 12.3297 5.58823 12.3297 5.83282C12.3297 6.0774 12.2325 6.31196 12.0596 6.48491C11.8866 6.65786 11.6521 6.75502 11.4075 6.75502H6.48907C6.24448 6.75502 6.00991 6.65786 5.83697 6.48491C5.66402 6.31196 5.56686 6.0774 5.56686 5.83282ZM24.8397 7.98463H21.5271C19.7762 7.98463 18.4765 9.28678 18.4765 10.7512C18.4765 12.2157 19.7762 13.5179 21.5259 13.5179H24.868C25.1213 13.5019 25.2307 13.331 25.2393 13.2277V8.27481C25.2307 8.17153 25.1213 8.00061 24.868 7.98586L24.8397 7.98463Z" fill="black" fillOpacity="0.5"/>
                            </svg>
                            <span className='text-[14px] font-medium font-sans'>Connect wallet..... Coming soon</span>
                            </div>

                            <span>
                                <svg width="12" height="20" viewBox="0 0 12 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1.82275 18.833L10.5 10.1558L1.82275 1.47852" stroke="#9197B3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>

                            </span>
                        </Link>
                    </div> */}

                    

                    {/* <span className='text-center block text-[16px] font-sans font-medium text-black/50'>or</span> */}

                    {/* <div className='border-b border-black/50 w-full mb-2'>
                        <label htmlFor="email" className='opacity-60 text-[12px] font-sans'>Email</label>
                        <input type="text" className='w-full font-sans outline-none text-[12px] text-black/50'
                            value={formData.email}
                            onChange={(e) => {
                                setFormdata({...formData, email: e.target.value.toLowerCase()})
                                setErrors(null)
                            }}
                        />
                    </div> */}

                    {/* <div className='border-b  border-black/50 w-full relative'>
                        <label htmlFor="password" className='opacity-60 text-[12px] block font-sans'>Password</label>
                        <input type={`${showPassword ? "text" : "password"}`} className='w-[90%] font-sans py-2 outline-none text-[12px] text-black/50'
                            value={formData.password}
                            onChange={(e) => {
                                setFormdata({...formData, password: e.target.value})
                                setErrors(null)
                        }}
                    />
                        <div className='absolute right-0 top-6' onClick={() => setShowPassword(!showPassword)}>
                            <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10.2393 10.5174C10.9433 10.5174 11.6186 10.2377 12.1164 9.73983C12.6143 9.24198 12.894 8.56675 12.894 7.86269C12.894 7.15862 12.6143 6.48339 12.1164 5.98555C11.6186 5.4877 10.9433 5.20801 10.2393 5.20801C9.53521 5.20801 8.85998 5.4877 8.36213 5.98555C7.86428 6.48339 7.58459 7.15862 7.58459 7.86269C7.58459 8.56675 7.86428 9.24198 8.36213 9.73983C8.85998 10.2377 9.53521 10.5174 10.2393 10.5174Z" fill="black" fillOpacity="0.5"/>
                                <path fillRule="evenodd" clipRule="evenodd" d="M0.791421 7.37352C2.10814 3.41716 5.83974 0.5625 10.2403 0.5625C14.6382 0.5625 18.3681 3.41451 19.6865 7.36733C19.7927 7.68766 19.7927 8.03277 19.6865 8.35221C18.3707 12.3086 14.6382 15.1632 10.2385 15.1632C5.84062 15.1632 2.10991 12.3112 0.792306 8.35841C0.685768 8.03876 0.685768 7.69317 0.792306 7.37352M14.8851 7.86287C14.8851 9.09498 14.3957 10.2766 13.5244 11.1479C12.6532 12.0191 11.4715 12.5086 10.2394 12.5086C9.00731 12.5086 7.82566 12.0191 6.95443 11.1479C6.08319 10.2766 5.59374 9.09498 5.59374 7.86287C5.59374 6.63075 6.08319 5.44911 6.95443 4.57787C7.82566 3.70663 9.00731 3.21718 10.2394 3.21718C11.4715 3.21718 12.6532 3.70663 13.5244 4.57787C14.3957 5.44911 14.8851 6.63075 14.8851 7.86287Z" fill="black" fillOpacity="0.5"/>
                            </svg>
                        </div>

                    </div> */}

                    {/* <div className='flex justify-end'>
                        <Link href="/?route=reset" className='underline font-sans text-[12px] font-medium text-black/50 mt-1' >Forgot password</Link>
                    </div> */}

                {/* </div> */}

                {/* {errors &&
                    <p className='text-[#FF3B30] text-[14px] w-[298px] font-sans'> {errors}</p>
                } */}

                {/* <DialogFooter className={`absolute bottom-0 w-full p-5 border border-t-black/30 rounded-b-md`}>
                    <div className='w-full'>
                        
                        <p className='text-[14px] text-black/50 font-sans text-center'>By logging in I agree to the <Link href='/terms' target='_blank' className='text-[#007AFF]'>Terms </Link>& <Link target='_blank' href='/privacy-policy' className='text-[#007AFF]'>Privacy Policy</Link></p>
                    </div>
                </DialogFooter> */}
            </DialogContent>
        </form>
    </Dialog>
  )
}

export default LoginForm