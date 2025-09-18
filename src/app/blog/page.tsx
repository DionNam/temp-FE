import React from "react";
import { Header } from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { NewBlogClientWrapper } from "@/components/blog/NewBlogClientWrapper";

export default function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; category?: string; limit?: string }>;
}) {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <NewBlogClientWrapper searchParams={searchParams} />
      <Footer />
    </div>
  );
}
