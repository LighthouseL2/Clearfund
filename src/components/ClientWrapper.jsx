"use client"

import React, { useEffect, Suspense } from "react"
import { usePathname } from "next/navigation"
import Providers from '@/components/Provider'
import { PrivyProvider } from "@privy-io/react-auth"
import { Analytics } from "@vercel/analytics/next"
import * as gtag from "@/lib/gtag"
import { celo } from "viem/chains"

// Define stable config outside to prevent re-renders
const PRIVY_CONFIG = {
    loginMethods: ["wallet"],
    defaultChain: celo,
    supportedChains: [celo],
    walletConnectCloudProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID,
    embeddedWallets: {
        createOnLogin: "users-without-wallets"
    },
    appearance: {
        theme: "light",
        accentColor: "#00AFAA",
        showWalletLoginFirst: true,
    },
};

function AnalyticsWrapper({ children }) {
    const pathname = usePathname();

    useEffect(() => {
        if (typeof window !== 'undefined' && window.gtag) {
            gtag.pageview(window.location.pathname);
        }
    }, [pathname]);

    return (
        <>
            <div className="contents">
                {children}
            </div>
            <Analytics />
        </>
    );
}

export default function ClientWrapper({ children }) {
    const privyAppId = process.env.NEXT_PUBLIC_PRIVY_APP_ID;

    if (!privyAppId) {
        console.error("PRIVY_APP_ID is missing from environment variables.");
    }

    return (
        <PrivyProvider
            appId={privyAppId}
            config={PRIVY_CONFIG}
        >
            <Providers>
                <Suspense fallback={<div className="global-loader">Loading ...</div>}>
                    <AnalyticsWrapper>
                        {children}
                    </AnalyticsWrapper>
                </Suspense>
            </Providers>
        </PrivyProvider>
    )
}
