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
  const privyDataUri = <svg width="125" height="28" viewBox="0 0 188 42" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M137.815 22.3208H137.245L129.838 0.839355H121.161V1.7275L131.611 31.7261H143.134L153.587 1.7275V0.839355H145.288L137.811 22.3208H137.815Z" fill="#010110"></path><path d="M118.852 0.839355H110.224V31.7229H118.852V0.839355Z" fill="#010110"></path><path fillRule="evenodd" clipRule="evenodd" d="M179.217 0.836017H179.223L171.747 22.324H171.178L163.77 0.83927H155.094V1.73393L166.444 34.3254H155.696V41.4794H166.2C170.687 41.4794 174.181 39.9666 175.876 35.1387C176.104 34.4946 187.516 1.72742 187.516 1.72742V0.832764H179.217V0.836017Z" fill="#010110"></path><path fillRule="evenodd" clipRule="evenodd" d="M66.2556 0C62.3322 0 58.6657 1.99752 56.3786 5.75182H55.8483V0.871882H47.624V41.4697H56.3624V27.7929H56.8992C56.9577 27.8742 57.0163 27.9588 57.0748 28.0271C58.5486 29.8197 61.9906 32.5524 66.2719 32.5524C74.0635 32.5524 79.3924 25.8181 79.3924 16.2795C79.3924 6.74082 73.8 0 66.2556 0ZM63.6465 25.8572C59.5799 25.8572 56.7723 22.6885 56.7723 16.2827C56.7723 9.87699 59.5799 6.70829 63.6465 6.70829C67.7131 6.70829 70.6573 9.94531 70.6573 16.2827C70.6573 22.6201 67.7814 25.8572 63.6465 25.8572Z" fill="#010110"></path><path fillRule="evenodd" clipRule="evenodd" d="M101.065 0.83606C97.0148 0.83606 94.4154 1.51274 92.8961 5.75178H92.3756V0.839313H79.8667V7.93149H82.658C83.5787 7.93149 84.0309 8.25682 84.148 9.01158V14.9065H84.1806V31.7261H92.9189V15.3425C92.9189 11.1002 94.0706 8.50081 98.3129 8.50081H107.468V0.83606H101.068H101.065Z" fill="#010110"></path><path d="M16.7503 32.5428C25.7327 32.5428 33.0168 25.2587 33.0168 16.2763C33.0168 7.29401 25.7327 0.0098877 16.7503 0.0098877C7.76801 0.0098877 0.483887 7.29401 0.483887 16.2763C0.483887 25.2587 7.76801 32.5428 16.7503 32.5428Z" fill="#010110"></path><path d="M16.7508 42.0001C22.8897 42.0001 27.8673 40.9525 27.8673 39.6674C27.8673 38.3824 22.893 37.3348 16.7508 37.3348C10.6086 37.3348 5.63428 38.3824 5.63428 39.6674C5.63428 40.9525 10.6086 42.0001 16.7508 42.0001Z" fill="#010110"></path></svg>
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
              accentColor: "#4f46e5",
              showWalletLoginFirst: false,
              // 👇 Add your logo here
              logo: privyDataUri
            },
          }}
        >
          {children}
        </PrivyProvider>

      </body>
    </html>

  );
}
