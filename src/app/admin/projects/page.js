'use client';

import React, { useState, useEffect } from 'react';
import { usePrivy } from '@privy-io/react-auth';
import { isAdmin } from '@/lib/admin';
import { Check, X, Star, Trash2, ExternalLink, ShieldAlert, ShieldCheck, Info, LogOut } from 'lucide-react';

const AdminDashboard = () => {
    const { authenticated, user, login, logout } = usePrivy();
    const [pending, setPending] = useState([]);
    const [allProjects, setAllProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('pending');

    const [selectedProject, setSelectedProject] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const userAddress = user?.wallet?.address;
    const isUserAdmin = isAdmin(userAddress);

    useEffect(() => {
        if (isUserAdmin) {
            fetchData();
        }
    }, [isUserAdmin, activeTab]);

    const fetchData = async () => {
        setLoading(true);
        try {
            if (activeTab === 'pending') {
                const resp = await fetch('/api/admin/projects/pending');
                const data = await resp.json();
                if (data.success) setPending(data.data);
            } else {
                const respAll = await fetch('/api/projects?status=ALL');
                const dataAll = await respAll.json();
                if (dataAll.success) setAllProjects(dataAll.data);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const filteredProjects = (activeTab === 'pending' ? pending : allProjects).filter(project =>
        project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (project.description || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (project.tagline || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const updateStatus = async (id, status) => {
        try {
            const resp = await fetch(`/api/admin/projects/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status }),
            });
            const data = await resp.json();
            if (data.success) {
                if (selectedProject?._id === id) setSelectedProject(null);
                fetchData();
            }
        } catch (err) {
            alert('Failed to update project status');
        }
    };

    const toggleFeatured = async (id, featured) => {
        try {
            const resp = await fetch(`/api/admin/projects/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ featured: !featured }),
            });
            const data = await resp.json();
            if (data.success) {
                if (selectedProject?._id === id) setSelectedProject({ ...selectedProject, featured: !featured });
                fetchData();
            }
        } catch (err) {
            alert('Failed to toggle featured status');
        }
    };

    if (!authenticated) {
        return (
            <div className="min-h-screen pt-40 px-8 flex flex-col items-center justify-center text-center">
                <h1 className="text-3xl font-black text-gd-dark-blue mb-4">Admin Access Restricted</h1>
                <p className="text-gray-500 mb-8">Please connect your authorized admin wallet to proceed.</p>
                <button onClick={login} className="px-10 py-4 bg-gd-dark-blue text-white rounded-2xl font-black">
                    Connect Wallet
                </button>
            </div>
        );
    }

    if (!isUserAdmin) {
        return (
            <div className="min-h-screen pt-40 px-8 flex flex-col items-center justify-center text-center animate-in fade-in duration-500">
                <ShieldAlert className="h-20 w-20 text-red-500 mb-6" />
                <h1 className="text-3xl font-black text-gd-dark-blue mb-2">Access Denied</h1>
                <p className="text-gray-500 mb-8">Your wallet ({userAddress}) is not authorized to access the admin panel.</p>
                <button onClick={() => window.location.href = '/'} className="px-10 py-4 bg-gd-dark-blue text-white rounded-2xl font-black">
                    Return Home
                </button>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 min-h-screen pt-20 pb-32">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                    <div className="flex-1">
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2 text-gd-teal">
                                <ShieldCheck className="h-5 w-5" />
                                <span className="text-xs font-black uppercase tracking-[0.2em]">Authorized Session</span>
                            </div>
                            <button
                                onClick={logout}
                                className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-gray-400 hover:text-red-500 transition-colors"
                            >
                                <LogOut className="h-4 w-4" />
                                Logout
                            </button>
                        </div>
                        <h1 className="text-4xl font-black text-gd-dark-blue mb-4">Project Management</h1>

                        <div className="max-w-md relative">
                            <input
                                type="text"
                                placeholder="Search projects by name, description or category..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-4 pr-10 py-3 bg-white border border-gray-100 rounded-2xl shadow-sm focus:ring-2 focus:ring-gd-teal outline-none transition-all text-sm font-medium"
                            />
                            {searchTerm && (
                                <button
                                    onClick={() => setSearchTerm('')}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full transition-colors"
                                >
                                    <X className="h-4 w-4 text-gray-400" />
                                </button>
                            )}
                        </div>
                    </div>

                    <div className="flex bg-white p-1.5 rounded-2xl shadow-sm border border-gray-100 h-fit">
                        <button
                            onClick={() => setActiveTab('pending')}
                            className={`px-6 py-2.5 rounded-xl font-bold transition-all text-sm ${activeTab === 'pending' ? 'bg-gd-dark-blue text-white' : 'text-gray-400 hover:text-gd-dark-blue'}`}
                        >
                            Pending ({pending.length})
                        </button>
                        <button
                            onClick={() => setActiveTab('all')}
                            className={`px-6 py-2.5 rounded-xl font-bold transition-all text-sm ${activeTab === 'all' ? 'bg-gd-dark-blue text-white' : 'text-gray-400 hover:text-gd-dark-blue'}`}
                        >
                            Approved & Active
                        </button>
                    </div>
                </div>

                {loading ? (
                    <div className="py-40 flex flex-col items-center justify-center">
                        <div className="w-12 h-12 border-4 border-gd-teal border-t-transparent rounded-full animate-spin mb-4"></div>
                        <p className="text-gray-500 font-bold">Synchronizing projects...</p>
                    </div>
                ) : (
                    <div className="bg-white rounded-[32px] shadow-sm border border-gray-100 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left font-sans">
                                <thead>
                                    <tr className="border-b border-gray-50 uppercase text-[10px] font-black text-gray-400 tracking-widest">
                                        <th className="px-8 py-6">Project</th>
                                        <th className="px-8 py-6">Category</th>
                                        <th className="px-8 py-6">Submitter</th>
                                        <th className="px-8 py-6">Status</th>
                                        <th className="px-8 py-6 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {filteredProjects.map((project) => (
                                        <tr key={project._id} className="hover:bg-gray-50/50 transition-colors">
                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-4">
                                                    <img src={project.logo} className="w-12 h-12 rounded-xl object-cover ring-1 ring-gray-100" />
                                                    <div>
                                                        <div className="font-black text-gd-dark-blue flex items-center gap-2">
                                                            {project.name}
                                                            {project.featured && <Star className="h-3 w-3 text-gd-gold fill-current" />}
                                                        </div>
                                                        <div className="text-xs text-gray-400 font-medium truncate max-w-[200px]">{project.description || project.tagline}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <span className="text-[10px] font-black px-2 py-1 bg-gray-100 text-gray-500 rounded-md uppercase tracking-wider">
                                                    {project.category}
                                                </span>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="text-xs font-mono text-gray-400">
                                                    {project.submittedBy?.substring(0, 10)}...
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <span className={`text-[10px] font-black px-2 py-1 rounded-md uppercase tracking-wider ${project.status === 'APPROVED' ? 'bg-gd-teal/10 text-gd-teal' :
                                                    project.status === 'PENDING' ? 'bg-yellow-50 text-yellow-600' :
                                                        'bg-red-50 text-red-600'
                                                    }`}>
                                                    {project.status}
                                                </span>
                                            </td>
                                            <td className="px-8 py-6 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <button
                                                        onClick={() => setSelectedProject(project)}
                                                        className="p-2 text-gray-400 hover:text-gd-dark-blue transition-colors"
                                                        title="View Details"
                                                    >
                                                        <Info className="h-4 w-4" />
                                                    </button>
                                                    <a href={`/projects/${project.slug}`} target="_blank" className="p-2 text-gray-400 hover:text-gd-teal">
                                                        <ExternalLink className="h-4 w-4" />
                                                    </a>
                                                    {activeTab === 'pending' && (
                                                        <>
                                                            <button
                                                                onClick={() => updateStatus(project._id, 'APPROVED')}
                                                                className="p-2 bg-gd-teal/10 text-gd-teal rounded-lg hover:bg-gd-teal hover:text-white transition-all shadow-sm"
                                                                title="Approve"
                                                            >
                                                                <Check className="h-4 w-4" />
                                                            </button>
                                                            <button
                                                                onClick={() => updateStatus(project._id, 'REJECTED')}
                                                                className="p-2 bg-red-50 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-all shadow-sm"
                                                                title="Reject"
                                                            >
                                                                <X className="h-4 w-4" />
                                                            </button>
                                                        </>
                                                    )}
                                                    {activeTab === 'all' && (
                                                        <>
                                                            <button
                                                                onClick={() => toggleFeatured(project._id, project.featured)}
                                                                className={`p-2 rounded-lg transition-all shadow-sm ${project.featured ? 'bg-gd-gold text-white' : 'bg-gray-100 text-gray-400 hover:bg-gd-gold/20 hover:text-gd-gold'}`}
                                                                title="Toggle Featured"
                                                            >
                                                                <Star className="h-4 w-4" />
                                                            </button>
                                                            <button
                                                                onClick={() => updateStatus(project._id, 'ARCHIVED')}
                                                                className="p-2 bg-gray-100 text-gray-400 rounded-lg hover:bg-red-500 hover:text-white transition-all shadow-sm"
                                                                title="Archive"
                                                            >
                                                                <Trash2 className="h-4 w-4" />
                                                            </button>
                                                        </>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    {filteredProjects.length === 0 && (
                                        <tr>
                                            <td colSpan="5" className="px-8 py-20 text-center text-gray-400 font-bold">
                                                No projects found in this section.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>

            {/* Project Details Modal */}
            {selectedProject && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
                    <div className="absolute inset-0 bg-gd-dark-blue/80 backdrop-blur-sm" onClick={() => setSelectedProject(null)}></div>
                    <div className="relative bg-white w-full max-w-4xl max-h-[90vh] rounded-[40px] shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-300">
                        <button
                            onClick={() => setSelectedProject(null)}
                            className="absolute top-6 right-6 p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors z-10"
                        >
                            <X className="h-5 w-5 text-gray-500" />
                        </button>

                        <div className="overflow-y-auto p-8 sm:p-12">
                            <div className="flex flex-col md:flex-row gap-8 mb-10">
                                <img
                                    src={selectedProject.logo}
                                    className="w-32 h-32 rounded-3xl object-cover ring-4 ring-gray-50 shadow-lg"
                                    alt=""
                                />
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className="text-[10px] font-black px-3 py-1 bg-gd-teal/10 text-gd-teal rounded-full uppercase tracking-widest">
                                            {selectedProject.category}
                                        </span>
                                        <span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest ${selectedProject.status === 'APPROVED' ? 'bg-gd-teal/10 text-gd-teal' :
                                            selectedProject.status === 'PENDING' ? 'bg-yellow-50 text-yellow-600' :
                                                'bg-red-50 text-red-600'
                                            }`}>
                                            {selectedProject.status}
                                        </span>
                                    </div>
                                    <h2 className="text-3xl font-black text-gd-dark-blue mb-2 flex items-center gap-3">
                                        {selectedProject.name}
                                        {selectedProject.featured && <Star className="h-6 w-6 text-gd-gold fill-current" />}
                                    </h2>
                                    <p className="text-sm text-gray-500 font-medium leading-relaxed italic line-clamp-2">
                                        {selectedProject.tagline ? `"${selectedProject.tagline}"` : (selectedProject.description?.substring(0, 100) + '...')}
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
                                <div className="p-6 bg-gray-50 rounded-2xl">
                                    <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Funding Goal</div>
                                    <div className="text-xl font-black text-gd-dark-blue">{selectedProject.fundingGoal?.toLocaleString() || 0} G$</div>
                                </div>
                                <div className="p-6 bg-gray-50 rounded-2xl md:col-span-2">
                                    <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Recipient Wallet</div>
                                    <div className="text-sm font-mono text-gd-dark-blue break-all">{selectedProject.walletAddress}</div>
                                </div>
                            </div>

                            <div className="mb-10">
                                <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-4">Project Description</h3>
                                <div className="text-gray-600 leading-relaxed font-sans whitespace-pre-wrap">
                                    {selectedProject.description}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-10">
                                {Object.entries({
                                    website: selectedProject.website,
                                    twitter: selectedProject.twitter,
                                    discord: selectedProject.discord,
                                    telegram: selectedProject.telegram,
                                    github: selectedProject.github
                                }).map(([key, value]) => value && (
                                    <a
                                        key={key}
                                        href={value}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-3 p-4 bg-white border border-gray-100 rounded-xl hover:border-gd-teal hover:shadow-md transition-all group"
                                    >
                                        <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center group-hover:bg-gd-teal/10 transition-colors">
                                            <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-gd-teal" />
                                        </div>
                                        <span className="text-xs font-bold text-gray-600 capitalize">{key}</span>
                                    </a>
                                ))}
                            </div>

                            <div className="text-xs text-gray-400 font-medium border-t border-gray-100 pt-8 flex flex-wrap gap-x-8 gap-y-2">
                                <div>Submitted By: <span className="font-mono">{selectedProject.submittedBy}</span></div>
                                <div>ID: <span className="font-mono text-[10px]">{selectedProject._id}</span></div>
                                <div>Created: {new Date(selectedProject.createdAt).toLocaleDateString()}</div>
                            </div>
                        </div>

                        <div className="p-8 bg-gray-50 border-t border-gray-100 flex flex-wrap items-center justify-end gap-4">
                            {selectedProject.status === 'PENDING' ? (
                                <>
                                    <button
                                        onClick={() => updateStatus(selectedProject._id, 'REJECTED')}
                                        className="px-8 py-3 bg-white text-red-500 border border-red-100 rounded-2xl font-black hover:bg-red-50 transition-all shadow-sm"
                                    >
                                        Reject Project
                                    </button>
                                    <button
                                        onClick={() => updateStatus(selectedProject._id, 'APPROVED')}
                                        className="px-8 py-3 bg-gd-teal text-white rounded-2xl font-black hover:bg-gd-teal/90 transition-all shadow-lg flex items-center gap-2"
                                    >
                                        <Check className="h-5 w-5" />
                                        Approve Project
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button
                                        onClick={() => toggleFeatured(selectedProject._id, selectedProject.featured)}
                                        className={`px-8 py-3 rounded-2xl font-black transition-all shadow-sm flex items-center gap-2 ${selectedProject.featured ? 'bg-gd-gold text-white' : 'bg-white text-gray-400 border border-gray-200 hover:border-gd-gold hover:text-gd-gold'}`}
                                    >
                                        <Star className={`h-5 w-5 ${selectedProject.featured ? 'fill-current' : ''}`} />
                                        {selectedProject.featured ? 'Featured' : 'Mark as Featured'}
                                    </button>
                                    {selectedProject.status !== 'ARCHIVED' && (
                                        <button
                                            onClick={() => updateStatus(selectedProject._id, 'ARCHIVED')}
                                            className="px-8 py-3 bg-white text-gray-400 border border-gray-200 rounded-2xl font-black hover:bg-red-50 hover:text-red-500 hover:border-red-100 transition-all shadow-sm flex items-center gap-2"
                                        >
                                            <Trash2 className="h-5 w-5" />
                                            Archive Project
                                        </button>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
