import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Image from "next/image";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { Pie, PieChart } from "recharts";

interface SovCardProps {
  pieData: {
    name: string;
    mentions: number;
    fill: string;
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

const SovCard = (props: SovCardProps) => {
  return (
    <>
      <Card className="bg-white w-1/4 p-5 gap-0 h-80 justify-between">
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
        <CardContent className="m-0 p-0">
          <ChartContainer
            config={props.chartConfig}
            className="aspect-square max-h-52 mx-auto w-full"
          >
            <PieChart>
              <ChartTooltip cursor={false} />
              <Pie
                data={props.pieData}
                dataKey="mentions"
                nameKey="name"
                innerRadius={60}
              />
            </PieChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="p-0 m-0 gap-2 flex flex-row items-start w-full text-xs justify-between">
          <div className="w-fit flex flex-row items-center gap-2">
            <div className="w-5 h-5 bg-[#2563EB] rounded-sm" />
            <p>{props.chartConfig.company.label}</p>
          </div>
          <div className="w-fit flex flex-row items-center gap-2">
            <div className="w-5 h-5 bg-[#36AAF3] rounded-sm" />
            <p>{props.chartConfig.competitor.label}</p>
          </div>
        </CardFooter>
      </Card>
    </>
  );
};

export default SovCard;
