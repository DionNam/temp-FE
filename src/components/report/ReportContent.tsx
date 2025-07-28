"use client";

import ReportHeader from "./ReportHeader";
import SovCard from "./SovCard";
import OverallSEOCard from "./OverallSEOCard";
import SearchQueryCard from "./SearchQueryCard";
import MostFrequentlyCard from "./MostFrequentlyCard";
import BrandMentionsCard from "./BrandMentionsCard";

const response = {
  companyName: "Company Name",
  generatedDate: "07/04/2025",
  requestedBy: "test@email.com",
  sov: [
    { name: "Company Name", mentions: 40, fill: "var(--color-company)" },
    { name: "Competitor", mentions: 30, fill: "var(--color-competitor)" },
  ],
  mentions: [
    { month: "January", myCompany: 186, competitor: 80 },
    { month: "February", myCompany: 305, competitor: 200 },
    { month: "March", myCompany: 237, competitor: 120 },
    { month: "April", myCompany: 73, competitor: 190 },
    { month: "May", myCompany: 209, competitor: 130 },
    { month: "June", myCompany: 214, competitor: 140 },
  ],
  seoScore: 8.5,
  difference: 29.3, // Percentage increase in SEO score
};

const pieChartConfig = {
  company: {
    label: response.sov[0].name,
    color: "#2563EB",
  },
  competitor: {
    label: response.sov[1].name,
    color: "#36AAF3",
  },
};

const areaChartConfig = {
  company: {
    label: response.sov[0].name,
    color: "#7C3AED",
  },
  competitor: {
    label: response.sov[1].name,
    color: "#F43F5E",
  },
};

const ReportContent = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-68px)] w-4/5">
      <ReportHeader
        companyName={response.companyName}
        generatedDate={response.generatedDate}
        requestedBy={response.requestedBy}
      />
      <div className="flex flex-row items-center justify-between w-full mt-[18px] gap-3 border-[#E2E8F0] h-fit">
        <SovCard pieData={response.sov} chartConfig={pieChartConfig} />
        <BrandMentionsCard
          companyName={response.companyName}
          mentions={response.mentions}
          chartConfig={areaChartConfig}
        />
      </div>
      <div className="flex flex-row items-center justify-between w-full mt-3 gap-3 border-[#E2E8F0] h-fit">
        <OverallSEOCard
          seoScore={response.seoScore}
          difference={response.difference}
        />
        <SearchQueryCard />
        <MostFrequentlyCard />
      </div>
    </div>
  );
};

export default ReportContent;
