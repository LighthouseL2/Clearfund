import { createConfig } from '@privy-io/wagmi'
import { http } from 'wagmi'
import { celo, baseSepolia } from 'viem/chains'

export const config = createConfig({
    chains: [celo, baseSepolia],
    transports: {
        [celo.id]: http("https://forno.celo.org"),
        [baseSepolia.id]: http(),
    },
})