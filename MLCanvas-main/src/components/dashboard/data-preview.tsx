"use client";
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
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Skeleton } from "../ui/skeleton";
import { useContext, useState } from "react";
import { CsvDataContext } from "@/contexts/csv-data-context";
import { usePreprocessing } from "@/contexts/preprocessing-context";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import { X } from "lucide-react";

interface DataPreviewProps {
  onSelectColumns?: (columns: Record<string, boolean>) => void;
  onDropColumn?: (column: string) => void;
  onSelectTarget?: (column: string) => void;
  targetColumn?: string;
  showControls?: boolean;
}

export function DataPreview({
  onSelectColumns,
  onDropColumn,
  onSelectTarget,
  targetColumn,
  showControls = true,
}: DataPreviewProps) {
  const {
    csvData,
    fileName,
    isLoading,
    isUploading,
    setCsvData,
    setTargetVariable,
  } = useContext(CsvDataContext);
  const {
    setSelectedColumns: setGlobalSelectedColumns,
    setTargetColumn: setGlobalTarget,
  } = usePreprocessing();
  const [selectedColumns, setSelectedColumns] = useState<
    Record<string, boolean>
  >({});

  const dataPreview = csvData.slice(0, 5);
  const headers = dataPreview.length > 0 ? Object.keys(dataPreview[0]) : [];

  const toggleColumn = (header: string) => {
    const newSelection = {
      ...selectedColumns,
      [header]: !selectedColumns[header],
    };
    setSelectedColumns(newSelection);
    onSelectColumns?.(newSelection);
  };

  const handleSetTarget = (header: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onSelectTarget?.(header);
    try {
      setTargetVariable?.(header);
      setGlobalTarget(header);
    } catch (err) {
      console.error("Failed to set target in global context", err);
    }
  };

  const handleDropColumn = (header: string, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      // Remove column from each row and update shared CSV data
      if (csvData && csvData.length > 0) {
        const newData = csvData.map((row) => {
          const copy = { ...row } as Record<string, any>;
          delete copy[header];
          return copy;
        });
        setCsvData(newData as any[]);
      }

      // Update local and global selected columns
      const newSelection = { ...selectedColumns };
      delete newSelection[header];
      setSelectedColumns(newSelection);
      setGlobalSelectedColumns(newSelection);

      // If user dropped the current target, clear it
      if (targetColumn === header) {
        setTargetVariable?.("");
        setGlobalTarget("");
      }

      onDropColumn?.(header);
    } catch (err) {
      console.error("Failed to drop column", header, err);
    }
  };

  const showSkeleton = isLoading || isUploading;

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="font-headline">
          {showControls ? "Data Preview & Selection" : "Data Preview"}
        </CardTitle>
        <CardDescription>
          {showSkeleton
            ? "Loading..."
            : fileName
              ? `Showing preview for: ${fileName}`
              : "No dataset uploaded yet."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-96">
          {showSkeleton ? (
            <div className="space-y-2">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          ) : dataPreview.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  {headers.map((header) => (
                    <TableHead key={header} className="relative group">
                      <div className="flex items-center space-x-2">
                        {showControls && (
                          <Checkbox
                            checked={!!selectedColumns[header]}
                            onCheckedChange={() => toggleColumn(header)}
                            onClick={(e) => e.stopPropagation()}
                          />
                        )}
                        <span
                          className={`cursor-pointer ${
                            targetColumn === header
                              ? "font-bold text-primary"
                              : ""
                          }`}
                          onClick={(e) =>
                            showControls && handleSetTarget(header, e)
                          }
                        >
                          {header}
                          {targetColumn === header && " (Target)"}
                        </span>
                        {showControls && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={(e) => handleDropColumn(header, e)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        )}
                      </div>
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {dataPreview.map((row, rowIndex) => (
                  <TableRow key={rowIndex}>
                    {headers.map((header) => (
                      <TableCell key={`${rowIndex}-${header}`}>
                        {String(row[header])}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              No data available. Please upload a CSV file.
            </div>
          )}
          <ScrollBar orientation="horizontal" />
        </ScrollArea>

        {showControls && dataPreview.length > 0 && (
          <div className="mt-4 text-sm text-muted-foreground">
            <p>• Select columns to include in the analysis</p>
            <p>• Click on a column header to set it as the target variable</p>
            <p>• Click the X to remove a column</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
