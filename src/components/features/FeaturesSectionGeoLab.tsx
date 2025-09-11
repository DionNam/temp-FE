'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

const img1 = "http://localhost:3845/assets/b5f54a34a588bee25d5d78a7012c8889b97f3597.png";
const img = "http://localhost:3845/assets/dc5469bb8630765e71e1603c145274dff1ea81bd.svg";

interface FeaturesSectionProps {
  className?: string;
}

export default function FeaturesSectionGeoLab({ className }: FeaturesSectionProps) {
  return (
    <section className={`bg-white py-12 sm:py-16 lg:py-24 ${className}`}>
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="flex flex-col gap-6 sm:gap-8 items-start mb-12 sm:mb-16">
          <div className="flex flex-col gap-4 sm:gap-5 max-w-[800px]">
            <div className="flex flex-col gap-3">
              <div className="text-[14px] sm:text-[16px] text-blue-600 font-semibold">
                <p className="leading-[20px] sm:leading-[24px]">Lab Overview</p>
              </div>
              <div className="text-[#181d27] text-[24px] sm:text-[32px] lg:text-[36px] tracking-[-0.48px] sm:tracking-[-0.72px] font-semibold">
                <p className="leading-[30px] sm:leading-[38px] lg:leading-[44px]">Boost your content's reach with GEO Factor Lab</p>
              </div>
            </div>
            <div className="text-[#535862] text-[16px] sm:text-[18px] lg:text-[20px] font-normal">
              <p className="leading-[24px] sm:leading-[26px] lg:leading-[30px]">
                Utilize our comprehensive tools to improve your content ranking. Optimize keywords and analyze engagement metrics to stay competitive.
                <br className="hidden sm:block" />
                with no hidden fees, just results.
              </p>
            </div>
          </div>
        </div>
        
        {/* Main Content Section */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-start lg:items-center">
          {/* Left Side - Feature Tabs */}
          <div className="w-full lg:flex-1 flex flex-col max-w-none lg:max-w-[560px]">
            {/* Feature Tab 1 - Active */}
            <div className="flex flex-col gap-3 sm:gap-4 pl-4 sm:pl-6 py-3 sm:py-4 border-l-4 border-blue-600">
              <div className="flex flex-col gap-1">
                <div className="text-[#181d27] text-[16px] sm:text-[18px] font-semibold">
                  <p className="leading-[24px] sm:leading-[28px]">Enter your article link and select AI models.</p>
                </div>
                <div className="text-[#535862] text-[14px] sm:text-[16px] font-normal">
                  <p className="leading-[20px] sm:leading-[24px]">Start by inputting or pasting the article you want to analyze into the GEO Factor Lab platform.</p>
                </div>
              </div>
              <div className="flex gap-1.5 items-center">
                <div className="text-[14px] sm:text-[16px] text-blue-600 font-semibold">
                  <p className="leading-[20px] sm:leading-[24px]">Learn more</p>
                </div>
                <ArrowRight className="w-4 sm:w-5 h-4 sm:h-5 text-blue-600" />
              </div>
            </div>
            
            {/* Feature Tab 2 */}
            <div className="flex flex-col gap-3 sm:gap-4 pl-4 sm:pl-6 py-3 sm:py-4 border-l-4 border-neutral-100">
              <div className="flex flex-col gap-1">
                <div className="text-[#181d27] text-[16px] sm:text-[18px] font-semibold">
                  <p className="leading-[24px] sm:leading-[28px]">Select the Factor to Analyze</p>
                </div>
                <div className="text-[#535862] text-[14px] sm:text-[16px] font-normal">
                  <p className="leading-[20px] sm:leading-[24px]">Choose specific AI visibility factors (e.g., keywords, ranking metrics, traffic sources, etc.) relevant to your analysis.</p>
                </div>
              </div>
              <div className="flex gap-1.5 items-center">
                <div className="text-[14px] sm:text-[16px] text-blue-600 font-semibold">
                  <p className="leading-[20px] sm:leading-[24px]">Learn more</p>
                </div>
                <ArrowRight className="w-4 sm:w-5 h-4 sm:h-5 text-blue-600" />
              </div>
            </div>
            
            {/* Feature Tab 3 */}
            <div className="flex flex-col gap-3 sm:gap-4 pl-4 sm:pl-6 py-3 sm:py-4 border-l-4 border-neutral-100">
              <div className="flex flex-col gap-1">
                <div className="text-[#181d27] text-[16px] sm:text-[18px] font-semibold">
                  <p className="leading-[24px] sm:leading-[28px]">Complete Analytics and Competitor Comparison</p>
                </div>
                <div className="text-[#535862] text-[14px] sm:text-[16px] font-normal">
                  <p className="leading-[20px] sm:leading-[24px]">The system will automatically generate a full analysis report for your article. It will also compare the analyzed factors with your competitors.</p>
                </div>
              </div>
              <div className="flex gap-1.5 items-center">
                <div className="text-[14px] sm:text-[16px] text-blue-600 font-semibold">
                  <p className="leading-[20px] sm:leading-[24px]">Learn more</p>
                </div>
                <ArrowRight className="w-4 sm:w-5 h-4 sm:h-5 text-blue-600" />
              </div>
            </div>
          </div>
          
          {/* Right Side - Mockup */}
          <div className="w-full lg:flex-1 relative">
            <div className="aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3] w-full relative rounded-lg overflow-hidden shadow-lg">
              <Image
                src="/diagnosis.webp"
                alt="GEO Factor Lab Dashboard"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 40vw"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
