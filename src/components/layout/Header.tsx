'use client';

import Image from "next/image";
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export function Header() {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleGetEarlyAccess = () => {
    router.push('/onboarding');
  };

  return (
    <div className="relative z-40 w-full h-[76px]">
      <div className="flex items-center justify-center px-4 py-3 h-full">
        <div className="flex w-full max-w-[1280px] items-center justify-between">
          <div className="flex w-full items-center justify-between rounded-2xl border border-black/8 bg-white px-3 sm:px-4 py-3 shadow-sm">
            {/* Left side - Logo and Navigation */}
            <div className="flex items-center gap-4 sm:gap-6">
              {/* Logo */}
              <button 
                onClick={() => router.push('/')}
                className="flex items-center justify-start gap-1 cursor-pointer hover:opacity-80 transition-opacity"
              >
                <div className="relative size-6 sm:size-8">
                  <Image
                    src="/showonai_logo_small.svg"
                    alt="ShowOnAI Logo"
                    width={32}
                    height={32}
                    className="size-full object-contain"
                  />
                </div>
                <div className="bg-gradient-to-b from-[#3395ff] to-[#0166ff] bg-clip-text text-sm sm:text-base font-semibold text-transparent">
                  ShowOnAI
                </div>
              </button>
              
              {/* Desktop Navigation - next to logo */}
              <div className="hidden md:flex items-center">
                <button 
                  onClick={() => router.push('/blog')}
                  className="rounded-lg px-1.5 py-1 hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  <div className="px-0.5 py-0">
                    <span className="text-base font-semibold text-[#414651] hover:text-[#0166ff] transition-colors">Blog</span>
                  </div>
                </button>
              </div>
            </div>
            
            {/* Desktop Right side buttons */}
            <div className="hidden sm:flex items-center gap-2 sm:gap-3">
              {/* <button className="bg-neutral-50 box-border flex gap-2 items-center justify-center px-3 sm:px-5 py-2 sm:py-2.5 rounded-[10px] border border-neutral-200 shadow-[0px_1px_2px_0px_rgba(20,28,37,0.04)] hover:bg-neutral-100 transition-colors">
                <div className="font-medium text-[12px] sm:text-[14px] text-center text-neutral-700">
                  Login
                </div>
              </button> */}
              <button 
                onClick={handleGetEarlyAccess}
                className="bg-blue-600 box-border flex gap-2 items-center justify-center px-3 sm:px-5 py-2 sm:py-2.5 rounded-[10px] shadow-[0px_1px_2px_0px_rgba(20,28,37,0.04)] hover:bg-blue-700 transition-colors"
              >
                <div className="font-medium text-[12px] sm:text-[14px] text-center text-neutral-50">
                  Get Early Access
                </div>
              </button>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="sm:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 text-gray-600" />
              ) : (
                <Menu className="w-5 h-5 text-gray-600" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="sm:hidden absolute top-full left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg">
          <div className="px-4 py-4 space-y-3">
            <button 
              onClick={() => {
                router.push('/blog');
                setIsMobileMenuOpen(false);
              }}
              className="px-3 py-2 hover:bg-gray-100 rounded-lg transition-colors w-full text-left"
            >
              <span className="text-base font-semibold text-[#414651] hover:text-[#0166ff] transition-colors">Blog</span>
            </button>
            <div className="flex flex-col gap-3">
              {/* <button className="bg-neutral-50 box-border flex gap-2 items-center justify-center px-4 py-3 rounded-[10px] border border-neutral-200 shadow-[0px_1px_2px_0px_rgba(20,28,37,0.04)] hover:bg-neutral-100 transition-colors">
                <div className="font-medium text-[14px] text-center text-neutral-700">
                  Login
                </div>
              </button> */}
              <button 
                onClick={() => {
                  handleGetEarlyAccess();
                  setIsMobileMenuOpen(false);
                }}
                className="bg-blue-600 box-border flex gap-2 items-center justify-center px-4 py-3 rounded-[10px] shadow-[0px_1px_2px_0px_rgba(20,28,37,0.04)] hover:bg-blue-700 transition-colors"
              >
                <div className="font-medium text-[14px] text-center text-neutral-50">
                  Get Early Access
                </div>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
