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
                try {
                    await wallet.switchChain(CELO_CHAIN_ID)
                } catch (switchErr) {
                    console.warn('Chain switch warning:', switchErr)
                }

                // Get the Privy wallet's EIP-1193 provider
                const provider = await wallet.getEthereumProvider()

                // Request accounts to ensure provider is connected
                await provider.request({ method: 'eth_requestAccounts' })

                // Create a viem wallet client from the Privy provider
                const walletClient = createWalletClient({
                    chain: celo,
                    transport: custom(provider),
                })

                // Get the account address from the provider
                const [account] = await walletClient.getAddresses()

                let hash

                if (token.isNative) {
                    // Native CELO transfer
                    hash = await walletClient.sendTransaction({
                        to: recipient,
                        value: parsedAmount,
                        account,
                    })
                } else {
                    // ERC20 transfer (G$) using writeContract
                    hash = await walletClient.writeContract({
                        address: token.address,
                        abi: ERC20_ABI,
                        functionName: 'transfer',
                        args: [recipient, parsedAmount],
                        account,
                    })
                }

                setTxHash(hash)
                setStatus('success')
                return hash
            } catch (err) {
                console.error('Donation error:', err)
                const message = err.shortMessage || err.message || 'Transaction failed'
                // User rejected
                if (message.toLowerCase().includes('reject') || message.toLowerCase().includes('denied')) {
                    setError('Transaction was rejected by user')
                } else {
                    setError(message)
                }
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
