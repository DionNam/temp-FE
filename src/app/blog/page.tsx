import React from "react";
import { blogApi } from "@/lib/api";
import { BlogClientWrapper } from "@/components/blog/BlogClientWrapper";

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

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; category?: string; limit?: string }>;
}) {
  const searchParamsData = await searchParams;
  const page = parseInt(searchParamsData.page || "1");
  const limit = parseInt(searchParamsData.limit || "7");
  const category = searchParamsData.category || "";

  const params = {
    page,
    limit,
    ...(category && category !== "all" && { category }),
    published: true,
  };

  const [blogResponse, categoriesResponse] = await Promise.all([
    blogApi.getBlogs(params),
    blogApi.getCategories(),
  ]);

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

  const allCategories = [
    { id: "all", name: "전체", label: "All" },
    ...(categoriesResponse?.data || []).map((cat: string) => ({
      id: cat,
      name: cat,
      label: cat,
    })),
  ];

  const featuredPost = pagination?.current_page === 1 ? posts[0] : null;
  const regularPosts = pagination?.current_page === 1 ? posts.slice(1) : posts;

  return (
    <div
      className="min-h-screen bg-gradient-to-b from-blue-50 to-white"
      style={{
        backgroundImage: "url(/blog-content.svg)",
        backgroundSize: "cover",
        backgroundPosition: "top center",
      }}
    >
      <BlogClientWrapper
        featuredPost={featuredPost}
        regularPosts={regularPosts}
        pagination={pagination}
        allCategories={allCategories}
        currentCategory={category}
        typography={typography}
      />
    </div>
  );
}
