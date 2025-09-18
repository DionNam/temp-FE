"use client";

import React, { Suspense } from 'react';
import { useParams } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { NewBlogContent } from '@/components/blog/NewBlogContent';
import { useBlogBySlug, useRelatedBlogs } from '@/hooks/useBlogQueries';
import { extractIdFromSlug } from '@/lib/utils';
import { useToast, ToastContainer } from '@/components/ui/toast';
import Link from 'next/link';
import Head from 'next/head';

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

  // SEO data
  const pageTitle = post.data.seo_title || `${post.data.title} | ShowOnAI Blog`;
  const pageDescription = post.data.seo_description || post.data.excerpt;
  const canonicalUrl = `https://showonai.com/blog/${slug}`;
  
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.data.title,
    "description": post.data.excerpt,
    "image": post.data.featured_image ? [post.data.featured_image] : [],
    "author": {
      "@type": "Person",
      "name": post.data.author_name || 'ShowOnAI Team'
    },
    "publisher": {
      "@type": "Organization",
      "name": "ShowOnAI",
      "logo": {
        "@type": "ImageObject",
        "url": "https://showonai.com/logo.png"
      }
    },
    "datePublished": post.data.published_at || post.data.created_at,
    "dateModified": post.data.updated_at || post.data.published_at || post.data.created_at,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": canonicalUrl
    }
  };

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href={canonicalUrl} />
        
        {/* Open Graph */}
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content={post.data.featured_image || 'https://showonai.com/og-default.png'} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="ShowOnAI" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={post.data.featured_image || 'https://showonai.com/og-default.png'} />
        
        {/* Article specific */}
        <meta property="article:author" content={post.data.author_name || 'ShowOnAI Team'} />
        <meta property="article:published_time" content={post.data.published_at || post.data.created_at} />
        <meta property="article:modified_time" content={post.data.updated_at || post.data.published_at || post.data.created_at} />
        <meta property="article:section" content={post.data.category} />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd, null, 2) }}
        />
      </Head>
      
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