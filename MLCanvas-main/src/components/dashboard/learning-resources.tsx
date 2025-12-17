'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, PlayCircle, Code as CodeIcon, BarChart2 } from 'lucide-react';
import Link from 'next/link';

const resources = [
  {
    title: 'Data Preprocessing Guide',
    type: 'Guide',
    icon: BookOpen,
    href: '/learn/data-preprocessing',
  },
  {
    title: 'Feature Engineering Basics',
    type: 'Tutorial',
    icon: CodeIcon,
    href: '/learn/feature-engineering',
  },
  {
    title: 'Model Selection Tips',
    type: 'Video',
    icon: PlayCircle,
    href: '/learn/model-selection',
  },
  {
    title: 'Understanding Metrics',
    type: 'Guide',
    icon: BarChart2,
    href: '/learn/metrics',
  },
];

export function LearningResources() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Learning Resources</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {resources.map((resource) => (
          <Link
            key={resource.href}
            href={resource.href}
            className="flex items-center p-3 rounded-lg border border-transparent hover:border-gray-200 dark:hover:border-gray-700 transition-colors"
          >
            <div className="flex-shrink-0 p-2 bg-blue-50 dark:bg-blue-900/30 rounded-md">
              <resource.icon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="ml-4">
              <h3 className="font-medium">{resource.title}</h3>
              <p className="text-sm text-muted-foreground">{resource.type}</p>
            </div>
          </Link>
        ))}
      </CardContent>
    </Card>
  );
}
