"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { useNavbar } from '@/hooks/useNavbar';
import { blogData, BlogPost, BlogDetail, BlogDetailSection } from '@/types/blog';

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

const blogDetailData: { [key: string]: BlogDetail } = {
  '2025-seo-future': {
    title: "2025년 SEO의 미래: AI가 주도하는 검색 최적화의 대전환",
    excerpt: "기존의 검색엔진을 위한 콘텐츠만으로는 부족합니다. ChatGPT, Perplexity, Gemini와 같은 AI 플랫폼을 위한 새로운 표준인 'GEO(Generative Engine Optimization)'가 등장했습니다.",
    author: "정하늘",
    date: "2025년 7월 12일",
    category: "뉴스",
    image: "/detail-blog-placeholder.png",
    heroImage: "/detail-blog-placeholder.png",
    content: {
      sections: [
        {
          type: "hero",
          title: "2025년 SEO의 미래: AI가 주도하는 검색 최적화의 대전환",
          subtitle: "기존의 검색엔진을 위한 콘텐츠만으로는 부족합니다. ChatGPT, Perplexity, Gemini와 같은 AI 플랫폼을 위한 새로운 표준인 'GEO(Generative Engine Optimization)'가 등장했습니다.",
          metadata: {
            category: "뉴스",
            author: "정하늘",
            date: "2025년 7월 12일"
          }
        },
        {
          type: "image",
          image: "/detail-blog-placeholder.png",
          overlayText: "GEO vs SEO",
          subtitle: "Power up your AI search engine marketing",
          watermark: "enginecy.com"
        },
        {
          type: "text",
          content: "기존의 검색엔진을 위한 콘텐츠만으로는 부족합니다. ChatGPT, Perplexity, Gemini와 같은 AI 플랫폼을 위한 새로운 표준인 'GEO(Generative Engine Optimization)'가 등장했습니다."
        },
        {
          type: "heading",
          title: "SEO에서 GEO로: 새로운 최적화 방식의 등장"
        },
        {
          type: "text",
          content: "SEO는 키워드 중심이었지만, 생성형 AI는 직접적인 답변을 제공합니다. GEO는 AI가 인용할 수 있도록 콘텐츠를 최적화하는 방식입니다."
        },
        {
          type: "heading",
          title: "GEO란 무엇인가?"
        },
        {
          type: "comparison",
          image: "/content-blog-placeholder.png",
          cards: [
            {
              title: "GEO - Generative Engine Optimization",
              icon: "🧠",
              description: "ChatGPT, Bing Copilot, Google Gemini와 같은 AI 도구를 위한 콘텐츠 최적화",
              color: "blue"
            },
            {
              title: "SEO - Search Engine Optimization", 
              icon: "🌐",
              description: "Google, Bing과 같은 전통적인 검색엔진을 위한 웹사이트 최적화",
              color: "green"
            }
          ],
          note: "SEO와 GEO는 접근 방식이 다릅니다 - 알고리즘 최적화 vs 언어 이해 최적화"
        },
        {
          type: "text",
          content: "GEO는 AI가 콘텐츠를 참조할 수 있도록 하는 전략입니다. 자연스러운 언어 최적화, 전문성, 신뢰성, 명확한 구조가 핵심입니다."
        },
        {
          type: "heading",
          title: "2025년을 위한 콘텐츠 전략"
        },
        {
          type: "text",
          content: "AI는 키워드보다 의도를 이해합니다. 사용자의 질문에 직접 답변하는 콘텐츠, GEO 친화적인 콘텐츠가 필요합니다."
        },
        {
          type: "heading",
          title: "결론: SEO의 진화는 계속된다"
        },
        {
          type: "text",
          content: "SEO는 GEO와 같은 새로운 형태로 진화하고 있습니다. 클릭이 아닌 AI 응답을 위한 콘텐츠가 필요합니다.",
          highlight: "2025년, 검색은 클릭이 아니라 '응답'으로 이뤄집니다."
        }
      ]
    }
  }
};

function BlogCard({ post }: { post: BlogPost }) {
  return (
    <article className="bg-transparent rounded-xl overflow-hidden transition-all duration-300 group">
      <Link href={`/blog/${post.slug}`}>
        <div className="relative">
          <Image
            src={post.image}
            alt={post.title}
            width={300}
            height={240}
            className="w-full h-44 sm:h-64 object-cover group-hover:scale-105 transition-transform duration-300 rounded-xl"
          />
        </div>
        
        <div className="py-3 sm:py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs text-gray-500 mb-2 gap-1">
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary-blue-200 text-primary-blue-500 w-fit">
              {post.category === 'news' ? '뉴스' : 
               post.category === 'tip' ? '팁' : 
               post.category === 'interview' ? '인터뷰' : '제품 업데이트'}
            </span>
            <div className="flex items-center">
              <span>{post.author}</span>
              <span className="mx-2">•</span>
              <span>{post.date}</span>
            </div>
          </div>
          
          <h3 className="font-semibold text-gray-900 mb-2 text-base line-clamp-2 group-hover:text-primary-blue-600 transition-colors">
            {post.title}
          </h3>
          
          <p className="text-gray-600 text-sm line-clamp-2 mb-3">
            {post.excerpt}
          </p>
          
          <div className="flex items-center text-primary-blue-600 font-medium text-xs hover:text-primary-blue-700 transition-colors cursor-pointer">
            <span>자세히 보기</span>
            <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </Link>
    </article>
  );
}

