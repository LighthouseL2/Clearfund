import { useState } from "react";
// import svgPaths from "../components/svgs";

export function Form({setIsHidden}) {
  const [grantName, setGrantName] = useState("");
  const [grantLink, setGrantLink] = useState("");
  const [grantDeadline, setGrantDeadline] = useState("");
  const [logoFile, setLogoFile] = useState(null);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setLogoFile(e.target.files[0]);
    }
  };

  const handleSubmit = () => {
    console.log({ grantName, grantLink, grantDeadline, logoFile });
  };

  return (
    <div className=" flex justify-center items-center h-screen absolute z-50 lg:right-35">
        <div className="relative flex min-h-[568px] max-h-screen w-full max-w-[912px] flex-col items-start justify-start gap-0 overflow-hidden rounded-3xl bg-white shadow-2xl md:flex-row">
            {/* Left Section - Illustration and Text */}
            <div className="relative flex w-full shrink-0 flex-col items-start justify-start gap-8 overflow-hidden p-8 md:w-[456px] md:p-12">
                {/* Title */}
                <div className="relative flex w-full flex-col items-start justify-start gap-4 self-stretch">
                <h1 className="relative w-full text-black self-stretch text-left text-[32px] leading-[38px] md:text-[40px] md:leading-12" style={{ fontFamily: "Inter, sans-serif", fontWeight: 700, letterSpacing: "0px" }}>
                    Contribute to the future of funding.
                </h1>
                </div>

                {/* Description */}
                <div className="relative flex w-full flex-col items-start justify-start gap-0 self-stretch">
                <p className="relative w-full self-stretch text-left text-sm leading-5" style={{ fontFamily: "Inter, sans-serif", fontWeight: 400, letterSpacing: "0px", color: "#64748B" }}>
                    Add your grant opportunity to ClearFund and help creators, builders, and communities discover it faster.
                </p>
                </div>

                {/* Illustration */}
                <div className="relative mt-4 hidden h-60 w-full items-center justify-center overflow-visible md:flex">
                <svg className="absolute" style={{ width: "100%", height: "240px" }} viewBox="0 0 360 240" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
                    {/* Background decorative elements */}
                    <g opacity="0.4">
                    {/* Wavy lines */}
                    <path d="M0.25 0.25C2.92702 0.25 2.92704 2.25414 5.60225 2.25414C8.28109 2.25414 8.28109 0.25 10.9599 0.25C13.6406 0.25 13.6406 2.25414 16.3176 2.25414C19.0001 2.25414 19.0001 0.25 21.6771 0.25C24.3633 0.25 24.3632 2.25414 27.0475 2.25414C29.7336 2.25414 29.7337 0.25 32.4143 0.25" stroke="#CBD5E1" strokeWidth="0.5" transform="translate(104, 60)" />
                    <path d="M0.25 0.25C2.92884 0.25 2.92883 2.25417 5.60222 2.25417C8.28106 2.25417 8.28107 0.25 10.9617 0.25C13.6406 0.25 13.6406 2.25417 16.3194 2.25417C19.0019 2.25417 19.0019 0.25 21.6789 0.25C24.3632 0.25 24.3632 2.25417 27.0493 2.25417C29.7336 2.25417 29.7336 0.25 32.4161 0.25" stroke="#CBD5E1" strokeWidth="0.5" transform="translate(284, 156)" />
                    <path d="M0.25 0.25C2.92702 0.25 2.927 2.25411 5.60039 2.25411C8.28105 2.25411 8.28108 0.25 10.9581 0.25C13.6388 0.25 13.6388 2.25411 16.3194 2.25411C18.9983 2.25411 18.9982 0.25 21.6771 0.25C24.3632 0.25 24.3632 2.25411 27.0493 2.25411C29.7318 2.25411 29.7318 0.25 32.4161 0.25" stroke="#CBD5E1" strokeWidth="0.5" transform="translate(104, 172)" />
                    </g>
                    
                    {/* Decorative shapes */}
                    <circle cx="265" cy="60" r="3" fill="#FEF3C7" />
                    <circle cx="143" cy="88" r="2" fill="#FEE2E2" />
                    <circle cx="312" cy="116" r="2.5" fill="#DBEAFE" />
                    <circle cx="197" cy="36" r="2" fill="#E0E7FF" />
                    <circle cx="388" cy="196" r="2" fill="#FCE7F3" opacity="0.6" />
                    
                    {/* Plus signs */}
                    <g transform="translate(372, 60)" opacity="0.3">
                    <path d="M17.4596 0.75V9.11486M21.642 4.90631L13.2751 4.92198" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" />
                    </g>
                    <g transform="translate(196, 60)" opacity="0.3">
                    <path d="M17.4596 0.75V9.11486M21.642 4.90631L13.2751 4.92198" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" />
                    </g>

                    {/* Leaf back right */}
                    <g transform="translate(240, 85)">
                    <ellipse cx="22" cy="3" rx="22" ry="3" fill="#A7F3D0" opacity="0.6" />
                    <path d="M0 20C0 11 6 6 14 3V0H20C31 0 40 9 40 20C40 31 31 40 20 40H14V38C6 35 0 29 0 20Z" fill="#D1FAE5" />
                    <path d="M2 32L18 11L38 18" stroke="#86EFAC" strokeWidth="1.5" fill="none" opacity="0.5" />
                    </g>

                    {/* Leaf back left */}
                    <g transform="translate(290, 70)">
                    <ellipse cx="18" cy="3" rx="18" ry="3" fill="#B2DFDB" opacity="0.6" />
                    <path d="M0 18C0 10 5 5 12 3V0H17C26 0 34 8 34 18C34 28 26 36 17 36H12V34C5 32 0 26 0 18Z" fill="#E0F2F1" />
                    </g>

                    {/* Wallet - purple */}
                    <g transform="translate(108, 110) rotate(-12 75 50)">
                    {/* Wallet body */}
                    <rect x="10" y="8" width="130" height="85" rx="4" fill="#DDD6FE" />
                    <rect x="10" y="8" width="130" height="12" rx="4" fill="#C4B5FD" />
                    <rect x="14" y="20" width="122" height="70" rx="3" fill="#E9D5FF" />
                    
                    {/* Wallet flap */}
                    <path d="M6 8 L6 20 C6 20 8 28 14 28 L14 14 C14 10 10 8 6 8" fill="#C4B5FD" />
                    
                    {/* Dollar sign */}
                    <text x="75" y="65" textAnchor="middle" fill="#A78BFA" style={{ fontFamily: "Inter, sans-serif", fontSize: "32px", fontWeight: 700 }}>$</text>
                    </g>

                    {/* Money bills - green */}
                    <g transform="translate(136, 68)">
                    {/* Bill 3 - back */}
                    <g transform="rotate(-18 50 40)">
                        <rect x="0" y="0" width="70" height="46" rx="3" fill="#86EFAC" />
                        <circle cx="35" cy="23" r="14" fill="#DCFCE7" opacity="0.7" />
                    </g>
                    
                    {/* Bill 2 - middle */}
                    <g transform="rotate(-12 50 40)">
                        <rect x="0" y="0" width="70" height="46" rx="3" fill="#4ADE80" />
                        <circle cx="35" cy="23" r="14" fill="#DCFCE7" opacity="0.8" />
                        <text x="35" y="31" textAnchor="middle" fill="#16A34A" style={{ fontFamily: "Inter, sans-serif", fontSize: "20px", fontWeight: 700 }}>$</text>
                    </g>
                    
                    {/* Bill 1 - front */}
                    <g transform="rotate(-6 50 40)">
                        <rect x="0" y="0" width="70" height="46" rx="3" fill="#22C55E" />
                        <circle cx="35" cy="23" r="14" fill="#DCFCE7" opacity="0.9" />
                        <text x="35" y="31" textAnchor="middle" fill="#16A34A" style={{ fontFamily: "Inter, sans-serif", fontSize: "20px", fontWeight: 700 }}>$</text>
                    </g>
                    </g>

                    {/* Coin stack */}
                    <g transform="translate(210, 130)">
                    {/* Bottom coins */}
                    <ellipse cx="26" cy="42" rx="26" ry="4" fill="#FBBF24" />
                    <rect x="0" y="38" width="52" height="8" fill="#F59E0B" />
                    
                    {/* Second layer */}
                    <ellipse cx="26" cy="38" rx="26" ry="4" fill="#FDE047" />
                    <rect x="0" y="34" width="52" height="8" fill="#FCD34D" />
                    
                    {/* Third layer */}
                    <ellipse cx="26" cy="34" rx="26" ry="4" fill="#FDE047" />
                    <rect x="0" y="30" width="52" height="8" fill="#FCD34D" />
                    
                    {/* Top layer */}
                    <ellipse cx="26" cy="30" rx="26" ry="4" fill="#FDE047" />
                    
                    {/* Dollar sign on coin */}
                    <circle cx="26" cy="26" r="12" fill="#FEF3C7" />
                    <text x="26" y="32" textAnchor="middle" fill="#B45309" style={{ fontFamily: "Inter, sans-serif", fontSize: "16px", fontWeight: 700 }}>$</text>
                    </g>
                </svg>
                </div>
            </div>

            {/* Right Section - Form */}
            <div className="relative flex w-full shrink-0 flex-col items-start justify-start gap-0 overflow-hidden bg-[#FAFAFA] p-8 md:w-[456px] md:p-12">
                {/* Form Fields */}
                <div className="relative flex w-full flex-col items-start justify-start gap-6 self-stretch">
                {/* Grant Name */}
                <div className="relative flex w-full flex-col items-start justify-start gap-2 self-stretch">
                    <label htmlFor="grant-name" className="relative text-black w-full self-stretch text-left text-sm leading-5" style={{ fontFamily: "Inter, sans-serif", fontWeight: 500, letterSpacing: "0px" }}>
                    Grant Name <span className="italic">*</span>
                    </label>
                    <input
                    id="grant-name"
                    type="text"
                    value={grantName}
                    onChange={(e) => setGrantName(e.target.value)}
                    className="w-full border-0 border-b border-[#0F172A] text-black bg-transparent  text-sm outline-none focus:border-b-2"
                    style={{ fontFamily: "Inter, sans-serif" }}
                    />
                </div>

                {/* Grant Link/url */}
                <div className="relative flex w-full flex-col items-start justify-start gap-2 self-stretch">
                    <label htmlFor="grant-link" className="relative text-black w-full self-stretch text-left text-sm leading-5" style={{ fontFamily: "Inter, sans-serif", fontWeight: 500, letterSpacing: "0px" }}>
                    Grant Link/url <span className="italic">*</span>
                    </label>
                    <input
                    id="grant-link"
                    type="url"
                    value={grantLink}
                    onChange={(e) => setGrantLink(e.target.value)}
                    className="w-full border-0 border-b text-black border-[#0F172A] bg-transparent  text-sm outline-none focus:border-b-2"
                    style={{ fontFamily: "Inter, sans-serif" }}
                    />
                </div>

                {/* Grant Deadline */}
                <div className="relative flex w-full flex-col items-start justify-start gap-2 self-stretch">
                    <label htmlFor="grant-deadline" className="relative w-full text-black self-stretch text-left text-sm leading-5" style={{ fontFamily: "Inter, sans-serif", fontWeight: 500, letterSpacing: "0px" }}>
                    Grant Deadline :
                    </label>
                    <input
                    id="grant-deadline"
                    type="date"
                    value={grantDeadline}
                    onChange={(e) => setGrantDeadline(e.target.value)}
                    className="w-full border-0 border-b border-[#0F172A] text-black/50 bg-transparent  text-sm outline-none focus:border-b-2"
                    style={{ fontFamily: "Inter, sans-serif" }}
                    />
                </div>

                {/* Upload Area */}
                <label className="relative mt-2 flex h-[140px] text-black w-full cursor-pointer flex-col items-center justify-center gap-2 self-stretch rounded-lg border-2 border-dashed border-[#CBD5E1] bg-white transition-colors hover:border-[#94A3B8] hover:bg-[#F8FAFC]">
                    <input
                    type="file"
                    accept="image/png,image/jpeg,image/jpg"
                    onChange={handleFileChange}
                    className="hidden"
                    />
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.6838 1.78782C6.00102 1.78782 3.65911 1.78782 2.20508 3.24185C0.751045 4.69588 0.75 7.03674 0.75 11.7174C0.75 16.3981 0.75 18.739 2.20508 20.193C3.65911 21.647 6.00102 21.647 10.6827 21.647C15.3655 21.647 17.7074 21.647 19.1615 20.193C20.6155 18.739 20.6165 16.3981 20.6165 11.7174V11.1951" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M9.9 24.398L16.5 17.798L23.1 24.398L24.398 23.1L17.798 16.5L24.398 9.9L23.1 8.602L16.5 15.202L9.9 8.602L8.602 9.9L15.202 16.5L8.602 23.1L9.9 24.398Z" fill="#94A3B8" transform="scale(0.5) translate(8, 4)" />
                    </svg>
                    {logoFile ? (
                    <p className="text-center text-sm leading-5" style={{ fontFamily: "Inter, sans-serif", fontWeight: 500, color: "#0F172A" }}>
                        {logoFile.name}
                    </p>
                    ) : (
                    <>
                        <p className="text-center text-sm leading-5" style={{ fontFamily: "Inter, sans-serif", fontWeight: 500, color: "#0F172A" }}>
                        Click to add logo image
                        </p>
                        <p className="text-center text-xs leading-4" style={{ fontFamily: "Inter, sans-serif", fontWeight: 400, color: "#64748B" }}>
                        PNG, JPG up to 5MB
                        </p>
                    </>
                    )}
                </label>

                {/* Add Grant Button */}
                <button
                    onClick={handleSubmit}
                    className="relative mt-4 flex h-12 items-center justify-center gap-2 rounded-full bg-[#0F172A] px-6 py-3 transition-transform hover:scale-105 active:scale-95"
                >
                    <span className="text-center text-sm leading-5" style={{ fontFamily: "Inter, sans-serif", fontWeight: 500, color: "#FFFFFF" }}>
                    Add Grant
                    </span>
                    <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.5227 8.4375H0V6.5625H16.5227L11.4318 1.3125L12.7273 0L20 7.5L12.7273 15L11.4318 13.6875L16.5227 8.4375Z" fill="#FFFFFF" />
                    </svg>
                </button>
                </div>
            </div>

            {/* Close Button */}
            <button
                onClick={() => setIsHidden(false)}
                className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full border border-[#94A3B8] bg-white/80 backdrop-blur-sm transition-all hover:bg-white hover:border-[#64748B] md:right-6 md:top-6">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4.4 12.398L8 8.798L11.6 12.398L12.898 11.1L9.298 7.5L12.898 3.9L11.6 2.602L8 6.202L4.4 2.602L3.102 3.9L6.702 7.5L3.102 11.1L4.4 12.398Z" fill="#64748B" />
                </svg>
            </button>
        </div>
    </div>
  );
}
