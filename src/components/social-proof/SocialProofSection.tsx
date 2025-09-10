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
    <section className={`bg-white py-24 relative z-20 block w-full ${className}`} style={{ position: 'relative', zIndex: 20, display: 'block' }}>
      <div className="max-w-[1280px] mx-auto px-8">
        <div className="flex flex-col gap-8 items-center">
          {/* Header Text */}
          <p className="text-[#535862] text-base font-medium text-center leading-6">
            Join 4,000+ companies already growing
          </p>
          
          {/* Company Logos */}
          <div className="flex flex-wrap items-center justify-center gap-6 w-full">
            {companies.map((company, index) => (
              <div 
                key={index}
                className="flex items-center gap-2.5 h-12"
              >
                {/* Logomark */}
                <div className="relative h-12 w-10 flex-shrink-0">
                  <Image
                    src={company.logomark}
                    alt={`${company.name} logo`}
                    fill
                    className="object-contain"
                  />
                </div>
                
                {/* Company Name Text */}
                <div className="h-12 flex items-center">
                  <span 
                    className="text-[#535862] font-medium text-lg leading-none"
                    style={{ width: `${company.width}px` }}
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
