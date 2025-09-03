"use client"


import { http, createConfig } from "wagmi"
import { celo } from "viem/chains"
import { getDefaultConfig } from "@rainbow-me/rainbowkit"


export const config = getDefaultConfig({
    appName: "ClearFund",
    projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID,
    chains: [celo],
    transports: {
        [celo.id]: http(),
    },
    ssr: true
})