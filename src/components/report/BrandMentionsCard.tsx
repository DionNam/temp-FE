import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

interface BrandMentionsCardProps {
  companyName: string;
  mentions: {
    month: string;
    myCompany: number;
    competitor: number;
  }[];
  chartConfig: {
    company: {
      label: string;
      color: string;
    };
    competitor: {
      label: string;
      color: string;
    };
  };
}

const BrandMentionsCard = (props: BrandMentionsCardProps) => {
  return (
    <>
      <Card className="bg-white w-3/4 h-80 gap-0 p-5">
        <CardHeader className="gap-2 flex flex-row items-center justify-between m-0 p-0">
          <div className="p-1 border border-[#E2E8F0] rounded-md">
            <Image src="/chart-donut.svg" alt="alt" width={16} height={16} />
          </div>
          <div className="w-full">
            <h2 className="text-sm font-semibold text-[#26262B]">
              Brand Mentions
            </h2>
            <p className="text-xs text-[#77788C]">
              Tracking mentions of{" "}
              <span className="font-semibold">{props.companyName}</span> across
              AI platform overtime
            </p>
          </div>
        </CardHeader>
        <CardContent className="p-0 m-0">
          <ChartContainer
            config={props.chartConfig}
            className="max-h-64 w-full"
          >
            <AreaChart data={props.mentions}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.toString()}
              />
              <ChartTooltip cursor={false} />
              <defs>
                <linearGradient id="fillMyCompany" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--color-company)"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-company)"
                    stopOpacity={0.1}
                  />
                </linearGradient>
                <linearGradient id="fillCompetitor" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--color-competitor)"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-competitor)"
                    stopOpacity={0.1}
                  />
                </linearGradient>
              </defs>
              <Area
                dataKey="myCompany"
                type="natural"
                fill="url(#fillMyCompany)"
                fillOpacity={0.4}
                stroke="var(--color-company)"
                stackId="a"
              />
              <Area
                dataKey="competitor"
                type="natural"
                fill="url(#fillCompetitor)"
                fillOpacity={0.4}
                stroke="var(--color-competitor)"
                stackId="a"
              />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </>
  );
};

export default BrandMentionsCard;
