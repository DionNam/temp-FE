'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';

// Verified tick icon component
function VerifiedTick() {
  return (
    <div className="relative size-full">
      <div className="absolute flex inset-[-14.21%_-14.22%_-14.22%_-14.22%] items-center justify-center">
        <div className="flex-none h-[15.727px] rotate-[22.5deg] w-[15.728px]">
          <div className="relative size-full bg-blue-600 rounded-full" />
        </div>
      </div>
      <div className="absolute inset-[29.68%_29.68%_26.56%_26.56%]">
        <svg className="block max-w-none size-full" viewBox="0 0 8 6" fill="none">
          <path d="M1 3L3 5L7 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </div>
  );
}

interface TestimonialCard {
  id: string;
  companyLogomark: string;
  companyLogotext: string;
  testimonialText: string;
  avatarImage: string;
  personName: string;
  personRole: string;
}


const testimonials: TestimonialCard[] = [
  {
    id: '1',
    companyLogomark: '/astra.svg',
    companyLogotext: '/astra.svg',
    testimonialText: 'Utilizing ShowOnAI has transformed our approach to content creation. The insights we gather allow us to customize our messaging, effectively reaching a broader audience.',
    avatarImage: '/avatar-placeholder.png',
    personName: 'Alex Morgan',
    personRole: 'Content Strategist, Brightwave Innovations'
  },
  {
    id: '2',
    companyLogomark: '/atlas.svg',
    companyLogotext: '/atlas.svg',
    testimonialText: 'ShowOnAI has truly changed the game! It simplifies our content production process and effortlessly enhances our outreach.',
    avatarImage: '/avatar2-placeholder.png',
    personName: 'Emily Chen',
    personRole: 'Marketing Specialist, Innovatech Solutions'
  },
  {
    id: '3',
    companyLogomark: '/audlabs.svg',
    companyLogotext: '/audlabs.svg',
    testimonialText: 'Prior to using ShowOnAI, our content lacked impact. Now, we harness AI insights to craft engaging material that truly resonates with our audience.',
    avatarImage: '/avatar-placeholder.png',
    personName: 'James Patel',
    personRole: 'CEO, Visionary Media Group'
  },
  {
    id: '4',
    companyLogomark: '/base.svg',
    companyLogotext: '/base.svg',
    testimonialText: 'With ShowOnAI, we can monitor our content\'s performance in real-time, enabling us to swiftly adapt to our audience\'s preferences.',
    avatarImage: '/avatar2-placeholder.png',
    personName: 'Sophia Kim',
    personRole: 'Digital Marketing Manager, NexGen Strategies'
  },
  {
    id: '5',
    companyLogomark: '/imagine-ai.svg',
    companyLogotext: '/imagine-ai.svg',
    testimonialText: 'ShowOnAI has become our essential tool for content optimization. The insights we gain are crucial for effectively targeting our audience.',
    avatarImage: '/avatar-placeholder.png',
    personName: 'Ethan Wong',
    personRole: 'Content Creator, Creative Hub'
  },
  {
    id: '6',
    companyLogomark: '/astra.svg',
    companyLogotext: '/astra.svg',
    testimonialText: 'Thanks to ShowOnAI, we can focus on creating compelling narratives while the platform manages the analytics. It\'s a win-win situation!',
    avatarImage: '/avatar2-placeholder.png',
    personName: 'Maya Robinson',
    personRole: 'Head of Content, EcoSolutions'
  },
  {
    id: '7',
    companyLogomark: '/atlas.svg',
    companyLogotext: '/atlas.svg',
    testimonialText: 'Our engagement metrics have soared since we adopted ShowOnAI. It\'s now a vital component of our content strategy!',
    avatarImage: '/avatar-placeholder.png',
    personName: 'Oliver Smith',
    personRole: 'Content Director, TechSphere Innovations'
  },
  {
    id: '8',
    companyLogomark: '/audlabs.svg',
    companyLogotext: '/audlabs.svg',
    testimonialText: 'ShowOnAI has revolutionized our content marketing strategy. The insights we receive enable us to develop targeted campaigns that genuinely connect.',
    avatarImage: '/avatar2-placeholder.png',
    personName: 'Isabella Garcia',
    personRole: 'Content Analyst, MarketMinds'
  },
  {
    id: '9',
    companyLogomark: '/base.svg',
    companyLogotext: '/base.svg',
    testimonialText: 'The AI-driven insights from ShowOnAI have empowered us to refine our content strategy, ensuring we connect with the right audience at the right moment.',
    avatarImage: '/avatar-placeholder.png',
    personName: 'Noah Carter',
    personRole: 'Content Strategist, BrightFuture Solutions'
  }
];

