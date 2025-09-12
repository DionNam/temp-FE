"use client";

import React from 'react';
import Image from 'next/image';

interface FooterProps {
  className?: string;
}

const Footer = React.memo(function Footer({ className }: FooterProps) {
  return (
    <footer className={`relative bg-gradient-to-b from-[#66afff00] to-[#0669ff00] px-4 sm:px-6 lg:px-8 overflow-hidden ${className}`} style={{ aspectRatio: '4/1' }}>
      <div className="absolute inset-0 flex items-end justify-center">
        <div className="w-full max-w-[1000px] sm:max-w-[1200px] md:max-w-[1500px] lg:max-w-[1800px] xl:max-w-[2000px] relative px-2 sm:px-4">
          <Image
            src="/ShowOnAI_text.svg"
            alt="ShowOnAI"
            width={2000}
            height={300}
            className="w-full h-auto object-contain"
            priority
          />
        </div>
      </div>
    </footer>
  );
});

export default Footer;
