import { useState, useEffect } from "react";
import Image from "next/image";
import { usePrivy } from "@privy-io/react-auth";
import { useContractWrite } from "@/hooks/web3/useContract";
import { useNetworkCheck } from "@/hooks/web3/useNetworkCheck";
import { useIPFSUpload } from "@/hooks/ipfs/useIPFSUpload";
import { dateToTimestamp } from "@/lib/services/grant.service";
// import svgPaths from "../components/svgs";

export function Form({ setIsHidden }) {
    const { authenticated, login } = usePrivy();
    const { execute, isPending: isSubmitting, isConfirmed } = useContractWrite();
    const { isCorrectNetwork, switchToCelo } = useNetworkCheck();
    const { uploadFile, isUploading } = useIPFSUpload();

    const [grantName, setGrantName] = useState("");
    const [grantLink, setGrantLink] = useState("");
    const [grantDeadline, setGrantDeadline] = useState("");
    const [logoFile, setLogoFile] = useState(null);
    const [shouldSubmitAfterLogin, setShouldSubmitAfterLogin] = useState(false);

    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

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

        if (!grantName.trim() || !grantLink.trim()) {
            setErrorMessage("Grant name and link are required.");
            setIsError(true);
            return;
        }

        try {
            setIsError(false);

            // Auto network switch
            if (!isCorrectNetwork) {
                const switched = await switchToCelo();
                if (!switched) {
                    throw new Error("Please switch to Celo network to submit a grant.");
                }
                // Wait for provider/wagmi to sync after switch
                await new Promise(r => setTimeout(r, 2000));
            }

            let imageCID = "";
            if (logoFile) {
                imageCID = await uploadFile(logoFile);
            } else {
                imageCID = "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco";
            }

            // Set default deadline to 30 days from now if not provided
            // This prevents contract reverts on MIN_DEADLINE_DURATION
            const thirtyDaysInSeconds = 30 * 24 * 60 * 60;
            const defaultTimestamp = Math.floor(Date.now() / 1000) + thirtyDaysInSeconds;
            const deadlineTimestamp = grantDeadline ? dateToTimestamp(grantDeadline) : defaultTimestamp;

            console.log("Submitting grant:", {
                title: grantName.trim(),
                url: grantLink.trim(),
                deadline: deadlineTimestamp,
                imageCID
            });

            await execute("submitGrant", [
                grantName.trim(),
                grantLink.trim(),
                BigInt(deadlineTimestamp),
                imageCID
            ]);
        } catch (error) {
            console.error("Submission failed:", error);
            const detailedError = error?.message || "Something went wrong. Please check your wallet and try again.";
            setErrorMessage(detailedError);
            setIsError(true);
        }
    };

    if (isSubmitted) {
        return (
            <div className="fixed inset-0 flex justify-center items-center z-50 p-4">
                <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsHidden(false)}></div>
                <div className="relative w-full max-w-[420px] bg-white rounded-[32px] shadow-2xl overflow-hidden flex flex-col p-8 animate-in fade-in zoom-in duration-300">
                    {/* Close button */}
                    <button
                        onClick={() => setIsHidden(false)}
                        className="absolute top-6 right-6 w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                    </button>

                    <div className="flex flex-col items-center justify-center py-4 px-2">
                        {/* Glow effect container */}
                        <div className="relative mb-6">
                            <div className="absolute inset-0 bg-[#39B54A] opacity-20 blur-xl rounded-full"></div>
                            <div className="relative w-24 h-24 bg-[#39B54A] rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(57,181,74,0.4)]">
                                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M20 6L9 17l-5-5" />
                                </svg>
                            </div>
                        </div>

                        <h2 className="text-[20px] leading-tight font-bold text-gray-800 text-center mb-10 max-w-[280px]">
                            Your grant has been submitted successfully!
                        </h2>

                        <button
                            onClick={() => setIsHidden(false)}
                            className="w-full bg-[#39B54A] text-white font-bold py-4 rounded-full hover:bg-[#2e943c] transition-all shadow-lg active:scale-[0.98]"
                        >
                            Continue
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="fixed inset-0 flex justify-center items-center z-50 p-4">
                <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsError(false)}></div>
                <div className="relative w-full max-w-[420px] bg-white rounded-[32px] shadow-2xl overflow-hidden flex flex-col p-8 animate-in fade-in zoom-in duration-300">
                    {/* Close button */}
                    <button
                        onClick={() => setIsError(false)}
                        className="absolute top-6 right-6 w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                    </button>

                    <div className="flex flex-col items-center justify-center py-4 px-2">
                        {/* Error Circle */}
                        <div className="relative mb-6">
                            <div className="absolute inset-0 bg-[#FF2E2E] opacity-20 blur-xl rounded-full"></div>
                            <div className="relative w-24 h-24 bg-[#FF2E2E] rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(255,46,46,0.4)]">
                                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M18 6L6 18M6 6l12 12" />
                                </svg>
                            </div>
                        </div>

                        <h2 className="text-[24px] font-black text-gray-800 text-center mb-1">Error!</h2>
                        <p className="text-[16px] text-gray-500 text-center mb-10 font-medium">
                            Your grant submission could not be processed.
                        </p>

                        <button
                            onClick={() => setIsError(false)}
                            className="w-full bg-[#FF2E2E] text-white font-bold py-4 rounded-full hover:bg-[#e62929] transition-all shadow-lg active:scale-[0.98]"
                        >
                            Try again
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
