"use client";

import { Brain, FlaskConical, BarChart3, Search } from "lucide-react";
import { motion } from "motion/react";

const features = [
    {
        icon: <Brain size={24} />,
        title: "Visualize ML Concepts",
        description: "See how algorithms think with interactive canvases.",
    },
    {
        icon: <FlaskConical size={24} />,
        title: "Experiment Without Fear",
        description: "Tweak parameters and instantly see results.",
    },
    {
        icon: <BarChart3 size={24} />,
        title: "Learn by Doing",
        description: "No heavy theory—pure intuition building.",
    },
    {
        icon: <Search size={24} />,
        title: "Open the Black Box",
        description: "Understand why models behave the way they do.",
    },
];

export default function FeaturesSection() {
    return (
        <section className="py-24 px-6 md:px-12 lg:px-24 bg-white">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="group flex flex-col items-start gap-4"
                        >
                            <div className="p-3 rounded-xl bg-gray-50 text-black/60 group-hover:text-black group-hover:bg-gray-100 transition-colors duration-300">
                                {feature.icon}
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-lg font-medium text-black tracking-wide">
                                    {feature.title}
                                </h3>
                                <p className="text-sm text-gray-500 leading-relaxed font-light">
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
