"use client"

import "@rainbow-me/rainbowkit/styles.css"
import { RainbowKitProvider, darkTheme } from "@rainbow-me/rainbowkit"
import { WagmiProvider } from "wagmi"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { useRef } from "react"
import { config } from "@/lib/wagmiConfig"
import { NetworkAlert } from "./NetworkAlert"

/**
 * Create QueryClient once and reuse it to prevent memory leaks
 * and multiple WalletConnect initializations
 */
function createQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000, // 1 minute
        gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
      },
    },
  })
}

let clientQueryClientSingleton
function getQueryClient() {
  if (typeof window === 'undefined') {
    // Server: always make a new query client
    return createQueryClient()
  }

  // Browser: use singleton pattern to reuse the same client
  if (!clientQueryClientSingleton) {
    clientQueryClientSingleton = createQueryClient()
  }

  return clientQueryClientSingleton
}

export default function Providers({ children }) {
  // Use useRef to ensure queryClient persists across re-renders
  const queryClientRef = useRef(null)

  if (queryClientRef.current === null) {
    queryClientRef.current = getQueryClient()
  }

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClientRef.current}>
        <RainbowKitProvider>
          <>
            <NetworkAlert />
            {children}
          </>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}