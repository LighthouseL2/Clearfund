"use client"

// import { Geist, Geist_Mono } from "next/font/google";
import { Inter } from 'next/font/google'

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import "./globals.css";
import { Suspense } from 'react';
import Providers from '@/components/Provider';
import Script from "next/script";

// import code for google analytics tag
import * as gtag from "@/lib/gtag";

import { PrivyProvider } from "@privy-io/react-auth"


const inter = Inter({ subsets: ['latin'] })

function AnalyticsWrapper({ children }) {
  const pathname = usePathname();

  useEffect(() => {
    gtag.pageview(window.location.pathname);
  }, [pathname]);

  return children;
}


export default function RootLayout({ children }) {

  return (

    <html lang="en">
      <head>
        <meta name='mobile-web-app-capable' content='yes' />
        <meta name='apple-mobile-web-app-capable' content='yes' />
        <link href="https://db.onlinewebfonts.com/c/74613e9d0612d09be09dd6de7c898d50?family=Modern+Era"
          rel="stylesheet">
        </link>
        <title>ClearFund</title>
        <link rel="shortcut icon" href="/loadingIcon.png" type="image/x-icon" />
        {/* google analytics script */}
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
        />
        <Script
          id="gtag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <Providers>
          <PrivyProvider
            appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID}
            config={{
              loginMethods: ["email", "wallet"],
              embeddedWallets: {
                createOnLogin: "users-without-wallets"
              },
              appearance: {
                theme: "light",
                landingHeader: <span style={{ fontFamily: "'Modern Era', sans-serif", fontWeight: "bold", fontSize: "1.2rem" }}>Connect to ClearFund</span>,
                accentColor: "#39B54A",
                fontFamily: "Inter, sans-serif",
                showWalletLoginFirst: false,
                logo: "/loadingIcon.png",
                walletList: [
                  "detected_ethereum_wallets",
                  "metamask",
                  "wallet_connect",
                  "coinbase_wallet"
                ],
              },
            }}
          >
            <Suspense fallback={<div>Loading ...</div>}>
              <AnalyticsWrapper>{children}</AnalyticsWrapper>
            </Suspense>
          </PrivyProvider>
        </Providers>

      </body>
    </html>

  );
}
