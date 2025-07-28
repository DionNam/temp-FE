"use client";

import React, { useState, useEffect, Suspense, lazy, memo, useMemo, useCallback, useRef, Component, ReactNode } from 'react';
import Image from 'next/image';
import { DemoDialogProps, DemoFormData, HeroSectionProps, CTASectionProps } from '@/types';
import { useNavbar } from '@/hooks/useNavbar';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

// Simple Error Boundary Component
class ErrorBoundary extends Component<{ children: ReactNode; fallback: ReactNode }, { hasError: boolean }> {
  constructor(props: { children: ReactNode; fallback: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): { hasError: boolean } {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}

// const CompanyLogos = lazy(() => 
//   import('../components/landing/CompanyLogos')
//     .then(module => ({ default: module.CompanyLogos || module.default }))
//     .catch(() => ({ default: CompanyLogosPlaceholder }))
// );
const QuoteSection = lazy(() => import('../components/landing/QuoteSection'));
const FeaturesSection = lazy(() => import('../components/landing/FeaturesSection'));
const PricingSection = lazy(() => import('../components/landing/PricingSection'));
const FAQSection = lazy(() => import('../components/landing/FAQSection'));

const typography = {
  h1: "font-manrope font-semibold text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl leading-tight",
  h2: "font-manrope font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl leading-tight",
  h3: "font-manrope font-semibold text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed",
  h4: "font-manrope font-semibold text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed",
  title: "font-manrope font-semibold text-lg sm:text-xl md:text-2xl lg:text-3xl leading-relaxed",
  title2: "font-manrope font-semibold text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed",
  subtitle: "font-manrope font-normal text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl leading-relaxed",
  body: "font-manrope font-normal text-sm sm:text-base leading-relaxed",
  caption: "font-manrope font-medium text-xs sm:text-sm uppercase tracking-wider",
  price: "font-manrope font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl",
} as const;

// const CompanyLogosPlaceholder = memo(function CompanyLogosPlaceholder() {
//   return (
//     <section className="relative py-12 sm:py-8 md:py-12 lg:py-20 overflow-hidden">
//       <div className="flex items-center space-x-6 sm:space-x-8 md:space-x-12 lg:space-x-24">
//         {Array.from({ length: 7 }).map((_, index) => (
//           <div key={index} className="h-3 sm:h-4 md:h-6 lg:h-10 w-20 animate-pulse rounded flex-shrink-0" />
//         ))}
//       </div>
//     </section>
//   );
// });

const QuoteSectionPlaceholder = memo(function QuoteSectionPlaceholder() {
  return (
    <section className="relative py-12 md:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5/6 mx-auto">
        <div className="text-right mb-12 md:mb-24">
          <div className="max-w-4xl ml-auto space-y-4">
            <div className="h-8 bg-gray-200 animate-pulse rounded w-3/4 ml-auto" />
            <div className="h-8 bg-gray-200 animate-pulse rounded w-1/2 ml-auto" />
            <div className="h-6 bg-gray-200 animate-pulse rounded w-1/4 ml-auto" />
          </div>
        </div>
        <div className="text-left space-y-4">
          <div className="h-8 bg-gray-200 animate-pulse rounded w-1/3" />
          <div className="h-8 bg-blue-200 animate-pulse rounded w-1/2" />
        </div>
      </div>
    </section>
  );
});

const FeaturesSectionPlaceholder = memo(function FeaturesSectionPlaceholder() {
  return (
    <section className="relative py-12 md:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5/6 mx-auto">
        <div className="text-center mb-16 md:mb-24 space-y-4">
          <div className="h-4 bg-blue-200 animate-pulse rounded w-24 mx-auto" />
          <div className="h-10 bg-gray-200 animate-pulse rounded w-1/2 mx-auto" />
          <div className="h-6 bg-gray-200 animate-pulse rounded w-3/4 mx-auto" />
        </div>
        <div className="space-y-16 md:space-y-24">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="flex flex-col lg:flex-row items-center gap-8 md:gap-16">
              <div className="flex-1 space-y-4">
                <div className="w-16 h-16 bg-gray-200 animate-pulse rounded" />
                <div className="h-8 bg-gray-200 animate-pulse rounded w-1/2" />
                <div className="h-6 bg-gray-200 animate-pulse rounded w-3/4" />
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 animate-pulse rounded" />
                  <div className="h-4 bg-gray-200 animate-pulse rounded w-5/6" />
                </div>
              </div>
              <div className="flex-1">
                <div className="w-full h-[400px] md:h-[500px] bg-gray-200 animate-pulse rounded-2xl" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

const PricingSectionPlaceholder = memo(function PricingSectionPlaceholder() {
  return (
    <section className="relative py-6 sm:py-8 md:py-12 lg:py-24 px-3 sm:px-4 lg:px-8">
      <div className="w-full mx-auto">
        <div className="text-center mb-6 sm:mb-8 md:mb-12 lg:mb-16 space-y-4">
          <div className="h-4 bg-blue-200 animate-pulse rounded w-20 mx-auto" />
          <div className="h-10 bg-gray-200 animate-pulse rounded w-1/3 mx-auto" />
          <div className="h-6 bg-gray-200 animate-pulse rounded w-1/2 mx-auto" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 lg:gap-8 max-w-6xl mx-auto">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="bg-white rounded-lg sm:rounded-xl md:rounded-2xl p-3 sm:p-4 md:p-6 lg:p-8 shadow-lg border border-gray-200">
              <div className="space-y-4">
                <div className="h-8 bg-gray-200 animate-pulse rounded w-1/2" />
                <div className="h-4 bg-gray-200 animate-pulse rounded" />
                <div className="h-12 bg-gray-200 animate-pulse rounded w-1/3" />
                <div className="h-10 bg-gray-200 animate-pulse rounded" />
                <div className="space-y-2">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="h-4 bg-gray-200 animate-pulse rounded" />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

const FAQSectionPlaceholder = memo(function FAQSectionPlaceholder() {
  return (
    <section className="relative py-6 sm:py-8 md:py-12 lg:py-24 px-3 sm:px-4 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-6 sm:mb-8 md:mb-12 lg:mb-16 space-y-4">
          <div className="h-4 bg-blue-200 animate-pulse rounded w-32 mx-auto" />
          <div className="h-10 bg-gray-200 animate-pulse rounded w-1/3 mx-auto" />
          <div className="h-6 bg-gray-200 animate-pulse rounded w-1/2 mx-auto" />
        </div>
        <div className="bg-white rounded-lg sm:rounded-xl border border-gray-200 overflow-hidden shadow-sm">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className={`p-4 ${index < 4 ? 'border-b border-gray-200' : ''}`}>
              <div className="h-6 bg-gray-200 animate-pulse rounded w-3/4" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

const DemoDialog = memo(function DemoDialog({ isOpen, onClose, formData, setFormData }: DemoDialogProps) {
  const employeeOptions = useMemo(() => [
    "1-10 employees",
    "11-50 employees", 
    "51-200 employees",
    "201-1000 employees",
    "1000+ employees"
  ], []);

  const timelineOptions = useMemo(() => [
    "Within 1 month",
    "1-3 months",
    "3-6 months", 
    "6-12 months",
    "More than 1 year"
  ], []);

  const scrollPositionRef = useRef<number>(0);

  useEffect(() => {
    if (isOpen) {
      scrollPositionRef.current = window.scrollY;
      
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollPositionRef.current}px`;
      document.body.style.width = '100%';
      
      return () => {
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        
        // Use requestAnimationFrame to prevent layout thrashing
        requestAnimationFrame(() => {
          window.scrollTo(0, scrollPositionRef.current);
        });
      };
    }
  }, [isOpen]);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    onClose();
  }, [formData, onClose]);

  const handleInputChange = useCallback((field: keyof DemoFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  }, [setFormData]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4">
      <div 
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />
      
      <div className="relative bg-white rounded-xl md:rounded-2xl lg:rounded-3xl p-4 sm:p-6 md:p-8 w-full max-w-sm sm:max-w-md md:max-w-4xl shadow-2xl border border-gray-100 transform transition-all duration-300 scale-100 max-h-[95vh] sm:max-h-[90vh] overflow-y-auto">
        <div className="mb-4 sm:mb-6">
          <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-blue-50 rounded-lg md:rounded-xl flex items-center justify-center mb-3 sm:mb-4">
            <Image 
              src="/call-calling.svg" 
              alt="Phone" 
              width={24} 
              height={24} 
              className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6"
              loading="lazy"
            />
          </div>
          
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-2 sm:mb-3 leading-tight">
            Intro Call with{' '}
            <span className="bg-gradient-to-r from-blue-600 via-blue-400 to-blue-600 bg-clip-text text-transparent">
              ShowOnAI!
            </span>
          </h2>
          
          <p className="text-gray-500 text-xs sm:text-sm md:text-base leading-relaxed">
            For enterprises plans or consultation. Discovery call with a member of the team.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4 md:space-y-5">
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
              Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="Enter Your Name"
              className="w-full px-3 py-2.5 sm:px-3 sm:py-3 md:px-4 md:py-4 bg-gray-50 border-0 rounded-lg text-gray-700 text-xs sm:text-sm outline-none transition-all focus:bg-white focus:shadow-lg focus:ring-2 focus:ring-blue-500/20 placeholder-gray-400"
            />
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
              Number of Employees
            </label>
            <div className="relative">
              <select
                value={formData.employees}
                onChange={(e) => handleInputChange('employees', e.target.value)}
                className="w-full px-3 py-2.5 sm:px-3 sm:py-3 md:px-4 md:py-4 bg-gray-50 border-0 rounded-lg text-gray-700 text-xs sm:text-sm outline-none appearance-none transition-all focus:bg-white focus:shadow-lg focus:ring-2 focus:ring-blue-500/20 cursor-pointer hover:bg-gray-100"
              >
                <option value="" disabled className="text-gray-400">Select Number of Employees Category</option>
                {employeeOptions.map((option, index) => (
                  <option key={index} value={option} className="text-gray-700 py-2">{option}</option>
                ))}
              </select>
              <div className="absolute right-2 sm:right-3 md:right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <svg className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-gray-400 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
              Timeline for Investing in GEO Strategy
            </label>
            <div className="relative">
              <select
                value={formData.timeline}
                onChange={(e) => handleInputChange('timeline', e.target.value)}
                className="w-full px-3 py-2.5 sm:px-3 sm:py-3 md:px-4 md:py-4 bg-gray-50 border-0 rounded-lg text-gray-700 text-xs sm:text-sm outline-none appearance-none transition-all focus:bg-white focus:shadow-lg focus:ring-2 focus:ring-blue-500/20 cursor-pointer hover:bg-gray-100"
              >
                <option value="" disabled className="text-gray-400">Select Timeline for Investing in GEO Strategy</option>
                {timelineOptions.map((option, index) => (
                  <option key={index} value={option} className="text-gray-700 py-2">{option}</option>
                ))}
              </select>
              <div className="absolute right-2 sm:right-3 md:right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <svg className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-gray-400 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label className="block text-xs sm:text-sm font-medium text-gray-700">
                Are You an Agency?
              </label>
              
              <div className="flex items-center gap-4">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="agency"
                    value="yes"
                    checked={formData.agency === 'yes'}
                    onChange={(e) => handleInputChange('agency', e.target.value)}
                    className="w-4 h-4 border-gray-300 focus:ring-0 focus:ring-offset-0"
                    style={{ accentColor: '#2353DF' }}
                  />
                  <span className="ml-2 text-xs sm:text-sm text-gray-700 font-medium">Yes</span>
                </label>
                
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="agency"
                    value="no"
                    checked={formData.agency === 'no'}
                    onChange={(e) => handleInputChange('agency', e.target.value)}
                    className="w-4 h-4 border-gray-300 focus:ring-0 focus:ring-offset-0"
                    style={{ accentColor: '#2353DF' }}
                  />
                  <span className="ml-2 text-xs sm:text-sm text-gray-700 font-medium">No</span>
                </label>
              </div>
            </div>
          </div>

          <div className="flex justify-center md:justify-end pt-2 sm:pt-3 md:pt-4">
            <button
              type="submit"
              className="w-full sm:w-full md:w-auto bg-gray-900 text-white py-2.5 sm:py-3 px-4 sm:px-6 md:px-8 rounded-lg font-medium hover:bg-gray-800 transition-all duration-200 flex items-center justify-center gap-1.5 sm:gap-2 text-xs sm:text-sm shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
            >
              Continue
              <svg className="w-3 h-3 sm:w-4 sm:h-4 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
});



const HeroSection = memo(function HeroSection({ email, setEmail, onEmailSubmit }: HeroSectionProps) {
  const handleEmailChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }, [setEmail]);

  return (
    <section className="relative flex justify-center px-4 sm:px-6 lg:px-8 py-4 sm:py-6 md:py-8 lg:py-16 pb-8 sm:pb-12 md:pb-16 lg:pb-20">
      <div className="relative z-10 max-w-6xl mx-auto text-center w-full">
        <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-white/20 backdrop-blur-sm rounded-full px-2.5 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 border border-white/30 mb-3 sm:mb-4 md:mb-6">
          <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 md:w-2 md:h-2 bg-white rounded-full"></div>
          <span className="text-white text-xs sm:text-xs md:text-sm font-medium">TRACKED. RANKED. VISITED.</span>
        </div>

        <h1 className={`${typography.h1} text-white mb-3 sm:mb-4 md:mb-6 max-w-5xl mx-auto px-2`}>
          국내 시장의 AI 검색 최적화를 위한
          단 하나의 솔루션, ShowOnAI
        </h1>

        <p className={`${typography.subtitle} text-gray-200 mb-4 sm:mb-6 md:mb-8 lg:mb-12 max-w-4xl mx-auto px-3 sm:px-4`}>
          국내 사용자 데이터와 검색 환경을 기반으로, 브랜드에 최적화된 SEO 전략을 수립합니다.<br className="hidden sm:block" />
          자체 R&D를 통해 축적한 SEO 기술과 실행 중심 컨설팅으로 결과를 만듭니다.
        </p>
        
        <div className="flex justify-center px-3 sm:px-4 mb-8 sm:mb-8 md:mb-12 lg:mb-16">
          <div className="flex flex-col sm:flex-row items-center w-full max-w-xs sm:max-w-lg md:max-w-xl lg:max-w-2xl gap-2 sm:gap-0">
            <div className="flex items-center w-full h-9 sm:h-10 md:h-12 lg:h-14 px-1 sm:px-1 md:px-2 rounded-full border border-gray-200 bg-white shadow-2xl">
              <input
                type="email"
                placeholder="회사 이메일을 입력하세요"
                value={email}
                onChange={handleEmailChange}
                className="flex-1 ml-1.5 sm:ml-2 md:ml-4 bg-transparent border-none outline-none text-gray-600 placeholder-gray-400 text-xs sm:text-sm md:text-base lg:text-lg"
              />
              <button
                onClick={onEmailSubmit}
                className="ml-1 sm:ml-1 md:ml-2 px-2 sm:px-2.5 md:px-4 lg:px-6 py-1 md:py-1 lg:py-2 rounded-full bg-black text-white font-semibold text-xs sm:text-xs md:text-sm lg:text-lg hover:bg-gray-800 transition-colors active:scale-95 whitespace-nowrap"
              >
                무료 진단 받기
              </button>
            </div>
          </div>
        </div>

        <div className="hidden sm:flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 md:gap-8 lg:gap-10 mt-4 sm:mt-6 md:mt-8 lg:mt-12 px-4">
          <div className="w-full max-w-[500px] sm:max-w-[650px] md:max-w-[750px] lg:max-w-[850px] xl:max-w-[950px] 2xl:max-w-[1050px]">
            <Image 
              src="/brand-mentions.svg" 
              alt="Brand Mentions Chart" 
              width={700}
              height={336}
              className="w-full h-auto"
              loading="lazy"
            />
          </div>
          
          <div className="w-full max-w-[130px] sm:max-w-[180px] md:max-w-[230px] lg:max-w-[280px] xl:max-w-[330px] 2xl:max-w-[380px] mt-8 sm:mt-10 md:mt-12 lg:mt-16">
            <Image 
              src="/sov.svg" 
              alt="Share of Voice Chart" 
              width={380}
              height={380}
              className="w-full h-auto"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
});

const CTASection = memo(function CTASection({ onDashboardClick }: CTASectionProps) {
  return (
    <section className="relative px-3 sm:px-4 lg:px-8 pt-3 sm:pt-4 md:pt-8 lg:pt-12">
      <div className="relative rounded-t-xl sm:rounded-t-2xl md:rounded-t-3xl overflow-hidden flex items-center justify-center min-h-[250px] sm:min-h-[300px] md:min-h-[400px]" style={{
        backgroundImage: 'url(/above-footer.svg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}>
        <div className="relative z-10 flex flex-col items-center justify-center text-center py-8 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-6 md:px-8">
          <h2 className={`${typography.h2} text-white mb-4 sm:mb-6 md:mb-8 max-w-4xl px-2`}>
            ShowOnAI와 함께,<br />
            제로 클릭 시대의 브랜드 자리를 먼저 선점하세요.
          </h2>
          
          <button 
            onClick={onDashboardClick}
            className="inline-flex items-center gap-1.5 sm:gap-2 bg-black text-white px-3 sm:px-4 md:px-6 lg:px-8 py-2 sm:py-2.5 md:py-3 lg:py-4 rounded-lg sm:rounded-xl md:rounded-[20px] font-medium text-xs sm:text-sm md:text-base hover:bg-gray-800 transition-colors shadow-lg active:scale-95"
          >
            데모 요청
            <Image 
              src="/chat.svg" 
              alt="Chat" 
              width={16} 
              height={16} 
              className="w-3 h-3 sm:w-3 sm:h-3 md:w-4 md:h-4"
              loading="lazy"
            />
          </button>
        </div>
      </div>
    </section>
  );
});



function LandingPage() {
  const [email, setEmail] = useState<string>('');
  const [isYearly, setIsYearly] = useState<boolean>(true);
  const [expandedFaq, setExpandedFaq] = useState<number[]>([1]);
  const [isMounted, setIsMounted] = useState<boolean>(false);
  
  const {
    showDemoDialog,
    demoForm,
    handleLoginClick,
    handleDashboardClick,
    handleCloseDialog,
    handleSetDemoForm
  } = useNavbar();

  const scrollPositionRef = useRef<number>(0);

  const handleEmailSubmit = useCallback(() => {
    if (email) {
      window.location.href = `/login?email=${encodeURIComponent(email)}`;
    }
  }, [email]);

  // Ensure component is mounted before handling dialog
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (showDemoDialog && isMounted) {
      scrollPositionRef.current = window.scrollY;
      
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollPositionRef.current}px`;
      document.body.style.width = '100%';
      
      return () => {
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        
        // Use requestAnimationFrame to prevent layout thrashing
        requestAnimationFrame(() => {
          window.scrollTo(0, scrollPositionRef.current);
        });
      };
    }
  }, [showDemoDialog, isMounted]);

  useEffect(() => {
    const preloadImages = [
      '/showonai-white.svg',
      '/brand-mentions.svg',
      '/sov.svg'
    ];

    preloadImages.forEach(src => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      document.head.appendChild(link);
    });
  }, []);

  return (
    <div className="min-h-screen bg-blue-50 font-manrope scroll-smooth flex flex-col" style={{backgroundImage:'url(/landing-page.svg)', backgroundSize: 'cover', backgroundPosition: 'top center' }}>
      <div className="relative flex-shrink-0 pb-8 sm:pb-12 md:pb-16 lg:pb-20">        
        <div 
          className="relative z-10 rounded-[24px] mx-4 mt-1 sm:mt-2 md:mt-3 lg:mt-4 overflow-hidden" 
          style={{ 
            height: 'clamp(1000px, 110vh, 2200px)',
            minHeight: '1000px',
            backgroundImage: 'url(/background.svg)', 
            backgroundSize: 'cover', 
            backgroundPosition: 'top center' 
          }}
        >
          <Navbar 
            onLoginClick={handleLoginClick}
            onDashboardClick={handleDashboardClick}
          />
          
          <HeroSection 
            email={email}
            setEmail={setEmail}
            onEmailSubmit={handleEmailSubmit}
          />
        </div>
      </div>
      
      <div className="flex-grow flex flex-col relative z-0">
        <Suspense fallback={<QuoteSectionPlaceholder />}>
          <ErrorBoundary fallback={<QuoteSectionPlaceholder />}>
            <QuoteSection />
          </ErrorBoundary>
        </Suspense>
        
        <Suspense fallback={<FeaturesSectionPlaceholder />}>
          <ErrorBoundary fallback={<FeaturesSectionPlaceholder />}>
            <FeaturesSection />
          </ErrorBoundary>
        </Suspense>
        
        <Suspense fallback={<PricingSectionPlaceholder />}>
          <ErrorBoundary fallback={<PricingSectionPlaceholder />}>
            <PricingSection isYearly={isYearly} setIsYearly={setIsYearly} />
          </ErrorBoundary>
        </Suspense>
        
        <Suspense fallback={<FAQSectionPlaceholder />}>
          <ErrorBoundary fallback={<FAQSectionPlaceholder />}>
            <FAQSection expandedFaq={expandedFaq} setExpandedFaq={setExpandedFaq} />
          </ErrorBoundary>
        </Suspense>

        <div className="mt-auto">
          <CTASection onDashboardClick={handleDashboardClick} />
          <Footer />
        </div>
      </div>
      
      <style jsx>{`
        .font-manrope {
          font-family: var(--font-manrope), system-ui, sans-serif;
        }
      `}</style>

      {showDemoDialog && isMounted && (
        <DemoDialog 
          isOpen={showDemoDialog}
          onClose={handleCloseDialog}
          formData={demoForm}
          setFormData={handleSetDemoForm}
        />
      )}
    </div>
  );
}

export default LandingPage;