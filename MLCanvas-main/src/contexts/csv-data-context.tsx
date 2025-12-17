
'use client';

import React, { createContext, useState, ReactNode, useMemo, useEffect } from 'react';
import type { CsvData } from '@/lib/preprocessing-service';

interface CsvDataContextProps {
  csvData: CsvData;
  setCsvData: React.Dispatch<React.SetStateAction<CsvData>>;
  fileName: string;
  setFileName: React.Dispatch<React.SetStateAction<string>>;
  isLoading: boolean;
  isUploading: boolean;
  setIsUploading: React.Dispatch<React.SetStateAction<boolean>>;
  targetVariable: string;
  setTargetVariable: React.Dispatch<React.SetStateAction<string>>;
  headers: string[];
  numericFeatures: string[];
  categoricalFeatures: string[];

  // State for trained model
  coefficients: Record<string, number> | null;
  setCoefficients: React.Dispatch<React.SetStateAction<Record<string, number> | null>>;
  featureNames: string[];
  setFeatureNames: React.Dispatch<React.SetStateAction<string[]>>;
  modelType: string | null;
  setModelType: React.Dispatch<React.SetStateAction<string | null>>;
}

export const CsvDataContext = createContext<CsvDataContextProps>({
  csvData: [],
  setCsvData: () => {},
  fileName: '',
  setFileName: () => {},
  isLoading: true,
  isUploading: false,
  setIsUploading: () => {},
  targetVariable: '',
  setTargetVariable: () => {},
  headers: [],
  numericFeatures: [],
  categoricalFeatures: [],
  coefficients: null,
  setCoefficients: () => {},
  featureNames: [],
  setFeatureNames: () => {},
  modelType: null,
  setModelType: () => {},
});

// Create a custom hook to use the CSV data context
export const useCsvData = () => {
  const context = React.useContext(CsvDataContext);
  if (context === undefined) {
    throw new Error('useCsvData must be used within a CsvDataProvider');
  }
  return context;
};

export const CsvDataProvider = ({ children }: { children: ReactNode }) => {
  const [csvData, setCsvData] = useState<CsvData>([]);
  const [fileName, setFileName] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [targetVariable, setTargetVariable] = useState('');
  const [coefficients, setCoefficients] = useState<Record<string, number> | null>(null);
  const [featureNames, setFeatureNames] = useState<string[]>([]);
  const [modelType, setModelType] = useState<string | null>(null);
  
  const isLoading = csvData.length === 0 && !fileName && !isUploading;

  const { headers, numericFeatures, categoricalFeatures } = useMemo(() => {
    if (!csvData || csvData.length === 0) {
      return { headers: [], numericFeatures: [], categoricalFeatures: [] };
    }

    const sample = csvData[0];
    const headers = Object.keys(sample);
    const numeric: string[] = [];
    const categorical: string[] = [];

    for (const header of headers) {
      if (typeof sample[header] === "number") {
        numeric.push(header);
      } else {
        categorical.push(header);
      }
    }

    return { headers, numericFeatures: numeric, categoricalFeatures: categorical };
  }, [csvData]);
  
  // Reset processing state when data or target changes
  useEffect(() => {
    setCoefficients(null);
    setFeatureNames([]);
    setModelType(null);
  }, [csvData, targetVariable]);


  const value = {
    csvData,
    setCsvData,
    fileName,
    setFileName,
    isLoading,
    isUploading,
    setIsUploading,
    targetVariable,
    setTargetVariable,
    headers,
    numericFeatures,
    categoricalFeatures,
    coefficients,
    setCoefficients,
    featureNames,
    setFeatureNames,
    modelType,
    setModelType,
  }

  return (
    <CsvDataContext.Provider value={value}>
      {children}
    </CsvDataContext.Provider>
  );
};
