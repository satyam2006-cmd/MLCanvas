"use client";

import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";

export default function SecondCTA() {
    const router = useRouter();

    return (
        <section className="py-32 bg-white text-center">
            <div className="max-w-2xl mx-auto px-6 space-y-8">
                <h2 className="text-4xl md:text-5xl font-light text-black tracking-tight">
                    Ready to explore?
                </h2>

                <div className="flex flex-col md:flex-row items-center justify-center gap-6 pt-4">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => router.push("/lab")}
                        className="group flex items-center gap-2 text-lg font-medium text-black border-b border-black pb-1 hover:text-black/70 hover:border-black/70 transition-colors"
                    >
                        Start Learning
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </motion.button>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => router.push("/dashboard")}
                        className="px-8 py-3 bg-black text-white rounded-full text-sm font-medium hover:bg-black/90 transition-colors shadow-lg hover:shadow-xl"
                    >
                        Open Dashboard
                    </motion.button>
                </div>
            </div>
        </section>
    );
}
