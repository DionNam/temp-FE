'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Header } from '../layout/Header';

interface OnboardingFormProps {
  initialEmail?: string;
  className?: string;
}

// SVG Icons as constants (matching Figma design)
const starIcon = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHZpZXdCb3g9IjAgMCAxOCAxOCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTkgMS41TDExLjA5IDUuNjhMMTUuNzUgNi4zNEwxMi4zNyA5LjY2TDEzLjE4IDE0LjI1TDkgMTIuMDNMNC44MiAxNC4yNUw1LjYzIDkuNjZMMi4yNSA2LjM0TDYuOTEgNS42OEw5IDEuNVoiIHN0cm9rZT0iIzI1NjNlYiIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8L3N2Zz4K";
const userIcon = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTIwIDIxVjE5QTQgNCAwIDAgMCAxNiAxNUg4QTQgNCAwIDAgMCA0IDE5VjIxIiBzdHJva2U9IiM3Mzc0NzMiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+CjxjaXJjbGUgY3g9IjEyIiBjeT0iMTEiIHI9IjQiIHN0cm9rZT0iIzczNzQ3MyIgc3Ryb2tlLXdpZHRoPSIyIi8+Cjwvc3ZnPgo=";
const mailIcon = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTQgNEgyMEMyMS4xIDQgMjIgNC45IDIyIDZWMThDMjIgMTkuMSAyMS4xIDIwIDIwIDIwSDRDMi45IDIwIDIgMTkuMSAyIDE4VjZDMiA0LjkgMi45IDQgNCA0WiIgc3Ryb2tlPSIjNzM3NDczIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8cG9seWxpbmUgcG9pbnRzPSIyMiw2IDEyLDEzIDIsNiIgc3Ryb2tlPSIjNzM3NDczIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8L3N2Zz4K";
const buildingIcon = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTYgMjJWMTZIOFYyMiIgc3Ryb2tlPSIjNzM3NDczIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8cGF0aCBkPSJNNiAyMkgxOCIgc3Ryb2tlPSIjNzM3NDczIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8cGF0aCBkPSJNMTAgMlYxNCIgc3Ryb2tlPSIjNzM3NDczIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8cGF0aCBkPSJNMTQgMlYxNCIgc3Ryb2tlPSIjNzM3NDczIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8cGF0aCBkPSJNMTggMlYxNCIgc3Ryb2tlPSIjNzM3NDczIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8L3N2Zz4K";
const chatIcon = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTIxIDExLjVBOC4zOCA4LjM4IDAgMCAxIDEyIDIwQzkuMiAyMCA2LjE4IDE4LjkgNSAxNy4xTDMgMjJMOSAxOUE4IDggMCAwIDEgMTIgM0M0LjUgNy41IDIxIDYgMjEgMTEuNVoiIHN0cm9rZT0iIzczNzQ3MyIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+";

