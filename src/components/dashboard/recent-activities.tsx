'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, Clock, FileText, BarChart2 } from 'lucide-react';

const activities = [
  {
    id: 1,
    action: 'Dataset uploaded',
    time: '2 minutes ago',
    icon: FileText,
  },
  {
    id: 2,
    action: 'Data summary generated',
    time: '5 minutes ago',
    icon: BarChart2,
  },
  {
    id: 3,
    action: 'Data quality check completed',
    time: '10 minutes ago',
    icon: Activity,
  },
];

export function RecentActivities() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center">
          <Activity className="h-5 w-5 mr-2" />
          Recent Activities
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.map((activity) => {
          const Icon = activity.icon;
          return (
            <div key={activity.id} className="flex items-start">
              <div className="p-2 rounded-lg bg-muted">
                <Icon className="h-4 w-4" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium">{activity.action}</p>
                <div className="flex items-center text-xs text-muted-foreground">
                  <Clock className="h-3 w-3 mr-1" />
                  {activity.time}
                </div>
              </div>
            </div>
          );
        })}
        <div className="pt-2">
          <button className="text-sm text-blue-600 hover:underline dark:text-blue-400">
            View all activities
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
