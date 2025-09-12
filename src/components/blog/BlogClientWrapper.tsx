"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useNavbar } from "@/hooks/useNavbar";
import { BlogPost } from "@/types/blog";
import { generateSlug, sortBlogPostsByDate } from "@/lib/utils";
import { Pagination } from "@/components/ui/pagination";
import { useBlogs, useCategories } from "@/hooks/useBlogQueries";

interface BlogClientWrapperProps {
  searchParams: Promise<{ page?: string; category?: string; limit?: string }>;
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
  const authorAvatar = post.avatar || "/avatar-placeholder.png";

  if (isFeatured) {
    return (
      <a href={`/blog/${slug}`}>
        <article className="bg-transparent rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer px-2 sm:px-0">
          <div className="flex flex-col lg:flex-row lg:h-full">
            <div className="relative w-full lg:w-1/2 lg:min-h-[400px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={image}
                alt={post.title}
                width={600}
                height={400}
                className="w-full h-48 sm:h-64 lg:h-full object-cover rounded-2xl object-center"
              />
            </div>

            <div className="flex-1 p-4 sm:p-6 lg:p-8 flex flex-col">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm text-gray-500 mb-4 gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary-blue-200 text-primary-blue-500 w-fit">
                  {post.category}
                </span>
                <div className="flex items-center">
                  <div className="relative w-6 h-6 rounded-full overflow-hidden mr-1">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={authorAvatar}
                      alt={`${
                        typeof post.author === "string"
                          ? post.author
                          : post.author?.name || post.author_name
                      } avatar`}
                      width={20}
                      height={20}
                      className="object-cover w-full h-full"
                    />
                  </div>
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
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={image}
              alt={post.title}
              width={300}
              height={240}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 rounded-xl object-center"
            />
          </div>
          <div className="flex flex-col justify-between py-3 px-3 sm:px-0 sm:py-4 w-1/2 sm:w-full flex-1">
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs text-gray-500 mb-2 gap-1">
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary-blue-200 text-primary-blue-500 w-fit">
                  {post.category}
                </span>
                <div className="flex items-center">
                  <div className="relative w-6 h-6 rounded-full overflow-hidden mr-1">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={authorAvatar}
                      alt={`${
                        typeof post.author === "string"
                          ? post.author
                          : post.author?.name || post.author_name
                      } avatar`}
                      width={16}
                      height={16}
                      className="object-cover w-full h-full"
                    />
                  </div>
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
  searchParams: searchParamsPromise,
  typography,
}: BlogClientWrapperProps) {
  const { handleLoginClick, handleDashboardClick } = useNavbar();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [searchParamsData, setSearchParamsData] = React.useState<{
    page?: string;
    category?: string;
    limit?: string;
  }>({});

  React.useEffect(() => {
    searchParamsPromise.then(setSearchParamsData);
  }, [searchParamsPromise]);

  const page = parseInt(searchParamsData.page || "1");
  const limit = parseInt(searchParamsData.limit || "7");
  const category = searchParamsData.category || "";

  const params = {
    page,
    limit,
    ...(category && category !== "all" && { category }),
    published: true,
    sort_by: "published_at",
    sort_order: "desc" as const,
  };

  const {
    data: blogResponse,
    isLoading: blogsLoading,
    error: blogsError,
  } = useBlogs(params);
  const { data: categoriesResponse, isLoading: categoriesLoading } =
    useCategories();

  const allPosts = Array.isArray(blogResponse?.data?.blogs)
    ? blogResponse.data.blogs
    : [];
  const posts = sortBlogPostsByDate(
    allPosts.filter((post: BlogPost) => post.published === true)
  );

  const pagination = blogResponse?.data
    ? {
        current_page: blogResponse.data.page,
        total_pages: blogResponse.data.total_pages,
        total_items: blogResponse.data.total,
        items_per_page: blogResponse.data.limit,
      }
    : undefined;

  const allCategories = [
    { id: "all", name: "All", label: "All" },
    ...(categoriesResponse?.data || []).map((cat: string) => ({
      id: cat,
      name: cat,
      label: cat,
    })),
  ];

  const featuredPost = pagination?.current_page === 1 ? posts[0] : null;
  const regularPosts = pagination?.current_page === 1 ? posts.slice(1) : posts;

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

  const isLoading = blogsLoading || categoriesLoading;

  if (blogsError) {
    return (
      <>
        <Navbar
          onLoginClick={handleLoginClick}
          onDashboardClick={handleDashboardClick}
        />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Error loading blogs
            </h2>
            <p className="text-gray-600">Please try again later.</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar
        onLoginClick={handleLoginClick}
        onDashboardClick={handleDashboardClick}
      />

      <section className="relative px-2 sm:px-4 md:px-6 lg:px-8 py-8 sm:py-12 md:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className={`${typography.h1} text-gray-900 mb-4`}>Blog</h1>
          <p
            className={`${typography.subtitle} text-gray-600 mb-8 max-w-3xl mx-auto`}
          >
            Stay updated with our latest news and insights at a glance.
          </p>

          <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-8 sm:mb-12">
            {allCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategorySelect(cat.id)}
                className={`px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-colors ${
                  category === cat.id || (category === "" && cat.id === "all")
                    ? "bg-primary-blue-500 text-primary-blue-50"
                    : "bg-primary-blue-200 text-primary-blue-500 hover:bg-gray-50 border border-gray-200"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="relative px-2 sm:px-4 md:px-6 lg:px-8 pb-10 sm:pb-16 md:pb-20 lg:pb-24">
        <div className="max-w-7xl mx-auto">
          {isLoading && (
            <div className="flex items-center justify-center py-16">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-blue-500 mx-auto mb-4"></div>
                <p className="text-gray-600">Loading blogs...</p>
              </div>
            </div>
          )}

          {!isLoading && posts.length === 0 && (
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
                  {category
                    ? "No posts found in this category."
                    : "No blog posts available at the moment."}
                </p>
              </div>
            </div>
          )}

          {!isLoading && featuredPost && (
            <div className="mb-8 sm:mb-12">
              <BlogCard post={featuredPost} isFeatured={true} />
            </div>
          )}

          {!isLoading && regularPosts.length > 0 && (
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
