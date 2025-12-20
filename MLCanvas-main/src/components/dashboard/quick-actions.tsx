'use client';

import { useContext } from 'react';
import { CsvDataContext } from '@/contexts/csv-data-context';
import { Button } from '@/components/ui/button';
import { BarChart3, ListChecks, Sparkles, Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const actions = [
  {
    title: 'Generate Summary',
    description: 'Get key statistics and insights about your dataset',
    icon: BarChart3,
    action: 'summary',
  },
  {
    title: 'Check Data Quality',
    description: 'Identify missing values and potential data issues',
    icon: ListChecks,
    action: 'quality',
  },
  {
    title: 'Feature Analysis',
    description: 'Analyze feature distributions and correlations',
    icon: Sparkles,
    action: 'features',
  },
  {
    title: 'Export Analysis',
    description: 'Download your analysis results',
    icon: Download,
    action: 'export',
  },
];

export function QuickActions() {
  const { csvData } = useContext(CsvDataContext);
  const { toast } = useToast();

  const handleAction = (action: string) => {
    if (csvData.length === 0) {
      toast({
        title: 'No data available',
        description: 'Please upload a dataset first',
        variant: 'destructive',
      });
      return;
    }

    switch (action) {
      case 'summary':
        // Handle summary generation
        toast({
          title: 'Generating summary',
          description: 'Analyzing your dataset...',
        });
        break;
      case 'quality':
        // Handle data quality check
        toast({
          title: 'Checking data quality',
          description: 'Looking for potential issues...',
        });
        break;
      case 'features':
        // Handle feature analysis
        toast({
          title: 'Analyzing features',
          description: 'Examining feature distributions...',
        });
        break;
      case 'export':
        // Handle export
        toast({
          title: 'Export prepared',
          description: 'Your analysis is ready for download',
        });
        break;
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {actions.map((item) => {
        const Icon = item.icon;
        return (
          <Button
            key={item.action}
            variant="outline"
            className="h-auto py-4 px-4 flex flex-col items-start gap-2 text-left"
            onClick={() => handleAction(item.action)}
          >
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-medium">{item.title}</h3>
              <p className="text-xs text-muted-foreground">{item.description}</p>
            </div>
          </Button>
        );
      })}
    </div>
  );
}
