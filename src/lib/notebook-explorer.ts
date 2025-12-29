import fs from 'fs';
import path from 'path';

export interface NotebookFile {
  name: string;
  path: string;
  type: 'file' | 'directory';
  children?: NotebookFile[];
  content?: string;
}

export function getDirectoryStructure(dirPath: string, relativePath = ''): NotebookFile[] {
  try {
    const items = fs.readdirSync(dirPath, { withFileTypes: true });
    
    return items
      .map(item => {
        const fullPath = path.join(dirPath, item.name);
        const itemRelativePath = relativePath ? path.join(relativePath, item.name) : item.name;
        
        if (item.isDirectory()) {
          return {
            name: item.name,
            path: itemRelativePath,
            type: 'directory',
            children: getDirectoryStructure(fullPath, itemRelativePath)
          };
        } else if (item.name.endsWith('.ipynb')) {
          return {
            name: item.name,
            path: itemRelativePath,
            type: 'file'
          };
        }
        return null;
      })
      .filter((item): item is NotebookFile => item !== null)
      .sort((a, b) => {
        // Directories first, then files
        if (a.type !== b.type) {
          return a.type === 'directory' ? -1 : 1;
        }
        return a.name.localeCompare(b.name);
      });
  } catch (error) {
    console.error(`Error reading directory ${dirPath}:`, error);
    return [];
  }
}

export function readNotebookContent(notebookPath: string): any {
  try {
    const fullPath = path.join(process.cwd(), notebookPath);
    const content = fs.readFileSync(fullPath, 'utf-8');
    return JSON.parse(content);
  } catch (error) {
    console.error(`Error reading notebook ${notebookPath}:`, error);
    return null;
  }
}

export function formatNotebookForDisplay(notebookData: any): { cells: any[], metadata: any } {
  if (!notebookData || !notebookData.cells) {
    return { cells: [], metadata: {} };
  }

  return {
    cells: notebookData.cells.map((cell: any) => ({
      cell_type: cell.cell_type,
      source: Array.isArray(cell.source) ? cell.source.join('') : cell.source || '',
      outputs: cell.outputs || [],
      metadata: cell.metadata || {}
    })),
    metadata: notebookData.metadata || {}
  };
}
