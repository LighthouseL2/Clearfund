"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"


const Footer = () => {

    let today = new Date().getUTCFullYear()
    const [ email, setEmail ] = useState("")
    const router = useRouter()


    function handleSubscribe(e){
        e.preventDefault()
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

        if(!email){
            alert("email empty")
            return false
        }
        if(!emailRegex.test(email)){
            alert("email invalid")
            return false
        }
        let emailArray = email.split("@")
        let domain = emailArray[1]
        let username = emailArray[0]

        router.push(`https://substack.com/sign-in?redirect=https%3A%2F%2Fclearfund.substack.com%2F&for_pub
            =clearfund&email=${username}%40${domain}&change_user=false`)
        return true
    }
    
  return (
    <footer className="bg-white pt-[5%] px-[5%] pb-5 text-black">
        <div className="w-full  flex  justify-between flex-wrap">
            <div className="lg:w-2/3 w-full mt-10 md:mt-0">
                {/* <div className="w-[155px] relative flex items-center mb-10">
                    <a href=""><img src="/projectLogo.png" alt="logo" /></a>
                </div> */}

                <h2 className="text-[24px] font-sans text-[#202224] font-bold">Stay Updated</h2>
                <p className="mb-2 text-[#202224] font-sans text-[14px]">
                    Get notified about new updates on public good funding
                </p>
                <form className="border-2 border-[#00C2FF] h-[45.33984375px] rounded-md w-full sm:w-5/6 bg-[#EEEEEE]  md:w-4/6 lg:w-[44%] flex mb-2">
                    <input type="text" className="outline-none w-2/3 p-5 font-sans text-[16px] text-black/70 "
                        placeholder="Type your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value) }/>
                    <button onClick={handleSubscribe} className="w-1/3 bg-[#00C2FF] text-[16px] text-white font-sans border-0">Subscribe</button>
                </form>

                <div className="sm:w-5/6 md:w-4/6 lg:w-[44%] text-center">
                    <p className="mb-20 text-center text-black/40 w-full px-5 text-[12px]
                    leading-3 font-sans">
                        By subscribing you agree to <Link href={"https://substack.com/tos"} className="underline">
                        Substack’s Terms of Use, our</Link><Link className="underline" href={"https://substack.com/privacy"}> privacy policy</Link>{" "}
                         and <Link href={"https://substack.com/ccpa#personal-data-collected"} className="underline"> our information collection notice</Link>
                    </p>
                </div>

            </div>

            <div className="w-full lg:w-1/4">
                {/* socials */}
                <div className="flex gap-10 mb-14">
                    <Link href={"https://x.com/Clear_Fund"} target="_blank" className="hover:scale-110 transition-all">
                        <svg width="22" height="24" viewBox="0 0 22 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M21.6508 21.5777L14.684 10.6364L21.5046 3.13399C21.7439 2.86421 21.8673 2.51097 21.8479 2.15085C21.8285 1.79073 21.668 1.45277 21.4011 1.21022C21.1342 0.967673 20.7825 0.840098 20.4221 0.855152C20.0618 0.870207 19.722 1.02668 19.4762 1.29064L13.1638 8.23916L8.85928 1.4768C8.73558 1.2823 8.56481 1.12214 8.36278 1.01114C8.16075 0.900149 7.93399 0.841903 7.70348 0.841797H2.22141C1.97591 0.84191 1.73494 0.907969 1.52369 1.03307C1.31245 1.15817 1.13869 1.33771 1.02057 1.55294C0.902453 1.76816 0.844318 2.01116 0.852241 2.25654C0.860164 2.50192 0.933854 2.74067 1.06561 2.94782L8.0324 13.8891L1.20723 21.3916C1.08365 21.5243 0.987656 21.6803 0.924796 21.8504C0.861937 22.0205 0.833468 22.2014 0.841038 22.3826C0.848609 22.5638 0.89207 22.7417 0.968901 22.906C1.04573 23.0703 1.1544 23.2177 1.28862 23.3396C1.42284 23.4616 1.57993 23.5557 1.75079 23.6166C1.92165 23.6774 2.10289 23.7037 2.28399 23.6939C2.46509 23.6842 2.64245 23.6386 2.8058 23.5598C2.96915 23.481 3.11524 23.3706 3.23559 23.2349L9.55254 16.2864L13.8571 23.0487C13.9808 23.2432 14.1516 23.4034 14.3536 23.5144C14.5556 23.6254 14.7824 23.6836 15.0129 23.6838H20.495C20.7405 23.6836 20.9815 23.6176 21.1927 23.4925C21.4039 23.3674 21.5777 23.1878 21.6958 22.9726C21.8139 22.7574 21.8721 22.5144 21.8641 22.269C21.8562 22.0236 21.7825 21.7849 21.6508 21.5777ZM15.7655 20.9427L4.71804 3.58283H6.95084L17.9984 20.9427H15.7655Z" fill="#202224"/>
                        </svg>

                    </Link>

                    <Link href={"https://t.me/+fU2kPPjZ50MxMTE0"} target="_blank" className="hover:scale-110 transition-all">
                        <svg width="30" height="25" viewBox="0 0 30 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M27.1835 0.278754L1.18704 10.3554C0.14089 10.8247 -0.212945 11.7644 0.934182 12.2744L7.6034 14.4048L23.7287 4.38751C24.6092 3.75865 25.5106 3.92634 24.7349 4.61813L10.8855 17.2227L10.4504 22.5569C10.8534 23.3806 11.5912 23.3844 12.0618 22.975L15.8935 19.3307L22.4558 24.2701C23.98 25.1771 24.8093 24.5918 25.1373 22.9294L29.4416 2.44263C29.8885 0.396355 29.1264 -0.505254 27.1835 0.278754Z" fill="#202224"/>
                        </svg>

                    </Link>

                    <Link href={"https://www.youtube.com/@Clearfundlive"} target="_blank" className="hover:scale-110 transition-all">
                        <svg width="36" height="28" viewBox="0 0 36 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18.4163 0.296875C19.3282 0.301998 21.6096 0.324197 24.0344 0.421532L24.8951 0.4591C27.3353 0.573511 29.7738 0.771596 30.9845 1.108C32.5982 1.56223 33.8653 2.88394 34.2939 4.56083C34.9769 7.22474 35.0623 12.4194 35.0726 13.6779L35.0743 13.9374V14.2346C35.0623 15.4931 34.9769 20.6894 34.2939 23.3516C33.8601 25.0336 32.5914 26.357 30.9845 26.8044C29.7738 27.1408 27.3353 27.3389 24.8951 27.4533L24.0344 27.4926C21.6096 27.5882 19.3282 27.6121 18.4163 27.6156L18.015 27.6173H17.5796C15.65 27.6053 7.57969 27.5182 5.01141 26.8044C3.39941 26.3502 2.13064 25.0285 1.70202 23.3516C1.01897 20.6877 0.933586 15.4931 0.92334 14.2346V13.6779C0.933586 12.4194 1.01897 7.22303 1.70202 4.56083C2.13576 2.87881 3.40453 1.5554 5.01312 1.10971C7.57969 0.39421 15.6517 0.307121 17.5813 0.296875H18.4163ZM14.5827 7.98122V19.9346L24.8285 13.9579L14.5827 7.98122Z" fill="#202224"/>
                        </svg>

                    </Link>

                    <Link href={"https://clearfund.substack.com"} target="_blank" className="hover:scale-110 transition-all">
                        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="26.6596" height="26.7266" transform="matrix(1 0 0 -1 0.753906 27.3203)" fill="#202224"/>
                            <path d="M20.1472 14.819C20.1422 13.4604 20.138 12.1017 20.1344 10.7428C20.1318 9.47043 20.1344 8.19809 20.1302 6.92999C20.1302 6.85365 20.2065 6.72217 20.0374 6.70627C18.9906 7.40535 17.943 8.10425 16.8947 8.80298C16.4107 9.12477 15.9209 9.43915 15.4342 9.75723C15.4103 9.75007 15.3849 9.75007 15.361 9.75723C15.1829 9.84153 15.0318 9.96929 14.8632 10.0695C14.6883 10.1872 14.5054 10.2937 14.3389 10.422C14.1725 10.5503 14.0352 10.5413 13.8645 10.422C13.1578 9.93165 12.4299 9.47255 11.711 8.99913C11.6087 8.9318 11.5096 8.85758 11.3829 8.84009L8.71891 7.09062C8.52117 6.96127 8.32449 6.83085 8.11084 6.69037C8.03238 6.84464 8.09653 6.99732 8.05783 7.13515C8.0175 7.25198 7.99951 7.37535 8.00481 7.49883C7.99686 9.8903 8.01489 12.2818 7.99951 14.6732C7.99951 14.7634 7.99951 14.8498 8.06843 14.9187C8.61501 14.9235 9.16105 14.9319 9.70763 14.9325C13.0949 14.9325 16.4816 14.9325 19.8678 14.9325C19.9674 14.9277 20.1095 14.9956 20.1472 14.819Z" fill="white"/>
                            <path d="M20.1397 21.1536L20.1461 19.7482C20.1625 19.7273 20.1701 19.7008 20.1673 19.6743C20.1644 19.6478 20.1513 19.6236 20.1307 19.6067C20.0533 19.5468 19.9621 19.5643 19.8752 19.5643C16.0338 19.5643 12.1922 19.5643 8.35045 19.5643C8.27358 19.5643 8.19141 19.5399 8.11931 19.5934L8.06152 19.6427V21.1536C8.14476 21.2512 8.25715 21.2019 8.35469 21.2019C11.9483 21.205 15.5425 21.2059 19.1372 21.2045C19.4262 21.2045 19.7151 21.2453 20.004 21.2045C20.0544 21.1982 20.1153 21.2241 20.1397 21.1536Z" fill="white"/>
                            <path d="M8.05641 17.4166C8.06134 17.4339 8.06489 17.4517 8.06701 17.4696C8.09193 18.0527 8.09193 18.0527 8.66713 18.0527H19.7296C19.8616 18.0527 19.9947 18.049 20.1261 18.0474C20.1286 17.588 20.1314 17.1285 20.1346 16.6691C20.1346 16.597 20.1346 16.527 20.0752 16.475C19.9803 16.4024 19.8706 16.44 19.7688 16.44C16.0578 16.4379 12.3486 16.4379 8.64116 16.44C8.47416 16.44 8.30823 16.4061 8.14123 16.4284C7.91857 16.5874 8.03043 16.7968 8.05694 16.993C7.98749 17.1335 8.10147 17.275 8.05641 17.4166Z" fill="white"/>
                        </svg>
                    </Link>


                </div>

                <div className="flex justify-between ">
                    <div>
                        <h3 className="uppercase mb-3 font-sans font-bold text-[16px]">Application</h3>
                        <ul className="space-y-3 font-sans text-black/70 text-[15px]">
                            <li><Link className="font-sans font-semibold hover:scale-105 transition-all block hover:text-[#198038]" href={"/about"}>
                                About</Link></li>
                            <li><Link className="font-sans font-semibold hover:scale-105 transition-all block hover:text-[#198038]" href={"/faq"}>
                                FAQ</Link></li>
                            <li><Link className="font-sans font-semibold hover:scale-105 transition-all block hover:text-[#198038]" href={"https://clearfund.substack.com"} target="_blank">
                                Blog</Link></li>
                            <li><Link className="font-sans font-semibold hover:scale-105 transition-all block hover:text-[#198038]" target="_blank" href={"https://docs.google.com/forms/d/e/1FAIpQLSen8RTa49H2W_8VUgX-Z-5i08LUjLf1x0Cey_1aB9dAs6qkFA/viewform?usp=header"}>
                                Contact
                            </Link></li>
                            <li><Link className="font-sans font-semibold hover:scale-105 transition-all block hover:text-[#198038]" target="_blank" href={"https://github.com/LighthouseL2/Clearfund"}>
                                Github
                            </Link></li>
                        </ul>
                    </div>


                    <div>
                        <h3 className="uppercase mb-3 font-bold text-[16px] font-sans">RESOURCES </h3>
                        <ul className="space-y-3 text-black/70 text-[15px]">
                            <li><Link className="font-sans font-semibold hover:scale-105 transition-all block hover:text-[#198038]" href={"/connect-with-us"}>Connect with us</Link></li>
                            <li><Link className="font-sans font-semibold hover:scale-105 transition-all block hover:text-[#198038]" target="_blank" href={"https://form.typeform.com/to/qJv3uhi8"}>Leave feedback</Link></li>
                            <li><Link className="font-sans font-semibold hover:scale-105 transition-all block hover:text-[#198038]" href={"/privacy-policy"}>Privacy Policy</Link></li>
                            <li><Link className="font-sans font-semibold hover:scale-105 transition-all block hover:text-[#198038]" href={"/terms"}>Terms</Link></li>
                            <li><Link className="font-sans font-semibold hover:scale-105 transition-all block hover:text-[#198038]" href={"/support"}>Support</Link></li>
                        </ul>
                    </div>

                </div>

            </div>

            <div className="mt-[6rem] justify-between w-full ">
                <p className="text-[14px] text-[#99999999] font-sans">© {today} ClearFund. All rights reserved</p>
            </div>
        </div>
    </footer>
  )
}

export default Footer