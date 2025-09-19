'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  author_name: string;
  avatar?: string;
  category: string;
  featured_image?: string;
  published_at?: string;
  created_at: string;
  slug?: string;
}

interface BlogSectionProps {
  className?: string;
}

export default function BlogSection({ className }: BlogSectionProps) {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedPosts = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://stg-landing.showon.ai/api/v1'}/blogs?published=true&limit=3`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch blog posts');
        }
        
        const data = await response.json();
        setBlogPosts(data.data?.blogs || []);
      } catch (error) {
        console.error('Error fetching featured posts:', error);
        // Fallback to empty array
        setBlogPosts([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeaturedPosts();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <section className={`bg-gray-50 py-16 sm:py-20 lg:py-28 ${className}`}>
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
          {isLoading ? (
            // Loading skeleton
            Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm overflow-hidden animate-pulse">
                <div className="aspect-[16/10] bg-gray-200" />
                <div className="p-4 sm:p-6">
                  <div className="h-4 bg-gray-200 rounded mb-3" />
                  <div className="h-4 bg-gray-200 rounded mb-2" />
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-4" />
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-200 rounded-full" />
                      <div>
                        <div className="h-3 bg-gray-200 rounded w-20 mb-1" />
                        <div className="h-3 bg-gray-200 rounded w-16" />
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="h-3 bg-gray-200 rounded w-16 mb-1" />
                      <div className="h-3 bg-gray-200 rounded w-12" />
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : blogPosts.length > 0 ? (
            blogPosts.map((post) => (
              <Link 
                key={post.id}
                href={`/blog/${post.slug || post.id}`}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden group cursor-pointer block"
              >
                {/* Image */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  {post.featured_image ? (
                    <Image
                      src={post.featured_image}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                      <span className="text-4xl font-bold text-blue-300">
                        {post.title.charAt(0)}
                      </span>
                    </div>
                  )}
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
                      {post.avatar ? (
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden">
                          <Image
                            src={post.avatar}
                            alt={`${post.author_name} avatar`}
                            width={40}
                            height={40}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
                          <span className="text-[12px] sm:text-[14px] font-semibold text-gray-700">
                            {post.author_name.charAt(0)}
                          </span>
                        </div>
                      )}
                      <div>
                        <div className="text-[12px] sm:text-[14px] font-semibold text-[#181d27]">
                          {post.author_name}
                        </div>
                        <div className="text-[11px] sm:text-[12px] text-[#535862]">
                          Author
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-[11px] sm:text-[12px] text-[#535862]">
                        {formatDate(post.published_at || post.created_at)}
                      </div>
                      <div className="text-[11px] sm:text-[12px] text-blue-600 font-medium">
                        Read more
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            // No posts fallback
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500 text-lg">No blog posts available at the moment.</p>
            </div>
          )}
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
