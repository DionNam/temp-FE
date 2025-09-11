'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

interface HeroSectionProps {
  className?: string;
}

export default function HeroSection({ className }: HeroSectionProps) {
  const [email, setEmail] = useState('');

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle email submission logic here
    console.log('Email submitted:', email);
  };

  return (
    <div className={`bg-white relative ${className}`}>

      {/* Navigation Header */}
      <div className="relative z-10 h-[76px] w-full">
        <div className="flex items-center justify-center px-0 py-3">
          <div className="flex w-full max-w-[1280px] items-center justify-between px-4 sm:px-8">
            <div className="flex grow items-center justify-start gap-4 rounded-2xl border border-black/8 bg-white px-3 py-3 pl-4 pr-3 shadow-sm">
              <div className="flex grow items-center justify-start gap-4 sm:gap-10">
                {/* Logo */}
                <div className="flex items-center justify-start gap-2">
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
                </div>
                
                {/* Navigation - Hidden on mobile */}
                <div className="hidden md:flex items-center gap-4">
                  <div className="rounded-lg px-1.5 py-1">
                    <div className="px-0.5 py-0">
                      <span className="text-base font-semibold text-[#414651]">Blog</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* CTA Buttons */}
              <div className="flex items-start gap-2 sm:gap-3">
                <button className="rounded-[10px] border border-neutral-200 bg-neutral-50 px-3 sm:px-5 py-2.5 shadow-sm transition-colors hover:bg-neutral-100">
                  <span className="text-sm font-medium text-neutral-700">Login</span>
                </button>
                <button className="rounded-[10px] bg-blue-600 px-3 sm:px-5 py-2.5 shadow-sm transition-colors hover:bg-blue-700">
                  <span className="text-sm font-medium text-neutral-50 hidden sm:inline">Book a Demo</span>
                  <span className="text-sm font-medium text-neutral-50 sm:hidden">Demo</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Hero Content */}
      <div className="relative z-10 flex w-full flex-col items-center justify-start gap-8 sm:gap-16 px-0 pb-0 pt-12 sm:pt-24">
        <div className="flex w-full max-w-[1280px] flex-col items-center justify-start gap-6 sm:gap-8 px-4 sm:px-8">
          <div className="flex w-full flex-col items-center justify-start gap-8 sm:gap-12">
            {/* Hero Text Content */}
            <div className="flex flex-col items-center justify-start gap-4 sm:gap-6">
              <div className="flex flex-col items-center justify-start gap-4 sm:gap-6">
                {/* Badge */}
                <div className="flex items-center justify-start gap-2 rounded-[10px] border border-[#d5d7da] bg-white px-1 py-1 pr-2 shadow-sm">
                  <div className="flex items-center justify-start gap-1.5 rounded-md border border-[#d5d7da] bg-white px-2 py-0.5 shadow-sm">
                    <div className="relative size-2">
                      <div className="absolute left-0.5 top-0.5 size-1.5">
                        <div className="size-full rounded-full bg-blue-600 border border-blue-100" />
                      </div>
                    </div>
                    <span className="text-sm font-medium text-[#414651]">New feature</span>
                  </div>
                  <div className="hidden sm:flex items-center justify-start gap-1">
                    <span className="text-sm font-medium text-[#414651]">Perplexity AI Supported</span>
                    <div className="size-4">
                      <ArrowRight className="size-4 text-[#414651]" />
                    </div>
                  </div>
                </div>

                {/* Main Heading */}
                <h1 className="text-center text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight sm:leading-[60px] tracking-[-0.48px] text-[#181d27] px-4 sm:px-0">
                  See exactly how AI reads your content
                </h1>
              </div>

              {/* Subheading */}
              <p className="max-w-[768px] text-center text-lg sm:text-xl leading-7 sm:leading-[30px] text-[#535862] px-4 sm:px-0">
                AI has changed the rules for content visibility — learn how to stay ahead.
              </p>
            </div>

            {/* Email Capture Form */}
            <div className="flex items-start gap-3 w-full max-w-[520px] px-4 sm:px-0">
              <form onSubmit={handleEmailSubmit} className="flex w-full flex-col sm:flex-row items-start gap-3 sm:gap-4">
                <div className="flex w-full sm:grow flex-col gap-1.5">
                  <div className="flex w-full flex-col items-start gap-1.5">
                    <div className="flex w-full items-center justify-start gap-2 rounded-lg border border-[#d5d7da] bg-white px-3.5 py-3 shadow-sm">
                      <div className="flex grow items-center justify-start gap-2">
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Enter your email"
                          className="grow bg-transparent text-base text-[#717680] placeholder:text-[#717680] focus:outline-none"
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <p className="w-full text-sm leading-5 text-[#535862] text-center sm:text-left">
                    We care about your data in our{' '}
                    <span className="underline decoration-solid underline-offset-[from-font]">
                      privacy policy
                    </span>
                    .
                  </p>
                </div>
                <button
                  type="submit"
                  className="relative w-full sm:w-auto bg-[#0166ff] rounded-[8px] overflow-hidden"
                >
                  <div className="box-border flex gap-1.5 items-center justify-center overflow-clip px-8 py-3 relative w-full h-full">
                    <div className="box-border flex items-center justify-center px-6 py-0 relative shrink-0">
                      <div className="font-semibold text-[16px] leading-[24px] text-white whitespace-pre">
                        Get Early Access
                      </div>
                    </div>
                  </div>
                  {/* Skeumorphic shadows */}
                  <div className="absolute inset-0 pointer-events-none shadow-[0px_0px_0px_1px_inset_rgba(10,13,18,0.18),0px_-2px_0px_0px_inset_rgba(10,13,18,0.05)]" />
                  <div aria-hidden="true" className="absolute border-2 border-[rgba(255,255,255,0.12)] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)]" />
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Product Mockup */}
        <div className="flex w-full max-w-[1280px] flex-col items-center justify-start gap-6 sm:gap-8 px-4 sm:px-8">
          <div className="relative w-full max-w-[1200px]">
            <div className="relative rounded-[16px] sm:rounded-[24px] lg:rounded-[32px] border border-black/8 bg-white p-0.5 sm:p-1 shadow-[0px_12px_16px_-4px_rgba(10,13,18,0.08),0px_4px_6px_-2px_rgba(10,13,18,0.03),0px_2px_2px_-1px_rgba(10,13,18,0.04)] mx-auto">
              <div className="overflow-hidden rounded-[14px] sm:rounded-[20px] lg:rounded-[28px] bg-white p-0.5 sm:p-1 shadow-[0px_0px_6px_2px_inset_rgba(10,13,18,0.08),0px_0px_4px_2px_inset_rgba(10,13,18,0.03)]">
                <div className="overflow-hidden rounded-[12px] sm:rounded-[18px] lg:rounded-[24px] border-2 border-[#e9eaeb] bg-neutral-50">
                  <div className="aspect-[15/8] w-full relative">
                    <Image
                      src="/main_geo_lab.png"
                      alt="ShowOnAI Dashboard Preview"
                      fill
                      className="object-cover object-top"
                      sizes="(max-width: 768px) 320px, (max-width: 1024px) 640px, 1200px"
                      priority
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
