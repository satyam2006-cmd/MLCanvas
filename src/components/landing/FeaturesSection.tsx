"use client";

import { Brain, FlaskConical, BarChart3, Search } from "lucide-react";
import { motion } from "framer-motion";

const features = [
    {
        icon: <Brain size={32} />,
        title: "Visualize ML",
        description: "See algorithms think with interactive canvases.",
        color: "blue"
    },
    {
        icon: <FlaskConical size={32} />,
        title: "Experiment",
        description: "Tweak parameters and instantly see results.",
        color: "purple"
    },
    {
        icon: <BarChart3 size={32} />,
        title: "Learn by Doing",
        description: "No heavy theory—pure intuition building.",
        color: "amber"
    },
    {
        icon: <Search size={32} />,
        title: "Black Box",
        description: "Understand why models behave the way they do.",
        color: "emerald"
    },
];

export default function FeaturesSection() {
    return (
        <section className="py-16 sm:py-24 md:py-32 px-6 md:px-12 bg-white border-y-2 border-slate-900/10">
            <div className="max-w-7xl mx-auto">
                <div className="mb-20 text-center md:text-left">
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tighter"
                    >
                        The <span className="text-blue-600 underline decoration-4 underline-offset-8">Capabilities</span>
                    </motion.h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -5 }}
                            className="bg-white border-2 border-slate-900 p-8 rounded-2xl shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] hover:shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] transition-all group"
                        >
                            <div className="mb-6 inline-flex p-3 rounded-xl bg-slate-50 border-2 border-slate-900 shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] group-hover:bg-blue-50 transition-colors">
                                {feature.icon}
                            </div>
                            <div className="space-y-3">
                                <h3 className="text-xl font-black uppercase tracking-tight">
                                    {feature.title}
                                </h3>
                                <p className="text-slate-600 font-bold leading-tight">
                                    {feature.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
