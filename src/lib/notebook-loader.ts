import fs from 'fs';
import path from 'path';

export interface NotebookCell {
  cell_type: 'code' | 'markdown';
  source: string[];
  outputs?: any[];
}

export interface ParsedNotebook {
  id: string;
  title: string;
  category: string;
  content: string;
  cells: NotebookCell[];
}

export function parseNotebookFromPath(filePath: string, category: string): ParsedNotebook {
  try {
    const notebookData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    const fileName = path.basename(filePath, '.ipynb');
    
    // Extract content from cells
    let content = '';
    const cells: NotebookCell[] = [];
    
    notebookData.cells?.forEach((cell: any) => {
      const cellContent = Array.isArray(cell.source) 
        ? cell.source.join('') 
        : cell.source || '';
      
      cells.push({
        cell_type: cell.cell_type,
        source: Array.isArray(cell.source) ? cell.source : [cell.source],
        outputs: cell.outputs
      });
      
      if (cell.cell_type === 'markdown') {
        content += cellContent + '\n\n';
      } else if (cell.cell_type === 'code') {
        content += '```python\n' + cellContent + '\n```\n\n';
        
        // Add outputs if they exist
        if (cell.outputs && cell.outputs.length > 0) {
          content += '**Output:**\n```\n';
          cell.outputs.forEach((output: any) => {
            if (output.text) {
              const text = Array.isArray(output.text) ? output.text.join('') : output.text;
              content += text;
            } else if (output.data) {
              if (output.data['text/plain']) {
                const text = Array.isArray(output.data['text/plain']) 
                  ? output.data['text/plain'].join('') 
                  : output.data['text/plain'];
                content += text;
              }
            }
          });
          content += '\n```\n\n';
        }
      }
    });
    
    // Create a title from filename
    const title = fileName
      .replace(/^\d+\.\s*/, '') // Remove leading numbers and dots
      .replace(/_/g, ' ') // Replace underscores with spaces
      .replace(/\b\w/g, l => l.toUpperCase()); // Capitalize first letter of each word
    
    return {
      id: fileName.replace(/\s+/g, '-').toLowerCase(),
      title,
      category,
      content: content.trim(),
      cells
    };
  } catch (error) {
    console.error(`Error parsing notebook ${filePath}:`, error);
    throw error;
  }
}

export function loadAllNotebooks(): ParsedNotebook[] {
  const notebooksDir = path.join(process.cwd(), 'Machine-Learning-Notebooks-master');
  const notebooks: ParsedNotebook[] = [];
  
  try {
    const categories = fs.readdirSync(notebooksDir, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);
    
    categories.forEach(category => {
      const categoryPath = path.join(notebooksDir, category);
      const files = fs.readdirSync(categoryPath)
        .filter(file => file.endsWith('.ipynb'));
      
      files.forEach(file => {
        const filePath = path.join(categoryPath, file);
        try {
          const notebook = parseNotebookFromPath(filePath, category);
          notebooks.push(notebook);
        } catch (error) {
          console.error(`Failed to load notebook ${file}:`, error);
        }
      });
    });
    
    return notebooks.sort((a, b) => a.title.localeCompare(b.title));
  } catch (error) {
    console.error('Error loading notebooks:', error);
    return [];
  }
}
