"use client"

import React, { useRef } from "react"
import { WagmiProvider } from "wagmi"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { config } from "@/lib/wagmiConfig"
import { NetworkAlert } from "./NetworkAlert"

function createQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
        gcTime: 10 * 60 * 1000,
      },
    },
  })
}

let clientQueryClientSingleton
function getQueryClient() {
  if (typeof window === 'undefined') return createQueryClient()
  if (!clientQueryClientSingleton) clientQueryClientSingleton = createQueryClient()
  return clientQueryClientSingleton
}

export default function Providers({ children }) {
  const queryClientRef = useRef(null)
  if (queryClientRef.current === null) queryClientRef.current = getQueryClient()

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClientRef.current}>
        <div className="contents">
          <NetworkAlert />
          <div className="contents">
            {children}
          </div>
        </div>
      </QueryClientProvider>
    </WagmiProvider>
  )
}