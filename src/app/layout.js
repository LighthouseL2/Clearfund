import { Inter } from 'next/font/google'
import "./globals.css";
import Script from "next/script";
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
        <link rel="icon" href="/assets/favicon.png?v=2" type="image/png" sizes="32x32" />
        <link rel="shortcut icon" href="/assets/favicon.png?v=2" type="image/png" />
        <link rel="apple-touch-icon" href="/assets/favicon.png?v=2" />
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
<<<<<<< HEAD
        <ClientWrapper>
          {children}
        </ClientWrapper>
=======
        <Providers>
          <PrivyProvider
            appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID}
            config={{
              loginMethods: ["wallet"],
              defaultChain: celoWithRpc,
              supportedChains: [celoWithRpc, baseSepolia],
              embeddedWallets: {
                createOnLogin: "users-without-wallets"
              },
              appearance: {
                theme: "light",
                landingHeader: (
                  <div key="custom-privy-header" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '0.5rem', marginBottom: '1rem', width: '100%' }}>
                    <img key="privy-logo" src="/assets/clearfund_logo.png" alt="ClearFund" style={{ height: '40px', marginBottom: '1.5rem', objectFit: 'contain' }} />
                    <span key="privy-title" style={{ fontFamily: 'monospace', fontSize: '24px', fontWeight: 'bold' }}>Log in or sign up</span>
                  </div>
                ),
                accentColor: "#00AFAA",
                fontFamily: "monospace",
                showWalletLoginFirst: true,
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

>>>>>>> 90bf5dd (feat: restore and refine project submission form and footer. update branding and typography.)
      </body>
    </html>
  );
}
