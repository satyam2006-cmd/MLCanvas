import { NextResponse } from 'next/server';
import { getDirectoryStructure } from '@/lib/notebook-explorer';

export async function GET() {
  try {
    const notebooksPath = 'Machine-Learning-Notebooks-master';
    const structure = getDirectoryStructure(notebooksPath);
    return NextResponse.json(structure);
  } catch (error) {
    console.error('Error loading notebook structure:', error);
    return NextResponse.json(
      { error: 'Failed to load notebook structure' },
      { status: 500 }
    );
  }
}
