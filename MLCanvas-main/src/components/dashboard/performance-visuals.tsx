"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig,
} from "@/components/ui/chart";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Label, BarChart, Bar } from "recharts";
import type { ModelPerformance } from "@/lib/types";
import { InfoCard } from "./info-card";
import { Target, TrendingDown } from "lucide-react";

const chartConfig: ChartConfig = {
  value: {
    label: "Value",
  },
  loss: {
    label: "Loss",
    color: "hsl(var(--chart-2))",
  },
  accuracy: {
    label: "Accuracy",
    color: "hsl(var(--chart-1))",
  },
};

type PerformanceVisualsProps = {
  results: {
    loss: ModelPerformance[];
    accuracy: number;
  } | null;
}

export function PerformanceVisuals({ results }: PerformanceVisualsProps) {
  const lossData = results ? results.loss : [];
  const accuracy = results ? results.accuracy : 0;

  const showPlaceholder = !results;

  // If there's only one loss value (e.g., for linear regression MSE), use a BarChart
  const showBarChart = lossData.length === 1;

  const metricTitle = results?.loss.length === 1 ? "R-Squared" : "Model Accuracy";
  const lossTitle = results?.loss.length === 1 ? "Mean Squared Error (MSE)" : "Loss vs. Epoch";
  const accuracyDescription = results?.loss.length === 1 ? "Model fit on test data" : "Correct predictions on test data";

  return (
    <Tabs defaultValue="loss">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="loss">{lossTitle}</TabsTrigger>
        <TabsTrigger value="accuracy">{metricTitle}</TabsTrigger>
      </TabsList>
      <TabsContent value="loss">
        <ChartContainer config={chartConfig} className="h-64 w-full">
            {showBarChart ? (
                 <BarChart data={lossData} margin={{ top: 20, right: 40, bottom: 20, left: 20 }}>
                    <CartesianGrid vertical={false} />
                    <XAxis dataKey="epoch" tickFormatter={() => "MSE"} tickLine={false} axisLine={false} />
                    <YAxis domain={[0, 'dataMax']} tickLine={false} axisLine={false} tickMargin={8} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="value" fill="var(--color-loss)" radius={4} />
                </BarChart>
            ) : (
                <LineChart
                    data={lossData}
                    margin={{ top: 20, right: 40, bottom: 20, left: 20 }}
                >
                    <CartesianGrid vertical={false} />
                    <XAxis
                    dataKey="epoch"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    tickFormatter={(value) => `E${value}`}
                    >
                    <Label value="Epoch" offset={-15} position="insideBottom" />
                    </XAxis>
                    <YAxis domain={[0, 'dataMax']} tickLine={false} axisLine={false} tickMargin={8}>
                    <Label value="Loss" angle={-90} position="insideLeft" />
                    </YAxis>
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line
                    dataKey="value"
                    type="monotone"
                    stroke="var(--color-loss)"
                    strokeWidth={2}
                    dot={false}
                    />
                </LineChart>
            )}
        </ChartContainer>
      </TabsContent>
      <TabsContent value="accuracy">
         <div className="flex justify-center items-center h-64">
           <InfoCard
                title={metricTitle}
                value={showPlaceholder ? "N/A" : `${(accuracy).toFixed(4)}`}
                icon={<Target />}
                description={showPlaceholder ? "Train a model to see its performance" : accuracyDescription}
                className="w-64"
              />
         </div>
      </TabsContent>
    </Tabs>
  );
}
