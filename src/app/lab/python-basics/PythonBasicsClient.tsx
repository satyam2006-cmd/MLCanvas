"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Terminal } from "lucide-react";
import { useRouter } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { CodeBlock } from "@/components/notebook-viewer";

interface PythonBasicsClientProps {
  markdownContent: string;
}

export default function PythonBasicsClient({ markdownContent }: PythonBasicsClientProps) {
  const router = useRouter();

  // Smooth scroll handler for internal links
  const handleInternalLink = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const id = href.replace("#", "");
      let element = document.getElementById(id);
      
      // Fallback: If exact match fails, try stripping common prefixes like 'python-'
      if (!element && id.startsWith("python-")) {
        const fallbackId = id.replace("python-", "");
        element = document.getElementById(fallbackId);
      }
      
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
        // Update URL without jumping
        window.history.pushState(null, "", href);
      }
    }
  };

  // Custom components for ReactMarkdown to match Neo-Brutalist theme
  const components = {
    h1: ({ children, id }: any) => (
      <h1 id={id} className="text-4xl md:text-6xl font-black uppercase tracking-tighter mt-16 mb-8 text-foreground border-b-8 border-slate-900 dark:border-slate-800 pb-4 scroll-mt-24">
        {children}
      </h1>
    ),
    h2: ({ children, id }: any) => (
      <h2 id={id} className="text-3xl md:text-4xl font-black uppercase tracking-tight mt-12 mb-6 text-foreground border-l-8 border-blue-600 pl-4 py-1 bg-blue-500/5 scroll-mt-24">
        {children}
      </h2>
    ),
    h3: ({ children, id }: any) => (
      <h3 id={id} className="text-xl md:text-2xl font-black uppercase tracking-tight mt-8 mb-4 text-foreground/90 flex items-center gap-3 scroll-mt-24">
        <div className="w-2 h-6 bg-slate-900 dark:bg-slate-700" />
        {children}
      </h3>
    ),
    a: ({ href, children }: any) => {
      const isInternal = href?.startsWith("#");
      return (
        <a 
          href={href}
          onClick={(e) => isInternal && handleInternalLink(e, href)}
          className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-black underline underline-offset-4 decoration-2 decoration-blue-600/30 hover:decoration-blue-600 transition-all"
        >
          {children}
        </a>
      );
    },
    p: ({ children }: any) => (
      <p className="text-lg font-medium leading-relaxed mb-6 text-muted-foreground">
        {children}
      </p>
    ),
    ul: ({ children }: any) => (
      <ul className="list-none space-y-3 mb-8 pl-4 border-l-2 border-muted">
        {children}
      </ul>
    ),
    li: ({ children }: any) => (
      <li className="flex items-start gap-2 text-muted-foreground font-bold italic">
        <span className="text-blue-600">→</span>
        <span>{children}</span>
      </li>
    ),
    code: ({ node, inline, className, children, ...props }: any) => {
      const match = /language-(\w+)/.exec(className || "");
      const lang = match ? match[1] : "python";
      
      if (!inline && match) {
        return (
          <div className="my-8">
            <CodeBlock code={String(children).replace(/\n$/, "")} language={lang} variant="simple" />
          </div>
        );
      }
      
      return (
        <code className="bg-muted px-1.5 py-0.5 rounded-md border border-border font-mono text-sm font-bold text-foreground" {...props}>
          {children}
        </code>
      );
    },
    table: ({ children }: any) => (
      <div className="overflow-x-auto my-8 rounded-2xl border-2 border-slate-900 dark:border-slate-800 shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] dark:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] bg-background">
        <table className="w-full text-left border-collapse">
          {children}
        </table>
      </div>
    ),
    thead: ({ children }: any) => (
      <thead className="bg-muted border-b-2 border-slate-900 dark:border-slate-800">
        {children}
      </thead>
    ),
    th: ({ children }: any) => (
      <th className="px-6 py-4 font-black uppercase text-xs tracking-widest text-foreground">
        {children}
      </th>
    ),
    td: ({ children }: any) => (
      <td className="px-6 py-4 font-bold text-sm border-b border-muted group-hover:bg-muted/30 transition-colors">
        {children}
      </td>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-8 border-slate-900 dark:border-slate-800 pl-6 py-4 my-8 bg-muted/50 font-bold italic text-foreground/80">
        {children}
      </blockquote>
    )
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8 font-sans selection:bg-blue-500 selection:text-white">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header Section */}
        <header className="space-y-6">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => router.push('/lab')}
              className="p-3 rounded-xl border-2 border-slate-900 dark:border-slate-800 bg-background hover:bg-muted shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] dark:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all group"
            >
              <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
            </button>
            <div>
              <h1 className="text-4xl md:text-5xl font-black tracking-tighter uppercase leading-none">
                Python <span className="text-blue-600">Documentation</span>
              </h1>
              <p className="text-muted-foreground font-bold tracking-tight mt-2 flex items-center gap-2">
                <Terminal className="h-4 w-4" /> Comprehensive ML Reference
              </p>
            </div>
          </div>
        </header>

        {/* Markdown Content */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="prose-container pb-20"
        >
          <ReactMarkdown 
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeSlug]}
            components={components}
          >
            {markdownContent}
          </ReactMarkdown>
        </motion.div>

        {/* Footer */}
        <footer className="pt-20 pb-10 border-t-2 border-muted text-center">
          <p className="text-muted-foreground font-black uppercase text-[10px] tracking-[0.3em]">
            MLCanvas Laboratory • Python Reference • v5.0
          </p>
        </footer>
      </div>
    </div>
  );
}
