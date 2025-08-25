"use client";

import React, { Suspense } from 'react';
import { useParams } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { BlogContent } from '@/components/blog/BlogContent';
import { useNavbar } from '@/hooks/useNavbar';
import { useBlog, useRelatedBlogs } from '@/hooks/useBlogQueries';
import { extractIdFromSlug } from '@/lib/utils';
import { useToast, ToastContainer } from '@/components/ui/toast';
import { RelatedArticles } from '@/components/blog/RelatedArticles';
import { BlogSEO } from '@/components/blog/BlogSEO';
import Link from 'next/link';

function BlogPostContent() {
  const params = useParams();
  const slug = params.slug as string;
  const { handleLoginClick, handleDashboardClick } = useNavbar();
  const { toasts, removeToast } = useToast();

  const blogId = extractIdFromSlug(slug);
  const { data: post, isLoading, error } = useBlog(blogId);
  const { data: relatedPosts } = useRelatedBlogs(post?.data?.id || '');

  if (!blogId && !isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        <Navbar onLoginClick={handleLoginClick} onDashboardClick={handleDashboardClick} />
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="text-gray-900 text-lg mb-2">Invalid blog URL</div>
            <div className="text-gray-500 mb-4">The blog post URL format is invalid.</div>
            <Link 
              href="/blog" 
              className="mt-4 inline-block px-4 py-2 bg-primary-blue-600 text-white rounded-lg hover:bg-primary-blue-700"
            >
              Back to Blog
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        <Navbar onLoginClick={handleLoginClick} onDashboardClick={handleDashboardClick} />
        <div className="flex items-center justify-center h-96">
          <div className="text-gray-500">Loading...</div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        <Navbar onLoginClick={handleLoginClick} onDashboardClick={handleDashboardClick} />
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="text-red-500 text-lg mb-2">Error loading blog post</div>
            <div className="text-gray-500">{error.message}</div>
            <Link 
              href="/blog" 
              className="mt-4 inline-block px-4 py-2 bg-primary-blue-600 text-white rounded-lg hover:bg-primary-blue-700"
            >
              Back to Blog
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        <Navbar onLoginClick={handleLoginClick} onDashboardClick={handleDashboardClick} />
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="text-gray-900 text-lg mb-2">Blog post not found</div>
            <Link 
              href="/blog" 
              className="mt-4 inline-block px-4 py-2 bg-primary-blue-600 text-white rounded-lg hover:bg-primary-blue-700"
            >
              Back to Blog
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <>
      <BlogSEO post={post.data} />
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white" style={{
        backgroundImage: "url(/blog-content.svg)",
        backgroundSize: "cover",
        backgroundPosition: "top center",
      }}>
        <ToastContainer toasts={toasts} removeToast={removeToast} />
        <Navbar onLoginClick={handleLoginClick} onDashboardClick={handleDashboardClick} />
      
      <main className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16 lg:py-20">
        <div className="flex flex-col max-w-7xl mx-auto items-center justify-center">

          <BlogContent post={post.data} />

          {relatedPosts && relatedPosts.data.length > 0 && (
            <RelatedArticles posts={relatedPosts.data} currentPostId={post.data.id || ''} />
          )}
        </div>
      </main>

      <Footer />
      </div>
    </>
  );
}

export default function BlogPostPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <BlogPostContent />
    </Suspense>
  );
}