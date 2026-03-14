"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"
import { Suspense } from 'react'
import Providers from '@/components/Provider'
import { PrivyProvider } from "@privy-io/react-auth"
import * as gtag from "@/lib/gtag"
import { celo, baseSepolia } from "viem/chains"

const celoWithRpc = {
    ...celo,
    rpcUrls: {
        ...celo.rpcUrls,
        default: { http: ["https://1rpc.io/celo", "https://forno.celo.org"] },
        public: { http: ["https://1rpc.io/celo", "https://forno.celo.org"] },
    }
}

function AnalyticsWrapper({ children }) {
    const pathname = usePathname();

    useEffect(() => {
        if (typeof window !== 'undefined' && window.gtag) {
            gtag.pageview(window.location.pathname);
        }
    }, [pathname]);

    return <>{children}</>;
}

export default function ClientWrapper({ children }) {
    return (
        <PrivyProvider
            appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID}
            config={{
                loginMethods: ["wallet"],
                defaultChain: celoWithRpc,
                supportedChains: [celoWithRpc, baseSepolia],
                walletConnectCloudProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID,
                embeddedWallets: {
                    createOnLogin: "users-without-wallets"
                },
                externalWallets: {
                    coinbaseWallet: {
                        connectionOptions: "all"
                    }
                },
                appearance: {
                    theme: "light",
                    accentColor: "#00AFAA",
                    fontFamily: "monospace",
                    showWalletLoginFirst: true,
                    walletList: [
                        "metamask",
                        "wallet_connect",
                        "detected_ethereum_wallets",
                        "coinbase_wallet",
                        "rainbow",
                    ],
                },
            }}
        >
            <Providers>
                <Suspense fallback={<div>Loading ...</div>}>
                    <AnalyticsWrapper>{children}</AnalyticsWrapper>
                </Suspense>
            </Providers>
        </PrivyProvider>
    )
}
