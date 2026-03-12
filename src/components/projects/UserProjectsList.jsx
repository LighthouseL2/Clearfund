"use client"

import { useUserProjects } from '@/hooks/projects/useUserProjects'
import { getIPFSGatewayUrl } from '@/lib/services/ipfs.service'
import { CheckCircle2, Clock, ExternalLink, AlertCircle } from 'lucide-react'
import Image from 'next/image'

/**
 * Displays projects submitted by current user - Updated V2.3
 * Removed deadline display
 */
export function UserProjectsList() {
    const { projects, isLoading, error } = useUserProjects()

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center py-20 space-y-4">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00AFAA]"></div>
                <p className="text-gray-500 font-medium text-sm">Fetching on-chain submissions...</p>
            </div>
        )
    }

    if (error) {
        return (
            <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center">
                <AlertCircle className="w-10 h-10 text-red-500 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-red-800 mb-2">Failed to load projects</h3>
                <p className="text-red-600 text-sm font-medium">{error.message || "An error occurred while reading from the blockchain."}</p>
            </div>
        )
    }

    if (!projects || projects.length === 0) {
        return (
            <div className="bg-white border border-gray-100 rounded-[2rem] p-12 text-center shadow-sm">
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Clock className="w-8 h-8 text-gray-300" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">No projects yet</h3>
                <p className="text-gray-500 text-sm max-w-xs mx-auto font-medium">
                    You haven&apos;t submitted any ReFi projects to the Registry yet.
                </p>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => {
                // Determine images
                const logoUrl = project.logoCID ? getIPFSGatewayUrl(project.logoCID) : "/placeholder-logo.png"
                const bannerUrl = project.bannerCID ? getIPFSGatewayUrl(project.bannerCID) : "/placeholder-banner.png"

                return (
                    <div key={index} className="bg-white rounded-[1.5rem] border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col group">
                        {/* Banner Image Preview */}
                        <div className="relative h-32 w-full bg-gray-100">
                            <Image
                                src={bannerUrl}
                                alt={project.title}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute top-3 right-3">
                                <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider ${project.active ? 'bg-[#00AFAA]/10 text-[#00AFAA] border border-[#00AFAA]/20' : 'bg-gray-100 text-gray-600 border border-gray-200'
                                    }`}>
                                    {project.active ? 'On-Chain Active' : 'Deactivated'}
                                </span>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-6 flex-grow flex flex-col pt-0 relative">
                            {/* Logo Overlay */}
                            <div className="relative -mt-8 mb-4">
                                <div className="w-16 h-16 bg-white rounded-2xl p-1 shadow-md overflow-hidden border border-gray-100">
                                    <div className="w-full h-full relative rounded-xl overflow-hidden">
                                        <Image
                                            src={logoUrl}
                                            alt="logo"
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                </div>
                            </div>

                            <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-1 group-hover:text-[#00AFAA] transition-colors">{project.title}</h3>

                            <div className="space-y-4 mb-6">
                                <div className="flex items-start text-sm text-gray-600">
                                    <ExternalLink className="w-4 h-4 mr-2 mt-0.5 text-gray-400 shrink-0" />
                                    <span className="text-gray-400 font-bold uppercase text-[10px] w-12 shrink-0">Web:</span>
                                    <a
                                        href={project.website}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-[#00AFAA] font-medium hover:underline break-all line-clamp-1"
                                    >
                                        {project.website}
                                    </a>
                                </div>
                                <div className="flex items-center text-sm text-gray-600">
                                    <CheckCircle2 className="w-4 h-4 mr-2 text-[#00AFAA]" />
                                    <span className="text-gray-400 font-bold uppercase text-[10px] w-12 shrink-0">Source:</span>
                                    <span className="text-gray-800 font-bold text-xs uppercase italic tracking-tighter">Celo Blockchain</span>
                                </div>
                            </div>

                            <div className="mt-auto pt-6 border-t border-gray-50 flex items-center justify-between">
                                <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                                    Verified submission
                                </div>

                                <button
                                    onClick={() => window.open(project.website, '_blank')}
                                    className="text-xs font-black text-[#003E52] uppercase tracking-widest hover:text-[#00AFAA] transition-colors"
                                >
                                    Details
                                </button>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
