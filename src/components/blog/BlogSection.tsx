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
      title: "The Future of AI Search Optimization: 2024 Trend Analysis",
      excerpt: "Explore new ways AI-powered search engines evaluate content and optimization strategies to respond to these changes.",
      author: "Jin Kim",
      role: "AI SEO Expert",
      date: "March 15, 2024",
      readTime: "5 min read",
      image: "/blog-placeholder.png",
      category: "AI Optimization"
    },
    {
      id: 2,
      title: "GEO vs SEO: A New Paradigm for Location-Based Search",
      excerpt: "Learn about the impact of Geographic Engine Optimization (GEO) on businesses beyond traditional SEO and practical implementation methods.",
      author: "Sarah Lee",
      role: "GEO Marketing Strategist",
      date: "March 12, 2024",
      readTime: "7 min read",
      image: "/blog-placeholder.png",
      category: "GEO Marketing"
    },
    {
      id: 3,
      title: "Perplexity AI Optimization Guide: Practical Strategies",
      excerpt: "Step-by-step guide on specific content creation methods and optimization tips to achieve high rankings in Perplexity AI.",
      author: "Mike Park",
      role: "Content Optimization Specialist",
      date: "March 10, 2024",
      readTime: "6 min read",
      image: "/blog-placeholder.png",
      category: "Practical Guide"
    }
  ];

  return (
    <section className={`bg-gray-50 py-12 sm:py-16 lg:py-24 ${className}`}>
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="text-[14px] sm:text-[16px] text-blue-600 font-semibold mb-3 sm:mb-4">
            Insights & Guides
          </div>
          <h2 className="text-[24px] sm:text-[32px] lg:text-[36px] font-semibold text-[#181d27] tracking-[-0.48px] sm:tracking-[-0.72px] mb-4 sm:mb-6">
            AI Search Optimization Insights
          </h2>
          <p className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#535862] max-w-[600px] mx-auto leading-[24px] sm:leading-[26px] lg:leading-[30px]">
            Discover the latest AI search trends and practical know-how shared by experts
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
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
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
            View All Posts
            <svg className="w-4 sm:w-5 h-4 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
