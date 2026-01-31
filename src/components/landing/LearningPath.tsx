"use client";

import { motion } from "motion/react";

const steps = [
    {
        step: "01",
        title: "Instant EDA",
        description: "Upload your dataset and instantly visualize tailored exploratory data analysis insights.",
    },
    {
        step: "02",
        title: "Feature Selection",
        description: "Intuitively select features and drop columns to curate the perfect training set.",
    },
    {
        step: "03",
        title: "Target Definition",
        description: "Simply click to define your target variable and configure the learning task.",
    },
    {
        step: "04",
        title: "Code Generation",
        description: "Export clean, production-ready code and processed datasets for immediate use.",
    },
];

export default function LearningPath() {
    return (
        <section className="py-24 px-6 md:px-12 bg-white">
            <div className="max-w-7xl mx-auto">
                <div className="mb-16 md:mb-24">
                    <h2 className="text-3xl md:text-5xl font-thin tracking-tight text-black mb-4">
                        How It Works
                    </h2>
                    <div className="h-0.5 w-24 bg-black/10" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16 relative">
                    {/* Connector Line (Desktop) */}
                    <div className="hidden lg:block absolute top-6 left-0 w-full h-px bg-gradient-to-r from-gray-200 via-gray-200 to-transparent z-0" />

                    {steps.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.15 }}
                            viewport={{ once: true }}
                            className="relative z-10 group"
                        >
                            <div className="flex items-center gap-4 mb-4">
                                <span className="text-5xl font-thin text-black/10 group-hover:text-black/20 transition-colors duration-300 font-serif">
                                    {item.step}
                                </span>
                                <div className="lg:hidden h-px bg-gray-200 flex-1" />
                            </div>
                            <h3 className="text-xl font-medium text-black mb-2">
                                {item.title}
                            </h3>
                            <p className="text-sm text-gray-500 leading-relaxed max-w-xs">
                                {item.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
