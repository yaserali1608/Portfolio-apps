"use client";

import { useEffect } from "react";
import { useCryptoStore } from "../store/cryptoStore";

const ASSETS = [
    { id: "bitcoin", name: "Bitcoin", symbol: "BTC" },
    { id: "ethereum", name: "Ethereum", symbol: "ETH" },
    { id: "solana", name: "Solana", symbol: "SOL" },
    { id: "ripple", name: "XRP", symbol: "XRP" },
    { id: "cardano", name: "Cardano", symbol: "ADA" },
    { id: "dogecoin", name: "Dogecoin", symbol: "DOGE" },
    { id: "polkadot", name: "Polkadot", symbol: "DOT" },
    { id: "litecoin", name: "Litecoin", symbol: "LTC" },
    { id: "chainlink", name: "Chainlink", symbol: "LINK" },
    { id: "stellar", name: "Stellar", symbol: "XLM" },
];

export default function CryptoDashboard() {
    const { prices, connect, disconnect, isConnected } = useCryptoStore();

    useEffect(() => {
        connect();
        return () => disconnect();
    }, [connect, disconnect]);

    const formatPrice = (priceStr?: string) => {
        if (!priceStr) return "Loading...";
        const num = parseFloat(priceStr);
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(num);
    };

    return (
        <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
                    <span className="text-sm text-zinc-400">{isConnected ? 'Live Connection' : 'Disconnected'}</span>
                </div>
                <div className="text-xs text-zinc-600 font-mono">
                    Source: CoinCap WebSocket
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {ASSETS.map((asset) => {
                    const currentPrice = prices[asset.id];
                    // Using different colors based on asset index for visual variety
                    const accentColors = [
                        "border-orange-500/20 shadow-orange-500/10", // BTC
                        "border-blue-500/20 shadow-blue-500/10", // ETH
                        "border-purple-500/20 shadow-purple-500/10", // SOL
                        "border-indigo-500/20 shadow-indigo-500/10", // XRP
                        "border-blue-400/20 shadow-blue-400/10", // ADA
                        "border-yellow-400/20 shadow-yellow-400/10", // DOGE
                    ];
                    const colorClass = accentColors[ASSETS.indexOf(asset) % accentColors.length];

                    return (
                        <div key={asset.id} className={`bg-zinc-900 border rounded-xl p-6 shadow-xl transition-all hover:scale-105 duration-300 ${colorClass}`}>
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="font-bold text-xl text-zinc-100">{asset.name}</h3>
                                    <span className="text-xs font-mono text-zinc-500">{asset.symbol}</span>
                                </div>
                                <div className="text-2xl font-mono tracking-tighter font-semibold text-white">
                                    {formatPrice(currentPrice)}
                                </div>
                            </div>
                            <div className="w-full bg-zinc-800 h-1 rounded-full overflow-hidden">
                                {/* Simple visual bar simulating activity */}
                                <div className="h-full bg-white/10 animate-pulse w-2/3" />
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
