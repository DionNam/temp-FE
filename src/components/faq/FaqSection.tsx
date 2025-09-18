'use client';

import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "Do I really need an AI Gap Audit if I already do SEO?",
    answer: "Yes. Traditional SEO tells you how you rank on Google. AI Gap Audit shows whether your content is actually being cited in ChatGPT, Gemini, and Perplexity — a completely different visibility layer."
  },
  {
    question: "How is GEO Factor Lab useful for me?",
    answer: "Instead of giving you generic best practices, it pinpoints the GEO factors that matter most in your industry and for your type of content. No more guessing, just data-backed priorities."
  },
  {
    question: "Is this only for agencies or can individuals use it too?",
    answer: "Both. Agencies use it to deliver AI-SEO results for clients, while individual founders, marketers, and content creators use it to amplify their own visibility."
  },
  {
    question: "Do I need technical expertise to use the platform?",
    answer: "Not at all. The platform provides clear, actionable recommendations — you don't need to be a data scientist to apply them."
  },
  {
    question: "What kind of results can I expect?",
    answer: "Most users discover why their content isn't appearing in AI engines, then apply targeted optimizations that lead to 3–5× higher AI visibility within weeks."
  }
];

interface FaqSectionProps {
  className?: string;
}

export default function FaqSection({ className }: FaqSectionProps) {
  const [openItems, setOpenItems] = useState<number[]>([0]); // First item open by default

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <section className={`bg-white py-16 sm:py-20 lg:py-28 ${className}`}>
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col gap-6 sm:gap-8 items-center mb-12 sm:mb-16">
          <div className="flex flex-col gap-4 sm:gap-5 items-center text-center max-w-[768px]">
            <div className="text-[#181d27] text-[24px] sm:text-[32px] lg:text-[36px] tracking-[-0.48px] sm:tracking-[-0.72px] font-semibold">
              <p className="leading-[30px] sm:leading-[38px] lg:leading-[44px]">Frequently Asked Questions and Insights</p>
            </div>
            <div className="text-[#535862] text-[16px] sm:text-[18px] lg:text-[20px] font-normal">
              <p className="leading-[24px] sm:leading-[26px] lg:leading-[30px]">Detailed insights into our platform.</p>
            </div>
          </div>
        </div>

        {/* FAQ Items */}
        <div className="max-w-[768px] mx-auto">
          <div className="flex flex-col gap-6 sm:gap-8">
            {faqData.map((item, index) => (
              <div key={index} className="w-full">
                <button
                  onClick={() => toggleItem(index)}
                  className={`w-full text-left ${index > 0 ? 'pt-4 sm:pt-6 border-t border-[#e9eaeb]' : ''}`}
                >
                  <div className="flex gap-3 sm:gap-4 items-start justify-between w-full">
                    <div className="flex-1 flex flex-col gap-1">
                      <div className="text-[#181d27] text-[14px] sm:text-[16px] font-semibold">
                        <p className="leading-[20px] sm:leading-[24px]">{item.question}</p>
                      </div>
                      {openItems.includes(index) && (
                        <div className="text-[#535862] text-[14px] sm:text-[16px] font-normal">
                          <p className="leading-[20px] sm:leading-[24px]">{item.answer}</p>
                        </div>
                      )}
                    </div>
                    <div className="flex-shrink-0">
                      <div className="w-5 sm:w-6 h-5 sm:h-6">
                        {openItems.includes(index) ? (
                          <Minus className="w-5 sm:w-6 h-5 sm:h-6 text-gray-600" />
                        ) : (
                          <Plus className="w-5 sm:w-6 h-5 sm:h-6 text-gray-600" />
                        )}
                      </div>
                    </div>
                  </div>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
