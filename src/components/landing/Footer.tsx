"use client";

import { motion } from "framer-motion";

export default function Footer() {
    return (
        <footer className="py-20 px-6 bg-white border-t-2 border-slate-900/10 text-slate-900">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
                <div className="flex flex-col items-center md:items-start gap-4">
                    <h4 className="text-3xl font-black uppercase tracking-tighter">
                        ML<span className="text-blue-600">CANVAS</span>
                    </h4>
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
                        © 2026 MLCANVAS. Refined by Design.
                    </p>
                </div>

                <div className="flex flex-wrap justify-center gap-8 text-sm font-black uppercase tracking-widest">
                    <a
                        href="https://github.com/satyam2006-cmd/MLCanvas"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-blue-600 transition-colors underline decoration-2 underline-offset-4"
                    >
                        Github
                    </a>
                </div>

                <div className="bg-slate-50 border-2 border-slate-900 px-4 py-2 rounded-xl shadow-[3px_3px_0px_0px_rgba(15,23,42,1)]">
                    <span className="text-[10px] font-black uppercase tracking-widest">Made with Intuition</span>
                </div>
            </div>
        </footer>
    );
}
