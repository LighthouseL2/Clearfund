"use client"

import { useUserGrants } from '@/hooks/grants/useUserGrants'
import { getIPFSGatewayUrl } from '@/lib/services/ipfs.service'
import { timestampToDate, formatTimeRemaining } from '@/lib/services/grant.service'
import { CheckCircle2, Clock, ExternalLink, AlertCircle } from 'lucide-react'
import Image from 'next/image'

export function UserGrantsList() {
    const { grants, isLoading, error } = useUserGrants()

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center py-20 space-y-4">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#39B54A]"></div>
                <p className="text-gray-500 font-medium">Fetching your submissions from Celo...</p>
            </div>
        )
    }

    if (error) {
        return (
            <div className="bg-red-50 border border-red-200 rounded-xl p-8 text-center">
                <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-red-800 mb-2">Failed to load submissions</h3>
                <p className="text-red-600">{error.message || "An error occurred while reading from the blockchain."}</p>
            </div>
        )
    }

    if (grants.length === 0) {
        return (
            <div className="bg-white border border-gray-200 rounded-xl p-12 text-center shadow-sm">
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Clock className="w-10 h-10 text-gray-300" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">No submissions yet</h3>
                <p className="text-gray-500 max-w-md mx-auto">
                    You haven&apos;t submitted any grants to the ClearFund Registry on Celo blockchain yet.
                    Use the &quot;Add new grant&quot; button to get started.
                </p>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {grants.map((grant, index) => {
                const deadlineDate = timestampToDate(Number(grant.deadline))
                const now = Math.floor(Date.now() / 1000)
                const timeRemaining = Number(grant.deadline) - now
                const imageUrl = grant.imageCID
                    ? getIPFSGatewayUrl(grant.imageCID)
                    : "/grant-round-images/celo.png"

                return (
                    <div key={index} className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col">
                        {/* Image Preview */}
                        <div className="relative h-40 w-full bg-gray-100">
                            <Image
                                src={imageUrl}
                                alt={grant.title}
                                fill
                                className="object-cover"
                            />
                            <div className="absolute top-3 right-3">
                                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${grant.active ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-gray-100 text-gray-600 border border-gray-200'
                                    }`}>
                                    {grant.active ? 'On-Chain Active' : 'Deactivated'}
                                </span>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-5 flex-grow flex flex-col">
                            <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-1">{grant.title}</h3>

                            <div className="space-y-3 mb-6">
                                <div className="flex items-center text-sm text-gray-600">
                                    <Clock className="w-4 h-4 mr-2 text-gray-400" />
                                    <span>Ends: {deadlineDate.toLocaleDateString()}</span>
                                    {timeRemaining > 0 && (
                                        <span className="ml-2 text-xs font-medium text-emerald-600">
                                            ({formatTimeRemaining(timeRemaining)} left)
                                        </span>
                                    )}
                                </div>

                                <div className="flex items-start text-sm text-gray-600">
                                    <ExternalLink className="w-4 h-4 mr-2 mt-0.5 text-gray-400 shrink-0" />
                                    <a
                                        href={grant.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 hover:underline break-all line-clamp-1"
                                    >
                                        {grant.url}
                                    </a>
                                </div>
                            </div>

                            <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between">
                                <div className="flex items-center text-[10px] text-gray-400 italic">
                                    <CheckCircle2 className="w-3 h-3 mr-1 text-gray-300" />
                                    Verified on Celo
                                </div>

                                <button
                                    onClick={() => window.open(grant.url, '_blank')}
                                    className="text-xs font-bold text-[#39B54A] hover:text-[#2d8d3a] transition-colors"
                                >
                                    View Details
                                </button>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
