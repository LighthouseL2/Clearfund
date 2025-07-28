"use client"


import LoginForm from './LoginForm'
import SignupForm from './SignupForm'
import ResetPassword from './ResetPassword'
import { useSearchParams } from "next/navigation";
import Link from 'next/link'

const HeroSection = ({open, setOpen, blur, setBlur}) => {


  const searchParams = useSearchParams()
  const modal = searchParams.get("route")


  return (
    <div className="px-[5%]  flex justify-center items-center md:w-[85%] mx-auto text-center flex-col">
        <h1 className="capitalize mt-[103.5px] md:w-[50rem] text-4xl md:text-[64px] mb-10 font-extrabold font-sans">
          See Where Public Goods Funding Flows <span className='text-[#7CB53E]'>in Web3</span>
        </h1>
        <p className="text-[18px] md:w-[49.704rem] mb-14 font-sans">
            ClearFund is a Web3 grant archive that brings
            together past funding data from Gitcoin, Giveth, Octant,
            and others. solving the problem of fragmented information in one place.
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
            <SignupForm open={open}  setOpen={setOpen}/>
          ) : modal === "reset" && (
            <ResetPassword open={open}  setOpen={setOpen}/>
          )
        }
    </div>
  )
}

export default HeroSection