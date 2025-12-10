// import imgClearfundLogo011 from "../assets/projectIcon.png";
import Image from "next/image";
import svgPaths from "../components/imports/svgProp";

// interface SidebarProps {
//   isOpen?: boolean;
//   onClose?: () => void;
// }

export default function Sidebar({ isOpen = false, onClose }){
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
        <div className="bg-[#eaf9ee] rounded-br-[50px] rounded-tr-[50px] w-[203px]">
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

        <a 
          href="archive" 
          className="flex items-center gap-4 px-8 py-6 text-[#39b54a] mt-8"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 25 26">
            <path d={svgPaths.p1da46600} stroke="#39B54A" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
            <path d={svgPaths.p2f3cba00} stroke="#39B54A" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
            <path d={svgPaths.p39240cc0} stroke="#39B54A" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          </svg>
          <span className="font-['Modern_Era:Bold',sans-serif] text-[16px] tracking-[-0.16px]">Archive</span>
        </a>

        <a 
          href="donate" 
          className="flex items-center gap-4 px-8 py-6 text-[#39b54a] mt-8"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 26">
            <path d={svgPaths.pc466180} stroke="#39B54A" strokeLinecap="round" strokeWidth="1.5" />
            <path d={svgPaths.p12c72500} stroke="#39B54A" strokeWidth="1.5" />
            <path d={svgPaths.p22093f00} stroke="#39B54A" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          </svg>
          <span className="font-['Modern_Era:Bold',sans-serif] text-[16px] tracking-[-0.16px]">Donate</span>
        </a>
      </nav>

      {/* Logout */}
      <div className="absolute bottom-8 left-0 right-0 px-8">
        <button className="flex items-center gap-3 text-[#39b54a]">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 23 20">
            <path d={svgPaths.p2d935500} stroke="#39B54A" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
        </button>
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
        <div className="bg-[#eaf9ee] rounded-br-[50px] rounded-tr-[50px] w-[203px]">
          <a
            href="#"
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

        <a 
          href="/archive" 
          className="flex items-center gap-4 px-8 py-6 text-[#39b54a] mt-8"
          onClick={onClose}
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 25 26">
            <path d={svgPaths.p1da46600} stroke="#39B54A" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
            <path d={svgPaths.p2f3cba00} stroke="#39B54A" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
            <path d={svgPaths.p39240cc0} stroke="#39B54A" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          </svg>
          <span className="font-['Modern_Era:Bold',sans-serif] text-[16px] tracking-[-0.16px]">Archive</span>
        </a>

        <a 
          href="donate" 
          className="flex items-center gap-4 px-8 py-6 text-[#39b54a] mt-8"
          onClick={onClose}
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 26">
            <path d={svgPaths.pc466180} stroke="#39B54A" strokeLinecap="round" strokeWidth="1.5" />
            <path d={svgPaths.p12c72500} stroke="#39B54A" strokeWidth="1.5" />
            <path d={svgPaths.p22093f00} stroke="#39B54A" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          </svg>
          <span className="font-['Modern_Era:Bold',sans-serif] text-[16px] tracking-[-0.16px]">Donate</span>
        </a>
      </nav>

      {/* Logout */}
      <div className="absolute bottom-8 left-0 right-0 px-8">
        <button className="flex items-center gap-3 text-[#39b54a]">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 23 20">
            <path d={svgPaths.p2d935500} stroke="#39B54A" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
        </button>
      </div>
    </div>
    </>
  );
}
