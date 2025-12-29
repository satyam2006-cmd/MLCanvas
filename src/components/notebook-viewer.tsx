"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, ChevronDown, FileText, Folder, Copy, Check } from "lucide-react";
import { NotebookFile } from "@/lib/notebook-explorer";

interface FileTreeProps {
  files: NotebookFile[];
  onFileSelect: (file: NotebookFile) => void;
  level?: number;
}

export function FileTree({ files, onFileSelect, level = 0 }: FileTreeProps) {
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set());
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);

  const toggleFolder = (path: string) => {
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(path)) {
      newExpanded.delete(path);
      setSelectedFolder(null);
    } else {
      newExpanded.add(path);
      setSelectedFolder(path);
    }
    setExpandedFolders(newExpanded);
  };

  const getNotebooksInFolder = (folder: NotebookFile): NotebookFile[] => {
    if (folder.type === 'directory' && folder.children) {
      return folder.children.filter(child => child.type === 'file');
    }
    return [];
  };

  return (
    <div className={`${level > 0 ? 'ml-4' : ''}`}>
      {files.map((file) => (
        <div key={file.path} className="select-none">
          {file.type === 'directory' ? (
            <div className="mb-2">
              <div className="flex items-center py-1 hover:bg-muted/50 rounded cursor-pointer"
                   onClick={() => toggleFolder(file.path)}>
                {expandedFolders.has(file.path) ? 
                  <ChevronDown className="h-4 w-4 mr-1" /> : 
                  <ChevronRight className="h-4 w-4 mr-1" />
                }
                <Folder className="h-4 w-4 mr-2 text-blue-500" />
                <span className="text-sm font-medium">{file.name}</span>
                <Badge variant="secondary" className="ml-2 text-xs">
                  {file.children?.length || 0}
                </Badge>
              </div>
              
              {/* Show notebooks as dropdown when folder is expanded and selected */}
              {expandedFolders.has(file.path) && selectedFolder === file.path && file.children && (
                <div className="ml-8 mt-2 p-2 bg-muted/50 rounded border">
                  <div className="text-xs font-medium text-muted-foreground mb-2">
                    📓 Notebooks in {file.name}:
                  </div>
                  {getNotebooksInFolder(file).map((notebook) => (
                    <div key={notebook.path}
                         className="flex items-center py-1 px-2 hover:bg-muted rounded cursor-pointer"
                         onClick={() => onFileSelect(notebook)}>
                      <FileText className="h-3 w-3 mr-2 text-orange-500" />
                      <span className="text-xs">{notebook.name}</span>
                    </div>
                  ))}
                  {getNotebooksInFolder(file).length === 0 && (
                    <div className="text-xs text-muted-foreground px-2">
                      No notebooks in this folder
                    </div>
                  )}
                </div>
              )}
              
              {/* Show nested folder structure */}
              {expandedFolders.has(file.path) && file.children && (
                <FileTree 
                  files={file.children.filter(child => child.type === 'directory')} 
                  onFileSelect={onFileSelect} 
                  level={level + 1} 
                />
              )}
            </div>
          ) : (
            <div className="flex items-center py-1 hover:bg-muted/50 rounded cursor-pointer"
                 onClick={() => onFileSelect(file)}>
              <div className="w-5" />
              <FileText className="h-4 w-4 mr-2 text-orange-500" />
              <span className="text-sm">{file.name}</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

interface CodeBlockProps {
  code: string;
  language?: string;
}

export function CodeBlock({ code, language = "python" }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  return (
    <div className="relative group">
      <pre className="bg-muted/80 border border-border p-4 rounded-md text-sm font-mono overflow-x-auto">
        <code className="text-foreground">{code}</code>
      </pre>
      <Button
        variant="ghost"
        size="sm"
        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={copyToClipboard}
      >
        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      </Button>
    </div>
  );
}

interface NotebookViewerProps {
  notebookPath: string;
  onBack: () => void;
}

export function NotebookViewer({ notebookPath, onBack }: NotebookViewerProps) {
  const [notebook, setNotebook] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadNotebook = async () => {
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
  }, [notebookPath]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-muted-foreground">Loading notebook...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <div className="text-lg text-red-500 mb-4">Error loading notebook</div>
        <div className="text-sm text-muted-foreground mb-4">{error}</div>
        <Button onClick={onBack}>Back</Button>
      </div>
    );
  }

  if (!notebook) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-muted-foreground">No notebook data found</div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onBack} className="flex items-center">
          ← Back to folder view
        </Button>
        <h2 className="text-xl font-semibold">{notebookPath.split('/').pop()}</h2>
      </div>

      <div className="space-y-6">
        {notebook.cells?.map((cell: any, index: number) => (
          <Card key={index} className="border-border">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium">
                  {cell.cell_type === 'code' ? 'Code' : 'Markdown'} Cell {index + 1}
                </CardTitle>
                <Badge variant={cell.cell_type === 'code' ? 'default' : 'secondary'}>
                  {cell.cell_type}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {cell.cell_type === 'code' ? (
                <CodeBlock code={cell.source} language="python" />
              ) : (
                <div className="prose prose-sm max-w-none dark:prose-invert">
                  {cell.source.split('\n').map((line: string, i: number) => (
                    <p key={i} className="text-foreground">{line}</p>
                  ))}
                </div>
              )}
              
              {cell.outputs && cell.outputs.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold text-muted-foreground">Output:</h4>
                  {cell.outputs.map((output: any, outputIndex: number) => (
                    <div key={outputIndex} className="bg-muted/50 border border-border p-3 rounded text-sm">
                      {output.text && (
                        <pre className="text-foreground">
                          {Array.isArray(output.text) ? output.text.join('') : output.text}
                        </pre>
                      )}
                      {output.data?.['text/plain'] && (
                        <pre className="text-foreground">
                          {Array.isArray(output.data['text/plain']) 
                            ? output.data['text/plain'].join('') 
                            : output.data['text/plain']}
                        </pre>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
