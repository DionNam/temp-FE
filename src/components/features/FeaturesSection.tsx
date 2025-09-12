'use client';

import React from 'react';
import Image from 'next/image';

interface FeaturesSectionProps {
  className?: string;
}

export default function FeaturesSection({ className }: FeaturesSectionProps) {
  return (
    <section className={`bg-white py-12 sm:py-16 lg:py-24 ${className}`}>
      <div className="max-w-[1216px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-12 sm:gap-16 items-center">
          {/* Section Header */}
          <div className="flex flex-col items-center gap-6 sm:gap-10 max-w-[800px] text-center py-4 sm:py-8">
            <div className="flex flex-col items-center gap-4 sm:gap-5">
              {/* Badge */}
              <div className="border border-neutral-200 rounded-md px-2.5 py-1">
                <span className="text-sm font-medium text-neutral-700">
                  What we&apos;re trying to solve
                </span>
              </div>
              
              {/* Title and Description */}
              <div className="flex flex-col items-center gap-3 sm:gap-4">
                <h2 className="text-2xl sm:text-3xl lg:text-[36px] font-medium text-neutral-900 leading-tight sm:leading-[44px] tracking-[-0.36px] max-w-[800px] px-4 sm:px-0">
                  Wondering why your content isn&apos;t making the cut on AI platforms like GPT? You&apos;re not alone.
                </h2>
                <p className="text-base sm:text-lg text-neutral-700 leading-6 sm:leading-7 max-w-[592px] px-4 sm:px-0">
                  Discover the secrets to optimizing your content for visibility. Learn why competitors rank higher and how to enhance your own presence.
                </p>
              </div>
            </div>
          </div>

          {/* Feature Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 w-full max-w-[1216px]">
            {/* Card 1 - AI Visibility */}
            <div className="bg-neutral-50 rounded-[20px] border border-neutral-200 overflow-hidden">
              <div className="flex flex-col">
                {/* Text Content */}
                <div className="px-4 sm:px-6 py-4 sm:py-6 flex flex-col gap-2.5">
                  <h3 className="text-lg font-medium text-neutral-900 leading-7">
                    Uncover the mystery of AI visibility.
                  </h3>
                  <p className="text-sm text-neutral-700 leading-5">
                    Whether you&apos;re a small startup or a large enterprise, understanding AI preferences can help you craft content that resonates and ranks.
                  </p>
                </div>
                
                {/* AI Visibility Illustration */}
                <div className="h-[200px] sm:h-[250px] lg:h-[300px] bg-neutral-50 flex items-center justify-center p-2 sm:p-4">
                  <div className="w-full h-full relative">
                    <Image
                      src="/ai_visibility.svg"
                      alt="AI Visibility Diagram"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2 - Content Analysis */}
            <div className="bg-neutral-50 rounded-[20px] border border-neutral-200 overflow-hidden">
              <div className="flex flex-col">
                {/* Globe Illustration */}
                <div className="h-[200px] sm:h-[250px] lg:h-[300px] bg-neutral-50 flex items-center justify-center p-2 sm:p-4">
                  <div className="w-full h-full relative">
                    <Image
                      src="/globe.png"
                      alt="Global Content Analysis"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                
                {/* Text Content */}
                <div className="px-4 sm:px-6 py-4 sm:py-6 flex flex-col gap-2.5">
                  <h3 className="text-lg font-semibold text-[#181d27] leading-7">
                    Analyze your content&apos;s impact.
                  </h3>
                  <p className="text-sm text-neutral-700 leading-5">
                    With our intuitive reporting tools, you can easily track performance metrics and gain actionable insights.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 3 - Performance Insights */}
            <div className="bg-neutral-50 rounded-[20px] border border-neutral-200 overflow-hidden">
              <div className="flex flex-col">
                {/* Text Content */}
                <div className="px-4 sm:px-6 py-4 sm:py-6 flex flex-col gap-2.5">
                  <h3 className="text-lg font-medium text-neutral-900 leading-7">
                    Your content performance insight.
                  </h3>
                  <p className="text-sm text-neutral-700 leading-5">
                    Our comprehensive analytics platform empowers you to understand what your audience craves and how to deliver it.
                  </p>
                </div>
                
                {/* Tracking Performance Illustration */}
                <div className="h-[200px] sm:h-[250px] lg:h-[300px] bg-neutral-50 flex items-center justify-center p-2 sm:p-4">
                  <div className="w-full h-full relative">
                    <Image
                      src="/tracking.png"
                      alt="Performance Tracking Dashboard"
                      fill
                      className="object-cover"
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
