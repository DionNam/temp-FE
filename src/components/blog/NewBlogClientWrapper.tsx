"use client";

import React, { useState, useEffect, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ArrowLeft, ArrowRight } from "lucide-react";
import { useBlogs } from "@/hooks/useBlogQueries";
import { useBlogCategories } from "@/hooks/useBlogFilters";
import { getBlogCategories, getCategorySlug, getCategoryDisplayName } from "@/config/blog";

interface NewBlogClientWrapperProps {
  searchParams: Promise<{ page?: string; category?: string; limit?: string }>;
}

const categoryColors = {
  "Content Marketing": {
    bg: "bg-blue-50",
    border: "border-blue-200",
    text: "text-blue-800"
  },
  "Data and Research": {
    bg: "bg-green-50",
    border: "border-green-200",
    text: "text-green-800"
  },
  "Case Study": {
    bg: "bg-purple-50",
    border: "border-purple-200",
    text: "text-purple-800"
  },
  // Legacy categories for backward compatibility
  "Design": {
    bg: "bg-orange-50",
    border: "border-orange-200",
    text: "text-orange-800"
  },
  "Product": {
    bg: "bg-sky-50",
    border: "border-sky-200",
    text: "text-sky-800"
  },
  "Tools": {
    bg: "bg-pink-50",
    border: "border-pink-200",
    text: "text-pink-800"
  },
  "Leadership": {
    bg: "bg-purple-50",
    border: "border-purple-200",
    text: "text-purple-800"
  },
  "Research": {
    bg: "bg-gray-50",
    border: "border-gray-200",
    text: "text-gray-800"
  },
  "tutorial": {
    bg: "bg-indigo-50",
    border: "border-indigo-200",
    text: "text-indigo-800"
  },
  "opinion": {
    bg: "bg-red-50",
    border: "border-red-200",
    text: "text-red-800"
  },
  "default": {
    bg: "bg-gray-50",
    border: "border-gray-200",
    text: "text-gray-800"
  }
};

function CategoryBadge({ category }: { category: string }) {
  const colors = categoryColors[category as keyof typeof categoryColors] || categoryColors.default;
  
  return (
    <div className={`${colors.bg} border ${colors.border} rounded-full px-3 py-1 inline-flex items-center`}>
      <span className={`font-medium text-sm ${colors.text}`}>
        {category}
      </span>
    </div>
  );
}

