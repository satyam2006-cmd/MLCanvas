"use client";

import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";
import { Alert } from "../ui/alert";
import { Info } from "lucide-react";

type ParameterControlsProps = {
  modelType: string;
  setModelType: (value: string) => void;
  learningRate: number;
  setLearningRate: (value: number) => void;
  epochs: number;
  setEpochs: (value: number) => void;
  trainTestSplit: number;
  setTrainTestSplit: (value: number) => void;
  k: number;
  setK: (value: number) => void;
  maxDepth: number;
  setMaxDepth: (value: number) => void;
  nEstimators: number;
  setNEstimators: (value: number) => void;
};


export function ParameterControls({
  modelType,
  setModelType,
  learningRate,
  setLearningRate,
  epochs,
  setEpochs,
  trainTestSplit,
  setTrainTestSplit,
  k,
  setK,
  maxDepth,
  setMaxDepth,
  nEstimators,
  setNEstimators,
}: ParameterControlsProps) {

  const isEpochalTraining = modelType === 'logistic';
  const isKnn = modelType === 'knn';
  const isDecisionTree = modelType === 'dt';
  const isRandomForest = false;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-3">
          <Label>Model Type</Label>
          <Select value={modelType} onValueChange={setModelType}>
            <SelectTrigger>
              <SelectValue placeholder="Select a model" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="logistic">Logistic Regression</SelectItem>
              <SelectItem value="linear">Linear Regression</SelectItem>
              <SelectItem value="knn">K-Nearest Neighbors</SelectItem>
              <SelectItem value="dt">Decision Tree</SelectItem>
            </SelectContent>
          </Select>
        </div>
         <div className="space-y-3">
          <div className="flex justify-between">
            <Label htmlFor="train-test-split">Train/Test Split</Label>
            <span className="text-sm text-muted-foreground font-mono">
              {trainTestSplit}% / {100 - trainTestSplit}%
            </span>
          </div>
          <Slider
            id="train-test-split"
            min={50}
            max={90}
            step={5}
            value={[trainTestSplit]}
            onValueChange={(vals) => setTrainTestSplit(vals[0])}
          />
        </div>
        
        {isKnn && (
          <div className="space-y-3">
            <div className="flex justify-between">
              <Label htmlFor="k-value">Number of Neighbors (K)</Label>
              <span className="text-sm text-muted-foreground font-mono">
                {k}
              </span>
            </div>
            <Slider
              id="k-value"
              min={1}
              max={15}
              step={1}
              value={[k]}
              onValueChange={(vals) => setK(vals[0])}
            />
          </div>
        )}

        {isDecisionTree && (
            <div className="space-y-3">
                <div className="flex justify-between">
                    <Label htmlFor="max-depth">Max Depth</Label>
                    <span className="text-sm text-muted-foreground font-mono">{maxDepth}</span>
                </div>
                <Slider id="max-depth" min={2} max={20} step={1} value={[maxDepth]} onValueChange={v => setMaxDepth(v[0])} />
            </div>
        )}

        {isRandomForest && (
            <div className="space-y-3">
                <div className="flex justify-between">
                    <Label htmlFor="n-estimators">Number of Trees</Label>
                    <span className="text-sm text-muted-foreground font-mono">{nEstimators}</span>
                </div>
                <Slider id="n-estimators" min={10} max={100} step={5} value={[nEstimators]} onValueChange={v => setNEstimators(v[0])} />
            </div>
        )}


        <div className="space-y-3" style={{ opacity: isEpochalTraining ? 1 : 0.5 }}>
          <div className="flex justify-between">
            <Label htmlFor="learning-rate">Learning Rate</Label>
            <span className="text-sm text-muted-foreground font-mono">
              {learningRate.toFixed(3)}
            </span>
          </div>
          <Slider
            id="learning-rate"
            min={0.001}
            max={0.1}
            step={0.001}
            value={[learningRate]}
            onValueChange={(vals) => setLearningRate(vals[0])}
            disabled={!isEpochalTraining}
          />
        </div>
        <div className="space-y-3" style={{ opacity: isEpochalTraining ? 1 : 0.5 }}>
          <div className="flex justify-between">
            <Label htmlFor="epochs">Epochs</Label>
            <span className="text-sm text-muted-foreground font-mono">
              {epochs}
            </span>
          </div>
          <Slider
            id="epochs"
            min={10}
            max={500}
            step={10}
            value={[epochs]}
            onValueChange={(vals) => setEpochs(vals[0])}
            disabled={!isEpochalTraining}
          />
        </div>
      </div>
      {!isEpochalTraining && !isKnn && !isDecisionTree && !isRandomForest && (
        <Alert variant="default" className="mt-4">
            <Info className="h-4 w-4" />
            <div className="font-semibold">Note</div>
            <div>
            Learning Rate and Epochs are specific to iterative models like Logistic Regression and do not apply to Linear Regression.
            </div>
        </Alert>
      )}
       {(isKnn || isDecisionTree || isRandomForest) && (
        <Alert variant="default" className="mt-4">
            <Info className="h-4 w-4" />
            <div className="font-semibold">Note</div>
            <div>
              {isKnn && "K-Nearest Neighbors is a non-parametric model. It makes predictions based on the 'K' closest data points in the training set."}
              {isDecisionTree && "Decision Trees are non-parametric and split data based on feature values to make predictions."}
              {isRandomForest && "Random Forest is an ensemble of Decision Trees. It doesn't use epochs or a single learning rate."}
            </div>
        </Alert>
      )}
    </div>
  );
}
