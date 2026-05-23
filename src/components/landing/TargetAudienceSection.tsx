"use client";

import { motion } from "framer-motion";

const audiences = [
    { label: "AI Engineers", color: "bg-blue-50" },
    { label: "Data Scientists", color: "bg-purple-50" },
    { label: "ML Beginners", color: "bg-amber-50" },
    { label: "Academics", color: "bg-emerald-50" },
    { label: "Tech Enthusiasts", color: "bg-rose-50" },
];

export default function TargetAudienceSection() {
    return (
        <section className="py-12 sm:py-20 md:py-24 px-6 bg-white overflow-hidden border-b-2 border-slate-900/10">
            <div className="max-w-7xl mx-auto flex flex-col items-center gap-12">
                <h3 className="text-sm font-black uppercase tracking-[0.3em] text-slate-400">
                    Who is this for?
                </h3>

                <div className="flex flex-wrap justify-center gap-4">
                    {audiences.map((audience, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -4, boxShadow: "8px 8px 0px 0px rgba(15,23,42,1)" }}
                            className={`${audience.color} border-2 border-slate-900 px-4 py-2 sm:px-8 sm:py-4 rounded-xl sm:rounded-2xl shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] text-sm sm:text-lg font-black uppercase tracking-tight cursor-default transition-all`}
                        >
                            {audience.label}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
