"use client"

import { Inter } from 'next/font/google'
import "./globals.css";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import ClientWrapper from '@/components/ClientWrapper';

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name='mobile-web-app-capable' content='yes' />
        <meta name='apple-mobile-web-app-capable' content='yes' />
        <link href="https://db.onlinewebfonts.com/c/74613e9d0612d09be09dd6de7c898d50?family=Modern+Era"
          rel="stylesheet">
        </link>
        <link rel="shortcut icon" href="/assets/favicon.png" type="image/x-icon" />
        <title>ClearFund</title>
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
        <ClientWrapper>{children}</ClientWrapper>
        <Analytics />
      </body>
    </html>
  );
}
