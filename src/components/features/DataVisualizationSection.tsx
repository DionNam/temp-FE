'use client';

import React from 'react';
import Image from 'next/image';

interface DataVisualizationSectionProps {
  className?: string;
}

export default function DataVisualizationSection({ className }: DataVisualizationSectionProps) {
  return (
    <section className={`bg-white py-16 sm:py-20 lg:py-32 ${className}`}>
      <div className="max-w-[1216px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 sm:gap-10 lg:gap-12 items-center">
          {/* Header Section */}
          <div className="flex flex-col gap-8 sm:gap-10 lg:gap-12 items-center justify-start w-full overflow-hidden py-8 sm:py-12">
            <div className="flex flex-col gap-8 items-center justify-start w-full">
              <div className="flex flex-col gap-5 items-center justify-start text-center max-w-[800px] w-full">
                <div className="flex flex-col gap-3 items-center justify-start w-full">
                  <div className="text-[14px] sm:text-[16px] text-blue-600 font-semibold w-full">
                    <p className="leading-[20px] sm:leading-[24px]">We didn't rely on guesses.</p>
                  </div>
                  <div className="text-[#181d27] text-[28px] sm:text-[32px] lg:text-[36px] font-semibold tracking-[-0.56px] sm:tracking-[-0.64px] lg:tracking-[-0.72px] w-full">
                    <p className="leading-[34px] sm:leading-[38px] lg:leading-[44px]">How we found what matters?</p>
                  </div>
                </div>
                <div className="text-[#535862] text-[16px] sm:text-[18px] lg:text-[20px] font-normal w-full">
                  <p className="leading-[24px] sm:leading-[26px] lg:leading-[30px]">
                    To understand how AI platforms like ChatGPT, Gemini, and Perplexity cite content, we ran one of the largest GEO analyses to date. Through this large-scale analysis, we uncovered the unique signals that make content more likely to be cited — insights that traditional SEO alone could never reveal.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Data Visualization Chart */}
          <div className="w-full flex flex-col gap-2 items-start justify-start">
            <div className="w-full h-[300px] sm:h-[400px] lg:h-[497px] relative overflow-hidden">
              <Image
                src="/data_vis.svg"
                alt="GEO Analysis Data Visualization showing factor importance and impact distribution"
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 90vw, 1216px"
                priority
              />
            </div>
          </div>

          {/* Bottom Stats Section */}
          <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 items-start justify-start w-full">
            {/* Stat 1 */}
            <div className="flex flex-col gap-6 sm:gap-7 items-center justify-start flex-1 w-full">
              <div className="flex flex-col gap-6 items-start justify-start w-full">
                <div className="flex flex-col gap-4 items-start justify-start text-center w-full">
                  <div className="text-[20px] sm:text-[22px] lg:text-[24px] text-neutral-900 font-medium tracking-[-0.20px] sm:tracking-[-0.22px] lg:tracking-[-0.24px] w-full">
                    <p className="leading-[26px] sm:leading-[28px] lg:leading-[32px]">1M+ content samples</p>
                  </div>
                  <div className="text-[14px] sm:text-[15px] lg:text-[16px] text-neutral-700 font-normal w-full">
                    <p className="leading-[20px] sm:leading-[22px] lg:leading-[24px]">
                      Compared highly cited vs. rarely cited<br />
                      pages across platforms
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Stat 2 */}
            <div className="flex flex-col gap-6 sm:gap-7 items-center justify-start flex-1 w-full">
              <div className="flex flex-col gap-6 items-start justify-start w-full">
                <div className="flex flex-col gap-4 items-start justify-start text-center w-full">
                  <div className="text-[20px] sm:text-[22px] lg:text-[24px] text-neutral-900 font-medium tracking-[-0.20px] sm:tracking-[-0.22px] lg:tracking-[-0.24px] w-full">
                    <p className="leading-[26px] sm:leading-[28px] lg:leading-[32px]">Cross-platform insights</p>
                  </div>
                  <div className="text-[14px] sm:text-[15px] lg:text-[16px] text-neutral-700 font-normal w-full">
                    <p className="leading-[20px] sm:leading-[22px] lg:leading-[24px]">
                      Identified clear differences in citation behavior<br />
                      by platform
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Stat 3 */}
            <div className="flex flex-col gap-6 sm:gap-7 items-center justify-start flex-1 w-full">
              <div className="flex flex-col gap-6 items-start justify-start w-full">
                <div className="flex flex-col gap-4 items-start justify-start text-center w-full">
                  <div className="text-[20px] sm:text-[22px] lg:text-[24px] text-neutral-900 font-medium tracking-[-0.20px] sm:tracking-[-0.22px] lg:tracking-[-0.24px] w-full">
                    <p className="leading-[26px] sm:leading-[28px] lg:leading-[32px]">Content-type patterns</p>
                  </div>
                  <div className="text-[14px] sm:text-[15px] lg:text-[16px] text-neutral-700 font-normal w-full">
                    <p className="leading-[20px] sm:leading-[22px] lg:leading-[24px]">
                      Discovered each types of content to gain visibility and which stay invisible
                    </p>
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
