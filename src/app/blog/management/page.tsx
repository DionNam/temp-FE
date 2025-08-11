"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { Footer } from '@/components/layout/Footer';
import { BlogPost } from '@/types/blog';
import Link from 'next/link';

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

// Extended blog data with status
const managementBlogData: (BlogPost & { status: 'published' | 'draft' })[] = [
  {
    id: '1',
    title: '2025년 SEO의 미래: AI가 주도하는 검색 최적화의 대전환',
    excerpt: '기존의 검색엔진을 위한 콘텐츠만으로는 부족합니다. ChatGPT, Perplexity, Gemini와 같은 AI 플랫폼을 위한 새로운 표준인 \'GEO(Generative Engine Optimization)\'가 등장했습니다.',
    author: '정하늘',
    date: '2025년 7월 12일',
    category: 'news',
    image: '/blog-placeholder.png',
    slug: '2025-seo-future',
    status: 'published'
  },
  {
    id: '2',
    title: 'AI 기반 SEO 분석 도구의 혁신',
    excerpt: '인공지능 기술을 활용한 새로운 SEO 분석 방법론과 도구들에 대해 알아봅니다.',
    author: '정하늘',
    date: '2025년 7월 10일',
    category: 'tip',
    image: '/blog-placeholder.png',
    slug: 'ai-seo-analysis',
    status: 'published'
  },
  {
    id: '3',
    title: '로컬 SEO 최적화 전략 가이드',
    excerpt: '지역 기반 비즈니스를 위한 효과적인 로컬 SEO 전략과 최적화 방법을 소개합니다.',
    author: '정하늘',
    date: '2025년 7월 8일',
    category: 'tip',
    image: '/blog-placeholder.png',
    slug: 'local-seo-guide',
    status: 'draft'
  },
  {
    id: '4',
    title: '검색엔진 알고리즘 업데이트 분석',
    excerpt: '최신 검색엔진 알고리즘 변경사항과 이에 대응하는 SEO 전략을 분석합니다.',
    author: '정하늘',
    date: '2025년 7월 6일',
    category: 'news',
    image: '/blog-placeholder.png',
    slug: 'algorithm-update-analysis',
    status: 'published'
  },
  {
    id: '5',
    title: '콘텐츠 마케팅과 SEO의 시너지',
    excerpt: '고품질 콘텐츠 제작과 SEO 최적화를 결합한 효과적인 디지털 마케팅 전략을 알아봅니다.',
    author: '정하늘',
    date: '2025년 7월 4일',
    category: 'interview',
    image: '/blog-placeholder.png',
    slug: 'content-marketing-seo',
    status: 'draft'
  },
  {
    id: '6',
    title: '모바일 SEO 최적화 완벽 가이드',
    excerpt: '모바일 사용자 경험을 고려한 SEO 최적화 방법과 모바일 친화적 웹사이트 구축 전략을 소개합니다.',
    author: '정하늘',
    date: '2025년 7월 2일',
    category: 'tip',
    image: '/blog-placeholder.png',
    slug: 'mobile-seo-guide',
    status: 'published'
  }
];

const categories = {
  'news': '뉴스',
  'tip': '팁',
  'interview': '인터뷰',
  'product-update': '제품 업데이트'
};

