"use client";

import React, { memo, useMemo } from 'react';
import Image from 'next/image';

const typography = {
  h2: "font-manrope font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl leading-tight",
  title: "font-manrope font-semibold text-lg sm:text-xl md:text-2xl lg:text-3xl leading-relaxed",
  title2: "font-manrope font-semibold text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed",
  subtitle: "font-manrope font-normal text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl leading-relaxed",
  caption: "font-manrope font-medium text-xs sm:text-sm uppercase tracking-wider",
} as const;

export const FeaturesSection = memo(function FeaturesSection() {
    const features = useMemo(() => [
    {
      icon: (
        <Image src="/assets/Icon-1.svg" alt="Diagnosis" width={64} height={64} className="w-16 h-16" loading="lazy" />
      ),
      title: "진단 Diagnosis",
      description: "생성형 AI에서 브랜드 노출 현황을 정확히 진단하고 개선점을 찾아드립니다.",
      subtitle: "ChatGPT, Gemini에서 우리 브랜드가 언급되는지 확인하고, AI가 우리를 어떻게 인식하는지 분석하여 개선점을 찾습니다.",
      imagePosition: "right",
      gradient: "from-blue-400 to-purple-500",
      image: "/diagnosis.webp"
    },
    {
      icon: (
        <Image src="/assets/Icon-2.svg" alt="Prescription" width={64} height={64} className="w-16 h-16" loading="lazy" />
      ),
      title: "차단 Prescription",
      description: "검색 엔진 변화에 선제적으로 대응하여 브랜드 가시성을 보호합니다.",
      subtitle: "부정적 콘텐츠나 잘못된 정보가 생성형 AI에 학습되지 않도록 차단하고, 브랜드 이미지를 보호하는 전략을 수립합니다.",
      imagePosition: "left",
      gradient: "from-green-400 to-blue-500",
      image: "/prescription.webp" 
    },
    {
      icon: (
        <Image src="/assets/Icon-3.svg" alt="Tracking" width={64} height={64} className="w-16 h-16" loading="lazy" />
      ),
      title: "추적 Tracking",
      description: "실시간 모니터링으로 SEO 성과를 추적하고 지속적으로 최적화합니다.",
      subtitle: "다양한 검색 시나리오에서 우리 브랜드의 언급 빈도와 순위 변화를 추적하여 지속적인 개선점을 파악합니다.",
      imagePosition: "right",
      gradient: "from-purple-400 to-pink-500",
      image: "/tracking.webp" 
    }
  ], []);

  return (
    <section id="features" className="relative py-12 md:py-24 px-4 sm:px-6 lg:px-8">      
      <div className="relative z-10 max-w-5/6 mx-auto">
        <div className="text-center mb-16 md:mb-24">
          <p className={`${typography.caption} text-blue-600 mb-4`}>
            FEATURES
          </p>
          <h2 className={`${typography.h2} text-gray-900 mb-6`}>
            진단하고, 처방하고, 변화를 추적하세요
          </h2>
          <p className={`${typography.subtitle} text-neutral-500 max-w-2xl mx-auto`}>
            당신의 브랜드가 AI 검색에서 빛나도록..
          </p>
        </div>
        
        <div className="space-y-16 md:space-y-24">
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
                
                <h3 className={`${typography.title} text-primary-blue-500 mb-4`}>
                  {feature.title}
                </h3>
                
                <p className={`${typography.title2} text-primary-blue-400 mb-4 font-medium`}>
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