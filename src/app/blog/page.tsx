"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useNavbar } from "@/hooks/useNavbar";
import { useBlogs } from "@/hooks/useBlog";
import { useBlogFilters, useBlogCategories } from "@/hooks/useBlogFilters";
import { BlogPost, BlogCategory } from "@/types/blog";
import { generateSlug } from "@/lib/utils";
import { Pagination } from "@/components/ui/pagination";

const typography = {
  h1: "font-manrope font-semibold text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl leading-tight",
  h2: "font-manrope font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl leading-tight",
  h3: "font-manrope font-semibold text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed",
  h4: "font-manrope font-semibold text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed",
  title:
    "font-manrope font-semibold text-lg sm:text-xl md:text-2xl lg:text-3xl leading-relaxed",
  title2:
    "font-manrope font-semibold text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed",
  subtitle:
    "font-manrope font-normal text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl leading-relaxed",
  body: "font-manrope font-normal text-sm sm:text-base leading-relaxed",
  caption:
    "font-manrope font-medium text-xs sm:text-sm uppercase tracking-wider",
  price: "font-manrope font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl",
} as const;

const categories: BlogCategory[] = [
  { id: "all", name: "전체", label: "All" },
  { id: "news", name: "뉴스", label: "News" },
  { id: "tip", name: "팁", label: "Tip" },
  { id: "interview", name: "인터뷰", label: "Interview" },
  { id: "product-update", name: "제품 업데이트", label: "Product Update" },
];

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
      <Link href={`/blog/${slug}`}>
        <article className="bg-transparent rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer px-2 sm:px-0">
          <div className="flex flex-col lg:flex-row lg:h-full">
            <div className="relative w-full lg:w-1/2 lg:min-h-[400px]">
              <Image
                src={image}
                alt={post.title}
                width={600}
                height={400}
                className="w-full h-48 sm:h-64 lg:h-full object-cover rounded-2xl"
                priority
              />
            </div>

            <div className="flex-1 p-4 sm:p-6 lg:p-8 flex flex-col">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm text-gray-500 mb-4 gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary-blue-200 text-primary-blue-500 w-fit">
                  {/* {categories.find(cat => cat.id === post.category)?.name} */}
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
      </Link>
    );
  }

  return (
    <Link href={`/blog/${slug}`}>
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
    </Link>
  );
}

export default function BlogPage() {
  const { handleLoginClick, handleDashboardClick } = useNavbar();
  const { filters, updateFilter } = useBlogFilters({ limit: 7 });
  const { data: blogResponse, loading, error } = useBlogs(filters);
  const { data: apiCategories } = useBlogCategories();
  const allPosts = Array.isArray(blogResponse?.data?.blogs)
    ? blogResponse.data.blogs
    : [];
  const posts = allPosts.filter((post) => post.published === true);

  const pagination = blogResponse?.data
    ? {
        current_page: blogResponse.data.page,
        total_pages: blogResponse.data.total_pages,
        total_items: blogResponse.data.total,
        items_per_page: blogResponse.data.limit,
      }
    : undefined;

  const allCategories = useMemo(() => {
    const staticCategories = categories;
    if (apiCategories && apiCategories.length > 0) {
      const dynamicCategories = apiCategories.map((cat: string) => ({
        id: cat,
        name: cat,
        label: cat,
      }));
      return [{ id: "all", name: "전체", label: "All" }, ...dynamicCategories];
    }
    return staticCategories;
  }, [apiCategories]);

  const featuredPost = pagination?.current_page === 1 ? posts[0] : null;
  const regularPosts = pagination?.current_page === 1 ? posts.slice(1) : posts;

  const handleCategorySelect = (categoryId: string) => {
    updateFilter("category", categoryId === "all" ? "" : categoryId);
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-b from-blue-50 to-white"
      style={{
        backgroundImage: "url(/blog-content.svg)",
        backgroundSize: "cover",
        backgroundPosition: "top center",
      }}
    >
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
                  filters.category === category.id ||
                  (filters.category === "" && category.id === "all")
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
          {loading && (
            <div className="flex items-center justify-center py-16">
              <div className="text-gray-500">Loading blog posts...</div>
            </div>
          )}

          {error && (
            <div className="flex items-center justify-center py-16">
              <div className="text-center">
                <div className="text-red-500 text-lg mb-2">
                  Error loading blog posts
                </div>
                <div className="text-gray-500 mb-4">{error}</div>
                <button
                  onClick={() => window.location.reload()}
                  className="px-4 py-2 bg-primary-blue-600 text-white rounded-lg hover:bg-primary-blue-700"
                >
                  Retry
                </button>
              </div>
            </div>
          )}
          {!loading && !error && posts.length === 0 && (
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
                  {filters.category
                    ? "No posts found in this category."
                    : "No blog posts available at the moment."}
                </p>
              </div>
            </div>
          )}

          {!loading && !error && featuredPost && (
            <div className="mb-8 sm:mb-12">
              <BlogCard post={featuredPost} isFeatured={true} />
            </div>
          )}

          {!loading && !error && regularPosts.length > 0 && (
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
                onPageChange={(page) => updateFilter("page", page)}
              />
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
