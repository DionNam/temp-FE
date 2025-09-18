"use client";

import React, { Suspense } from 'react';
import { useParams } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { NewBlogContent } from '@/components/blog/NewBlogContent';
import { useBlogBySlug, useRelatedBlogs } from '@/hooks/useBlogQueries';
import { extractIdFromSlug } from '@/lib/utils';
import { useToast, ToastContainer } from '@/components/ui/toast';
import { BlogSEO } from '@/components/blog/BlogSEO';
import Link from 'next/link';

function BlogPostContent() {
  const params = useParams();
  const slug = params.slug as string;
  const { toasts, removeToast } = useToast();

  // Use real API data with slug
  const { data: post, isLoading, error } = useBlogBySlug(slug);
  const { data: relatedPosts } = useRelatedBlogs(post?.data?.id || '');

  if (!slug && !isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="text-gray-900 text-lg mb-2">Invalid blog URL</div>
            <div className="text-gray-500 mb-4">The blog post URL format is invalid.</div>
            <Link 
              href="/blog" 
              className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
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
      <div className="min-h-screen bg-white">
        <Header />
        <div className="flex items-center justify-center h-96">
          <div className="text-gray-500">Loading...</div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="text-red-500 text-lg mb-2">Error loading blog post</div>
            <div className="text-gray-500">{error.message}</div>
            <Link 
              href="/blog" 
              className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
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
      <div className="min-h-screen bg-white">
        <Header />
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="text-gray-900 text-lg mb-2">Blog post not found</div>
            <Link 
              href="/blog" 
              className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
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
      <div className="min-h-screen bg-white">
        <ToastContainer toasts={toasts} removeToast={removeToast} />
        <Header />
        <NewBlogContent post={post.data} relatedPosts={relatedPosts?.data} />
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