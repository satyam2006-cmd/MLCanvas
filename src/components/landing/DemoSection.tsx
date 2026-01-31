"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";

export default function DemoSection() {
    const [points, setPoints] = useState<Array<{ x: number, y: number, class: number }>>([]);

    useEffect(() => {
        setPoints(Array.from({ length: 20 }).map((_, i) => ({
            x: Math.random() * 100,
            y: Math.random() * 100,
            class: Math.random() > 0.5 ? 0 : 1,
        })));
    }, []);

    return (
        <section className="py-32 px-6 md:px-12 lg:px-24 bg-white overflow-hidden">
            <div className="max-w-6xl mx-auto flex flex-col items-center gap-12">
                <div className="text-center space-y-4">
                    <h2 className="text-3xl md:text-4xl font-light text-black tracking-tight">
                        See the invisible.
                    </h2>
                    <p className="text-gray-500 max-w-xl mx-auto font-light">
                        Interactive visualizations that make complex math feel intuitive.
                    </p>
                </div>

                {/* Abstract Browser Window / Canvas Mockup */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 40 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="relative w-full max-w-4xl aspect-[16/9] md:aspect-[21/9] bg-gray-50 rounded-2xl border border-gray-100 shadow-2xl overflow-hidden group"
                >
                    {/* Fake Grid Background */}
                    <div className="absolute inset-0 grid grid-cols-[repeat(20,1fr)] grid-rows-[repeat(10,1fr)] opacity-[0.03]">
                        {Array.from({ length: 200 }).map((_, i) => (
                            <div key={i} className="border-r border-b border-black" />
                        ))}
                    </div>

                    {/* Animated Decision Boundary */}
                    <motion.div
                        className="absolute inset-0 bg-blue-500/5 blur-3xl"
                        animate={{
                            clipPath: [
                                "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                                "polygon(0% 0%, 100% 0%, 80% 100%, 0% 100%)",
                                "polygon(0% 0%, 100% 0%, 60% 100%, 0% 80%)",
                                "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                            ],
                        }}
                        transition={{
                            duration: 10,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    />

                    {/* Floating Points */}
                    {points.map((p, i) => (
                        <motion.div
                            key={i}
                            className={`absolute w-3 h-3 rounded-full ${p.class === 0 ? "bg-black" : "bg-blue-500"
                                }`}
                            style={{
                                left: `${p.x}%`,
                                top: `${p.y}%`,
                            }}
                            animate={{
                                y: [0, Math.random() * 10 - 5, 0],
                                x: [0, Math.random() * 10 - 5, 0],
                                scale: [1, 1.2, 1],
                                opacity: [0.3, 0.8, 0.3],
                            }}
                            transition={{
                                duration: 3 + Math.random() * 4,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        />
                    ))}

                    {/* Floating UI Elements (Fake Controls) */}
                    <div className="absolute top-6 right-6 flex flex-col gap-3">
                        {[1, 2, 3].map((_, i) => (
                            <motion.div
                                key={i}
                                className="w-32 h-2 bg-black/5 rounded-full"
                                animate={{ width: ["40%", "80%", "60%"] }}
                                transition={{
                                    duration: 4,
                                    delay: i,
                                    repeat: Infinity,
                                    repeatType: "reverse",
                                }}
                            />
                        ))}
                    </div>

                    <div className="absolute bottom-6 left-6 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-gray-100 shadow-sm">
                        <span className="text-xs font-mono text-gray-500">
                            Accuracy: <span className="text-black ml-1">98.4%</span>
                        </span>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
