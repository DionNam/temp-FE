'use client';

import React from 'react';
import Image from 'next/image';
import { MessageCircle, Zap, BarChart3 } from 'lucide-react';

interface FeatureItem {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const featureItems: FeatureItem[] = [
  {
    id: 1,
    title: "Article Intelligence Mapping",
    description: "Analyze and categorize articles by type to visualize their distribution and performance",
    icon: <MessageCircle />
  },
  {
    id: 2,
    title: "Factor Lab Relevance Index",
    description: "Show a ranked list of key ranking factors most impactful for each article type.",
    icon: <Zap />
  },
  {
    id: 3,
    title: "Source-AI Correlation Analysis",
    description: "Reveal how the quality and type of cited sources influence rankings using AI-driven correlation charts.",
    icon: <BarChart3 />
  }
];

interface FeaturesSectionProps {
  className?: string;
}

export default function FeaturesSectionGeoLab({ className }: FeaturesSectionProps) {
  return (
    <section className={`bg-white py-16 sm:py-20 lg:py-28 ${className}`}>
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 sm:gap-12 lg:gap-16 items-center">
          {/* Header Section */}
          <div className="flex flex-col gap-6 sm:gap-8 items-center lg:items-start justify-start w-full">
            <div className="flex flex-col gap-4 sm:gap-5 items-start justify-start text-center lg:text-left max-w-[830px] w-full">
              <div className="flex flex-col gap-2 sm:gap-3 items-start justify-start w-full">
                <div className="text-[14px] sm:text-[16px] text-blue-600 font-semibold w-full">
                  <p className="leading-[20px] sm:leading-[24px]">Lab Overview</p>
                </div>
                <div className="text-[#181d27] text-[24px] sm:text-[30px] lg:text-[36px] font-semibold tracking-[-0.48px] sm:tracking-[-0.60px] lg:tracking-[-0.72px] w-full">
                  <p className="leading-[30px] sm:leading-[36px] lg:leading-[44px]">Boost your content&apos;s reach with GEO Factor Lab</p>
                </div>
              </div>
              <div className="text-[#535862] text-[16px] sm:text-[18px] lg:text-[20px] font-normal w-full">
                <p className="leading-[24px] sm:leading-[26px] lg:leading-[30px]">Utilize our comprehensive tools to improve your content ranking. Optimize keywords and analyze engagement metrics to stay competitive. No hidden fees, just results.</p>
              </div>
            </div>
          </div>

          {/* Main Content Section */}
          <div className="flex flex-col lg:flex-row gap-8 sm:gap-12 lg:gap-16 items-center justify-start w-full">
            {/* Left Side - Feature List */}
            <div className="flex-1 min-w-0 max-w-[560px] flex flex-col gap-8 sm:gap-10 lg:gap-12 w-full order-2 lg:order-1">
              {featureItems.map((item) => (
                <div key={item.id} className="flex gap-3 sm:gap-4 items-start justify-start max-w-[560px] min-w-[320px] w-full">
                  {/* Icon */}
                  <div className="bg-white border border-[#d5d7da] rounded-[10px] w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center flex-shrink-0 shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)]">
                    <div className="w-5 h-5 sm:w-6 sm:h-6 text-[#414651]">
                      {item.icon}
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 flex flex-col gap-3 sm:gap-4 items-start justify-start pt-1 sm:pt-2.5">
                    <div className="flex flex-col gap-1 items-start justify-start w-full">
                      <div className="text-[#181d27] text-[16px] sm:text-[18px] font-semibold w-full">
                        <p className="leading-[24px] sm:leading-[28px]">{item.title}</p>
                      </div>
                      <div className="text-[#535862] text-[14px] sm:text-[16px] font-normal w-full">
                        <p className="leading-[20px] sm:leading-[24px]">{item.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Side - Dashboard Image */}
            <div className="relative w-full max-w-[400px] md:max-w-[500px] lg:max-w-[592px] lg:w-[592px] lg:h-[512px] aspect-[592/512] flex-shrink-0 order-1 lg:order-2">
              <div className="w-full h-full relative rounded-[24px] sm:rounded-[28px] lg:rounded-[32px] border border-black/8 bg-white p-0.5 sm:p-1 shadow-[0px_8px_12px_-3px_rgba(10,13,18,0.06),0px_3px_5px_-1px_rgba(10,13,18,0.02),0px_1px_2px_-1px_rgba(10,13,18,0.03)] sm:shadow-[0px_12px_16px_-4px_rgba(10,13,18,0.08),0px_4px_6px_-2px_rgba(10,13,18,0.03),0px_2px_2px_-1px_rgba(10,13,18,0.04)]">
                <div className="w-full h-full rounded-[20px] sm:rounded-[24px] lg:rounded-[28px] bg-white p-0.5 sm:p-1 shadow-[0px_0px_4px_1px_inset_rgba(10,13,18,0.06),0px_0px_3px_1px_inset_rgba(10,13,18,0.02)] sm:shadow-[0px_0px_6px_2px_inset_rgba(10,13,18,0.08),0px_0px_4px_2px_inset_rgba(10,13,18,0.03)] overflow-hidden">
                  <div className="w-full h-full rounded-[16px] sm:rounded-[20px] lg:rounded-[24px] border border-[#e9eaeb] sm:border-2 bg-neutral-50 overflow-hidden">
                    <Image
                      src="/geo_lab_main.png"
                      alt="GEO Factor Lab Dashboard"
                      fill
                      className="object-cover object-[0%_4%] scale-[0.9375]"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 592px"
                      priority
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