export default function OnboardingForm({ initialEmail = '', className }: OnboardingFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: initialEmail,
    role: '',
    reason: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', formData);
    
    // Redirect to waitlist confirmation page
    router.push('/waitlist-confirmation');
  };

  return (
    <div className={`bg-white content-stretch flex flex-col isolate items-center justify-start relative size-full ${className}`}>
      {/* Navigation Header */}
      <div className="relative shrink-0 w-full z-[3]">
        <Header />
      </div>

      {/* Main Form Section */}
      <div className="box-border content-stretch flex flex-col gap-8 sm:gap-16 items-center justify-start pb-0 pt-12 sm:pt-24 px-4 sm:px-0 relative shrink-0 w-full z-[2]">
        <div className="box-border content-stretch flex flex-col gap-6 sm:gap-8 items-center justify-start max-w-[1280px] w-full px-0 sm:px-8 py-0 relative shrink-0">
          <div className="content-stretch flex flex-col gap-8 sm:gap-12 items-center justify-start relative shrink-0 w-full">
            {/* Authentication Form */}
            <div className="bg-[rgba(239,239,239,0.2)] box-border content-stretch flex flex-col gap-6 sm:gap-7 items-center justify-start px-4 sm:px-10 py-6 sm:py-8 relative rounded-[20px] shrink-0 w-full max-w-[540px] border border-[#f2f4f7]">
              <div className="content-stretch flex flex-col gap-4 items-center justify-start relative shrink-0 w-full">
                <div className="content-stretch flex flex-col gap-7 items-start justify-center relative shrink-0 w-full">
                  <div className="content-stretch flex flex-col gap-4 items-center justify-start relative shrink-0 w-full">
                    {/* Badge */}
                    <div className="bg-[#e4e7ec] box-border content-stretch flex gap-1 items-center justify-center pl-2 pr-2.5 py-1 relative rounded-[6px] shrink-0">
                      <div className="overflow-clip relative shrink-0 size-[18px]">
                        <img 
                          alt="Star icon"
                          className="block max-w-none size-full"
                          src={starIcon}
                        />
                      </div>
                      <div className="font-medium leading-[0] not-italic relative shrink-0 text-[#141c25] text-[14px] text-nowrap">
                        <p className="leading-[20px] whitespace-pre">Waitlist Open</p>
                      </div>
                    </div>

                    {/* Main Heading */}
                    <div className="font-medium not-italic relative shrink-0 text-[#141c25] tracking-[-0.36px] w-full">
                      <p className="leading-[32px] sm:leading-[44px] text-center">
                        <span className="text-[24px] sm:text-[36px]">Unlock What Your Content Needs to </span>
                        <span className="font-[Apple_Garamond] not-italic text-[28px] sm:text-[40px] tracking-[-0.4px] italic">Rank First</span>
                      </p>
                    </div>

                    {/* Subtitle */}
                    <div className="font-normal not-italic relative shrink-0 text-[#141c25] text-[16px] sm:text-[18px] w-full">
                      <p className="leading-[24px] sm:leading-[28px] text-center">Finally know why your AI content is missing from search, and fix it instantly.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="content-stretch flex flex-col gap-10 items-center justify-start relative shrink-0 w-full">
                <div className="content-stretch flex flex-col gap-3 items-end justify-center relative shrink-0 w-full">
                  <div className="content-stretch flex flex-col gap-4 items-end justify-center relative shrink-0 w-full">
                    <div className="content-stretch flex flex-col gap-4 isolate items-start justify-start relative shrink-0 w-full">
                      <div className="content-stretch flex flex-col gap-4 items-start justify-start relative shrink-0 w-full z-[3]">
                        
                        {/* Name Field */}
                        <div className="content-stretch flex flex-col gap-2 isolate items-start justify-start relative shrink-0 w-full">
                          <div className="content-stretch flex gap-1 items-center justify-start relative shrink-0 z-[3]">
                            <div className="font-medium leading-[0] not-italic relative shrink-0 text-[14px] text-neutral-900 text-nowrap">
                              <p className="leading-[20px] whitespace-pre">Name</p>
                            </div>
                          </div>
                          <div className="bg-neutral-50 box-border content-stretch flex items-center justify-between pl-3 pr-2.5 py-2 relative rounded-[10px] shrink-0 w-full z-[2] border border-neutral-200 shadow-[0px_1px_2px_0px_rgba(20,28,37,0.04)]">
                            <div className="basis-0 content-stretch flex gap-2 grow items-center justify-start min-h-px min-w-px relative shrink-0">
                              <div className="content-stretch flex items-start justify-start relative shrink-0">
                                <div className="overflow-clip relative shrink-0 size-6">
                                  <img 
                                    alt="User icon"
                                    className="block max-w-none size-full"
                                    src={userIcon}
                                  />
                                </div>
                              </div>
                              <div className="basis-0 content-stretch flex gap-2 grow items-center justify-start min-h-px min-w-px relative shrink-0">
                                <input
                                  type="text"
                                  value={formData.name}
                                  onChange={(e) => handleInputChange('name', e.target.value)}
                                  placeholder="Full Name"
                                  className="font-normal leading-[0] not-italic relative shrink-0 text-[16px] text-neutral-500 text-nowrap bg-transparent border-none outline-none w-full"
                                  required
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Work Email Field */}
                        <div className="content-stretch flex flex-col gap-2 isolate items-start justify-start relative shrink-0 w-full">
                          <div className="content-stretch flex gap-1 items-center justify-start relative shrink-0 z-[3]">
                            <div className="font-medium leading-[0] not-italic relative shrink-0 text-[14px] text-neutral-900 text-nowrap">
                              <p className="leading-[20px] whitespace-pre">Work Email</p>
                            </div>
                          </div>
                          <div className="bg-neutral-50 relative rounded-[10px] shrink-0 w-full z-[2] border border-neutral-200 shadow-[0px_1px_2px_0px_rgba(20,28,37,0.04)]">
                            <div className="box-border content-stretch flex items-center justify-between overflow-clip pl-3 pr-2.5 py-2 relative w-full">
                              <div className="basis-0 content-stretch flex gap-2 grow items-center justify-start min-h-px min-w-px relative shrink-0">
                                <div className="content-stretch flex items-start justify-start relative shrink-0">
                                  <div className="overflow-clip relative shrink-0 size-6">
                                    <img 
                                      alt="Mail icon"
                                      className="block max-w-none size-full"
                                      src={mailIcon}
                                    />
                                  </div>
                                </div>
                                <div className="basis-0 content-stretch flex gap-2 grow items-center justify-start min-h-px min-w-px relative shrink-0">
                                  <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => handleInputChange('email', e.target.value)}
                                    placeholder="john_smith@email.com"
                                    className="font-normal leading-[0] not-italic relative shrink-0 text-[16px] text-neutral-900 text-nowrap bg-transparent border-none outline-none w-full"
                                    required
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Role Field */}
                        <div className="content-stretch flex flex-col gap-2 isolate items-start justify-start relative shrink-0 w-full">
                          <div className="content-stretch flex gap-1 items-center justify-start relative shrink-0 z-[3]">
                            <div className="font-medium leading-[0] not-italic relative shrink-0 text-[14px] text-neutral-900 text-nowrap">
                              <p className="leading-[20px] whitespace-pre">What's your role?</p>
                            </div>
                          </div>
                          <div className="bg-neutral-50 box-border content-stretch flex items-center justify-between pl-3 pr-2.5 py-2 relative rounded-[10px] shrink-0 w-full z-[2] border border-neutral-200 shadow-[0px_1px_2px_0px_rgba(20,28,37,0.04)]">
                            <div className="basis-0 content-stretch flex gap-2 grow items-center justify-start min-h-px min-w-px relative shrink-0">
                              <div className="content-stretch flex items-start justify-start relative shrink-0">
                                <div className="overflow-clip relative shrink-0 size-6">
                                  <img 
                                    alt="Building icon"
                                    className="block max-w-none size-full"
                                    src={buildingIcon}
                                  />
                                </div>
                              </div>
                              <div className="basis-0 content-stretch flex gap-2 grow items-center justify-start min-h-px min-w-px relative shrink-0">
                                <input
                                  type="text"
                                  value={formData.role}
                                  onChange={(e) => handleInputChange('role', e.target.value)}
                                  placeholder="Role"
                                  className="font-normal leading-[0] not-italic relative shrink-0 text-[16px] text-neutral-500 text-nowrap bg-transparent border-none outline-none w-full"
                                  required
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Reason Field */}
                        <div className="content-stretch flex flex-col gap-2 isolate items-start justify-start relative shrink-0 w-full">
                          <div className="content-stretch flex gap-1 items-center justify-start relative shrink-0 z-[3]">
                            <div className="font-medium leading-[0] not-italic relative shrink-0 text-[14px] text-neutral-900 text-nowrap">
                              <p className="leading-[20px] whitespace-pre">What's your main reason for joining the waitlist for ShowOnAI?</p>
                            </div>
                          </div>
                          <div className="bg-neutral-50 box-border content-stretch flex items-center justify-between pl-3 pr-2.5 py-2 relative rounded-[10px] shrink-0 w-full z-[2] border border-neutral-200 shadow-[0px_1px_2px_0px_rgba(20,28,37,0.04)]">
                            <div className="basis-0 content-stretch flex gap-2 grow items-center justify-start min-h-px min-w-px relative shrink-0">
                              <div className="content-stretch flex items-start justify-start relative shrink-0">
                                <div className="overflow-clip relative shrink-0 size-6">
                                  <img 
                                    alt="Chat icon"
                                    className="block max-w-none size-full"
                                    src={chatIcon}
                                  />
                                </div>
                              </div>
                              <div className="basis-0 content-stretch flex gap-2 grow items-center justify-start min-h-px min-w-px relative shrink-0">
                                <input
                                  type="text"
                                  value={formData.reason}
                                  onChange={(e) => handleInputChange('reason', e.target.value)}
                                  placeholder="e.g I want to elevate my content"
                                  className="font-normal leading-[0] not-italic relative shrink-0 text-[16px] text-neutral-500 text-nowrap bg-transparent border-none outline-none w-full"
                                  required
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Submit Button */}
                      <div className="content-stretch flex flex-col gap-4 items-center justify-start relative shrink-0 w-full z-[1]">
                        <button
                          type="submit"
                          className="bg-[#141c25] box-border content-stretch flex gap-2 items-center justify-center px-5 py-2.5 relative rounded-[10px] shadow-[0px_1px_2px_0px_rgba(20,28,37,0.04)] shrink-0 w-full hover:bg-[#0f1419] transition-colors"
                        >
                          <div className="font-medium leading-[0] not-italic relative shrink-0 text-[16px] text-center text-white text-nowrap">
                            <p className="leading-[24px] whitespace-pre">Get Early Access</p>
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Background Pattern */}
      <div className="absolute h-[1440px] left-1/2 overflow-clip top-0 translate-x-[-50%] w-[1920px] z-[1] bg-white">
        {/* Clean white background - no pattern */}
      </div>
    </div>
  );
}
