"use client";

import React, { memo } from 'react';
import Image from 'next/image';
import { HeaderProps } from '@/types';

const Navbar = memo(function Navbar({ onLoginClick, onDashboardClick }: HeaderProps) {
  return (
    <header className="relative z-50 px-3 sm:px-4 lg:px-8 pt-3 sm:pt-4 md:pt-6 lg:pt-12">
      <div className="max-w-7xl mx-auto flex justify-center">
        <nav className="flex items-center justify-between w-full max-w-5xl h-9 sm:h-10 md:h-12 lg:h-15 px-2 sm:px-3 md:px-4 lg:px-6 py-1.5 sm:py-2 rounded-full border border-white/60 bg-white/30 backdrop-blur-lg">
          <div className="flex items-center">
            <Image 
              src="/showonai-white.svg" 
              alt="ShowOnAI" 
              width={176} 
              height={44} 
              className="h-5 sm:h-6 md:h-8 lg:h-11 w-auto"
              priority
            />
          </div>

          <div className="hidden lg:flex items-center space-x-8">
            <a href="#features" className="text-white/90 hover:text-white transition-colors font-medium">기능</a>
            <a href="#pricing" className="text-white/90 hover:text-white transition-colors font-medium">가격정책</a>
            <a href="#blog" className="text-white/90 hover:text-white transition-colors font-medium">블로그</a>
          </div>

          <div className="flex items-center space-x-1 sm:space-x-2">
            <button
              onClick={onDashboardClick}
              className="px-1.5 sm:px-2 md:px-3 lg:px-4 py-1 sm:py-1.5 md:py-2 rounded-full bg-white text-blue-600 font-semibold text-xs sm:text-xs md:text-sm lg:text-base hover:bg-gray-50 transition-colors active:scale-95 whitespace-nowrap"
            >
              데모 요청
            </button>
            <button
              onClick={onLoginClick}
              className="px-1.5 sm:px-2 md:px-3 lg:px-4 py-1 sm:py-1.5 md:py-2 rounded-full bg-blue-600 text-white font-semibold text-xs sm:text-xs md:text-sm lg:text-base hover:bg-blue-700 transition-colors active:scale-95"
            >
              로그인
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
});

export { Navbar }; 