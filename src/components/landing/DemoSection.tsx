"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function DemoSection() {
    const [points, setPoints] = useState<Array<{ x: number, y: number, class: number }>>([]);

    useEffect(() => {
        setPoints(Array.from({ length: 24 }).map((_, i) => ({
            x: 10 + Math.random() * 80,
            y: 10 + Math.random() * 80,
            class: Math.random() > 0.5 ? 0 : 1,
        })));
    }, []);

    return (
        <section className="py-32 px-6 bg-slate-50 border-b-2 border-slate-900/10 overflow-hidden">
            <div className="max-w-6xl mx-auto flex flex-col items-center gap-16">
                <div className="text-center space-y-4">
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-7xl font-black uppercase tracking-tighter"
                    >
                        See the <span className="text-blue-600">Mechanics</span>
                    </motion.h2>
                    <p className="text-slate-500 font-bold uppercase tracking-widest text-sm">Interactive decision boundary visualization</p>
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    className="relative w-full max-w-5xl aspect-video bg-white border-2 border-slate-900 rounded-3xl shadow-[12px_12px_0px_0px_rgba(15,23,42,1)] overflow-hidden"
                >
                    <div className="absolute top-0 left-0 w-full h-10 bg-slate-900 flex items-center px-4 gap-2">
                        <div className="flex gap-1.5">
                            <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                            <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                        </div>
                        <div className="flex-1" />
                        <div className="text-white text-[10px] font-black tracking-widest uppercase opacity-40">mlcanvas_session_01</div>
                    </div>

                    <div className="absolute inset-0 top-10 opacity-[0.03] pointer-events-none" 
                         style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, black 1px, transparent 0)', backgroundSize: '20px 20px' }} 
                    />

                    <div className="absolute inset-0 top-10">
                        {points.map((p, i) => (
                            <motion.div
                                key={i}
                                className={`absolute w-6 h-6 border-2 border-slate-900 rounded-lg shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] ${p.class === 0 ? "bg-blue-500" : "bg-purple-500"}`}
                                style={{ left: `${p.x}%`, top: `${p.y}%` }}
                                animate={{
                                    scale: [1, 1.1, 1],
                                    rotate: p.class === 0 ? [0, 90, 0] : [0, -90, 0],
                                }}
                                transition={{
                                    duration: 3 + Math.random() * 2,
                                    repeat: Infinity,
                                }}
                            />
                        ))}
                        
                        {/* Simulated boundary line */}
                        <motion.div 
                            className="absolute inset-0 top-10 bg-blue-500/5"
                            style={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 60%)' }}
                            animate={{ opacity: [0.05, 0.1, 0.05] }}
                            transition={{ duration: 4, repeat: Infinity }}
                        />
                    </div>

                    <div className="absolute bottom-6 right-6 bg-white border-2 border-slate-900 p-3 rounded-xl shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]">
                        <span className="text-xs font-black uppercase tracking-tight">Confidence: 96.2%</span>
                    </div>

                    <div className="absolute top-16 left-6 flex flex-col gap-3">
                        {[0.8, 0.6, 0.9].map((val, i) => (
                            <div key={i} className="w-40 h-1.5 bg-slate-100 rounded-full overflow-hidden border border-slate-900/10">
                                <motion.div 
                                    className="h-full bg-blue-600 rounded-full"
                                    animate={{ width: [`${val * 20}%`, `${val * 100}%`, `${val * 50}%`] }}
                                    transition={{ duration: 4, delay: i * 0.5, repeat: Infinity }}
                                />
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
