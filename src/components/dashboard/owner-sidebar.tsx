"use client";

import React from "react";
import {
    Linkedin,
    Mail,
    ExternalLink,
    Star
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function OwnerSidebar() {
    return (
        <Card className="border-2 border-blue-500/20 bg-background/80 backdrop-blur-xl">
            <CardContent className="p-6">
                <div className="flex flex-col items-center space-y-4">
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
                        <p className="text-sm text-blue-500 font-semibold tracking-wide uppercase">Owner</p>
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
                </div>
            </CardContent>
        </Card>
    );
}
