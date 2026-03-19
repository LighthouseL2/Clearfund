import { useState, useEffect } from "react";
import Image from "next/image";
import { usePrivy } from "@privy-io/react-auth";
import { useContractWrite } from "@/hooks/web3/useContract";
import { useNetworkCheck } from "@/hooks/web3/useNetworkCheck";
import { useIPFSUpload } from "@/hooks/ipfs/useIPFSUpload";
import { dateToTimestamp } from "@/lib/services/grant.service";

import { useAuthModal } from "@/components/ClientWrapper";

/**
 * Form component for submitting ReFi Projects
 * Updated for V2.2 with Compulsory Banner & Logo
 */
export function Form({ setIsHidden }) {
    const { authenticated } = usePrivy();
    const { openAuthModal } = useAuthModal();
    const { execute, isPending: isSubmitting, isConfirmed, isConfirming, isSwitching } = useContractWrite();
    const { isCorrectNetwork, switchToCelo } = useNetworkCheck();

    // Separate upload hooks for Logo and Banner
    const logoUpload = useIPFSUpload();
    const bannerUpload = useIPFSUpload();

    const [formData, setFormData] = useState({
        name: "",
        link: "",
        location: "",
        description: "",
        impactDescription: "",
        milestones: "",
        category: "REFI_PROJECT",
        twitter: "",
        github: "",
        karmaLink: "",
        walletAddress: ""
    });

    const [logoFile, setLogoFile] = useState(null);
    const [bannerFile, setBannerFile] = useState(null);
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

    const handleFileChange = (e, type) => {
        if (e.target.files && e.target.files[0]) {
            if (type === 'logo') setLogoFile(e.target.files[0]);
            if (type === 'banner') setBannerFile(e.target.files[0]);
        }
    };

    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async () => {
        if (!authenticated) {
            setShouldSubmitAfterLogin(true);
            openAuthModal();
            return;
        }

        if (!formData.name.trim() || !formData.link.trim() || !formData.location.trim() || !formData.walletAddress.trim() || !logoFile || !bannerFile) {
            setErrorMessage("Please fill in all required fields and upload BOTH Logo and Banner images (Compulsory).");
            setIsError(true);
            return;
        }

        try {
            setIsError(false);

            if (!isCorrectNetwork) {
                const switched = await switchToCelo();
                if (!switched) throw new Error("Please switch to Celo network.");
                await new Promise(r => setTimeout(r, 2000));
            }

            console.log("Uploading assets to IPFS...");
            const logoCID = await logoUpload.uploadFile(logoFile);
            const bannerCID = await bannerUpload.uploadFile(bannerFile);

            // Construct V2.3 parameters (No Deadline)
            const textInfo = [
                formData.name,
                formData.description,
                formData.location,
                formData.link,
                formData.twitter,
                formData.github,
                formData.impactDescription,
                formData.category
            ];

            const assets = [logoCID, bannerCID];

            await execute("submitProject", [
                textInfo,
                assets
            ]);

            // Database Sync
            await fetch('/api/projects', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formData.name,
                    description: formData.description,
                    location: formData.location,
                    website: formData.link,
                    twitter: formData.twitter,
                    github: formData.github,
                    karmaLink: formData.karmaLink,
                    milestones: formData.milestones,
                    impactDescription: formData.impactDescription,
                    category: formData.category,
                    logo: `https://ipfs.io/ipfs/${logoCID}`,
                    banner: `https://ipfs.io/ipfs/${bannerCID}`,
                    walletAddress: formData.walletAddress.trim(),
                    status: 'PENDING'
                })
            });

        } catch (error) {
            setErrorMessage(error?.shortMessage || error?.message || "Submission failed");
            setIsError(true);
        }
    };

    const isUploading = logoUpload.isUploading || bannerUpload.isUploading;

    if (isSubmitted) {
        return (
            <div className="fixed inset-0 flex justify-center items-center z-[100] p-4">
                <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsHidden(false)}></div>
                <div className="relative w-full max-w-[420px] bg-white rounded-[32px] p-8 animate-in fade-in zoom-in">
                    <div className="flex flex-col items-center py-4">
                        <div className="w-20 h-20 bg-[#00AFAA] rounded-full flex items-center justify-center mb-6 shadow-lg">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4"><path d="M20 6L9 17l-5-5" /></svg>
                        </div>
                        <h2 className="text-xl font-bold text-gray-800 text-center mb-8">Successfully Submitted!</h2>
                        <button onClick={() => setIsHidden(false)} className="w-full bg-[#00AFAA] text-white font-bold py-4 rounded-full">Continue</button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 flex justify-center items-center h-screen z-[100] p-4 overflow-y-auto">
            <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={() => setIsHidden(false)}></div>

            <div className="relative flex w-full max-w-[950px] flex-col overflow-hidden rounded-[30px] bg-white shadow-2xl md:flex-row animate-in slide-in-from-bottom-8">
                <button onClick={() => setIsHidden(false)} className="absolute right-6 top-6 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-white shadow-md hover:bg-gray-100"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" /></svg></button>

                <div className="flex w-full shrink-0 flex-col items-start justify-center p-8 md:w-2/5 bg-gray-50/50">
                    <h1 className="text-[32px] leading-tight font-black tracking-tighter mb-4">Submit your <br /><span className="text-[#00AFAA]">Project</span></h1>
                    <p className="text-gray-500 text-sm font-medium mb-8">Join the regenerative finance movement. Banner and logo are now mandatory.</p>
                    <Image src="/assets/add_grant_form_image.png" alt="Illustration" width={300} height={250} className="object-contain" />
                </div>

                <div className="w-full p-6 md:p-10 md:w-3/5 max-h-[85vh] overflow-y-auto">
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-1">
                            <label className="text-xs font-bold uppercase italic">Project Name *</label>
                            <input type="text" value={formData.name} onChange={(e) => handleChange('name', e.target.value)} placeholder="e.g. Green Lagos" className="w-full border-b border-gray-200 py-2 outline-none focus:border-[#00AFAA] transition-colors" />
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className="text-xs font-bold uppercase italic">About this campaign *</label>
                            <textarea value={formData.description} onChange={(e) => handleChange('description', e.target.value)} placeholder="Tell us about your mission..." className="w-full border border-gray-100 bg-gray-50/30 rounded-xl p-3 outline-none focus:border-[#00AFAA] min-h-[70px]" />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col gap-1">
                                <label className="text-xs font-bold uppercase italic">Location *</label>
                                <input type="text" value={formData.location} onChange={(e) => handleChange('location', e.target.value)} placeholder="City, Country" className="w-full border-b border-gray-200 py-2 outline-none focus:border-[#00AFAA]" />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="text-xs font-bold uppercase italic">Category</label>
                                <select value={formData.category} onChange={(e) => handleChange('category', e.target.value)} className="w-full border-b border-gray-200 py-2 outline-none focus:border-[#00AFAA] bg-transparent">
                                    <option value="REFI_PROJECT">ReFi Project</option>
                                    <option value="CLIMATE">Climate</option>
                                </select>
                            </div>
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className="text-xs font-bold uppercase italic">Where your tip goes *</label>
                            <textarea value={formData.impactDescription} onChange={(e) => handleChange('impactDescription', e.target.value)} placeholder="How will tips be used?" className="w-full border border-gray-100 bg-gray-50/30 rounded-xl p-3 outline-none focus:border-[#00AFAA] min-h-[60px]" />
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className="text-xs font-bold uppercase italic">Project Milestones (Optional)</label>
                            <textarea value={formData.milestones} onChange={(e) => handleChange('milestones', e.target.value)} placeholder="What are your key goals?" className="w-full border border-gray-100 bg-gray-50/30 rounded-xl p-3 outline-none focus:border-[#00AFAA] min-h-[60px]" />
                        </div>

                        {/* Image Upload Grid */}
                        <div className="grid grid-cols-2 gap-4 my-2">
                            <label className={`flex h-20 w-full cursor-pointer flex-col items-center justify-center border-2 border-dashed rounded-xl transition-colors ${logoFile ? 'border-green-400 bg-green-50/20' : 'border-gray-200 bg-gray-50/50 hover:border-[#00AFAA]'}`}>
                                <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, 'logo')} className="hidden" />
                                <span className={`text-[10px] font-bold ${logoFile ? 'text-green-600' : 'text-gray-500'}`}>
                                    {logoFile ? `Logo: ${logoFile.name.substring(0, 10)}...` : "Logo Image *"}
                                </span>
                            </label>

                            <label className={`flex h-20 w-full cursor-pointer flex-col items-center justify-center border-2 border-dashed rounded-xl transition-colors ${bannerFile ? 'border-green-400 bg-green-50/20' : 'border-gray-200 bg-gray-50/50 hover:border-[#00AFAA]'}`}>
                                <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, 'banner')} className="hidden" />
                                <span className={`text-[10px] font-bold ${bannerFile ? 'text-green-600' : 'text-gray-500'}`}>
                                    {bannerFile ? `Banner: ${bannerFile.name.substring(0, 10)}...` : "Banner Image *"}
                                </span>
                            </label>
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className="text-xs font-bold uppercase italic">Project Link (Website) *</label>
                            <input type="url" value={formData.link} onChange={(e) => handleChange('link', e.target.value)} placeholder="https://..." className="w-full border-b border-gray-200 py-2 outline-none focus:border-[#00AFAA]" />
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className="text-xs font-bold uppercase italic">Recipient Wallet (Celo Network Only) *</label>
                            <input type="text" value={formData.walletAddress} onChange={(e) => handleChange('walletAddress', e.target.value)} placeholder="0x..." className="w-full border-b border-gray-200 py-2 outline-none focus:border-[#00AFAA] font-mono" />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col gap-1">
                                <label className="text-xs font-bold uppercase italic">Twitter (X)</label>
                                <input type="text" value={formData.twitter} onChange={(e) => handleChange('twitter', e.target.value)} placeholder="@handle" className="w-full border-b border-gray-200 py-2 outline-none focus:border-[#00AFAA]" />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="text-xs font-bold uppercase italic">Karma Link</label>
                                <input type="text" value={formData.karmaLink} onChange={(e) => handleChange('karmaLink', e.target.value)} placeholder="https://karma..." className="w-full border-b border-gray-200 py-2 outline-none focus:border-[#00AFAA]" />
                            </div>
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className="text-xs font-bold uppercase italic">GitHub</label>
                            <input type="text" value={formData.github} onChange={(e) => handleChange('github', e.target.value)} placeholder="repo link" className="w-full border-b border-gray-200 py-2 outline-none focus:border-[#00AFAA]" />
                        </div>

                        <button onClick={handleSubmit} disabled={isSubmitting || isConfirming || isUploading || isSwitching} className="w-full bg-[#00AFAA] text-white font-bold py-4 rounded-full mt-4 hover:bg-[#003E52] transition-colors shadow-lg disabled:opacity-50">
                            {isSwitching ? "Switching..." : isUploading ? "Uploading Images..." : isSubmitting ? "Submitting..." : isConfirming ? "Confirming..." : "Submit Project"}
                        </button>

                        {isError && <p className="text-red-500 text-[11px] text-center font-bold mt-2">{errorMessage}</p>}
                    </div>
                </div>
            </div>
        </div>
    );
}
