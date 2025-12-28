"use client";

import {
  ChartContainer,
  ChartConfig,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { featureDistribution } from "@/lib/mock-data";

const chartConfig = {
  count: {
    label: "Count",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function DistributionPlot() {
  return (
    <ChartContainer config={chartConfig} className="h-48 w-full">
      <BarChart
        data={featureDistribution}
        margin={{ top: 20, right: 20, bottom: 5, left: 0 }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="value"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
        />
        <YAxis />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="count" fill="var(--color-count)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
}
