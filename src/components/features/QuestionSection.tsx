'use client';

import React from 'react';

interface QuestionSectionProps {
  className?: string;
}

export default function QuestionSection({ className }: QuestionSectionProps) {
  return (
    <section className={`bg-[#e5f2ff] py-20 sm:py-24 lg:py-32 ${className}`}>
      <div className="max-w-[1216px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-16 items-center">
          {/* Section Header */}
          <div className="flex flex-col items-center justify-center pb-12 pt-8 px-0 overflow-hidden w-full">
            <div className="flex flex-col gap-10 items-center justify-start w-full">
              <div className="flex flex-col gap-5 items-center justify-start">
                {/* Badge */}
                <div className="bg-white border border-neutral-200 rounded-[6px] px-[10px] py-[4px]">
                  <p className="text-[14px] font-medium text-neutral-700 leading-[20px]">
                    What we&apos;re trying to solve
                  </p>
                </div>
                
                {/* Title and Description */}
                <div className="flex flex-col gap-4 items-center justify-start text-center w-full">
                  <h2 className="text-[36px] font-medium text-neutral-900 leading-[44px] tracking-[-0.36px] max-w-[800px]">
                    Wondering why your content isn&apos;t making the cut on AI platforms like GPT? You&apos;re not alone.
                  </h2>
                  <p className="text-[18px] font-normal text-neutral-700 leading-[28px] max-w-[592px]">
                    Discover the secrets to optimizing your content for visibility. Learn why competitors rank higher and how to enhance your own presence.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
