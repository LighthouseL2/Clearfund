"use client"


import LoginForm from './LoginForm'
// import SignupForm from './SignupForm'
// import ResetPassword from './ResetPassword'
import { useSearchParams } from "next/navigation";
import Link from 'next/link'

const HeroSection = ({open, setOpen, blur, setBlur}) => {


  const searchParams = useSearchParams()
  const modal = searchParams.get("route")


  return (
    <div className="px-[5%]  flex justify-center items-center mx-auto text-center flex-col">
        <h1 className="mt-[103.5px] lg:w-[53.8rem] text-4xl md:text-[64px] mb-10
           font-sans" style={{fontWeight: 900}}>
          Web3 Funding From <br className='hidden sm:block'/>Past to Active <span className='text-[#7CB53E]'>Opportunities</span>
        </h1>
        <p className="text-[18px] lg:w-[51.55rem] mb-14 font-medium font-sans">
            ClearFund provides clarity and access to Web3 funding by aggregating
            past funding data, active and upcoming funding opportunities in one
            hub. solving the problem of fragmented information.
        </p>


        <Link href="/?route=login"
          className="w-[202.19px] font-sans mb-30 flex items-center justify-center font-semibold
              hover:scale-105 transition-all
             hover:bg-black bg-[#198038] text-white text-[16px] h-[52px] px-8 rounded-md" onClick={() => {
            setOpen(true)
            setBlur(true)
          }}>
            Get started
        </Link>


        {/* <Link
          href="/?route=login"
          className="bg-[#00CD5D] hover:bg-black font-semibold text-white px-8 py-3 rounded-md text-[16px]"
          onClick={() =>setOpen(!open)}
          >
            Get started
        </Link> */}

        {
          modal === "login" ? (
            <LoginForm open={open} setOpen={setOpen} blur={blur} setBlur={setBlur}/>
          ) : modal === "signup" ? (
            <LoginForm open={open}  setOpen={setOpen}/>
          ) : modal === "reset" && (
            <LoginForm open={open}  setOpen={setOpen}/>
          )
        }
    </div>
  )
}

export default HeroSection