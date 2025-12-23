"use client";

import { useState } from "react";
import { fixTags, msgTypes } from "../utils/fixTags";

export default function FixDecoder() {
    const [input, setInput] = useState("8=FIX.4.2  | 9=100  | 35=D  | 49=SENDER  | 56=TARGET  | 11=ORDER123  | 55=MSFT  | 54=1  | 38=100  | 40=2  | 44=150.50  | 10=192");
    const [parsed, setParsed] = useState<{ tag: string; name: string; value: string; desc?: string }[]>([]);

    const parseFix = (raw: string) => {
        // Delimiters can be | or SOH (\x01) or ^A
        // Replace typical visual delimiters with a standard one
        let clean = raw.trim();
        if (clean.includes("|")) clean = clean.split("|").join("\x01");

        // Split by SOH and filter out empty strings
        const pares = clean.split(/[\x01]/).filter(p => p && p.includes("="));

        const result = pares.map(pair => {
            const parts = pair.split("=");
            // Safety check: ensure we have at least a tag and a value part
            if (parts.length < 2) return null;

            const tag = parts[0].trim();
            const valParts = parts.slice(1);
            const value = valParts.join("=");

            if (!tag) return null;

            let desc = "";
            if (tag === "35" && msgTypes[value]) {
                desc = msgTypes[value];
            }

            return {
                tag,
                name: fixTags[tag] || "Unknown Tag",
                value,
                desc
            };
        }).filter((item): item is { tag: string; name: string; value: string; desc: string } => item !== null);

        setParsed(result);
    };

    return (
        <div className="w-full max-w-4xl mx-auto space-y-8">
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 shadow-2xl">
                <label className="block text-sm font-medium text-zinc-400 mb-2">Raw FIX Message</label>
                <textarea
                    title="Press enter or start typing to see decoded values below"
                    className="w-full h-32 bg-zinc-950 border border-zinc-800 rounded-lg p-4 font-mono text-sm text-green-400 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all placeholder-zinc-700"
                    placeholder="8=FIX.4.2|35=D|..."
                    value={input}
                    onChange={(e) => {
                        setInput(e.target.value);
                        parseFix(e.target.value);
                    }}
                />
                <div className="mt-2 text-xs text-zinc-500">
                    Supports | delimiter or raw SOH characters.
                </div>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden shadow-2xl">
                <div className="px-6 py-4 border-b border-zinc-800 bg-zinc-950/50 flex justify-between items-center">
                    <h3 className="font-semibold text-zinc-100">Decoded Message</h3>
                    {parsed.find(p => p.tag === "35") && (
                        <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-mono font-bold border border-blue-500/20">
                            {parsed.find(p => p.tag === "35")?.desc || parsed.find(p => p.tag === "35")?.value}
                        </span>
                    )}
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead>
                            <tr className="border-b border-zinc-800 text-zinc-500 bg-zinc-950/30">
                                <th className="px-6 py-3 font-medium w-24">Tag</th>
                                <th className="px-6 py-3 font-medium w-48">Name</th>
                                <th className="px-6 py-3 font-medium">Value</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-800/50">
                            {parsed.length === 0 ? (
                                <tr>
                                    <td colSpan={3} className="px-6 py-8 text-center text-zinc-600 italic">
                                        Enter a FIX message above to decode...
                                    </td>
                                </tr>
                            ) : (
                                parsed.map((item, idx) => (
                                    <tr key={idx} className="hover:bg-zinc-800/30 transition-colors">
                                        <td className="px-6 py-3 font-mono text-zinc-500">{item.tag}</td>
                                        <td className="px-6 py-3 text-blue-400 font-medium">{item.name}</td>
                                        <td className="px-6 py-3 font-mono text-zinc-300">
                                            <span className={item.tag === "35" ? "text-yellow-400 font-bold" : ""}>
                                                {item.value}
                                            </span>
                                            {item.desc && <span className="ml-2 text-zinc-600 italic">({item.desc})</span>}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
