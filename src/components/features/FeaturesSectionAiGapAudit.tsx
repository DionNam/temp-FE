'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

const img = "http://localhost:3845/assets/b5f54a34a588bee25d5d78a7012c8889b97f3597.png";
const img1 = "http://localhost:3845/assets/dc5469bb8630765e71e1603c145274dff1ea81bd.svg";

interface FeaturesSectionAiGapAuditProps {
  className?: string;
}

export default function FeaturesSectionAiGapAudit({ className }: FeaturesSectionAiGapAuditProps) {
  return (
    <section className={`bg-white py-24 ${className}`}>
      <div className="max-w-[1280px] mx-auto px-8">
        {/* Header Section */}
        <div className="flex flex-col gap-8 items-end mb-16">
          <div className="flex flex-col gap-5 max-w-[800px] w-full">
            <div className="flex flex-col gap-3 items-end">
              <div className="text-[16px] text-blue-600 font-semibold text-right">
                <p className="leading-[24px]">AI Gap Audit Overview</p>
              </div>
              <div className="text-[#181d27] text-[36px] tracking-[-0.72px] font-semibold text-right">
                <p className="leading-[44px]">Elevate your content with our AI Gap Audit.</p>
              </div>
            </div>
            <div className="text-[#535862] text-[20px] font-normal text-right">
              <p className="leading-[30px]">
                Easily audit your content and receive clear, actionable guidance to refine it for maximum AI visibility. Our platform identifies areas for improvement, helping you close the gap with competitors and elevate your content's presence.
              </p>
            </div>
          </div>
        </div>
        
        {/* Main Content Section */}
        <div className="flex gap-16 items-center">
          {/* Left Side - Mockup */}
          <div className="flex-1 h-[512px] relative">
            <div className="absolute h-[496px] left-0 top-0 w-full">
              <div className="absolute bg-white flex flex-col items-start left-1/2 p-[4px] rounded-[32px] top-0 transform -translate-x-1/2 border border-[rgba(0,0,0,0.08)] shadow-[0px_12px_16px_-4px_rgba(10,13,18,0.08),0px_4px_6px_-2px_rgba(10,13,18,0.03),0px_2px_2px_-1px_rgba(10,13,18,0.04)]">
                <div className="bg-white flex flex-col items-start overflow-hidden p-[4px] rounded-[28px]">
                  <div className="bg-neutral-50 rounded-[24px] border-2 border-[#e9eaeb] overflow-hidden">
                    <div 
                      className="bg-[position:0%_4%] bg-no-repeat bg-cover h-[480px] w-[720px]" 
                      style={{ backgroundImage: `url('${img}')` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Side - Feature Tabs */}
          <div className="flex-1 flex flex-col max-w-[560px]">
            {/* Feature Tab 1 - Active */}
            <div className="flex flex-col gap-4 pl-6 py-4 border-l-4 border-blue-600">
              <div className="flex flex-col gap-1">
                <div className="text-[#181d27] text-[18px] font-semibold">
                  <p className="leading-[28px]">Enter your article link and select AI models.</p>
                </div>
                <div className="text-[#535862] text-[16px] font-normal">
                  <p className="leading-[24px]">Start by submitting your article and choosing the AI models you want to analyze it with.</p>
                </div>
              </div>
              <div className="flex gap-1.5 items-center">
                <div className="text-[16px] text-blue-600 font-semibold">
                  <p className="leading-[24px]">Learn more</p>
                </div>
                <ArrowRight className="w-5 h-5 text-blue-600" />
              </div>
            </div>
            
            {/* Feature Tab 2 */}
            <div className="flex flex-col gap-4 pl-6 py-4 border-l-4 border-neutral-100">
              <div className="flex flex-col gap-1">
                <div className="text-[#181d27] text-[18px] font-semibold">
                  <p className="leading-[28px]">See how your article ranks against competitors</p>
                </div>
                <div className="text-[#535862] text-[16px] font-normal">
                  <p className="leading-[24px]">Our platform compares your content with competitors and provides a ranking.</p>
                </div>
              </div>
              <div className="flex gap-1.5 items-center">
                <div className="text-[16px] text-blue-600 font-semibold">
                  <p className="leading-[24px]">Learn more</p>
                </div>
                <ArrowRight className="w-5 h-5 text-blue-600" />
              </div>
            </div>
            
            {/* Feature Tab 3 */}
            <div className="flex flex-col gap-4 pl-6 py-4 border-l-4 border-neutral-100">
              <div className="flex flex-col gap-1">
                <div className="text-[#181d27] text-[18px] font-semibold">
                  <p className="leading-[28px]">Refine high-impact areas in your article.</p>
                </div>
                <div className="text-[#535862] text-[16px] font-normal">
                  <p className="leading-[24px]">Get targeted recommendations to improve sections that will boost your AI visibility the most.</p>
                </div>
              </div>
              <div className="flex gap-1.5 items-center">
                <div className="text-[16px] text-blue-600 font-semibold">
                  <p className="leading-[24px]">Learn more</p>
                </div>
                <ArrowRight className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
