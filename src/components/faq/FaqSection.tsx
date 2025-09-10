'use client';

import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const imgIcon = "http://localhost:3845/assets/1aa6cedb5f3bf851c5800c3a311d795dc9cce157.svg";
const imgIcon1 = "http://localhost:3845/assets/425898491650a6a3f2f1a6727e763a82a24cf9e3.svg";

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "What sets GEO apart from traditional SEO?",
    answer: "GEO focuses on geographical relevance, optimizing content for local searches, while SEO targets broader search engine visibility."
  },
  {
    question: "What factors does Perplexity consider for content visibility?",
    answer: "Perplexity evaluates content based on relevance, engagement metrics, and user feedback to determine its visibility."
  },
  {
    question: "How is your data gathered and analyzed?",
    answer: "We collect data through user interactions and feedback, analyzing it to improve our services and content delivery."
  },
  {
    question: "How can I update my account email?",
    answer: "You can update your account email through the account settings page in your dashboard."
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
    <section className={`bg-white py-24 ${className}`}>
      <div className="max-w-[1280px] mx-auto px-8">
        {/* Header */}
        <div className="flex flex-col gap-8 items-center mb-16">
          <div className="flex flex-col gap-5 items-center text-center max-w-[768px]">
            <div className="text-[#181d27] text-[36px] tracking-[-0.72px] font-semibold">
              <p className="leading-[44px]">Frequently Asked Questions and Insights</p>
            </div>
            <div className="text-[#535862] text-[20px] font-normal">
              <p className="leading-[30px]">Detailed insights into our platform.</p>
            </div>
          </div>
        </div>

        {/* FAQ Items */}
        <div className="max-w-[768px] mx-auto">
          <div className="flex flex-col gap-8">
            {faqData.map((item, index) => (
              <div key={index} className="w-full">
                <button
                  onClick={() => toggleItem(index)}
                  className={`w-full text-left ${index > 0 ? 'pt-6 border-t border-[#e9eaeb]' : ''}`}
                >
                  <div className="flex gap-4 items-start justify-between w-full">
                    <div className="flex-1 flex flex-col gap-1">
                      <div className="text-[#181d27] text-[16px] font-semibold">
                        <p className="leading-[24px]">{item.question}</p>
                      </div>
                      {openItems.includes(index) && (
                        <div className="text-[#535862] text-[16px] font-normal">
                          <p className="leading-[24px]">{item.answer}</p>
                        </div>
                      )}
                    </div>
                    <div className="flex-shrink-0">
                      <div className="w-6 h-6">
                        {openItems.includes(index) ? (
                          <Minus className="w-6 h-6 text-gray-600" />
                        ) : (
                          <Plus className="w-6 h-6 text-gray-600" />
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
