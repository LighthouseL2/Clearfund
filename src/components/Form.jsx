import { useState, useEffect } from "react";
import Image from "next/image";
import { usePrivy } from "@privy-io/react-auth";
import { useContractWrite } from "@/hooks/web3/useContract";
import { useIPFSUpload } from "@/hooks/ipfs/useIPFSUpload";
import { dateToTimestamp } from "@/lib/services/grant.service";
// import svgPaths from "../components/svgs";

export function Form({ setIsHidden }) {
    const { authenticated, login } = usePrivy();
    const { execute, isPending: isSubmitting, isConfirmed } = useContractWrite();
    const { uploadFile, isUploading } = useIPFSUpload();

    const [grantName, setGrantName] = useState("");
    const [grantLink, setGrantLink] = useState("");
    const [grantDeadline, setGrantDeadline] = useState("");
    const [logoFile, setLogoFile] = useState(null);
    const [shouldSubmitAfterLogin, setShouldSubmitAfterLogin] = useState(false);

    const [isSubmitted, setIsSubmitted] = useState(false);

    useEffect(() => {
        if (authenticated && shouldSubmitAfterLogin) {
            setShouldSubmitAfterLogin(false);
            handleSubmit();
        }
    }, [authenticated, shouldSubmitAfterLogin]);

    useEffect(() => {
        if (isConfirmed) {
            setIsSubmitted(true);
        }
    }, [isConfirmed]);

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setLogoFile(e.target.files[0]);
        }
    };

    const handleSubmit = async () => {
        if (!authenticated) {
            setShouldSubmitAfterLogin(true);
            login();
            return;
        }

        try {
            let imageCID = "";
            if (logoFile) {
                imageCID = await uploadFile(logoFile);
            } else {
                imageCID = "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco";
            }

            const deadlineTimestamp = grantDeadline ? dateToTimestamp(grantDeadline) : 0;

            await execute("submitGrant", [
                grantName.trim(),
                grantLink.trim(),
                BigInt(deadlineTimestamp),
                imageCID
            ]);
        } catch (error) {
            console.error("Submission failed:", error);
            alert("Submission failed. Please try again.");
        }
    };

    if (isSubmitted) {
        return (
            <div className="fixed inset-0 flex justify-center items-center z-50 p-4">
                <div className="absolute inset-0 bg-black/20" onClick={() => setIsHidden(false)}></div>
                <div className="relative w-full max-w-[624px] bg-white rounded-2xl shadow-2xl overflow-hidden flex animate-in fade-in zoom-in duration-300">
                    <div className="w-3 bg-[#39B54A]"></div>
                    <div className="flex-1 p-8 flex items-center justify-between">
                        <div className="flex items-center gap-5">
                            <div className="w-[60px] h-[60px] flex-shrink-0">
                                <Image
                                    src="/assets/donate_successful_icon.png"
                                    alt="Success"
                                    width={60}
                                    height={60}
                                    className="object-contain"
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <h2 className="text-[28px] font-bold text-[#39B54A] font-sans">Submitted !</h2>
                                <p className="text-[16px] text-[#00000080] font-sans">Grant added and submitted successfully.</p>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsHidden(false)}
                            className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors border border-gray-200"
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M18 6L6 18M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 flex justify-center items-center h-screen z-50 p-4 overflow-y-auto">
            <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={() => setIsHidden(false)}></div>

            <div className="relative flex min-h-[500px] w-full max-w-[900px] flex-col items-center justify-center overflow-hidden rounded-[30px] bg-white shadow-2xl md:flex-row animate-in fade-in slide-in-from-bottom-8 duration-500">
                {/* Close Button */}
                <button
                    onClick={() => setIsHidden(false)}
                    className="absolute right-6 top-6 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-gray-300 bg-white/90 transition-all hover:bg-gray-100 scale-100 hover:scale-110 active:scale-95 shadow-md">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                </button>

                {/* Left Section - Illustration and Text */}
                <div className="relative flex w-full shrink-0 flex-col items-start justify-center gap-4 p-8 md:w-1/2 md:p-10 lg:p-12">
                    <div className="flex flex-col gap-3">
                        <h1 className="text-black text-[34px] lg:text-[40px] leading-[1.05] font-black tracking-tighter" style={{ fontWeight: 900, fontFamily: "'Inter', sans-serif" }}>
                            Contribute to the <br /> future of funding.
                        </h1>
                        <p className="text-[#64748B] text-[14px] lg:text-[15px] leading-relaxed font-medium font-sans">
                            Add your grant opportunity to ClearFund and help creators, builders, and communities discover it faster.
                        </p>
                    </div>

                    {/* Illustration */}
                    <div className="relative mt-2 w-full h-[220px] lg:h-[260px]">
                        <Image
                            src="/assets/add_grant_form_image.png"
                            alt="Contribute Illustration"
                            fill
                            className="object-contain object-left-bottom"
                            priority
                        />
                    </div>
                </div>

                {/* Right Section - Form */}
                <div className="relative flex w-full flex-col p-4 md:p-8 md:w-1/2">
                    <div className="w-full rounded-[20px] bg-[#F9FBFC] p-6 lg:p-8 border border-gray-100 shadow-sm">
                        <div className="flex flex-col gap-6">
                            {/* Grant Name */}
                            <div className="flex flex-col gap-1.5">
                                <label htmlFor="grant-name" className="text-black text-xs font-bold font-sans italic">
                                    Grant Name *
                                </label>
                                <input
                                    id="grant-name"
                                    type="text"
                                    value={grantName}
                                    onChange={(e) => setGrantName(e.target.value)}
                                    placeholder="Enter grant name"
                                    className="w-full border-0 border-b border-[#0F172A]/20 text-black bg-transparent py-1.5 text-[14px] outline-none transition-all focus:border-black font-sans placeholder:text-gray-300"
                                />
                            </div>

                            {/* Grant Link/url */}
                            <div className="flex flex-col gap-1.5">
                                <label htmlFor="grant-link" className="text-black text-xs font-bold font-sans italic">
                                    Grant Link/url *
                                </label>
                                <input
                                    id="grant-link"
                                    type="url"
                                    value={grantLink}
                                    onChange={(e) => setGrantLink(e.target.value)}
                                    placeholder="https://example.com"
                                    className="w-full border-0 border-b border-[#0F172A]/20 text-black bg-transparent py-1.5 text-[14px] outline-none transition-all focus:border-black font-sans placeholder:text-gray-300"
                                />
                            </div>

                            {/* Grant Deadline */}
                            <div className="flex flex-col gap-1.5">
                                <label htmlFor="grant-deadline" className="text-black text-xs font-bold font-sans italic">
                                    Grant Deadline :
                                </label>
                                <input
                                    id="grant-deadline"
                                    type="date"
                                    value={grantDeadline}
                                    onChange={(e) => setGrantDeadline(e.target.value)}
                                    className="w-full border-0 border-b border-[#0F172A]/20 text-black/60 bg-transparent py-1.5 text-[14px] outline-none transition-all focus:border-black font-sans"
                                />
                            </div>

                            {/* Upload Area */}
                            <label className="relative flex h-[100px] w-full cursor-pointer flex-col items-center justify-center gap-1.5 rounded-xl border-2 border-dashed border-gray-300 bg-white transition-all hover:border-black hover:bg-gray-50 active:scale-95">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="hidden"
                                />
                                <div className="p-2 bg-gray-50 rounded-lg group-hover:bg-gray-100 transition-colors">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12" />
                                    </svg>
                                </div>
                                <div className="text-center">
                                    <p className="text-[12px] font-bold text-black font-sans">
                                        {logoFile ? (logoFile.name.length > 20 ? logoFile.name.substring(0, 20) + '...' : logoFile.name) : "Add logo image"}
                                    </p>
                                    <p className="text-[10px] font-medium text-gray-400 font-sans uppercase tracking-wider">
                                        PNG, JPG up to 5MB
                                    </p>
                                </div>
                            </label>

                            {/* Add Grant Button */}
                            <button
                                onClick={handleSubmit}
                                disabled={!grantName || !grantLink || isSubmitting || isUploading}
                                className="group relative flex h-[48px] w-full items-center justify-center gap-3 rounded-full bg-black px-8 transition-all hover:bg-gray-900 active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed shadow-lg"
                            >
                                <span className="text-[15px] font-bold text-white font-sans">
                                    {isSubmitting ? "Submitting..." : "Add Grant"}
                                </span>
                                {!isSubmitting && (
                                    <svg className="transition-transform group-hover:translate-x-1" width="18" height="14" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M16.5227 8.4375H0V6.5625H16.5227L11.4318 1.3125L12.7273 0L20 7.5L12.7273 15L11.4318 13.6875L16.5227 8.4375Z" fill="white" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
