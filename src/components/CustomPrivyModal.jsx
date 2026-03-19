"use client";

import { useEffect } from "react";
import { usePrivy, useConnectWallet } from "@privy-io/react-auth";

/**
 * CustomPrivyModal - Optimized for Wagmi v2 & Privy SDK v2 Sync
 * Handles specialized wallet connection & social login
 */
export default function CustomPrivyModal({ isOpen, onClose }) {
  const { login, authenticated, user } = usePrivy();
  const { connectWallet } = useConnectWallet();

  // Close modal when authentication is successful
  useEffect(() => {
    if (authenticated && isOpen) {
      onClose(); // close modal if user is logged in
    }
  }, [authenticated, isOpen, onClose]);

  if (!isOpen) return null;

  // Wallet Handlers - Using connectWallet/login for stable connection
  const handleWalletLogin = async () => {
    try {
      // login() with wallet pre-selection starts the wallet picking flow
      // which is more stable for the FIRST login on Wagmi v2
      await login({ loginMethods: ['wallet'] });
    } catch (err) {
      console.error("Wallet login failed:", err);
    }
  };

  const handleSocialLogin = (method) => {
    try {
      login({ loginMethods: [method] });
    } catch (err) {
      console.error(`Social login failed (${method}):`, err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-[200] p-4 font-sans">
      <div className="bg-[#F3F4F6] rounded-[2rem] shadow-2xl p-8 w-full max-w-[400px] relative flex flex-col animate-in fade-in zoom-in duration-300">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 bg-white/50 border border-gray-200 rounded-full hover:bg-white text-gray-500 hover:text-gray-800 transition-all shadow-sm group"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M1 1L13 13M13 1L1 13" />
          </svg>
        </button>

        <h2 className="text-xl font-black text-gray-800 mb-8 text-center mt-2 tracking-tight">Log in or sign up</h2>

        <div className="flex flex-col gap-3">
          {/* Main Wallet Link - Calls Privy's Managed flow for stability */}
          <button
            onClick={handleWalletLogin}
            className="w-full py-4 px-6 bg-white border border-gray-100 rounded-2xl flex items-center justify-between hover:border-[#00AFAA] hover:shadow-md transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#00AFAA]/10 flex items-center justify-center">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00AFAA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" /><path d="M3 5v14a2 2 0 0 0 2 2h16v-5" /><path d="M18 12a2 2 0 0 0 0 4h4v-4Z" /></svg>
              </div>
              <span className="font-bold text-gray-700">Connect Wallet</span>
            </div>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform"><path d="m9 18 6-6-6-6" /></svg>
          </button>

          <p className="text-[11px] text-gray-400 font-bold uppercase tracking-widest text-center my-4">Social Login</p>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => handleSocialLogin('google')}
              className="py-3 px-4 bg-white border border-gray-100 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-50 transition-all font-bold text-sm text-gray-600 shadow-sm"
            >
              Google
            </button>
            <button
              onClick={() => handleSocialLogin('twitter')}
              className="py-3 px-4 bg-white border border-gray-100 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-50 transition-all font-bold text-sm text-gray-600 shadow-sm"
            >
              Twitter
            </button>
          </div>
        </div>

        <p className="text-[10px] text-gray-400 text-center mt-8 font-medium italic">
          By continuing, you agree to our Terms of Service.
        </p>
      </div>
    </div>
  );
}
