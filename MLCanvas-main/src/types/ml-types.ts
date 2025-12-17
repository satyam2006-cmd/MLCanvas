import { CsvData } from '@/lib/preprocessing-service';

export interface ColumnStats {
  type: 'numeric' | 'categorical';
  min?: number;
  max?: number;
  mean?: number;
  uniqueValues: number;
  missing: number;
  topValues?: Array<{ value: string; count: number }>;
}

export interface PreprocessingSummary {
  originalFeatures: string[];
  selectedFeatures: string[];
  target: string;
  trainSamples: number;
  testSamples: number;
  featureCount: number;
  preprocessingSteps: string[];
}

export interface ModelRecommendation {
  name: string;
  description: string;
  code: string;
}

export interface PreprocessedData {
  X_train: any[];
  X_test: any[];
  y_train: any[];
  y_test: any[];
  featureNames: string[];
  targetName: string;
  encoders: Record<string, any>;
  scalers: Record<string, any>;
  columnTypes: Record<string, string>;
}

export interface PreprocessingContextType {
  isPreprocessing: boolean;
  processedData: CsvData | null;
  preprocessedData: PreprocessedData | null;
  preprocessingSummary: PreprocessingSummary | null;
  selectedColumns: Record<string, boolean>;
  targetColumn: string;
  columnTypes: Record<string, string>;
  modelRecommendations: ModelRecommendation[];
  preprocessingSteps: string[];
  downloadUrl: string | null;
  isPreprocessingComplete: boolean;
  
  // Actions
  setSelectedColumns: (columns: Record<string, boolean>) => void;
  setTargetColumn: (column: string) => void;
  preprocessData: (data: CsvData) => Promise<void>;
  resetPreprocessing: () => void;
  downloadProcessedData: () => void;
  dropColumn: (columnName: string) => void;
  getColumnStats: (data: CsvData, column: string) => ColumnStats | null;
  runPreprocessingPipeline: () => Promise<void>;
  generateColabNotebook: () => string;
}
