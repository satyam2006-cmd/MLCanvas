"use client";

import { Github, Twitter, Mail } from "lucide-react";

export default function Footer() {
    return (
        <footer className="py-12 bg-white border-t border-gray-100">
            <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="text-center md:text-left">
                    <h4 className="font-bold text-black tracking-tighter text-lg">MLCanvas</h4>
                    <p className="text-xs text-gray-400 mt-1">
                        Built for ML learners
                    </p>
                </div>

                <div className="flex items-center gap-6">
                    <a href="https://github.com/satyam2006-cmd/" className="text-gray-400 hover:text-black transition-colors">
                        <Github size={20} />
                    </a>
                    <a href="mailto:satyambhagat20061023@gmail.com" className="text-gray-400 hover:text-black transition-colors">
                        <Mail size={20} />
                    </a>
                </div>

                <div className="text-xs text-gray-400">
                    © {new Date().getFullYear()} MLCanvas. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
