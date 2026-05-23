"use client";

import { motion } from "framer-motion";

const steps = [
    { num: "01", title: "Explore", desc: "Dive into the lab and pick a module.", bg: "bg-blue-600", text: "text-white" },
    { num: "02", title: "Visualize", desc: "See the data flow through the network.", bg: "bg-white", text: "text-slate-900" },
    { num: "03", title: "Modify", desc: "Break things to learn how they work.", bg: "bg-white", text: "text-slate-900" },
    { num: "04", title: "Master", desc: "Gain intuition that no textbook can give.", bg: "bg-slate-900", text: "text-white" },
];

export default function LearningPath() {
    return (
        <section className="py-16 sm:py-24 md:py-32 px-6 bg-slate-900 text-white overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 sm:mb-24 gap-8">
                    <h2 className="text-4xl sm:text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none">
                        The<br/><span className="text-blue-500">Process</span>
                    </h2>
                    <p className="max-w-xs text-lg font-bold uppercase tracking-tight text-slate-400 border-l-4 border-blue-500 pl-4">
                        From zero to intuition in four clear steps.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className={`${step.bg} ${step.text} border-2 border-slate-900 p-6 sm:p-10 rounded-3xl flex flex-col gap-8 h-full shadow-[6px_6px_0px_0px_rgba(59,130,246,0.5)]`}
                        >
                            <div className={`text-5xl font-black tracking-tighter opacity-10`}>
                                {step.num}
                            </div>
                            <div className="space-y-3">
                                <h3 className="text-2xl font-black uppercase tracking-tight">
                                    {step.title}
                                </h3>
                                <p className="text-base font-bold leading-relaxed opacity-80">
                                    {step.desc}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
