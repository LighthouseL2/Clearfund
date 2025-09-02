"use client"

// import { Geist, Geist_Mono } from "next/font/google";
import { Inter } from 'next/font/google'

import "./globals.css";
import next from "next";
import { Suspense } from 'react';
import { PrivyProvider } from "@privy-io/react-auth"


const inter = Inter({ subsets: ['latin'] })


// const geistSans = mordern({
//   src: '/fonts/ModernEra.woff',
//   variable: "--font-my-font"
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

// export const metadata = {
//   title: "ClearFund",
//   description:"ClearFund allows you to explore past grants data, find new funding oppourtunities and stay updated with real-time alerts from Web3 grants platforms",
// };

export default function RootLayout({ children }) {
  return (

    <html lang="en">
      <head>
        <link href="https://db.onlinewebfonts.com/c/74613e9d0612d09be09dd6de7c898d50?family=Modern+Era"
          rel="stylesheet">
        </link>
      </head>
      <body className={inter.className}>

        <PrivyProvider
          appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID}
          config={{
            loginMethods: ["wallet", "google", "email"],
            appearance: {
              theme: "light",
              accentColor: "#4f46e5",
              // walletChainType: "ethereum-only",
              // walletList: ["metamask", "rainbow", "wallet_connect", "binance"],
            },
            externalWallets: {
              coinbaseWallet: true,
              walletConnect: true,
            }
          }}
        >
          <Suspense fallback={<div></div>}>
              {children}
          </Suspense>
        </PrivyProvider>

      </body>
    </html>

  );
}
