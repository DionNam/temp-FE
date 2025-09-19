"use client";

import { getBlogCategories, getCategoryDisplayName, getCategorySlug } from "@/config/blog";
import { useBlogs } from "@/hooks/useBlogQueries";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { BlogCard } from "./shared";

interface NewBlogClientWrapperProps {
  searchParams: Promise<{ page?: string; category?: string; limit?: string }>;
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
  const [activeCategory, setActiveCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [paramsLoaded, setParamsLoaded] = useState(false);
  
  useEffect(() => {
    const loadParams = async () => {
      try {
        const params = await searchParams;
        setActiveCategory(params.category || 'all');
        setCurrentPage(parseInt(params.page || '1'));
        setParamsLoaded(true);
      } catch (error) {
        console.error('Error loading search params:', error);
        setParamsLoaded(true);
      }
    };
    
    loadParams();
  }, [searchParams]);
  
  // Convert category slug back to category name for API call
  const getActualCategoryName = (categorySlug: string) => {
    if (categorySlug === 'all') return undefined;
    const category = getBlogCategories().find(cat => getCategorySlug(cat) === categorySlug);
    return category || categorySlug;
  };
  
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

  if (isLoading || !paramsLoaded) {
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
                  <BlogCard post={featuredPost} variant="featured" />
                </div>
              )}
              
              {/* Other Posts Grid */}
              {otherPosts.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-8 w-full">
                  {otherPosts.map((post) => (
                    <BlogCard key={post.id} post={post} variant="default" />
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
