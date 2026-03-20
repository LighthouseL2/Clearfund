'use client';

import React, { useState } from 'react';
import { usePrivy } from '@privy-io/react-auth';
import { useIPFSUpload } from '@/hooks/ipfs/useIPFSUpload';
import { Upload, CheckCircle2, AlertCircle } from 'lucide-react';
import { useAuthModal } from '@/components/ClientWrapper';

const ProjectForm = () => {
    const { authenticated, user } = usePrivy();
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
            setLogoFile(e.target.files[0]);
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
            <div className="max-w-md mx-auto bg-[#fcfaf5] p-10 rounded-[2rem] border-[2px] border-black text-center text-black">
                <div className="w-20 h-20 bg-black/5 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="h-10 w-10 text-black" />
                </div>
                <h2 className="text-2xl font-black mb-4">SUBMISSION SUCCESSFUL!</h2>
                <p className="text-gray-800 mb-8 font-medium">
                    Your project has been submitted for review. You'll be notified once it's live on the platform.
                </p>
                <button
                    onClick={() => window.location.href = '/projects'}
                    className="w-full bg-[#0a6682] text-white font-black py-4 rounded-[1rem] transition-all uppercase tracking-widest text-sm hover:-translate-y-1 active:translate-y-0"
                >
                    Browse Projects
                </button>
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
                        <p className="text-[0.95rem] text-[#003E52] font-medium leading-snug">
                            Your project will be reviewed by our team before it goes live on the platform. You'll be notified once it's approved.
                        </p>
                    </div>
                    <button
                        type="submit"
                        disabled={isSubmitting || isUploading}
                        className="w-full py-[1.15rem] bg-[#00AFAA] hover:bg-[#009e99] text-white font-bold text-[1.25rem] tracking-wide rounded-[0.8rem] border-[2px] border-transparent transition-colors flex items-center justify-center gap-2 disabled:opacity-50 outline-none"
                    >
                        {isSubmitting || isUploading ? (
                            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                            "Submit"
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
