'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface FeaturesSectionAiGapAuditProps {
  className?: string;
}

export default function FeaturesSectionAiGapAudit({ className }: FeaturesSectionAiGapAuditProps) {
  const router = useRouter();
  return (
    <section className={`bg-white py-12 sm:py-16 lg:py-24 ${className}`}>
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Content Section */}
        <div className="flex flex-col lg:flex-row-reverse gap-8 lg:gap-16 items-start lg:items-center">
          {/* Right Side - Content */}
          <div className="w-full lg:flex-1 flex flex-col max-w-none lg:max-w-[560px]">
            {/* Header */}
            <div className="flex flex-col gap-6 sm:gap-8 mb-8 sm:mb-12">
              <div className="flex flex-col gap-4 sm:gap-5">
                <div className="flex flex-col gap-3">
                  <div className="text-[14px] sm:text-[16px] text-blue-600 font-semibold">
                    <p className="leading-[20px] sm:leading-[24px]">AI Gap Audit</p>
                  </div>
                  <div className="text-[#181d27] text-[24px] sm:text-[32px] lg:text-[36px] tracking-[-0.48px] sm:tracking-[-0.72px] font-semibold">
                    <p className="leading-[30px] sm:leading-[38px] lg:leading-[44px]">Discover what's missing in your AI strategy</p>
                  </div>
                </div>
                <div className="text-[#535862] text-[16px] sm:text-[18px] lg:text-[20px] font-normal">
                  <p className="leading-[24px] sm:leading-[26px] lg:leading-[30px]">
                    Get a comprehensive audit of your content's AI visibility gaps. 
                    <br className="hidden sm:block" />
                    Understand where you're losing opportunities and how to fix them.
                  </p>
                </div>
              </div>
            </div>

            {/* Feature Points */}
            <div className="flex flex-col gap-6 sm:gap-8">
              {/* Point 1 */}
              <div className="flex gap-4 sm:gap-6 items-start">
                <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm sm:text-base font-semibold">1</span>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="text-[#181d27] text-[16px] sm:text-[18px] font-semibold">
                    <p className="leading-[24px] sm:leading-[28px]">Content Gap Analysis</p>
                  </div>
                  <div className="text-[#535862] text-[14px] sm:text-[16px] font-normal">
                    <p className="leading-[20px] sm:leading-[24px]">Identify missing keywords and topics that AI platforms prioritize in your industry.</p>
                  </div>
                </div>
              </div>

              {/* Point 2 */}
              <div className="flex gap-4 sm:gap-6 items-start">
                <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm sm:text-base font-semibold">2</span>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="text-[#181d27] text-[16px] sm:text-[18px] font-semibold">
                    <p className="leading-[24px] sm:leading-[28px]">Competitor Benchmarking</p>
                  </div>
                  <div className="text-[#535862] text-[14px] sm:text-[16px] font-normal">
                    <p className="leading-[20px] sm:leading-[24px]">See how your AI visibility compares to competitors and what they're doing differently.</p>
                  </div>
                </div>
              </div>

              {/* Point 3 */}
              <div className="flex gap-4 sm:gap-6 items-start">
                <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm sm:text-base font-semibold">3</span>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="text-[#181d27] text-[16px] sm:text-[18px] font-semibold">
                    <p className="leading-[24px] sm:leading-[28px]">Actionable Recommendations</p>
                  </div>
                  <div className="text-[#535862] text-[14px] sm:text-[16px] font-normal">
                    <p className="leading-[20px] sm:leading-[24px]">Get specific, prioritized recommendations to improve your AI search rankings.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="mt-8 sm:mt-12">
              <button 
                onClick={() => router.push('/onboarding')}
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-[16px] sm:text-[18px] font-semibold transition-colors"
              >
                Start Your AI Audit
                <ArrowRight className="w-4 sm:w-5 h-4 sm:h-5" />
              </button>
            </div>
          </div>
          
          {/* Left Side - Image */}
          <div className="w-full lg:flex-1 relative">
            <div className="aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3] w-full relative rounded-lg overflow-hidden shadow-lg">
              <Image
                src="/prescription.webp"
                alt="AI Gap Audit Report"
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
