"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, Calendar, MapPin, ChevronDown, CheckCircle2 } from "lucide-react";

const EXPERIENCE = [
    {
        role: "Software Engineer 3",
        company: "FactSet Research Systems",
        location: "NYC, NY",
        period: "Nov 2024 – Present",
        desc: "Spearheading high-scale RESTful web services and FIX Protocol integrations.",
        details: [
            "Architected systems supporting billions of daily transactions.",
            "Optimized FIX engine performance using Java concurrency frameworks.",
            "Designed fault-tolerant session management (99.9% uptime).",
            "Migrated legacy Swing apps to modern web platforms (40% perf boost)."
        ]
    },
    {
        role: "Software Engineer 2",
        company: "FactSet Systems India",
        location: "Hyderabad, India",
        period: "Jun 2020 – Jul 2022",
        desc: "Designed automated testing for FIX connectivity and optimized trading executions.",
        details: [
            "Handling millions of concurrent requests for financial trading platforms.",
            "Implemented TWAP/VWAP execution strategies in OMS/EMS.",
            "Reduced latency by microsecond levels via thread synchronization."
        ]
    },
    {
        role: "Software Engineer Intern",
        company: "FactSet Systems India",
        location: "Hyderabad, India",
        period: "Dec 2019 – Jun 2020",
        desc: "Developed automation tools for code quality and release processes.",
        details: [
            "Built release automation tools using Java Spring Boot.",
            "Created RESTful services for internal tooling.",
            "Contributed to enterprise-wide coding standard initiatives."
        ]
    }
];

export default function ExperienceTimeline() {
    const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

    return (
        <div className="relative space-y-8">
            {/* Connecting Line */}
            <div className="absolute left-[19px] top-6 bottom-6 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-transparent opacity-30" />

            {EXPERIENCE.map((exp, idx) => (
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.2 }}
                    key={idx}
                    className={`relative pl-12 group cursor-pointer transition-all duration-300 ${expandedIndex === idx ? "scale-[1.02]" : "hover:opacity-80"}`}
                    onClick={() => setExpandedIndex(expandedIndex === idx ? null : idx)}
                >
                    {/* Timeline Dot */}
                    <div className={`absolute left-0 top-1 w-10 h-10 rounded-full border-4 flex items-center justify-center transition-all duration-500 z-10 bg-zinc-950 ${expandedIndex === idx
                            ? "border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.6)]"
                            : "border-zinc-800 group-hover:border-zinc-600"
                        }`}>
                        <Briefcase size={14} className={expandedIndex === idx ? "text-blue-400" : "text-zinc-500"} />
                    </div>

                    <div className="bg-zinc-900/40 border border-zinc-800/50 rounded-2xl p-6 backdrop-blur-sm hover:border-zinc-700/50 transition-colors">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4 gap-2">
                            <div>
                                <h3 className={`text-xl font-bold transition-colors ${expandedIndex === idx ? "text-blue-400" : "text-white"}`}>
                                    {exp.role}
                                </h3>
                                <div className="text-zinc-400 font-medium flex items-center gap-2 mt-1">
                                    {exp.company}
                                </div>
                            </div>
                            <div className="flex flex-col items-end text-xs font-mono text-zinc-500 gap-1">
                                <span className="flex items-center gap-1.5 bg-zinc-900/80 px-2 py-1 rounded border border-zinc-800">
                                    <Calendar size={10} /> {exp.period}
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <MapPin size={10} /> {exp.location}
                                </span>
                            </div>
                        </div>

                        <p className="text-zinc-300 mb-4 leading-relaxed font-light">
                            {exp.desc}
                        </p>

                        <AnimatePresence>
                            {expandedIndex === idx && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="overflow-hidden"
                                >
                                    <div className="pt-4 border-t border-zinc-800/50 space-y-3">
                                        {exp.details.map((point, i) => (
                                            <motion.div
                                                initial={{ x: -10, opacity: 0 }}
                                                animate={{ x: 0, opacity: 1 }}
                                                transition={{ delay: i * 0.1 }}
                                                key={i}
                                                className="text-zinc-400 text-sm flex gap-3 group/item"
                                            >
                                                <CheckCircle2 size={16} className="text-green-500/50 mt-0.5 shrink-0 group-hover/item:text-green-400 transition-colors" />
                                                <span className="group-hover/item:text-zinc-300 transition-colors">{point}</span>
                                            </motion.div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div className="flex justify-center mt-2 group-hover:translate-y-1 transition-transform">
                            <ChevronDown size={16} className={`text-zinc-600 transition-transform duration-300 ${expandedIndex === idx ? "rotate-180 opacity-0" : "opacity-100"}`} />
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
    );
}
