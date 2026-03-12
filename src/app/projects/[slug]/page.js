'use client';

import React, { useState, useEffect } from 'react';
import TipWidget from '@/components/TipWidget';
import { Share2, Heart, Info, MapPin, ArrowLeft, ExternalLink, Target } from 'lucide-react';
import Link from 'next/link';
import { FaTwitter, FaWhatsapp, FaFacebook, FaLinkedin, FaReddit, FaTelegramPlane } from 'react-icons/fa';

// --- Info Popup Component ---
const InfoPopup = ({ project, onClose }) => {
    if (!project) return null;

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-md overflow-hidden border border-gray-100 flex flex-col p-6">

                <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-[#00AFAA]/10 rounded-full flex items-center justify-center text-[#00AFAA]">
                            <Info className="w-6 h-6" />
                        </div>
                        <div>
                            <div className="text-[10px] font-black text-[#00AFAA] tracking-widest uppercase mb-1">Impact Info</div>
                            <h2 className="text-xl font-bold text-gray-800 leading-tight">{project.name}</h2>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 bg-gray-50 border border-gray-100 rounded-full hover:bg-gray-100 transition-colors">
                        <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="text-xs font-bold text-gray-400 tracking-wider uppercase mb-3 px-1">Details</div>
                <div className="bg-[#FAFBFD] rounded-2xl border border-gray-100 flex flex-col">
                    <div className="flex justify-between items-center p-4 border-b border-gray-100">
                        <span className="text-gray-500 text-sm font-medium">Status</span>
                        <span className="font-bold text-[#00AFAA] text-sm">Active</span>
                    </div>

                    <div className="flex justify-between items-center p-4 border-b border-gray-100">
                        <span className="text-gray-500 text-sm font-medium">Location</span>
                        <span className="font-bold text-gray-800 text-sm">{project.location || 'Global'}</span>
                    </div>
                    <div className="flex justify-between items-center p-4 border-b border-gray-100">
                        <span className="text-gray-500 text-sm font-medium">Category</span>
                        <span className="font-bold text-gray-800 text-sm capitalize">{project.category?.toLowerCase() || 'Environmental Conservation'}</span>
                    </div>
                    <div className="flex justify-between items-center p-4 border-b border-gray-100">
                        <span className="text-gray-500 text-sm font-medium">Added</span>
                        <span className="font-bold text-gray-800 text-sm">{new Date(project.createdAt || Date.now()).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    </div>
                    <div className="flex justify-between items-center p-4">
                        <span className="text-gray-500 text-sm font-medium">Address</span>
                        <a href={`https://celoscan.io/address/${project.walletAddress || '0xC1dCdf8E70acB44CDbB688C91A4883Cf9052Ea9c'}`} target="_blank" rel="noopener noreferrer" className="font-bold text-gray-800 text-sm flex items-center gap-1 hover:text-[#00AFAA]">
                            {(project.walletAddress || '0xC1dC...Ea9c').substring(0, 6)}...{(project.walletAddress || '0xC1dC...Ea9c').slice(-4)} <ExternalLink className="w-3.5 h-3.5 text-gray-400" />
                        </a>
                    </div>
                </div>

            </div>
        </div>
    );
};

// --- Share Popup Component ---
const SharePopup = ({ project, onClose }) => {
    if (!project) return null;

    const copyLink = () => {
        navigator.clipboard.writeText(window.location.href);
        alert("Link copied!");
    };

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-[480px] overflow-hidden border border-gray-100 flex flex-col p-6">

                <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-[#00AFAA]/10 rounded-full flex items-center justify-center text-[#00AFAA]">
                            <Share2 className="w-5 h-5" />
                        </div>
                        <div>
                            <div className="text-[10px] font-black text-[#00AFAA] tracking-widest uppercase mb-1">Share Impact</div>
                            <h2 className="text-xl font-bold text-gray-800 leading-tight">{project.name}</h2>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 bg-gray-50 border border-gray-100 rounded-full hover:bg-gray-100 transition-colors">
                        <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="bg-[#00AFAA]/5 border border-[#00AFAA]/10 rounded-2xl p-5 mb-6">
                    <h3 className="text-[#00AFAA] font-bold flex items-center gap-2 mb-2">
                        🌎 Amplify the Impact
                    </h3>
                    <p className="text-gray-600 text-[14px] leading-relaxed">
                        Every share brings this campaign closer to its goal. When you spread the word, you connect people who care with causes that matter. Share this initiative with your network and help channel crypto tips to those who need it most.
                    </p>
                </div>

                <div className="text-[11px] font-bold text-gray-400 tracking-wider uppercase mb-3 px-1">Share Via</div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
                    <button className="flex items-center gap-2 py-2.5 px-4 bg-[#1DA1F2] text-white rounded-[10px] font-bold text-sm hover:opacity-90 transition-opacity">
                        <FaTwitter className="w-4 h-4" /> Twitter
                    </button>
                    <button className="flex items-center gap-2 py-2.5 px-4 bg-[#25D366] text-white rounded-[10px] font-bold text-sm hover:opacity-90 transition-opacity">
                        <FaWhatsapp className="w-4 h-4" /> WhatsApp
                    </button>
                    <button className="flex items-center gap-2 py-2.5 px-4 bg-[#1877F2] text-white rounded-[10px] font-bold text-sm hover:opacity-90 transition-opacity">
                        <FaFacebook className="w-4 h-4" /> Facebook
                    </button>
                    <button className="flex items-center gap-2 py-2.5 px-4 bg-[#0A66C2] text-white rounded-[10px] font-bold text-sm hover:opacity-90 transition-opacity">
                        <FaLinkedin className="w-4 h-4" /> LinkedIn
                    </button>
                    <button className="flex items-center gap-2 py-2.5 px-4 bg-[#FF4500] text-white rounded-[10px] font-bold text-sm hover:opacity-90 transition-opacity">
                        <FaReddit className="w-4 h-4" /> Reddit
                    </button>
                    <button className="flex items-center gap-2 py-2.5 px-4 bg-[#0088cc] text-white rounded-[10px] font-bold text-sm hover:opacity-90 transition-opacity">
                        <FaTelegramPlane className="w-4 h-4" /> Telegram
                    </button>
                </div>

                <div className="text-[11px] font-bold text-gray-400 tracking-wider uppercase mb-3 px-1">Campaign Link</div>
                <div className="flex bg-[#F8F9FA] rounded-[10px] border border-gray-200 overflow-hidden">
                    <input
                        type="text"
                        readOnly
                        value={typeof window !== 'undefined' ? window.location.href : 'https://clearfund.netlify.app'}
                        className="bg-transparent px-4 py-3 text-sm text-gray-500 w-full outline-none"
                    />
                    <button onClick={copyLink} className="px-5 py-3 bg-white border-l border-gray-200 text-gray-700 font-bold text-sm hover:bg-gray-50 transition-colors flex items-center gap-2 whitespace-nowrap">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        Copy
                    </button>
                </div>

            </div>
        </div>
    );
};


const ProjectDetailPage = ({ params }) => {
    const { slug } = React.use(params);
    const [project, setProject] = useState(null);
    const [tips, setTips] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showInfo, setShowInfo] = useState(false);
    const [showShare, setShowShare] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);

    useEffect(() => {
        fetchProjectAndTips();
    }, [slug]);

    const fetchProjectAndTips = async () => {
        setLoading(true);
        try {
            const pResp = await fetch(`/api/projects/${slug}`);
            const pData = await pResp.json();
            if (pData.success) {
                setProject(pData.data);

                // Fetch recent tips for this project
                let remoteTips = [];
                try {
                    const dResp = await fetch(`/api/tips?projectId=${pData.data._id}`);
                    const dData = await dResp.json();
                    if (dData.success) {
                        remoteTips = dData.data;
                    }
                } catch (err) {
                    console.warn("DB fetch failed for project tips", err);
                }

                // Fetch local tips for this project
                let localTips = [];
                try {
                    const allLocal = JSON.parse(localStorage.getItem('clearfund_tips') || '[]');
                    localTips = allLocal.filter(t => t.projectId === pData.data._id);
                } catch (lErr) {
                    console.error("Local storage tips fetch failed", lErr);
                }

                // Merge and deduplicate
                const mergedProjectTips = [...remoteTips];
                const seenPT = new Set(mergedProjectTips.map(t => t.txHash));
                localTips.forEach(t => {
                    if (!seenPT.has(t.txHash)) {
                        mergedProjectTips.push(t);
                        seenPT.add(t.txHash);
                    }
                });

                mergedProjectTips.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setTips(mergedProjectTips);
            } else {
                // If not found in DB, maybe it's a Giveth project. Let's fetch from Giveth API fallback
                const givethResp = await fetch(`/api/giveth`);
                const givethData = await givethResp.json();
                if (givethData.success) {
                    const found = givethData.data.find(p => p.slug === slug);
                    if (found) {
                        setProject({ ...found, description: found.tagline, createdAt: new Date().toISOString() });

                        // Fetch tips even for fallback projects
                        let remFallback = [];
                        try {
                            const dResp = await fetch(`/api/tips?projectId=${found._id}`);
                            const dData = await dResp.json();
                            if (dData.success) {
                                remFallback = dData.data;
                            }
                        } catch (err) { }

                        let locFallback = [];
                        try {
                            const allLocal = JSON.parse(localStorage.getItem('clearfund_tips') || '[]');
                            locFallback = allLocal.filter(t => t.projectId === found._id);
                        } catch (lErr) { }

                        const mergedFallback = [...remFallback];
                        const seenFB = new Set(mergedFallback.map(t => t.txHash));
                        locFallback.forEach(t => {
                            if (!seenFB.has(t.txHash)) {
                                mergedFallback.push(t);
                                seenFB.add(t.txHash);
                            }
                        });

                        mergedFallback.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                        setTips(mergedFallback);
                    }
                }
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen pt-20 animate-pulse bg-[#F4F5F7]">
                <div className="w-16 h-16 border-4 border-[#00AFAA] border-t-transparent rounded-full animate-spin mb-4"></div>
            </div>
        );
    }

    if (!project) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen pt-20 px-8 text-center bg-[#F4F5F7]">
                <h1 className="text-3xl font-black text-gray-800 mb-2">Project not found</h1>
                <Link href="/projects" className="mt-4 px-8 py-3 bg-[#00AFAA] font-black text-white rounded-xl shadow-lg hover:bg-opacity-90 transition-all">
                    Go Back to Projects
                </Link>
            </div>
        );
    }

    const displayTips = tips;

    return (
        <div className="bg-[#FAFBFD] min-h-screen pb-32 font-sans">
            {showInfo && <InfoPopup project={project} onClose={() => setShowInfo(false)} />}
            {showShare && <SharePopup project={project} onClose={() => setShowShare(false)} />}

            {/* Minimal Header / Back Button */}
            <div className="bg-white border-b border-gray-100 py-4 px-6 md:px-12 sticky top-0 z-50 flex justify-between items-center">
                <div className="flex items-center relative">
                    {/* Home Arrow - absolute to not push the back link */}
                    <Link href="/" className="md:absolute md:right-full md:mr-10 p-2 hover:bg-gray-50 rounded-full transition-colors group flex items-center gap-2" title="Home">
                        <ArrowLeft className="h-5 w-5 text-gray-400 group-hover:text-[#00AFAA]" />
                        <span className="text-xs font-bold text-gray-400 group-hover:text-[#00AFAA] md:hidden">Home</span>
                    </Link>
                    <Link href="/projects" className="text-sm font-bold text-gray-500 hover:text-[#00AFAA] transition-colors">
                        Back to Projects
                    </Link>
                </div>
            </div>

            {/* Banner Image */}
            <div className="w-full h-[300px] md:h-[400px] bg-gray-200 relative overflow-hidden">
                <img src={project.banner || project.logo} alt={project.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/10"></div>
            </div>

            <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 mt-[-40px] relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

                    {/* LEFT COLUMN: CARDS */}
                    <div className="lg:col-span-8 flex flex-col gap-4">

                        {/* Title Card */}
                        <div className="bg-[#F8F9FA] rounded-[1.5rem] border border-gray-200 p-8 shadow-sm">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                <h1 className="text-3xl font-bold text-[#111827] leading-tight max-w-xl">
                                    {project.name}
                                </h1>
                                <div className="flex gap-2 shrink-0">
                                    <button onClick={() => setShowShare(true)} className="w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-500 hover:text-gray-800 transition-colors shadow-sm">
                                        <Share2 className="w-4 h-4" />
                                    </button>
                                    <button className="w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-500 hover:text-red-500 transition-colors shadow-sm">
                                        <Heart className="w-4 h-4" />
                                    </button>
                                    <button onClick={() => setShowInfo(true)} className="w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-500 hover:text-blue-500 transition-colors shadow-sm">
                                        <Info className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                            <div className="mt-6 flex gap-12 border-t border-gray-100 pt-6">
                                <div>
                                    <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Total Tipped</div>
                                    <div className="text-2xl font-black text-[#003E52] tracking-tighter">(G$) {(project.totalTipped || 0).toLocaleString()}</div>
                                </div>
                                <div>
                                    <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Backers</div>
                                    <div className="text-2xl font-black text-[#003E52] tracking-tighter">{project.tipCount || 0}</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-1.5 text-gray-500 mt-6 pt-4 border-t border-gray-50/50">
                                <MapPin className="w-4 h-4 text-[#00AFAA]" />
                                <span className="text-sm font-medium">{project.location || 'Global'}</span>
                            </div>
                        </div>

                        {/* About Card */}
                        <div className="bg-[#F8F9FA] rounded-[1.5rem] border border-gray-200 p-8 shadow-sm">
                            <h2 className="text-lg font-bold text-[#111827] mb-4">About this campaign</h2>
                            <p className={`text-gray-500 text-[15px] leading-relaxed transition-all duration-300 ${!isExpanded ? 'line-clamp-3' : 'whitespace-pre-wrap'}`}>
                                {project.description || project.tagline}
                            </p>

                            {isExpanded && (
                                <div className="mt-6 p-5 bg-[#F4F9F6] border border-[#EAF9EE] rounded-2xl animate-in slide-in-from-top-2 duration-300">
                                    <h3 className="text-[#00AFAA] font-bold mb-2 flex items-center gap-2">
                                        🌱 Understanding the Impact
                                    </h3>
                                    <p className="text-gray-600 text-sm leading-relaxed mb-4">
                                        This campaign addresses critical challenges through verified on-ground initiatives in <strong>{project.location || 'various communities globally'}</strong>. By backing ({project.name}), you are actively supporting their mission to drive real-world change within the <strong>{project.category ? project.category.replace('_', ' ').toLowerCase() : 'social impact'}</strong> sector.
                                    </p>
                                    <h4 className="font-bold text-gray-800 text-sm mb-2 mt-4">Where your tip goes:</h4>
                                    {project.impactDescription ? (
                                        <p className="text-sm text-gray-600 whitespace-pre-wrap leading-relaxed">
                                            {project.impactDescription}
                                        </p>
                                    ) : (
                                        <ul className="text-sm text-gray-600 space-y-2 list-disc pl-5">
                                            <li><strong className="text-gray-700">Direct Empowerment:</strong> Your contribution is sent directly to the project&apos;s regional leads to fund their ongoing operations.</li>
                                            <li><strong className="text-gray-700">Tangible Action:</strong> Funds are utilized for the physical resources, tools, and labor necessary to execute the campaign&apos;s core objectives locally.</li>
                                            <li><strong className="text-gray-700">Sustainable Development:</strong> Supporting infrastructural advancement, grassroots education, and sustained environmental equilibrium in target areas.</li>
                                        </ul>
                                    )}
                                    {project.milestones && (
                                        <>
                                            <h4 className="font-bold text-gray-800 text-sm mb-2 mt-6 flex items-center gap-2">
                                                <Target className="w-4 h-4 text-[#00AFAA]" /> Project Milestones
                                            </h4>
                                            <p className="text-sm text-gray-600 whitespace-pre-wrap leading-relaxed">
                                                {project.milestones}
                                            </p>
                                        </>
                                    )}
                                </div>
                            )}

                            {isExpanded && (
                                <div className="mt-6 space-y-4 border-t border-gray-100 pt-6 animate-in slide-in-from-top-2 duration-300">
                                    <h3 className="text-sm font-bold text-gray-800 uppercase tracking-widest mb-4">Project Links & Details</h3>
                                    {project.website && (
                                        <div className="flex items-center gap-3">
                                            <ExternalLink className="w-4 h-4 text-[#00AFAA]" />
                                            <span className="text-gray-400 text-sm font-bold w-16">Web:</span>
                                            <a href={project.website} target="_blank" rel="noopener noreferrer" className="text-[#00AFAA] font-medium text-sm hover:underline">{project.website}</a>
                                        </div>
                                    )}
                                    {project.socialLink && (
                                        <div className="flex items-center gap-3">
                                            <FaTwitter className="w-4 h-4 text-[#1DA1F2]" />
                                            <span className="text-gray-400 text-sm font-bold w-16">Social:</span>
                                            <a href={project.socialLink} target="_blank" rel="noopener noreferrer" className="text-[#00AFAA] font-medium text-sm hover:underline">{project.socialLink}</a>
                                        </div>
                                    )}
                                    {project.karmaLink && (
                                        <div className="flex items-center gap-3">
                                            <div className="w-4 h-4 bg-[#00AFAA] rounded-full flex items-center justify-center text-[8px] font-black text-white italic">K</div>
                                            <span className="text-gray-400 text-sm font-bold w-16">Karma:</span>
                                            <a href={project.karmaLink} target="_blank" rel="noopener noreferrer" className="text-[#00AFAA] font-medium text-sm hover:underline">{project.karmaLink.length > 30 ? project.karmaLink.substring(0, 30) + '...' : project.karmaLink}</a>
                                        </div>
                                    )}
                                    {project.contactEmail && (
                                        <div className="flex items-center gap-3">
                                            <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                            <span className="text-gray-400 text-sm font-bold w-16">Email:</span>
                                            <a href={`mailto:${project.contactEmail}`} className="text-[#00AFAA] font-medium text-sm hover:underline">{project.contactEmail}</a>
                                        </div>
                                    )}
                                    {!project.website && !project.socialLink && !project.contactEmail && (
                                        <p className="text-sm text-gray-500 italic">More details coming soon. Connect via official channels to learn more about this initiative.</p>
                                    )}
                                </div>
                            )}

                            <button
                                onClick={() => setIsExpanded(!isExpanded)}
                                className="text-gray-800 text-sm font-bold mt-4 hover:underline"
                            >
                                {isExpanded ? 'Show less' : 'Read more'}
                            </button>
                        </div>

                        {/* Tip History Card - Visible to all */}
                        <div className="bg-[#F8F9FA] rounded-[1.5rem] border border-gray-200 p-6 shadow-sm">
                            <h2 className="text-lg font-bold text-[#111827] mb-4 px-2">Recent Tips</h2>
                            {displayTips.length > 0 ? (
                                <div className="space-y-3">
                                    {displayTips.map((d, i) => (
                                        <div key={i} className="flex justify-between items-center bg-white border border-gray-200 rounded-xl p-4">
                                            <div className="flex items-center gap-4">
                                                <div className="w-4 h-4 rounded-full bg-gradient-to-r from-green-400 to-blue-500 shrink-0"></div>
                                                <div className="hidden sm:block text-sm font-mono font-medium text-gray-800">
                                                    {d.donorWallet?.substring(0, 6)}...{d.donorWallet?.substring(d.donorWallet.length - 4)}
                                                </div>
                                                <div className="hidden sm:block text-gray-300">•</div>
                                                <div className="text-sm text-gray-500">
                                                    {new Date(d.createdAt).toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true })}
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <span className="text-sm font-bold text-gray-700 font-mono">
                                                    (G$) {parseFloat(d.amount).toFixed(1)}
                                                </span>
                                                <a href={`https://celoscan.io/tx/${d.txHash || d._id || ''}`} target="_blank" rel="noopener noreferrer">
                                                    <ExternalLink className="w-4 h-4 text-gray-400 cursor-pointer hover:text-gray-600" />
                                                </a>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="py-10 text-center bg-white border border-dashed border-gray-200 rounded-xl">
                                    <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-3">
                                        <Heart className="w-5 h-5 text-gray-200" />
                                    </div>
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">No tips received yet</p>
                                    <p className="text-[11px] text-gray-400 mt-1">Be the first to support this project!</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* RIGHT COLUMN: TIP WIDGET */}
                    <div className="lg:col-span-4 mt-8 lg:mt-0 sticky top-24">
                        <TipWidget
                            project={project}
                            onTipSuccess={(d) => {
                                setTips(prev => [d, ...prev]);
                                setProject(prev => ({
                                    ...prev,
                                    totalTipped: (prev.totalTipped || 0) + d.amount,
                                    tipCount: (prev.tipCount || 0) + 1
                                }));
                            }}
                        />
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ProjectDetailPage;
