"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Github, Linkedin, Mail, ExternalLink, Code2, LineChart, Cpu } from "lucide-react";
import ExperienceTimeline from "./components/ExperienceTimeline";
import TechStackGrid from "./components/TechStackGrid";
import { AuroraBackground } from "./components/AuroraBackground";

const PORTFOLIO_APPS = [
  {
    title: "FIX Protocol Decoder",
    description: "Instant parsing for Financial Information eXchange messages (4.2/4.4/5.0). Features raw message decoding and tag lookups.",
    url: "https://portfolio-apps-rust.vercel.app/fix-parser",
    tags: ["Next.js", "TypeScript", "Fintech"],
    color: "from-blue-500 to-cyan-400",
    icon: Code2
  },
  {
    title: "High-Freq Crypto Dash",
    description: "Institutional-grade real-time market dashboard connecting to live WebSocket feeds for microsecond-level updates.",
    url: "https://portfolio-apps-rust.vercel.app/crypto-dash",
    tags: ["Zustand", "WebSockets", "React"],
    color: "from-purple-500 to-pink-500",
    icon: LineChart
  },
  {
    title: "Git History Artist",
    description: "Viral tool to create pixel art on GitHub contribution graphs. Generates Bash scripts to backdate commits.",
    url: "https://portfolio-apps-rust.vercel.app/git-art",
    tags: ["Tooling", "Git Internals", "Creative"],
    color: "from-green-500 to-emerald-400",
    icon: Cpu
  }
];

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-white/20 overflow-x-hidden">
      <AuroraBackground />

      {/* Navigation (Simple) */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-8 py-6 flex justify-between items-center backdrop-blur-md bg-zinc-950/50 border-b border-white/5">
        <div className="font-bold text-xl tracking-tighter">YASER<span className="text-zinc-500">.DEV</span></div>
        <div className="flex gap-3">
          <a href="https://github.com/yaserali1608" target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-zinc-900/50 border border-zinc-700 backdrop-blur-md text-white text-sm font-medium rounded-full hover:bg-zinc-800 transition-colors flex items-center gap-2">
            <Github size={16} />
            GitHub
          </a>
          <a href="https://www.linkedin.com/in/yaser-ali-tariq-mohammed-350865145/" target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-zinc-900/50 border border-zinc-700 backdrop-blur-md text-white text-sm font-medium rounded-full hover:bg-zinc-800 transition-colors flex items-center gap-2">
            <Linkedin size={16} />
            LinkedIn
          </a>
          <a href="mailto:mohd.tariq00778@gmail.com" className="px-4 py-2 bg-white text-black text-sm font-bold rounded-full hover:bg-zinc-200 transition-colors">
            Contact Me
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="max-w-6xl mx-auto px-8 pt-40 pb-32 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-8 text-xs font-mono font-medium tracking-wider text-green-400 border border-green-500/20 rounded-full bg-green-500/5 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            AVAILABLE FOR HIRE
          </div>

          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-8 max-w-5xl">
            Building the future of <br />
            <span className="bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500 bg-clip-text text-transparent">Software Engineering</span>.
          </h1>

          <p className="text-xl text-zinc-400 max-w-2xl leading-relaxed mb-10">
            Passionate Software Engineer specialized in high-performance web applications and institutional trading systems.
            Bridging the gap between complex backend protocols and premium user experiences.
          </p>

          <div className="flex gap-6">
            <a href="#work" className="px-8 py-3 bg-zinc-100 text-zinc-950 font-bold rounded-full hover:scale-105 transition-transform">
              View Work
            </a>
            <a href="#experience" className="px-8 py-3 bg-zinc-900/50 border border-zinc-700 backdrop-blur-md text-white font-medium rounded-full hover:bg-zinc-800 transition-colors">
              Professional Experience
            </a>
          </div>
        </motion.div>
      </header>

      {/* Stats / Quick Info */}
      <section className="border-y border-white/5 bg-zinc-900/20 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-8 py-10 grid grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { label: "Years Experience", value: "4+" },
            { label: "Tech Stack", value: "Full Stack" },
            { label: "Specialty", value: "Fintech" },
            { label: "Location", value: "Jersey City, NJ" },
          ].map((stat, i) => (
            <div key={i}>
              <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-zinc-500 text-sm font-mono uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Portfolio Showcase */}
      <section id="work" className="max-w-6xl mx-auto px-8 py-32">
        <div className="flex justify-between items-end mb-16">
          <div>
            <h2 className="text-sm font-mono text-blue-400 mb-2 uppercase tracking-widest">Selected Works</h2>
            <h3 className="text-4xl font-bold">Featured Projects</h3>
          </div>
          <div className="hidden md:block text-zinc-500 text-sm">
            Explore my latest applications <br /> running live in this environment.
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PORTFOLIO_APPS.map((app, idx) => (
            <motion.a
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              key={app.title}
              href={app.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block h-full"
            >
              <div
                className={`absolute -inset-0.5 bg-gradient-to-br ${app.color} opacity-0 group-hover:opacity-100 blur transition duration-500 rounded-3xl`}
              />
              <div className="relative h-full bg-zinc-950 border border-zinc-800 rounded-2xl p-8 hover:bg-zinc-900 transition-colors duration-300 flex flex-col overflow-hidden">
                <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ArrowUpRight className="text-zinc-400 group-hover:text-white" />
                </div>

                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${app.color} mb-8 flex items-center justify-center shadow-lg`}>
                  <app.icon className="text-white/80" />
                </div>

                <h3 className="text-2xl font-bold mb-3 text-white">
                  {app.title}
                </h3>

                <p className="text-zinc-400 text-sm leading-relaxed mb-8 flex-grow">
                  {app.description}
                </p>

                <div className="flex flex-wrap gap-2 pt-6 border-t border-zinc-800/50">
                  {app.tags.map(tag => (
                    <span key={tag} className="px-2.5 py-1 bg-white/5 border border-white/10 rounded-md text-[10px] uppercase font-mono tracking-wide text-zinc-300 group-hover:border-white/20 transition-colors">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </section>

      {/* Skills & Experience */}
      <section id="experience" className="bg-zinc-900/30 border-t border-white/5 relative">
        <div className="max-w-6xl mx-auto px-8 py-32 grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div>
            <h2 className="text-sm font-mono text-purple-400 mb-2 uppercase tracking-widest">Tech Stack</h2>
            <h3 className="text-3xl font-bold mb-10">Technical Expertise</h3>
            <TechStackGrid />
          </div>
          <div>
            <h2 className="text-sm font-mono text-blue-400 mb-2 uppercase tracking-widest">Career</h2>
            <h3 className="text-3xl font-bold mb-10">Professional Journey</h3>
            <ExperienceTimeline />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="max-w-6xl mx-auto px-8 py-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-zinc-600 text-sm gap-4">
        <p>© 2025 Yaser Ali Tariq Mohammed. All rights reserved.</p>
        <div className="flex gap-8">
          <a href="https://github.com/yaserali1608" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white transition-colors"><Github size={16} /> GitHub</a>
          <a href="https://www.linkedin.com/in/yaser-ali-tariq-mohammed-350865145/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white transition-colors"><Linkedin size={16} /> LinkedIn</a>
          <a href="mailto:mohd.tariq00778@gmail.com" className="flex items-center gap-2 hover:text-white transition-colors"><Mail size={16} /> Email</a>
        </div>
      </footer>
    </div>
  );
}
