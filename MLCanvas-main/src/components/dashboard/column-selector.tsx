"use client";

import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CsvDataContext } from "@/contexts/csv-data-context";
import { PreprocessingContext } from "@/contexts/preprocessing-context";
import { useContext } from "react";

interface ColumnInfo {
  name: string;
  type: 'numeric' | 'categorical' | 'id' | 'unknown';
  missing: number;
  unique: number;
  isIdLike: boolean;
}

interface ColumnSelectorProps {
  onPreprocess?: () => void;
}

export function ColumnSelector({ onPreprocess }: ColumnSelectorProps) {
  const { csvData, headers, setTargetVariable, targetVariable } = useContext(CsvDataContext);
  const preprocessingContext = useContext(PreprocessingContext);
  
  if (!preprocessingContext) {
    throw new Error('ColumnSelector must be used within a PreprocessingProvider');
  }
  
  const { setSelectedColumns, setTargetColumn } = preprocessingContext;
  
  // Analyze columns when data changes
  const columnInfo = useMemo<ColumnInfo[]>(() => {
    if (!csvData.length) return [];
    
    return headers.map(header => {
      const values = csvData.map(row => row[header]);
      const nonMissingValues = values.filter(val => val !== null && val !== undefined && val !== '');
      const uniqueValues = new Set(nonMissingValues);
      const missingCount = values.length - nonMissingValues.length;
      const missingPercentage = (missingCount / values.length) * 100;
      
      // Simple type detection
      let type: ColumnInfo['type'] = 'unknown';
      const firstValue = nonMissingValues[0];
      
      if (typeof firstValue === 'number' || !isNaN(Number(firstValue))) {
        type = 'numeric';
      } else if (typeof firstValue === 'string') {
        type = 'categorical';
      }
      
      // Detect ID-like columns
      const isIdLike = 
        header.toLowerCase().includes('id') || 
        header.toLowerCase().includes('index') ||
        uniqueValues.size === values.length ||
        (uniqueValues.size / values.length > 0.9 && type === 'categorical');
      
      return {
        name: header,
        type,
        missing: parseFloat(missingPercentage.toFixed(1)),
        unique: uniqueValues.size,
        isIdLike
      };
    });
  }, [csvData, headers]);
  
  const [localSelectedColumns, setLocalSelectedColumns] = useState<Record<string, boolean>>(
    () => {
      const initial: Record<string, boolean> = {};
      columnInfo.forEach(col => {
        initial[col.name] = !col.isIdLike; // Auto-deselect ID-like columns
      });
      return initial;
    }
  );
  
  const handleColumnToggle = (columnName: string) => {
    const newSelectedColumns = {
      ...localSelectedColumns,
      [columnName]: !localSelectedColumns[columnName]
    };
    setLocalSelectedColumns(newSelectedColumns);
  };
  
  const handleTargetSelect = (columnName: string) => {
    setTargetVariable(columnName);
  };
  
  const handlePreprocess = async () => {
    try {
      console.log('[ColumnSelector] Starting preprocessing...');
      
      // Ensure we have a target variable
      if (!targetVariable) {
        throw new Error('Please select a target column');
      }
      
      // Ensure at least one column is selected
      const selectedCount = Object.values(localSelectedColumns).filter(Boolean).length;
      if (selectedCount === 0) {
        throw new Error('Please select at least one feature column');
      }
      
      console.log('[ColumnSelector] Updating context with:', {
        selectedColumns: localSelectedColumns,
        targetColumn: targetVariable
      });
      
      // Update the context state
      setSelectedColumns(localSelectedColumns);
      setTargetColumn(targetVariable);
      
      // Add a small delay to ensure state updates before calling onPreprocess
      setTimeout(() => {
        if (onPreprocess) {
          console.log('[ColumnSelector] Calling onPreprocess callback');
          onPreprocess();
        }
      }, 100);
      
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Unknown error during preprocessing';
      console.error('[ColumnSelector] Error:', errorMsg, error);
      
      // Show error to user
      if (typeof window !== 'undefined') {
        alert(`Error: ${errorMsg}`);
      }
    }
  };
  
  if (!csvData || !csvData.length) return null;
  
  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle>Dataset Preview</CardTitle>
        <CardDescription>
          Review and select columns to include in the analysis. ID-like columns are unchecked by default.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="max-h-[500px] overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Include</TableHead>
                <TableHead>Column Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Missing</TableHead>
                <TableHead>Unique</TableHead>
                <TableHead>Target</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {columnInfo.map((col) => (
                <TableRow key={col.name}>
                  <TableCell>
                    <Checkbox
                      checked={localSelectedColumns[col.name] || false}
                      onCheckedChange={() => handleColumnToggle(col.name)}
                      disabled={col.name === targetVariable}
                    />
                  </TableCell>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      {col.name}
                      {col.isIdLike && (
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Badge variant="outline">ID-like</Badge>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>This column appears to be an ID or unique identifier.</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {col.type}
                    </Badge>
                  </TableCell>
                  <TableCell>{col.missing}%</TableCell>
                  <TableCell>{col.unique}</TableCell>
                  <TableCell>
                    <Button
                      variant={targetVariable === col.name ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleTargetSelect(col.name)}
                      disabled={!localSelectedColumns[col.name]}
                    >
                      {targetVariable === col.name ? "Selected" : "Select"}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        <div className="mt-4 flex justify-between items-center">
          <div className="text-sm text-muted-foreground">
            Selected {Object.values(localSelectedColumns).filter(Boolean).length} of {headers.length} columns
          </div>
          <Button 
            onClick={handlePreprocess}
            disabled={!targetVariable || !Object.values(localSelectedColumns).some(Boolean) || !onPreprocess}
          >
            Process Dataset
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
