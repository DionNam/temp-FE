interface ReportHeaderProps {
  companyName: string;
  generatedDate: string;
  requestedBy: string;
}

const ReportHeader = (props: ReportHeaderProps) => {
  return (
    <div className="w-full">
      <h1 className="font-semibold text-3xl">{props.companyName}</h1>
      <div className="flex flex-row items-center justify-between text-lg text-[#4F4F5B]">
        <p>
          AI-based SEO Visualization Report (Generated: {props.generatedDate})
        </p>
        <p>Analysis requested by {props.requestedBy}</p>
      </div>
    </div>
  );
};

export default ReportHeader;
