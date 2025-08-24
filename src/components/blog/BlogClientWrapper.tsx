"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useNavbar } from "@/hooks/useNavbar";
import { BlogPost, BlogCategory } from "@/types/blog";
import { generateSlug } from "@/lib/utils";
import { Pagination } from "@/components/ui/pagination";
import Image from "next/image";

interface BlogClientWrapperProps {
  featuredPost: BlogPost | null;
  regularPosts: BlogPost[];
  pagination: {
    current_page: number;
    total_pages: number;
    total_items: number;
    items_per_page: number;
  } | undefined;
  allCategories: BlogCategory[];
  currentCategory: string;
  typography: {
    h1: string;
    subtitle: string;
  };
}

function BlogCard({
  post,
  isFeatured = false,
}: {
  post: BlogPost;
  isFeatured?: boolean;
}) {
  const slug = `${generateSlug(post?.title)}-${post?.id || "unknown"}`;
  const publishDate = post.published_at || post.publishedAt || post.date;
  const formattedDate = new Date(publishDate || "").toLocaleDateString(
    "ko-KR",
    { year: "numeric", month: "long", day: "numeric" }
  );

  const image = post.featured_image || "/blog-placeholder.png";

  if (isFeatured) {
    return (
      <a href={`/blog/${slug}`}>
        <article className="bg-transparent rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer px-2 sm:px-0">
          <div className="flex flex-col lg:flex-row lg:h-full">
            <div className="relative w-full lg:w-1/2 lg:min-h-[400px]">
              <Image
                src={image}
                alt={post.title}
                width={600}
                height={400}
                className="w-full h-48 sm:h-64 lg:h-full object-cover rounded-2xl"
              />
            </div>

            <div className="flex-1 p-4 sm:p-6 lg:p-8 flex flex-col">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm text-gray-500 mb-4 gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary-blue-200 text-primary-blue-500 w-fit">
                  {post.category}
                </span>
                <div className="flex items-center">
                  <Image
                    src={
                      typeof post.author === "string"
                        ? "/avatar-placeholder.png"
                        : post.author?.avatar || "/avatar-placeholder.png"
                    }
                    alt={`${
                      typeof post.author === "string"
                        ? post.author
                        : post.author?.name || post.author_name
                    } avatar`}
                    width={20}
                    height={20}
                    className="rounded-full mr-2"
                  />
                  <span className="font-medium">
                    {typeof post.author === "string"
                      ? post.author
                      : post.author?.name || post.author_name}
                  </span>
                  <span className="mx-2">•</span>
                  <span>{formattedDate}</span>
                </div>
              </div>

              <h3 className="font-bold text-gray-900 mb-4 text-lg sm:text-2xl lg:text-3xl leading-tight line-clamp-3">
                {post.title}
              </h3>

              <p className="text-gray-600 text-base lg:text-lg leading-relaxed line-clamp-4 mb-6">
                {post.excerpt}
              </p>
            </div>
          </div>
        </article>
      </a>
    );
  }

  return (
    <a href={`/blog/${slug}`}>
      <article className="bg-transparent rounded-xl overflow-hidden transition-all duration-300 group cursor-pointer px-2 sm:px-0">
        <div className="flex flex-row sm:flex-col">
          <div className="relative flex-shrink-0 w-1/2 h-28 sm:w-full sm:h-64">
            <Image
              src={image}
              alt={post.title}
              width={300}
              height={240}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 rounded-xl"
            />
          </div>
          <div className="flex flex-col justify-between py-3 px-3 sm:px-0 sm:py-4 w-1/2 sm:w-full flex-1">
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs text-gray-500 mb-2 gap-1">
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary-blue-200 text-primary-blue-500 w-fit">
                  {post.category}
                </span>
                <div className="flex items-center">
                  <Image
                    src={
                      typeof post.author === "string"
                        ? "/avatar2-placeholder.png"
                        : post.author?.avatar || "/avatar2-placeholder.png"
                    }
                    alt={`${
                      typeof post.author === "string"
                        ? post.author
                        : post.author?.name || post.author_name
                    } avatar`}
                    width={16}
                    height={16}
                    className="rounded-full mr-1"
                  />
                  <span>
                    {typeof post.author === "string"
                      ? post.author
                      : post.author?.name || post.author_name}
                  </span>
                  <span className="mx-2">•</span>
                  <span>{formattedDate}</span>
                </div>
              </div>

              <h3 className="font-semibold text-gray-900 mb-2 text-base line-clamp-2 group-hover:text-primary-blue-600 transition-colors">
                {post.title}
              </h3>

              <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                {post.excerpt}
              </p>
            </div>
          </div>
        </div>
      </article>
    </a>
  );
}

export function BlogClientWrapper({
  featuredPost,
  regularPosts,
  pagination,
  allCategories,
  currentCategory,
  typography,
}: BlogClientWrapperProps) {
  const { handleLoginClick, handleDashboardClick } = useNavbar();
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleCategorySelect = (categoryId: string) => {
    const params = new URLSearchParams(searchParams);
    if (categoryId === "all") {
      params.delete("category");
    } else {
      params.set("category", categoryId);
    }
    params.set("page", "1");
    router.push(`/blog?${params.toString()}`);
  };

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    router.push(`/blog?${params.toString()}`);
  };

  return (
    <>
      <Navbar
        onLoginClick={handleLoginClick}
        onDashboardClick={handleDashboardClick}
      />

      <section className="relative px-2 sm:px-4 md:px-6 lg:px-8 py-8 sm:py-12 md:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className={`${typography.h1} text-gray-900 mb-4`}>블로그</h1>
          <p
            className={`${typography.subtitle} text-gray-600 mb-8 max-w-3xl mx-auto`}
          >
            새로운 소식과 유용한 정보를 한눈에 확인하세요.
          </p>

          <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-8 sm:mb-12">
            {allCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategorySelect(category.id)}
                className={`px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-colors ${
                  currentCategory === category.id ||
                  (currentCategory === "" && category.id === "all")
                    ? "bg-primary-blue-500 text-primary-blue-50"
                    : "bg-primary-blue-200 text-primary-blue-500 hover:bg-gray-50 border border-gray-200"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="relative px-2 sm:px-4 md:px-6 lg:px-8 pb-10 sm:pb-16 md:pb-20 lg:pb-24">
        <div className="max-w-7xl mx-auto">
          {regularPosts.length === 0 && (
            <div className="flex items-center justify-center py-16">
              <div className="text-center">
                <div className="text-gray-400 mb-4">
                  <svg
                    className="w-16 h-16 mx-auto"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No blog posts found
                </h3>
                <p className="text-gray-600">
                  {currentCategory
                    ? "No posts found in this category."
                    : "No blog posts available at the moment."}
                </p>
              </div>
            </div>
          )}

          {featuredPost && (
            <div className="mb-8 sm:mb-12">
              <BlogCard post={featuredPost} isFeatured={true} />
            </div>
          )}

          {regularPosts.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
              {regularPosts.slice(0, 6).map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          )}

          {pagination && pagination.total_pages > 1 && (
            <div className="mt-12">
              <Pagination
                currentPage={pagination.current_page}
                totalPages={pagination.total_pages}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}
