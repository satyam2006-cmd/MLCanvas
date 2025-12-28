
'use client';

import React, { useContext, useEffect, useMemo, useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { CsvDataContext } from '@/contexts/csv-data-context';
import { Lightbulb, LoaderCircle } from 'lucide-react';
import { getModelRecommendationAction } from '@/app/dashboard/actions';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '../ui/skeleton';

// Simple heuristic to determine problem type
const getProblemType = (data: Record<string, any>[], target: string): 'classification' | 'regression' => {
  if (!target || data.length === 0) return 'classification';
  
  const uniqueValues = new Set(data.map(row => row[target]));
  const firstValue = data[0][target];

  // If target is not a number, it's classification
  if(typeof firstValue !== 'number') return 'classification';

  // If it is a number, but has few unique values (e.g., 0/1, or categories represented as numbers)
  if (uniqueValues.size <= 10 && uniqueValues.size / data.length < 0.2) {
    return 'classification';
  }
  
  return 'regression';
};


export function ModelRecommender() {
  const { toast } = useToast();
  const { csvData, targetVariable, numericFeatures, categoricalFeatures } = useContext(CsvDataContext);
  const [recommendation, setRecommendation] = useState<{ model: string; reasoning: string; }[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const analysisContext = useMemo(() => {
    if (!csvData || csvData.length === 0 || !targetVariable) return null;

    const problemType = getProblemType(csvData, targetVariable);
    const featureCount = numericFeatures.length + categoricalFeatures.length;

    return {
      problemType,
      rowCount: csvData.length,
      featureCount,
      numericFeatureCount: numericFeatures.length,
      categoricalFeatureCount: categoricalFeatures.length,
      targetVariable,
    };
  }, [csvData, targetVariable, numericFeatures, categoricalFeatures]);


  useEffect(() => {
    if (!analysisContext) {
      setRecommendation(null);
      return;
    };

    const fetchRecommendation = async () => {
      setIsLoading(true);
      setRecommendation(null);
      try {
        const result = await getModelRecommendationAction(analysisContext);
        if (result.success) {
          // Check if the result has topModels and it's an array
          if ('topModels' in result && Array.isArray(result.topModels)) {
            setRecommendation(result.topModels);
          } else {
            throw new Error('Invalid response format from recommendation service');
          }
        } else {
          throw new Error(result.error || 'Failed to get model recommendation');
        }
      } catch (error) {
        toast({
          variant: 'destructive',
          title: 'Recommendation Failed',
          description: error instanceof Error ? error.message : 'An unknown error occurred',
        });
      }
      setIsLoading(false);
    };

    fetchRecommendation();
  }, [analysisContext, toast]);


  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="font-headline">AI Model Recommender</CardTitle>
        <CardDescription>
          Get an AI-powered recommendation for the best model.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!targetVariable || csvData.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center text-muted-foreground h-48 gap-2">
            <Lightbulb className="w-8 h-8" />
            <p>Upload a dataset and select a target variable in the "Preprocessing" card to get a model recommendation.</p>
          </div>
        ) : isLoading ? (
          <div className="space-y-4">
             <div className="flex items-center justify-center gap-2">
              <LoaderCircle className="h-5 w-5 animate-spin" />
              <span>Analyzing your dataset...</span>
            </div>
            <Skeleton className="h-8 w-1/2" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-3/4" />
          </div>
        ) : recommendation ? (
          <div className="space-y-4">
            <h3 className="font-medium">Recommended Models:</h3>
            <ul className="space-y-3 list-disc pl-5">
              {recommendation.map((item, index) => (
                <li key={index} className="space-y-1">
                  <span className="font-medium">{item.model}:</span>
                  <p className="text-sm text-muted-foreground">{item.reasoning}</p>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}
