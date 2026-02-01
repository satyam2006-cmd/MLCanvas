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
  title: "ML Canvas Dashboard – Explore, Preprocess & Visualize Machine Learning Data",
  description:
    "ML Canvas Dashboard lets you upload datasets, preprocess data, explore features, visualize patterns, and learn machine learning workflows interactively. Perfect for students and beginners in Data Science and AI.",
  keywords: [
    "machine learning",
    "data science",
    "ml dashboard",
    "dataset preprocessing",
    "data cleaning",
    "feature engineering",
    "machine learning visualization",
    "ml education",
    "learn machine learning",
    "interactive ml",
    "csv data explorer",
    "ml canvas",
    "ai learning platform",
    "ml lab",
    "ml playground",
    "data analysis",
    "MLCanvas",
    "mlcanvas",
  ],

  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "ML Canvas Dashboard – Interactive Machine Learning Lab",
    description:
      "Upload datasets, preprocess data, visualize features and learn Machine Learning step-by-step with ML Canvas.",
    url: "https://ml-canvas-silk.vercel.app/dashboard",
    siteName: "ML Canvas",
    images: [
      {
        url: "https://ml-canvas-silk.vercel.app/og-image.png", // optional
        width: 1200,
        height: 630,
        alt: "ML Canvas Dashboard",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ML Canvas Dashboard – Interactive ML Learning Platform",
    description:
      "Explore, preprocess, and visualize datasets while learning Machine Learning interactively.",
  },
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


