"use client";

import React from 'react';

const typography = {
  h2: "font-manrope font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl leading-tight",
  h3: "font-manrope font-semibold text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed",
  body: "font-manrope font-normal text-sm sm:text-base leading-relaxed",
  caption: "font-manrope font-medium text-xs sm:text-sm uppercase tracking-wider",
  price: "font-manrope font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl",
} as const;

interface PricingSectionProps {
  isYearly: boolean;
  setIsYearly: (isYearly: boolean) => void;
}

export function PricingSection({ isYearly, setIsYearly }: PricingSectionProps) {
  const plans = [
    {
      name: "Lite",
      price: 99,
      description: "Single one time purchase, unlimited editing forever",
      features: [
        { text: "Unlimited projects and storage", included: true },
        { text: "Advanced collaboration tools", included: true },
        { text: "Custom branding and white-label options", included: true },
        { text: "Priority customer support", included: true },
        { text: "Enterprise-grade security", included: false },
        { text: "On-premise deployment options", included: false },
      ]
    },
    {
      name: "Growth", 
      price: 199,
      description: "Single one time purchase, unlimited editing forever",
      features: [
        { text: "Unlimited projects and storage", included: true },
        { text: "Advanced collaboration tools", included: true },
        { text: "Custom branding and white-label options", included: true },
        { text: "Priority customer support", included: true },
        { text: "Enterprise-grade security", included: false },
        { text: "On-premise deployment options", included: false },
      ]
    },
    {
      name: "Enterprise",
      price: 299,
      description: "Single one time purchase, unlimited editing forever",
      features: [
        { text: "Unlimited projects and storage", included: true },
        { text: "Advanced collaboration tools", included: true },
        { text: "Custom branding and white-label options", included: true },
        { text: "Priority customer support", included: true },
        { text: "Enterprise-grade security", included: true },
        { text: "On-premise deployment options", included: true },
      ]
    }
  ];

  const toggleYearly = () => {
    setIsYearly(!isYearly);
  };

  return (
    <section id="pricing" className="relative py-6 sm:py-8 md:py-12 lg:py-24 px-3 sm:px-4 lg:px-8">
      <div className="w-full mx-auto">
        <div className="text-center mb-6 sm:mb-8 md:mb-12 lg:mb-16">
          <p className={`${typography.caption} text-blue-600 mb-2 sm:mb-3 md:mb-4`}>PRICING</p>
          <h2 className={`${typography.h2} text-gray-900 mb-2 sm:mb-3 md:mb-4`}>가격 정책</h2>
          <p className={`${typography.body} text-gray-600 mb-4 sm:mb-6 md:mb-8 px-2`}>
            Flexible plans and solutions for business of all sizes
          </p>
          
          <div className="flex items-center justify-center gap-2 sm:gap-3 md:gap-4 mb-6 sm:mb-8 md:mb-12">
            <span className={`text-xs sm:text-sm md:text-base font-medium cursor-pointer ${!isYearly ? 'text-blue-600' : 'text-gray-500'}`}>
              Monthly
            </span>
            <button
              onClick={toggleYearly}
              className="relative w-8 h-4 sm:w-10 sm:h-5 md:w-12 md:h-6 bg-[#CBDCFB] rounded-full"
            >
              <div className={`w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 bg-[#3D6FEA] rounded-full ${isYearly ? 'translate-x-4 sm:translate-x-5 md:translate-x-6' : 'translate-x-0.5'}`}></div>
            </button>
            <span className={`text-xs sm:text-sm md:text-base font-medium cursor-pointer ${isYearly ? 'text-blue-600' : 'text-gray-500'}`}>
              Yearly
            </span>
            <div className="bg-[#36AAF3] text-white px-1.5 sm:px-2 md:px-3 py-0.5 sm:py-1 rounded-full text-xs sm:text-xs md:text-sm font-medium">
              Save 20%
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 lg:gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div key={index} className="group bg-white rounded-lg sm:rounded-xl md:rounded-2xl p-3 sm:p-4 md:p-6 lg:p-8 shadow-lg border border-gray-200 hover:shadow-2xl hover:-translate-y-2 hover:border-blue-300 cursor-pointer">
              
              <div className="text-center mb-4 sm:mb-6 md:mb-8">
                <h3 className={`${typography.h3} text-gray-900 mb-1 sm:mb-2 group-hover:text-blue-600`}>{plan.name}</h3>
                <p className="text-gray-500 text-xs sm:text-xs md:text-sm mb-4 sm:mb-6 md:mb-16 group-hover:text-gray-600 px-1">{plan.description}</p>
                
                <div className="mb-1 sm:mb-2">
                  <span className={`${typography.price} text-blue-600 group-hover:text-blue-700`}>${plan.price}</span>
                </div>
                <div className="mb-4 sm:mb-6 md:mb-8">
                  <span className="text-blue-600 text-xs sm:text-sm md:text-base lg:text-lg group-hover:text-blue-700">/user per month</span>
                </div>
                
                <button className="w-full py-2 sm:py-2.5 md:py-3 mb-4 sm:mb-6 md:mb-8 px-3 sm:px-4 md:px-6 rounded-full font-medium bg-gray-900 text-white hover:bg-blue-600 group-hover:bg-blue-600 text-xs sm:text-sm md:text-base">
                  {plan.name === 'Enterprise' ? 'Contact us' : 'Get started'}
                </button>
              </div>
              
              <div>
                <h4 className="font-semibold text-sm sm:text-base md:text-lg lg:text-xl text-gray-900 mb-2 sm:mb-3 md:mb-4 group-hover:text-blue-600">Free includes</h4>
                <ul className="space-y-1.5 sm:space-y-2 md:space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start text-gray-600 group-hover:text-gray-700">
                      {feature.included ? (
                        <svg className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-green-500 mr-1.5 sm:mr-2 md:mr-3 mt-0.5 group-hover:text-green-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <svg className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-gray-300 mr-1.5 sm:mr-2 md:mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      )}
                      <span className={`text-xs sm:text-sm md:text-base ${feature.included ? 'text-gray-600 group-hover:text-gray-700' : 'text-gray-400'}`}>
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default PricingSection;