function BlogManagementCard({ post }: { post: BlogPost & { status: 'published' | 'draft' } }) {
  return (
    <article className="bg-transparent rounded-xl p-6">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary-blue-200 text-primary-blue-500">
            {categories[post.category as keyof typeof categories]}
          </span>
          <span className="text-sm text-gray-500">{post.date}</span>
        </div>
        <div className="flex items-center gap-2">
          <Image
            src="/avatar-placeholder.png"
            alt={`${post.author} avatar`}
            width={32}
            height={32}
            className="rounded-full"
          />
          <span className="text-sm font-medium text-gray-700">{post.author}</span>
        </div>
      </div>
      
      <h3 className="font-bold text-gray-900 mb-3 text-lg leading-tight">
        {post.title}
      </h3>
      
      <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
        {post.excerpt}
      </p>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button className="p-2 text-primary-blue-500 hover:bg-primary-blue-50 rounded-lg transition-colors">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path opacity="0.4" d="M21 22H3C2.59 22 2.25 21.66 2.25 21.25C2.25 20.84 2.59 20.5 3 20.5H21C21.41 20.5 21.75 20.84 21.75 21.25C21.75 21.66 21.41 22 21 22Z" fill="#3D6FEA"/>
            <path opacity="0.4" d="M19.0206 3.47967C17.0806 1.53967 15.1806 1.48967 13.1906 3.47967L11.9806 4.68967C11.8806 4.78967 11.8406 4.94967 11.8806 5.08967C12.6406 7.73967 14.7606 9.85967 17.4106 10.6197C17.4506 10.6297 17.4906 10.6397 17.5306 10.6397C17.6406 10.6397 17.7406 10.5997 17.8206 10.5197L19.0206 9.30967C20.0106 8.32967 20.4906 7.37967 20.4906 6.41967C20.5006 5.42967 20.0206 4.46967 19.0206 3.47967Z" fill="#3D6FEA"/>
            <path d="M15.6103 11.5298C15.3203 11.3898 15.0403 11.2498 14.7703 11.0898C14.5503 10.9598 14.3403 10.8198 14.1303 10.6698C13.9603 10.5598 13.7603 10.3998 13.5703 10.2398C13.5503 10.2298 13.4803 10.1698 13.4003 10.0898C13.0703 9.8098 12.7003 9.4498 12.3703 9.0498C12.3403 9.0298 12.2903 8.9598 12.2203 8.8698C12.1203 8.7498 11.9503 8.5498 11.8003 8.3198C11.6803 8.1698 11.5403 7.9498 11.4103 7.7298C11.2503 7.4598 11.1103 7.1898 10.9703 6.9098C10.8303 6.6098 10.7203 6.3198 10.6203 6.0498L4.34032 12.3298C4.21032 12.4598 4.09032 12.7098 4.06032 12.8798L3.52032 16.7098C3.42032 17.3898 3.61032 18.0298 4.03032 18.4598C4.39032 18.8098 4.89032 18.9998 5.43032 18.9998C5.55032 18.9998 5.67032 18.9898 5.79032 18.9698L9.63032 18.4298C9.81032 18.3998 10.0603 18.2798 10.1803 18.1498L16.4603 11.8698C16.1803 11.7698 15.9103 11.6598 15.6103 11.5298Z" fill="#3D6FEA"/>
          </svg>
          </button>
          <button className="p-2 text-primary-blue-500 hover:bg-primary-blue-50 rounded-lg transition-colors">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path opacity="0.4" d="M16.8 9H7.2C4 9 2 11 2 14.2V16.79C2 20 4 22 7.2 22H16.79C19.99 22 21.99 20 21.99 16.8V14.2C22 11 20 9 16.8 9Z" fill="#1294EC"/>
            <path d="M15.8801 5.56994L12.5301 2.21994C12.2401 1.92994 11.7601 1.92994 11.4701 2.21994L8.12009 5.56994C7.83009 5.85994 7.83009 6.33994 8.12009 6.62994C8.41009 6.91994 8.89009 6.91994 9.18009 6.62994L11.2501 4.55994V15.2499C11.2501 15.6599 11.5901 15.9999 12.0001 15.9999C12.4101 15.9999 12.7501 15.6599 12.7501 15.2499V4.55994L14.8201 6.62994C14.9701 6.77994 15.1601 6.84994 15.3501 6.84994C15.5401 6.84994 15.7301 6.77994 15.8801 6.62994C16.1801 6.33994 16.1801 5.86994 15.8801 5.56994Z" fill="#1294EC"/>
          </svg>
          </button>
          <button className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21.0697 5.23C19.4597 5.07 17.8497 4.95 16.2297 4.86V4.85L16.0097 3.55C15.8597 2.63 15.6397 1.25 13.2997 1.25H10.6797C8.34967 1.25 8.12967 2.57 7.96967 3.54L7.75967 4.82C6.82967 4.88 5.89967 4.94 4.96967 5.03L2.92967 5.23C2.50967 5.27 2.20967 5.64 2.24967 6.05C2.28967 6.46 2.64967 6.76 3.06967 6.72L5.10967 6.52C10.3497 6 15.6297 6.2 20.9297 6.73C20.9597 6.73 20.9797 6.73 21.0097 6.73C21.3897 6.73 21.7197 6.44 21.7597 6.05C21.7897 5.64 21.4897 5.27 21.0697 5.23Z" fill="#DB2739"/>
              <path opacity="0.3991" d="M19.2297 8.14C18.9897 7.89 18.6597 7.75 18.3197 7.75H5.67975C5.33975 7.75 4.99975 7.89 4.76975 8.14C4.53975 8.39 4.40975 8.73 4.42975 9.08L5.04975 19.34C5.15975 20.86 5.29975 22.76 8.78975 22.76H15.2097C18.6997 22.76 18.8398 20.87 18.9497 19.34L19.5697 9.09C19.5897 8.73 19.4597 8.39 19.2297 8.14Z" fill="#DB2739"/>
              <path fillRule="evenodd" clipRule="evenodd" d="M9.58008 17C9.58008 16.5858 9.91586 16.25 10.3301 16.25H13.6601C14.0743 16.25 14.4101 16.5858 14.4101 17C14.4101 17.4142 14.0743 17.75 13.6601 17.75H10.3301C9.91586 17.75 9.58008 17.4142 9.58008 17Z" fill="#DB2739"/>
              <path fillRule="evenodd" clipRule="evenodd" d="M8.75 13C8.75 12.5858 9.08579 12.25 9.5 12.25H14.5C14.9142 12.25 15.25 12.5858 15.25 13C15.25 13.4142 14.9142 13.75 14.5 13.75H9.5C9.08579 13.75 8.75 13.4142 8.75 13Z" fill="#DB2739"/>
            </svg>
          </button>
        </div>
        {post.status === 'draft' && (
          <span className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">
            Draft
          </span>
        )}
      </div>
    </article>
  );
}

