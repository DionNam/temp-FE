"use client";

import React, { memo, useMemo, useState } from 'react';
import Image from 'next/image';

const typography = {
  h2: "font-manrope font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl leading-tight",
  title: "font-manrope font-semibold text-lg sm:text-xl md:text-2xl lg:text-3xl leading-relaxed",
  title2: "font-manrope font-semibold text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed",
  subtitle: "font-manrope font-normal text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl leading-relaxed",
  body: "font-manrope font-normal text-sm sm:text-base leading-relaxed",
  caption: "font-manrope font-medium text-xs sm:text-sm uppercase tracking-wider",
} as const;

export const FeaturesSection = memo(function FeaturesSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const features = useMemo(() => [
    {
      icon: (
        <Image src="/assets/Icon-1.svg" alt="Diagnosis" width={64} height={64} className="w-16 h-16" loading="lazy" />
      ),
      title: "Diagnosis",
      description: "Have you checked your brand's GEO health status compared to competitors?",
      subtitle: "We precisely analyze which questions expose your brand in ChatGPT, Gemini, wrtn, and where you fall short compared to competitors.",
      imagePosition: "right",
      gradient: "from-blue-400 to-purple-500",
      image: "/diagnosis.webp"
    },
    {
      icon: (
        <Image src="/assets/Icon-2.svg" alt="Prescription" width={64} height={64} className="w-16 h-16" loading="lazy" />
      ),
      title: "Prescription",
      description: "We analyze the root cause of problems and provide immediately actionable solutions.",
      subtitle: "From technical SEO/GEO optimization to content topic recommendations based on local search keywords and automated production",
      imagePosition: "left",
      gradient: "from-green-400 to-blue-500",
      image: "/prescription.webp" 
    },
    {
      icon: (
        <Image src="/assets/Icon-3.svg" alt="Tracking" width={64} height={64} className="w-16 h-16" loading="lazy" />
      ),
      title: "Tracking",
      description: "Is your well-crafted content being recognized by AI? Is it being used in responses?",
      subtitle: "We track in real-time whether AI is effectively utilizing your content and if visitors are being driven to your site.",
      imagePosition: "right",
      gradient: "from-purple-400 to-pink-500",
      image: "/tracking.webp" 
    }
  ], []);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      setCurrentSlide((prev) => (prev + 1) % features.length);
    }
    if (isRightSwipe) {
      setCurrentSlide((prev) => (prev - 1 + features.length) % features.length);
    }
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % features.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + features.length) % features.length);
  };

  return (
    <section id="features" className="relative py-12 md:py-24 px-0 sm:px-1 lg:px-8">      
      <div className="relative z-10 max-w-5/6 mx-auto">
        <div className="text-center mb-16 md:mb-24">
          <p className={`${typography.caption} text-blue-600 mb-2 sm:mb-3 md:mb-4`}>
            FEATURES
          </p>
          <div className="mx-auto max-w-[60%] sm:max-w-xl md:max-w-2xl">
            <h2 className={`${typography.h2} text-gray-900 mb-2 sm:mb-3 md:mb-4`}>
              Diagnose, Prescribe, and Track Changes
            </h2>
          </div>
          <p className={`${typography.body} text-neutral-500 mb-4 sm:mb-6 md:mb-8 px-2`}>
            Make your brand shine in AI search results...
          </p>
        </div>
        
        <div className="lg:hidden -mx-4 sm:-mx-2">
          <div className="relative overflow-hidden">
            <div 
              className="flex transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {features.map((feature, index) => (
                <div key={index} className="w-full flex-shrink-0">
                  <div className="space-y-6 px-4">
                    <div className="flex items-center justify-between gap-4">
                      <button
                        onClick={prevSlide}
                        disabled={currentSlide === 0}
                        className={`w-8 h-8 rounded-lg flex items-center justify-center shadow-md transition-colors ${
                          currentSlide === 0 
                            ? 'bg-gray-200/80 backdrop-blur-sm cursor-not-allowed opacity-50' 
                            : 'bg-blue-500 hover:bg-blue-600'
                        }`}
                        aria-label="Previous slide"
                      >
                        <svg className={`w-5 h-5 ${currentSlide === 0 ? 'text-[#3D6FEA]' : 'text-white'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 18l-6-6 6-6" />
                        </svg>
                      </button>
                      
                      <div className="flex items-center gap-4 flex-1 justify-center">
                        <div className="w-10 h-10 flex items-center justify-center">
                          {feature.icon}
                        </div>
                        <h3 className="text-xl md:text-2xl font-semibold text-blue-600 whitespace-nowrap">
                          {feature.title}
                        </h3>
                      </div>
                      
                      <button
                        onClick={nextSlide}
                        disabled={currentSlide === features.length - 1}
                        className={`w-8 h-8 rounded-lg flex items-center justify-center shadow-md transition-colors ${
                          currentSlide === features.length - 1 
                            ? 'bg-gray-200/80 backdrop-blur-sm cursor-not-allowed opacity-50' 
                            : 'bg-blue-500 hover:bg-blue-600'
                        }`}
                        aria-label="Next slide"
                      >
                        <svg className={`w-5 h-5 ${currentSlide === features.length - 1 ? 'text-[#3D6FEA]' : 'text-white'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 12h16" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 6l6 6-6 6" />
                        </svg>
                      </button>
                    </div>

                    <div className="w-full">
                      <div className="bg-white rounded-2xl p-4 shadow-lg">
                        <div className="w-full h-[300px] flex items-center justify-center">
                          <Image 
                            src={feature.image}
                            alt={feature.title}
                            width={400}
                            height={300}
                            className="w-full h-full object-contain"
                            loading="lazy"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="text-center px-10">
                      <h4 className="text-lg md:text-xl font-bold text-blue-600 mb-4 leading-relaxed">
                        {feature.description}
                      </h4>
                    </div>

                    <div className="text-center">
                      <p className="text-sm md:text-base text-white/90 leading-relaxed text-center">
                        {feature.subtitle}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="hidden lg:block space-y-16 md:space-y-24">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className={`flex flex-col ${
                feature.imagePosition === 'left' 
                  ? 'lg:flex-row' 
                  : 'lg:flex-row-reverse'
              } items-center justify-between gap-8 md:gap-16`}
            >
              <div className="flex-1 max-w-2xl px-4 sm:px-8 md:px-12 w-full">
                <div className="flex items-center mb-4">
                  {feature.icon}
                </div>
                
                <h3 className={`${typography.title} text-blue-600 mb-4`}>
                  {feature.title}
                </h3>
                
                <p className={`${typography.title2} text-blue-500 mb-4 font-medium`}>
                  {feature.description}
                </p>
                
                <p className={`${typography.subtitle} text-neutral-500 md:text-white leading-relaxed`}>
                  {feature.subtitle}
                </p>
              </div>
              
              <div className="flex-1 max-w-2xl w-full">
                <div className="relative group">
                  <div className="w-full h-[400px] md:h-[500px] bg-white rounded-2xl overflow-hidden shadow-xl flex items-center justify-center">
                    <Image 
                      src={feature.image}
                      alt={feature.title}
                      width={500}
                      height={400}
                      className="w-full h-full object-contain"
                      loading="lazy"
                    />
                  </div>
                  
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

export default FeaturesSection;