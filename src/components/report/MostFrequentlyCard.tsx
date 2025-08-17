import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";

interface MostFrequentlyCardProps {
  latestPromotionBlogPost: number;
  coreServiceIntroductionPage: number;
  customerSuccessStoryInterview: number;
}

const MostFrequentlyCard = (props: MostFrequentlyCardProps) => {
  return (
    <>
      <Card className="bg-white w-full p-5 gap-0 h-full">
        <CardHeader className="gap-2 flex flex-row items-center justify-start m-0 p-0">
          <div className="p-1 border border-[#E2E8F0] rounded-md">
            <Image src="/chart-donut.svg" alt="alt" width={16} height={16} />
          </div>
          <h2 className="text-sm font-semibold text-[#26262B]">
            Most Frequently Referenced Content
          </h2>
        </CardHeader>
        <CardContent className="p-0 m-0 text-xs">
          <ul className="gap-2 flex flex-col mt-5">
            <li className="flex flex-row items-center justify-between">
              <div className="flex flex-row items-center gap-2">
                <div className="w-2 h-2 bg-primary-blue-500 rounded-full" />
                <p>Latest Promotion Blog Post</p>
              </div>
              <p className="font-bold">{props.latestPromotionBlogPost} pts</p>
            </li>

            <li className="flex flex-row items-center justify-between">
              <div className="flex flex-row items-center gap-2">
                <div className="w-2 h-2 bg-primary-blue-500 rounded-full" />
                <p>Core Service Introduction Page</p>
              </div>
              <p className="font-bold">{props.customerSuccessStoryInterview} pts</p>
            </li>

            <li className="flex flex-row items-center justify-between">
              <div className="flex flex-row items-center gap-2">
                <div className="w-2 h-2 bg-primary-blue-500 rounded-full" />
                <p>Customer Success Story Interview</p>
              </div>
              <p className="font-bold">{props.customerSuccessStoryInterview} pts</p>
            </li>
          </ul>
        </CardContent>
      </Card>
    </>
  );
};

export default MostFrequentlyCard;
