"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";

export default function SecondCTA() {
    const router = useRouter();

    return (
        <section className="py-20 sm:py-32 md:py-40 px-6 bg-white flex flex-col items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none" 
                 style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '40px 40px' }} 
            />

            <div className="relative z-10 max-w-4xl text-center space-y-10">
                <motion.h2 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="text-4xl sm:text-6xl md:text-9xl font-black uppercase tracking-tighter leading-[0.85]"
                >
                    Stop reading<br/><span className="text-blue-600 underline decoration-4 sm:decoration-8 underline-offset-[6px] sm:underline-offset-[12px]">Start Seeing</span>
                </motion.h2>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-10">
                    <button
                        onClick={() => router.push('/dashboard')}
                        className="group w-full sm:w-auto px-6 py-4 sm:px-10 sm:py-6 bg-slate-900 text-white text-lg sm:text-xl font-black uppercase tracking-tighter rounded-xl sm:rounded-2xl shadow-[6px_6px_0px_0px_rgba(37,99,235,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all flex items-center justify-center gap-4"
                    >
                        Get Access Now
                        <ArrowRight size={24} />
                    </button>
                    
                    <button
                        onClick={() => router.push('/lab')}
                        className="w-full sm:w-auto px-6 py-4 sm:px-10 sm:py-6 bg-white border-2 border-slate-900 text-lg sm:text-xl font-black uppercase tracking-tighter rounded-xl sm:rounded-2xl shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all"
                    >
                        Browse Lab
                    </button>
                </div>
            </div>
        </section>
    );
}
