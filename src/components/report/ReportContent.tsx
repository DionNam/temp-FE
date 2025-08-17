"use client";

import ReportHeader from "./ReportHeader";
import SovCard from "./SovCard";
import OverallSEOCard from "./OverallSEOCard";
import SearchQueryCard from "./SearchQueryCard";
import MostFrequentlyCard from "./MostFrequentlyCard";
import BrandMentionsCard from "./BrandMentionsCard";

export type SeriesConfig = Record<string, { label: string; color: string }>;
export type MentionsRow = {
  month: string;
  [seriesKey: string]: number | string;
};


const response = {
  companyName: "Company Name",
  generatedDate: "07/04/2025",
  requestedBy: "test@email.com",
  sov: [
    { name: "Company Name", mentions: 40 },
    { name: "Competitor A", mentions: 30 },
    { name: "Competitor B", mentions: 22 },
    { name: "Competitor C", mentions: 15 },
    { name: "Competitor D", mentions: 10 },
    { name: "Competitor E", mentions: 5 },
    { name: "Competitor F", mentions: 3 },
  ],
  mentions: [
    { month: "January", "Company Name": 186, "Competitor A": 80, "Competitor B": 44, "Competitor C": 20, "Competitor D": 15, "Competitor E": 10, "Competitor F": 5 },
    { month: "February", "Company Name": 305, "Competitor A": 200, "Competitor B": 91, "Competitor C": 50, "Competitor D": 30, "Competitor E": 20, "Competitor F": 10 },
    { month: "March", "Company Name": 237, "Competitor A": 120, "Competitor B": 70, "Competitor C": 40, "Competitor D": 25, "Competitor E": 15, "Competitor F": 8 },
    { month: "April", "Company Name": 73, "Competitor A": 190, "Competitor B": 88, "Competitor C": 30, "Competitor D": 20, "Competitor E": 10, "Competitor F": 5 },
    { month: "May", "Company Name": 209, "Competitor A": 130, "Competitor B": 95, "Competitor C": 50, "Competitor D": 30, "Competitor E": 20, "Competitor F": 10 },
    { month: "June", "Company Name": 214, "Competitor A": 140, "Competitor B": 99, "Competitor C": 60, "Competitor D": 40, "Competitor E": 30, "Competitor F": 20 },
  ],
  seoScore: 8.5,
  difference: 29.3,
  brandMentionsRate: 10,
  overallPresence: 10,
  avgCompetitorMentionRate: 10,
  latestPromotionBlogPost: 95,
  coreServiceIntroductionPage: 90,
  customerSuccessStoryInterview: 85,
};

const PALETTE = [
  "#233993", // my company
  "#2345B9",
  "#2353DF",
  "#3D6FEA",
  "#608BEF",
  "#83A7F4",
  "#A7C1F8",
] as const;

const slug = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const orderedNames = (() => {
  const names = response.sov.map((s) => s.name);
  const companyFirst = [
    response.companyName,
    ...names.filter((n) => n !== response.companyName),
  ];
  return companyFirst.slice(0, 8);
})();

const series: Record<string, { label: string; color: string }> =
  orderedNames.reduce((acc, label, i) => {
    acc[slug(label)] = { label, color: PALETTE[i % PALETTE.length] };
    return acc;
  }, {} as Record<string, { label: string; color: string }>);

const pieData = response.sov
  .filter((s) => orderedNames.includes(s.name))
  .map((s) => ({ name: s.name, mentions: s.mentions }));



const mentions: MentionsRow[] = response.mentions.map((row) => {
  const out: MentionsRow = { month: row.month };
  orderedNames.forEach((name) => {
    const key = slug(name);
    const v = (row as Record<string, unknown>)[name];
    if (typeof v === "number") out[key] = v;
  });
  return out;
});


const ReportContent = () => {
  return (
    <div className="flex flex-col items-center justify-center md:h-[calc(100vh-68px)] h-full md:w-4/5 w-5/6 md:mt-0 mt-8 md:mb-0 mb-16">
      <ReportHeader
        companyName={response.companyName}
        generatedDate={response.generatedDate}
        requestedBy={response.requestedBy}
      />
      <div className="md:flex flex-row items-center justify-between w-full mt-[18px] gap-3 border-[#E2E8F0] h-fit hidden">
        <SovCard pieData={pieData} series={series} />
        <BrandMentionsCard mentions={mentions} series={series} />
      </div>
      <div className="md:flex flex-row items-center justify-between w-full mt-3 gap-3 border-[#E2E8F0] h-fit hidden">
        <OverallSEOCard
          seoScore={response.seoScore}
          difference={response.difference}
          brandMentionsRate={response.brandMentionsRate}
          overallPresence={response.overallPresence}
          avgCompetitorMentionRate={response.avgCompetitorMentionRate}
        />
        <SearchQueryCard />
        <MostFrequentlyCard
          latestPromotionBlogPost={response.latestPromotionBlogPost}
          coreServiceIntroductionPage={response.coreServiceIntroductionPage}
          customerSuccessStoryInterview={response.customerSuccessStoryInterview}
        />
      </div>
      <div className="md:hidden flex flex-col items-center justify-center w-full gap-4 border-[#E2E8F0] mt-5">
        <OverallSEOCard
          seoScore={response.seoScore}
          difference={response.difference}
          brandMentionsRate={response.brandMentionsRate}
          overallPresence={response.overallPresence}
          avgCompetitorMentionRate={response.avgCompetitorMentionRate}
        />
        <SovCard pieData={pieData} series={series} />
        <BrandMentionsCard mentions={mentions} series={series} />
        <MostFrequentlyCard
          latestPromotionBlogPost={response.latestPromotionBlogPost}
          coreServiceIntroductionPage={response.coreServiceIntroductionPage}
          customerSuccessStoryInterview={response.customerSuccessStoryInterview}
        />
        <SearchQueryCard />
      </div>
    </div>
  );
};

export default ReportContent;
