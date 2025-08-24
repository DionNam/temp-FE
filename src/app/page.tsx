"use client";

import React, { useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import QuoteSection from '../components/landing/QuoteSection';
import FeaturesSection from '../components/landing/FeaturesSection';
import PricingSection from '../components/landing/PricingSection';
import FAQSection from '../components/landing/FAQSection';
import { sendDemoEmail, openGmail, DemoFormData } from '../services/emailService';

interface DemoDialogProps {
  isOpen: boolean;
  onClose: () => void;
  formData: DemoFormData;
  setFormData: React.Dispatch<React.SetStateAction<DemoFormData>>;
}

interface HeroSectionProps {
  email: string;
  setEmail: (email: string) => void;
  onEmailSubmit: () => void;
}

interface CTASectionProps {
  onDashboardClick: () => void;
}

const typography = {
  h1: "font-manrope font-semibold text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl leading-tight",
  h2: "font-manrope font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl leading-tight",
  h3: "font-manrope font-semibold text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed",
  h4: "font-manrope font-semibold text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed",
  title:
    "font-manrope font-semibold text-lg sm:text-xl md:text-2xl lg:text-3xl leading-relaxed",
  title2:
    "font-manrope font-semibold text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed",
  subtitle:
    "font-manrope font-normal text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl leading-relaxed",
  body: "font-manrope font-normal text-sm sm:text-base leading-relaxed",
  caption:
    "font-manrope font-medium text-xs sm:text-sm uppercase tracking-wider",
  price: "font-manrope font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl",
} as const;

function useSimpleNavbar() {
  const [showDemoDialog, setShowDemoDialog] = useState(false);
  const [demoForm, setDemoForm] = useState<DemoFormData>({
    email: '',
    name: '',
    employees: '',
    timeline: '',
    agency: ''
  });

  const handleLoginClick = () => {
    window.location.href = '/login';
  };

  const handleDashboardClick = () => {
    setShowDemoDialog(true);
  };

  const handleCloseDialog = () => {
    setShowDemoDialog(false);
  };

  return {
    showDemoDialog,
    demoForm,
    handleLoginClick,
    handleDashboardClick,
    handleCloseDialog,
    setDemoForm
  };
}

function DemoDialog({ isOpen, onClose, formData, setFormData }: DemoDialogProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string>('');

  const employeeOptions = [
    "1-10 employees",
    "11-50 employees",
    "51-200 employees",
    "201-1000 employees",
    "1000+ employees"
  ];

  const timelineOptions = [
    "Within 1 month",
    "1-3 months",
    "3-6 months",
    "6-12 months",
    "More than 1 year"
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setSubmitError('');

    try {
      console.log('Submitting demo request:', formData);
      
      const success = await sendDemoEmail(formData);
      
      if (success) {
        console.log('Demo request submitted successfully');
        setIsSubmitted(true);
        
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if (typeof window !== 'undefined' && (window as any).gtag) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (window as any).gtag('event', 'demo_request_submitted', {
            email: formData.email,
            employees: formData.employees,
            agency: formData.agency,
          });
        }
        
      } else {
        setSubmitError('Failed to send demo request. Please try again.');
      }
    } catch (error) {
      console.error('Demo submission error:', error);
      setSubmitError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: keyof DemoFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleGoToEmail = () => {
    openGmail();
    onClose();
  };

  const handleCloseSuccess = () => {
    setIsSubmitted(false);
    onClose();
    setFormData({
      email: '',
      name: '',
      employees: '',
      timeline: '',
      agency: ''
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-2 sm:p-4" role="dialog" aria-modal="true" aria-labelledby="demo-dialog-title">
      <div 
        className="absolute inset-0 bg-black/50"
        onClick={handleCloseSuccess}
        aria-label="Close dialog"
      />
      
      <div className="relative bg-white rounded-xl md:rounded-2xl lg:rounded-3xl p-4 sm:p-6 md:p-8 w-full max-w-sm sm:max-w-md md:max-w-4xl shadow-2xl border border-gray-100 max-h-[105vh] sm:max-h-[100vh] overflow-y-auto">
        {isSubmitted ? (
          <div className="relative min-h-[280px] sm:min-h-[320px] md:min-h-[360px]">
            <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-blue-50 rounded-xl md:rounded-2xl flex items-center justify-center mb-4 sm:mb-6">
              <Image 
                src="/sms-tracking.svg" 
                alt="SMS Tracking Icon" 
                width={32} 
                height={32} 
                className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10"
              />
            </div>

            <span className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 via-blue-400 to-blue-600 bg-clip-text text-transparent text-left">
              We&apos;re on it!
            </span>

            <p className="mt-1 sm:mt-2 md:mt-3 text-gray-500 text-base sm:text-lg md:text-xl leading-relaxed mb-1 sm:mb-2 md:mb-3 text-left max-w-3xl">
              Your message is on its way. We&apos;ll review your inquiry and get back to you with a solution as soon as possible.
            </p>

            <div className="absolute bottom-2 sm:bottom-4 md:bottom-6 right-0">
              <button
                onClick={handleGoToEmail}
                className="w-full sm:w-full md:w-auto bg-gray-900 text-white py-2.5 sm:py-3 px-4 sm:px-6 md:px-8 rounded-lg font-medium hover:bg-gray-800 flex items-center justify-center gap-1.5 sm:gap-2 text-xs sm:text-sm shadow-lg"
              >
                Go to Email
                <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="mb-4 sm:mb-6">
              <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-blue-50 rounded-lg md:rounded-xl flex items-center justify-center mb-3 sm:mb-4">
                <Image 
                  src="/call-calling.svg" 
                  alt="전화 아이콘" 
                  width={24} 
                  height={24} 
                  className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6"
                />
              </div>
              
              <h2 id="demo-dialog-title" className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-2 sm:mb-3 leading-tight">
                Intro Call with{' '}
                <span className="bg-gradient-to-r from-blue-600 via-blue-400 to-blue-600 bg-clip-text text-transparent">
                  ShowOnAI!
                </span>
              </h2>
              
              <p className="text-gray-500 text-xs sm:text-sm md:text-base leading-relaxed">
                For enterprises plans or consultation. Discovery call with a member of the team.
              </p>
            </div>

            {submitError && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-sm">{submitError}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4 md:space-y-5">
              <div>
                <label htmlFor="name" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Enter Your Name"
                  className="w-full px-3 py-2.5 sm:px-3 sm:py-3 md:px-4 md:py-4 bg-gray-50 border-0 rounded-lg text-gray-700 text-xs sm:text-sm outline-none focus:bg-white focus:shadow-lg focus:ring-2 focus:ring-blue-500/20 placeholder-gray-400"
                  required
                  disabled={isLoading}
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="Enter Your Email"
                  className="w-full px-3 py-2.5 sm:px-3 sm:py-3 md:px-4 md:py-4 
                            bg-gray-50 border-0 rounded-lg text-gray-700 text-xs sm:text-sm 
                            outline-none focus:bg-white focus:shadow-lg 
                            focus:ring-2 focus:ring-blue-500/20 placeholder-gray-400"
                  required
                  disabled={isLoading}
                />
              </div>

              <div>
                <label htmlFor="employees" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                  Number of Employees
                </label>
                <div className="relative">
                  <select
                    id="employees"
                    value={formData.employees}
                    onChange={(e) => handleInputChange('employees', e.target.value)}
                    className="w-full px-3 py-2.5 sm:px-3 sm:py-3 md:px-4 md:py-4 bg-gray-50 border-0 rounded-lg text-gray-700 text-xs sm:text-sm outline-none appearance-none focus:bg-white focus:shadow-lg focus:ring-2 focus:ring-blue-500/20 cursor-pointer hover:bg-gray-100"
                    required
                    disabled={isLoading}
                  >
                    <option value="" disabled>Select Number of Employees Category</option>
                    {employeeOptions.map((option, index) => (
                      <option key={index} value={option}>{option}</option>
                    ))}
                  </select>
                  <div className="absolute right-2 sm:right-3 md:right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="timeline" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                  Timeline for Investing in GEO Strategy
                </label>
                <div className="relative">
                  <select
                    id="timeline"
                    value={formData.timeline}
                    onChange={(e) => handleInputChange('timeline', e.target.value)}
                    className="w-full px-3 py-2.5 sm:px-3 sm:py-3 md:px-4 md:py-4 bg-gray-50 border-0 rounded-lg text-gray-700 text-xs sm:text-sm outline-none appearance-none focus:bg-white focus:shadow-lg focus:ring-2 focus:ring-blue-500/20 cursor-pointer hover:bg-gray-100"
                    required
                    disabled={isLoading}
                  >
                    <option value="" disabled>Select Timeline for Investing in GEO Strategy</option>
                    {timelineOptions.map((option, index) => (
                      <option key={index} value={option}>{option}</option>
                    ))}
                  </select>
                  <div className="absolute right-2 sm:right-3 md:right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between w-full">
                  <span className="text-xs sm:text-sm font-medium text-gray-700">
                    Are You an Agency?
                  </span>

                  <div className="flex items-center gap-4">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="agency"
                        value="yes"
                        checked={formData.agency === 'yes'}
                        onChange={(e) => handleInputChange('agency', e.target.value)}
                        className="w-4 h-4 border-gray-300"
                        style={{ accentColor: '#2353DF' }}
                        disabled={isLoading}
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
                        className="w-4 h-4 border-gray-300"
                        style={{ accentColor: '#2353DF' }}
                        disabled={isLoading}
                      />
                      <span className="ml-2 text-xs sm:text-sm text-gray-700 font-medium">No</span>
                    </label>
                  </div>
                </div>
              </div>
              
              {formData.agency === 'yes' && (
                <>
                  <div>
                    <label htmlFor="agencyName" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                      Agency Name
                    </label>
                    <input
                      id="agencyName"
                      type="text"
                      value={formData.agencyName || ''}
                      onChange={(e) => handleInputChange('agencyName', e.target.value)}
                      placeholder="Enter Agency Name"
                      className="w-full px-3 py-2.5 sm:px-3 sm:py-3 md:px-4 md:py-4 
                                bg-gray-50 border-0 rounded-lg text-gray-700 text-xs sm:text-sm 
                                outline-none focus:bg-white focus:shadow-lg 
                                focus:ring-2 focus:ring-blue-500/20 placeholder-gray-400"
                      disabled={isLoading}
                    />
                  </div>
                </>
              )}

              <div className="flex justify-center md:justify-end pt-2 sm:pt-3 md:pt-4">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full sm:w-full md:w-auto bg-gray-900 text-white py-2.5 sm:py-3 px-4 sm:px-6 md:px-8 rounded-lg font-medium hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-1.5 sm:gap-2 text-xs sm:text-sm shadow-lg"
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      Submit
                      <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </>
                  )}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

function HeroSection({ email, setEmail, onEmailSubmit }: HeroSectionProps) {
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onEmailSubmit();
  };

  return (
    <section className="relative flex flex-col items-center w-full px-0 py-4 sm:py-6 md:py-8 lg:py-16 pb-8 sm:pb-12 md:pb-16 lg:pb-20 mt-6 sm:mt-0">
      <div className="relative z-10 w-full max-w-sm md:max-w-6xl mx-auto text-center">
        <div className="inline-flex items-center gap-1.5 md:gap-2 bg-white/20 backdrop-blur-sm rounded-full px-3 md:px-4 py-1.5 md:py-2 border border-white/30 mb-10 md:mb-6">
          <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-white rounded-full" aria-hidden="true"></div>
          <span className="text-white text-sm font-medium">TRACKED. RANKED. VISITED.</span>
        </div>

        <h1 className={`font-manrope font-bold text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-white mb-6 md:mb-6 leading-tight px-6 max-w-5xl mx-auto ${typography?.h1 || ''}`}>
          국내 시장의 AI 검색 최적화를 위한 단 하나의 솔루션, ShowOnAI
        </h1>

        <p className={`font-manrope text-sm md:text-base lg:text-lg text-gray-200 mb-10 md:mb-12 leading-relaxed px-3 md:px-4 max-w-4xl mx-auto ${typography?.subtitle || ''}`}>
          국내 사용자 데이터와 검색 환경을 기반으로, 브랜드에 최적화된 SEO 전략을 수립합니다.
          <br className="hidden sm:block" />
          자체 R&D를 통해 축적한 SEO 기술과 실행 중심 컨설팅으로 결과를 만듭니다.
        </p>
        
        <div className="flex justify-center px-3 md:px-4 mb-12 md:mb-16">
          <form onSubmit={handleSubmit} className="w-full max-w-xs md:max-w-xl lg:max-w-2xl">
            <div className="flex items-center w-full h-12 md:h-14 px-2 rounded-full border border-gray-200 bg-white shadow-lg md:shadow-2xl">
              <label htmlFor="email-input" className="sr-only">회사 이메일</label>
              <input
                id="email-input"
                type="email"
                placeholder="회사 이메일을 입력하세요"
                value={email}
                onChange={handleEmailChange}
                className="flex-1 ml-3 md:ml-4 bg-transparent border-none outline-none text-gray-600 placeholder-gray-400 text-sm md:text-base lg:text-lg"
                required
                aria-describedby="email-description"
              />
              <div id="email-description" className="sr-only">
                무료 SEO 진단을 받기 위해 회사 이메일을 입력해주세요
              </div>
              <button
                type="submit"
                className="ml-2 px-4 md:px-6 py-2 rounded-full bg-black text-white font-semibold text-sm md:text-sm lg:text-lg hover:bg-gray-800 whitespace-nowrap"
              >
                무료 진단 받기
              </button>
            </div>
          </form>
        </div>

        <div className="mt-8 md:mt-12">
          <div className="hidden md:block w-full max-w-7xl mx-auto">
            <Image 
              src="/brand-sov.webp" 
              alt="ShowOnAI 브랜드 Share of Voice 분석 대시보드 - AI 검색 최적화 결과 시각화 및 경쟁사 비교" 
              width={3500} 
              height={1866}
              className="w-full h-auto"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function CTASection({ onDashboardClick }: CTASectionProps) {
  return (
    <section className="relative px-3 sm:px-4 lg:px-8 pt-3 sm:pt-4 md:pt-8 lg:pt-12">
      <div className="relative rounded-xl sm:rounded-2xl md:rounded-3xl overflow-hidden flex items-center justify-center min-h-[250px] sm:min-h-[300px] md:min-h-[400px]">
        <div
          className="absolute inset-0 block md:hidden rounded-xl"
          style={{
            backgroundImage: 'url(/above-footer-mobile.webp)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
          role="img"
          aria-label="ShowOnAI 서비스 소개 배경 이미지"
        />

        <div 
          className="absolute inset-0 hidden md:block rounded-t-3xl"
          style={{
            backgroundImage: 'url(/above-footer.webp)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
          role="img"
          aria-label="ShowOnAI 서비스 소개 배경 이미지"
        />

        <div className="relative z-10 flex flex-col items-center justify-center text-center py-8 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-6 md:px-8 w-full">
          <div className="block md:hidden w-full max-w-sm flex-col items-center justify-between h-full min-h-[220px] py-6">
            <div className="mt-auto mb-6">
              <h2 className="text-white text-2xl sm:text-3xl font-semibold leading-tight text-center">
                ShowOnAI와 함께,<br />
                제로 클릭 시대의 브랜드<br />
                자리를 먼저 선점하세요.
              </h2>
            </div>
            
            <div className="mb-auto">
              <button 
                onClick={onDashboardClick}
                className="inline-flex items-center justify-center gap-2 bg-gray-900 text-white px-5 py-2.5 rounded-[18px] font-medium text-sm hover:bg-gray-800 shadow-md transition-all duration-200 w-full max-w-[160px]"
              >
                데모 요청
                <Image 
                  src="/chat.svg" 
                  alt="" 
                  width={16} 
                  height={16} 
                  className="w-4 h-4"
                  aria-hidden="true"
                />
              </button>
            </div>
          </div>

          <div className="hidden md:block">
            <h2 className="text-white text-2xl md:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 md:mb-8 max-w-4xl px-2">
              ShowOnAI와 함께,<br />
              제로 클릭 시대의 브랜드 자리를 먼저 선점하세요.
            </h2>
            
            <button 
              onClick={onDashboardClick}
              className="inline-flex items-center gap-2 bg-black text-white px-8 md:px-10 py-2 md:py-2.5 rounded-xl md:rounded-2xl font-medium text-sm md:text-base hover:bg-gray-800 shadow-lg transition-all duration-200"
            >
              데모 요청
              <Image 
                src="/chat.svg" 
                alt="" 
                width={16} 
                height={16} 
                className="w-4 h-4"
                aria-hidden="true"
              />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}

export default function LandingPage() {
  const [email, setEmail] = useState('');
  const [isYearly, setIsYearly] = useState(true);
  const [expandedFaq, setExpandedFaq] = useState([1]);
  const [backgroundImage, setBackgroundImage] = useState('/background.webp');

  const {
    showDemoDialog,
    demoForm,
    handleLoginClick,
    handleDashboardClick,
    handleCloseDialog,
    setDemoForm
  } = useSimpleNavbar();

  const handleEmailSubmit = useCallback(() => {
    if (email && email.includes('@')) {
      window.location.href = `/login?email=${encodeURIComponent(email)}`;
    }
  }, [email]);

  useEffect(() => {
    const checkScreenSize = () => {
      if (window.innerWidth < 640) {
        setBackgroundImage('/background-mobile.webp');
      } else {
        setBackgroundImage('/background.webp');
      }
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // useEffect(() => {
  //   if (showDemoDialog && isMounted) {
  //     scrollPositionRef.current = window.scrollY;

  //     document.body.style.overflow = "hidden";

  //     return () => {
  //       document.body.style.overflow = "";

  //       setTimeout(() => {
  //         window.scrollTo(0, scrollPositionRef.current);
  //       }, 0);
  //     };
  //   }
  // }, [showDemoDialog, isMounted]);

  return (
    // REMOVED: All <Head> tags - handled by layout.tsx now
    <div className="min-h-screen bg-blue-50 font-manrope flex flex-col" style={{backgroundImage:'url(/landing-page.svg)', backgroundSize: 'cover', backgroundPosition: 'top center' }}>
      <div className="relative flex-shrink-0 pb-8 sm:pb-12 md:pb-16 lg:pb-20">        
        <div 
          className="relative z-10 overflow-hidden 
                    rounded-[0px] sm:rounded-[24px] 
                    mx-0 sm:mx-4 
                    mt-0 sm:mt-2 md:mt-3 lg:mt-4" 
          style={{ 
            height: 'clamp(1000px, 110vh, 2200px)',
            minHeight: '1000px',
            backgroundImage: `url(${backgroundImage})`,
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
      
      <main className="flex-grow flex flex-col relative z-0">
        <QuoteSection />
        <FeaturesSection />
        <PricingSection isYearly={isYearly} setIsYearly={setIsYearly} />
        <FAQSection expandedFaq={expandedFaq} setExpandedFaq={setExpandedFaq} />

        <div className="mt-auto">
          <div className="mb-8 md:-mb-16"> 
            <CTASection onDashboardClick={handleDashboardClick} />
          </div>
          <Footer />
        </div>
      </main>

      {showDemoDialog && (
        <DemoDialog 
          isOpen={showDemoDialog}
          onClose={handleCloseDialog}
          formData={demoForm}
          setFormData={setDemoForm}
        />
      )}
    </div>
  );
}