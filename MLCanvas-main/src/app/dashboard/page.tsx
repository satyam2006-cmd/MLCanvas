import { CsvUploader } from "@/components/dashboard/csv-uploader";
import { DataExplorer } from "@/components/dashboard/data-explorer";
import { CsvDataProvider } from "@/contexts/csv-data-context";
import { LearningResources } from "@/components/dashboard/learning-resources";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function DashboardPage() {
  return (
    <CsvDataProvider>
      <div className="space-y-6">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 rounded-lg">
          <h1 className="text-2xl font-bold">Welcome to ML Learning Lab</h1>
          <p className="mt-2">Upload your dataset to start exploring and learning about machine learning concepts.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column - Data Exploration */}
          <div className="lg:col-span-8">
            <Card>
              <CardHeader>
                <CardTitle>Dataset Explorer</CardTitle>
                <CardDescription>
                  Upload and explore your dataset. Select the target variable for machine learning.
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

          {/* Right Column - Learning Resources */}
          <div className="lg:col-span-4">
            <LearningResources />
          </div>
        </div>
      </div>
    </CsvDataProvider>
  );
}
