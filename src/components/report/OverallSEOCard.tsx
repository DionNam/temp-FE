import Image from "next/image";

import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface OverallSEOCardProps {
  seoScore: number;
  difference: number;
}

const OverallSEOCard = (props: OverallSEOCardProps) => {
  return (
    <>
      <Card className="bg-white w-full p-5 gap-0 md:h-full h-fit">
        <CardHeader className="gap-2 flex flex-row items-center justify-start m-0 p-0">
          <div className="p-1 border border-[#E2E8F0] rounded-md">
            <Image src="/chart-donut.svg" alt="alt" width={16} height={16} />
          </div>
          <h2 className="text-sm font-semibold text-[#26262B]">
            Overall SEO Score
          </h2>
        </CardHeader>
        <CardContent className="flex flex-col p-0 m-0 gap-5 mt-5">
          <div>
            <div className="flex flex-row justify-between h-full">
              <p className="font-bold text-[#111827] text-4xl">
                {props.seoScore}/10
              </p>
              <div className="h-full">
                <div
                  className={
                    props.difference > 0
                      ? `bg-[#F0FDF4] text-[#16A34A] flex items-center text-[10px] px-2 py-0.5 rounded-full gap-1`
                      : `bg-[#FEF2F2] text-[#B91C1C] flex items-center text-[10px] px-2 py-0.5 rounded-full gap-1`
                  }
                >
                  <Image
                    src="/up.svg"
                    alt="up icon"
                    width={12}
                    height={12}
                    className={props.difference < 0 ? "rotate-180" : ""}
                    style={{
                      filter:
                        props.difference < 0
                          ? "brightness(0) saturate(100%) invert(11%) sepia(94%) saturate(7495%) hue-rotate(4deg) brightness(85%) contrast(114%)"
                          : "brightness(0) saturate(100%) invert(39%) sepia(97%) saturate(1586%) hue-rotate(81deg) brightness(119%) contrast(119%)",
                    }}
                  />
                  {props.difference}%
                </div>
              </div>
            </div>
            <div>
              <p className="text-[#77788C] text-xs font-medium">
                Weighted online wisibility score
              </p>
            </div>
          </div>
          <div className="border-b border-[#E4E4E8]" />
          <div className="text-xs">
            <ul className="gap-2 flex flex-col">
              <li className="flex flex-row items-center justify-between">
                <div className="flex flex-row items-center gap-2">
                  <div className="w-2 h-2 bg-[#FBBF24] rounded-full" />
                  <p>Brand Mention rate</p>
                </div>
                <p className="font-bold">$29,560.00</p>
              </li>
              <li className="flex flex-row items-center justify-between">
                <div className="flex flex-row items-center gap-2">
                  <div className="w-2 h-2 bg-[#FBBF24] rounded-full" />
                  <p>Overall Presence</p>
                </div>
                <p className="font-bold">$29,560.00</p>
              </li>
              <li className="flex flex-row items-center justify-between">
                <div className="flex flex-row items-center gap-2">
                  <div className="w-2 h-2 bg-[#FBBF24] rounded-full" />
                  <p>Avg. Competitor Mention Rate</p>
                </div>
                <p className="font-bold">$29,560.00</p>
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default OverallSEOCard;
