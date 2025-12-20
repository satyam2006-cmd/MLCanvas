'use client';

import { useContext } from 'react';
import { CsvDataContext } from '@/contexts/csv-data-context';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardDescription } from '@/components/ui/card';

export function DataExplorer() {
  const { csvData, headers } = useContext(CsvDataContext);

  if (csvData.length === 0) {
    return (
      <Card className="h-64 flex items-center justify-center">
        <CardContent className="text-center">
          <p className="text-muted-foreground">Upload a CSV file to explore your data</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {headers.map((header) => (
                <TableHead key={header} className="font-medium">
                  {header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {csvData.slice(0, 5).map((row, i) => (
              <TableRow key={i}>
                {headers.map((header) => (
                  <TableCell key={`${i}-${header}`} className="text-sm">
                    {String(row[header] ?? '')}
                  </TableCell>
                ))}
              </TableRow>
            ))}
            {csvData.length > 5 && (
              <TableRow>
                <TableCell colSpan={headers.length} className="text-center text-sm text-muted-foreground">
                  Showing 5 of {csvData.length} rows
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-4">
            <div className="text-2xl font-bold">{csvData.length}</div>
            <CardDescription>Total Rows</CardDescription>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="text-2xl font-bold">{headers.length}</div>
            <CardDescription>Features</CardDescription>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="text-2xl font-bold">
              {new Set(csvData.map(row => row[headers[0]])).size}
            </div>
            <CardDescription>Unique in {headers[0]}</CardDescription>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
