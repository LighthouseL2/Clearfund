'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePrivy } from '@privy-io/react-auth';
import { useTokenBalance, useTip } from '@/hooks/useTip';
import { SUPPORTED_TOKENS, DEFAULT_COLLECTIVE_ADDRESS } from '@/lib/contracts/tip';
import { CheckCircle2, AlertCircle, Loader2, Wallet, Coins, ChevronDown } from 'lucide-react';
import TipSuccessModal from './TipSuccessModal';

const TOKENS = [
    { symbol: 'G$', name: 'GoodDollar', icon: '/donate-icons/Gooddollar-icon.svg' },
    { symbol: 'cUSD', name: 'cUSD', icon: '/assets/cusd.png' }
];

const TipWidget = ({ project, onTipSuccess, onShare }) => {
    const { authenticated, login, user } = usePrivy();
    const [amount, setAmount] = useState('');
    const [showSuccessScreen, setShowSuccessScreen] = useState(false); // Renamed to avoid conflict with useTip's isSuccess
    const [selectedToken, setSelectedToken] = useState('G$');
    const [showTokenMenu, setShowTokenMenu] = useState(false);

    const { balance, isLoading: balanceLoading, refetch: refetchBalance } = useTokenBalance(selectedToken, user?.wallet?.address);
    const { tip, isLoading: isTipping, status: tipStatus, error: txError, isSuccess: tipTxSuccess, txHash, reset } = useTip(); // Renamed isSuccess to tipTxSuccess

    const totalTipped = project.totalTipped || project.totalRaised || 0;
    const progress = project.fundingGoal ? Math.min(Math.round((totalTipped / project.fundingGoal) * 100), 100) : 0;

    const handleTipSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission

        // Check if tipping is disabled based on loading state
        if (isTipping) return;

        if (!authenticated) {
            login();
            return;
        }

        const finalAmount = amount;
        if (!finalAmount || parseFloat(finalAmount) <= 0) return;

        if (parseFloat(finalAmount) > balance) {
            alert(`Insufficient ${selectedToken} balance.`);
            return;
        }

        try {
            const collectiveAddress = (project?.collectiveAddress && /^0x[a-fA-F0-9]{40}$/.test(project?.collectiveAddress))
                ? project?.collectiveAddress
                : DEFAULT_COLLECTIVE_ADDRESS;

            const hash = await tip({
                tokenSymbol: selectedToken,
                amount: finalAmount,
                collectiveAddress: collectiveAddress,
            });

            if (hash) {
                const tipData = {
                    projectId: project._id,
                    donorWallet: user?.wallet?.address,
                    amount: parseFloat(finalAmount),
                    txHash: hash,
                    network: 'celo',
                    token: selectedToken,
                    anonymous: false,
                    projectName: project.name,
                    projectLogo: project.logo,
                    createdAt: new Date().toISOString()
                };

                // Record tip in DB
                try {
                    await fetch('/api/tips', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(tipData),
                    });
                } catch (dbErr) {
                    console.error("DB record failed, falling back to local storage", dbErr);
                }

                // Persistence Fallback: Save to Local Storage
                try {
                    const localTips = JSON.parse(localStorage.getItem('clearfund_tips') || '[]');
                    localStorage.setItem('clearfund_tips', JSON.stringify([tipData, ...localTips].slice(0, 50)));
                } catch (lsErr) {
                    console.error("Local storage save failed", lsErr);
                }

                if (onTipSuccess) {
                    onTipSuccess(tipData);
                }

                setShowSuccessScreen(true); // Use the local state for showing success screen
                refetchBalance(); // Refresh balance after tip
            }
        } catch (err) {
            console.error(err);
        }
    };

    const isSubmitDisabled = () => {
        if (!authenticated) return false;
        return isTipping || !amount || parseFloat(amount) <= 0 || parseFloat(amount) > balance;
    };

    // No longer returning inline success screen. It will be a modal.

    return (
        <div className="bg-[#F8F9FA] rounded-[1.5rem] shadow-sm p-6 lg:p-8 border border-gray-200">
            {showSuccessScreen && (
                <TipSuccessModal
                    amount={amount}
                    tokenSymbol={selectedToken}
                    txHash={txHash}
                    onClose={() => {
                        setShowSuccessScreen(false);
                        setAmount('');
                        reset();
                    }}
                    onTipAgain={() => {
                        setShowSuccessScreen(false);
                        setAmount('');
                        reset();
                    }}
                    onShare={onShare}
                />
            )}
            <p className="text-gray-500 text-sm mb-4">
                Tip with GoodDollar, cUSD on Celo network
            </p>
            <form onSubmit={handleTipSubmit} className="space-y-6">
                {/* Token Selector */}
                <div>
                    <label className="text-xs font-bold text-gray-800 mb-2 block">Tip Token</label>
                    <div className="relative">
                        <button
                            onClick={() => setShowTokenMenu(!showTokenMenu)}
                            className="w-full bg-white border border-gray-200 p-3 rounded-xl flex items-center justify-between transition-colors focus:ring-2 focus:ring-[#00AFAA]/20 outline-none hover:border-gray-300"
                        >
                            <div className="flex items-center gap-2">
                                {TOKENS.find(t => t.symbol === selectedToken) && (
                                    <img src={TOKENS.find(t => t.symbol === selectedToken).icon} alt={selectedToken} className="w-5 h-5 rounded-full object-cover" />
                                )}
                                <span className="font-bold text-gray-800">{selectedToken}</span>
                            </div>
                            <ChevronDown className="w-4 h-4 text-gray-400" />
                        </button>
                        {showTokenMenu && (
                            <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden z-10">
                                {TOKENS.map(token => (
                                    <button
                                        key={token.symbol}
                                        onClick={() => { setSelectedToken(token.symbol); setShowTokenMenu(false); }}
                                        className={`w-full text-left p-3 text-sm font-bold hover:bg-gray-50 flex items-center justify-between transition-colors ${selectedToken === token.symbol ? 'text-[#00AFAA] bg-[#00AFAA]/5' : 'text-gray-700'}`}
                                    >
                                        <div className="flex items-center gap-2">
                                            <img src={token.icon} alt={token.name} className="w-5 h-5 rounded-full object-cover" />
                                            {token.symbol}
                                        </div>
                                        {selectedToken === token.symbol && <CheckCircle2 className="w-4 h-4" />}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Amount Input */}
                <div>
                    <label className="text-xs font-bold text-gray-800 mb-2 block">Tip Amount</label>
                    <div className="relative bg-white border border-gray-200 text-gray-800 rounded-xl flex items-center focus-within:ring-2 focus-within:ring-[#00AFAA] focus-within:border-[#00AFAA] transition-all">
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="0.00"
                            className="w-full bg-transparent border-none px-4 py-3 text-sm font-bold focus:outline-none"
                        />
                        <span className="font-bold pr-4 text-gray-400">{selectedToken}</span>
                    </div>
                    {amount && parseFloat(amount) > 0 && selectedToken === 'G$' && (
                        <p className="mt-1 text-[10px] text-gray-400 font-bold ml-1">
                            ≈ ${(parseFloat(amount) * 0.0001).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 4 })} USD
                        </p>
                    )}
                </div>

                {/* Balance Display */}
                <div className="bg-white border border-gray-200 rounded-xl p-3 flex items-center justify-between shadow-sm">
                    <div className="flex items-center gap-2">
                        <Wallet className="h-4 w-4 text-gray-400" />
                        <span className="text-xs font-bold text-gray-600">Balance</span>
                    </div>
                    {balanceLoading ? (
                        <Loader2 className="h-3 w-3 text-gray-400 animate-spin" />
                    ) : (
                        <div className="text-right">
                            <span className="text-xs font-black text-gray-800 flex items-center gap-1 justify-end">
                                {balance.toLocaleString()} {selectedToken}
                            </span>
                            {selectedToken === 'G$' && (
                                <p className="text-[9px] text-gray-400 font-bold mt-0.5">
                                    ≈ ${(balance * 0.0001).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 4 })} USD
                                </p>
                            )}
                        </div>
                    )}
                </div>

                {txError && (
                    <div className="p-3 bg-red-50 border border-red-100 rounded-xl flex items-start gap-2 text-red-600 text-xs font-medium">
                        <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                        {txError}
                        <button onClick={reset} className="ml-auto underline">Dismiss</button>
                    </div>
                )}

                <div className="bg-gray-50 rounded-xl p-4 text-xs text-gray-500 font-medium leading-relaxed border border-gray-100">
                    <span className="font-bold text-gray-700">You are about to send a tip.</span><br />
                    Pressing "Confirm" will begin the tipping process. You will need to confirm using your connected wallet.
                </div>

                <button
                    type="submit"
                    disabled={isSubmitDisabled()}
                    className="w-full py-4 bg-[#00AFAA] hover:bg-[#003E52] text-white font-black text-xs uppercase tracking-widest rounded-3xl transition-all shadow-2xl flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-[0.98]"
                >
                    {isTipping ? (
                        <>
                            <Loader2 className="h-5 w-5 animate-spin" />
                            {tipStatus === 'sending' ? 'Signing...' : 'Confirming'}
                        </>
                    ) : (
                        authenticated ? `Confirm` : 'Connect Wallet'
                    )}
                </button>
            </form>
        </div>
    );
};

export default TipWidget;
