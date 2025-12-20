"use client";

"use client";

import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CsvData } from "@/lib/preprocessing-service";
import { DataPreview } from "./data-preview";
import { ColumnSelector } from "./column-selector";
import { PreprocessingSummaryCard } from "./preprocessing-summary";
import { usePreprocessing } from "@/contexts/preprocessing-context";
import { useCsvData } from "@/contexts/csv-data-context";
import { Badge } from "@/components/ui/badge";

type DataPreprocessingProps = {
  onProcessed?: (processedData: CsvData) => void;
};

export function DataPreprocessing({ onProcessed }: DataPreprocessingProps) {
  const { csvData } = useCsvData();
  const [activeTab, setActiveTab] = useState('preview');
  const { 
    isPreprocessing, 
    processedData, 
    preprocessingSummary, 
    preprocessData, 
    downloadProcessedData,
    selectedColumns,
    setSelectedColumns,
    targetColumn,
    setTargetColumn,
    resetPreprocessing
  } = usePreprocessing();

  // Initialize selected columns when data changes
  useEffect(() => {
    if (csvData && csvData.length > 0) {
      const columns = Object.keys(csvData[0] || {});
      const initialSelection = columns.reduce((acc, col) => ({
        ...acc,
        [col]: true
      }), {});
      
      setSelectedColumns(initialSelection);
      
      // Auto-select the first column as target if none is selected
      if (columns.length > 0 && !targetColumn) {
        setTargetColumn(columns[0]);
      }
    }
  }, [csvData, setSelectedColumns, setTargetColumn, targetColumn]);

  const handlePreprocess = async () => {
    await preprocessData(csvData);
    setActiveTab('preview'); // Switch to preview to see the processed data
    
    if (onProcessed && processedData) {
      onProcessed(processedData);
    }
  };

  const handleReset = () => {
    resetPreprocessing();
    setActiveTab('preview');
  };

  if (!csvData || !csvData.length) {
    return (
      <Card className="p-6 text-center">
        <p className="text-muted-foreground">
          Upload a dataset to begin preprocessing
        </p>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="preview">
            {processedData ? 'Processed Data' : 'Original Data'}
          </TabsTrigger>
          <TabsTrigger value="columns">
            Select Columns
            {Object.values(selectedColumns).filter(v => !v).length > 0 && (
              <Badge variant="secondary" className="ml-2">
                {Object.values(selectedColumns).filter(v => !v).length} columns hidden
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger 
            value="summary" 
            disabled={!processedData || !preprocessingSummary}
          >
            Summary
          </TabsTrigger>
        </TabsList>

        <TabsContent value="preview" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>
                    {processedData ? 'Processed Dataset' : 'Original Dataset'}
                  </CardTitle>
                  <CardDescription className="mt-1">
                    {processedData 
                      ? 'Showing data after applying column selection and preprocessing.'
                      : 'This is your original dataset. Select columns to include and click "Process Dataset" to continue.'}
                  </CardDescription>
                </div>
                {processedData ? (
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => downloadProcessedData()}
                    >
                      Download Processed Data
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => {
                        resetPreprocessing();
                        setActiveTab('columns');
                      }}
                    >
                      Modify Selection
                    </Button>
                  </div>
                ) : (
                  <Button 
                    onClick={() => setActiveTab('columns')}
                    disabled={!csvData || csvData.length === 0}
                  >
                    Select Columns
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {processedData ? (
                <div className="relative overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        {Object.keys(processedData[0] || {}).map((header) => (
                          <TableHead key={header}>
                            <div className="flex items-center gap-2">
                              {header}
                              {header === targetColumn && (
                                <Badge variant="secondary">Target</Badge>
                              )}
                            </div>
                          </TableHead>
                        ))}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {processedData.slice(0, 10).map((row, i) => (
                        <TableRow key={i}>
                          {Object.values(row).map((value, j) => (
                            <TableCell key={`${i}-${j}`}>
                              {String(value)}
                            </TableCell>
                          ))}
                        </TableRow>
                      ))}
                      {processedData.length > 10 && (
                        <TableRow>
                          <TableCell colSpan={Object.keys(processedData[0] || {}).length} className="text-center text-muted-foreground">
                            Showing 10 of {processedData.length} rows
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <DataPreview data={csvData} />
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="columns">
          <ColumnSelector onPreprocess={handlePreprocess} />
        </TabsContent>

        <TabsContent value="summary">
          {preprocessingSummary && (
            <PreprocessingSummaryCard 
              summary={preprocessingSummary} 
              onDownload={downloadProcessedData}
            />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
