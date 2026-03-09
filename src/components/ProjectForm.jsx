'use client';

import React, { useState } from 'react';
import { usePrivy } from '@privy-io/react-auth';
import { useIPFSUpload } from '@/hooks/ipfs/useIPFSUpload';
import { Upload, CheckCircle2, ChevronRight, Info, AlertCircle, X } from 'lucide-react';

const ProjectForm = () => {
    const { authenticated, login, user } = usePrivy();
    const { uploadFile, isUploading } = useIPFSUpload();

    const [formData, setFormData] = useState({
        name: '',
        tagline: '',
        category: 'REFI',
        description: '',
        logo: '',
        walletAddress: '',
        fundingGoal: '',
        website: '',
        twitter: '',
        discord: '',
        telegram: '',
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
        if (formData.name.length < 3 || formData.name.length > 100) return 'Project name must be 3-100 characters.';
        if (formData.tagline.length < 1 || formData.tagline.length > 150) return 'Tagline must be 1-150 characters.';
        if (formData.description.length < 100) return 'Description must be at least 100 characters.';
        if (!formData.walletAddress.startsWith('0x') || formData.walletAddress.length !== 42) return 'Invalid Ethereum wallet address.';
        return null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!authenticated) {
            login();
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
                // Use a default project logo if none provided
                logoUrl = '/assets/projectIcon.png';
            }

            const response = await fetch('/api/projects', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    logo: logoUrl,
                    submittedBy: user?.wallet?.address,
                    fundingGoal: formData.fundingGoal ? parseFloat(formData.fundingGoal) : 0,
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
            <div className="max-w-md mx-auto bg-white p-10 rounded-[32px] shadow-xl border border-gray-100 text-center animate-in fade-in zoom-in duration-500">
                <div className="w-20 h-20 bg-gd-teal/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="h-10 w-10 text-gd-teal" />
                </div>
                <h2 className="text-2xl font-bold text-gd-dark-blue mb-4">Submission Successful!</h2>
                <p className="text-gray-600 mb-8">
                    Your project has been submitted for review. You&apos;ll be notified once it&apos;s approved and live on the platform.
                </p>
                <button
                    onClick={() => window.location.href = '/projects'}
                    className="w-full bg-gd-teal hover:bg-gd-teal/90 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg"
                >
                    Browse Projects
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto bg-white rounded-[32px] shadow-2xl border border-gray-100 overflow-hidden lg:flex">
            {/* Left side: Info */}
            <div className="lg:w-1/3 bg-gd-dark-blue p-8 lg:p-12 text-white flex flex-col justify-between">
                <div>
                    <h2 className="text-3xl font-black mb-6 leading-tight">Bring your vision to life.</h2>
                    <p className="text-white/70 text-sm leading-relaxed mb-8">
                        ClearFund helps impact creators get funded directly by the community using Digital Basic Income. Join hundreds of builders making a difference.
                    </p>
                    <ul className="space-y-4">
                        <li className="flex items-start gap-3">
                            <div className="mt-1 bg-gd-teal p-1 rounded-full"><CheckCircle2 className="h-3 w-3" /></div>
                            <span className="text-sm font-medium">Direct G$ donations</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <div className="mt-1 bg-gd-teal p-1 rounded-full"><CheckCircle2 className="h-3 w-3" /></div>
                            <span className="text-sm font-medium">Global community reach</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <div className="mt-1 bg-gd-teal p-1 rounded-full"><CheckCircle2 className="h-3 w-3" /></div>
                            <span className="text-sm font-medium">Verified impact status</span>
                        </li>
                    </ul>
                </div>
                <div className="mt-12 p-4 bg-white/5 rounded-2xl border border-white/10">
                    <div className="flex items-center gap-2 mb-2 text-gd-teal">
                        <Info className="h-4 w-4" />
                        <span className="text-xs font-bold uppercase tracking-wider">Note</span>
                    </div>
                    <p className="text-xs text-white/50 leading-relaxed font-sans">
                        Your project will undergo a brief review process to ensure it aligns with our platform guidelines. This usually takes 24-48 hours.
                    </p>
                </div>
            </div>

            {/* Right side: Form */}
            <div className="lg:w-2/3 p-8 lg:p-12 bg-gray-50/50">
                <form onSubmit={handleSubmit} className="space-y-8">
                    {error && (
                        <div className="p-4 bg-red-50 border border-red-100 rounded-xl flex items-center gap-3 text-red-600 text-sm font-medium animate-in slide-in-from-top-2">
                            <AlertCircle className="h-5 w-5 shrink-0" />
                            {error}
                        </div>
                    )}

                    <div className="space-y-6">
                        <h3 className="text-sm font-black text-gray-400 uppercase tracking-[0.2em]">Basic Information</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-sans">
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-gray-800 italic">Project Name *</label>
                                <input
                                    required
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    placeholder="e.g. Green Earth Conservation"
                                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-gd-teal outline-none transition-all placeholder:text-gray-300"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-gray-800 italic">Category *</label>
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleInputChange}
                                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-gd-teal outline-none transition-all cursor-pointer"
                                >
                                    <option value="REFI">ReFi</option>
                                    <option value="CLIMATE">Climate</option>
                                    <option value="GOODDOLLAR_GRANTEE">GoodDollar Grantee</option>
                                    <option value="GRANT_SEEKER">Grant Seeker</option>
                                    <option value="GOODCOLLECTIVE">GoodCollective</option>
                                    <option value="SOCIAL_IMPACT">Social Impact</option>
                                    <option value="PUBLIC_GOODS">Public Goods</option>
                                </select>
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-gray-800 italic">Short Tagline * (Max 150 chars)</label>
                            <input
                                required
                                name="tagline"
                                value={formData.tagline}
                                onChange={handleInputChange}
                                placeholder="One sentence that summarizes your project impact."
                                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-gd-teal outline-none transition-all placeholder:text-gray-300"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-gray-800 italic">Full Description * (Min 100 chars)</label>
                            <textarea
                                required
                                name="description"
                                rows={5}
                                value={formData.description}
                                onChange={handleInputChange}
                                placeholder="Tell the community why they should fund your project, what you'll achieve, and your background."
                                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-gd-teal outline-none transition-all placeholder:text-gray-300 min-h-[120px]"
                            />
                        </div>
                    </div>

                    <div className="space-y-6">
                        <h3 className="text-sm font-black text-gray-400 uppercase tracking-[0.2em]">Funding & Identity</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-1.5 ">
                                <label className="text-xs font-bold text-gray-800 italic">Wallet Address to Receive G$ *</label>
                                <input
                                    required
                                    name="walletAddress"
                                    value={formData.walletAddress}
                                    onChange={handleInputChange}
                                    placeholder="0x..."
                                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-gd-teal outline-none transition-all placeholder:text-gray-300"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-gray-800 italic">Funding Goal (G$) (Optional)</label>
                                <input
                                    type="number"
                                    name="fundingGoal"
                                    value={formData.fundingGoal}
                                    onChange={handleInputChange}
                                    placeholder="e.g. 5000"
                                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-gd-teal outline-none transition-all placeholder:text-gray-300"
                                />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <label className="text-xs font-bold text-gray-800 italic">Project Logo (Optional)</label>
                            <div className="flex items-center gap-6">
                                <label className="flex-1 cursor-pointer group">
                                    <div className="w-full h-24 border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center bg-white group-hover:bg-gray-50 group-hover:border-gd-teal transition-all">
                                        <Upload className="h-6 w-6 text-gray-400 group-hover:text-gd-teal mb-2" />
                                        <span className="text-xs font-bold text-gray-500 group-hover:text-gd-teal">
                                            {logoFile ? (logoFile.name.length > 20 ? logoFile.name.substring(0, 20) + '...' : logoFile.name) : "Upload Logo Image"}
                                        </span>
                                    </div>
                                    <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                                </label>
                                <div className="flex-[1.5] space-y-1.5">
                                    <span className="text-xs font-bold text-gray-400 italic">Or provide an image URL</span>
                                    <input
                                        name="logo"
                                        value={formData.logo}
                                        onChange={handleInputChange}
                                        placeholder="https://..."
                                        className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-gd-teal outline-none transition-all placeholder:text-gray-300"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <h3 className="text-sm font-black text-gray-400 uppercase tracking-[0.2em]">Social & Links (Optional)</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                            {['website', 'twitter', 'discord', 'telegram', 'github'].map((field) => (
                                <div key={field} className="space-y-1.5">
                                    <label className="text-xs font-bold text-gray-800 italic capitalize">{field} URL</label>
                                    <input
                                        name={field}
                                        value={formData[field]}
                                        onChange={handleInputChange}
                                        placeholder={`https://${field}.com/...`}
                                        className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-gd-teal outline-none transition-all placeholder:text-gray-300 font-sans"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting || isUploading}
                        className="w-full py-4 bg-gd-dark-blue hover:bg-black text-white font-black text-lg rounded-2xl transition-all shadow-xl flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-[0.98]"
                    >
                        {isSubmitting || isUploading ? (
                            <>
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                {isUploading ? 'Uploading Logo...' : 'Submitting Project...'}
                            </>
                        ) : (
                            <>
                                Submit Project for Review
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
