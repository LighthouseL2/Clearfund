'use client'
import React, { useState, useRef, useEffect } from "react";
import { useWallets } from "@privy-io/react-auth";
import { useTokenBalance, useDonate } from "@/hooks/useDonation";
import { SUPPORTED_TOKENS, CELOSCAN_TX_URL } from "@/lib/contracts/donation";
import Link from "next/link";

export default function DonationModal({ onClose, collectiveAddress, onDonationSuccess }) {
    const { wallets } = useWallets();
    const address = wallets[0]?.address;

    const [selectedCurrency, setSelectedCurrency] = useState(null);
    const [amount, setAmount] = useState("");
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Real balance hooks
    const gDollarBalance = useTokenBalance('G$', address);
    const celoBalance = useTokenBalance('CELO', address);

    // Donation hook
    const { donate, status, txHash, error, reset, isLoading, isSuccess, isError } = useDonate();

    const getBalance = (symbol) => {
        if (symbol === 'G$') return gDollarBalance.balance;
        if (symbol === 'CELO') return celoBalance.balance;
        return 0;
    };

    const getBalanceLoading = (symbol) => {
        if (symbol === 'G$') return gDollarBalance.isLoading;
        if (symbol === 'CELO') return celoBalance.isLoading;
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

        const hash = await donate({
            tokenSymbol: selectedCurrency.symbol,
            amount: parseFloat(amount),
            collectiveAddress,
        });

        if (hash) {
            // Refetch balances after successful donation
            gDollarBalance.refetch();
            celoBalance.refetch();

            if (onDonationSuccess) {
                onDonationSuccess({
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
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 text-black">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-[418px] min-h-[350px] p-6 relative">

                <button
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-lg leading-none"
                    onClick={() => { reset(); onClose(); }}
                >
                    ✕
                </button>

                {/* Success State */}
                {isSuccess && txHash ? (
                    <div className="flex flex-col items-center justify-center py-8 gap-4">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                            <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h2 className="text-xl font-bold text-green-700">Donation Successful!</h2>
                        <p className="text-sm text-gray-500 text-center">
                            Your donation of {amount} {selectedCurrency?.symbol} has been sent successfully.
                        </p>
                        <Link
                            href={CELOSCAN_TX_URL(txHash)}
                            target="_blank"
                            className="text-sm text-blue-600 hover:underline flex items-center gap-1"
                        >
                            View on Celoscan
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                        </Link>
                        <button
                            onClick={() => { reset(); onClose(); }}
                            className="mt-4 bg-[#95EED8] text-[#3A7768] font-semibold py-2.5 px-8 rounded-full hover:bg-[#7de0c8] transition-colors"
                        >
                            Done
                        </button>
                    </div>
                ) : (
                    <>
                        <h2 className="text-lg font-semibold mb-1">How much?</h2>
                        <p className="text-sm text-gray-500 mb-5">
                            Donate using G$ on celo
                        </p>

                        <div className="relative mb-4" ref={dropdownRef}>
                            <div className="flex items-center border-[1px] border-[#E2EAFF] rounded-lg bg-gray-50 focus-within:ring-1 focus-within:ring-[#D9D9D9] focus-within:border-gray-200 overflow-visible">
                                <button
                                    onClick={() => setDropdownOpen((prev) => !prev)}
                                    className="flex items-center justify-between px-3.5 mx-1 py-3.5 bg-[#DBF5EF] rounded-lg shrink-0 gap-6"
                                    disabled={isLoading}
                                >
                                    <span className="text-[#3A7768] font-semibold text-sm whitespace-nowrap">
                                        {selectedCurrency ? selectedCurrency.symbol : "G$"}
                                    </span>
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
                                            <span className="flex-1 text-sm font-medium text-gray-800">{currency.symbol}</span>
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
                            className={`w-full py-2.5 rounded-full text-sm font-semibold transition-all duration-200 mt-2.5 mb-3.5 ${isConfirmEnabled
                                ? "bg-[#95EED8] text-[#3A7768] hover:bg-[#7de0c8] cursor-pointer"
                                : "bg-gray-100 text-gray-400 cursor-not-allowed"
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
                                You are about to make a donation.
                            </h1>
                            <p className="text-xs font-medium text-black/50 leading-snug">
                                Pressing &quot;Confirm&quot; will begin the donation process. You will need to
                                confirm using your connected wallet. Your donation will be sent on the Celo blockchain.
                            </p>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
