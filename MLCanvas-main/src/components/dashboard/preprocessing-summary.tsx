"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { PreprocessingSummary } from "@/lib/preprocessing-service";

type PreprocessingSummaryProps = {
  summary: PreprocessingSummary;
  onDownload: () => void;
};

export function PreprocessingSummaryCard({ summary, onDownload }: PreprocessingSummaryProps) {
  const formatNumber = (num: number) => num.toLocaleString();

  return (
    <Card className="mt-6">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Preprocessing Summary</CardTitle>
            <CardDescription>
              Overview of the preprocessing steps applied to your dataset
            </CardDescription>
          </div>
          <Button onClick={onDownload} size="sm" className="gap-2">
            <Download className="h-4 w-4" />
            Download Processed Data
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Dataset Overview */}
        <div>
          <h3 className="font-medium mb-2">Dataset Overview</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard 
              title="Original Rows" 
              value={formatNumber(summary.originalRows)}
              description="Total rows before preprocessing"
            />
            <StatCard 
              title="Processed Rows" 
              value={formatNumber(summary.processedRows)}
              description={`${((summary.processedRows / summary.originalRows) * 100).toFixed(1)}% of original`}
              change={summary.processedRows < summary.originalRows ? 'decrease' : 'none'}
            />
            <StatCard 
              title="Original Columns" 
              value={formatNumber(summary.originalColumns)}
              description="Total columns before preprocessing"
            />
            <StatCard 
              title="Processed Columns" 
              value={formatNumber(summary.processedColumns)}
              description={`${((summary.processedColumns / summary.originalColumns) * 100).toFixed(1)}% of original`}
              change={summary.processedColumns < summary.originalColumns ? 'decrease' : 'none'}
            />
          </div>
        </div>

        {/* Problem Type */}
        {summary.problemType && (
          <div>
            <h3 className="font-medium mb-2">Problem Type</h3>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-sm font-mono">
                {summary.problemType}
              </Badge>
              <span className="text-sm text-muted-foreground">
                {summary.problemType === 'regression' 
                  ? 'Continuous target variable detected' 
                  : summary.problemType === 'binary' 
                    ? 'Binary classification problem' 
                    : 'Multi-class classification problem'}
              </span>
            </div>
          </div>
        )}

        {/* Dropped Columns */}
        {summary.droppedColumns.length > 0 && (
          <div>
            <h3 className="font-medium mb-2">Dropped Columns</h3>
            <div className="flex flex-wrap gap-2">
              {summary.droppedColumns.map((col, i) => (
                <Badge key={i} variant="outline" className="font-mono">
                  {col}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Missing Values */}
        {Object.keys(summary.missingValues).length > 0 && (
          <div>
            <h3 className="font-medium mb-2">Missing Values Handled</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="text-left text-muted-foreground">
                    <th className="pb-2 pr-4">Column</th>
                    <th className="pb-2 px-4 text-right">Before</th>
                    <th className="pb-2 px-4 text-right">After</th>
                    <th className="pb-2 pl-4">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {Object.entries(summary.missingValues).map(([col, counts]) => (
                    <tr key={col}>
                      <td className="py-2 pr-4 font-mono">{col}</td>
                      <td className="py-2 px-4 text-right">{counts.before}</td>
                      <td className="py-2 px-4 text-right">
                        <span className={counts.after > 0 ? 'text-amber-500' : 'text-green-500'}>
                          {counts.after}
                        </span>
                      </td>
                      <td className="py-2 pl-4">
                        {counts.after === 0 ? (
                          <span className="text-green-500 text-sm">Fixed</span>
                        ) : (
                          <span className="text-amber-500 text-sm">Partially fixed</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Encoded Features */}
        {Object.keys(summary.encodedColumns).length > 0 && (
          <div>
            <h3 className="font-medium mb-2">Encoded Features</h3>
            <div className="space-y-2">
              {Object.entries(summary.encodedColumns).map(([col, method]) => (
                <div key={col} className="flex items-center gap-2">
                  <code className="text-sm bg-muted px-2 py-1 rounded">{col}</code>
                  <span className="text-muted-foreground">→</span>
                  <Badge variant="outline" className="font-mono">
                    {method}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function StatCard({ 
  title, 
  value, 
  description,
  change = 'none'
}: { 
  title: string; 
  value: string; 
  description: string;
  change?: 'increase' | 'decrease' | 'none';
}) {
  return (
    <div className="border rounded-lg p-4">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-2xl font-semibold">{value}</p>
        </div>
        {change !== 'none' && (
          <span className={`text-xs px-2 py-1 rounded-full ${
            change === 'increase' 
              ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' 
              : 'bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-400'
          }`}>
            {change === 'increase' ? '↑' : '↓'}
          </span>
        )}
      </div>
      <p className="text-xs text-muted-foreground mt-1">{description}</p>
    </div>
  );
}
