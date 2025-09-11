'use client';

import Link from "next/link";
import Image from "next/image";
import { useRouter } from 'next/navigation';

export function Header() {
  const router = useRouter();

  return (
    <div className="relative z-10 h-[76px] w-full">
      <div className="flex items-center justify-center px-0 py-3">
        <div className="flex w-full max-w-[1280px] items-center justify-between px-4 sm:px-8">
          <div className="flex grow items-center justify-start gap-4 rounded-2xl border border-black/8 bg-white px-3 py-3 pl-4 pr-3 shadow-sm">
            <div className="flex grow items-center justify-start gap-4 sm:gap-10">
              {/* Logo */}
              <button 
                onClick={() => router.push('/')}
                className="flex items-center justify-start gap-2 cursor-pointer hover:opacity-80 transition-opacity"
              >
                <div className="relative size-8 rounded-lg bg-white border-[0.2px] border-black/25">
                  <div className="absolute left-1 top-2.5 h-3 w-6">
                    <Image
                      src="/showonai.svg"
                      alt="ShowOnAI Logo"
                      width={24}
                      height={12}
                      className="size-full object-contain"
                    />
                  </div>
                </div>
                <div className="bg-gradient-to-b from-[#3395ff] to-[#0166ff] bg-clip-text text-base font-semibold text-transparent">
                  ShowOnAI
                </div>
              </button>
              
              {/* Navigation - Hidden on mobile */}
              <div className="hidden md:flex items-center gap-4">
                <div className="rounded-lg px-1.5 py-1">
                  <div className="px-0.5 py-0">
                    <span className="text-base font-semibold text-[#414651]">Blog</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right side buttons */}
            <div className="flex items-start gap-3">
              <div className="bg-neutral-50 box-border flex gap-2 items-center justify-center px-5 py-2.5 rounded-[10px] border border-neutral-200 shadow-[0px_1px_2px_0px_rgba(20,28,37,0.04)]">
                <div className="font-medium text-[14px] text-center text-neutral-700">
                  Login
                </div>
              </div>
              <div className="bg-blue-600 box-border flex gap-2 items-center justify-center px-5 py-2.5 rounded-[10px] shadow-[0px_1px_2px_0px_rgba(20,28,37,0.04)]">
                <div className="font-medium text-[14px] text-center text-neutral-50">
                  Book a Demo
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