export default function TestimonialsSection() {
  const mobileScrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = React.useState(0);

  useEffect(() => {
    const scrollContainer = mobileScrollRef.current;
    if (!scrollContainer) return;

    let isUserScrolling = false;
    let scrollTimeout: NodeJS.Timeout;
    let autoScrollInterval: NodeJS.Timeout;

    // 현재 보이는 카드 인덱스 계산
    const updateActiveIndex = () => {
      const cardWidth = 296; // 280px width + 16px gap
      const scrollLeft = scrollContainer.scrollLeft;
      const newIndex = Math.round(scrollLeft / cardWidth);
      setActiveIndex(newIndex);
    };

    // 사용자가 스크롤하는지 감지
    const handleScroll = () => {
      isUserScrolling = true;
      updateActiveIndex();
      clearTimeout(scrollTimeout);
      clearInterval(autoScrollInterval);
      
      // 2초 후 자동 스크롤 재시작
      scrollTimeout = setTimeout(() => {
        isUserScrolling = false;
        startAutoScroll();
      }, 2000);
    };

    // 자동 스크롤 시작
    const startAutoScroll = () => {
      if (isUserScrolling) return;
      
      autoScrollInterval = setInterval(() => {
        if (isUserScrolling || !scrollContainer) return;
        
        const cardWidth = 296; // 280px width + 16px gap
        const currentScroll = scrollContainer.scrollLeft;
        const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;
        
        if (currentScroll >= maxScroll) {
          // 끝에 도달하면 처음으로 돌아가기
          scrollContainer.scrollTo({ left: 0, behavior: 'smooth' });
          setActiveIndex(0);
        } else {
          // 다음 카드로 스크롤
          scrollContainer.scrollBy({ left: cardWidth, behavior: 'smooth' });
          const newIndex = Math.round((currentScroll + cardWidth) / cardWidth);
          setActiveIndex(Math.min(newIndex, 5));
        }
      }, 3000); // 3초마다 자동 스크롤
    };

    scrollContainer.addEventListener('scroll', handleScroll);
    
    // 1초 후 자동 스크롤 시작
    const initialTimeout = setTimeout(() => {
      startAutoScroll();
    }, 1000);

    return () => {
      clearTimeout(scrollTimeout);
      clearTimeout(initialTimeout);
      clearInterval(autoScrollInterval);
      scrollContainer?.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Organize testimonials into 3 columns
  const column1 = testimonials.slice(0, 3);
  const column2 = testimonials.slice(3, 6);
  const column3 = testimonials.slice(6, 9);

  return (
    <div className="bg-white box-border content-stretch flex flex-col gap-[48px] md:gap-[64px] items-center justify-start pb-16 sm:pb-20 lg:pb-24 pt-16 sm:pt-20 lg:pt-24 px-0 relative size-full">
      {/* Header Section */}
      <div className="box-border content-stretch flex flex-col gap-[32px] items-start justify-start max-w-[1280px] px-[16px] md:px-[32px] py-0 relative shrink-0 w-full">
        <div className="content-stretch flex flex-col gap-[32px] items-center justify-start relative shrink-0 w-full">
          <div className="content-stretch flex flex-col gap-[16px] md:gap-[20px] items-center justify-start leading-[0] max-w-[768px] not-italic relative shrink-0 text-center w-full">
            <div className="font-['Inter'] font-semibold relative shrink-0 text-[#181d27] text-[28px] md:text-[36px] tracking-[-0.56px] md:tracking-[-0.72px] w-full">
              <p className="leading-[36px] md:leading-[44px]">Client Testimonials</p>
            </div>
            <div className="font-['Inter'] font-normal relative shrink-0 text-[#535862] text-[16px] md:text-[20px] w-full">
              <p className="leading-[24px] md:leading-[30px]">Explore how our innovative platform is reshaping the connection between businesses and their customers with powerful AI insights.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Grid */}
      <div className="box-border content-stretch flex flex-col gap-[32px] items-start justify-start max-w-[1280px] px-[16px] md:px-[32px] py-0 relative shrink-0 w-full">
        <div className="content-stretch flex flex-col gap-[40px] items-center justify-start relative shrink-0 w-full">
          {/* Desktop Layout: 3 Columns */}
          <div className="content-stretch hidden lg:flex gap-[32px] items-start justify-start relative shrink-0 w-full">
            {/* Gradient mask overlay */}
            <div className="absolute content-stretch flex flex-col inset-0 items-start justify-start pointer-events-none z-10">
              <div className="basis-0 grow min-h-px min-w-px shrink-0 w-full" />
              <div className="h-[200px] shrink-0 w-full bg-gradient-to-t from-white to-transparent" />
            </div>

            {/* Column 1 */}
            <div className="basis-0 box-border content-stretch flex flex-col gap-[32px] grow items-start justify-start min-h-px min-w-px pb-0 pt-[32px] px-0 relative shrink-0">
              {column1.map((testimonial) => (
                <TestimonialCard key={testimonial.id} testimonial={testimonial} />
              ))}
            </div>

            {/* Column 2 */}
            <div className="basis-0 content-stretch flex flex-col gap-[32px] grow items-start justify-start min-h-px min-w-px relative shrink-0">
              {column2.map((testimonial) => (
                <TestimonialCard key={testimonial.id} testimonial={testimonial} />
              ))}
            </div>

            {/* Column 3 */}
            <div className="basis-0 box-border content-stretch flex flex-col gap-[32px] grow items-start justify-start min-h-px min-w-px pb-0 pt-[40px] px-0 relative shrink-0">
              {column3.map((testimonial) => (
                <TestimonialCard key={testimonial.id} testimonial={testimonial} />
              ))}
            </div>
          </div>

          {/* Tablet Layout: 2 Columns */}
          <div className="hidden md:grid lg:hidden grid-cols-2 gap-[24px] w-full">
            {testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>

          {/* Mobile Layout: Single Column with Horizontal Scroll */}
          <div className="md:hidden w-full overflow-hidden">
            <div 
              ref={mobileScrollRef}
              className="flex gap-[16px] overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide testimonials-scroll pl-4 pr-4"
            >
              {testimonials.slice(0, 6).map((testimonial) => (
                <div key={testimonial.id} className="flex-none w-[280px] snap-start">
                  <TestimonialCard testimonial={testimonial} />
                </div>
              ))}
            </div>
            {/* 스크롤 인디케이터 */}
            <div className="flex justify-center mt-4 gap-2">
              {testimonials.slice(0, 6).map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                    index === activeIndex ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TestimonialCard({ testimonial }: { testimonial: TestimonialCard }) {
  return (
    <div className="bg-white box-border content-stretch flex flex-col gap-[48px] items-start justify-start p-[24px] md:p-[32px] relative rounded-[12px] shrink-0 w-full border border-[#e9eaeb] shadow-sm hover:shadow-md transition-shadow duration-300">
      {/* Company Logo and Testimonial Text */}
      <div className="content-stretch flex flex-col gap-[12px] items-start justify-start relative shrink-0 w-full">
        {/* Company Logo */}
        <div className="content-stretch flex gap-[8px] items-center justify-start relative shrink-0 mb-2">
          <div className="h-[24px] md:h-[32px] relative shrink-0 w-[24px] md:w-[32px] flex items-center justify-center">
            <Image 
              alt="Company logo" 
              className="max-w-full max-h-full object-contain" 
              src={testimonial.companyLogomark}
              width={32}
              height={32}
              unoptimized
            />
          </div>
        </div>
        
        {/* Testimonial Text */}
        <div className="font-['Inter'] font-normal leading-[24px] relative shrink-0 text-[#535862] text-[14px] md:text-[16px]">
          <p>{testimonial.testimonialText}</p>
        </div>
      </div>

      {/* Avatar and Person Info */}
      <div className="content-stretch flex gap-[12px] items-center justify-start relative shrink-0 w-full">
        <div className="bg-[#e0e0e0] relative rounded-[9999px] shrink-0 size-[40px] md:size-[48px] overflow-hidden">
          <Image 
            alt={`${testimonial.personName} avatar`} 
            className="block max-w-none size-full object-cover" 
            src={testimonial.avatarImage}
            width={48}
            height={48}
          />
        </div>
        <div className="basis-0 content-stretch flex flex-col grow items-start justify-start min-h-px min-w-px relative shrink-0">
          <div className="content-stretch flex gap-[4px] items-center justify-start relative shrink-0">
            <div className="font-['Inter'] font-semibold leading-[20px] md:leading-[24px] not-italic relative shrink-0 text-[#181d27] text-[14px] md:text-[16px]">
              <p>{testimonial.personName}</p>
            </div>
            <div className="overflow-clip relative shrink-0 size-[14px] md:size-[16px]">
              <VerifiedTick />
            </div>
          </div>
          <div className="font-['Inter'] font-normal leading-[20px] md:leading-[24px] relative shrink-0 text-[#535862] text-[12px] md:text-[16px]">
            <p>{testimonial.personRole}</p>
          </div>
        </div>
      </div>
    </div>
  );
}