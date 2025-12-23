"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Database, Server, Layout, Cloud, Cpu, Globe } from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: (string | undefined | null | false)[]) {
    return twMerge(clsx(inputs));
}

const SKILLS = [
    { name: "Java (Core/JEE)", category: "Backend", level: "Expert", icon: Server },
    { name: "FIX Protocol", category: "Protocols", level: "Expert", icon: Globe },
    { name: "Spring Boot", category: "Backend", level: "Expert", icon: Server },
    { name: "TypeScript", category: "Frontend", level: "Advanced", icon: Layout },
    { name: "React / Next.js", category: "Frontend", level: "Advanced", icon: Layout },
    { name: "Node.js", category: "Backend", level: "Advanced", icon: Server },
    { name: "SQL", category: "Database", level: "Advanced", icon: Database },
    { name: "Microservices", category: "Architecture", level: "Advanced", icon: Cpu },
    { name: "AWS", category: "Cloud", level: "Intermediate", icon: Cloud },
    { name: "Docker/K8s", category: "Cloud", level: "Intermediate", icon: Cloud },
    { name: "High-Freq Trading", category: "Domain", level: "Expert", icon: Cpu },
    { name: "WebSocket", category: "Protocols", level: "Advanced", icon: Globe },
];

const CATEGORIES = ["All", "Backend", "Frontend", "Protocols", "Cloud"];

export default function TechStackGrid() {
    const [activeCategory, setActiveCategory] = useState("All");

    const filteredSkills = activeCategory === "All"
        ? SKILLS
        : SKILLS.filter(s => s.category === activeCategory || (activeCategory === "Backend" && s.category === "Database") || (activeCategory === "Protocols" && s.category === "Domain"));

    return (
        <div className="w-full">
            {/* Category Filters */}
            <div className="flex flex-wrap gap-2 mb-10 justify-center">
                {CATEGORIES.map(cat => (
                    <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={cn(
                            "px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 border",
                            activeCategory === cat
                                ? "bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.3)] scale-105"
                                : "bg-black/50 text-zinc-400 border-zinc-800 hover:border-zinc-500 hover:text-zinc-200 backdrop-blur-md"
                        )}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Grid */}
            <motion.div
                layout
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5"
            >
                <AnimatePresence mode="popLayout">
                    {filteredSkills.map((skill) => (
                        <motion.div
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.2 }}
                            key={skill.name}
                            className="group relative bg-zinc-900/40 border border-zinc-800/50 p-5 rounded-2xl hover:border-zinc-500/50 transition-all hover:shadow-[0_0_30px_rgba(0,0,0,0.5)] overflow-hidden backdrop-blur-sm"
                        >
                            {/* Hover Glow */}
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            <div className="relative z-10">
                                <div className="mb-4 p-3 bg-zinc-950/50 rounded-xl inline-block border border-zinc-800 group-hover:border-zinc-600 transition-colors">
                                    <skill.icon size={20} className="text-zinc-300 group-hover:text-white" />
                                </div>

                                <h4 className="font-bold text-zinc-100 text-lg mb-2 leading-tight">{skill.name}</h4>

                                <div className="flex justify-between items-end border-t border-zinc-800/50 pt-3 mt-2">
                                    <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider">{skill.category}</span>
                                    <div className="flex gap-1.5" title={`${skill.level} Level`}>
                                        {[1, 2, 3].map(i => {
                                            let active = false;
                                            let color = "bg-zinc-800";

                                            if (skill.level === "Expert") { active = i <= 3; color = "bg-purple-500 box-shadow-[0_0_8px_rgba(168,85,247,0.5)]"; }
                                            else if (skill.level === "Advanced") { active = i <= 3; color = i === 3 ? "bg-zinc-800" : "bg-blue-500"; }
                                            else if (skill.level === "Intermediate") { active = i <= 2; color = "bg-blue-400"; }

                                            return (
                                                <div key={i} className={cn(
                                                    "w-1.5 h-1.5 rounded-full transition-colors duration-300",
                                                    active ? (skill.level === "Expert" ? "bg-purple-400 shadow-[0_0_5px_rgba(192,132,252,0.8)]" : "bg-blue-400") : "bg-zinc-800"
                                                )} />
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>
        </div>
    );
}
