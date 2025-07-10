import Link from "next/link"
const Footer = () => {

    let today = new Date().getUTCFullYear()
    
  return (
    <footer className="bg-black pt-[5%] px-[5%] pb-5 text-white">
        <div className="w-full bg-black flex items-center justify-between flex-wrap">
            <div className="lg:w-2/3 w-full mt-10 md:mt-0">
                <div className="w-[155px] relative flex items-center mb-25">
                    <a href=""><img src="/projectLogo.png" alt="logo" /></a>
                </div>

                <h2 className="text-[36px]  mb-5">Get the latest updates</h2>
                <p className="mb-5 text-white opacity-70 text-[16px]">Subscribe to our newsletter to get all grant updates straight to your mailbox!</p>
                <form action="" className="border border-white/70 rounded-md w-full sm:w-5/6  md:w-4/6 lg:w-3/6 flex mb-20">
                    <input type="text" className="outline-none w-2/3 p-3 text-[16px] opacity-70" placeholder="Enter your email"/>
                    <button className="w-1/3 bg-[#198038] text-white border-0 rounded-r-md">Subscribe</button>
                </form>

                
            </div>

            <div className="w-full lg:w-1/3">
                {/* socials */}
                <div className="flex gap-10 mb-14">
                    <Link href={"https://x.com/Clear_Fund"}>
                        <svg width="22" height="24" viewBox="0 0 22 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21.0766 21.1773L14.1098 10.236L20.9304 2.7336C21.1697 2.46382 21.293 2.11058 21.2737 1.75046C21.2543 1.39034 21.0938 1.05237 20.8269 0.809828C20.56 0.567282 20.2082 0.439707 19.8479 0.454761C19.4876 0.469816 19.1477 0.626287 18.902 0.890251L12.5896 7.83877L8.28507 1.07641C8.16136 0.881909 7.99059 0.721749 7.78856 0.610754C7.58653 0.499758 7.35977 0.441513 7.12926 0.441406H1.64719C1.40169 0.441519 1.16072 0.507578 0.949474 0.632677C0.738231 0.757775 0.564469 0.937321 0.446352 1.15255C0.328235 1.36777 0.270099 1.61077 0.278022 1.85615C0.285945 2.10153 0.359636 2.34028 0.491391 2.54743L7.45819 13.4887L0.633011 20.9912C0.509436 21.1239 0.413437 21.2799 0.350577 21.45C0.287718 21.6201 0.259249 21.801 0.26682 21.9822C0.27439 22.1634 0.317851 22.3413 0.394682 22.5056C0.471513 22.6699 0.580186 22.8173 0.714403 22.9393C0.848621 23.0612 1.00571 23.1554 1.17657 23.2162C1.34743 23.277 1.52867 23.3033 1.70977 23.2935C1.89087 23.2838 2.06823 23.2382 2.23158 23.1594C2.39493 23.0806 2.54102 22.9702 2.66138 22.8345L8.97832 15.886L13.2829 22.6484C13.4066 22.8429 13.5774 23.003 13.7794 23.114C13.9814 23.225 14.2082 23.2833 14.4387 23.2834H19.9208C20.1663 23.2832 20.4072 23.2172 20.6185 23.0921C20.8297 22.967 21.0035 22.7874 21.1216 22.5722C21.2397 22.357 21.2979 22.114 21.2899 21.8686C21.282 21.6232 21.2083 21.3845 21.0766 21.1773ZM15.1913 20.5423L4.14382 3.18244H6.37662L17.4241 20.5423H15.1913Z" fill="white" fillOpacity="0.6"/>
                        </svg>
                    </Link>

                    <Link href={"/"}>
                        <svg width="30" height="26" viewBox="0 0 30 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M27.6093 0.878363L1.61282 10.955C0.566671 11.4243 0.212836 12.364 1.35996 12.874L8.02918 15.0044L24.1545 4.98712C25.035 4.35826 25.9364 4.52595 25.1607 5.21774L11.3112 17.8223L10.8762 23.1566C11.2791 23.9802 12.017 23.984 12.4876 23.5746L16.3193 19.9303L22.8816 24.8697C24.4058 25.7767 25.2351 25.1914 25.563 23.529L29.8673 3.04224C30.3143 0.995964 29.5521 0.0943556 27.6093 0.878363Z" fill="white" fillOpacity="0.6"/>
                        </svg>
                    </Link>

                    <Link href={"/"}>
                        <svg width="35" height="29" viewBox="0 0 35 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M17.8421 0.896484C18.754 0.901607 21.0354 0.923806 23.4602 1.02114L24.3209 1.05871C26.7611 1.17312 29.1996 1.37121 30.4103 1.70761C32.024 2.16184 33.291 3.48355 33.7197 5.16044C34.4027 7.82435 34.4881 13.019 34.4983 14.2775L34.5 14.537V14.8342C34.4881 16.0927 34.4027 21.289 33.7197 23.9512C33.2859 25.6332 32.0171 26.9567 30.4103 27.4041C29.1996 27.7405 26.7611 27.9385 24.3209 28.0529L23.4602 28.0922C21.0354 28.1879 18.754 28.2118 17.8421 28.2152L17.4408 28.2169H17.0054C15.0757 28.2049 7.00547 28.1178 4.43719 27.4041C2.82519 26.9498 1.55642 25.6281 1.1278 23.9512C0.444749 21.2873 0.359367 16.0927 0.349121 14.8342V14.2775C0.359367 13.019 0.444749 7.82264 1.1278 5.16044C1.56154 3.47842 2.83031 2.15501 4.4389 1.70932C7.00547 0.993819 15.0774 0.90673 17.0071 0.896484H17.8421ZM14.0085 8.58083V20.5342L24.2543 14.5575L14.0085 8.58083Z" fill="white" fillOpacity="0.6"/>
                        </svg>
                    </Link>

                    <Link href={"/"}>
                        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2.85791 -0.00390625V25.3551H27.8391" stroke="#999999" strokeWidth="4" strokeMiterlimit="10"/>
                            <path d="M12.3197 1.76172L2.85791 25.3546L26.1977 15.6398" stroke="#999999" strokeWidth="4" strokeLinejoin="round"/>
                            <path d="M2.85791 25.3553L20.5214 7.1875" stroke="#999999" strokeWidth="4" strokeMiterlimit="10"/>
                        </svg>
                    </Link>


                </div>

                <div className="flex justify-between w-[90%] md:w-[95%] sm:w-[94%] lg:w-[68%]">
                    <div>
                        <h3 className="uppercase mb-3">About</h3>
                        <ul className="space-y-3 opacity-80 text-white/80 text-[14px]">
                            <li><Link href={"/"}>Home</Link></li>
                            <li><Link href={"/faq"}>FAQ</Link></li>
                            <li>Blog</li>
                            <li>Contact</li>
                        </ul>
                    </div>


                    <div>
                        <h3 className="uppercase mb-3 font-bold text-[16px]">RESOURCES </h3>
                        <ul className="space-y-3 opacity-80 text-white/80 text-[14px]">
                            <li><Link href={"/"}>Github</Link></li>
                            <li><Link href={"/connect-with-us"}>Connect with us</Link></li>
                            <li><Link href={"/"}>Leave feedback</Link></li>
                            <li><Link href={"/support"}>Support</Link></li>
                        </ul>
                    </div>

                </div>

            </div>

            <div className="flex flex-wrap-reverse gap-5 mt-10 justify-between w-full ">
                <p className="text-[14px] opacity-70 text-white">© {today} ClearFund. All rights reserved</p>

                <div className="flex justify-between w-full  lg:w-[33%] gap-20 opacity-70 text-[14px] text-white">
                    <div className="flex justify-between w-full lg:w-[77%]">
                        <Link href="/privacy-policy" className="">
                            Privacy Policy
                        </Link>
                        <Link href="/terms" className="">Terms and Conditions </Link>
                    </div>
                </div>
            </div>
        </div>
    </footer>
  )
}

export default Footer