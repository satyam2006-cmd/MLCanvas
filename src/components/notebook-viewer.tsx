"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, ChevronDown, FileText, Folder, Copy, Check, ArrowLeft, ArrowRight, Play, Cpu, Info, Download, Terminal } from "lucide-react";
import { NotebookFile } from "@/lib/notebook-explorer";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark, prism as prismTheme } from "react-syntax-highlighter/dist/esm/styles/prism";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface CodeBlockProps {
  code: string;
  language?: string;
  variant?: "simple" | "proper";
}

export function CodeBlock({ code, language = "python", variant = "proper" }: CodeBlockProps) {
  const { theme } = useTheme();
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  const highlightCode = (code: string) => {
    if (language !== "python") return code;

    // Protection for HTML entities
    let highlighted = code
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

    // Highlighting rules (order matters)
    const rules = [
      // Comments
      { rex: /(#.*)/g, cls: "text-slate-400 dark:text-zinc-500 italic" },
      // Decorators
      { rex: /(@[\w.]+)/g, cls: "text-amber-500 dark:text-amber-400 font-bold" },
      // Multiline strings
      { rex: /("""[\s\S]*?"""|'''[\s\S]*?''')/g, cls: "text-emerald-600 dark:text-emerald-400 italic" },
      // Keywords
      { rex: /\b(def|class|import|from|as|if|else|elif|for|while|break|continue|return|try|except|finally|raise|with|yield|lambda|pass|not|in|is|and|or|True|False|None|match|case|async|await)\b/g, cls: "text-blue-600 dark:text-blue-400" },
      // Strings (single and double quotes)
      { rex: /("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')/g, cls: "text-emerald-600 dark:text-emerald-400" },
      // Numbers
      { rex: /\b(\d+\.?\d*)\b/g, cls: "text-orange-500 dark:text-orange-400" },
      // Built-in functions & common libraries
      { rex: /\b(print|len|range|enumerate|zip|int|str|float|bool|list|tuple|dict|set|heapq|deque|math|datetime|np|pd|plt|sns|torch|tf|nn|optim|F)\b/g, cls: "text-purple-600 dark:text-purple-400" },
    ];

    // We apply rules by wrapping in temporary markers to avoid nested replacements
    rules.forEach((rule, i) => {
      highlighted = highlighted.replace(rule.rex, (match) => `__MARKER_${i}__${match}__ENDMARKER__`);
    });

    // Replace markers with actual span tags
    rules.forEach((rule, i) => {
      const escapedCls = rule.cls;
      const markerRex = new RegExp(`__MARKER_${i}__(.*?)__ENDMARKER__`, "gs");
      highlighted = highlighted.replace(markerRex, (_, inner) => `<span class="${escapedCls}">${inner}</span>`);
    });

    return highlighted;
  };


  return (
    <div className="relative group rounded-2xl overflow-hidden border-2 border-slate-900 dark:border-slate-800 bg-white dark:bg-black shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] dark:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
      <div className="flex items-center justify-between px-4 py-3 bg-slate-50 dark:bg-zinc-900/50 border-b-2 border-slate-900 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-400 border border-slate-900 dark:border-slate-800" />
          <div className="w-3 h-3 rounded-full bg-amber-400 border border-slate-900 dark:border-slate-800" />
          <div className="w-3 h-3 rounded-full bg-emerald-400 border border-slate-900 dark:border-slate-800" />
          <span className="text-[10px] font-black text-slate-400 dark:text-zinc-500 ml-2 uppercase tracking-widest">{language}</span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0 hover:bg-slate-200 dark:hover:bg-slate-800"
          onClick={copyToClipboard}
        >
          {copied ? <Check className="h-4 w-4 text-emerald-600" /> : <Copy className="h-4 w-4 text-slate-400 dark:text-zinc-500" />}
        </Button>
      </div>
      <div className="overflow-x-auto">
        {!mounted ? (
          <pre className="p-6 text-sm font-mono font-bold leading-relaxed text-slate-800 dark:text-zinc-200 whitespace-pre overflow-x-auto">
            <code>{code}</code>
          </pre>
        ) : variant === "proper" ? (
          <SyntaxHighlighter
            language={language}
            style={theme === "dark" ? atomDark : prismTheme}
            customStyle={{
              margin: 0,
              padding: "1.5rem",
              fontSize: "0.9rem",
              backgroundColor: "transparent",
              lineHeight: "1.7",
              fontWeight: "800",
            }}
          >
            {code}
          </SyntaxHighlighter>
        ) : (
          <pre className="p-6 text-sm font-mono font-bold leading-relaxed text-slate-800 dark:text-zinc-200 whitespace-pre">
            <code dangerouslySetInnerHTML={{ __html: highlightCode(code) }} />
          </pre>
        )}
      </div>
    </div>
  );
}

interface NotebookViewerProps {
  notebookPath: string;
  onBack: () => void;
  onNext?: () => void;
  onPrev?: () => void;
}

export function NotebookViewer({ notebookPath, onBack, onNext, onPrev }: NotebookViewerProps) {
  const [notebook, setNotebook] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadNotebook = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/notebook?path=${encodeURIComponent(notebookPath)}`);
        if (!response.ok) {
          throw new Error('Failed to load notebook');
        }
        const data = await response.json();
        setNotebook(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    loadNotebook();
    window.scrollTo(0, 0);
  }, [notebookPath]);

  const handleDownload = () => {
    if (!notebook) return;
    
    // Create a copy of the notebook for downloading
    const downloadData = {
      ...notebook,
      cells: notebook.cells.map((cell: any) => ({
        ...cell,
        source: cell.source.split('\n').map((line: string, i: number, arr: string[]) => 
          i === arr.length - 1 ? line : line + '\n'
        )
      })),
      nbformat: 4,
      nbformat_minor: 5
    };

    const blob = new Blob([JSON.stringify(downloadData, null, 2)], { type: 'application/x-ipynb+json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = notebookPath.split('/').pop() || 'notebook.ipynb';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-96 space-y-4">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <Cpu className="h-12 w-12 text-blue-500 opacity-50" />
        </motion.div>
        <div className="text-lg font-medium text-muted-foreground animate-pulse">Initializing Canvas...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-96 p-8 text-center bg-red-500/5 rounded-3xl border border-red-500/20">
        <div className="p-4 rounded-full bg-red-500/10 text-red-500 mb-6">
          <Info className="h-8 w-8" />
        </div>
        <h3 className="text-xl font-bold text-foreground mb-2">Failed to load notebook</h3>
        <p className="text-muted-foreground mb-8 max-w-md">{error}</p>
        <Button onClick={onBack} variant="outline" className="rounded-xl px-8">
          <ArrowLeft className="mr-2 h-4 w-4" /> Go Back
        </Button>
      </div>
    );
  }

  if (!notebook) return null;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 sticky top-0 z-30 py-6 bg-background/80 backdrop-blur-md border-b-2 border-border/50 -mx-4 px-4 md:mx-0 md:px-0">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={onBack} className="rounded-xl hover:bg-muted group border-2 border-transparent hover:border-border transition-all font-black uppercase text-xs tracking-widest text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back
          </Button>
          <div className="h-8 w-px bg-border/50 hidden md:block" />
          <h2 className="text-xl font-black tracking-tighter line-clamp-1 text-foreground">{notebookPath.split('/').pop()}</h2>
        </div>
        <div className="flex items-center gap-3">
          {onPrev && (
            <Button onClick={onPrev} variant="ghost" className="rounded-xl border-2 border-transparent hover:border-border font-black uppercase text-[10px] tracking-widest hidden lg:flex">
              Prev
            </Button>
          )}
          <Badge className="rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 border-2 border-blue-600/50 px-4 py-1 font-black uppercase text-[10px] tracking-widest shadow-[3px_3px_0px_0px_rgba(37,99,235,0.3)]">
            {notebook.cells?.length || 0} Cells
          </Badge>
          {onNext && (
            <Button onClick={onNext} className="rounded-xl border-2 border-slate-900 dark:border-slate-800 bg-background text-foreground hover:bg-muted shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] transition-all font-black uppercase text-[10px] tracking-widest">
              Next <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          )}
          <Button onClick={handleDownload} className="rounded-xl ml-2 hidden md:flex border-2 border-slate-900 dark:border-slate-800 bg-background text-foreground hover:bg-muted shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] dark:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all font-black uppercase text-xs">
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
        </div>
      </div>

      <div className="space-y-16">
        {notebook.cells?.map((cell: any, index: number) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {cell.cell_type === 'code' ? (
              <div className="space-y-6">
                <div className="flex items-center gap-3 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] pl-2">
                  <Terminal className="h-4 w-4 text-blue-600" />
                  Code Block {index + 1}
                </div>
                <CodeBlock code={cell.source} language="python" />
                
                {cell.outputs && cell.outputs.length > 0 && (
                  <div className="mt-6 rounded-2xl border-2 border-slate-900 dark:border-slate-800 bg-slate-50 dark:bg-black overflow-hidden shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] dark:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <div className="px-5 py-3 border-b-2 border-slate-900 dark:border-slate-800 bg-white dark:bg-zinc-900/50 text-[10px] font-black text-slate-400 dark:text-zinc-500 uppercase tracking-[0.2em] flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-slate-900 dark:bg-zinc-500" />
                      Output Console
                    </div>
                    <div className="p-6 space-y-4">
                      {cell.outputs.map((output: any, outputIndex: number) => (
                        <div key={outputIndex} className="font-bold text-sm">
                          {output.text && (
                            <pre className="text-slate-800 dark:text-zinc-300 whitespace-pre-wrap break-all leading-relaxed font-mono bg-white dark:bg-zinc-900/30 p-4 rounded-xl border-2 border-slate-900/5 dark:border-zinc-800/20">
                              {Array.isArray(output.text) ? output.text.join('') : output.text}
                            </pre>
                          )}
                          {output.data?.['text/plain'] && (
                            <pre className="text-blue-700 dark:text-blue-400 whitespace-pre-wrap break-all leading-relaxed font-mono bg-blue-50 dark:bg-blue-900/10 p-4 rounded-xl border-2 border-blue-600/10 dark:border-blue-400/10">
                              {Array.isArray(output.data['text/plain']) 
                                ? output.data['text/plain'].join('') 
                                : output.data['text/plain']}
                            </pre>
                          )}
                          {output.output_type === 'error' && (
                            <div className="text-red-700 dark:text-red-400 bg-red-50 dark:bg-red-900/10 p-4 rounded-xl border-2 border-red-600/20 dark:border-red-400/20">
                              <pre className="whitespace-pre-wrap break-all font-mono">
                                {Array.isArray(output.traceback) ? output.traceback.join('') : output.evalue}
                              </pre>
                            </div>
                          )}
                          {output.data?.['image/png'] && (
                            <div className="mt-6 bg-white rounded-2xl p-8 flex justify-center border-2 border-slate-900 dark:border-slate-800 shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] dark:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                              <img 
                                src={`data:image/png;base64,${output.data['image/png']}`} 
                                alt="Output Visualization" 
                                className="max-w-full h-auto rounded-lg"
                              />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="prose-container px-4">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    h1: ({ children }) => (
                      <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mt-12 mb-6 text-foreground leading-none border-b-4 border-slate-900 dark:border-slate-800 pb-2">
                        {children}
                      </h1>
                    ),
                    h2: ({ children }) => (
                      <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight mt-10 mb-4 text-foreground leading-tight flex items-center gap-2">
                        <div className="w-1.5 h-8 bg-blue-600" />
                        {children}
                      </h2>
                    ),
                    h3: ({ children }) => (
                      <h3 className="text-xl font-black uppercase tracking-normal mt-8 mb-3 text-foreground/80">
                        {children}
                      </h3>
                    ),
                    p: ({ children }) => (
                      <p className="text-muted-foreground font-bold leading-relaxed mb-6 text-lg">
                        {children}
                      </p>
                    ),
                    ul: ({ children }) => (
                      <ul className="list-none space-y-2 mb-6 pl-4 border-l-2 border-slate-200 dark:border-slate-800">
                        {children}
                      </ul>
                    ),
                    li: ({ children }) => (
                      <li className="flex items-start gap-2 text-muted-foreground font-medium">
                        <span className="text-blue-600 font-black">→</span>
                        {children}
                      </li>
                    ),
                    table: ({ children }) => (
                      <div className="overflow-x-auto my-8 rounded-2xl border-2 border-slate-900 dark:border-slate-800 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] bg-background">
                        <table className="w-full text-left border-collapse">
                          {children}
                        </table>
                      </div>
                    ),
                    th: ({ children }) => (
                      <th className="px-4 py-3 bg-slate-50 dark:bg-zinc-900/50 font-black uppercase text-[10px] tracking-widest border-b-2 border-slate-900 dark:border-slate-800">
                        {children}
                      </th>
                    ),
                    td: ({ children }) => (
                      <td className="px-4 py-3 font-bold text-sm border-b border-slate-100 dark:border-slate-800/50">
                        {children}
                      </td>
                    ),
                  }}
                >
                  {cell.source}
                </ReactMarkdown>
              </div>
            )}
          </motion.div>
        ))}
      </div>
      
      <div className="py-24 flex flex-col items-center gap-10 border-t-2 border-border/50 mt-20">
        <div className="p-6 rounded-2xl bg-blue-600 text-white shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] dark:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          <Check className="h-8 w-8" />
        </div>
        <div className="text-center space-y-2">
          <h4 className="text-3xl font-black uppercase tracking-tighter">Checkpoint Reached</h4>
          <p className="text-muted-foreground font-bold uppercase tracking-widest text-sm">You&apos;ve completed this module successfully.</p>
        </div>
        <div className="flex flex-wrap justify-center gap-6">
          {onPrev && (
            <Button onClick={onPrev} className="rounded-2xl px-8 py-8 text-lg font-black uppercase bg-background border-2 border-slate-900 dark:border-slate-800 text-foreground shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] dark:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all">
              <ArrowLeft className="mr-3 h-6 w-6" />
              Previous
            </Button>
          )}
          <Button onClick={onBack} className="rounded-2xl px-12 py-8 text-lg font-black uppercase bg-background border-2 border-slate-900 dark:border-slate-800 text-foreground shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] dark:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all">
            Browse More
          </Button>
          <Button onClick={handleDownload} className="rounded-2xl px-12 py-8 text-lg font-black uppercase bg-background border-2 border-slate-900 dark:border-slate-800 text-foreground shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] dark:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all">
            <Download className="mr-3 h-6 w-6" />
            Save Notebook
          </Button>
          {onNext && (
            <Button onClick={onNext} className="rounded-2xl px-12 py-8 text-lg font-black uppercase bg-background border-2 border-slate-900 dark:border-slate-800 text-foreground shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] dark:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all">
              Next Notebook
              <ArrowRight className="ml-3 h-6 w-6" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
