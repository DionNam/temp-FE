import { Header } from "@/components/layout/Header";
import ReportContent from "@/components/report/ReportContent";
import { Footer } from "@/components/layout/Footer";

const ReportPage = () => {
  return (
    <div className="bg-[#F0F5FE] flex flex-col items-center justify-center">
      <Header />
      <ReportContent />
      <Footer className="w-full" />
    </div>
  );
}

export default ReportPage;