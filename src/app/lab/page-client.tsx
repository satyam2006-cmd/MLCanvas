"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { NotebookViewer } from "@/components/notebook-viewer";
import { NotebookFile } from "@/lib/notebook-explorer";
import { Folder, FileText, ChevronRight, ExternalLink, ChevronDown, BookOpen, ArrowRight, Terminal } from "lucide-react";
import { VisualLearningCarousel } from "@/components/lab/visual-learning-carousel";
import { NOTEBOOK_CATEGORIES, SOURCES, Category, Notebook } from "./notebook-data";

export default function LabPage() {
  const [selectedFile, setSelectedFile] = useState<NotebookFile | null>(null);
  const [isMainSectionExpanded, setIsMainSectionExpanded] = useState(true);

  const handleBack = () => {
    setSelectedFile(null);
  };

  const toggleMainSection = () => {
    setIsMainSectionExpanded(!isMainSectionExpanded);
  };

  if (selectedFile) {
    return (
      <div className="max-w-6xl mx-auto space-y-6">
        <NotebookViewer
          notebookPath={selectedFile.path}
          onBack={handleBack}
        />
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8 pb-20 px-4 md:px-6 min-w-0">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
          ML Canvas Learning Lab
        </h1>
        <p className="text-muted-foreground mt-2 text-base md:text-lg">
          Master machine learning through interactive visual resources and expert-curated notebooks.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="relative group overflow-hidden rounded-3xl border border-blue-500/20 bg-blue-500/5 backdrop-blur-md p-5 md:p-8"
      >
        <div className="absolute -top-6 -right-6 md:top-0 md:right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none">
          <Terminal size={160} className="w-24 h-24 md:w-40 md:h-40" />
        </div>
        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="flex flex-col md:flex-row items-center gap-4 text-center md:text-left">
            <div className="p-3 rounded-2xl bg-blue-500/10 text-blue-500 shrink-0">
              <Terminal className="h-8 w-8 md:h-10 md:w-10" />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-bold tracking-tight">Learn Python Fundamentals</h2>
              <p className="text-muted-foreground text-sm md:text-base max-w-md mt-1">
                Master the core language before diving into Machine Learning. Use this comprehensive quick reference.
              </p>
            </div>
          </div>
          <Button asChild className="w-full lg:w-auto rounded-xl px-6 py-6 bg-blue-500 hover:bg-blue-600 shadow-lg shadow-blue-500/20 transition-all active:scale-95 text-base font-semibold">
            <a href="https://quickref.me/python" target="_blank" rel="noopener noreferrer">
              <ExternalLink className="mr-2 h-5 w-5" />
              Python Quick Reference
            </a>
          </Button>
        </div>
      </motion.div>

      <VisualLearningCarousel />

      <Card className="bg-background/40 backdrop-blur-xl border-border/50 shadow-2xl overflow-hidden">
        <CardHeader className="border-b border-border/50 bg-muted/30">
          <button
            onClick={toggleMainSection}
            className="w-full text-left flex items-center justify-between group transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-blue-500/10 text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-all">
                <BookOpen className="h-6 w-6" />
              </div>
              <div>
                <CardTitle className="text-2xl font-bold">Machine Learning Notebooks</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  A curated collection of Jupyter notebooks for deep diving into ML concepts.
                </p>
              </div>
            </div>
            <div className={`p-2 rounded-full hover:bg-muted transition-all ${isMainSectionExpanded ? 'rotate-180' : ''}`}>
              <ChevronDown className="h-6 w-6 text-muted-foreground" />
            </div>
          </button>
        </CardHeader>

        <AnimatePresence>
          {isMainSectionExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <CardContent className="p-6 md:p-8 space-y-10">
                <div className="columns-1 md:columns-2 lg:columns-3 gap-6">
                  {NOTEBOOK_CATEGORIES.map((category, idx) => (
                    <NotebookCategoryCard key={category.id} category={category} index={idx} />
                  ))}
                </div>

                <div className="pt-8 border-t border-border/50">
                  <div className="bg-blue-500/5 rounded-2xl p-6 border border-blue-500/10">
                    <h4 className="flex items-center gap-2 font-bold text-lg mb-4 text-blue-500">
                      <ExternalLink className="h-5 w-5" />
                      Sources & References
                    </h4>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {SOURCES.map((source, i) => (
                        <li key={i}>
                          <a
                            href={source.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center gap-2 p-3 rounded-xl hover:bg-blue-500/10 transition-all border border-transparent hover:border-blue-500/20"
                          >
                            <span className="w-6 h-6 flex items-center justify-center rounded-full bg-blue-500/10 text-blue-500 text-xs font-bold group-hover:bg-blue-500 group-hover:text-white transition-all">
                              {i + 1}
                            </span>
                            <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors line-clamp-1">
                              {source.name}
                            </span>
                            <ArrowRight className="h-4 w-4 ml-auto opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all" />
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </div>
  );
}

function NotebookCategoryCard({ category, index }: { category: Category, index: number }) {

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="group relative break-inside-avoid mb-6"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="relative flex flex-col p-4 md:p-6 rounded-2xl border border-border/50 bg-background/20 backdrop-blur-sm hover:border-blue-500/30 hover:shadow-xl hover:shadow-blue-500/5 transition-all">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-blue-500/10 text-blue-500">
            <Folder className="h-5 w-5" />
          </div>
          <h3 className="font-bold text-lg tracking-tight group-hover:text-blue-500 transition-colors">
            {category.title}
          </h3>
        </div>

        <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
          {category.description}
        </p>

        <div className="space-y-3">
          {category.subcategories ? (
            category.subcategories.map((sub, i) => (
              <div key={i} className="space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/60 px-2 border-l-2 border-blue-500/30 ml-1">
                  {sub.title}
                </span>
                <div className="space-y-1">
                  {sub.notebooks.map((nb, j) => (
                    <NotebookLink key={j} notebook={nb} />
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="space-y-1">
              {category.notebooks?.map((nb, i) => (
                <NotebookLink key={i} notebook={nb} />
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function NotebookLink({ notebook }: { notebook: Notebook }) {
  return (
    <a
      href={notebook.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-start gap-2 p-2 rounded-lg hover:bg-blue-500/5 group/link transition-all border border-transparent hover:border-blue-500/10"
    >
      <FileText className="h-4 w-4 mt-0.5 text-orange-500 shrink-0" />
      <div className="flex flex-col">
        <span className="text-sm font-medium group-hover/link:text-blue-500 transition-colors">
          {notebook.title}
        </span>
        {notebook.subtitle && (
          <span className="text-[10px] text-muted-foreground/70 hidden group-hover/link:block animate-in fade-in slide-in-from-top-1 duration-200">
            {notebook.subtitle}
          </span>
        )}
      </div>
      <ExternalLink className="h-3 w-3 ml-auto opacity-0 group-hover/link:opacity-50 transition-all shrink-0" />
    </a>
  );
}
