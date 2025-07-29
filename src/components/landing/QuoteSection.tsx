"use client";

import React, { memo } from 'react';

const typography = {
  h2: "font-manrope font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl leading-tight",
} as const;

export const QuoteSection = memo(function QuoteSection() {
  return (
    <section id="quote" className="relative py-12 md:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5/6 mx-auto">
        <div className="text-right mb-12 md:mb-24">
          <div className="max-w-4xl ml-auto">
            <h2 className={`${typography.h2} text-gray-800 text-right mb-6`}>
              &ldquo;2028년, 기존 검색 트래픽의 50%가 생성형 AI 검색으로 대체됩니다.&rdquo;
            </h2>
            <p className="text-gray-500 text-right text-lg md:text-xl font-medium">
              —Gartner
            </p>
          </div>
        </div>
        
        <div className="text-left">
          <p className={`${typography.h2} text-gray-500 mb-2`}>
            제로 클릭 시대,
          </p>
          <p className={`${typography.h2} bg-gradient-to-r from-blue-600 via-blue-400 to-blue-600 bg-clip-text text-transparent`}>
            여러분의 브랜드는 준비되었나요?
          </p>
        </div>
      </div>
    </section>
  );
});

export default QuoteSection;