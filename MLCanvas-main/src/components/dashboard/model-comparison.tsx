'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '../ui/button';
import { BarChart, LoaderCircle } from 'lucide-react';
import React, { useContext } from 'react';
import { trainModelAction } from '@/app/dashboard/actions';
import { useToast } from '@/hooks/use-toast';
import { CsvDataContext } from '@/contexts/csv-data-context';

type TrainingOptions = {
  modelType: string;
  learningRate: number;
  epochs: number;
  trainTestSplit: number;
  k: number;
  maxDepth: number;
  nEstimators: number;
};

type ModelComparisonProps = {
  trainingOptions: TrainingOptions;
};

type ModelResult = {
  name: string;
  metricName: string; // e.g., "Accuracy" or "R-Squared"
  metricValue: number;
  lossName: string; // e.g., "Final Loss" or "MSE"
  lossValue: number;
};

const MODELS_TO_COMPARE = ['logistic', 'linear', 'knn', 'dt'];

export function ModelComparison({
  trainingOptions,
}: ModelComparisonProps) {
  const { csvData, targetVariable } = useContext(CsvDataContext);
  const [results, setResults] = React.useState<ModelResult[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const { toast } = useToast();

  const handleTrainAll = async () => {
    if (!csvData.length || !targetVariable) {
        toast({
            variant: "destructive",
            title: "Cannot Train Models",
            description: "Please ensure data is uploaded and a target variable is selected."
        });
        return;
    }
    setIsLoading(true);
    setResults([]);

    const allResults: ModelResult[] = [];

    for (const modelType of MODELS_TO_COMPARE) {
      const result = await trainModelAction(csvData, targetVariable, {
        ...trainingOptions,
        modelType: modelType,
        trainTestSplit: trainingOptions.trainTestSplit / 100
      });

      if (result.success && result.accuracy && result.loss) {
        let metricName = "Accuracy";
        let lossName = "Final Loss";
        if (modelType === 'linear') {
            metricName = "R-Squared";
            lossName = "MSE";
        }
        if (['knn', 'dt'].includes(modelType)) {
            metricName = "Accuracy";
            lossName = "Classification Error";
        }


        allResults.push({
          name: modelType,
          metricName,
          metricValue: result.accuracy,
          lossName,
          lossValue: result.loss[result.loss.length - 1], // Final loss
        });
      } else {
        toast({
          variant: 'destructive',
          title: `Failed to train ${modelType}`,
          description: result.error,
        });
      }
    }
    
    // Sort by primary metric (accuracy/r-squared) descending
    allResults.sort((a, b) => b.metricValue - a.metricValue);
    setResults(allResults);
    setIsLoading(false);
  };

  const getModelDisplayName = (modelType: string) => {
    switch(modelType) {
      case 'logistic': return 'Logistic Regression';
      case 'linear': return 'Linear Regression';
      case 'knn': return 'K-Nearest Neighbors';
      case 'dt': return 'Decision Tree';
      default: return modelType;
    }
  }


  return (
    <div className="space-y-4">
      <div className="flex justify-center">
        <Button onClick={handleTrainAll} disabled={isLoading}>
          {isLoading ? (
            <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <BarChart className="mr-2 h-4 w-4" />
          )}
          Train & Compare All Models
        </Button>
      </div>

      {results.length > 0 && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Rank</TableHead>
              <TableHead>Model</TableHead>
              <TableHead className="text-right">Accuracy / R²</TableHead>
              <TableHead className="text-right">Loss / MSE</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {results.map((res, index) => (
              <TableRow key={res.name} className={index === 0 ? "bg-secondary" : ""}>
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell>{getModelDisplayName(res.name)}</TableCell>
                <TableCell className="text-right font-mono">
                  {res.metricValue.toFixed(4)}
                </TableCell>
                <TableCell className="text-right font-mono">
                  {res.lossValue.toFixed(4)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
