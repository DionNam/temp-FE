import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import { ChartTooltip } from "@/components/ui/chart";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { MentionsRow, SeriesConfig } from "@/components/report/ReportContent";

interface BrandMentionsCardProps {
  mentions: MentionsRow[];
  series: SeriesConfig;
}

const BrandMentionsCard = (props: BrandMentionsCardProps) => {
  const seriesEntries = Object.entries(props.series);

  return (
    <Card className="bg-white md:w-3/5 w-full h-80 gap-0 p-5">
      <CardHeader className="gap-2 flex flex-row items-center justify-between m-0 p-0">
        <div className="p-1 border border-[#E2E8F0] rounded-md">
          <Image src="/chart-donut.svg" alt="alt" width={16} height={16} />
        </div>
        <div className="w-full">
          <h2 className="text-sm font-semibold text-[#26262B]">Brand Mentions</h2>
          <p className="text-xs text-[#77788C]">Tracking mentions over time</p>
        </div>
      </CardHeader>

      <CardContent className="p-0 m-0">
        <div className="w-full h-64 min-w-0 min-h-0">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={props.mentions}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(v) => String(v).slice(0, 3)}
              />
              <YAxis tickLine={false} axisLine={false} tickMargin={8} />
              <ChartTooltip cursor={false} />

              <defs>
                {seriesEntries.map(([key, { color }]) => (
                  <linearGradient key={key} id={`fill-${key}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={color} stopOpacity={0.8} />
                    <stop offset="95%" stopColor={color} stopOpacity={0.1} />
                  </linearGradient>
                ))}
              </defs>

              {seriesEntries.map(([key, { color }]) => (
                <Area
                  key={key}
                  dataKey={key}
                  type="natural"
                  fill={`url(#fill-${key})`}
                  fillOpacity={0.4}
                  stroke={color}
                  stackId="a"
                />
              ))}
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default BrandMentionsCard;
