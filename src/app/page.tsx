"use client";

import Antigravity from '@/components/ui/Antigravity';
import Dock from '@/components/ui/Dock';
import { Home, FlaskConical } from 'lucide-react';
import { useRouter } from 'next/navigation';
import FeaturesSection from '@/components/landing/FeaturesSection';
import TargetAudienceSection from '@/components/landing/TargetAudienceSection';
import DemoSection from '@/components/landing/DemoSection';
import LearningPath from '@/components/landing/LearningPath';
import TrustSignals from '@/components/landing/TrustSignals';
import SecondCTA from '@/components/landing/SecondCTA';
import Footer from '@/components/landing/Footer';

export default function HomePage() {
  const router = useRouter();

  const dockItems = [
    { icon: <Home size={18} color="white" />, label: 'Home', onClick: () => router.push('/dashboard') },
    { icon: <FlaskConical size={18} color="white" />, label: 'Lab', onClick: () => router.push('/lab') },
    {
      icon: <img src="/icons/ml-icon.png" alt="ML" style={{ width: 18, height: 18, objectFit: 'contain', filter: 'invert(1)' }} />,
      label: 'ML',
      onClick: () => router.push('/playground')
    },
    {
      icon: <img src="/icons/eda-icon.png" alt="EDA" style={{ width: 18, height: 18, objectFit: 'contain', filter: 'invert(1)' }} />,
      label: 'EDA',
      onClick: () => router.push('/eda')
    },
  ];

  return (
    <div className="relative min-h-screen w-full bg-white text-black selection:bg-black selection:text-white">

      {/* --- HERO SECTION --- */}
      <div className="relative w-full h-screen overflow-hidden bg-gray-50">
        <div className="absolute inset-0 w-full h-full">
          <Antigravity
            count={350}
            magnetRadius={10}
            ringRadius={8}
            waveSpeed={0.5}
            waveAmplitude={1.2}
            particleSize={1.5}
            lerpSpeed={0.08}
            color="#0062ff"
            autoAnimate
            particleVariance={1.5}
            rotationSpeed={0.1}
            depthFactor={1}
            pulseSpeed={2}
            particleShape="capsule"
            fieldStrength={10}
          />
        </div>

        <div className="absolute top-0 left-0 w-full h-full z-10 pointer-events-none flex items-center pl-8 md:pl-24 lg:pl-40 pb-20">
          <div className="flex items-start gap-4 md:gap-8 lg:gap-12 pointer-events-auto scale-75 md:scale-90 lg:scale-100 origin-left">
            <h1
              className="hidden md:block text-5xl md:text-7xl lg:text-8xl font-thin tracking-widest text-black/80"
              style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
            >
              MLCanvas
            </h1>
            <div className="flex flex-col gap-4 md:gap-6 pt-4 md:pt-8">
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-light tracking-wider text-black">
                THE BEGINNER&apos;S <br />
                <span className="text-sm md:text-xl lg:text-2xl font-normal tracking-[0.25em] block mt-1 md:mt-2 text-black/70">GUIDE TO ML LEARNING</span>
              </h2>
              <div className="w-10 md:w-16 h-0.5 bg-black/80 my-1 md:my-2"></div>
              <p className="max-w-xs md:max-w-md text-xs md:text-sm text-gray-600 leading-loose tracking-wide font-medium">
                Redefining the boundaries of understanding machine learning.
                <br />
                A minimal, powerful canvas for learning, testing,
                <br />
                and understanding the hidden inner workings of AI.
              </p>
              <button
                onClick={() => router.push('/dashboard')}
                className="px-6 py-2 md:px-8 md:py-3 bg-black text-white w-fit mt-2 md:mt-4 text-[10px] md:text-xs tracking-[0.2em] hover:bg-black/80 transition-colors uppercase"
              >
                explore Canvas &gt;
              </button>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce opacity-40 hidden md:block">
          <div className="w-px h-12 bg-black"></div>
        </div>
      </div>

      {/* --- CONTENT SECTIONS --- */}
      <FeaturesSection />

      <DemoSection />

      <TargetAudienceSection />

      <LearningPath />

      <TrustSignals />

      <SecondCTA />

      <Footer />

      {/* --- DOCK (Fixed Right) --- */}
      <div className="fixed top-1/2 right-4 -translate-y-1/2 z-50 h-auto">
        <Dock
          items={dockItems}
          panelHeight={68}
          baseItemSize={50}
          magnification={70}
          position="right"
        />
      </div>
    </div>
  );
}
