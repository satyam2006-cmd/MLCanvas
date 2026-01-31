"use client";

import { motion } from "motion/react";

const audience = [
    "Beginners in Machine Learning",
    "CS & Data Science Students",
    "Curious Engineers",
    "AI Enthusiasts",
];

export default function TargetAudienceSection() {
    return (
        <section className="py-16 border-y border-gray-100 bg-gray-50/50">
            <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
                <span className="text-sm font-semibold uppercase tracking-widest text-black/40 whitespace-nowrap">
                    Perfect for:
                </span>
                <div className="flex flex-wrap justify-center gap-8 md:gap-12">
                    {audience.map((item, index) => (
                        <motion.span
                            key={index}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="text-base md:text-lg font-light text-black/80 hover:text-black transition-colors cursor-default"
                        >
                            {item}
                        </motion.span>
                    ))}
                </div>
            </div>
        </section>
    );
}
