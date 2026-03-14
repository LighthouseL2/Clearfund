'use client'
import React, { useState, useRef, useEffect } from "react";
import { useWallets } from "@privy-io/react-auth";
import { useTokenBalance, useTip } from "@/hooks/useTip";
import { SUPPORTED_TOKENS, CELOSCAN_TX_URL } from "@/lib/contracts/tip";
import Link from "next/link";

export default function TipModal({ onClose, collectiveAddress, onTipSuccess }) {
    const { wallets } = useWallets();
    const address = wallets[0]?.address;

    const [selectedCurrency, setSelectedCurrency] = useState(SUPPORTED_TOKENS[0]);
    const [amount, setAmount] = useState("");
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Real balance hooks
    const gDollarBalance = useTokenBalance('G$', address);

    // Tip hook
    const { tip, status, txHash, error, reset, isLoading, isSuccess, isError } = useTip();

    const getBalance = (symbol) => {
        if (symbol === 'G$') return gDollarBalance.balance;
        return 0;
    };

    const getBalanceLoading = (symbol) => {
        if (symbol === 'G$') return gDollarBalance.isLoading;
        return false;
    };

    const currentBalance = selectedCurrency ? getBalance(selectedCurrency.symbol) : 0;
    const isInsufficientBalance = selectedCurrency !== null && amount !== "" && parseFloat(amount) > currentBalance;

    const isConfirmEnabled =
        selectedCurrency !== null && amount !== "" && parseFloat(amount) > 0 && !isInsufficientBalance && !isLoading;

    // Close dropdown on outside click
    useEffect(() => {
        function handleClickOutside(e) {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSelectCurrency = (currency) => {
        setSelectedCurrency(currency);
        setDropdownOpen(false);
    };

    const handleConfirm = async () => {
        if (!isConfirmEnabled) return;

        const hash = await tip({
            tokenSymbol: selectedCurrency.symbol,
            amount: parseFloat(amount),
            collectiveAddress,
        });

        if (hash) {
            // Refetch balances after successful tip
            gDollarBalance.refetch();

            if (onTipSuccess) {
                onTipSuccess({
                    txHash: hash,
                    amount: parseFloat(amount),
                    symbol: selectedCurrency.symbol,
                    timestamp: Date.now(),
                });
            }
        }
    };

    // Build token list with real balances
    const currencies = SUPPORTED_TOKENS.map(token => ({
        ...token,
        balance: getBalance(token.symbol),
        balanceLoading: getBalanceLoading(token.symbol),
        bg: "bg-white",
        hover: "hover:bg-[#EFF6FF]/50",
        selected: "bg-[#EFF6FF]",
        border: "border border-[#198038]/20",
    }));

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 text-black px-4">
            <div className="bg-white rounded-[32px] shadow-2xl w-full max-w-[440px] p-10 relative animate-in fade-in zoom-in duration-300">

                <button
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-lg leading-none"
                    onClick={() => { reset(); onClose(); }}
                >
                    ✕
                </button>

                {/* Success State */}
                {isSuccess ? (
                    <div className="flex flex-col items-center justify-center py-6 px-4 animate-in fade-in zoom-in duration-500">
                        {/* Glow effect container */}
                        <div className="relative mb-8">
                            <div className="absolute inset-0 bg-[#39B54A] opacity-20 blur-xl rounded-full scale-150"></div>
                            <div className="relative w-24 h-24 bg-[#39B54A] rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(57,181,74,0.4)]">
                                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M20 6L9 17l-5-5" />
                                </svg>
                            </div>
                        </div>

                        <div className="text-center mb-8">
                            <h2 className="text-[24px] leading-tight font-bold text-gray-800 mb-2">
                                Tip Successful!
                            </h2>
                            <p className="text-gray-500 text-base">
                                Your tip of <span className="font-bold text-gray-800">{amount} {selectedCurrency?.symbol}</span> has been processed successfully.
                            </p>
                        </div>

                        {txHash && (
                            <div className="w-full bg-gray-50 rounded-2xl p-5 border border-gray-100 mb-8 text-left">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Transaction Hash</span>
                                    <button
                                        onClick={() => {
                                            navigator.clipboard.writeText(txHash);
                                            alert("Copied!");
                                        }}
                                        className="text-[10px] font-bold text-[#39B54A] hover:underline uppercase tracking-widest"
                                    >
                                        Copy
                                    </button>
                                </div>
                                <a
                                    href={`${CELOSCAN_TX_URL}${txHash}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-xs font-mono text-gray-600 hover:text-[#39B54A] break-all block leading-relaxed"
                                >
                                    {txHash}
                                </a>
                            </div>
                        )}

                        <div className="w-full flex flex-col gap-3">
                            <button
                                onClick={() => { reset(); setAmount(""); }}
                                className="w-full bg-[#39B54A] text-white font-bold py-4 rounded-full hover:bg-black transition-all shadow-lg active:scale-[0.98]"
                            >
                                Tip again
                            </button>
                            <button
                                onClick={() => { reset(); onClose(); }}
                                className="w-full bg-gray-50 text-gray-500 font-bold py-4 rounded-full hover:bg-gray-100 transition-all active:scale-[0.98]"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                ) : isError ? (
                    <div className="flex flex-col items-center justify-center py-6 px-4">
                        {/* Error Circle */}
                        <div className="relative mb-6">
                            <div className="absolute inset-0 bg-[#FF2E2E] opacity-20 blur-xl rounded-full"></div>
                            <div className="relative w-24 h-24 bg-[#FF2E2E] rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(255,46,46,0.4)]">
                                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M18 6L6 18M6 6l12 12" />
                                </svg>
                            </div>
                        </div>

                        <h2 className="text-[24px] font-black text-gray-800 text-center mb-1">Error!</h2>
                        <p className="text-[16px] text-gray-500 text-center mb-8 font-medium">
                            Your tip request could not be processed.
                        </p>

                        <button
                            onClick={() => { reset(); }}
                            className="w-full bg-[#FF2E2E] text-white font-bold py-4 rounded-full hover:bg-[#e62929] transition-all shadow-lg active:scale-[0.98]"
                        >
                            Try again
                        </button>

                        {error && (
                            <p className="mt-4 text-xs text-red-500 text-center max-w-xs">{error}</p>
                        )}
                    </div>
                ) : (
                    <>
                        <h2 className="text-[22px] font-black tracking-tight mb-1.5">How much?</h2>
                        <p className="text-sm text-gray-500 mb-8 font-medium">
                            Tip using Gooddollar on Celo
                        </p>

                        <div className="relative mb-8" ref={dropdownRef}>
                            <div className="flex items-center border border-gray-100 rounded-[20px] bg-gray-50/50 focus-within:ring-1 focus-within:ring-black/5 focus-within:border-black/10 overflow-visible p-1.5">
                                <button
                                    onClick={() => setDropdownOpen((prev) => !prev)}
                                    className="flex items-center justify-between px-3.5 mx-1 py-3.5 bg-[#DBF5EF] rounded-lg shrink-0 gap-3"
                                    disabled={isLoading}
                                >
                                    <div className="flex items-center gap-2">
                                        {selectedCurrency && <img src={selectedCurrency.icon} alt="" className="w-5 h-5 rounded-full" />}
                                        <span className="text-[#3A7768] font-semibold text-sm whitespace-nowrap">
                                            {selectedCurrency ? (selectedCurrency.symbol === 'G$' ? 'Gooddollar' : selectedCurrency.symbol) : "Gooddollar"}
                                        </span>
                                    </div>
                                    <svg
                                        className={`w-5 h-5 text-[#3A7768] transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>

                                <input
                                    inputMode="decimal"
                                    placeholder="0.00"
                                    value={amount}
                                    onChange={(e) => {
                                        const val = e.target.value;
                                        if (/^\d*\.?\d*$/.test(val)) setAmount(val);
                                    }}
                                    disabled={isLoading}
                                    className="flex-1 bg-transparent px-4 py-4.5 text-sm font-bold focus:outline-none text-left disabled:opacity-50"
                                />
                            </div>

                            {/* Balance display */}
                            {selectedCurrency && (
                                <div className="flex justify-between items-center mt-2 px-1">
                                    <span className="text-xs text-gray-400">
                                        Balance: {getBalanceLoading(selectedCurrency.symbol) ? (
                                            <span className="animate-pulse">Loading...</span>
                                        ) : (
                                            <span className="font-medium text-gray-600">
                                                {currentBalance.toFixed(selectedCurrency.symbol === 'CELO' ? 4 : 2)} {selectedCurrency.symbol}
                                            </span>
                                        )}
                                    </span>
                                    <button
                                        onClick={() => setAmount(currentBalance.toString())}
                                        className="text-xs text-[#3A7768] font-semibold hover:underline"
                                        disabled={isLoading}
                                    >
                                        MAX
                                    </button>
                                </div>
                            )}

                            {isInsufficientBalance && (
                                <p className="text-red-500 text-xs mt-2 ml-1">Insufficient balance</p>
                            )}

                            {dropdownOpen && (
                                <div className="flex flex-col gap-2 p-1 mt-1">
                                    {currencies.map((currency) => (
                                        <div
                                            key={currency.name}
                                            onClick={() => handleSelectCurrency(currency)}
                                            className={`flex items-center gap-3 px-3 py-3 cursor-pointer ${currency.border} rounded-lg transition-colors ${selectedCurrency?.name === currency.name
                                                ? currency.selected
                                                : `${currency.bg} ${currency.hover}`
                                                }`}
                                        >
                                            <img src={currency.icon} alt={currency.name} className="w-8 h-8" />
                                            <span className="flex-1 text-sm font-medium text-gray-800">{currency.symbol === 'G$' ? 'Gooddollar' : currency.symbol}</span>
                                            <span className="text-sm text-gray-500">
                                                {currency.balanceLoading ? '...' : currency.balance.toFixed(currency.symbol === 'CELO' ? 4 : 2)}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Error message */}
                        {isError && error && (
                            <div className="bg-red-50 border border-red-200 text-red-600 text-xs rounded-lg p-3 mb-3">
                                {error}
                            </div>
                        )}

                        <button
                            disabled={!isConfirmEnabled}
                            onClick={handleConfirm}
                            className={`w-full py-4 rounded-full text-[16px] font-black transition-all duration-200 mt-2 mb-8 shadow-lg active:scale-[0.98] ${isConfirmEnabled
                                ? "bg-[#39B54A] text-white hover:bg-black cursor-pointer"
                                : "bg-gray-100 text-gray-300 cursor-not-allowed"
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
                                'Confirm'
                            )}
                        </button>

                        <div className="border border-[#D9D9D9] px-4 py-4 my-2 rounded-lg">
                            <h1 className="mb-2 text-sm font-medium text-black leading-tight">
                                You are about to send a tip.
                            </h1>
                            <p className="text-xs font-medium text-black/50 leading-snug">
                                Pressing &quot;Confirm&quot; will begin the tipping process. You will need to
                                confirm using your connected wallet. Your tip will be sent on the Celo blockchain.
                            </p>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
