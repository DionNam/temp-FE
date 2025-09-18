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
  const pageTitle = post.data.seo_title || `${post.data.title} | ShowOnAI Blog - GEO & AI Search Optimization Insights`;
  const pageDescription = post.data.seo_description || post.data.excerpt || `Discover insights on ${post.data.category.toLowerCase()} and AI search optimization. Learn about GEO (Generative Engine Optimization) strategies for ChatGPT, Gemini, and Perplexity.`;
  const canonicalUrl = `https://showonai.com/blog/${slug}`;
  const featuredImage = post.data.featured_image || 'https://showonai.com/og-blog-default.jpg';
  
  // Generate keywords based on content
  const contentKeywords = [
    'ShowOnAI', 'GEO', 'AI search optimization', 'generative engine optimization',
    'ChatGPT optimization', 'Gemini AI', 'Perplexity AI', 'SEO', 'digital marketing',
    post.data.category?.toLowerCase(), 'AI marketing', 'brand visibility', 'search optimization'
  ].filter(Boolean).join(', ');
  
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.data.title,
    "description": pageDescription,
    "image": post.data.featured_image ? [post.data.featured_image] : ['https://showonai.com/og-blog-default.jpg'],
    "author": {
      "@type": "Person",
      "name": post.data.author_name || 'ShowOnAI Team',
      "url": "https://showonai.com/about"
    },
    "publisher": {
      "@type": "Organization",
      "name": "ShowOnAI",
      "url": "https://showonai.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://showonai.com/showonai-logo.png",
        "width": 176,
        "height": 48
      }
    },
    "datePublished": post.data.published_at || post.data.created_at,
    "dateModified": post.data.updated_at || post.data.published_at || post.data.created_at,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": canonicalUrl
    },
    "isPartOf": {
      "@type": "Blog",
      "@id": "https://showonai.com/blog",
      "name": "ShowOnAI Blog",
      "description": "Insights and strategies for AI search optimization and GEO"
    },
    "about": [
      {
        "@type": "Thing",
        "name": "AI Search Optimization"
      },
      {
        "@type": "Thing", 
        "name": "Generative Engine Optimization"
      },
      {
        "@type": "Thing",
        "name": post.data.category
      }
    ],
    "keywords": contentKeywords,
    "wordCount": post.data.content ? post.data.content.replace(/<[^>]*>/g, '').split(' ').length : undefined,
    "inLanguage": "en-US",
    "copyrightHolder": {
      "@type": "Organization",
      "name": "ShowOnAI"
    },
    "copyrightYear": new Date(post.data.created_at).getFullYear()
  };

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content={contentKeywords} />
        <meta name="author" content={post.data.author_name || 'ShowOnAI Team'} />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow, max-video-preview:-1, max-image-preview:large, max-snippet:-1" />
        
        <link rel="canonical" href={canonicalUrl} />
        
        {/* Open Graph */}
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content={featuredImage} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content={`${post.data.title} - ShowOnAI Blog`} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="ShowOnAI" />
        <meta property="og:locale" content="en_US" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@showonai" />
        <meta name="twitter:creator" content="@showonai" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={featuredImage} />
        <meta name="twitter:image:alt" content={`${post.data.title} - ShowOnAI Blog`} />
        
        {/* Article specific */}
        <meta property="article:author" content={post.data.author_name || 'ShowOnAI Team'} />
        <meta property="article:published_time" content={post.data.published_at || post.data.created_at} />
        <meta property="article:modified_time" content={post.data.updated_at || post.data.published_at || post.data.created_at} />
        <meta property="article:section" content={post.data.category} />
        <meta property="article:tag" content="AI search optimization" />
        <meta property="article:tag" content="GEO" />
        <meta property="article:tag" content="generative engine optimization" />
        {post.data.category && <meta property="article:tag" content={post.data.category} />}
        
        {/* Additional SEO */}
        <meta name="theme-color" content="#2353DF" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="format-detection" content="telephone=no" />
        
        {/* Preload critical resources */}
        {featuredImage && <link rel="preload" href={featuredImage} as="image" />}
        
        {/* Breadcrumb structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ 
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Home",
                  "item": "https://showonai.com"
                },
                {
                  "@type": "ListItem", 
                  "position": 2,
                  "name": "Blog",
                  "item": "https://showonai.com/blog"
                },
                {
                  "@type": "ListItem",
                  "position": 3,
                  "name": post.data.title,
                  "item": canonicalUrl
                }
              ]
            })
          }}
        />
        
        {/* Main structured data */}
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