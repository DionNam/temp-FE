"use client";

import React from 'react';

const typography = {
  caption: "font-manrope font-medium text-xs sm:text-sm uppercase tracking-wider",
  body: "font-manrope font-normal text-sm sm:text-base leading-relaxed",
  h2: "font-manrope font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl leading-tight",
  subtitle: "font-manrope font-normal text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl leading-relaxed",
} as const;

interface FAQSectionProps {
  expandedFaq: number[];
  setExpandedFaq: (expandedFaq: number[]) => void;
}

export function FAQSection({ expandedFaq, setExpandedFaq }: FAQSectionProps) {
  const faqs = [
    {
      question: "Dropdown Closed",
      answer: ""
    },
    {
      question: "GEO는 정확히 무엇인가요? SEO와는 어떻게 다른가요?",
      answer: "GEO(Generative Engine Optimization) ChatGPT, Gemini, Perplexity와 같은 생성형 AI 응답 시스템에서 브랜드가 인용되도록 최적화하는 전략입니다. SEO(Search Engine Optimization)는 웹사이트가 검색 결과에 잘 노출되도록 하는 것이라면, GEO는 \"AI가 답변할 때, 내 브랜드를 선택하게 만드는 것\"을 목표로 합니다."
    },
    {
      question: "GEO가 왜 중요한가요?",
      answer: "2028년까지 전체 검색 트래픽의 50% 이상이 제로 클릭으로 전환될 것으로 예상됩니다. 즉, 사용자는 더 이상 클릭하지 않고, 생성형 AI가 주는 하나의 답변만 소비합니다. 이때 내 브랜드가 그 답변 안에 들어가지 못한다면, 노출 기회 자체가 사라집니다."
    },
    {
      question: "GEO 최적화는 어떻게 진행되나요?",
      answer: "• 브랜드 GEO 진단 리포트 제공\n• 기술적 최적화 + 키워드 분석 + 콘텐츠 주제 추천\n• 생성형 AI에 반영되는지 추적 및 개선 반복\n\n단순한 SEO를 넘어, 실제로 AI가 인용하는 콘텐츠를 설계하고 추적합니다."
    },
    {
      question: "SEO도 함께 최적화해주시나요?",
      answer: "네, ShowOnAI는 GEO뿐만 아니라 SEO도 함께 최적화해드립니다. 생성형 AI가 콘텐츠를 학습하고 답변에 인용하려면, 웹 상에 검색엔진에 잘 구조화된 콘텐츠(SEO)가 먼저 필요합니다. 구글과 네이버 모두를 고려한 기본 SEO 세팅부터 콘텐츠 제작 및 배포까지 GEO 전략과 유기적으로 연결해 드립니다."
    },
    {
      question: "어떻게 한국 시장에 최적화되어 있나요?",
      answer: "ShowOnAI는 한국의 독특한 검색 환경과 콘텐츠 소비 흐름에 맞춰 GEO 전략을 설계합니다. 구글뿐 아니라 네이버 키워드 데이터를 함께 분석하고, ChatGPT나 Gemini와 같은 글로벌 생성형 AI는 물론, WRTN과 같은 한국형 생성형 AI 검색 플랫폼까지 최적화 범위에 포함합니다."
    }
  ];

  const toggleFaq = (index: number) => {
    if (index === 0) {
      toggleAllFaqs();
    } else {
      if (expandedFaq.includes(index)) {
        setExpandedFaq(expandedFaq.filter(id => id !== index));
      } else {
        setExpandedFaq([...expandedFaq, index]);
      }
    }
  };

  const toggleAllFaqs = () => {
    const allIndexes = faqs.map((_, i) => i).slice(1);
    const areAllOpen = allIndexes.every(index => expandedFaq.includes(index));

    if (areAllOpen) {
      setExpandedFaq([]);
    } else {
      setExpandedFaq([0, ...allIndexes]);
    }
  };

  return (
    <section className="relative py-6 sm:py-8 md:py-12 lg:py-24 px-3 sm:px-4 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-6 sm:mb-8 md:mb-12 lg:mb-16">
          <p className={`${typography.caption} text-blue-600 mb-2 sm:mb-3 md:mb-4`}>
            FREQUENTLY ASKED QUESTIONS
          </p>
          <h2 className={`${typography.h2} text-gray-900 mb-2 sm:mb-3 md:mb-4`}>
            자주 묻는 질문
          </h2>
          <p className={`${typography.body} leading-relaxed text-gray-600 px-2`}>
            Contact us if you have any other questions.
          </p>
        </div>
        
        <div className="bg-white rounded-lg sm:rounded-xl border border-gray-200 overflow-hidden shadow-sm">
          {faqs.map((faq, index) => (
            <div key={index} className={index < faqs.length - 1 ? 'border-b border-gray-200' : ''}>
              <button 
                className="w-full px-3 sm:px-4 md:px-6 py-3 sm:py-4 md:py-5 flex items-center justify-between text-left hover:bg-gray-50 focus:outline-none focus:bg-gray-50 active:bg-gray-100"
                onClick={() => toggleFaq(index)}
              >
                <h3 className="text-neutral-950 font-semibold text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl pr-2 sm:pr-3 md:pr-4 leading-snug sm:leading-normal">
                  {faq.question}
                </h3>
                
                <span className="text-neutral-700 text-lg sm:text-xl md:text-2xl font-light flex-shrink-0 bg-blue-50 rounded-md px-1.5 sm:px-2 py-0.5 min-w-[32px] sm:min-w-[36px] md:min-w-[40px] flex items-center justify-center">
                  {index === 0
                    ? faqs.length - 1 === expandedFaq.length - 1 ? '−' : '+'
                    : expandedFaq.includes(index) ? '−' : '+'}
                </span>
              </button>
              
              {expandedFaq.includes(index) && faq.answer && (
                <div className="px-3 sm:px-4 md:px-6 pb-3 sm:pb-4 md:pb-6 border-t border-gray-100">
                  <div className="text-gray-600 leading-relaxed pt-2 sm:pt-3 md:pt-4 whitespace-pre-line text-xs sm:text-sm md:text-base">
                    {faq.answer}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FAQSection;