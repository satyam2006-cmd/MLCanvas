"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
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
    return (
        <Card className="border-2 border-purple-500/20 bg-background/80 backdrop-blur-xl">
            <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 rounded-xl bg-purple-500/10 text-purple-600">
                        <BookOpen className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-bold">ML Excellence Repos</h3>
                </div>

                <div className="space-y-4">
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
                            className="group flex items-start gap-3 p-3 rounded-xl hover:bg-purple-500/5 transition-all border border-purple-500/10 hover:border-purple-500/20"
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
            </CardContent>
        </Card>
    );
}
