import { createConfig } from '@privy-io/wagmi'
import { http } from 'wagmi'
import { celo } from 'viem/chains'

export const config = createConfig({
    chains: [celo],
    ssr: true,
    transports: {
        [celo.id]: http('https://forno.celo.org'),
    },
})