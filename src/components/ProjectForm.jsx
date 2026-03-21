'use client';

import React, { useState } from 'react';
import { usePrivy, useWallets } from '@privy-io/react-auth';
import { useIPFSUpload } from '@/hooks/ipfs/useIPFSUpload';
import { Upload, CheckCircle2, AlertCircle } from 'lucide-react';
import { useAuthModal } from '@/components/ClientWrapper';
import { custom, createWalletClient, createPublicClient, http, parseEther } from 'viem';
import { celo } from 'viem/chains';

const REGISTRY_ABI = [
    {
        "inputs": [
            { "internalType": "string[9]", "name": "textInfo", "type": "string[9]" },
            { "internalType": "string[2]", "name": "assets", "type": "string[2]" }
        ],
        "name": "submitProject",
        "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
        "stateMutability": "payable",
        "type": "function"
    }
];

const REGISTRY_ADDRESS = process.env.NEXT_PUBLIC_CLEARFUND_REGISTRY_ADDRESS;

const ProjectForm = () => {
    const { authenticated, user } = usePrivy();
    const { wallets } = useWallets();
    const { openAuthModal } = useAuthModal();
    const { uploadFile, isUploading } = useIPFSUpload();

    const [formData, setFormData] = useState({
        name: '',
        category: '',
        description: '',
        location: '',
        email: '',
        whereTipGoes: '',
        logo: '',
        walletAddress: '',
        website: '',
        twitter: '',
        github: '',
    });

    const [logoFile, setLogoFile] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
            if (!validTypes.includes(file.type)) {
                setError('Please upload a valid image file (PNG or JPEG only).');
                e.target.value = ''; // Reset the input
                return;
            }
            setError(''); // Clear any previous error
            setLogoFile(file);
        }
    };

    const validate = () => {
        if (!formData.category) return 'Please select a category.';
        if (formData.name.length < 3) return 'Project name must be at least 3 characters.';
        if (formData.description.length < 50) return 'Description must be at least 50 characters.';
        if (!formData.location) return 'Location is required.';
        if (!formData.whereTipGoes) return 'Please specify where the tips go.';
        if (!formData.walletAddress.startsWith('0x') || formData.walletAddress.length !== 42) return 'Invalid wallet address.';
        if (!formData.website) return 'Website is required.';
        if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) return 'A valid email address is required.';
        return null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!authenticated) {
            openAuthModal();
            return;
        }

        const validationError = validate();
        if (validationError) {
            setError(validationError);
            return;
        }

        setIsSubmitting(true);

        try {
            let logoUrl = formData.logo;
            if (logoFile) {
                const cid = await uploadFile(logoFile);
                logoUrl = `https://gateway.pinata.cloud/ipfs/${cid}`;
            } else if (!logoUrl) {
                logoUrl = '/assets/projectIcon.png';
            }

            // --- 1. BLOCKCHAIN TRANSACTION (0.05 CELO SECURE FEE) ---
            const wallet = wallets[0];
            if (!wallet) throw new Error("No Web3 wallet connected. Ensure your wallet is connected.");

            // Switch network to Celo if required
            if (wallet.chainId !== `eip155:${celo.id}`) {
                try {
                    await wallet.switchChain(celo.id);
                    await new Promise(res => setTimeout(res, 1500)); // wait for provider sync
                } catch (e) {
                    throw new Error("Failed to switch to Celo network. Please switch manually in your wallet.");
                }
            }

            const provider = await wallet.getEthereumProvider();
            const publicClient = createPublicClient({ chain: celo, transport: http("https://forno.celo.org") });
            const walletClient = createWalletClient({ chain: celo, transport: custom(provider), account: wallet.address });

            const textInfo = [
                formData.name,
                formData.description,
                formData.location,
                formData.website,
                formData.twitter || "",
                formData.github || "",
                formData.whereTipGoes,
                formData.category,
                formData.email
            ];
            const assetsArr = [logoUrl, logoUrl]; // We enforce banner, use it for both slots on contract to save users gas.

            // Estimate Gas and Execute interaction
            let gasLimit = 600000n; // Fallback safe limit
            try {
                const estimate = await publicClient.estimateContractGas({
                    address: REGISTRY_ADDRESS,
                    abi: REGISTRY_ABI,
                    functionName: 'submitProject',
                    args: [textInfo, assetsArr],
                    value: parseEther("0.05"),
                    account: wallet.address
                });
                gasLimit = (estimate * 120n) / 100n; // 20% buffer
            } catch (estimateError) {
                console.warn("Gas estimation warning, using fallback:", estimateError);
                // Check if it's an insufficient funds error to give a better popup
                if (estimateError.message && estimateError.message.includes("insufficient funds")) {
                    throw new Error("Insufficient CELO for the 0.05 CELO fee + gas.");
                }
            }

            const txHash = await walletClient.writeContract({
                address: REGISTRY_ADDRESS,
                abi: REGISTRY_ABI,
                functionName: 'submitProject',
                args: [textInfo, assetsArr],
                value: parseEther("0.05"),
                gas: gasLimit
            });

            // Wait for confirmation
            await publicClient.waitForTransactionReceipt({ hash: txHash, confirmations: 1 });


            // --- 2. BACKEND DATABASE SUBMISSION (For Admin Dashboard) ---
            const response = await fetch('/api/projects', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    logo: logoUrl,
                    submittedBy: user?.wallet?.address,
                    onChainTxHash: txHash, // Log the proof of fee
                }),
            });

            const data = await response.json();
            if (data.success) {
                setIsSubmitted(true);
            } else {
                throw new Error(data.error || 'Failed to submit project');
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSubmitted) {
        return (
            <div className="fixed inset-0 z-[999] flex items-center justify-center p-4" style={{ fontFamily: '"Inter", sans-serif' }}>
                {/* Blurred dark backdrop */}
                <div className="absolute inset-0 bg-black/60 backdrop-blur-md"></div>

                {/* Animated gradient glow behind card */}
                <div className="absolute w-[500px] h-[500px] rounded-full opacity-30 pointer-events-none"
                    style={{ background: 'radial-gradient(circle, #00AFAA 0%, #003E52 60%, transparent 80%)', filter: 'blur(80px)' }}>
                </div>

                {/* Popup card */}
                <div className="relative bg-white rounded-[2rem] p-10 max-w-md w-full shadow-[0_30px_80px_rgba(0,0,0,0.35)] border border-gray-100 text-center"
                    style={{ animation: 'popIn 0.45s cubic-bezier(0.34,1.56,0.64,1) both' }}>

                    {/* Animated check icon with rings */}
                    <div className="relative flex items-center justify-center mx-auto mb-8 w-28 h-28">
                        {/* Outer pulse ring */}
                        <div className="absolute w-28 h-28 rounded-full bg-[#00AFAA]/10"
                            style={{ animation: 'pingRing 2s ease-in-out infinite' }}></div>
                        {/* Mid ring */}
                        <div className="absolute w-20 h-20 rounded-full bg-[#00AFAA]/20"></div>
                        {/* Inner filled circle */}
                        <div className="w-14 h-14 rounded-full bg-[#00AFAA] flex items-center justify-center shadow-[0_8px_24px_rgba(0,175,170,0.4)]">
                            <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}
                                style={{ animation: 'drawCheck 0.5s ease 0.3s both' }}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                    </div>

                    {/* Headline */}
                    <h2 className="text-[2rem] font-black text-[#003E52] tracking-tight leading-tight mb-2">
                        Project Submitted!
                    </h2>
                    <p className="text-gray-400 text-sm font-medium uppercase tracking-widest mb-6">
                        You're on your way 🌍
                    </p>

                    {/* Divider */}
                    <div className="w-12 h-[2px] bg-[#00AFAA] mx-auto mb-6 rounded-full"></div>

                    {/* Description */}
                    <p className="text-gray-600 text-[1rem] leading-relaxed mb-8">
                        Your project has been received and is now under review by our team.
                        Once approved, it will go live on the ClearFund platform and start
                        receiving support from the community.
                    </p>

                    {/* What happens next */}
                    <div className="bg-[#f7fafa] border border-[#00AFAA]/20 rounded-[1rem] p-5 mb-8 text-left space-y-3">
                        <p className="text-xs font-black text-[#003E52] uppercase tracking-widest mb-2">What happens next</p>
                        {[
                            { step: '01', text: 'Our team reviews your submission' },
                            { step: '02', text: 'You receive an email notification' },
                            { step: '03', text: 'Your project goes live on ClearFund' },
                        ].map(({ step, text }) => (
                            <div key={step} className="flex items-center gap-3">
                                <span className="w-7 h-7 rounded-full bg-[#003E52] text-white text-[0.7rem] font-black flex items-center justify-center shrink-0">{step}</span>
                                <span className="text-sm text-gray-600 font-medium">{text}</span>
                            </div>
                        ))}
                    </div>

                    {/* CTAs */}
                    <div className="space-y-3">
                        <button
                            onClick={() => window.location.href = '/projects'}
                            className="w-full py-4 bg-[#00AFAA] hover:bg-[#009e99] text-white font-black text-[1rem] rounded-[0.9rem] transition-all hover:-translate-y-[2px] active:translate-y-0 shadow-[0_6px_20px_rgba(0,175,170,0.35)]"
                        >
                            Explore Projects
                        </button>
                        <button
                            onClick={() => { setIsSubmitted(false); setFormData({ name: '', category: '', description: '', location: '', email: '', whereTipGoes: '', logo: '', walletAddress: '', website: '', twitter: '', github: '' }); setLogoFile(null); }}
                            className="w-full py-4 bg-transparent border-[2px] border-[#003E52] text-[#003E52] font-black text-[1rem] rounded-[0.9rem] transition-all hover:bg-[#003E52] hover:text-white"
                        >
                            Submit Another Project
                        </button>
                    </div>
                </div>

                {/* Inline keyframe styles */}
                <style>{`
                    @keyframes popIn {
                        from { opacity: 0; transform: scale(0.85) translateY(20px); }
                        to   { opacity: 1; transform: scale(1) translateY(0); }
                    }
                    @keyframes pingRing {
                        0%, 100% { transform: scale(1); opacity: 0.6; }
                        50% { transform: scale(1.18); opacity: 0.15; }
                    }
                    @keyframes drawCheck {
                        from { stroke-dashoffset: 40; opacity: 0; }
                        to   { stroke-dashoffset: 0; opacity: 1; }
                    }
                `}</style>
            </div>
        );
    }

    return (
        <div style={{ fontFamily: '"Inter", sans-serif' }} className="w-full text-black">
            <form onSubmit={handleSubmit} className="w-full max-w-4xl mx-auto space-y-12 pb-6">
                {/* Error Alert */}
                {error && (
                    <div className="p-5 border-[2px] border-red-500 bg-red-50 text-red-700 font-bold rounded-[1rem] flex items-center gap-3">
                        <AlertCircle className="h-6 w-6 shrink-0" />
                        {error}
                    </div>
                )}

                {/* Section 1 */}
                <div>
                    <h2 className="text-[2.2rem] font-black tracking-tight mb-8">1. Basics</h2>
                    <div className="space-y-8">
                        <div className="space-y-3">
                            <label className="text-[1.35rem] font-black block">Project Name*</label>
                            <input
                                required
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                placeholder="ClearFund"
                                className="w-full bg-[#fcfaf5] border-[2px] border-black rounded-[0.8rem] px-5 py-4 text-lg font-medium outline-none focus:ring-1 focus:ring-black placeholder:text-gray-400"
                            />
                        </div>

                        <div className="space-y-3">
                            <label className="text-[1.35rem] font-black block">Category*</label>
                            <select
                                required
                                name="category"
                                value={formData.category}
                                onChange={handleInputChange}
                                className="w-full bg-[#fcfaf5] border-[2px] border-black rounded-[0.8rem] px-5 py-4 text-lg font-medium outline-none focus:ring-1 focus:ring-black cursor-pointer"
                            >
                                <option value="" disabled>Select Category</option>
                                <option value="CLIMATE">Climate</option>
                                <option value="SOCIAL_IMPACT">Social Impact</option>
                                <option value="EDUCATION">Education</option>
                            </select>
                        </div>

                        <div className="space-y-3">
                            <label className="text-[1.35rem] font-black block">Location*</label>
                            <input
                                required
                                name="location"
                                value={formData.location}
                                onChange={handleInputChange}
                                placeholder="e.g. Spain, or Global"
                                className="w-full bg-[#fcfaf5] border-[2px] border-black rounded-[0.8rem] px-5 py-4 text-lg font-medium outline-none focus:ring-1 focus:ring-black placeholder:text-gray-400"
                            />
                        </div>

                        <div className="space-y-3">
                            <label className="text-[1.35rem] font-black block">Contact Email*</label>
                            <p className="text-[0.9rem] text-gray-500 font-normal -mt-1">We'll notify you when your project is reviewed.</p>
                            <input
                                required
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder="hello@yourproject.com"
                                className="w-full bg-[#fcfaf5] border-[2px] border-black rounded-[0.8rem] px-5 py-4 text-lg font-medium outline-none focus:ring-1 focus:ring-black placeholder:text-gray-400"
                            />
                        </div>
                    </div>
                </div>

                {/* Section 2 */}
                <div>
                    <h2 className="text-[2.2rem] font-black tracking-tight mb-8">2. Project Details</h2>
                    <div className="space-y-8">
                        <div className="space-y-3">
                            <label className="text-[1.35rem] font-black block">Description*</label>
                            <textarea
                                required
                                name="description"
                                rows={6}
                                value={formData.description}
                                onChange={handleInputChange}
                                placeholder="ClearFund is an active impact engine..."
                                className="w-full bg-[#fcfaf5] border-[2px] border-black rounded-[0.8rem] px-5 py-4 text-lg font-medium outline-none focus:ring-1 focus:ring-black resize-none placeholder:text-gray-400"
                            />
                        </div>

                        <div className="space-y-3">
                            <label className="text-[1.35rem] font-black block">Banner Image* (Max 5MB)</label>
                            <div className="flex flex-col md:flex-row gap-6 items-start mt-2">
                                <label className="cursor-pointer block w-full md:w-64">
                                    <div className="w-full h-32 border-[2px] border-dashed border-black rounded-[0.8rem] flex flex-col items-center justify-center hover:bg-black/5 transition-colors">
                                        <Upload className="h-8 w-8 text-[#b3b2b2] mb-1" />
                                        <span className="text-[0.95rem] tracking-tight font-medium text-[#c0bfbf]">Upload a PNG or JPEG</span>
                                    </div>
                                    <input type="file" required={!logoFile && !formData.logo} className="hidden" accept="image/png, image/jpeg, image/jpg" onChange={handleFileChange} />
                                </label>

                                {logoFile && (
                                    <div className="flex items-center gap-4">
                                        <div className="w-32 h-32 bg-black rounded-[0.8rem] flex items-center justify-center p-3 border-[2px] border-black overflow-hidden relative">
                                            <span className="text-white text-xs font-bold text-center break-all">{logoFile.name}</span>
                                        </div>
                                        <button type="button" onClick={() => setLogoFile(null)} className="text-[2.5rem] text-black hover:text-red-500 font-light transition-colors pb-1">
                                            ×
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Section 3 */}
                <div>
                    <h2 className="text-[2.2rem] font-black tracking-tight mb-8">3. Funding Wallet</h2>
                    <div className="space-y-8">
                        <div className="space-y-3">
                            <label className="text-[1.35rem] font-black block">Recipient Wallet (Celo only)*</label>
                            <p className="text-[0.95rem] font-normal text-gray-500 mb-2">Provides the primary wallet for receiving direct tips on the network.</p>
                            <input
                                required
                                name="walletAddress"
                                value={formData.walletAddress}
                                onChange={handleInputChange}
                                placeholder="0x..."
                                className="w-full bg-[#e1e9e7] border-[2px] border-[#2D4D47] rounded-[0.8rem] px-5 py-4 text-lg font-medium text-[#2D4D47] outline-none placeholder:text-[#2D4D47]/60"
                            />
                        </div>

                        <div className="space-y-3">
                            <label className="text-[1.35rem] font-black block">Where Your Tip Goes*</label>
                            <input
                                required
                                name="whereTipGoes"
                                value={formData.whereTipGoes}
                                onChange={handleInputChange}
                                placeholder="Equipment, local training, seed funding..."
                                className="w-full bg-[#fcfaf5] border-[2px] border-black rounded-[0.8rem] px-5 py-4 text-lg font-medium outline-none focus:ring-1 focus:ring-black placeholder:text-gray-400"
                            />
                        </div>
                    </div>
                </div>

                {/* Section 4 */}
                <div>
                    <h2 className="text-[2.2rem] font-black tracking-tight mb-8">4. Social</h2>
                    <div className="space-y-8">
                        <div className="space-y-3">
                            <label className="text-[1.35rem] font-black block">Website*</label>
                            <input
                                required
                                name="website"
                                value={formData.website}
                                onChange={handleInputChange}
                                placeholder="https://..."
                                className="w-full bg-[#fcfaf5] border-[2px] border-black rounded-[0.8rem] px-5 py-4 text-lg font-medium outline-none focus:ring-1 focus:ring-black placeholder:text-gray-400"
                            />
                        </div>
                        <div className="space-y-3">
                            <label className="text-[1.35rem] font-black block">X/Twitter</label>
                            <input
                                name="twitter"
                                value={formData.twitter}
                                onChange={handleInputChange}
                                placeholder="https://x.com/..."
                                className="w-full bg-[#fcfaf5] border-[2px] border-black rounded-[0.8rem] px-5 py-4 text-lg font-medium outline-none focus:ring-1 focus:ring-black placeholder:text-gray-400"
                            />
                        </div>
                        <div className="space-y-3">
                            <label className="text-[1.35rem] font-black block">GitHub</label>
                            <input
                                name="github"
                                value={formData.github}
                                onChange={handleInputChange}
                                placeholder="https://github.com/..."
                                className="w-full bg-[#fcfaf5] border-[2px] border-black rounded-[0.8rem] px-5 py-4 text-lg font-medium outline-none focus:ring-1 focus:ring-black placeholder:text-gray-400"
                            />
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="pt-2 space-y-4">
                    {/* Review notice */}
                    <div className="flex items-start gap-3 bg-[#003E52]/8 border-[2px] border-[#003E52]/20 rounded-[0.8rem] px-5 py-4">
                        <svg className="w-5 h-5 mt-0.5 shrink-0 text-[#003E52]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <div className="flex flex-col gap-1.5">
                            <p className="text-[0.95rem] text-[#003E52] font-medium leading-snug">
                                Your project will be reviewed by our team before it goes live on the platform. You'll be notified once it's approved.
                            </p>
                            <p className="text-[0.85rem] text-[#003E52]/80 font-bold">
                                🛡️ A one-time <span className="text-[#00AFAA]">0.05 CELO</span> security fee is required to submit. This acts as an anti-spam measure to ensure the high quality of projects reviewing.
                            </p>
                        </div>
                    </div>
                    <button
                        type="submit"
                        disabled={isSubmitting || isUploading}
                        className="w-full py-[1.15rem] bg-[#00AFAA] hover:bg-[#009e99] text-white font-bold text-[1.25rem] tracking-wide rounded-[0.8rem] border-[2px] border-transparent transition-colors flex items-center justify-center gap-2 disabled:opacity-50 outline-none"
                    >
                        {isSubmitting || isUploading ? (
                            <div className="flex items-center gap-2">
                                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                <span className="text-[1rem] font-medium">Please sign the transaction in your wallet...</span>
                            </div>
                        ) : (
                            "Submit Project (0.05 CELO)"
                        )}
                    </button>
                    <button
                        type="button"
                        onClick={() => window.location.href = '/projects'}
                        className="w-full py-[1.15rem] bg-[#003E52] hover:bg-[#002f3f] text-white font-bold text-[1.25rem] tracking-wide rounded-[0.8rem] border-[2px] border-transparent transition-colors outline-none"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ProjectForm;
