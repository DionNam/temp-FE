"use client";

import React, { memo } from 'react';
import Image from 'next/image';

const Footer = memo(function Footer() {
  return (
    <footer className="relative px-4 sm:px-6 lg:px-8 py-8 sm:py-10 md:py-12 lg:py-16 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col space-y-6 sm:space-y-8 md:space-y-0 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col items-start gap-2 sm:gap-3">
            <Image 
              src="/showonai.svg" 
              alt="ShowOnAI" 
              width={176} 
              height={48}
              className="h-6 sm:h-8 md:h-10 lg:h-12 w-auto"
              loading="lazy"
            />
            <p className="text-gray-500 text-sm sm:text-sm md:text-base max-w-xs">
              Smart local AI-powered SEO Analysis
            </p>
          </div>
          
          <div className="flex flex-wrap items-end gap-4 sm:gap-6 md:gap-8 md:self-end">
            <nav className="flex flex-wrap items-center gap-4 sm:gap-6 md:gap-8">
              <a 
                href="#" 
                className="text-gray-400 hover:text-gray-900 transition-colors font-medium text-sm md:text-base py-2 sm:py-1 hover:underline focus:outline-none focus:underline"
              >
                About
              </a>
              <a 
                href="#pricing" 
                className="text-gray-400 hover:text-gray-900 transition-colors font-medium text-sm md:text-base py-2 sm:py-1 hover:underline focus:outline-none focus:underline"
              >
                Pricing
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-gray-900 transition-colors font-medium text-sm md:text-base py-2 sm:py-1 hover:underline focus:outline-none focus:underline"
              >
                Docs
              </a>
              <a 
                href="#blog" 
                className="text-gray-400 hover:text-gray-900 transition-colors font-medium text-sm md:text-base py-2 sm:py-1 hover:underline focus:outline-none focus:underline"
              >
                Blog
              </a>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
});

export { Footer }; 