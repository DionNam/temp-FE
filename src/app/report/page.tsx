import { Header } from "@/components/layout/Header";
import ReportContent from "@/components/report/ReportContent";
import { Footer } from "@/components/layout/Footer";

const ReportPage = () => {
  return (
    <div className="bg-[#F0F5FE] min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 w-full flex justify-center items-center">
        <ReportContent />
      </div>
      <Footer className="w-full" />
    </div>
  );
}

export default ReportPage;
