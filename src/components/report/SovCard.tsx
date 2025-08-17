import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import { ChartTooltip } from "@/components/ui/chart";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import { SeriesConfig } from "@/components/report/ReportContent";

interface SovCardProps {
  pieData: { name: string; mentions: number }[];
  series: SeriesConfig;
}

const SovCard = (props: SovCardProps) => {
  return (
    <Card className="bg-white w-full md:w-2/5 p-5 gap-0 h-80 flex flex-col overflow-hidden">
      <CardHeader className="gap-2 flex flex-row items-center justify-between m-0 p-0">
        <div className="p-1 border border-[#E2E8F0] rounded-md">
          <Image src="/chart-donut.svg" alt="alt" width={16} height={16} />
        </div>
        <div className="w-full">
          <h2 className="text-sm font-semibold text-[#26262B]">
            AI Search Share of Voice (SOV)
          </h2>
          <p className="text-xs text-[#77788C]">
            Distribution of AI-related brand mentions
          </p>
        </div>
      </CardHeader>

      <CardContent className="m-0 p-0 flex-1 flex items-center justify-center gap-4">
        <div className="size-52 min-w-0 min-h-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <ChartTooltip cursor={false} />
              <Pie
                data={props.pieData}
                dataKey="mentions"
                nameKey="name"
                innerRadius={50}
              >
                {props.pieData.map((d, i) => {
                  const key = d.name
                    .toLowerCase()
                    .replace(/[^a-z0-9]+/g, "-")
                    .replace(/(^-|-$)/g, "");
                  return (
                    <Cell key={i} fill={props.series[key]?.color ?? "#999"} />
                  );
                })}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="flex flex-col gap-2 overflow-y-auto max-h-52 pr-1">
          {props.pieData
            .filter((d) => d.mentions > 0)
            .map((d) => {
              const key = d.name
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/(^-|-$)/g, "");
              const color = props.series[key]?.color ?? "#999";
              const label = props.series[key]?.label ?? d.name;
              return (
                <div key={key} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ background: color }}
                  />
                  <p className="text-xs">{label}</p>
                </div>
              );
            })}
        </div>
      </CardContent>
    </Card>
  );
};

export default SovCard;
