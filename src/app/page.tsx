"use client";

import Hyperspeed from '@/components/ui/Hyperspeed';
import Dock from '@/components/ui/Dock';
import { Home, FlaskConical } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  const dockItems = [
    { icon: <Home size={18} color="white" />, label: 'Home', onClick: () => router.push('/dashboard') },
    { icon: <FlaskConical size={18} color="white" />, label: 'Lab', onClick: () => router.push('/learning-lab') },
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
    <div className="relative w-full h-screen bg-white overflow-hidden">
      <Hyperspeed
        effectOptions={{
          onSpeedUp: () => { },
          onSlowDown: () => { },
          distortion: 'turbulentDistortion',
          length: 400,
          roadWidth: 10,
          islandWidth: 2,
          lanesPerRoad: 4,
          fov: 90,
          fovSpeedUp: 150,
          speedUp: 2,
          carLightsFade: 0.4,
          totalSideLightSticks: 20,
          lightPairsPerRoadWay: 40,
          shoulderLinesWidthPercentage: 0.05,
          brokenLinesWidthPercentage: 0.1,
          brokenLinesLengthPercentage: 0.5,
          lightStickWidth: [0.12, 0.5],
          lightStickHeight: [1.3, 1.7],
          movingAwaySpeed: [60, 80],
          movingCloserSpeed: [-120, -160],
          carLightsLength: [400 * 0.03, 400 * 0.2],
          carLightsRadius: [0.05, 0.14],
          carWidthPercentage: [0.3, 0.5],
          carShiftX: [-0.8, 0.8],
          carFloorSeparation: [0, 5],
          colors: {
            roadColor: 0xeeeeee,
            islandColor: 0xdddddd,
            background: 0xffffff,
            shoulderLines: 0x000000,
            brokenLines: 0x000000,
            leftCars: [0xD856BF, 0x6750A2, 0xC247AC],
            rightCars: [0x03B3C3, 0x0E5EA5, 0x324555],
            sticks: 0x03B3C3,
          }
        }}
      />

      <div className="absolute top-0 left-0 w-full h-full z-10 pointer-events-none flex items-center pl-12 md:pl-24 lg:pl-40 pb-20">
        <div className="flex items-start gap-4 md:gap-8 lg:gap-12 pointer-events-auto scale-75 md:scale-90 lg:scale-100 origin-left">
          <h1
            className="text-5xl md:text-7xl lg:text-8xl font-thin tracking-widest text-black/80"
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
      <Dock
        items={dockItems}
        panelHeight={68}
        baseItemSize={50}
        magnification={70}
      />
    </div>
  );
}