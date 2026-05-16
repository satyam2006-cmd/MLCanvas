"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full bg-slate-50 flex flex-col items-center justify-center p-6 text-slate-900 font-sans selection:bg-slate-900 selection:text-white">
      <div className="max-w-md w-full text-center space-y-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative inline-block"
        >
          <h1 className="text-[12rem] font-black leading-none tracking-tighter text-slate-900 drop-shadow-[8px_8px_0px_rgba(37,99,235,1)]">
            404
          </h1>
          <div className="absolute -top-4 -right-4 w-12 h-12 bg-blue-600 rotate-12 border-4 border-slate-900 flex items-center justify-center">
            <span className="text-white font-black text-xl">?</span>
          </div>
        </motion.div>

        <div className="space-y-4">
          <h2 className="text-3xl font-black uppercase tracking-tighter">
            You've drifted off the canvas.
          </h2>
          <p className="text-slate-600 font-bold leading-tight">
            THE PAGE YOU'RE LOOKING FOR DOESN'T EXIST OR HAS BEEN MOVED TO A NEW DIMENSION.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
          <Link
            href="/"
            className="w-full sm:w-auto px-8 py-4 bg-slate-900 text-white font-black uppercase tracking-tighter rounded-xl shadow-[6px_6px_0px_0px_rgba(37,99,235,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] active:translate-x-0 active:translate-y-0 transition-all flex items-center justify-center gap-2"
          >
            <Home size={18} />
            Back to Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="w-full sm:w-auto px-8 py-4 bg-white border-4 border-slate-900 text-slate-900 font-black uppercase tracking-tighter rounded-xl shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] active:translate-x-0 active:translate-y-0 transition-all flex items-center justify-center gap-2"
          >
            <ArrowLeft size={18} />
            Go Back
          </button>
        </div>

        <div className="pt-12">
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">
            MLCanvas Terminal • Error System • v5.0
          </p>
        </div>
      </div>
    </div>
  );
}
