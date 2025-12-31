"use client";

import { useState, useMemo } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Info, Eye, Settings, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CsvDataContext } from "@/contexts/csv-data-context";
import { PreprocessingContext } from "@/contexts/preprocessing-context";
import { useContext } from "react";

interface ColumnInfo {
  name: string;
  type: "numeric" | "categorical" | "id" | "unknown";
  missing: number;
  unique: number;
  isIdLike: boolean;
}

interface ColumnSelectorProps {
  onPreprocess?: () => void;
}

export function ColumnSelector({ onPreprocess }: ColumnSelectorProps) {
  const { csvData, headers, setTargetVariable, targetVariable } =
    useContext(CsvDataContext);
  const preprocessingContext = useContext(PreprocessingContext);

  if (!preprocessingContext) {
    throw new Error(
      "ColumnSelector must be used within a PreprocessingProvider",
    );
  }

  const { setSelectedColumns, setTargetColumn } = preprocessingContext;

  // Analyze columns when data changes
  const columnInfo = useMemo<ColumnInfo[]>(() => {
    if (!csvData.length) return [];

    return headers.map((header) => {
      const values = csvData.map((row) => row[header]);
      const nonMissingValues = values.filter(
        (val) => val !== null && val !== undefined && val !== "",
      );
      const uniqueValues = new Set(nonMissingValues);
      const missingCount = values.length - nonMissingValues.length;
      const missingPercentage = (missingCount / values.length) * 100;

      // Simple type detection
      let type: ColumnInfo["type"] = "unknown";
      const firstValue = nonMissingValues[0];

      if (typeof firstValue === "number" || !isNaN(Number(firstValue))) {
        type = "numeric";
      } else if (typeof firstValue === "string") {
        type = "categorical";
      }

      // Detect ID-like columns
      const isIdLike =
        header.toLowerCase().includes("id") ||
        header.toLowerCase().includes("index") ||
        uniqueValues.size === values.length ||
        (uniqueValues.size / values.length > 0.9 && type === "categorical");

      return {
        name: header,
        type,
        missing: parseFloat(missingPercentage.toFixed(1)),
        unique: uniqueValues.size,
        isIdLike,
      };
    });
  }, [csvData, headers]);

  const [localSelectedColumns, setLocalSelectedColumns] = useState<
    Record<string, boolean>
  >(() => {
    const initial: Record<string, boolean> = {};
    columnInfo.forEach((col) => {
      initial[col.name] = !col.isIdLike; // Auto-deselect ID-like columns
    });
    return initial;
  });

  const handleColumnToggle = (columnName: string) => {
    const newSelectedColumns = {
      ...localSelectedColumns,
      [columnName]: !localSelectedColumns[columnName],
    };
    setLocalSelectedColumns(newSelectedColumns);
  };

  const handleTargetSelect = (columnName: string) => {
    setTargetVariable(columnName);
  };

  const handlePreprocess = async () => {
    try {
      // Update the context state
      setSelectedColumns(localSelectedColumns);
      setTargetColumn(targetVariable);

      // Add a small delay to ensure state updates before calling onPreprocess
      setTimeout(() => {
        if (onPreprocess) {
          onPreprocess();
        }
      }, 100);
    } catch (error) {
      const errorMsg =
        error instanceof Error
          ? error.message
          : "Unknown error during preprocessing";
      console.error("[ColumnSelector] Error:", errorMsg, error);

      // Show error to user
      if (typeof window !== "undefined") {
        alert(`Error: ${errorMsg}`);
      }
    }
  };

  const selectedCount =
    Object.values(localSelectedColumns).filter(Boolean).length;

  if (!csvData || !csvData.length) return null;

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle>Data Management</CardTitle>
        <CardDescription>
          Organize your data by reviewing original records, selecting features,
          and setting the target variable.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="original" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="original" className="flex items-center gap-2">
              <Eye className="h-4 w-4" />
              Original Data
            </TabsTrigger>
            <TabsTrigger value="select" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Select Columns
            </TabsTrigger>
            <TabsTrigger value="summary" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Summary
            </TabsTrigger>
          </TabsList>

          {/* Original Data Tab */}
          <TabsContent value="original" className="space-y-4">
            <div className="text-sm text-muted-foreground mb-4">
              Showing first 10 rows of your original dataset
            </div>
            <div className="max-h-[500px] overflow-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    {headers.map((header) => (
                      <TableHead key={header} className="whitespace-nowrap">
                        {header}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {csvData.slice(0, 10).map((row, idx) => (
                    <TableRow key={idx}>
                      {headers.map((header) => (
                        <TableCell key={`${idx}-${header}`} className="text-xs">
                          {String(row[header] ?? "")}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="text-xs text-muted-foreground">
              Total rows: {csvData.length} | Total columns: {headers.length}
            </div>
          </TabsContent>

          {/* Select Columns Tab - Just Target Selection */}
          <TabsContent value="select" className="space-y-4">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Select Target Variable</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Choose which column to use as your target variable for
                  predictions or analysis.
                </p>
              </div>

              <div className="max-h-[450px] overflow-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Column Name</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Missing</TableHead>
                      <TableHead>Unique</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {columnInfo.map((col) => (
                      <TableRow key={col.name}>
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
                                    <p>
                                      This column appears to be an ID or unique
                                      identifier.
                                    </p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{col.type}</Badge>
                        </TableCell>
                        <TableCell>{col.missing}%</TableCell>
                        <TableCell>{col.unique}</TableCell>
                        <TableCell>
                          <Button
                            variant={
                              targetVariable === col.name
                                ? "default"
                                : "outline"
                            }
                            size="sm"
                            onClick={() => handleTargetSelect(col.name)}
                          >
                            {targetVariable === col.name
                              ? "✓ Target"
                              : "Select"}
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-4 border-t">
                <div className="text-sm text-muted-foreground">
                  Target:{" "}
                  <span className="font-semibold">
                    {targetVariable || "Not set"}
                  </span>
                </div>
                <Button
                  onClick={handlePreprocess}
                  disabled={!targetVariable || !onPreprocess}
                  className="w-full sm:w-auto"
                >
                  Process Dataset
                </Button>
              </div>
            </div>
          </TabsContent>

          {/* Summary Tab */}
          <TabsContent value="summary" className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Card className="bg-blue-50">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Total Columns</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{headers.length}</div>
                </CardContent>
              </Card>
              <Card className="bg-green-50">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Target Variable</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-lg font-semibold truncate">
                    {targetVariable || "Not set"}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Column Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {columnInfo.map((col) => (
                    <div
                      key={col.name}
                      className="flex items-center justify-between p-3 bg-muted rounded-lg"
                    >
                      <div className="flex-1">
                        <div className="font-medium">{col.name}</div>
                        <div className="text-xs text-muted-foreground">
                          Type: {col.type} | Missing: {col.missing}% | Unique:{" "}
                          {col.unique}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        {targetVariable === col.name && (
                          <Badge variant="secondary">Target</Badge>
                        )}
                        {col.isIdLike && (
                          <Badge variant="outline">ID-like</Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
