"use client"

import { usePrivy } from "@privy-io/react-auth"

const ExploreHeader = () => {
    const { login, authenticated } = usePrivy()

    return (
        <header className="w-full bg-[#FAF5ED] px-[5%] py-3 flex justify-end items-center font-sans tracking-tight">
            <div className="flex items-center gap-4">
                <button
                    onClick={login}
                    className="px-8 py-3.5 bg-[#00AFAA] text-white rounded-xl font-bold text-sm hover:bg-[#003E52] transition-all shadow-lg"
                >
                    {authenticated ? "Connected" : "Connect Wallet"}
                </button>
            </div>
        </header>
    )
}

export default ExploreHeader