export default function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { handleLoginClick, handleDashboardClick } = useNavbar();
  
  const resolvedParams = React.use(params);
  const blogDetail = blogDetailData[resolvedParams.slug];
  
  if (!blogDetail) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        <Navbar onLoginClick={handleLoginClick} onDashboardClick={handleDashboardClick} />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">블로그를 찾을 수 없습니다</h1>
            <Link href="/blog" className="text-primary-blue-600 hover:text-primary-blue-700">
              블로그 목록으로 돌아가기
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Get recommendations (exclude current post)
  const recommendations = blogData.filter(post => post.slug !== resolvedParams.slug).slice(0, 3);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Navbar onLoginClick={handleLoginClick} onDashboardClick={handleDashboardClick} />
      
      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary-blue-200 text-primary-blue-500 mb-4 inline-block">
              {blogDetail.category}
            </span>
            <h1 className={`${typography.h1} text-gray-900 mb-6 leading-tight`}>
              {blogDetail.title}
            </h1>
            <p className={`${typography.subtitle} text-gray-600 mb-6 max-w-3xl mx-auto`}>
              {blogDetail.excerpt}
            </p>
            <div className="flex items-center justify-center text-sm text-gray-500">
              <div className="flex items-center">
                <Image
                  src="/avatar-placeholder.png"
                  alt={`${blogDetail.author} avatar`}
                  width={24}
                  height={24}
                  className="rounded-full mr-2"
                />
                <span className="font-medium">{blogDetail.author}</span>
              </div>
              <span className="mx-2">•</span>
              <span>{blogDetail.date}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="relative px-4 sm:px-6 lg:px-8 pb-16 md:pb-20 lg:pb-24">
        <div className="max-w-7xl mx-auto">
          {blogDetail.content.sections.map((section: BlogDetailSection, index: number) => (
            <div key={index} className="mb-8">
              {section.type === 'image' && (
                <div className="relative mb-8 flex justify-center">
                  <div className="relative rounded-2xl overflow-hidden w-full max-w-7xl">
                    <Image
                      src={section.image}
                      alt="Blog hero image"
                      width={1920}
                      height={1080}
                      className="w-full h-[40vw] max-h-[1080px] object-cover object-bottom"
                    />
                    {/* <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex flex-col justify-end p-6 sm:p-8">
                      <h2 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold mb-2">
                        {section.overlayText}
                      </h2>
                      <p className="text-white/90 text-sm sm:text-base">
                        {section.subtitle}
                      </p>
                    </div>
                    {section.watermark && (
                      <div className="absolute bottom-4 right-4 text-white/70 text-xs">
                        {section.watermark}
                      </div>
                    )} */}
                  </div>
                </div>
              )}

              {section.type === 'text' && (
                <div className="prose prose-lg max-w-4xl mx-auto">
                  <p className={`${typography.body} text-gray-700 leading-relaxed mb-6`}>
                    {section.content}
                  </p>
                  {section.highlight && (
                    <blockquote className="border-l-4 border-primary-blue-500 pl-6 my-6">
                      <p className={`${typography.title2} text-gray-900 font-semibold`}>
                        {section.highlight}
                      </p>
                    </blockquote>
                  )}
                </div>
              )}

              {section.type === 'heading' && (
                <h2 className={`${typography.h2} text-gray-900 mb-6 max-w-4xl mx-auto`}>
                  {section.title}
                </h2>
              )}

              {section.type === 'comparison' && (
                // <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 max-w-4xl mx-auto">
                <div className="mb-8 max-w-4xl mx-auto">
                  <Image
                    src={section.image}
                    alt="Blog hero image"
                    width={1920}
                    height={1080}
                    className="w-full mx-auto object-cover object-bottom rounded-2xl" 
                  />
                  {/* {section.cards.map((card: any, cardIndex: number) => (
                    <div key={cardIndex} className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
                      <div className="flex items-center mb-4">
                        <span className="text-3xl mr-3">{card.icon}</span>
                        <h3 className={`${typography.h4} text-gray-900`}>
                          {card.title}
                        </h3>
                      </div>
                      <p className={`${typography.body} text-gray-600`}>
                        {card.description}
                      </p>
                    </div>
                  ))} */}
                </div>
              )}

              {section.type === 'comparison' && section.note && (
                <p className={`${typography.body} text-gray-500 italic text-center mb-6 max-w-4xl mx-auto`}>
                  {section.note}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Recommendations Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 pb-16 md:pb-20 lg:pb-24 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className={`${typography.h2} text-gray-900 mb-4`}>
              더 읽어보기
            </h2>
            <p className={`${typography.subtitle} text-gray-600 max-w-2xl mx-auto`}>
              관련된 다른 블로그 포스트도 확인해보세요
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {recommendations.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
} 