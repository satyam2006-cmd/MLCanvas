
'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { CsvData, ProcessedData } from '@/lib/preprocessing-service';

type ProcessedDataPreviewProps = {
  processedData: ProcessedData;
};

export function ProcessedDataPreview({
  processedData,
}: ProcessedDataPreviewProps) {
  const { X, y, featureNames } = processedData;

  const previewRows = X.slice(0, 5);

  return (
    <ScrollArea className="h-64">
      <Table>
        <TableHeader className="sticky top-0 bg-card">
          <TableRow>
            {featureNames.map((header) => (
              <TableHead key={header} className="text-xs">
                {header}
              </TableHead>
            ))}
            <TableHead key="target" className="text-xs font-bold text-primary">
              Target (y)
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {previewRows.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <TableCell key={`${rowIndex}-${cellIndex}`} className="font-mono text-xs">
                  {cell.toFixed(3)}
                </TableCell>
              ))}
              <TableCell key={`${rowIndex}-target`} className="font-semibold font-mono text-xs">
                {y[rowIndex]}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
