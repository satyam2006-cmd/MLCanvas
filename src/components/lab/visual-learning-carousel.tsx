"use client";

import React from "react";
import Carousel, { CarouselItemData } from "@/components/ui/carousel";

const visualResources: CarouselItemData[] = [
    {
        id: 1,
        title: "mladdict.com",
        image: "/mladdict.gif",
        url: "https://mladdict.com",
        description: "Interactive visual exploration of machine learning concepts."
    },
    {
        id: 2,
        title: "R2D3",
        image: "/R2d3.gif",
        url: "https://r2d3.us/",
        description: "A visual introduction to machine learning using animated data."
    },
    {
        id: 3,
        title: "CNN Explainer",
        image: "/cnnexplainer.gif",
        url: "https://poloclub.github.io/cnn-explainer/",
        description: "Learn how Convolutional Neural Networks work through interaction."
    },
    {
        id: 4,
        title: "Seeing Theory",
        image: "/seeingtheory.gif",
        url: "https://seeing-theory.brown.edu/",
        description: "A visual introduction to probability and statistics."
    },
    {
        id: 5,
        title: "Explained Visually",
        image: "/explainedvisually.gif",
        url: "https://explained.ai/",
        description: "Deep technical articles that use visualization to explain complex topics."
    }
];

export function VisualLearningCarousel() {
    return (
        <div className="space-y-6 py-6">
            <div className="px-1">
                <h2 className="text-2xl font-bold tracking-tight">Learn ML Visually</h2>
                <p className="text-muted-foreground text-sm">Interactive resources to master machine learning concepts through visualization.</p>
            </div>

            <div className="flex justify-center w-full overflow-hidden min-w-0">
                <div className="w-full min-w-0">
                    <Carousel
                        items={visualResources}
                        baseWidth={800}
                        autoplay={true}
                        autoplayDelay={4000}
                        pauseOnHover={true}
                        loop={true}
                    />
                </div>
            </div>
        </div>
    );
}
