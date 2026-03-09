'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePrivy } from '@privy-io/react-auth';
import { useTokenBalance, useDonate } from '@/hooks/useDonation';
import { CheckCircle2, AlertCircle, Loader2, Wallet, Coins, ChevronDown } from 'lucide-react';

const TOKENS = [
    { symbol: 'G$', name: 'GoodDollar', icon: '/donate-icons/Gooddollar-icon.svg' },
    { symbol: 'cUSD', name: 'cUSD', icon: '/assets/cusd.png' }
];

const TipWidget = ({ project, onTipSuccess }) => {
    const { authenticated, login, user } = usePrivy();
    const [amount, setAmount] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    const [selectedToken, setSelectedToken] = useState('G$');
    const [showTokenMenu, setShowTokenMenu] = useState(false);

    const { balance, isLoading: balanceLoading, refetch: refetchBalance } = useTokenBalance(selectedToken, user?.wallet?.address);
    const { donate, status, txHash, error, reset, isLoading: tipLoading } = useDonate();

    const progress = project.fundingGoal ? Math.min(Math.round((project.totalRaised / project.fundingGoal) * 100), 100) : 0;

    const handleTip = async () => {
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
            const hash = await donate({
                tokenSymbol: selectedToken,
                amount: finalAmount,
                collectiveAddress: project.walletAddress || '0x4267b622288d81a49ab3145554c9bf8e2150e68c', // mock address if undefined
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

                setIsSuccess(true);
                refetchBalance(); // Refresh balance after tip
            }
        } catch (err) {
            console.error(err);
        }
    };

    if (isSuccess) {
        return (
            <div className="bg-[#F8F9FA] rounded-[1.5rem] shadow-sm p-8 border border-gray-200 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="h-8 w-8 text-green-500" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Thank You!</h3>
                <p className="text-gray-500 text-sm mb-6">
                    Your tip of {amount} {selectedToken} has been processed successfully.
                </p>
                <div className="bg-white rounded-xl p-3 mb-6 flex items-center justify-between text-xs border border-gray-200">
                    <span className="text-gray-400 font-bold uppercase">Tx Hash</span>
                    <a
                        href={`https://celoscan.io/tx/${txHash}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#00AFAA] hover:underline max-w-[150px] truncate block"
                    >
                        {txHash}
                    </a>
                </div>
                <div className="flex flex-col gap-3">
                    <button
                        onClick={() => {
                            setIsSuccess(false);
                            setAmount('');
                            reset();
                        }}
                        className="w-full py-4 bg-gray-100 text-[#003E52] font-black rounded-3xl hover:bg-gray-200 transition-all block text-center text-[10px] uppercase tracking-widest"
                    >
                        Tip Again
                    </button>
                    <Link
                        href="/profile"
                        className="w-full py-4 bg-[#00AFAA] text-white font-black rounded-3xl hover:bg-[#003E52] transition-all block text-center text-[10px] uppercase tracking-widest shadow-lg"
                    >
                        View History
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-[#F8F9FA] rounded-[1.5rem] shadow-sm p-6 lg:p-8 border border-gray-200">
            <p className="text-gray-500 text-sm mb-4">
                Tip with GoodDollar, cUSD on Celo network
            </p>
            <div className="space-y-6">
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
                                        className={`w-full text-left p-3 text-sm font-bold hover:bg-gray-50 flex items-center justify-between transition-colors ${selectedToken === token.symbol ? 'text-[#00AFAA] bg-gray-50/50' : 'text-gray-700'}`}
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
                        <span className="text-xs font-black text-gray-800 flex items-center gap-1">
                            {balance.toLocaleString()} {selectedToken}
                        </span>
                    )}
                </div>

                {error && (
                    <div className="p-3 bg-red-50 border border-red-100 rounded-xl flex items-start gap-2 text-red-600 text-xs font-medium">
                        <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                        {error}
                        <button onClick={reset} className="ml-auto underline">Dismiss</button>
                    </div>
                )}

                <div className="bg-gray-50 rounded-xl p-4 text-xs text-gray-500 font-medium leading-relaxed border border-gray-100">
                    <span className="font-bold text-gray-700">You are about to send a tip.</span><br />
                    Pressing "Confirm" will begin the tipping process. You will need to confirm using your connected wallet.
                </div>

                <button
                    onClick={handleTip}
                    disabled={tipLoading || !amount || parseFloat(amount) <= 0}
                    className="w-full py-4 bg-[#00AFAA] hover:bg-[#003E52] text-white font-black text-xs uppercase tracking-widest rounded-3xl transition-all shadow-2xl flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-[0.98]"
                >
                    {tipLoading ? (
                        <>
                            <Loader2 className="h-5 w-5 animate-spin" />
                            {status === 'sending' ? 'Signing...' : 'Confirming'}
                        </>
                    ) : (
                        authenticated ? `Confirm` : 'Connect Wallet'
                    )}
                </button>
            </div>
        </div>
    );
};

export default TipWidget;
