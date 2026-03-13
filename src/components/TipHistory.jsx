"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { createPublicClient, http, formatUnits, parseAbiItem } from "viem";
import { celo } from "viem/chains";
import {
    G_DOLLAR_ADDRESS,
    CELO_TOKEN_ADDRESS,
    DEFAULT_COLLECTIVE_ADDRESS,
    COLLECTIVE_ADDRESSES,
    CELOSCAN_TX_URL,
    CELOSCAN_ADDRESS_URL,
} from "@/lib/contracts/tip";

// Create a public client for reading blockchain data
const publicClient = createPublicClient({
    chain: celo,
    transport: http(),
});

// Transfer event signature for ERC20 tokens
const transferEvent = parseAbiItem(
    "event Transfer(address indexed from, address indexed to, uint256 value)"
);

function shortAddress(addr) {
    if (!addr) return "";
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
}

function timeAgo(timestamp) {
    const now = Date.now();
    const diff = now - timestamp * 1000;
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);

    if (months > 0) return `${months} month${months > 1 ? "s" : ""} ago`;
    if (days > 0) return `${days} day${days > 1 ? "s" : ""} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    if (minutes > 0) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    return "just now";
}

function ExternalLinkIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
    );
}

export default function TipHistory() {
    const [tips, setTips] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [displayCount, setDisplayCount] = useState(15);

    useEffect(() => {
        fetchTipHistory();
    }, []);

    async function fetchTipHistory() {
        try {
            setLoading(true);
            setError(null);

            // Get all collective addresses to monitor
            const collectiveAddresses = [
                ...new Set(Object.values(COLLECTIVE_ADDRESSES)),
            ];

            const allTips = [];

            // Fetch G$ Transfer events to collective addresses
            for (const collectiveAddr of collectiveAddresses) {
                try {
                    // Get latest block number
                    const latestBlock = await publicClient.getBlockNumber();
                    // Look back ~30 days (roughly 120,000 blocks at 5s/block on Celo)
                    const fromBlock = latestBlock - BigInt(120000);

                    // Fetch G$ token transfers TO the collective
                    const gDollarLogs = await publicClient.getLogs({
                        address: G_DOLLAR_ADDRESS,
                        event: transferEvent,
                        args: {
                            to: collectiveAddr,
                        },
                        fromBlock: fromBlock > 0n ? fromBlock : 0n,
                        toBlock: "latest",
                    });

                    // Process G$ tips
                    for (const log of gDollarLogs) {
                        const block = await publicClient.getBlock({
                            blockNumber: log.blockNumber,
                        });

                        allTips.push({
                            address: log.args.from,
                            amount: parseFloat(formatUnits(log.args.value, 18)).toFixed(2), // G$ has 18 decimals on Celo
                            symbol: "G$",
                            txHash: log.transactionHash,
                            timestamp: Number(block.timestamp),
                            time: timeAgo(Number(block.timestamp)),
                            blockNumber: Number(log.blockNumber),
                        });
                    }

                    // Fetch CELO (native) transfers to the collective
                    // Using the wrapped CELO token transfers as a proxy
                    const celoLogs = await publicClient.getLogs({
                        address: CELO_TOKEN_ADDRESS,
                        event: transferEvent,
                        args: {
                            to: collectiveAddr,
                        },
                        fromBlock: fromBlock > 0n ? fromBlock : 0n,
                        toBlock: "latest",
                    });

                    // Process CELO tips
                    for (const log of celoLogs) {
                        const block = await publicClient.getBlock({
                            blockNumber: log.blockNumber,
                        });

                        allTips.push({
                            address: log.args.from,
                            amount: parseFloat(formatUnits(log.args.value, 18)).toFixed(4),
                            symbol: "CELO",
                            txHash: log.transactionHash,
                            timestamp: Number(block.timestamp),
                            time: timeAgo(Number(block.timestamp)),
                            blockNumber: Number(log.blockNumber),
                        });
                    }
                } catch (fetchErr) {
                    console.warn(`Error fetching logs for ${collectiveAddr}:`, fetchErr);
                }
            }

            // Sort by timestamp descending (newest first)
            allTips.sort((a, b) => b.timestamp - a.timestamp);

            // Store all tips; display will be handled by displayCount
            setTips(allTips);
        } catch (err) {
            console.error("Error fetching tip history:", err);
            setError("Failed to load tip history");
        } finally {
            setLoading(false);
        }
    }

    const displayedTips = tips.slice(0, displayCount);

    return (
        <div className="w-full max-w-3xl py-6 pt-28">
            <h2 className="text-[36px] font-black inter text-[#082553] mb-4 text-left">
                History
            </h2>

            {loading ? (
                <div className="flex flex-col gap-4">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="animate-pulse flex items-center justify-between px-6 py-5 bg-gray-100 rounded-lg">
                            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                            <div className="h-4 bg-gray-200 rounded w-8"></div>
                        </div>
                    ))}
                    <p className="text-center text-sm text-gray-400 mt-2">
                        Loading tips from Celo blockchain...
                    </p>
                </div>
            ) : error ? (
                <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                    <p className="text-red-600 text-sm">{error}</p>
                    <button
                        onClick={fetchTipHistory}
                        className="mt-3 text-sm text-blue-600 hover:underline"
                    >
                        Try again
                    </button>
                </div>
            ) : displayedTips.length === 0 ? (
                <div className="bg-gray-50 rounded-lg p-8 text-center">
                    <p className="text-gray-500 text-sm">No tips found yet. Be the first to tip!</p>
                </div>
            ) : (
                <div className="flex flex-col gap-6">
                    {displayedTips.map((tip, i) => (
                        <div
                            key={`${tip.txHash}-${i}`}
                            className={`flex items-center justify-between px-6 ${i % 2 === 0 ? "bg-[#F3F4F6] rounded-lg py-5" : "bg-white"}`}
                        >
                            <span className="text-[24px] font-black text-[#082553] space-y-4">
                                <Link
                                    href={CELOSCAN_ADDRESS_URL(tip.address)}
                                    target="_blank"
                                    className="hover:text-blue-600 transition-colors"
                                >
                                    {shortAddress(tip.address)}
                                </Link>
                                {" "}tipped {tip.symbol === 'G$' ? `$${(parseFloat(tip.amount) * 0.0001).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 4 })} USD` : `${tip.amount}${tip.symbol}`} {tip.time}
                            </span>
                            <Link
                                href={CELOSCAN_TX_URL(tip.txHash)}
                                target="_blank"
                                className="ml-4 text-[#1e3a5f] hover:opacity-60 transition-opacity"
                                title="View transaction on Celoscan"
                            >
                                <ExternalLinkIcon />
                            </Link>
                        </div>
                    ))}


                    {tips.length > displayCount && (
                        <div className="flex justify-center mt-4">
                            <button
                                onClick={() => setDisplayCount(prev => prev + 15)}
                                className="px-6 py-2 bg-[#082553] text-white rounded-lg font-bold hover:bg-opacity-90 transition-all"
                            >
                                Load more
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
