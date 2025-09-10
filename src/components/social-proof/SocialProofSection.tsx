'use client';

import React from 'react';
import Image from 'next/image';

interface SocialProofSectionProps {
  className?: string;
}

export default function SocialProofSection({ className }: SocialProofSectionProps) {
  // 임시 로고 데이터 - 나중에 실제 로고로 교체 예정
  const companies = [
    {
      name: "OdeaoLabs",
      logomark: "/assets/Icon-1.svg",
      logotext: "OdeaoLabs",
      width: 140
    },
    {
      name: "Kintsugi",
      logomark: "/assets/Icon-2.svg", 
      logotext: "Kintsugi",
      width: 99
    },
    {
      name: "StackCd Lab",
      logomark: "/assets/Icon-3.svg",
      logotext: "StackCd Lab", 
      width: 149
    },
    {
      name: "Magnolia",
      logomark: "/sms-tracking.svg",
      logotext: "Magnolia",
      width: 125
    },
    {
      name: "Warpspeed",
      logomark: "/tracking.webp",
      logotext: "Warpspeed",
      width: 143
    },
    {
      name: "Sisyphus",
      logomark: "/chat.svg",
      logotext: "Sisyphus",
      width: 115
    }
  ];

  return (
    <section className={`bg-white py-12 sm:py-16 lg:py-24 relative z-20 block w-full ${className}`} style={{ position: 'relative', zIndex: 20, display: 'block' }}>
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 sm:gap-8 items-center">
          {/* Header Text */}
          <p className="text-[#535862] text-sm sm:text-base font-medium text-center leading-6">
            Join 4,000+ companies already growing
          </p>
          
          {/* Company Logos */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:flex lg:flex-wrap items-center justify-center gap-4 sm:gap-6 w-full">
            {companies.map((company, index) => (
              <div 
                key={index}
                className="flex items-center gap-2 sm:gap-2.5 h-10 sm:h-12 justify-center lg:justify-start"
              >
                {/* Logomark */}
                <div className="relative h-8 sm:h-10 lg:h-12 w-8 sm:w-9 lg:w-10 flex-shrink-0">
                  <Image
                    src={company.logomark}
                    alt={`${company.name} logo`}
                    fill
                    className="object-contain"
                  />
                </div>
                
                {/* Company Name Text */}
                <div className="h-8 sm:h-10 lg:h-12 flex items-center">
                  <span 
                    className="text-[#535862] font-medium text-sm sm:text-base lg:text-lg leading-none"
                    style={{ maxWidth: `${company.width}px` }}
                  >
                    {company.logotext}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
