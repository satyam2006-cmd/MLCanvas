"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Github,
    Linkedin,
    Mail,
    User,
    Star,
    ExternalLink,
    RotateCcw,
    BookOpen,
    ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function InteractiveLearningCard() {
    const [isFlipped, setIsFlipped] = useState(false);
    const [isRevealed, setIsRevealed] = useState(false);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isDrawing, setIsDrawing] = useState(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas || isRevealed) return;

        const parent = canvas.parentElement;
        if (!parent) return;

        const resizeCanvas = () => {
            canvas.width = parent.clientWidth;
            canvas.height = parent.clientHeight;

            const ctx = canvas.getContext("2d");
            if (!ctx) return;

            // Fill canvas with gift wrap pattern/color
            const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
            gradient.addColorStop(0, "#ef4444"); // Red
            gradient.addColorStop(1, "#991b1b"); // Dark Red
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Add ribbon effect
            ctx.fillStyle = "#fbbf24"; // Gold
            ctx.fillRect(canvas.width / 2 - 20, 0, 40, canvas.height);
            ctx.fillRect(0, canvas.height / 2 - 20, canvas.width, 40);

            // Add text to the scratch layer
            ctx.fillStyle = "white";
            ctx.font = "bold 24px Inter, sans-serif";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.shadowColor = "rgba(0,0,0,0.5)";
            ctx.shadowBlur = 10;
            ctx.fillText("🎁 UNWRAP YOUR GIFT!", canvas.width / 2, canvas.height / 2);
            ctx.shadowBlur = 0;

            ctx.font = "14px Inter, sans-serif";
            ctx.globalAlpha = 0.9;
            ctx.fillText("Scratch to Open", canvas.width / 2, canvas.height / 2 + 40);
            ctx.globalAlpha = 1.0;
        };

        resizeCanvas();
        const observer = new ResizeObserver(resizeCanvas);
        observer.observe(parent);

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const scratch = (x: number, y: number) => {
            ctx.globalCompositeOperation = "destination-out";
            ctx.beginPath();
            ctx.arc(x, y, 30, 0, Math.PI * 2);
            ctx.fill();
            checkReveal();
        };

        const checkReveal = () => {
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const pixels = imageData.data;
            let transparentPixels = 0;
            for (let i = 0; i < pixels.length; i += 4) {
                if (pixels[i + 3] === 0) transparentPixels++;
            }
            const percentage = (transparentPixels / (pixels.length / 4)) * 100;
            if (percentage > 35) {
                setIsRevealed(true);
            }
        };

        const handleMouseMove = (e: MouseEvent) => {
            if (!isDrawing) return;
            const rect = canvas.getBoundingClientRect();
            scratch(e.clientX - rect.left, e.clientY - rect.top);
        };

        const handleTouchMove = (e: TouchEvent) => {
            const rect = canvas.getBoundingClientRect();
            const touch = e.touches[0];
            scratch(touch.clientX - rect.left, touch.clientY - rect.top);
        };

        canvas.addEventListener("mousemove", handleMouseMove);
        canvas.addEventListener("touchmove", handleTouchMove);

        return () => {
            canvas.removeEventListener("mousemove", handleMouseMove);
            canvas.removeEventListener("touchmove", handleTouchMove);
            observer.disconnect();
        };
    }, [isDrawing, isRevealed]);

    return (
        <div className="relative w-full h-[400px] perspective-1000 group">
            <motion.div
                className="relative w-full h-full transition-all duration-500 preserve-3d"
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
            >
                {/* Front Side */}
                <div className="absolute inset-0 backface-hidden">
                    <Card className="h-full border-2 border-blue-500/20 bg-background/80 backdrop-blur-xl overflow-hidden">
                        <CardContent className="p-0 h-full relative">
                            {/* Underlying Content */}
                            <div className="p-6 flex flex-col items-center justify-center h-full space-y-4">
                                <div className="relative">
                                    <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 p-1">
                                        <div className="w-full h-full rounded-full bg-background flex items-center justify-center overflow-hidden">
                                            <img
                                                src="https://avatars.githubusercontent.com/u/188743121?v=4"
                                                alt="Satyam"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    </div>
                                    <div className="absolute -bottom-1 -right-1 bg-green-500 w-5 h-5 rounded-full border-4 border-background" />
                                </div>

                                <div className="text-center">
                                    <h3 className="text-xl font-bold text-foreground">Satyam Bhagat</h3>
                                    <p className="text-sm text-blue-500 font-semibold tracking-wide uppercase">is the owner</p>
                                    <p className="text-xs text-muted-foreground mt-1">satyam2006-cmd</p>
                                </div>

                                <div className="flex flex-wrap items-center justify-center gap-2 mt-2">
                                    <Button variant="outline" size="icon" className="rounded-full h-9 w-9" asChild>
                                        <a href="https://www.linkedin.com/in/satyam-bhagat2006/" target="_blank" rel="noopener noreferrer">
                                            <Linkedin className="h-4 w-4" />
                                        </a>
                                    </Button>
                                    <Button variant="outline" size="icon" className="rounded-full h-9 w-9" asChild>
                                        <a href="mailto:satyambhagat200623@gmail.com">
                                            <Mail className="h-4 w-4" />
                                        </a>
                                    </Button>
                                    <Button variant="secondary" size="sm" className="rounded-full gap-2 bg-blue-500/10 text-blue-600 hover:bg-blue-500/20 h-9" asChild>
                                        <a href="https://satyambhagats-portfolio.vercel.app/" target="_blank" rel="noopener noreferrer">
                                            <ExternalLink className="h-4 w-4" />
                                            Portfolio
                                        </a>
                                    </Button>
                                    <Button variant="outline" size="sm" className="rounded-full gap-2 border-orange-500/50 hover:bg-orange-500/10 text-orange-600 h-9" asChild>
                                        <a href="https://github.com/satyam2006-cmd/MLCanvas" target="_blank" rel="noopener noreferrer">
                                            <Star className="h-4 w-4 fill-orange-500" />
                                            Star
                                        </a>
                                    </Button>
                                </div>

                                <Button
                                    onClick={() => setIsFlipped(true)}
                                    className="mt-6 w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl shadow-lg shadow-blue-500/20 group/btn"
                                >
                                    Learn more about ML
                                    <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                                </Button>
                            </div>

                            {/* Scratch Layer */}
                            <AnimatePresence>
                                {!isRevealed && (
                                    <motion.canvas
                                        ref={canvasRef}
                                        exit={{ opacity: 0, scale: 1.1 }}
                                        transition={{ duration: 0.5 }}
                                        width={400} // Will be updated by ResizeObserver or fixed for simplicity
                                        height={400}
                                        className="absolute inset-0 cursor-crosshair touch-none z-20 w-full h-full"
                                        onMouseDown={() => setIsDrawing(true)}
                                        onMouseUp={() => setIsDrawing(false)}
                                        onMouseLeave={() => setIsDrawing(false)}
                                    />
                                )}
                            </AnimatePresence>
                        </CardContent>
                    </Card>
                </div>

                {/* Back Side */}
                <div className="absolute inset-0 backface-hidden rotate-y-180">
                    <Card className="h-full border-2 border-purple-500/20 bg-background/80 backdrop-blur-xl">
                        <CardContent className="p-6 flex flex-col h-full">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 rounded-xl bg-purple-500/10 text-purple-600">
                                    <BookOpen className="h-6 w-6" />
                                </div>
                                <h3 className="text-xl font-bold">ML Excellence Repos</h3>
                            </div>

                            <div className="space-y-4 flex-1">
                                {[
                                    { name: "ML From Scratch", url: "https://github.com/eriklindernoren/ML-From-Scratch", desc: "Pure NumPy implementations.", stars: "24k" },
                                    { name: "NN Zero to Hero", url: "https://github.com/karpathy/nn-zero-to-hero", desc: "Andrej Karpathy's masterclass.", stars: "32k" },
                                    { name: "DS Cheatsheets", url: "https://github.com/FavioVazquez/ds-cheatsheets", desc: "Comprehensive ML mapping.", stars: "15k" }
                                ].map((repo, i) => (
                                    <a
                                        key={i}
                                        href={repo.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group flex items-start gap-3 p-3 rounded-xl hover:bg-purple-500/5 transition-all border border-transparent hover:border-purple-500/10"
                                    >
                                        <Github className="h-5 w-5 mt-0.5 text-muted-foreground group-hover:text-purple-600" />
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between">
                                                <span className="font-bold text-sm group-hover:text-purple-600">{repo.name}</span>
                                                <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                                                    <Star className="h-3 w-3 fill-orange-500 text-orange-500" />
                                                    {repo.stars}
                                                </div>
                                            </div>
                                            <p className="text-xs text-muted-foreground line-clamp-1">{repo.desc}</p>
                                        </div>
                                        <ExternalLink className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </a>
                                ))}
                            </div>

                            <Button
                                variant="ghost"
                                onClick={() => setIsFlipped(false)}
                                className="mt-4 w-full rounded-xl hover:bg-purple-500/10 group/back"
                            >
                                <RotateCcw className="mr-2 h-4 w-4 group-hover/back:rotate-[-90deg] transition-transform" />
                                Return to Owner
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </motion.div>

            {/* Tailwind helper for backface protection */}
            <style jsx global>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .backface-hidden {
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
        .preserve-3d {
          transform-style: preserve-3d;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
        </div>
    );
}
