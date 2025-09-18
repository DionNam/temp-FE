'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface FeaturesSectionAiGapAuditProps {
  className?: string;
}

const auditSteps = [
  {
    id: 1,
    title: "Enter your article link and select AI models.",
    description: "Start by submitting your article and choosing the AI models you want to analyze it with.",
    image: "/ai-gap-input.svg"
  },
  {
    id: 2,
    title: "See how your article ranks against competitors",
    description: "Our platform compares your content with competitors and provides a ranking.",
    image: "/ai-gap-geoscore.svg"
  },
  {
    id: 3,
    title: "Refine high-impact areas in your article.",
    description: "Get targeted recommendations to improve sections that will boost your AI visibility the most.",
    image: "/ai-gap-factor.svg"
  }
];

export default function FeaturesSectionAiGapAudit({ className }: FeaturesSectionAiGapAuditProps) {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(1);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setActiveStep((prev) => {
        const nextStep = prev >= auditSteps.length ? 1 : prev + 1;
        return nextStep;
      });
    }, 2000); // 2초 간격

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  // Handle manual step selection
  const handleStepClick = (stepId: number) => {
    setActiveStep(stepId);
    setIsAutoPlaying(false); // 수동 클릭 시 자동 재생 중지
    
    // 5초 후 자동 재생 재시작
    setTimeout(() => {
      setIsAutoPlaying(true);
    }, 5000);
  };

  return (
    <section className={`bg-white py-16 sm:py-20 lg:py-28 ${className}`}>
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 sm:gap-12 lg:gap-16 items-center">
          {/* Header Section */}
          <div className="flex flex-col gap-6 sm:gap-8 items-center lg:items-end justify-start w-full">
            <div className="flex flex-col gap-4 sm:gap-5 items-start justify-start text-center lg:text-right max-w-[800px] w-full lg:ml-auto">
              <div className="flex flex-col gap-2 sm:gap-3 items-start justify-start w-full">
                <div className="text-[14px] sm:text-[16px] text-blue-600 font-semibold w-full">
                  <p className="leading-[20px] sm:leading-[24px]">AI Gap Audit Overview</p>
                </div>
                <div className="text-[#181d27] text-[24px] sm:text-[30px] lg:text-[36px] font-semibold tracking-[-0.48px] sm:tracking-[-0.60px] lg:tracking-[-0.72px] w-full">
                  <p className="leading-[30px] sm:leading-[36px] lg:leading-[44px]">Elevate your content with our AI Gap Audit.</p>
                </div>
              </div>
              <div className="text-[#535862] text-[16px] sm:text-[18px] lg:text-[20px] font-normal w-full">
                <p className="leading-[24px] sm:leading-[26px] lg:leading-[30px]">Easily audit your content and receive clear, actionable guidance to refine it for maximum AI visibility. Our platform identifies areas for improvement, helping you close the gap with competitors and elevate your content's presence.</p>
              </div>
            </div>
          </div>

          {/* Main Content Section */}
          <div className="flex flex-col lg:flex-row gap-8 sm:gap-12 lg:gap-16 items-center justify-start w-full">
            {/* Left Side - Dynamic Image Display */}
            <div className="relative w-full max-w-[400px] md:max-w-[500px] lg:max-w-[592px] lg:flex-1 aspect-[592/512] flex-shrink order-2 lg:order-1">
              {/* Dynamic Content Area - Shows different images based on active step */}
              <div className="w-full h-full rounded-lg overflow-hidden bg-white transition-all duration-500">
                <Image
                  src={auditSteps.find(step => step.id === activeStep)?.image || auditSteps[0].image}
                  alt={`AI Audit Step ${activeStep}`}
                  fill
                  className="object-contain p-3 sm:p-4 lg:p-6 scale-[1.1] transition-all duration-500"
                />
              </div>
            </div>

            {/* Right Side - Interactive Steps */}
            <div className="flex-1 min-w-0 max-w-[560px] flex flex-col w-full order-1 lg:order-2">
              {auditSteps.map((step, index) => (
                <div
                  key={step.id}
                  className={`group flex flex-col gap-3 sm:gap-4 items-start justify-start pl-4 sm:pl-6 pr-2 sm:pr-4 py-5 sm:py-7 relative cursor-pointer transition-all duration-300 rounded-r-lg hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-blue-25/25 hover:shadow-sm ${
                    activeStep === step.id 
                      ? 'border-l-4 border-blue-600 bg-gradient-to-r from-blue-50/70 to-blue-25/35 shadow-sm' 
                      : 'border-l-4 border-neutral-100 hover:border-l-4 hover:border-blue-200'
                  }`}
                  onClick={() => handleStepClick(step.id)}
                >
                  <div className="flex flex-col gap-1 items-start justify-start w-full">
                    <div className={`text-[16px] sm:text-[18px] font-semibold leading-[24px] sm:leading-[28px] transition-all duration-300 ${
                      activeStep === step.id 
                        ? 'text-[#181d27] transform translate-x-1' 
                        : 'text-neutral-600 group-hover:text-[#181d27] group-hover:transform group-hover:translate-x-1'
                    }`}>
                      <p>{step.title}</p>
                    </div>
                    <div className={`text-[14px] sm:text-[16px] font-normal leading-[20px] sm:leading-[24px] transition-all duration-300 ${
                      activeStep === step.id 
                        ? 'text-[#535862] transform translate-x-1' 
                        : 'text-neutral-500 group-hover:text-[#535862] group-hover:transform group-hover:translate-x-1'
                    }`}>
                      <p>{step.description}</p>
                    </div>
                  </div>
                  
                  {/* Hover indicator */}
                  <div className={`absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 transition-all duration-300 ${
                    activeStep === step.id 
                      ? 'opacity-100 scale-100' 
                      : 'opacity-0 scale-75 group-hover:opacity-60 group-hover:scale-90'
                  }`}>
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
