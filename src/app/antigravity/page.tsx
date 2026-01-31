'use client';

import Antigravity from '@/components/ui/Antigravity';
import { useRouter } from 'next/navigation';

export default function AntigravityPage() {
    const router = useRouter();

    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-8">
            <div className="max-w-4xl w-full space-y-8 text-center">
                <h1 className="text-5xl font-thin tracking-widest uppercase">Antigravity</h1>
                <p className="text-gray-400 font-light max-w-2xl mx-auto">
                    An interactive, physics-inspired particle field that responds to your movement.
                    The particles cluster and dance around your cursor in a rhythmic, anti-gravitational wave.
                </p>

                <div className="relative w-full h-[500px] border border-white/10 rounded-2xl overflow-hidden bg-zinc-950 shadow-2xl">
                    <Antigravity
                        count={400}
                        magnetRadius={8}
                        ringRadius={10}
                        waveSpeed={0.5}
                        waveAmplitude={1.5}
                        particleSize={1.2}
                        lerpSpeed={0.06}
                        color="#0062ff"
                        autoAnimate
                        particleVariance={1.2}
                        rotationSpeed={0.2}
                        depthFactor={1.2}
                        pulseSpeed={4}
                        particleShape="capsule"
                        fieldStrength={10}
                    />

                    <div className="absolute bottom-6 left-6 text-left pointer-events-none">
                        <p className="text-[10px] tracking-[0.3em] uppercase opacity-40">Field Status</p>
                        <p className="text-xs font-mono text-blue-500">Active / Rhythmic Wave</p>
                    </div>
                </div>

                <div className="flex gap-4 justify-center">
                    <button
                        onClick={() => router.push('/')}
                        className="px-8 py-3 bg-white text-black text-xs tracking-[0.2em] hover:bg-white/90 transition-colors uppercase font-medium"
                    >
                        Back to Home
                    </button>
                    <button
                        onClick={() => window.location.reload()}
                        className="px-8 py-3 border border-white/20 text-white text-xs tracking-[0.2em] hover:bg-white/5 transition-colors uppercase font-medium"
                    >
                        Reset Field
                    </button>
                </div>
            </div>
        </div>
    );
}
