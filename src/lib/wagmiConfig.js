"use client"


import { http, createConfig } from "wagmi"
import { celo, celoSepolia, baseSepolia } from "viem/chains"
import { getDefaultConfig } from "@rainbow-me/rainbowkit"


export const config = getDefaultConfig({
    appName: "ClearFund",
    projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "3fcc6b4468bd93c7f3423b5f2a3abb2a", // Placeholder to prevent crash
    chains: [celo, celoSepolia, baseSepolia],
    appDescription: "ClearFund - Impact Project Tipping Platform",
    appUrl: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
    appIcon: "https://clearfund.io/logo.png",
    transports: {
        [celo.id]: http("https://1rpc.io/celo"),
        [celoSepolia.id]: http("https://forno.celo-sepolia.celo-testnet.org"),
        [baseSepolia.id]: http(),
    },
    ssr: true
})