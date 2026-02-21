'use client'
import React, { useState, useRef, useEffect } from "react";

const currencies = [
    { name: "GoodDollar", symbol: "G$", icon: "/donate-icons/gooddollar-icon.svg", balance: 609.4, bg: "bg-[#EFF6FF]", hover: "hover:bg-[#c2ede0]", selected: "bg-[#95EED8]", border: "border border-[#198038]/20"  },
    { name: "Celo", symbol: "CELO", icon: "/donate-icons/celo-icon.svg", balance: 3.78, bg: "bg-white", },
];
export default function DonationModal({ onClose }) {
    const [selectedCurrency, setSelectedCurrency] = useState(null);
    const [amount, setAmount] = useState("");
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const isConfirmEnabled =
        selectedCurrency !== null && amount !== "" && parseFloat(amount) > 0;

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

    return (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 text-black">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-[418px] min-h-[350px] p-6 relative">

                {/* Close button */}
                <button
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-lg leading-none"
                    onClick={onClose}
                >
                    ✕
                </button>

                {/* Title */}
                <h2 className="text-lg font-semibold mb-1">How much?</h2>
                <p className="text-sm text-gray-500 mb-5">
                    Donate using G$ token on Celo
                </p>

                {/* Input Row */}
                <div className="relative mb-4" ref={dropdownRef}>
                    <div className="flex items-center border-[1px] border-[#E2EAFF] rounded-lg bg-gray-50 focus-within:ring-1 focus-within:ring-[#D9D9D9] focus-within:border-gray-200 overflow-visible">

                        {/* Token Selector */}
                        <button
                            onClick={() => setDropdownOpen((prev) => !prev)}
                            className="flex items-center justify-between px-3.5 mx-1 py-3.5 bg-[#DBF5EF] rounded-lg shrink-0 gap-6"
                        >
                            <span className="text-[#3A7768] font-semibold text-sm whitespace-nowrap">
                                {selectedCurrency ? selectedCurrency.symbol : "Choose Token"}
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

                        {/* Amount Input */}
                        <input
                            inputMode="decimal"
                            placeholder="0.00"
                            value={amount}
                            onChange={(e) => {
                                const val = e.target.value;
                                if (/^\d*\.?\d*$/.test(val)) setAmount(val);
                            }}
                            className="flex-1 bg-transparent px-3.5 py-4.5 text-sm focus:outline-none text-right"
                        />
                    </div>

                    {/* Dropdown */}
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
                                    <span className="flex-1 text-sm font-medium text-gray-800">{currency.name}</span>
                                    <span className="text-sm text-gray-500">Balance: {currency.balance}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>



                {/* Confirm Button */}
                <button
                    disabled={!isConfirmEnabled}
                    className={`w-full py-2.5 rounded-full text-sm font-semibold transition-all duration-200 mt-2.5 mb-3.5 ${isConfirmEnabled
                        ? "bg-[#95EED8] text-[#3A7768] hover:bg-[#95EED8] cursor-pointer"
                        : "bg-gray-100 text-gray-400 cursor-not-allowed"
                        }`}
                >
                    Confirm
                </button>

                {/* Info Text */}
                <div className="border border-[#D9D9D9] px-4 py-4 my-2 rounded-lg">
                    <h1 className="mb-2 text-sm font-medium text-black leading-tight">
                        You are about to make a donation.
                    </h1>
                    <p className="text-xs font-medium text-black/50 leading-snug">
                        Pressing "Confirm" will begin the donation process. You will need to
                        confirm using your connected wallet.
                    </p>
                </div>

            </div>
        </div>
    );
}