function BlogCard({ post, isFeatured = false }: { post: any; isFeatured?: boolean }) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      day: 'numeric',
      month: 'short', 
      year: 'numeric'
    });
  };

  if (isFeatured) {
    return (
      <Link href={`/blog/${post.slug}`} className="block group">
        <div className="flex flex-col gap-4 sm:gap-5 lg:gap-4 w-full">
          <div className="aspect-[384/256] bg-gray-200 rounded-xl sm:rounded-2xl overflow-hidden">
            {post.featured_image ? (
              <Image
                src={post.featured_image}
                alt={post.title}
                width={1216}
                height={810}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1216px"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100" />
            )}
          </div>
          
          <div className="flex flex-col gap-4 sm:gap-5 lg:gap-6 px-1 sm:px-0">
            <div className="flex flex-col gap-2 sm:gap-3">
              <p className="font-semibold text-xs sm:text-sm text-blue-600">
                {post.author_name} • {formatDate(post.published_at || post.created_at)}
              </p>
              
              <div className="flex gap-2 sm:gap-3 lg:gap-4 items-start">
                <h2 className="font-semibold text-lg sm:text-xl lg:text-2xl text-gray-900 leading-6 sm:leading-7 lg:leading-8 flex-1 group-hover:text-blue-600 transition-colors">
                  {post.title}
                </h2>
                <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-gray-400 group-hover:text-blue-600 transition-colors flex-shrink-0 mt-1" />
              </div>
              
              <p className="text-gray-600 text-sm sm:text-base lg:text-base leading-5 sm:leading-6 lg:leading-6 line-clamp-2">
                {post.excerpt}
              </p>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <CategoryBadge category={post.category} />
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/blog/${post.slug}`} className="block group">
      <div className="flex flex-col gap-4 sm:gap-5">
        <div className="aspect-[384/256] bg-gray-200 rounded-xl sm:rounded-2xl overflow-hidden">
          {post.featured_image ? (
            <Image
              src={post.featured_image}
              alt={post.title}
              width={384}
              height={256}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 384px"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100" />
          )}
        </div>
        
        <div className="flex flex-col gap-4 sm:gap-5 lg:gap-6 px-1 sm:px-0">
          <div className="flex flex-col gap-2 sm:gap-3">
            <p className="font-semibold text-xs sm:text-sm text-blue-600">
              {post.author_name} • {formatDate(post.published_at || post.created_at)}
            </p>
            
            <div className="flex gap-2 sm:gap-3 lg:gap-4 items-start">
              <h3 className="font-semibold text-sm sm:text-base lg:text-lg text-gray-900 leading-5 sm:leading-6 lg:leading-7 flex-1 group-hover:text-blue-600 transition-colors">
                {post.title}
              </h3>
              <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-gray-400 group-hover:text-blue-600 transition-colors flex-shrink-0 mt-0.5" />
            </div>
            
            <p className="text-gray-600 text-xs sm:text-sm lg:text-base leading-4 sm:leading-5 lg:leading-6 line-clamp-2">
              {post.excerpt}
            </p>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <CategoryBadge category={post.category} />
          </div>
        </div>
      </div>
    </Link>
  );
}

function Pagination({ currentPage, totalPages, onPageChange }: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) {
  const getPageNumbers = () => {
    const pages = [];
    const showEllipsis = totalPages > 7;
    
    if (!showEllipsis) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push('...');
      
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      
      for (let i = start; i <= end; i++) {
        if (i !== 1 && i !== totalPages) {
          pages.push(i);
        }
      }
      
      if (currentPage < totalPages - 2) pages.push('...');
      pages.push(totalPages);
    }
    
    return pages;
  };

  return (
    <div className="flex items-center justify-between lg:justify-center gap-3 lg:gap-5 pt-5 border-t border-gray-200">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex items-center gap-1 px-3 py-2 text-sm font-semibold text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ArrowLeft className="w-4 h-4 lg:w-5 lg:h-5" />
        <span className="hidden sm:inline">Previous</span>
        <span className="sm:hidden">Prev</span>
      </button>
      
      <div className="flex gap-0.5 overflow-x-auto">
        {getPageNumbers().map((page, index) => (
          <button
            key={index}
            onClick={() => typeof page === 'number' && onPageChange(page)}
            disabled={typeof page !== 'number'}
            className={`w-8 h-8 lg:w-10 lg:h-10 rounded-lg flex items-center justify-center text-sm font-medium transition-colors flex-shrink-0 ${
              page === currentPage
                ? 'bg-gray-100 text-gray-900'
                : typeof page === 'number'
                ? 'text-gray-500 hover:text-gray-900'
                : 'text-gray-400 cursor-default'
            }`}
          >
            {page}
          </button>
        ))}
      </div>
      
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex items-center gap-1 px-3 py-2 text-sm font-semibold text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span className="hidden sm:inline">Next</span>
        <span className="sm:hidden">Next</span>
        <ArrowRight className="w-4 h-4 lg:w-5 lg:h-5" />
      </button>
    </div>
  );
}

export function NewBlogClientWrapper({ searchParams }: NewBlogClientWrapperProps) {
  const params = use(searchParams);
  const [activeCategory, setActiveCategory] = useState(params.category || 'all');
  const [currentPage, setCurrentPage] = useState(parseInt(params.page || '1'));
  
  // Convert category slug back to category name for API call
  const getActualCategoryName = (categorySlug: string) => {
    if (categorySlug === 'all') return undefined;
    const category = getBlogCategories().find(cat => getCategorySlug(cat) === categorySlug);
    return category || categorySlug;
  };
  
  const { data: categoriesData } = useBlogCategories();
  const { data: blogData, isLoading } = useBlogs({
    page: currentPage,
    limit: 9,
    category: getActualCategoryName(activeCategory),
  });

  const posts = blogData?.data?.blogs || [];
  const totalPages = blogData?.data?.total_pages || 1;
  const featuredPost = posts[0];
  const otherPosts = posts.slice(1);

  const categories = [
    { id: 'all', name: 'View all' },
    ...getBlogCategories().map(category => ({
      id: getCategorySlug(category),
      name: getCategoryDisplayName(category)
    }))
  ];

  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <div className="box-border flex flex-col gap-10 sm:gap-12 lg:gap-16 items-center justify-start pb-0 pt-16 sm:pt-20 lg:pt-24 px-0 w-full">
      {/* Header Section */}
      <div className="box-border flex flex-col gap-6 sm:gap-8 lg:gap-8 items-center justify-start max-w-[1280px] px-4 sm:px-6 lg:px-8 py-0 w-full">
        <div className="flex flex-col gap-6 sm:gap-8 lg:gap-12 items-center justify-start w-full">
          <div className="flex flex-col gap-4 sm:gap-5 lg:gap-6 items-center justify-start max-w-[873px] px-2 sm:px-0">
            <div className="flex flex-col gap-4 lg:gap-6 items-center justify-start">
              <h1 className="font-semibold text-2xl sm:text-3xl lg:text-5xl text-gray-900 text-center leading-tight lg:leading-[60px] tracking-[-0.48px]">
                Blog
              </h1>
            </div>
            <p className="font-normal text-base sm:text-lg lg:text-xl text-gray-600 text-center leading-6 sm:leading-7 lg:leading-[30px] max-w-[768px] px-2 sm:px-4 lg:px-0">
              Check out the latest news and useful information at a glance.
            </p>
          </div>
          
          {/* Category Tabs */}
          <div className="w-full overflow-x-auto">
            <div className="flex gap-2 sm:gap-3 items-center justify-start lg:justify-center min-w-max px-4 sm:px-6 lg:px-0 pb-2 lg:pb-0">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryChange(category.id)}
                  className={`h-10 sm:h-11 px-3 sm:px-4 py-2 rounded-full border transition-colors whitespace-nowrap flex-shrink-0 ${
                    activeCategory === category.id
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white text-gray-500 border-gray-200 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <span className="font-semibold text-xs sm:text-sm lg:text-base leading-5 sm:leading-6">
                    {category.name}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="box-border flex flex-col gap-10 sm:gap-12 lg:gap-16 items-center justify-start pb-16 sm:pb-20 lg:pb-24 pt-0 px-0 w-full">
        <div className="box-border flex flex-col gap-10 sm:gap-12 lg:gap-16 items-center justify-start max-w-[1280px] px-4 sm:px-6 lg:px-8 py-0 w-full">
          {posts.length === 0 ? (
            <div className="flex flex-col items-center gap-3 sm:gap-4 py-8 sm:py-12 lg:py-16 px-4">
              <div className="text-gray-400 text-3xl sm:text-4xl lg:text-6xl">📝</div>
              <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-900 text-center">No blog posts found</h3>
              <p className="text-sm sm:text-base text-gray-600 text-center px-2">No posts available for the selected category.</p>
            </div>
          ) : (
            <>
              {/* Featured Post */}
              {featuredPost && (
                <div className="w-full">
                  <BlogCard post={featuredPost} isFeatured />
                </div>
              )}
              
              {/* Other Posts Grid */}
              {otherPosts.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-8 w-full">
                  {otherPosts.map((post) => (
                    <BlogCard key={post.id} post={post} />
                  ))}
                </div>
              )}
              
              {/* Pagination */}
              {totalPages > 1 && (
                <div className="w-full">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
