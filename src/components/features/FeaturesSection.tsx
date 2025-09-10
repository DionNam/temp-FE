'use client';

import React from 'react';
import Image from 'next/image';

interface FeaturesSectionProps {
  className?: string;
}

export default function FeaturesSection({ className }: FeaturesSectionProps) {
  return (
    <section className={`bg-white py-24 ${className}`}>
      <div className="max-w-[1216px] mx-auto px-8">
        <div className="flex flex-col gap-16 items-center">
          {/* Section Header */}
          <div className="flex flex-col items-center gap-10 max-w-[800px] text-center py-8">
            <div className="flex flex-col items-center gap-5">
              {/* Badge */}
              <div className="border border-neutral-200 rounded-md px-2.5 py-1">
                <span className="text-sm font-medium text-neutral-700">
                  What we're trying to solve
                </span>
              </div>
              
              {/* Title and Description */}
              <div className="flex flex-col items-center gap-4">
                <h2 className="text-[36px] font-medium text-neutral-900 leading-[44px] tracking-[-0.36px] max-w-[800px]">
                  Wondering why your content isn't making the cut on AI platforms like GPT? You're not alone.
                </h2>
                <p className="text-lg text-neutral-700 leading-7 max-w-[592px]">
                  Discover the secrets to optimizing your content for visibility. Learn why competitors rank higher and how to enhance your own presence.
                </p>
              </div>
            </div>
          </div>

          {/* Feature Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-[1216px]">
            {/* Card 1 - AI Visibility */}
            <div className="bg-neutral-50 rounded-[20px] border border-neutral-200 overflow-hidden">
              <div className="flex flex-col">
                {/* Text Content */}
                <div className="px-6 py-6 flex flex-col gap-2.5">
                  <h3 className="text-lg font-medium text-neutral-900 leading-7">
                    Uncover the mystery of AI visibility.
                  </h3>
                  <p className="text-sm text-neutral-700 leading-5">
                    Whether you're a small startup or a large enterprise, understanding AI preferences can help you craft content that resonates and ranks.
                  </p>
                </div>
                
                {/* Illustration Placeholder */}
                <div className="h-[300px] bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
                  <div className="w-20 h-20 bg-blue-500 rounded-2xl flex items-center justify-center">
                    <Image
                      src="/assets/Icon-1.svg"
                      alt="AI Visibility Icon"
                      width={32}
                      height={32}
                      className="w-8 h-8 text-white"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2 - Content Analysis */}
            <div className="bg-neutral-50 rounded-[20px] border border-neutral-200 overflow-hidden">
              <div className="flex flex-col">
                {/* Illustration Placeholder */}
                <div className="h-[300px] bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center relative">
                  {/* Chart visualization placeholder */}
                  <div className="relative w-full h-full flex items-center justify-center">
                    <div className="w-32 h-32 bg-green-500 rounded-full opacity-20"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 bg-green-600 rounded-lg flex items-center justify-center">
                        <Image
                          src="/chart-donut.svg"
                          alt="Analytics Icon"
                          width={24}
                          height={24}
                          className="w-6 h-6 text-white"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Text Content */}
                <div className="px-6 py-6 flex flex-col gap-2.5">
                  <h3 className="text-lg font-semibold text-[#181d27] leading-7">
                    Analyze your content's impact.
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
                <div className="px-6 py-6 flex flex-col gap-2.5">
                  <h3 className="text-lg font-medium text-neutral-900 leading-7">
                    Your content performance insight.
                  </h3>
                  <p className="text-sm text-neutral-700 leading-5">
                    Our comprehensive analytics platform empowers you to understand what your audience craves and how to deliver it.
                  </p>
                </div>
                
                {/* Illustration Placeholder */}
                <div className="h-[300px] bg-white flex items-center justify-center relative">
                  {/* Graph visualization placeholder */}
                  <div className="relative w-full h-full p-8">
                    <div className="w-full h-full bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 rounded-lg opacity-20"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="flex items-end gap-2">
                        <div className="w-4 h-16 bg-blue-500 rounded-t"></div>
                        <div className="w-4 h-20 bg-blue-600 rounded-t"></div>
                        <div className="w-4 h-12 bg-blue-400 rounded-t"></div>
                        <div className="w-4 h-24 bg-blue-700 rounded-t"></div>
                      </div>
                    </div>
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
