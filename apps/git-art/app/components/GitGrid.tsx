"use client";

import { useState } from "react";
import { getCharGrid } from "../utils/pixelFont";

export default function GitGrid() {
    // 52 cols, 7 rows
    const [grid, setGrid] = useState<number[][]>(
        Array(7).fill(0).map(() => Array(52).fill(0))
    );
    const [text, setText] = useState("HIRE ME");
    const [email, setEmail] = useState("");
    const [script, setScript] = useState("");

    const drawText = (input: string) => {
        const newGrid = Array(7).fill(0).map(() => Array(52).fill(0));
        let colOffset = 0;

        for (const char of input) {
            if (colOffset >= 50) break;
            const charGrid = getCharGrid(char);

            // Apply char grid to main grid
            if (!charGrid) continue;
            // Char grid is 7 rows x 5 cols
            for (let r = 0; r < 7; r++) {
                const charRow = charGrid[r];
                if (!charRow) continue; // Safety check

                for (let c = 0; c < 5; c++) {
                    if (colOffset + c < 52) {
                        const targetRow = newGrid[r];
                        if (targetRow) {
                            targetRow[colOffset + c] = charRow[c] ?? 0;
                        }
                    }
                }
            }
            colOffset += 6; // 5 width + 1 spacing
        }
        setGrid(newGrid);
        setText(input);
    };

    const toggleCell = (r: number, c: number) => {
        const newGrid = [...grid];
        const row = newGrid[r];
        if (row) {
            newGrid[r] = [...row];
            newGrid[r][c] = newGrid[r][c] ? 0 : 1;
            setGrid(newGrid);
        }
    };

    const generateScript = () => {
        // Assume today is the end of the graph, so we go back 52 weeks + current day of week offset
        // Simplified: Let's say bottom-right is today (or last Saturday).
        // Actually GitHub graph usually ends on today.
        // So col 51 is current week.

        const commands = [];
        commands.push("#!/bin/bash");
        commands.push("rm -rf .git");
        commands.push("git init");
        commands.push("git branch -M main");
        commands.push("git remote add origin https://github.com/yaserali1608/my-contribution-graph.git");
        if (email) {
            commands.push(`git config user.email "${email}"`);
            commands.push(`git config user.name "Git Art Generator"`);
        }

        const today = new Date();
        // Adjust to last Saturday to align grid? Or just align to today.
        // GitHub graph: Column 0 is ~1 year ago.

        // Let's iterate: col 0 to 51 -> week 0 to 51
        // row 0 to 6 -> Sunday to Saturday

        // Find the date of col 0, row 0.
        // It is roughly 52 weeks ago.
        // We need to match the day of week.

        const oneDay = 24 * 60 * 60 * 1000;

        // Let's iterate backwards from "Today" being the last cell logic?
        // Or assume Col 0 starts on a Sunday exactly 52 weeks ago?
        // A simple approximation: 
        // 52 columns * 7 days = 364 days.
        // Start date = Today - 365 days?
        // Let's just generate distinct dates.

        // Start date: Let's pick a Sunday ~1 year ago.
        const startDate = new Date();
        startDate.setHours(12, 0, 0, 0); // Normalize to Noon to avoid timezone rollover
        startDate.setFullYear(startDate.getFullYear() - 1);
        while (startDate.getDay() !== 0) {
            startDate.setDate(startDate.getDate() + 1);
        }
        // Now startDate is a Sunday.

        for (let col = 0; col < 52; col++) {
            for (let row = 0; row < 7; row++) {
                const rowArr = grid[row];
                if (rowArr && rowArr[col] === 1) {
                    // Calculate date
                    const daysToAdd = (col * 7) + row;
                    const commitDate = new Date(startDate.getTime() + (daysToAdd * oneDay));
                    const dateStr = commitDate.toISOString();

                    // Create lighter/darker shades by adding multiple commits?
                    // For now just 1 commit per pixel.
                    // Random hash to avoid duplicate commits if running multiple times?
                    // Allow-empty is fine.
                    commands.push(`GIT_AUTHOR_DATE="${dateStr}" GIT_COMMITTER_DATE="${dateStr}" git commit --allow-empty -m "pixel ${col}-${row}"`);
                }
            }
        }

        setScript(commands.join("\n"));
    };

    return (
        <div className="w-full max-w-6xl mx-auto space-y-8">
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-8 shadow-2xl">
                <div className="flex flex-col gap-4 mb-8">
                    <div className="flex gap-4">
                        <input
                            type="text"
                            value={text}
                            onChange={(e) => drawText(e.target.value)}
                            className="bg-zinc-950 border border-zinc-700 rounded-lg px-4 py-2 text-white placeholder-zinc-500 flex-1 uppercase"
                            placeholder="TYPE HERE (e.g. HIRE ME)"
                            maxLength={8}
                        />
                        <button
                            onClick={() => drawText(text)}
                            className="bg-green-600 hover:bg-green-500 text-white font-bold py-2 px-6 rounded-lg transition-colors"
                        >
                            Reset to Text
                        </button>
                    </div>
                    <div className="flex gap-4">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="bg-zinc-950 border border-zinc-700 rounded-lg px-4 py-2 text-white placeholder-zinc-500 flex-1"
                            placeholder="YOUR GITHUB EMAIL (Recommended)"
                        />
                        <button
                            onClick={generateScript}
                            className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-6 rounded-lg transition-colors whitespace-nowrap"
                        >
                            Generate Script
                        </button>
                        <button
                            onClick={() => {
                                // clear grid
                                setGrid(Array(7).fill(0).map(() => Array(52).fill(0)));
                                setText("");
                            }}
                            className="bg-red-900/50 hover:bg-red-900 text-red-200 font-bold py-2 px-6 rounded-lg transition-colors border border-red-800"
                        >
                            Clear
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto pb-4">
                    <div className="flex gap-1">
                        {/* Render columns first? No, CSS grid-flow-col fills columns first if we map correctly? 
                            Actually, if we map rows, we get row-major.
                            We want explicit grid.
                        */}
                        {/* We need to transpose for rendering if we use grid-flow-col, or just render normally 
                            and style it.
                            Let's use a flex row of columns.
                        */}

                        {/* Using explicit div structure matching [row][col] is hard with flex.
                            Let's iterate columns then rows.
                        */}
                        {Array.from({ length: 52 }).map((_, colIdx) => (
                            <div key={colIdx} className="flex flex-col gap-1">
                                {Array.from({ length: 7 }).map((_, rowIdx) => (
                                    <div
                                        key={`${colIdx}-${rowIdx}`}
                                        onClick={() => toggleCell(rowIdx, colIdx)}
                                        className={`w-3 h-3 rounded-sm cursor-pointer transition-colors ${(grid[rowIdx] && grid[rowIdx][colIdx]) ? 'bg-green-500 hover:bg-green-400' : 'bg-zinc-800 hover:bg-zinc-700'
                                            }`}
                                        title={`Week ${colIdx}, Day ${rowIdx}`}
                                    />
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {script && (
                <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 shadow-2xl animate-in fade-in slide-in-from-bottom-4">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-semibold text-zinc-100">Bash Script</h3>
                        <button
                            onClick={() => navigator.clipboard.writeText(script)}
                            className="text-xs text-blue-400 hover:text-blue-300"
                        >
                            Copy to Clipboard
                        </button>
                    </div>
                    <pre className="bg-zinc-950 p-4 rounded-lg overflow-x-auto text-xs font-mono text-green-400 h-64">
                        {script}
                    </pre>
                    <div className="mt-4 text-xs text-zinc-500 bg-blue-900/10 border border-blue-900/30 p-3 rounded-lg">
                        <strong className="text-blue-400 block mb-1">How to Refresh the Graph:</strong>
                        <ul className="list-disc pl-4 space-y-1">
                            <li><strong>New Pattern:</strong> The script now includes <code>rm -rf .git</code> to completely wipe local history before starting.</li>
                            <li><strong>To Overwrite GitHub:</strong> Because you are rewriting history, you must use force push:</li>
                            <li><code>git push --force origin main</code></li>
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
}
