"use client";

import { useState, useEffect, useRef } from 'react';
import Antigravity from '@/components/ui/Antigravity';
import Dock from '@/components/ui/Dock';
import { Home, FlaskConical, ArrowRight, Zap } from 'lucide-react';
import { useRouter } from 'next/navigation';
import FeaturesSection from '@/components/landing/FeaturesSection';
import TargetAudienceSection from '@/components/landing/TargetAudienceSection';
import DemoSection from '@/components/landing/DemoSection';
import LearningPath from '@/components/landing/LearningPath';
import TrustSignals from '@/components/landing/TrustSignals';
import SecondCTA from '@/components/landing/SecondCTA';
import Footer from '@/components/landing/Footer';
import { motion } from 'framer-motion';
import { Link004, Link005 } from '@/components/ui/skiper-ui/skiper40';
import CursorImageEffect from '@/components/ui/CursorImageEffect';

export default function HomePage() {
  const router = useRouter();
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const trailImages = [
    "/images/trail/baymax-removebg-preview.png",
    "/images/trail/image-removebg-preview (1).png",
    "/images/trail/image-removebg-preview (2).png",
    "/images/trail/image-removebg-preview (3).png",
    "/images/trail/image-removebg-preview (4).png",
    "/images/trail/image-removebg-preview (5).png",
    "/images/trail/image-removebg-preview.png",
  ];

  const dockItems = [
    { icon: <Home size={24} />, label: 'Home', onClick: () => router.push('/dashboard') },
    { icon: <FlaskConical size={24} />, label: 'Lab', onClick: () => router.push('/lab') },
    {
      icon: <img src="/icons/ml-icon.png" alt="ML" style={{ width: 24, height: 24, objectFit: 'contain' }} />,
      label: 'ML',
      onClick: () => router.push('/playground')
    },
    {
      icon: <img src="/icons/eda-icon.png" alt="EDA" style={{ width: 24, height: 24, objectFit: 'contain' }} />,
      label: 'EDA',
      onClick: () => router.push('/eda')
    },
  ];

  return (
    <div className="relative min-h-screen w-full bg-slate-50 text-slate-900 selection:bg-slate-900 selection:text-white overflow-x-hidden">

      {/* Subtle Grid Background */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '32px 32px' }}
      />

      {/* --- HERO SECTION --- */}
      <div ref={heroRef} className="relative w-full min-h-screen overflow-hidden flex flex-col justify-center items-center py-20">

        {/* Cursor Image Trail */}
        <CursorImageEffect
          triggerRef={heroRef}
          excludeRef={contentRef}
          images={trailImages}
          minDistance={120}
        />

        <div className="absolute inset-0 w-full h-full z-0 opacity-20">
          {/* Antigravity component removed */}
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border-2 border-slate-900 bg-white shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] mb-6 sm:mb-10"
          >
            <Zap size={14} className="text-blue-600 fill-blue-600" />
            <span className="text-[11px] font-black uppercase tracking-[0.2em]">The Visual ML Environment</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl sm:text-7xl md:text-9xl font-black tracking-tighter uppercase leading-[0.85] mb-12 relative"
          >
            ML<span className="text-blue-600 relative">
              CANVAS
              <motion.span
                animate={{
                  left: ["-100%", "200%"],
                  opacity: [0, 1, 0]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  repeatDelay: 1
                }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-20deg] pointer-events-none"
              />
            </span>
          </motion.h1>


          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl text-lg sm:text-xl md:text-2xl font-bold leading-tight mb-8 sm:mb-14 text-slate-700"
          >
            REDEFINING HOW YOU UNDERSTAND MACHINE LEARNING.
            A REFINED CANVAS FOR VISUALIZING THE INNER WORKINGS OF AI.
          </motion.p>

          <motion.div
            ref={contentRef}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap justify-center gap-4 sm:gap-8 mt-4"
          >
            <Link004
              href="/dashboard"
              className="text-lg sm:text-2xl font-black uppercase tracking-tighter py-3 px-5 sm:py-4 sm:px-6 border-black border-2 border-radius-50"
            >
              Start Exploring
            </Link004>
            <Link004
              href="/lab"
              className="text-lg sm:text-2xl font-black uppercase tracking-tighter py-3 px-5 sm:py-4 sm:px-6 border-black border-2 border-radius-50"
            >
              Enter Lab
            </Link004>
          </motion.div>
        </div>

        <div className="absolute bottom-6 sm:bottom-12 md:bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-12 rounded-full bg-gradient-to-b from-blue-600 to-transparent opacity-50"
          />
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Scroll to Dive</span>
        </div>
      </div>

      {/* --- CONTENT SECTIONS --- */}
      <div className="relative z-10">
        <FeaturesSection />
        <DemoSection />
        <TargetAudienceSection />
        <LearningPath />
        <TrustSignals />
        <SecondCTA />
        <Footer />
      </div>

      {/* --- DOCK (Fixed Bottom on Mobile) --- */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 h-auto md:hidden">
        <Dock
          items={dockItems}
          panelHeight={60}
          baseItemSize={44}
          magnification={60}
          position="bottom"
        />
      </div>

      {/* --- DOCK (Fixed Right on Desktop) --- */}
      <div className="fixed top-1/2 right-6 -translate-y-1/2 z-50 h-auto hidden md:block">
        <Dock
          items={dockItems}
          panelHeight={72}
          baseItemSize={54}
          magnification={80}
          position="right"
        />
      </div>
    </div>
  );
}
