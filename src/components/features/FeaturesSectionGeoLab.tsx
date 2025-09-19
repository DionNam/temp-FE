'use client';

import React from 'react';
import Image from 'next/image';

// Feature icon components
function MessageChatCircleIcon() {
  return (
    <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 13.5997 2.37562 15.1116 3.04346 16.4525C3.22094 16.8088 3.28001 17.2161 3.17712 17.6006L2.58151 19.8267C2.32295 20.793 3.20701 21.677 4.17335 21.4185L6.39939 20.8229C6.78393 20.72 7.19121 20.7791 7.54753 20.9565C8.88837 21.6244 10.4003 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function ZapIcon() {
  return (
    <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function ChartBreakoutSquareIcon() {
  return (
    <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M21 21H7.8C6.11984 21 5.27976 21 4.63803 20.673C4.07354 20.3854 3.6146 19.9265 3.32698 19.362C3 18.7202 3 17.8802 3 16.2V3M7 14L10.5 10.5L13.5 13.5L21 6M15 6H21V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

// Featured Icon component
interface FeaturedIconProps {
  children: React.ReactNode;
}

function FeaturedIcon({ children }: FeaturedIconProps) {
  return (
    <div className="bg-white relative rounded-[10px] w-12 h-12 flex-shrink-0">
      <div className="overflow-hidden relative w-full h-full">
        <div className="absolute left-3 top-3 w-6 h-6 text-[#414651]">
          {children}
        </div>
      </div>
      <div className="absolute inset-0 pointer-events-none shadow-[0px_0px_0px_1px_inset_rgba(10,13,18,0.18),0px_-2px_0px_0px_inset_rgba(10,13,18,0.05)]" />
      <div aria-hidden="true" className="absolute border border-[#d5d7da] border-solid inset-0 pointer-events-none rounded-[10px] shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)]" />
    </div>
  );
}

// Feature text component
interface FeatureTextProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

function FeatureText({ title, description, children }: FeatureTextProps) {
  return (
    <div className="flex gap-4 items-start justify-start max-w-[560px] min-w-[320px] w-full">
      <FeaturedIcon>
        {children}
      </FeaturedIcon>
      <div className="flex-1 flex flex-col gap-4 items-start justify-start min-h-px min-w-px">
        <div className="box-border flex flex-col gap-1 items-start justify-start leading-[0] not-italic pb-0 pt-[10px] px-0 w-full">
          <div className="font-semibold text-[#181d27] text-lg w-full">
            <p className="leading-7">{title}</p>
          </div>
          <div className="font-normal text-[#535862] text-base w-full">
            <p className="leading-6">{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

interface FeaturesSectionProps {
  className?: string;
}

export default function FeaturesSectionGeoLab({ className }: FeaturesSectionProps) {
  return (
    <div className={`bg-white box-border flex flex-col gap-16 items-center justify-start px-0 py-16 sm:py-20 lg:py-24 w-full ${className || ''}`}>
      {/* Container */}
      <div className="box-border flex flex-col gap-8 items-end justify-start max-w-[1280px] px-4 sm:px-6 lg:px-8 py-0 w-full">
        {/* Content */}
        <div className="flex flex-col gap-8 items-start justify-start w-full">
          {/* Heading and supporting text */}
          <div className="flex flex-col gap-5 items-end justify-start leading-[0] not-italic w-full max-w-[830px]">
            {/* Heading and subheading */}
            <div className="flex flex-col font-semibold gap-3 items-start justify-start w-full">
              <div className="text-base text-blue-600 w-full">
                <p className="leading-6">Lab Overview</p>
              </div>
              <div className="text-[#181d27] text-2xl sm:text-3xl lg:text-4xl tracking-tight w-full">
                <p className="leading-8 sm:leading-10 lg:leading-[44px]">Boost your content&apos;s reach with GEO Factor Lab</p>
              </div>
            </div>
            <div className="font-normal text-[#535862] text-lg lg:text-xl w-full">
              <p className="leading-7 lg:leading-[30px]">Utilize our comprehensive tools to improve your content ranking. Optimize keywords and analyze engagement metrics to stay competitive. No hidden fees, just results.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main content container */}
      <div className="box-border flex flex-col lg:flex-row gap-16 items-center lg:items-start justify-start max-w-[1280px] px-4 sm:px-6 lg:px-8 py-0 w-full">
        {/* Left side - Features */}
        <div className="flex-1 flex flex-col gap-12 items-start justify-start max-w-[560px] min-w-0 order-2 lg:order-1">
          <FeatureText 
            title="Article Intelligence Mapping"
            description="Analyze and categorize articles by type to visualize their distribution and performance"
          >
            <MessageChatCircleIcon />
          </FeatureText>

          <FeatureText 
            title="Factor Lab Relevance Index"
            description="Show a ranked list of key ranking factors most impactful for each article type."
          >
            <ZapIcon />
          </FeatureText>

          <FeatureText 
            title="Source-AI Correlation Analysis"
            description="Reveal how the quality and type of cited sources influence rankings using AI-driven correlation charts."
          >
            <ChartBreakoutSquareIcon />
          </FeatureText>
        </div>

        {/* Right side - Dashboard mockup */}
        <div className="bg-white h-[320px] sm:h-[400px] lg:h-[512px] w-full max-w-[500px] lg:max-w-[592px] lg:w-[592px] flex-shrink-0 order-1 lg:order-2">
          <div className="flex flex-col gap-[10px] h-full items-start justify-start overflow-hidden w-full">
            <div className="h-full relative w-full">
              <div className="absolute bg-white box-border flex flex-col items-start justify-start p-1 rounded-[32px] inset-0">
                <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.08)] border-solid inset-[-1px] pointer-events-none rounded-[33px] shadow-[0px_12px_16px_-4px_rgba(10,13,18,0.08),0px_4px_6px_-2px_rgba(10,13,18,0.03),0px_2px_2px_-1px_rgba(10,13,18,0.04)]" />
                <div className="bg-white box-border flex flex-col items-start justify-start overflow-hidden p-1 rounded-[28px] w-full h-full">
                  <div className="bg-neutral-50 rounded-[24px] w-full h-full">
                    <div className="flex flex-col items-start justify-start overflow-hidden w-full h-full">
                      <div className="w-full h-full relative">
                        <Image
                          src="/feature-geo_lab.svg"
                          alt="GEO Factor Lab Dashboard"
                          fill
                          className="object-cover object-[0%_4%]"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 592px"
                          priority
                        />
                      </div>
                    </div>
                    <div aria-hidden="true" className="absolute border-2 border-[#e9eaeb] border-solid inset-0 pointer-events-none rounded-[24px]" />
                  </div>
                  <div className="absolute inset-0 pointer-events-none shadow-[0px_0px_6px_2px_inset_rgba(10,13,18,0.08),0px_0px_4px_2px_inset_rgba(10,13,18,0.03)]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
