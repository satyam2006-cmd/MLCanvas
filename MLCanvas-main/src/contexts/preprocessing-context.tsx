"use client";

import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { CsvData, preprocessDataset } from '@/lib/preprocessing-service';
import { useToast } from '../components/ui/use-toast';

interface PreprocessingContextType {
  // State
  isPreprocessing: boolean;
  processedData: CsvData | null;
  preprocessingSummary: any; // You might want to create a more specific type
  selectedColumns: Record<string, boolean>;
  targetColumn: string;
  
  // Actions
  setSelectedColumns: (columns: Record<string, boolean>) => void;
  setTargetColumn: (column: string) => void;
  preprocessData: (data: CsvData) => Promise<void>;
  resetPreprocessing: () => void;
  downloadProcessedData: () => void;
}

export const PreprocessingContext = createContext<PreprocessingContextType | undefined>(undefined);

export function PreprocessingProvider({ children }: { children: ReactNode }) {
  const [isPreprocessing, setIsPreprocessing] = useState(false);
  const [processedData, setProcessedData] = useState<CsvData | null>(null);
  const [preprocessingSummary, setPreprocessingSummary] = useState<any>(null);
  const [selectedColumns, setSelectedColumns] = useState<Record<string, boolean>>({});
  const [targetColumn, setTargetColumn] = useState<string>('');
  const { toast } = useToast();

  const preprocessData = useCallback(async (data: CsvData) => {
    console.log('[Preprocessing] Starting data preprocessing', {
      dataLength: data.length,
      selectedColumns: Object.keys(selectedColumns).filter(k => selectedColumns[k]),
      targetColumn
    });

    if (!data || !data.length) {
      const errorMsg = 'No data to preprocess';
      console.error('[Preprocessing] Error:', errorMsg);
      toast({
        title: 'Error',
        description: errorMsg,
        variant: 'destructive',
      });
      return { processedData: [], summary: null };
    }

    if (!targetColumn) {
      const errorMsg = 'Please select a target column';
      console.error('[Preprocessing] Error:', errorMsg);
      toast({
        title: 'Error',
        description: errorMsg,
        variant: 'destructive',
      });
      return { processedData: [], summary: null };
    }

    // Ensure target column is included in selected columns
    const updatedSelectedColumns = { ...selectedColumns, [targetColumn]: true };
    setSelectedColumns(updatedSelectedColumns);

    setIsPreprocessing(true);
    
    try {
      console.log('[Preprocessing] Starting dataset preprocessing...');
      const { processedData, summary } = preprocessDataset(
        data,
        updatedSelectedColumns,
        targetColumn
      );

      console.log('[Preprocessing] Preprocessing completed:', {
        processedDataLength: processedData.length,
        summary,
        columns: Object.keys(processedData[0] || {})
      });

      if (!processedData || !processedData.length) {
        throw new Error('No data returned after preprocessing');
      }

      // Update state in a single batch
      setProcessedData(processedData);
      setPreprocessingSummary(summary);

      toast({
        title: 'Success',
        description: `Processed data with ${processedData.length} rows and ${summary.processedColumns} columns`,
      });

      return { processedData, summary };
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Unknown error during preprocessing';
      console.error('[Preprocessing] Error:', errorMsg, error);
      
      // Reset state on error
      setProcessedData([]);
      setPreprocessingSummary(null);
      
      toast({
        title: 'Error',
        description: `Failed to process data: ${errorMsg}`,
        variant: 'destructive',
      });
      
      return { processedData: [], summary: null };
    } finally {
      setIsPreprocessing(false);
    }
  }, [selectedColumns, targetColumn, toast]);

  const resetPreprocessing = useCallback(() => {
    setProcessedData(null);
    setPreprocessingSummary(null);
    setSelectedColumns({});
    setTargetColumn('');
  }, []);

  const downloadProcessedData = useCallback(() => {
    if (!processedData || !processedData.length) {
      toast({
        title: 'Error',
        description: 'No processed data available to download',
        variant: 'destructive',
      });
      return;
    }
    
    try {
      // Convert processed data to CSV
      const headers = Object.keys(processedData[0] || {});
      const csvRows = [
        headers.join(','),
        ...processedData.map(row => 
          headers.map(fieldName => 
            JSON.stringify(row[fieldName] ?? '')
          ).join(',')
        )
      ];
      
      const csvContent = csvRows.join('\n');
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', 'processed_dataset.csv');
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast({
        title: 'Success',
        description: 'Dataset downloaded successfully',
      });
    } catch (error) {
      console.error('Error downloading data:', error);
      toast({
        title: 'Error',
        description: 'Failed to download processed data',
        variant: 'destructive',
      });
    }
  }, [processedData, toast]);

  return (
    <PreprocessingContext.Provider
      value={{
        isPreprocessing,
        processedData,
        preprocessingSummary,
        selectedColumns,
        targetColumn,
        setSelectedColumns,
        setTargetColumn,
        preprocessData,
        resetPreprocessing,
        downloadProcessedData,
      }}
    >
      {children}
    </PreprocessingContext.Provider>
  );
}

export function usePreprocessing() {
  const context = useContext(PreprocessingContext);
  if (context === undefined) {
    throw new Error('usePreprocessing must be used within a PreprocessingProvider');
  }
  return context;
}
