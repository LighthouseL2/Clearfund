"use client"


import { http, createConfig } from "wagmi"
import { celo, baseSepolia } from "viem/chains"
import { getDefaultConfig } from "@rainbow-me/rainbowkit"


export const config = getDefaultConfig({
    appName: "ClearFund",
    projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID,
    chains: [celo, baseSepolia],
    transports: {
        [celo.id]: http("https://1rpc.io/celo"),
        [baseSepolia.id]: http(),
    },
    ssr: true
})