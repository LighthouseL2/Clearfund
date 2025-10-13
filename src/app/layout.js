"use client"

// import { Geist, Geist_Mono } from "next/font/google";
import { Inter } from 'next/font/google'

import "./globals.css";
import next from "next";
import { Suspense } from 'react';
// import Providers from '@/components/Provider';

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
        <title>ClearFund</title>
        <link rel="shortcut icon" href="/projectLogo.png" type="image/x-icon" />
      </head>
      <body className={inter.className}>

        <PrivyProvider
          appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID}
          config={{
            loginMethods: ["wallet"],
            appearance: {
              theme: "light",
              landingHeader: <span style={{fontFamily: "monospace"}}>Connect your wallet to continue</span>,
              accentColor: "#4f46e5",
              fontFamily: "Poppins, sans-serif",
              showWalletLoginFirst: false,
              
              // 👇 Add your logo here
              logo: "/projectLogo.png",
              walletList: [
                "detected_ethereum_wallets",
                "wallet_connect",
                "coinbase_wallet"
              ]
            },
            
          }}
        >
          {children}
        </PrivyProvider>

      </body>
    </html>

  );
}
