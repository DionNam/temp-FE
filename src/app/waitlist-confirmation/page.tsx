'use client';

import React from 'react';
import { Header } from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function WaitlistConfirmationPage() {
  const handleDemoClick = () => {
    // Add demo app URL here when available
    window.open('#', '_blank');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="bg-white content-stretch flex flex-col isolate items-center justify-start relative flex-1">
        {/* Header */}
        <Header />

        {/* Main Content Section */}
        <div className="box-border content-stretch flex flex-col gap-16 items-center justify-start pb-0 pt-24 px-0 relative shrink-0 w-full z-[2]">
          <div className="box-border content-stretch flex flex-col gap-8 items-center justify-start max-w-[1280px] px-8 py-0 relative shrink-0 w-full">
            <div className="content-stretch flex flex-col gap-12 items-center justify-start relative shrink-0 w-full">
              {/* Thank You Card */}
              <div className="bg-[rgba(239,239,239,0.2)] box-border content-stretch flex flex-col gap-7 items-center justify-start px-10 py-8 relative rounded-[20px] shrink-0 w-[540px] border border-[#f2f4f7]">
                <div className="content-stretch flex flex-col gap-4 items-center justify-start relative shrink-0 w-full">
                  <div className="content-stretch flex flex-col gap-7 items-center justify-center relative shrink-0 w-full">
                    <div className="content-stretch flex flex-col gap-4 items-center justify-start relative shrink-0 w-full">
                      {/* Main Title */}
                      <h1 className="font-medium text-[#141c25] text-[28px] text-center tracking-[-0.28px] w-full leading-[36px]">
                        Thank you for joining our waitlist!
                      </h1>
                      
                      {/* Subtitle */}
                      <p className="font-normal text-[#141c25] text-[18px] text-center w-full leading-[28px]">
                        We appreciate your interest and your details have been received.
                      </p>
                      
                      {/* Call to Action Text */}
                      <div className="content-stretch flex flex-col gap-1.5 items-start justify-start text-[#141c25] text-[18px] text-center w-full">
                        <div className="font-semibold relative shrink-0 w-full leading-[28px]">
                          Curious to see what's coming?
                        </div>
                        <div className="font-normal relative shrink-0 w-full leading-[28px]">
                          Check out a glimpse of our demo app and discover the future of AI content optimization!
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Demo Button */}
                <div className="content-stretch flex flex-col gap-10 items-center justify-start relative shrink-0 w-full">
                  <div className="content-stretch flex flex-col gap-3 items-end justify-center relative shrink-0 w-full">
                    <div className="content-stretch flex flex-col gap-4 items-end justify-center relative shrink-0 w-full">
                      <div className="content-stretch flex flex-col gap-4 isolate items-start justify-start relative shrink-0 w-full">
                        <div className="content-stretch flex flex-col gap-4 items-center justify-start relative shrink-0 w-full z-[1]">
                          <button
                            onClick={handleDemoClick}
                            className="bg-[#141c25] box-border content-stretch flex gap-2 items-center justify-center px-5 py-2.5 relative rounded-[10px] shadow-[0px_1px_2px_0px_rgba(20,28,37,0.04)] shrink-0 w-full hover:bg-[#0f1419] transition-colors"
                          >
                            <div className="font-medium text-[16px] text-center text-white">
                              Check our Demo App
                            </div>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Background Pattern - Clean white background */}
        <div className="absolute h-[1440px] left-1/2 overflow-clip top-0 translate-x-[-50%] w-[1920px] z-[1] bg-white">
          {/* Clean white background - no pattern */}
        </div>
      </div>

      <Footer />
    </div>
  );
}
