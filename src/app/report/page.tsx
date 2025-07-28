import { Header } from "@/components/layout/Header";
import ReportContent from "@/components/report/ReportContent";

const ReportPage = () => {
  return (
    <div className="bg-[#F0F5FE] flex flex-col items-center justify-center">
      <Header />
      <ReportContent />
    </div>
  );
}

export default ReportPage;