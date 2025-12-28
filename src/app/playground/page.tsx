
"use client";

import { CsvUploader } from "@/components/dashboard/csv-uploader";
import { TrainingLab } from "@/components/dashboard/training-lab";
import { DataPreprocessing } from "@/components/dashboard/data-preprocessing";
import { CsvDataProvider } from "@/contexts/csv-data-context";
import { PreprocessingProvider } from "@/contexts/preprocessing-context";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

function PlaygroundTabs() {
  return (
    <Tabs defaultValue="preprocess" className="w-full space-y-4">
      <TabsList className="grid w-full grid-cols-2 max-w-md">
        <TabsTrigger value="preprocess">Preprocess Data</TabsTrigger>
        <TabsTrigger value="train">Model Training</TabsTrigger>
      </TabsList>
      
      <TabsContent value="preprocess" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Dataset Preprocessing</CardTitle>
            <CardDescription>
              Upload and preprocess your dataset for machine learning
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <CsvUploader />
            <div className="mt-4">
              <DataPreprocessing />
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="train">
        <TrainingLab />
      </TabsContent>
    </Tabs>
  );
}

export default function PlaygroundPage() {
  return (
    <CsvDataProvider>
      <PreprocessingProvider>
        <div className="container mx-auto py-6 space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">ML Playground</h1>
            <p className="text-muted-foreground">
              Preprocess your data and train machine learning models
            </p>
          </div>
          
          <PlaygroundTabs />
        </div>
      </PreprocessingProvider>
    </CsvDataProvider>
  );
}
