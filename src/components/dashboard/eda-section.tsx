'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { InfoCard } from "./info-card";
import { PlotlyCorrelationHeatmap } from "./plotly-correlation-heatmap";
import { Activity, Thermometer, TestTube, Scale } from "lucide-react";
import { CsvDataContext } from "@/contexts/csv-data-context";
import { useContext } from "react";
import { PlotlyPairPlot } from "./plotly-pair-plot";
import { PlotlyPcaProjection } from "./plotly-pca-projection";
import { PlotlyKmeansClustering } from "./plotly-kmeans-clustering";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";

export function EdaSection() {
  const { csvData, numericFeatures, headers } = useContext(CsvDataContext);


  const overviewData = {
    totalRows: csvData.length,
    totalFeatures: headers.length,
    numericFeatures: numericFeatures.length,
    // Placeholder values for now
    missingValues: "N/A",
    outliers: "N/A",
    outlierPercentage: "N/A",
  };

  const canShowAdvancedPlots = numericFeatures.length >= 2;


  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">
          Exploratory Data Analysis (EDA)
        </CardTitle>
        <CardDescription>
          Automated insights into your dataset's characteristics.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="overview" className="w-full">
          <ScrollArea>
            <TabsList className="grid w-full grid-cols-1 md:grid-cols-6 mb-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              {canShowAdvancedPlots && <TabsTrigger value="correlation">Correlation</TabsTrigger>}
              {canShowAdvancedPlots && <TabsTrigger value="pair-plot">Pair Plot</TabsTrigger>}
              {canShowAdvancedPlots && <TabsTrigger value="pca">PCA</TabsTrigger>}
              {canShowAdvancedPlots && <TabsTrigger value="kmeans">K-Means</TabsTrigger>}
              <TabsTrigger value="outliers">Outliers</TabsTrigger>
            </TabsList>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
          <TabsContent value="overview">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <InfoCard
                title="Total Rows"
                value={overviewData.totalRows.toLocaleString()}
                icon={<Activity />}
              />
              <InfoCard
                title="Total Features"
                value={overviewData.totalFeatures.toLocaleString()}
                icon={<TestTube />}
              />
              <InfoCard
                title="Missing Values"
                value={overviewData.missingValues}
                icon={<Thermometer />}
              />
              <InfoCard title="Numeric Features" value={overviewData.numericFeatures.toLocaleString()} icon={<Scale />} />
            </div>
          </TabsContent>
          {canShowAdvancedPlots && <TabsContent value="correlation">
            <PlotlyCorrelationHeatmap />
          </TabsContent>}
          {canShowAdvancedPlots && <TabsContent value="pair-plot">
            <PlotlyPairPlot />
          </TabsContent>}
           {canShowAdvancedPlots && <TabsContent value="pca">
            <PlotlyPcaProjection />
          </TabsContent>}
          {canShowAdvancedPlots && <TabsContent value="kmeans">
            <PlotlyKmeansClustering />
          </TabsContent>}
          <TabsContent value="outliers">
             <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
               <InfoCard title="Outliers Detected" value={overviewData.outliers} />
               <InfoCard title="Outlier %" value={overviewData.outlierPercentage} />
             </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
