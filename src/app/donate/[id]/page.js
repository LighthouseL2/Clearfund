"use client"

import { useEffect, useState, useRef } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { usePrivy, useWallets } from "@privy-io/react-auth"
import Sidebar from "@/components/SideBar2"
import UserDetails from "@/components/userDetails"
import ModalConnect from "@/components/modalConnect"
import CampaignInfoModal from "@/components/CampaignInfoModal"
import DonationSuccessModal from "@/components/DonationSuccessModal"
import ShareCampaignModal from "@/components/ShareCampaignModal"
import WalletNotConnectedModal from "@/components/WalletNotConnectedModal"
import { useTokenBalance, useDonate } from "@/hooks/useDonation"
import { COLLECTIVE_ADDRESSES, DEFAULT_COLLECTIVE_ADDRESS, SUPPORTED_TOKENS } from "@/lib/contracts/donation"
import { getCollectiveById } from "@/lib/collectivesData"
import { usePathname } from "next/navigation"
import { shortAddress } from "@/components/userDetails"
import { Menu, X } from "lucide-react"

export default function CampaignDonatePage() {
    const params = useParams()
    const router = useRouter()
    const pathname = usePathname()
    const { ready, authenticated, login, logout } = usePrivy()
    const { wallets } = useWallets()
    const activeWallet = wallets?.[0]
    const address = activeWallet?.address

    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [toggle, setToggle] = useState(false)
    const [showInfoModal, setShowInfoModal] = useState(false)
    const [showSuccessModal, setShowSuccessModal] = useState(false)
    const [showShareModal, setShowShareModal] = useState(false)
    const [showWalletModal, setShowWalletModal] = useState(false)
    const [amount, setAmount] = useState('')
    const [selectedToken, setSelectedToken] = useState(SUPPORTED_TOKENS[0])
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)

    const dropdownRef = useRef(null)

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    // Get collective data
    const collective = getCollectiveById(params.id)

    // Balance hooks — use selectedToken
    const activeBalanceHook = useTokenBalance(selectedToken.symbol, address)

    // Donation hook
    const { donate, status, txHash, error, reset, isLoading, isSuccess, isError } = useDonate()

    const balance = activeBalanceHook.balance || 0
    const balanceLoading = activeBalanceHook.isLoading
    const collectiveAddress = collective ? COLLECTIVE_ADDRESSES[collective.id] || DEFAULT_COLLECTIVE_ADDRESS : DEFAULT_COLLECTIVE_ADDRESS

    const parsedAmount = parseFloat(amount) || 0
    const isInsufficientBalance = authenticated && amount !== '' && parsedAmount > balance
    const isWrongNetwork = authenticated && activeWallet && activeWallet.chainId !== 'eip155:42220'
    const isConfirmEnabled = (!authenticated) || (!isWrongNetwork && amount !== '' && parsedAmount > 0 && !isInsufficientBalance && !isLoading)

    const handleSwitchNetwork = async () => {
        if (!activeWallet) return
        try {
            await activeWallet.switchChain(42220)
        } catch (err) {
            console.error('Failed to switch network:', err)
        }
    }

    // Handle donation
    const handleConfirm = async () => {
        if (!authenticated) {
            setShowWalletModal(true)
            return
        }

        if (!isConfirmEnabled) return

        const hash = await donate({
            tokenSymbol: selectedToken.symbol,
            amount: parsedAmount,
            collectiveAddress,
        })

        if (hash) {
            activeBalanceHook.refetch()
            setShowSuccessModal(true)
        }
    }

    // Handle donate again — navigate to main donate page
    const handleDonateAgain = () => {
        reset()
        setAmount('')
        setShowSuccessModal(false)
        router.push('/donate')
    }

    // Handle share — opens the share modal
    const handleShare = () => {
        setShowShareModal(true)
    }

    // Watch for success from hook
    useEffect(() => {
        if (isSuccess && txHash && !showSuccessModal) {
            setShowSuccessModal(true)
        }
    }, [isSuccess, txHash])

    if (!collective) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-800 mb-4">Campaign not found</h1>
                    <button
                        onClick={() => router.push('/donate')}
                        className="bg-[#95EED8] text-gray-900 font-bold px-6 py-3 rounded-full hover:bg-[#7de0c8] transition-colors"
                    >
                        Back to Campaigns
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen flex flex-col md:flex-row bg-white text-gray-800 relative">
            {/* Mobile Header */}
            <div className="md:hidden flex items-center justify-between p-4 bg-white shadow-md font-sans">
                <div className="relative w-[120px] h-[30px]">
                    <Image
                        src="/clearfund-dashboard-logo.svg"
                        alt="ClearFund Logo"
                        fill
                        className="object-contain"
                        priority
                    />
                </div>
                <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="p-2 rounded-lg hover:bg-gray-100"
                >
                    {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Sidebar */}
            {sidebarOpen && (
                <div className="fixed h-screen top-0 z-50 bg-white w-[80%] shadow-xl">
                    <nav className="space-y-3 my-6 font-sans pt-16 px-4">
                        <Link href="/grants">
                            <button onClick={() => setSidebarOpen(false)} className="flex text-[#39B54A] items-center cursor-pointer h-[50px] w-full rounded-r-full px-6 py-3 font-bold mb-2 hover:bg-gray-50">
                                Grants
                            </button>
                        </Link>
                        <Link href="/donate">
                            <button onClick={() => setSidebarOpen(false)} className="flex text-[#39B54A] items-center cursor-pointer h-[50px] w-full rounded-r-full px-6 py-3 font-bold mb-2 bg-[#EAF9EE]">
                                Donate
                            </button>
                        </Link>
                    </nav>
                </div>
            )}

            {/* Desktop Sidebar */}
            <div className="hidden md:flex">
                <Sidebar authenticated={authenticated} address={address} login={login} />
            </div>

            {/* Main Content */}
            <div className="lg:ml-64 w-full lg:w-auto flex-1">
                {/* Top bar */}
                <div className="flex justify-end items-center gap-4 bg-white py-2 px-6">
                    {toggle && <ModalConnect setCloseModal={setToggle} />}
                    {!authenticated ? (
                        <button
                            onClick={login}
                            className="font-sans font-black text-[16px] h-[52px] bg-[#39B54A] text-white rounded-full w-[160px] hover:bg-black transition-colors"
                        >
                            Connect wallet
                        </button>
                    ) : (
                        <UserDetails walletAddress={address} logout={logout} />
                    )}
                </div>

                {/* Campaign Content */}
                <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-10 py-8 lg:py-10">
                    {/* Back Button */}
                    <Link href="/donate" className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors mb-6 font-semibold bg-gray-50 hover:bg-gray-100 px-4 py-2 rounded-full w-fit">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="19" y1="12" x2="5" y2="12"></line>
                            <polyline points="12 19 5 12 12 5"></polyline>
                        </svg>
                        Back to Projects
                    </Link>

                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* LEFT COLUMN — Campaign Details */}
                        <div className="flex-1 min-w-0">
                            {/* Campaign Banner Image */}
                            <div className="relative w-full h-[280px] sm:h-[340px] rounded-2xl overflow-hidden">
                                <Image
                                    src={collective.image}
                                    alt={collective.title}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </div>

                            {/* Title + Icons + Location */}
                            <div className="bg-[#FAFAFA] rounded-2xl border border-gray-200 px-6 py-5 mt-5">
                                <div className="flex items-start justify-between gap-4">
                                    <h1 className="text-[20px] sm:text-[24px] font-bold text-gray-900 leading-tight">
                                        {collective.title}
                                    </h1>
                                    <div className="flex items-center gap-3 shrink-0">
                                        {/* Share icon */}
                                        <button
                                            onClick={handleShare}
                                            className="w-10 h-10 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-600 hover:text-gray-900 hover:border-gray-300 transition-colors shadow-sm"
                                            title="Share"
                                        >
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <circle cx="18" cy="5" r="3" />
                                                <circle cx="6" cy="12" r="3" />
                                                <circle cx="18" cy="19" r="3" />
                                                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                                                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                                            </svg>
                                        </button>
                                        {/* Info icon */}
                                        <button
                                            onClick={() => setShowInfoModal(true)}
                                            className="w-10 h-10 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-600 hover:text-gray-900 hover:border-gray-300 transition-colors shadow-sm"
                                            title="Campaign Info"
                                        >
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <circle cx="12" cy="12" r="10" />
                                                <path d="M12 16v-4" />
                                                <path d="M12 8h.01" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>

                                {/* Location */}
                                <div className="flex items-center gap-2 mt-3">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4CAF50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                                        <circle cx="12" cy="10" r="3" />
                                    </svg>
                                    <span className="text-[14px] text-gray-500">{collective.location}</span>
                                </div>
                            </div>

                            {/* About this campaign */}
                            <div className="bg-[#FAFAFA] rounded-2xl border border-gray-200 px-6 py-6 mt-4">
                                <h2 className="text-[18px] font-bold text-gray-900 mb-4">
                                    About this campaign
                                </h2>
                                <div className="text-[15px] text-gray-600 leading-relaxed whitespace-pre-line">
                                    {collective.about}
                                </div>
                            </div>
                        </div>

                        {/* RIGHT COLUMN — Donation Panel */}
                        <div className="w-full lg:w-[360px] shrink-0">
                            <div className="bg-white rounded-2xl border border-gray-200 shadow-[0px_2px_8px_rgba(0,0,0,0.04)] p-6 lg:sticky lg:top-8">
                                {/* How much header */}
                                <h2 className="text-[20px] font-bold text-gray-900 mb-1">How much?</h2>
                                <p className="text-[14px] text-gray-700 mb-4">Donate using G$ on celo</p>

                                {/* selected token dropdown + amount input */}
                                <div className="border border-[#FFB84D] focus-within:border-[#F59E0B] focus-within:ring-1 focus-within:ring-[#F59E0B] transition-shadow rounded-[24px] px-3 py-3 flex items-center justify-between mb-2 relative">
                                    {/* Dropdown Toggle */}
                                    <div className="relative" ref={dropdownRef}>
                                        <button
                                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                            className="flex items-center gap-2 bg-[#EEF2FF] hover:bg-[#E0E7FF] transition-colors rounded-xl px-4 py-2.5 text-[#1E3A8A] font-bold text-[15px]"
                                        >
                                            {selectedToken.symbol}
                                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}>
                                                <polyline points="6 9 12 15 18 9"></polyline>
                                            </svg>
                                        </button>

                                        {/* Dropdown Menu */}
                                        {isDropdownOpen && (
                                            <div className="absolute top-[110%] left-0 w-[180px] bg-white border border-gray-100 shadow-[0px_8px_24px_rgba(0,0,0,0.12)] rounded-xl py-2 z-50">
                                                {SUPPORTED_TOKENS.map((token) => (
                                                    <button
                                                        key={token.symbol}
                                                        onClick={() => {
                                                            setSelectedToken(token)
                                                            setIsDropdownOpen(false)
                                                        }}
                                                        className={`w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors text-left ${selectedToken.symbol === token.symbol ? 'bg-blue-50/50' : ''}`}
                                                    >
                                                        <img src={token.icon} alt={token.symbol} className="w-6 h-6 rounded-full object-contain bg-white shrink-0 shadow-sm" />
                                                        <span className="text-[14px] font-bold text-gray-900">{token.symbol}</span>
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    <input
                                        type="text"
                                        inputMode="decimal"
                                        placeholder="0.00"
                                        value={amount}
                                        onChange={(e) => {
                                            const val = e.target.value;
                                            if (/^\d*\.?\d*$/.test(val)) setAmount(val);
                                        }}
                                        disabled={isLoading}
                                        className="w-full pl-4 text-right text-[22px] font-bold text-gray-700 placeholder-gray-400 bg-transparent focus:outline-none disabled:opacity-50"
                                    />
                                </div>

                                {/* Insufficient balance warning */}
                                {isInsufficientBalance && (
                                    <div className="flex items-center px-1 mb-5">
                                        <span className="text-[11px] text-red-500 font-medium">Insufficient balance</span>
                                    </div>
                                )}

                                {/* Confirm button */}
                                {isWrongNetwork ? (
                                    <button
                                        onClick={handleSwitchNetwork}
                                        className="w-full py-3 rounded-full text-[15px] font-bold transition-all duration-200 mb-5 bg-[#e4be36] text-gray-900 hover:bg-[#d8b534] cursor-pointer"
                                    >
                                        Switch to Celo Network
                                    </button>
                                ) : (
                                    <button
                                        onClick={handleConfirm}
                                        disabled={!isConfirmEnabled}
                                        className={`w-full py-3 rounded-full text-[15px] font-bold transition-all duration-200 mb-5 ${isConfirmEnabled
                                            ? 'bg-[#95EED8] text-gray-900 hover:bg-[#7de0c8] cursor-pointer'
                                            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                            }`}
                                    >
                                        {isLoading ? (
                                            <span className="flex items-center justify-center gap-2">
                                                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                                </svg>
                                                {status === 'sending' ? 'Confirm in wallet...' : 'Processing...'}
                                            </span>
                                        ) : (
                                            authenticated ? 'Confirm' : 'Continue'
                                        )}
                                    </button>
                                )}

                                {/* Error message */}
                                {isError && error && (
                                    <div className="bg-red-50 border border-red-200 text-red-600 text-xs rounded-lg p-3 mb-4">
                                        {error}
                                    </div>
                                )}

                                {/* Info box */}
                                <div className="border border-gray-200 rounded-xl px-4 py-4">
                                    <h3 className="text-[13px] font-semibold text-gray-900 mb-1.5">
                                        You are about to make a donation.
                                    </h3>
                                    <p className="text-[12px] text-gray-400 leading-relaxed">
                                        Pressing &quot;Confirm&quot; will begin the donation process. You will need to confirm using your connected wallet.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Campaign Info Modal */}
            {showInfoModal && (
                <CampaignInfoModal
                    collective={collective}
                    onClose={() => setShowInfoModal(false)}
                />
            )}

            {/* Donation Success Modal */}
            {showSuccessModal && (
                <DonationSuccessModal
                    onClose={() => { setShowSuccessModal(false); reset(); }}
                    onDonateAgain={handleDonateAgain}
                />
            )}

            {/* Share Campaign Modal */}
            {showShareModal && (
                <ShareCampaignModal
                    collective={collective}
                    onClose={() => setShowShareModal(false)}
                />
            )}

            {/* Wallet Not Connected Modal */}
            <WalletNotConnectedModal
                isOpen={showWalletModal}
                onClose={() => setShowWalletModal(false)}
                onConnect={login}
            />
        </div>
    )
}
