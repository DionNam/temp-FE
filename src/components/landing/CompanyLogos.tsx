"use client";

import React, { memo, useMemo } from 'react';
import Image from 'next/image';

export const CompanyLogos = memo(() => {
  const logos = useMemo(() => [
    { src: "/imagine-ai.svg", alt: "Imagine AI" },
    { src: "/queue.svg", alt: "Queue" },
    { src: "/astra.svg", alt: "Astra" },
    { src: "/atlas.svg", alt: "Atlas" },
    { src: "/audlabs.svg", alt: "Audlabs" },
    { src: "/shape.svg", alt: "Shape" },
    { src: "/base.svg", alt: "Base" },
  ], []);

  return (
    <section className="relative py-8 sm:py-12 md:py-16 lg:py-20 overflow-hidden">
      <div className="flex items-center space-x-6 sm:space-x-8 md:space-x-12 lg:space-x-24 animate-scroll-rtl">
        {[...logos, ...logos].map((logo, index) => (
          <Image 
            key={index}
            src={logo.src} 
            alt={logo.alt} 
            width={120}
            height={40}
            className="h-3 sm:h-4 md:h-6 lg:h-10 w-auto opacity-70 hover:opacity-100 transition-opacity flex-shrink-0"
            loading="lazy"
          />
        ))}
      </div>
      <style jsx>{`
        @keyframes scroll-rtl {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll-rtl {
          animation: scroll-rtl 10s linear infinite;
        }
        .animate-scroll-rtl:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
});

CompanyLogos.displayName = 'CompanyLogos';

export default CompanyLogos;