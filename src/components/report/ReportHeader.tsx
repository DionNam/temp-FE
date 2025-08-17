interface ReportHeaderProps {
  companyName: string;
  generatedDate: string;
  requestedBy: string;
}

const ReportHeader = (props: ReportHeaderProps) => {
  return (
    <div className="w-full">
      <h1 className="font-semibold text-2xl md:text-3xl">{props.companyName}</h1>
      <div className="flex items-center justify-between text-xs md:text-lg text-[#4F4F5B] flex-row-reverse md:flex-row">
        <p>
          AI-based SEO Visualization Report (Generated: {props.generatedDate})
        </p>
        <p>Analysis requested by <strong>{props.requestedBy}</strong></p>
      </div>
    </div>
  );
};

export default ReportHeader;
