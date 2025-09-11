"use client";

import React from 'react';
import Image from 'next/image';

interface FooterProps {
  className?: string;
}

const Footer = React.memo(function Footer({ className }: FooterProps) {
  return (
    <footer className={`relative bg-gradient-to-b from-[#66afff00] to-[#0669ff00] py-16 sm:py-20 md:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden min-h-[300px] sm:min-h-[350px] md:min-h-[400px] lg:min-h-[500px] ${className}`}>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-full max-w-[300px] sm:max-w-[400px] md:max-w-[500px] lg:max-w-[600px] xl:max-w-[720px] relative">
          <Image
            src="/ShowOnAI_text.svg"
            alt="ShowOnAI"
            width={1440}
            height={204}
            className="w-full h-auto"
            priority
          />
        </div>
      </div>
    </footer>
  );
});

export default Footer;