export default function BlogManagementPage() {
  const [activeTab, setActiveTab] = useState<'all' | 'published' | 'drafts'>('published');

  const filteredPosts = managementBlogData.filter(post => {
    if (activeTab === 'all') return true;
    if (activeTab === 'published') return post.status === 'published';
    if (activeTab === 'drafts') return post.status === 'draft';
    return true;
  });

  return (
    <div className="min-h-screen bg-primary-blue-50">
      <header className="w-full px-4 py-4 md:px-6 lg:px-8 bg-white">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <Link href="/" className="flex items-center gap-2">
            <Image
              width={32}
              height={32}
              src="/showonai.svg"
              alt="ShowOnAI Logo"
              className="h-8 w-auto"
            />
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <section className="relative px-4 sm:px-6 lg:px-8 pb-16 md:pb-20 lg:pb-24 pt-16">
        <div className="max-w-7xl mx-auto">
          {/* Title and Subtitle */}
          <div className="text-center mb-8">
            <h1 className={`${typography.h2} text-gray-900 mb-4`}>
              Blog Post Management
            </h1>
            <p className={`${typography.subtitle} text-gray-600 max-w-2xl mx-auto`}>
              View, manage, and organize all blog posts in one place.
            </p>
          </div>

          {/* Navigation Tabs */}
          <div className="flex justify-between mb-8">
            <div className="flex relative">
              {[
                { id: 'all', label: 'All' },
                { id: 'published', label: 'Published' },
                { id: 'drafts', label: 'Drafts' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as 'all' | 'published' | 'drafts')}
                  className={`px-6 py-3 text-sm font-medium transition-colors relative ${
                    activeTab === tab.id
                      ? 'text-primary-blue-600'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {tab.label}
                  {activeTab === tab.id && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-blue-600"></div>
                  )}
                </button>
              ))}
              {/* Bottom underline for all tabs */}
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gray-300"></div>
            </div>
            <button className="px-4 py-2 bg-primary-blue-600 text-white font-medium rounded-lg hover:bg-primary-blue-700 transition-colors">
              Write a New Blog
            </button>
          </div>

          {/* Blog Posts List */}
          <div>
            {filteredPosts.map((post, idx) => (
              <React.Fragment key={post.id}>
                <BlogManagementCard post={post} />
                {idx < filteredPosts.length - 1 && (
                  <div className="border-t border-gray-200 my-6" />
                )}
              </React.Fragment>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No blog posts found</h3>
              <p className="text-gray-600">Get started by creating your first blog post.</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
} 