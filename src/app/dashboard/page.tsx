import { CsvUploader } from "@/components/dashboard/csv-uploader";
import { DataExplorer } from "@/components/dashboard/data-explorer";
import { CsvDataProvider } from "@/contexts/csv-data-context";
import { InteractiveLearningCard } from "@/components/dashboard/interactive-learning-card";
import { OwnerSidebar } from "@/components/dashboard/owner-sidebar";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | ML Canvas",
  description:
    "ML Canvas dashboard to preprocess datasets and explore ML workflows.",
  alternates: {
    canonical: "/dashboard",
  },
  robots: "index, follow",
};

export default function DashboardPage() {
  return (
    <CsvDataProvider>
      <div className="space-y-6">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-blue-500/80 to-purple-600/80 text-white p-6 rounded-lg backdrop-blur-sm">
          <h1 className="text-2xl font-bold">Welcome to ML Learning Lab</h1>
          <p className="mt-2">
            Upload your dataset to start exploring and learning about machine
            learning concepts.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column - Data Exploration */}
          <div className="lg:col-span-8">
            <Card className="bg-background/80 backdrop-blur-md border-border/50">
              <CardHeader>
                <CardTitle>Dataset Explorer</CardTitle>
                <CardDescription>
                  Upload and explore your dataset. Select the target variable
                  for machine learning.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <CsvUploader />
                <div className="mt-4">
                  <DataExplorer />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Owner Info and ML Resources */}
          <div className="lg:col-span-4 space-y-6">
            <OwnerSidebar />
            <InteractiveLearningCard />
          </div>
        </div>
      </div>
    </CsvDataProvider>
  );
}


