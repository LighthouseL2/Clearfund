"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import svgPaths from "../components/imports/svgProp";

// interface SidebarProps {
//   isOpen?: boolean;
//   onClose?: () => void;
// }

export default function Sidebar({ isOpen = false, onClose }) {
  const pathname = usePathname() || "";

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="fixed left-0 top-0 h-screen w-64 bg-white shadow-[0px_10px_60px_0px_rgba(226,236,249,0.5)] z-50 hidden lg:block">
        {/* Logo */}
        <div className="px-7 py-9">
          {/* <img 
          src={imgClearfundLogo011} 
          alt="Clearfund Logo" 
          className="w-40 h-auto"
        /> */}
          <Image
            alt="Clearfund Logo"
            src={"/assets/projectIcon.png"}
            width={170}
            height={20}
          />
        </div>

        {/* Navigation */}
        <nav className="mt-8">
          <div className={`rounded-br-[50px] rounded-tr-[50px] w-[203px] ${pathname === '/grants' ? 'bg-[#eaf9ee]' : ''}`}>
            <a
              href="/grants"
              className="flex items-center gap-4 px-8 py-6 text-[#39b54a]"
            >
              <svg className="w-7 h-7" fill="none" viewBox="0 0 28 28">
                <path d={svgPaths.p31f78de0} stroke="#39B54A" strokeLinecap="round" strokeWidth="1.5" />
                <path d={svgPaths.p1004f80} stroke="#39B54A" strokeLinecap="round" strokeWidth="1.5" />
              </svg>
              <span className="font-['Modern_Era:Bold',sans-serif] text-[16px] tracking-[-0.16px]">Grants</span>
            </a>
          </div>

          <div className={`mt-8 rounded-br-[50px] rounded-tr-[50px] w-[203px] ${pathname === '/archive' ? 'bg-[#eaf9ee]' : ''}`}>
            <a
              href="/archive"
              className="flex items-center gap-4 px-8 py-6 text-[#39b54a]"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 26">
                <path d={svgPaths.pc466180} stroke="#39B54A" strokeLinecap="round" strokeWidth="1.5" />
                <path d={svgPaths.p12c72500} stroke="#39B54A" strokeWidth="1.5" />
                <path d={svgPaths.p22093f00} stroke="#39B54A" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
              </svg>
              <span className="font-['Modern_Era:Bold',sans-serif] text-[16px] tracking-[-0.16px]">Archive</span>
            </a>
          </div>

          <div className={`mt-8 rounded-br-[50px] rounded-tr-[50px] w-[203px] ${pathname === '/donate' ? 'bg-[#eaf9ee]' : ''}`}>
            <a
              href="/donate"
              className="flex items-center gap-4 px-8 py-6 text-[#39b54a]"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 25 26">
                <path d={svgPaths.p1da46600} stroke="#39B54A" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                <path d={svgPaths.p2f3cba00} stroke="#39B54A" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                <path d={svgPaths.p39240cc0} stroke="#39B54A" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
              </svg>

              <span className="font-['Modern_Era:Bold',sans-serif] text-[16px] tracking-[-0.16px]">Donate</span>
            </a>
          </div>
        </nav>

        {/* Logout & Socials */}
        <div className="absolute bottom-8 left-0 right-0 px-8 flex flex-col gap-6">
          <div className="flex gap-4 items-center">
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
          {/* <button className="flex items-center gap-3 text-[#39b54a]">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 23 20">
              <path d={svgPaths.p2d935500} stroke="#39B54A" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            </svg>
          </button> */}
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div className={`fixed left-0 top-0 h-screen w-64 bg-white shadow-[0px_10px_60px_0px_rgba(226,236,249,0.5)] z-50 lg:hidden transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        {/* Logo */}
        <div className="px-7 py-9 flex items-center justify-between">

          <Image
            alt="Clearfund Logo"
            src={"/assets/projectIcon.png"}
            width={140}
            height={100}
          />
          <button onClick={onClose} className="text-[#39b54a]">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Navigation */}
        <nav className="mt-8">
          <div className={`rounded-br-[50px] rounded-tr-[50px] w-[203px] ${pathname === '/grants' ? 'bg-[#eaf9ee]' : ''}`}>
            <a
              href="/grants"
              className="flex items-center gap-4 px-8 py-6 text-[#39b54a]"
              onClick={onClose}
            >
              <svg className="w-7 h-7" fill="none" viewBox="0 0 28 28">
                <path d={svgPaths.p31f78de0} stroke="#39B54A" strokeLinecap="round" strokeWidth="1.5" />
                <path d={svgPaths.p1004f80} stroke="#39B54A" strokeLinecap="round" strokeWidth="1.5" />
              </svg>
              <span className="font-['Modern_Era:Bold',sans-serif] text-[16px] tracking-[-0.16px]">Grants</span>
            </a>
          </div>

          <div className={`mt-8 rounded-br-[50px] rounded-tr-[50px] w-[203px] ${pathname === '/archive' ? 'bg-[#eaf9ee]' : ''}`}>
            <a
              href="/archive"
              className="flex items-center gap-4 px-8 py-6 text-[#39b54a]"
              onClick={onClose}
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 25 26">
                <path d={svgPaths.p1da46600} stroke="#39B54A" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                <path d={svgPaths.p2f3cba00} stroke="#39B54A" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                <path d={svgPaths.p39240cc0} stroke="#39B54A" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
              </svg>
              <span className="font-['Modern_Era:Bold',sans-serif] text-[16px] tracking-[-0.16px]">Archive</span>
            </a>
          </div>

          <div className={`mt-8 rounded-br-[50px] rounded-tr-[50px] w-[203px] ${pathname === '/donate' ? 'bg-[#eaf9ee]' : ''}`}>
            <a
              href="/donate"
              className="flex items-center gap-4 px-8 py-6 text-[#39b54a]"
              onClick={onClose}
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 26">
                <path d={svgPaths.pc466180} stroke="#39B54A" strokeLinecap="round" strokeWidth="1.5" />
                <path d={svgPaths.p12c72500} stroke="#39B54A" strokeWidth="1.5" />
                <path d={svgPaths.p22093f00} stroke="#39B54A" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
              </svg>
              <span className="font-['Modern_Era:Bold',sans-serif] text-[16px] tracking-[-0.16px]">Donate</span>
            </a>
          </div>
        </nav>

        {/* Logout & Socials */}
        <div className="absolute bottom-8 left-0 right-0 px-8 flex flex-col gap-6">
          <div className="flex gap-4 items-center">
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
          {/* <button className="flex items-center gap-3 text-[#39b54a]">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 23 20">
              <path d={svgPaths.p2d935500} stroke="#39B54A" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            </svg>
          </button> */}
        </div>
      </div>
    </>
  );
}
