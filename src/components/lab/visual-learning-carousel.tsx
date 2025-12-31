"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

const visualResources = [
    {
        title: "mladdict.com",
        gif: "/mladdict.gif",
        url: "https://mladdict.com",
        description: "Interactive visual exploration of machine learning concepts."
    },
    {
        title: "R2D3",
        gif: "/R2d3.gif",
        url: "https://r2d3.us/",
        description: "A visual introduction to machine learning using animated data."
    },
    {
        title: "CNN Explainer",
        gif: "/cnnexplainer.gif",
        url: "https://poloclub.github.io/cnn-explainer/",
        description: "Learn how Convolutional Neural Networks work through interaction."
    },
    {
        title: "Seeing Theory",
        gif: "/seeingtheory.gif",
        url: "https://seeing-theory.brown.edu/",
        description: "A visual introduction to probability and statistics."
    },
    {
        title: "Explained Visually",
        gif: "/explainedvisually.gif",
        url: "https://explained.ai/",
        description: "Deep technical articles that use visualization to explain complex topics."
    }
];

export function VisualLearningCarousel() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollXProgress } = useScroll({
        container: containerRef,
    });

    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const [isPaused, setIsPaused] = useState(false);

    const checkScroll = () => {
        if (containerRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
            setCanScrollLeft(scrollLeft > 0);
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
        }
    };

    useEffect(() => {
        const container = containerRef.current;
        if (container) {
            container.addEventListener("scroll", checkScroll);
            checkScroll();
        }
        return () => container?.removeEventListener("scroll", checkScroll);
    }, []);

    useEffect(() => {
        if (isPaused) return;

        const interval = setInterval(() => {
            if (containerRef.current) {
                const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
                if (scrollLeft >= scrollWidth - clientWidth - 10) {
                    containerRef.current.scrollTo({ left: 0, behavior: "smooth" });
                } else {
                    scroll("right");
                }
            }
        }, 4000);

        return () => clearInterval(interval);
    }, [isPaused]);

    const scroll = (direction: "left" | "right") => {
        if (containerRef.current) {
            const { clientWidth } = containerRef.current;
            const scrollAmount = direction === "left" ? -clientWidth * 0.8 : clientWidth * 0.8;
            containerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
        }
    };

    return (
        <div
            className="relative group py-6"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            <div className="flex items-center justify-between mb-6 px-1">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Learn ML Visually</h2>
                    <p className="text-muted-foreground text-sm">Interactive resources to master machine learning concepts through visualization.</p>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={() => scroll("left")}
                        disabled={!canScrollLeft}
                        className="p-2 rounded-full border border-border/50 bg-background/50 backdrop-blur-sm disabled:opacity-30 transition-all hover:bg-background"
                    >
                        <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                        onClick={() => scroll("right")}
                        disabled={!canScrollRight}
                        className="p-2 rounded-full border border-border/50 bg-background/50 backdrop-blur-sm disabled:opacity-30 transition-all hover:bg-background"
                    >
                        <ChevronRight className="h-5 w-5" />
                    </button>
                </div>
            </div>

            <div
                ref={containerRef}
                className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4 px-1"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                {visualResources.map((resource, index) => (
                    <motion.div
                        key={resource.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex-shrink-0 w-[300px] md:w-[380px] snap-start"
                    >
                        <Card className="overflow-hidden bg-background/40 backdrop-blur-md border-border/50 hover:border-primary/50 transition-all group/card h-full">
                            <div className="relative aspect-video overflow-hidden border-b border-border/50 bg-muted">
                                <img
                                    src={resource.gif}
                                    alt={resource.title}
                                    className="object-cover w-full h-full transition-transform duration-500 group-hover/card:scale-105"
                                />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/card:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                                    <ExternalLink className="text-white h-8 w-8" />
                                </div>
                            </div>
                            <CardContent className="p-5 flex flex-col justify-between">
                                <div>
                                    <h3 className="text-lg font-bold mb-2 group-hover/card:text-primary transition-colors">
                                        {resource.title}
                                    </h3>
                                    <p className="text-sm text-balance text-muted-foreground line-clamp-2">
                                        {resource.description}
                                    </p>
                                </div>
                                <a
                                    href={resource.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-4 inline-flex items-center text-sm font-medium text-primary hover:underline"
                                >
                                    Explore resource <ExternalLink className="ml-1 h-3 w-3" />
                                </a>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
