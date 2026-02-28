"use client"

import Sidebar from "@/components/SideBar2"
import Image from "next/image"
import Link from "next/link"
import { usePrivy, useWallets } from "@privy-io/react-auth"
import UserDetails from "@/components/userDetails"
import { Menu, X } from "lucide-react";
import ModalConnect from "@/components/modalConnect"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { collectives } from "@/lib/collectivesData"
import DonationHistory from "@/components/DonationHistory"
import { useTokenBalance } from "@/hooks/useDonation"

import { usePathname } from "next/navigation";
import { shortAddress } from "@/components/userDetails";

const GoodCollective = () => {
    const { ready, authenticated, login, logout } = usePrivy()
    const [toggle, setToggle] = useState(false)
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const pathname = usePathname();
    const { wallets } = useWallets()
    const router = useRouter()
    const address = wallets?.[0]?.address

    const gDollarBalance = useTokenBalance('G$', address)
    const balance = gDollarBalance.balance || 0
    const balanceLoading = gDollarBalance.isLoading

    const handleDonate = (collective) => {
        router.push(`/donate/${collective.id}`)
    }

    // After login, redirect to pending donation page if applicable
    if (ready && authenticated) {
        const pendingId = typeof window !== 'undefined' ? sessionStorage.getItem('pendingDonateId') : null
        if (pendingId) {
            sessionStorage.removeItem('pendingDonateId')
            router.push(`/donate/${pendingId}`)
        }
    }

    return (
        <div className="min-h-screen flex flex-col md:flex-row bg-white text-gray-800 relative ">
            {/* Sidebar imported */}
            <div className="md:hidden flex items-center justify-between p-4 bg-white shadow-md font-sans">
                <div className="relative w-[120px] h-[30px]">
                    <Image
                        src="/clearfund-dashboard-logo.svg"
                        alt="ClearFund Logo"
                        fill
                        className="object-contain"
                        priority
                    />
                </div>
                <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="p-2 rounded-lg hover:bg-gray-100"
                >
                    {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {
                sidebarOpen && <div className="fixed h-screen top-0 z-50 bg-white w-[80%]">
                    <div className="px-5">
                        {
                            authenticated &&
                            <div className="h-[114px] border border-[#7CB53E] rounded-md p-7 mt-20">
                                <div className="flex items-center gap-3">
                                    <h2 className="font-black text-[20px] text-[#39B54A]">Account</h2>
                                    <section className="flex items-center gap-2 text-[#E2A426]">
                                        <span>
                                            <svg width="10" height="12" viewBox="0 0 10 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M5.5 1L1 2.75V6C1 7.75 2.75 10.5 5 11C7.25 10.5 9 7.75 9 6V2.75L5 1H5.5Z" stroke="#E2A426" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </span>
                                        <span className="text-[14px]">verify</span>
                                    </section>
                                </div>
                                <p className="text-[14px] text-black/50 mt-2">{shortAddress(address)}</p>
                            </div>
                        }
                    </div>

                    <nav className="space-y-3 my-6 font-sans">
                        <Link href="/grants">
                            <button onClick={() => setSidebarOpen(false)}
                                className={`flex text-[#39B54A] items-center cursor-pointer h-[71px] w-[203px]
                rounded-r-full px-9 py-3  font-bold mb-4  ${pathname === "/grants" ? "bg-[#EAF9EE]" : " hover:bg-gray-50"}`}
                            >
                                <span className="flex items-center gap-3">
                                    <span>
                                        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M16.4286 1.25714C15.5971 1.08743 14.74 1.00171 13.8571 1C6.75614 1 1 6.74971 1 13.843C1 20.9363 6.75614 26.686 13.8571 26.686C20.9581 26.686 26.7143 20.9363 26.7143 13.843C26.7126 12.9627 26.6269 12.1064 26.4571 11.2741" stroke="#39B54A" strokeWidth="1.5" strokeLinecap="round" />
                                            <path d="M13.8571 9.98951C12.4364 9.98951 11.2856 10.8522 11.2856 11.9168C11.2856 12.9801 12.4364 13.8428 13.8571 13.8428C15.2778 13.8428 16.4285 14.7042 16.4285 15.7688C16.4285 16.8334 15.2778 17.6961 13.8571 17.6961M13.8571 9.98951C14.9756 9.98951 15.9296 10.5256 16.2819 11.2752M13.8571 9.98951V8.70508M13.8571 17.6961C12.7385 17.6961 11.7845 17.1599 11.4322 16.4104M13.8571 17.6961V18.9805" stroke="#39B54A" strokeWidth="1.5" strokeLinecap="round" />
                                        </svg>
                                    </span>
                                    Grants
                                </span>
                            </button>
                        </Link>

                        <Link href={"/archive"}>
                            <button onClick={() => setSidebarOpen(false)}
                                className={`flex text-[#39B54A] items-center cursor-pointer h-[71px] w-[203px]
                rounded-r-full px-9 py-3  font-bold mb-4  ${pathname === "/archive" ? "bg-[#EAF9EE]" : " hover:bg-gray-50"}`}
                            >
                                <span className="flex items-center gap-3">

                                    <svg width="25" height="27" viewBox="0 0 25 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8.07164 1H14.5002C15.0117 1 15.5022 1.20319 15.8639 1.56487C16.2256 1.92654 16.4288 2.41708 16.4288 2.92857C16.4288 4.12205 15.9547 5.26664 15.1108 6.11055C14.2668 6.95447 13.1223 7.42857 11.9288 7.42857H10.6431C9.44959 7.42857 8.305 6.95447 7.46109 6.11055C6.61717 5.26664 6.14307 4.12205 6.14307 2.92857C6.14307 2.41708 6.34625 1.92654 6.70793 1.56487C7.06961 1.20319 7.56015 1 8.07164 1Z" stroke="#39B54A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M10.6429 24.1435H6.14286C4.77889 24.1435 3.47078 23.6017 2.50631 22.6372C1.54184 21.6727 1 20.3646 1 19.0007V17.7149C0.999686 15.5604 1.67595 13.4602 2.93337 11.7106C4.19078 9.96104 5.96585 8.6505 8.00807 7.96394C10.0503 7.27737 12.2566 7.24944 14.3155 7.88409C16.3745 8.51874 18.1821 9.78392 19.4834 11.5011" stroke="#39B54A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M18.9999 25.4292L23.3071 21.207C23.5712 20.9507 23.7813 20.644 23.925 20.3052C24.0687 19.9663 24.143 19.6021 24.1436 19.2341C24.1442 18.8661 24.071 18.5016 23.9285 18.1623C23.7859 17.823 23.5768 17.5157 23.3135 17.2585C22.7766 16.7325 22.0553 16.4372 21.3036 16.4358C20.5519 16.4344 19.8295 16.7269 19.2905 17.2508L19.0025 17.5337L18.7158 17.2508C18.1789 16.7252 17.4579 16.4302 16.7065 16.4287C15.9552 16.4273 15.233 16.7195 14.6941 17.2431C14.4299 17.4993 14.2197 17.8059 14.0759 18.1447C13.9321 18.4835 13.8577 18.8476 13.8569 19.2157C13.8562 19.5837 13.9292 19.9482 14.0717 20.2875C14.2142 20.6269 14.4232 20.9343 14.6864 21.1915L18.9999 25.4292Z" stroke="#39B54A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    Archive
                                </span>
                            </button>
                        </Link>

                        <Link href="/donate">
                            <button onClick={() => setSidebarOpen(false)}
                                className={`flex text-[#39B54A] items-center cursor-pointer h-[71px] w-[203px]rounded-r-full px-9 py-3  font-bold mb-4  ${pathname === "/donate" ? "bg-[#EAF9EE] " : " hover:bg-gray-50"}`}
                            >
                                <span className="flex items-center gap-3">
                                    <span>

                                        <svg width="25" height="26" viewBox="0 0 25 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M9.35714 24.7857H5.5C4.30653 24.7857 3.16193 24.3116 2.31802 23.4677C1.47411 22.6238 1 21.4792 1 20.2857V5.5C1 4.30653 1.47411 3.16193 2.31802 2.31802C3.16193 1.47411 4.30653 1 5.5 1H17.7143C18.9078 1 20.0524 1.47411 20.8963 2.31802C21.7402 3.16193 22.2143 4.30653 22.2143 5.5V8.07143" stroke="#39B54A" strokeWidth="1.5" strokeLinecap="round" />
                                            <path d="M6.78564 1H16.4285V4.21429C16.4285 4.89627 16.1576 5.55032 15.6753 6.03256C15.1931 6.5148 14.5391 6.78571 13.8571 6.78571H9.35707C8.67509 6.78571 8.02104 6.5148 7.5388 6.03256C7.05656 5.55032 6.78564 4.89627 6.78564 4.21429V1Z" stroke="#39B54A" strokeWidth="1.5" />
                                            <path d="M12.5713 14.5004C12.5713 13.6479 12.9099 12.8304 13.5127 12.2276C14.1155 11.6248 14.9331 11.2861 15.7856 11.2861H20.2856C21.1381 11.2861 21.9556 11.6248 22.5584 12.2276C23.1612 12.8304 23.4999 13.6479 23.4999 14.5004V21.5718C23.4999 22.4243 23.1612 23.2419 22.5584 23.8447C21.9556 24.4475 21.1381 24.7861 20.2856 24.7861H15.7856C14.9331 24.7861 14.1155 24.4475 13.5127 23.8447C12.9099 23.2419 12.5713 22.4243 12.5713 21.5718V14.5004Z" stroke="#39B54A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </span>
                                    Donate
                                </span>
                            </button>
                        </Link>
                    </nav>

                    <div className="flex gap-3 items-center px-9 absolute bottom-10">
                        <Link href={"https://x.com/Clear_Fund"} target="_blank">
                            <svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M17.1666 0.0224609H20.5096L13.207 8.39009L21.7988 19.7784H15.0723L9.80012 12.8729L3.77431 19.7784H0.428191L8.23839 10.8253L0 0.024018H6.89776L11.6561 6.33477L17.1666 0.0224609ZM15.991 17.7729H17.8439L5.88568 1.92363H3.89887L15.991 17.7729Z" fill="#39B54A" />
                            </svg>
                        </Link>
                        <Link href={"https://t.me/+fU2kPPjZ50MxMTE0"} target="_blank">
                            <svg width="23" height="20" viewBox="0 0 23 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M15.2545 7.77308L10.7576 12.1094L17.503 18.614L22 1.26855L1.76367 8.85717L6.26063 11.0253L8.50911 17.5299L11.8818 13.1935" stroke="#39B54A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </Link>
                    </div>
                </div>
            }

            <div className="hidden md:flex">
                <Sidebar authenticated={authenticated} address={address} login={login} />
            </div>

            <div className="lg:ml-64 w-full lg:w-auto flex-1">

                <div className="flex justify-end items-center gap-4 bg-white py-3 px-6 mb-3">
                    {toggle && <ModalConnect setCloseModal={setToggle} />}
                    {!authenticated ? (
                        <button
                            onClick={login}
                            className="font-sans font-black text-[16px] h-[52px] bg-[#39B54A] text-white rounded-full w-[160px] hover:bg-black transition-colors"
                        >
                            Connect wallet
                        </button>
                    ) : (
                        <UserDetails walletAddress={address} logout={logout} />
                    )}
                </div>

                {/* Good Collective Hero Banner */}
                <div className="relative w-full">
                    <Image
                        src="/assets/goodcollective_banner.png"
                        alt="Good Collective Banner"
                        width={1600}
                        height={600}
                        className="w-full h-auto object-contain"
                        priority
                    />
                </div>

                <div className="bg-white min-h-[calc(100vh-200px)] md:min-h-[calc(100vh-280px)]">
                    <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-9 py-8 lg:py-12">
                        <section className="pb-10">
                            <h1 className="text-[24px] lg:text-[32px] text-[#0000004D] mb-6 lg:mb-10 font-black">
                                Projects: {collectives.length}
                            </h1>

                            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
                                {collectives.map((collective) => (
                                    <div key={collective.id} className="w-full border border-gray-300 rounded-xl flex flex-col hover:shadow-sm transition-shadow">
                                        <div className="relative w-full h-[166px] rounded-t-xl flex-shrink-0">
                                            <Image
                                                alt={collective.title}
                                                src={collective.image}
                                                fill
                                                className="rounded-t-xl object-cover"
                                            />
                                        </div>

                                        <div className="flex flex-col flex-1 px-5 pt-7 pb-4">
                                            <h2 className="text-[16px] font-black min-h-[48px]">{collective.title}</h2>
                                            <p className="text-[15px] mt-5 flex-1">{collective.description}</p>

                                            <button
                                                onClick={() => handleDonate(collective)}
                                                className="bg-[#95EED8] hover:bg-[#D5F8EE] cursor-pointer transition-colors w-full max-w-[251px] h-[40px] flex items-center justify-center font-extrabold rounded-full mt-8 mx-auto"
                                            >
                                                Donate
                                            </button>

                                            <div className="border-t mt-6">
                                                <div className="flex py-2 justify-between items-center w-full">
                                                    <p className="border text-[10px] rounded-full px-2">{collective.date}</p>
                                                    <div className="flex gap-2">
                                                        <Link href={collective.web} target="_blank">
                                                            <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg"><g clipPath="url(#clip0_2937_140)"><path d="M20.1328 9.88991C20.1328 4.42786 15.705 0 10.2429 0C4.78089 0 0.353027 4.42786 0.353027 9.88991C0.353027 15.352 4.78089 19.7798 10.2429 19.7798C15.705 19.7798 20.1328 15.352 20.1328 9.88991Z" fill="#E2EAFF" /><path fillRule="evenodd" clipRule="evenodd" d="M8.92729 5.73698C8.80854 5.77459 8.69127 5.81735 8.57577 5.86517C8.0473 6.0841 7.56707 6.40498 7.1625 6.8095C6.758 7.21404 6.43713 7.69427 6.2182 8.22274C6.04446 8.64222 5.93764 9.08557 5.90095 9.53662H8.01099C8.0261 9.0205 8.07414 8.51188 8.15404 8.02989C8.25195 7.43883 8.39662 6.89421 8.5829 6.42856C8.68456 6.17433 8.79949 5.94161 8.92729 5.73698ZM10.2429 4.82715C9.57804 4.82715 8.91973 4.9581 8.30549 5.21252C7.69126 5.46695 7.13311 5.83986 6.663 6.30998C6.19289 6.78009 5.81998 7.33823 5.56555 7.95246C5.31113 8.5667 5.18018 9.22501 5.18018 9.88983C5.18018 10.5547 5.31113 11.213 5.56555 11.8273C5.81998 12.4415 6.19289 12.9996 6.663 13.4697C7.13311 13.9398 7.69126 14.3127 8.30549 14.5672C8.91973 14.8216 9.57804 14.9525 10.2429 14.9525C10.9077 14.9525 11.5661 14.8216 12.1803 14.5672C12.7945 14.3127 13.3526 13.9398 13.8227 13.4697C14.2928 12.9996 14.6658 12.4415 14.9202 11.8273C15.1746 11.213 15.3056 10.5547 15.3056 9.88983C15.3056 9.22501 15.1746 8.5667 14.9202 7.95246C14.6658 7.33823 14.2928 6.78009 13.8227 6.30998C13.3526 5.83986 12.7945 5.46695 12.1803 5.21252C11.5661 4.9581 10.9077 4.82715 10.2429 4.82715ZM10.2429 5.53357C10.1198 5.53357 9.96085 5.59281 9.77605 5.78421C9.58984 5.97702 9.40348 6.27921 9.23875 6.69092C9.07521 7.09988 8.94233 7.5936 8.85092 8.14532C8.77759 8.58796 8.7326 9.05773 8.71776 9.53662H11.7679C11.7531 9.05773 11.7081 8.58796 11.6348 8.14532C11.5434 7.5936 11.4106 7.09988 11.247 6.69092C11.0823 6.27921 10.8959 5.97702 10.7097 5.78421C10.5249 5.59281 10.3659 5.53357 10.2429 5.53357ZM12.4747 9.53662C12.4597 9.0205 12.4116 8.51188 12.3317 8.02989C12.2338 7.43883 12.0891 6.89421 11.9029 6.42856C11.8012 6.17433 11.6863 5.94161 11.5585 5.73698C11.6772 5.77459 11.7945 5.81735 11.9099 5.86517C12.4385 6.0841 12.9187 6.40498 13.3232 6.8095C13.7277 7.21404 14.0486 7.69427 14.2676 8.22274C14.4413 8.64222 14.5481 9.08557 14.5848 9.53662H12.4747ZM11.7679 10.243H8.71776C8.7326 10.7219 8.77759 11.1917 8.85092 11.6343C8.94233 12.1861 9.07521 12.6798 9.23875 13.0888C9.40348 13.5005 9.58984 13.8026 9.77605 13.9955C9.96085 14.1869 10.1198 14.2461 10.2429 14.2461C10.3659 14.2461 10.5249 14.1869 10.7097 13.9955C10.8959 13.8026 11.0823 13.5005 11.247 13.0888C11.4106 12.6798 11.5434 12.1861 11.6348 11.6343C11.7081 11.1917 11.7531 10.7219 11.7679 10.243ZM11.5585 14.0427C11.6863 13.8381 11.8012 13.6053 11.9029 13.3512C12.0891 12.8855 12.2338 12.3408 12.3317 11.7498C12.4116 11.2678 12.4597 10.7592 12.4747 10.243H14.5848C14.5481 10.6942 14.4413 11.1374 14.2676 11.5569C14.0486 12.0855 13.7277 12.5657 13.3232 12.9702C12.9187 13.3747 12.4385 13.6956 11.9099 13.9145C11.7945 13.9624 11.6772 14.0051 11.5585 14.0427ZM8.92729 14.0427C8.79949 13.8381 8.68456 13.6053 8.5829 13.3512C8.39662 12.8855 8.25195 12.3408 8.15404 11.7498C8.07414 11.2678 8.0261 10.7592 8.01099 10.243H5.90095C5.93764 10.6942 6.04446 11.1374 6.2182 11.5569C6.43713 12.0855 6.758 12.5657 7.1625 12.9702C7.56707 13.3747 8.0473 13.6956 8.57577 13.9145C8.69127 13.9624 8.80854 14.0051 8.92729 14.0427Z" fill="#2B4483" /></g><defs><clipPath id="clip0_2937_140"><rect width="20.4862" height="19.7798" fill="white" /></clipPath></defs></svg>
                                                        </Link>
                                                        <Link href={collective.twitter} target="_blank">
                                                            <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg"><g clipPath="url(#clip0_2937_143)"><path d="M10.4998 19.7798C15.9618 19.7798 20.3897 15.352 20.3897 9.88991C20.3897 4.42786 15.9618 0 10.4998 0C5.03773 0 0.609863 4.42786 0.609863 9.88991C0.609863 15.352 5.03773 19.7798 10.4998 19.7798Z" fill="#E2EAFF" /><path d="M11.441 9.22504L15.1228 4.94531H14.2503L11.0534 8.66134L8.50013 4.94531H5.55518L9.41629 10.5646L5.55518 15.0526H6.42768L9.80364 11.1283L12.5001 15.0526H15.4451L11.4408 9.22504H11.441ZM10.246 10.6141L9.85479 10.0546L6.74206 5.60212H8.08217L10.5942 9.19538L10.9854 9.75493L14.2507 14.4256H12.9106L10.246 10.6143V10.6141Z" fill="#2B4483" /></g><defs><clipPath id="clip0_2937_143"><rect width="20.4862" height="19.7798" fill="white" transform="translate(0.256836)" /></clipPath></defs></svg>
                                                        </Link>
                                                        <Link href={collective.scan} target="_blank">
                                                            <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg"><g clipPath="url(#clip0_2937_135)"><path d="M20.6465 9.88991C20.6465 4.42786 16.2187 0 10.7566 0C5.29456 0 0.866699 4.42786 0.866699 9.88991C0.866699 15.352 5.29456 19.7798 10.7566 19.7798C16.2187 19.7798 20.6465 15.352 20.6465 9.88991Z" fill="#E2EAFF" /><path d="M12.6404 6.12207C13.6647 6.12777 14.2195 6.17319 14.5813 6.53507C14.9951 6.94887 14.9951 7.61492 14.9951 8.94695V11.7726C14.9951 13.1047 14.9951 13.7707 14.5813 14.1845C14.1675 14.5983 13.5015 14.5983 12.1694 14.5983H9.34375C8.01173 14.5983 7.34569 14.5983 6.93188 14.1845C6.51807 13.7707 6.51807 13.1047 6.51807 11.7726V8.94695C6.51807 7.61492 6.51807 6.94887 6.93188 6.53507C7.29375 6.17319 7.84847 6.12777 8.87278 6.12207" stroke="#2B4483" /><path d="M9.34375 10.5492L10.1511 11.3027L12.1694 9.41895" stroke="#2B4483" strokeLinecap="round" strokeLinejoin="round" /><path d="M8.87305 5.88709C8.87305 5.49694 9.18931 5.18066 9.57947 5.18066H11.9342C12.3243 5.18066 12.6406 5.49694 12.6406 5.88709V6.35804C12.6406 6.74818 12.3243 7.06446 11.9342 7.06446H9.57947C9.18931 7.06446 8.87305 6.74818 8.87305 6.35804V5.88709Z" stroke="#2B4483" /></g><defs><clipPath id="clip0_2937_135"><rect width="20.4862" height="19.7798" fill="white" transform="translate(0.513672)" /></clipPath></defs></svg>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                        <DonationHistory />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GoodCollective