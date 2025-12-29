import { NextRequest, NextResponse } from 'next/server';
import { readNotebookContent, formatNotebookForDisplay } from '@/lib/notebook-explorer';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const path = searchParams.get('path');

    if (!path) {
      return NextResponse.json({ error: 'Path parameter is required' }, { status: 400 });
    }

    const notebookData = readNotebookContent(path);
    if (!notebookData) {
      return NextResponse.json({ error: 'Notebook not found' }, { status: 404 });
    }

    const formattedNotebook = formatNotebookForDisplay(notebookData);
    return NextResponse.json(formattedNotebook);
  } catch (error) {
    console.error('Error loading notebook:', error);
    return NextResponse.json(
      { error: 'Failed to load notebook' },
      { status: 500 }
    );
  }
}
