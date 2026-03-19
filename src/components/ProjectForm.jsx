'use client';

import React, { useState } from 'react';
import { usePrivy } from '@privy-io/react-auth';
import { useIPFSUpload } from '@/hooks/ipfs/useIPFSUpload';
import { Upload, CheckCircle2, ChevronRight, Info, AlertCircle, X } from 'lucide-react';
import { useAuthModal } from '@/components/ClientWrapper';

const ProjectForm = () => {
    const { authenticated, user } = usePrivy();
    const { openAuthModal } = useAuthModal();
    const { uploadFile, isUploading } = useIPFSUpload();

    const [formData, setFormData] = useState({
        name: '',
        category: 'REFI',
        description: '',
        location: '',
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
            setLogoFile(e.target.files[0]);
        }
    };

    const validate = () => {
        if (formData.name.length < 3) return 'Project name must be at least 3 characters.';
        if (formData.description.length < 50) return 'Description must be at least 50 characters.';
        if (!formData.location) return 'Location is required.';
        if (!formData.whereTipGoes) return 'Please specify where the tips go.';
        if (!formData.walletAddress.startsWith('0x') || formData.walletAddress.length !== 42) return 'Invalid wallet address.';
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

            const response = await fetch('/api/projects', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    logo: logoUrl,
                    submittedBy: user?.wallet?.address,
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
            <div className="max-w-md mx-auto bg-white p-10 rounded-[32px] shadow-xl border border-gray-100 text-center text-[#003E52]">
                <div className="w-20 h-20 bg-[#00AFAA]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="h-10 w-10 text-[#00AFAA]" />
                </div>
                <h2 className="text-2xl font-black mb-4">SUBMISSION SUCCESSFUL!</h2>
                <p className="text-gray-600 mb-8 font-medium">
                    Your project has been submitted for review. You'll be notified once it's live on the platform.
                </p>
                <button
                    onClick={() => window.location.href = '/projects'}
                    className="w-full bg-[#00AFAA] text-white font-black py-4 rounded-2xl transition-all shadow-lg uppercase tracking-widest text-[11px] hover:-translate-y-1 active:translate-y-0"
                >
                    Browse Projects
                </button>
            </div>
        );
    }

    return (
        <div style={{ fontFamily: '"Inter", sans-serif' }} className="max-w-4xl mx-auto bg-white rounded-[40px] shadow-2xl border border-gray-100 overflow-hidden lg:flex">
            {/* Left side: Info */}
            <div className="lg:w-1/3 bg-[#003E52] p-8 lg:p-12 text-white flex flex-col justify-between">
                <div>
                    <h2 className="text-base font-black mb-6 leading-tight uppercase tracking-tighter whitespace-nowrap">BRING YOUR VISION TO LIFE.</h2>
                    <p className="text-white/70 text-sm leading-relaxed mb-8 font-medium">
                        ClearFund helps impact projects get tips directly by the community. Join hundreds of projects making a difference.
                    </p>
                    <ul className="space-y-4">
                        <li className="flex items-start gap-3">
                            <div className="mt-1 bg-[#00AFAA] p-1 rounded-full"><CheckCircle2 className="h-3 w-3" /></div>
                            <span className="text-sm font-bold">Direct crypto tip</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <div className="mt-1 bg-[#00AFAA] p-1 rounded-full"><CheckCircle2 className="h-3 w-3" /></div>
                            <span className="text-sm font-bold">Global community reach</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <div className="mt-1 bg-[#00AFAA] p-1 rounded-full"><CheckCircle2 className="h-3 w-3" /></div>
                            <span className="text-sm font-bold">Verified impact status</span>
                        </li>
                    </ul>
                </div>
                <div className="mt-12 p-6 bg-white/5 rounded-[2rem] border border-white/10 backdrop-blur-sm">
                    <div className="flex items-center gap-2 mb-2 text-[#00AFAA]">
                        <Info className="h-4 w-4" />
                        <span className="text-[10px] font-black uppercase tracking-wider">Review Process</span>
                    </div>
                    <p className="text-[11px] text-white/50 leading-relaxed font-bold uppercase tracking-tight">
                        Your project will undergo a brief review to ensure alignment with platform guidelines.
                    </p>
                </div>
            </div>

            {/* Right side: Form */}
            <div className="lg:w-2/3 p-8 lg:p-12 bg-gray-50/30">
                <div className="mb-10 text-center lg:text-left">
                    <h2 className="text-2xl font-black text-[#003E52] uppercase tracking-tighter">SUBMIT YOUR PROJECT</h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    {error && (
                        <div className="p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-600 text-sm font-bold animate-pulse">
                            <AlertCircle className="h-5 w-5 shrink-0" />
                            {error}
                        </div>
                    )}

                    <div className="space-y-6">
                        <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">Project Basics</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="group space-y-2">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest group-hover:text-[#00AFAA] transition-colors italic">Project Name *</label>
                                <input
                                    required
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    placeholder="Climate Action Hub"
                                    className="w-full bg-white border border-gray-100 rounded-2xl px-5 py-4 text-sm font-bold focus:ring-2 focus:ring-[#00AFAA]/20 outline-none transition-all placeholder:text-[11px] placeholder:text-gray-200 placeholder:font-medium"
                                />
                            </div>
                            <div className="group space-y-2">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest group-hover:text-[#00AFAA] transition-colors italic">Category *</label>
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleInputChange}
                                    className="w-full bg-white border border-gray-100 rounded-2xl px-5 py-4 text-sm font-bold focus:ring-2 focus:ring-[#00AFAA]/20 outline-none transition-all cursor-pointer appearance-none"
                                >
                                    <option value="CLIMATE">Climate</option>
                                    <option value="SOCIAL_IMPACT">Social Impact</option>
                                    <option value="EDUCATION">Education</option>
                                </select>
                            </div>
                        </div>

                        <div className="group space-y-2">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest group-hover:text-[#00AFAA] transition-colors italic">Location *</label>
                            <input
                                required
                                name="location"
                                value={formData.location}
                                onChange={handleInputChange}
                                placeholder="Nairobi, Kenya"
                                className="w-full bg-white border border-gray-100 rounded-2xl px-5 py-4 text-sm font-bold focus:ring-2 focus:ring-[#00AFAA]/20 outline-none transition-all placeholder:text-[11px] placeholder:text-gray-200 placeholder:font-medium"
                            />
                        </div>

                        <div className="group space-y-2">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest group-hover:text-[#00AFAA] transition-colors italic">Full Description *</label>
                            <textarea
                                required
                                name="description"
                                rows={4}
                                value={formData.description}
                                onChange={handleInputChange}
                                placeholder="Describe your mission and impact..."
                                className="w-full bg-white border border-gray-100 rounded-2xl px-5 py-4 text-sm font-bold focus:ring-2 focus:ring-[#00AFAA]/20 outline-none transition-all min-h-[120px] resize-none placeholder:text-[11px] placeholder:text-gray-200 placeholder:font-medium"
                            />
                        </div>
                    </div>

                    <div className="space-y-6">
                        <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">Impact & Funding</h3>

                        <div className="group space-y-2">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest group-hover:text-[#00AFAA] transition-colors italic">Where your tip goes *</label>
                            <input
                                required
                                name="whereTipGoes"
                                value={formData.whereTipGoes}
                                onChange={handleInputChange}
                                placeholder="Equipment, local training, seed funding..."
                                className="w-full bg-white border border-gray-100 rounded-2xl px-5 py-4 text-sm font-bold focus:ring-2 focus:ring-[#00AFAA]/20 outline-none transition-all placeholder:text-[11px] placeholder:text-gray-200 placeholder:font-medium"
                            />
                        </div>

                        <div className="group space-y-2">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest group-hover:text-[#00AFAA] transition-colors italic">Recipient wallet (Celo network only) *</label>
                            <input
                                required
                                name="walletAddress"
                                value={formData.walletAddress}
                                onChange={handleInputChange}
                                placeholder="0x..."
                                className="w-full bg-white border border-gray-100 rounded-2xl px-5 py-4 text-sm font-bold focus:ring-2 focus:ring-[#00AFAA]/20 outline-none transition-all placeholder:text-[11px] placeholder:text-gray-200 placeholder:font-medium"
                            />
                        </div>

                        <div className="space-y-4">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest italic block">Banner image *</label>
                            <label className="cursor-pointer group block">
                                <div className="w-full h-32 border-2 border-dashed border-gray-100 rounded-[2rem] flex flex-col items-center justify-center bg-white group-hover:bg-gray-50 group-hover:border-[#00AFAA] transition-all">
                                    <Upload className="h-6 w-6 text-gray-300 group-hover:text-[#00AFAA] mb-2" />
                                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest group-hover:text-[#00AFAA]">
                                        {logoFile ? logoFile.name : "Upload Banner Image"}
                                    </span>
                                </div>
                                <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                            </label>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">Social Presence</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {['website', 'twitter', 'github'].map((field) => (
                                <div key={field} className="group space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest group-hover:text-[#00AFAA] transition-colors italic capitalize">{field}</label>
                                    <input
                                        name={field}
                                        value={formData[field]}
                                        onChange={handleInputChange}
                                        placeholder="https://..."
                                        className="w-full bg-white border border-gray-100 rounded-[1.25rem] px-4 py-3.5 text-xs font-bold focus:ring-2 focus:ring-[#00AFAA]/20 outline-none transition-all shadow-sm placeholder:text-[11px] placeholder:text-gray-200 placeholder:font-medium"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting || isUploading}
                        className="w-full py-5 bg-[#003E52] hover:bg-[#002A38] text-white font-black text-[12px] uppercase tracking-[0.2em] rounded-[2rem] transition-all shadow-xl flex items-center justify-center gap-3 disabled:opacity-50 transform active:scale-95"
                    >
                        {isSubmitting || isUploading ? (
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                            <>
                                SUBMIT PROJECT
                                <ChevronRight className="h-5 w-5" />
                            </>
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ProjectForm;
