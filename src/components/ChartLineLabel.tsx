"use client"

import { TrendingUp } from "lucide-react"
import { CartesianGrid, LabelList, Line, LineChart, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"

export const description = "A line chart with a label"

interface Props {
  prices: number[]
  labels?: string[]
  title?: string
  subtitle?: string
}

const chartConfig = {
  series: {
    label: "Value",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig

export function ChartLineLabel({
  prices,
  labels,
  title = "Line Chart - Label",
  subtitle = "",
}: Props) {
  const chartData = prices.map((p, i) => ({
    index: i,
    value: p,
    label: labels?.[i] ?? String(i),
  }))

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {subtitle ? <CardDescription>{subtitle}</CardDescription> : null}
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 20,
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="label"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => String(value).slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Line
              dataKey="value"
              type="natural"
              stroke="var(--color-series, #0ea5e9)"
              strokeWidth={2}
              dot={{
                fill: "var(--color-series, #0ea5e9)",
              }}
              activeDot={{
                r: 6,
              }}
            >
              <LabelList
                dataKey="value"
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Line>
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Showing values for the provided series
        </div>
      </CardFooter>
    </Card>
  )
}
