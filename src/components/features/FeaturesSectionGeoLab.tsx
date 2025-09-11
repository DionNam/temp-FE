'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

interface FeatureStep {
  id: number;
  title: string;
  description: string;
  image: string;
}

const featureSteps: FeatureStep[] = [
  {
    id: 1,
    title: "Enter your article link and select AI models.",
    description: "Start by inputting or pasting the article you want to analyze into the GEO Factor Lab platform.",
    image: "/diagnosis.webp"
  },
  {
    id: 2,
    title: "Select the Factor to Analyze",
    description: "Choose specific AI visibility factors (e.g., keywords, ranking metrics, traffic sources, etc.) relevant to your analysis.",
    image: "/brand-sov.webp"
  },
  {
    id: 3,
    title: "Complete Analytics and Competitor Comparison",
    description: "The system will automatically generate a full analysis report for your article. It will also compare the analyzed factors with your competitors.",
    image: "/tracking.webp"
  }
];

interface FeaturesSectionProps {
  className?: string;
}

export default function FeaturesSectionGeoLab({ className }: FeaturesSectionProps) {
  const [activeStep, setActiveStep] = useState(1);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-rotate through steps every 4 seconds
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setActiveStep(current => {
        const nextStep = current >= featureSteps.length ? 1 : current + 1;
        return nextStep;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  // Pause auto-play when user interacts
  const handleStepClick = (stepId: number) => {
    setIsAutoPlaying(false);
    setActiveStep(stepId);
    
    // Resume auto-play after 10 seconds of no interaction
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };
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
            {featureSteps.map((step) => (
              <div
                key={step.id}
                onClick={() => handleStepClick(step.id)}
                className={`flex flex-col gap-3 sm:gap-4 pl-4 sm:pl-6 py-3 sm:py-4 border-l-4 cursor-pointer transition-all duration-300 ease-in-out group ${
                  activeStep === step.id
                    ? 'border-blue-600 bg-blue-50/30'
                    : 'border-neutral-100 hover:border-blue-300 hover:bg-blue-50/10'
                }`}
              >
                <div className="flex flex-col gap-1">
                  <div className={`text-[16px] sm:text-[18px] font-semibold transition-colors duration-300 ${
                    activeStep === step.id ? 'text-[#181d27]' : 'text-[#535862] group-hover:text-[#181d27]'
                  }`}>
                    <p className="leading-[24px] sm:leading-[28px]">{step.title}</p>
                  </div>
                  <div className={`text-[14px] sm:text-[16px] font-normal transition-colors duration-300 ${
                    activeStep === step.id ? 'text-[#535862]' : 'text-[#6b7280] group-hover:text-[#535862]'
                  }`}>
                    <p className="leading-[20px] sm:leading-[24px]">{step.description}</p>
                  </div>
                </div>
                <div className="flex gap-1.5 items-center">
                  <div className={`text-[14px] sm:text-[16px] font-semibold transition-colors duration-300 ${
                    activeStep === step.id ? 'text-blue-600' : 'text-blue-500 group-hover:text-blue-600'
                  }`}>
                    <p className="leading-[20px] sm:leading-[24px]">Learn more</p>
                  </div>
                  <ArrowRight className={`w-4 sm:w-5 h-4 sm:h-5 transition-all duration-300 ${
                    activeStep === step.id 
                      ? 'text-blue-600 transform translate-x-1' 
                      : 'text-blue-500 group-hover:text-blue-600 group-hover:translate-x-1'
                  }`} />
                </div>
              </div>
            ))}
          </div>
          
          {/* Right Side - Mockup */}
          <div className="w-full lg:flex-1 relative">
            <div className="aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3] w-full relative rounded-lg overflow-hidden shadow-lg">
              <Image
                src={featureSteps.find(step => step.id === activeStep)?.image || "/diagnosis.webp"}
                alt={`GEO Factor Lab - ${featureSteps.find(step => step.id === activeStep)?.title}`}
                fill
                className="object-cover transition-opacity duration-500 ease-in-out"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 40vw"
                priority
                key={activeStep} // Force re-render for smooth transition
              />
            </div>
            
            {/* Step indicator with progress */}
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 flex gap-2">
              {featureSteps.map((step) => (
                <button
                  key={step.id}
                  onClick={() => handleStepClick(step.id)}
                  className={`relative w-2 h-2 rounded-full transition-all duration-300 overflow-hidden ${
                    activeStep === step.id
                      ? 'bg-blue-600 w-8'
                      : 'bg-neutral-300 hover:bg-blue-400'
                  }`}
                  aria-label={`Go to step ${step.id}`}
                >
                  {/* Progress bar for active step */}
                  {activeStep === step.id && isAutoPlaying && (
                    <div className="absolute inset-0 bg-blue-800 origin-left animate-pulse" />
                  )}
                </button>
              ))}
            </div>
            
            {/* Auto-play indicator */}
            {isAutoPlaying && (
              <div className="absolute top-2 right-2 flex items-center gap-1 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs text-blue-600">
                <div className="w-1 h-1 bg-blue-600 rounded-full animate-pulse"></div>
                <span className="font-medium">Auto</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
