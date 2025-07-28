"use client";

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { useNavbar } from '@/hooks/useNavbar';
import { blogData, BlogPost, BlogCategory } from '@/types/blog';

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

const categories: BlogCategory[] = [
  { id: 'all', name: '전체', label: 'All' },
  { id: 'news', name: '뉴스', label: 'News' },
  { id: 'tip', name: '팁', label: 'Tip' },
  { id: 'interview', name: '인터뷰', label: 'Interview' },
  { id: 'product-update', name: '제품 업데이트', label: 'Product Update' }
];

function BlogCard({ post, isFeatured = false }: { post: BlogPost; isFeatured?: boolean }) {
  if (isFeatured) {
    return (
      <Link href={`/blog/${post.slug}`}>
        <article className="bg-transparent rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer">
          <div className="flex flex-col lg:flex-row lg:h-full">
            {/* Featured Image - Left Side */}
            <div className="relative w-full lg:w-1/2 lg:min-h-[400px]">
              <Image
                src={post.image}
                alt={post.title}
                width={600}
                height={400}
                className="w-full h-48 sm:h-64 lg:h-full object-cover rounded-2xl"
                priority
              />
            </div>
            
            {/* Featured Content - Right Side */}
            <div className="flex-1 p-4 sm:p-6 lg:p-8 flex flex-col">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm text-gray-500 mb-4 gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary-blue-200 text-primary-blue-500 w-fit">
                  {categories.find(cat => cat.id === post.category)?.name}
                </span>
                <div className="flex items-center">
                  <Image
                    src="/avatar-placeholder.png"
                    alt={`${post.author} avatar`}
                    width={20}
                    height={20}
                    className="rounded-full mr-2"
                  />
                  <span className="font-medium">{post.author}</span>
                  <span className="mx-2">•</span>
                  <span>{post.date}</span>
                </div>
              </div>
              
              <h3 className="font-bold text-gray-900 mb-4 text-lg sm:text-2xl lg:text-3xl leading-tight line-clamp-3">
                {post.title}
              </h3>
              
              <p className="text-gray-600 text-base lg:text-lg leading-relaxed line-clamp-4 mb-6">
                {post.excerpt}
              </p>
              
              <div className="flex items-center text-primary-blue-600 font-semibold text-sm lg:text-base hover:text-primary-blue-700 transition-colors mt-auto">
                <span>자세히 보기</span>
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>
        </article>
      </Link>
    );
  }

  // Regular card layout
  return (
    <Link href={`/blog/${post.slug}`}>
      <article className="bg-transparent rounded-xl overflow-hidden transition-all duration-300 group cursor-pointer">
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
              {categories.find(cat => cat.id === post.category)?.name}
            </span>
            <div className="flex items-center">
              <Image
                src="/avatar2-placeholder.png"
                alt={`${post.author} avatar`}
                width={16}
                height={16}
                className="rounded-full mr-1"
              />
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
          
          <div className="flex items-center text-primary-blue-600 font-medium text-xs hover:text-primary-blue-700 transition-colors">
            <span>자세히 보기</span>
            <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </article>
    </Link>
  );
}



export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  const { handleLoginClick, handleDashboardClick } = useNavbar();

  const filteredPosts = useMemo(() => {
    if (selectedCategory === 'all') {
      return blogData;
    }
    return blogData.filter(post => post.category === selectedCategory);
  }, [selectedCategory]);

  const featuredPost = filteredPosts[0];
  const regularPosts = filteredPosts.slice(1);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Navbar onLoginClick={handleLoginClick} onDashboardClick={handleDashboardClick} />
      
      {/* Hero Section */}
      <section className="relative px-2 sm:px-4 md:px-6 lg:px-8 py-8 sm:py-12 md:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className={`${typography.h1} text-gray-900 mb-4`}>
            블로그
          </h1>
          <p className={`${typography.subtitle} text-gray-600 mb-8 max-w-3xl mx-auto`}>
            새로운 소식과 유용한 정보를 한눈에 확인하세요.
          </p>
          
          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-8 sm:mb-12">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-primary-blue-500 text-primary-blue-50'
                    : 'bg-primary-blue-200 text-primary-blue-500 hover:bg-gray-50 border border-gray-200'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="relative px-2 sm:px-4 md:px-6 lg:px-8 pb-10 sm:pb-16 md:pb-20 lg:pb-24">
        <div className="max-w-7xl mx-auto">
          {/* Featured Post */}
          {featuredPost && (
            <div className="mb-8 sm:mb-12">
              <BlogCard post={featuredPost} isFeatured={true} />
            </div>
          )}
          
          {/* Regular Posts Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {regularPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
} 