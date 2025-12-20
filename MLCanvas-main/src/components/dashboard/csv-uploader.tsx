
"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LoaderCircle, Upload, TestTube } from "lucide-react";
import React, { useContext } from "react";
import { useToast } from "@/hooks/use-toast";
import { CsvDataContext } from "@/contexts/csv-data-context";
import Papa from "papaparse";
import { dataPreview } from "@/lib/mock-data";

export function CsvUploader() {
  const { toast } = useToast();
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const { setCsvData, setFileName, isUploading, setIsUploading } = useContext(CsvDataContext);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setFileName(file.name);

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      dynamicTyping: true,
      complete: (results) => {
        setCsvData(results.data as any[]);
        setIsUploading(false);
        toast({
          title: "Upload Successful",
          description: `${file.name} has been parsed.`,
        });
      },
      error: (error: any) => {
        setIsUploading(false);
        toast({
          variant: "destructive",
          title: "Upload Failed",
          description: error.message,
        });
      },
    });
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleLoadSampleData = () => {
    setFileName("bank-marketing-sample.csv");
    setCsvData(dataPreview);
    toast({
      title: "Sample Data Loaded",
      description: "The sample bank marketing dataset is ready for analysis.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">
          Load Your Dataset
        </CardTitle>
        <CardDescription>
          Upload a CSV or use our sample data to begin.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
           <Input
            ref={fileInputRef}
            type="file"
            className="hidden"
            accept=".csv"
            onChange={handleFileChange}
            disabled={isUploading}
          />
          <Button
            className="w-full"
            onClick={handleUploadClick}
            disabled={isUploading}
          >
            {isUploading ? (
              <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Upload className="mr-2 h-4 w-4" />
            )}
            {isUploading ? "Uploading..." : "Upload & Analyze"}
          </Button>
          <Button
            variant="secondary"
            className="w-full"
            onClick={handleLoadSampleData}
            disabled={isUploading}
          >
            <TestTube className="mr-2 h-4 w-4" />
            Load Sample
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
