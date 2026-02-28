'use client'

import { useReadContract, useBalance } from 'wagmi'
import { parseUnits, formatUnits, createWalletClient, custom } from 'viem'
import { celo } from 'viem/chains'
import { useState, useCallback } from 'react'
import { useWallets } from '@privy-io/react-auth'
import {
    G_DOLLAR_ADDRESS,
    ERC20_ABI,
    SUPPORTED_TOKENS,
    DEFAULT_COLLECTIVE_ADDRESS,
    CELO_CHAIN_ID,
} from '@/lib/contracts/donation'

/**
 * Hook to fetch the user's balance for a specific token
 */
export function useTokenBalance(tokenSymbol, userAddress) {
    const token = SUPPORTED_TOKENS.find((t) => t.symbol === tokenSymbol)

    // For native CELO balance
    const {
        data: nativeBalance,
        isLoading: nativeLoading,
        refetch: refetchNative,
    } = useBalance({
        address: userAddress,
        chainId: CELO_CHAIN_ID,
        query: {
            enabled: !!userAddress && token?.isNative,
        },
    })

    // For ERC20 G$ balance
    const {
        data: tokenBalance,
        isLoading: tokenLoading,
        refetch: refetchToken,
    } = useReadContract({
        address: token?.address,
        abi: ERC20_ABI,
        functionName: 'balanceOf',
        args: [userAddress],
        chainId: CELO_CHAIN_ID,
        query: {
            enabled: !!userAddress && !!token && !token.isNative,
        },
    })

    const balance = token?.isNative
        ? nativeBalance
            ? parseFloat(formatUnits(nativeBalance.value, 18))
            : 0
        : tokenBalance
            ? parseFloat(formatUnits(tokenBalance, token?.decimals || 18))
            : 0

    return {
        balance,
        isLoading: token?.isNative ? nativeLoading : tokenLoading,
        refetch: token?.isNative ? refetchNative : refetchToken,
    }
}

/**
 * Hook to fetch all supported token balances for a user
 */
export function useAllTokenBalances(userAddress) {
    const gDollar = useTokenBalance('G$', userAddress)
    const celo = useTokenBalance('CELO', userAddress)

    return {
        'G$': gDollar,
        CELO: celo,
    }
}

/**
 * Hook to execute a donation transaction using Privy's embedded wallet
 */
export function useDonate() {
    const [status, setStatus] = useState('idle') // idle | sending | confirming | success | error
    const [txHash, setTxHash] = useState(null)
    const [error, setError] = useState(null)
    const { wallets } = useWallets()

    const donate = useCallback(
        async ({ tokenSymbol, amount, collectiveAddress }) => {
            const token = SUPPORTED_TOKENS.find((t) => t.symbol === tokenSymbol)
            if (!token) {
                setError('Unsupported token')
                setStatus('error')
                return
            }

            const wallet = wallets[0]
            if (!wallet) {
                setError('No wallet connected. Please connect your wallet first.')
                setStatus('error')
                return
            }

            const recipient = collectiveAddress || DEFAULT_COLLECTIVE_ADDRESS
            const parsedAmount = parseUnits(amount.toString(), token.decimals)

            try {
                setStatus('sending')
                setError(null)
                setTxHash(null)

                // Switch to Celo network if needed
                if (wallet.chainId !== `eip155:${CELO_CHAIN_ID}`) {
                    try {
                        await wallet.switchChain(CELO_CHAIN_ID)
                        // Wait for provider to sync after chain switch
                        await new Promise(resolve => setTimeout(resolve, 1000))
                    } catch (switchErr) {
                        console.warn('Chain switch warning:', switchErr)
                    }
                }

                // Get the Privy wallet's EIP-1193 provider
                const provider = await wallet.getEthereumProvider()

                // Register the provider with viem
                const walletClient = createWalletClient({
                    chain: celo,
                    transport: custom(provider),
                    account: wallet.address
                })

                let hash

                if (token.isNative) {
                    // Native CELO transfer
                    hash = await walletClient.sendTransaction({
                        to: recipient,
                        value: parsedAmount,
                        chain: celo,
                        account: wallet.address
                    })
                } else {
                    // ERC20 transfer (G$) using writeContract
                    hash = await walletClient.writeContract({
                        address: token.address,
                        abi: ERC20_ABI,
                        functionName: 'transfer',
                        args: [recipient, parsedAmount],
                        chain: celo,
                        account: wallet.address
                    })
                }

                if (!hash) throw new Error('No transaction hash returned')

                setTxHash(hash)
                setStatus('success')
                return hash
            } catch (err) {
                console.error('Donation error:', err)

                // Detailed error mapping
                let message = err.shortMessage || err.message || 'Transaction failed'

                if (message.includes('User rejected') || message.includes('denied') || message.includes('User denied')) {
                    message = 'Transaction was rejected in your wallet'
                } else if (message.includes('RPC error') || message.includes('Unknown RPC error')) {
                    message = 'Network error: The Celo RPC is currently unstable. Please try again in a moment.'
                } else if (message.includes('insufficient funds')) {
                    message = 'Insufficient funds for transaction and gas fees'
                }

                setError(message)
                setStatus('error')
                return null
            }
        },
        [wallets]
    )

    const reset = useCallback(() => {
        setStatus('idle')
        setTxHash(null)
        setError(null)
    }, [])

    return {
        donate,
        status,
        txHash,
        error,
        reset,
        isLoading: status === 'sending' || status === 'confirming',
        isSuccess: status === 'success',
        isError: status === 'error',
    }
}
