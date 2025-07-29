"use client";

import React, { memo, useCallback } from 'react';
import Image from 'next/image';

const Footer = memo(function Footer() {
  const handlePricingScroll = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById('pricing');
    element?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const handleBlogClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    window.location.href = '/blog';
  }, []);

  return (
    <footer className="relative px-4 sm:px-6 lg:px-8 py-8 sm:py-10 md:py-12 lg:py-16 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Mobile Layout */}
        <div className="block md:hidden">
          <div className="flex flex-col items-center space-y-2">
            <div className="flex flex-col items-center gap-3">
              <div className="flex items-center gap-2">
                <Image 
                  src="/showonai.svg" 
                  alt="ShowOnAI" 
                  width={220} 
                  height={64}
                  className="h-8 w-auto"
                  loading="lazy"
                  placeholder="blur"
                  blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTc2IiBoZWlnaHQ9IjQ4IiB2aWV3Qm94PSIwIDAgMTc2IDQ4IiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxNzYiIGhlaWdodD0iNDgiIGZpbGw9IiNmZmZmZmYiIG9wYWNpdHk9IjAuNSIvPjwvc3ZnPg=="
                />
              </div>
              <p className="text-blue-500 text-lg sm:text-xl text-center max-w-xs font-semibold">
                Smart local AI-powered SEO Analysis
              </p>
            </div>
            
            <nav className="flex items-center justify-center gap-8 pt-2"> 
              <button 
                onClick={(e) => e.preventDefault()}
                className="text-neutral-500 hover:text-blue-600 transition-colors font-medium text-base py-2 hover:underline focus:outline-none focus:underline"
              >
                기능
              </button>
              <button
                onClick={handlePricingScroll}
                className="text-neutral-500 hover:text-blue-600 transition-colors font-medium text-base py-2 hover:underline focus:outline-none focus:underline"
              >
                가격정책
              </button>
              <button
                onClick={handleBlogClick}
                className="text-neutral-500 hover:text-blue-600 transition-colors font-medium text-base py-2 hover:underline focus:outline-none focus:underline"
              >
                블로그
              </button>
            </nav>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:flex md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col items-start gap-2 sm:gap-3">
            <Image 
              src="/showonai.svg" 
              alt="ShowOnAI" 
              width={176} 
              height={48}
              className="h-6 sm:h-8 md:h-10 lg:h-12 w-auto"
              loading="lazy"
              placeholder="blur"
              blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTc2IiBoZWlnaHQ9IjQ4IiB2aWV3Qm94PSIwIDAgMTc2IDQ4IiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxNzYiIGhlaWdodD0iNDgiIGZpbGw9IiNmZmZmZmYiIG9wYWNpdHk9IjAuNSIvPjwvc3ZnPg=="
            />
            <p className="text-gray-500 text-sm sm:text-sm md:text-base max-w-xs">
              Smart local AI-powered SEO Analysis
            </p>
          </div>
          
          <div className="flex flex-wrap items-end gap-4 sm:gap-6 md:gap-8 md:self-end">
            <nav className="flex flex-wrap items-center gap-4 sm:gap-6 md:gap-8">
              <button 
                onClick={(e) => e.preventDefault()}
                className="text-gray-400 hover:text-gray-900 transition-colors font-medium text-sm md:text-base py-2 sm:py-1 hover:underline focus:outline-none focus:underline focus:ring-2 focus:ring-gray-300 rounded px-1"
              >
                About
              </button>
              <button
                onClick={handlePricingScroll}
                className="text-gray-400 hover:text-gray-900 transition-colors font-medium text-sm md:text-base py-2 sm:py-1 hover:underline focus:outline-none focus:underline focus:ring-2 focus:ring-gray-300 rounded px-1"
              >
                Pricing
              </button>
              <button 
                onClick={(e) => e.preventDefault()}
                className="text-gray-400 hover:text-gray-900 transition-colors font-medium text-sm md:text-base py-2 sm:py-1 hover:underline focus:outline-none focus:underline focus:ring-2 focus:ring-gray-300 rounded px-1"
              >
                Docs
              </button>
              <button
                onClick={handleBlogClick}
                className="text-gray-400 hover:text-gray-900 transition-colors font-medium text-sm md:text-base py-2 sm:py-1 hover:underline focus:outline-none focus:underline focus:ring-2 focus:ring-gray-300 rounded px-1"
              >
                Blog
              </button>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
});

export { Footer };