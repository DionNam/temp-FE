"use client";

import React, { memo, useCallback, useState } from 'react';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { HeaderProps } from '@/types';

const Navbar = memo(function Navbar({ onLoginClick, onDashboardClick }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleFeatureScroll = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById('features');
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  }, []);

  const handlePricingScroll = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById('pricing');
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  }, []);

  const handleBlogClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    window.location.href = '/blog';
    setIsMobileMenuOpen(false);
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev);
  }, []);

  return (
    <header className="relative z-50 px-3 sm:px-4 lg:px-8 pt-3 sm:pt-4 md:pt-6 lg:pt-12">
      <div className="max-w-7xl mx-auto flex justify-center">
        <nav className="flex items-center justify-between w-full max-w-5xl h-14 sm:h-10 md:h-12 lg:h-15 px-4 sm:px-3 md:px-4 lg:px-6 py-2 sm:py-2 rounded-full border border-white/60 bg-white/30">
          <div className="flex items-center">
            <Image 
              src="/showonai-white.svg" 
              alt="ShowOnAI" 
              width={176} 
              height={44} 
              className="h-8 sm:h-6 md:h-8 lg:h-11 w-auto"
              priority
            />
          </div>

          <div className="hidden lg:flex items-center space-x-8">
            <button 
              onClick={handleFeatureScroll}
              className="text-white/90 hover:text-white transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-white/20 rounded-lg px-2 py-1"
            >
              기능
            </button>
            <button
              onClick={handlePricingScroll}
              className="text-white/90 hover:text-white transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-white/20 rounded-lg px-2 py-1"
            >
              가격정책
            </button>
            <button
              onClick={handleBlogClick}
              className="text-white/90 hover:text-white transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-white/20 rounded-lg px-2 py-1"
            >
              블로그
            </button>
          </div>
          <div className="hidden lg:flex items-center space-x-2">
            <button
              onClick={onDashboardClick}
              className="px-4 py-2 rounded-full bg-white text-blue-600 font-semibold text-base hover:bg-gray-50 transition-colors active:scale-95 whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            >
              데모 요청
            </button>
            <button
              onClick={onLoginClick}
              className="px-4 py-2 rounded-full bg-blue-600 text-white font-semibold text-base hover:bg-blue-700 transition-colors active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            >
              로그인
            </button>
          </div>

          <button
            onClick={toggleMobileMenu}
            className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-white/20"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5 text-white" />
            ) : (
              <Menu className="w-5 h-5 text-white" />
            )}
          </button>
        </nav>
      </div>

      {isMobileMenuOpen && (
        <>
          <div 
            className="lg:hidden fixed inset-0 bg-black/20 z-30"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="lg:hidden absolute top-full left-3 right-3 mt-2 z-40 animate-in slide-in-from-top-2 duration-200">
            <div className="bg-white/95 rounded-2xl border border-white/40 shadow-2xl overflow-hidden">
              <div className="p-2">
                {[
                  { label: '기능', onClick: handleFeatureScroll },
                  { label: '가격정책', onClick: handlePricingScroll },
                  { label: '블로그', onClick: handleBlogClick }
                ].map((item, index) => (
                  <button
                    key={index}
                    onClick={item.onClick}
                    className="w-full text-left px-4 py-3 rounded-xl text-gray-800 hover:text-blue-600 hover:bg-blue-50/80 transition-all duration-200 font-medium"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
              <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mx-4" />
              
              <div className="p-4 space-y-3">
                <button
                  onClick={() => {
                    onDashboardClick();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 text-blue-600 font-semibold text-center hover:bg-gray-100 active:scale-[0.98] transition-all duration-200"
                >
                  데모 요청
                </button>
                <button
                  onClick={() => {
                    onLoginClick();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full px-4 py-3 rounded-xl bg-blue-600 text-white font-semibold text-center hover:bg-blue-700 active:scale-[0.98] transition-all duration-200 shadow-lg shadow-blue-600/25"
                >
                  로그인
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  );
});

export { Navbar };