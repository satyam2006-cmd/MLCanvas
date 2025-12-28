
"use client";

import React, { useContext } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { CsvDataContext } from "@/contexts/csv-data-context";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { CheckCircle2, Bot } from "lucide-react";

export function PreprocessingSettings() {
  const { 
    headers, 
    targetVariable, 
    setTargetVariable, 
    numericFeatures, 
    categoricalFeatures,
    csvData,
  } = useContext(CsvDataContext);

  const hasDataAndTarget = csvData.length > 0 && targetVariable;

  const numericInputFeatures = numericFeatures.filter(f => f !== targetVariable);
  const categoricalInputFeatures = categoricalFeatures.filter(f => f !== targetVariable);

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="font-headline">Preprocessing</CardTitle>
        <CardDescription>
          Configure the data for model training.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label>Target Variable (y)</Label>
          <Select onValueChange={setTargetVariable} value={targetVariable} disabled={headers.length === 0}>
            <SelectTrigger>
              <SelectValue placeholder="Select the column to predict" />
            </SelectTrigger>
            <SelectContent>
              {headers.map((header) => (
                <SelectItem key={header} value={header}>
                  {header}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {hasDataAndTarget && (
           <Alert className="border-blue-500 text-blue-700 dark:border-blue-600 dark:text-blue-500">
             <Bot className="h-4 w-4 !text-blue-500" />
             <AlertTitle className="font-semibold">Preprocessing is Automated</AlertTitle>
             <AlertDescription>
               Data is now automatically cleaned, encoded, and scaled just-in-time based on the selected model.
             </AlertDescription>
           </Alert>
        )}

        <Separator />
        
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium">Automatic Feature Type Detection</h4>
            <p className="text-sm text-muted-foreground">
              Input features are categorized based on their data type.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Numerical Features</Label>
              <ScrollArea className="h-24 rounded-md border p-2">
                <div className="flex flex-wrap gap-2">
                {numericInputFeatures.length > 0 ? numericInputFeatures.map((feat) => (
                  <Badge key={feat} variant="secondary">{feat}</Badge>
                )) : <p className="text-xs text-muted-foreground">None detected</p>}
                </div>
              </ScrollArea>
            </div>
            <div className="space-y-2">
              <Label>Categorical Features</Label>
               <ScrollArea className="h-24 rounded-md border p-2">
                <div className="flex flex-wrap gap-2">
                  {categoricalInputFeatures.length > 0 ? categoricalInputFeatures.map((feat) => (
                    <Badge key={feat} variant="outline">{feat}</Badge>
                  )) : <p className="text-xs text-muted-foreground">None detected</p>}
                </div>
              </ScrollArea>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
