'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface BlogSectionProps {
  className?: string;
}

export default function BlogSection({ className }: BlogSectionProps) {
  const blogPosts = [
    {
      id: 1,
      title: "AI 검색 최적화의 미래: 2024년 트렌드 분석",
      excerpt: "인공지능 기반 검색엔진들이 콘텐츠를 평가하는 새로운 방식과 이에 대응하는 최적화 전략을 살펴봅니다.",
      author: "김진수",
      role: "AI SEO 전문가",
      date: "2024년 3월 15일",
      readTime: "5분 읽기",
      image: "/blog-placeholder.png",
      category: "AI 최적화"
    },
    {
      id: 2,
      title: "GEO vs SEO: 지역 기반 검색의 새로운 패러다임",
      excerpt: "전통적인 SEO를 넘어서 지역 기반 검색 최적화(GEO)가 비즈니스에 미치는 영향과 실전 적용 방법을 알아봅니다.",
      author: "이영희",
      role: "GEO 마케팅 전략가",
      date: "2024년 3월 12일",
      readTime: "7분 읽기",
      image: "/blog-placeholder.png",
      category: "GEO 마케팅"
    },
    {
      id: 3,
      title: "Perplexity AI 최적화 가이드: 실전 전략",
      excerpt: "Perplexity AI에서 높은 순위를 얻기 위한 구체적인 콘텐츠 작성 방법과 최적화 팁을 단계별로 설명합니다.",
      author: "박민준",
      role: "콘텐츠 최적화 전문가",
      date: "2024년 3월 10일",
      readTime: "6분 읽기",
      image: "/blog-placeholder.png",
      category: "실전 가이드"
    }
  ];

  return (
    <section className={`bg-gray-50 py-12 sm:py-16 lg:py-24 ${className}`}>
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="text-[14px] sm:text-[16px] text-blue-600 font-semibold mb-3 sm:mb-4">
            인사이트 & 가이드
          </div>
          <h2 className="text-[24px] sm:text-[32px] lg:text-[36px] font-semibold text-[#181d27] tracking-[-0.48px] sm:tracking-[-0.72px] mb-4 sm:mb-6">
            AI 검색 최적화 인사이트
          </h2>
          <p className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#535862] max-w-[600px] mx-auto leading-[24px] sm:leading-[26px] lg:leading-[30px]">
            전문가들이 공유하는 최신 AI 검색 트렌드와 실전 노하우를 확인하세요
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {blogPosts.map((post) => (
            <article 
              key={post.id}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden group cursor-pointer"
            >
              {/* Image */}
              <div className="relative h-[200px] sm:h-[220px] lg:h-[240px] overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 sm:top-4 left-3 sm:left-4">
                  <span className="bg-blue-600 text-white text-[12px] sm:text-[14px] font-semibold px-2 sm:px-3 py-1 rounded-full">
                    {post.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-4 sm:p-6">
                {/* Title */}
                <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] font-semibold text-[#181d27] leading-[22px] sm:leading-[24px] lg:leading-[28px] mb-3 sm:mb-4 group-hover:text-blue-600 transition-colors line-clamp-2">
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p className="text-[14px] sm:text-[16px] text-[#535862] leading-[20px] sm:leading-[24px] mb-4 sm:mb-6 line-clamp-3">
                  {post.excerpt}
                </p>

                {/* Meta Info */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-200 rounded-full flex items-center justify-center">
                      <span className="text-[12px] sm:text-[14px] font-semibold text-gray-600">
                        {post.author.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <div className="text-[12px] sm:text-[14px] font-semibold text-[#181d27]">
                        {post.author}
                      </div>
                      <div className="text-[11px] sm:text-[12px] text-[#535862]">
                        {post.role}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[11px] sm:text-[12px] text-[#535862]">
                      {post.date}
                    </div>
                    <div className="text-[11px] sm:text-[12px] text-blue-600 font-medium">
                      {post.readTime}
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12 sm:mt-16">
          <Link 
            href="/blog"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-[16px] sm:text-[18px] font-semibold transition-colors"
          >
            모든 게시글 보기
            <svg className="w-4 sm:w-5 h-4 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
