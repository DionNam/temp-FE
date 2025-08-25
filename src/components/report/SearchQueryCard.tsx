import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Image from "next/image";

const SearchQueryCard = () => {
  return (
    <>
      <Card className="bg-white w-full p-5 gap-0 flex flex-col flex-1 self-stretch">
        <CardHeader className="gap-2 flex flex-row items-center justify-start m-0 p-0">
          <div className="p-1 border border-[#E2E8F0] rounded-md">
            <Image src="/chart-donut.svg" alt="alt" width={16} height={16} />
          </div>
          <h2 className="text-sm font-semibold text-[#26262B]">
            Search Query to Improve
          </h2>
        </CardHeader>
        <CardContent className="p-0 m-0 gap-5 flex flex-col">
          <p className="font-semibold text-sm mt-5">
            Search Query Needing Improvement
          </p>
          <Input className="text-[#F9F9FA]" placeholder="32XXXXXXXX" />
          <p className="text-xs text-[#4B5563] font-medium">
            Your company&apos;s information exposure for this query is currently
            insufficient, potentially missing out on customers.
          </p>
        </CardContent>
      </Card>
    </>
  );
};

export default SearchQueryCard;
