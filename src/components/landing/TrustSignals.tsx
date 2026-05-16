"use client";

import { motion } from "framer-motion";

export default function TrustSignals() {
    return (
        <section className="py-20 bg-white border-y-2 border-slate-900/10 overflow-hidden whitespace-nowrap">
            <motion.div
                animate={{ x: ["0%", "-50%"] }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="flex gap-24 items-center"
            >
                {Array.from({ length: 12 }).map((_, i) => (
                    <div key={i} className="flex gap-24 items-center">
                        <span className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-slate-200">10k+ users</span>
                        <div className="w-4 h-4 bg-blue-600 rounded-full" />
                        <span className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-slate-900">Open Source</span>
                        <div className="w-4 h-4 bg-slate-900 rotate-45" />
                        <span className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-blue-600">Built for AI</span>
                        <div className="w-4 h-4 bg-slate-200" />
                    </div>
                ))}
            </motion.div>
        </section>
    );
}
