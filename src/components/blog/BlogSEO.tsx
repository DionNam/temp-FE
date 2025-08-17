"use client";

import React from 'react';
import Head from 'next/head';
import { BlogPost } from '@/types/blog';
import { generateSlug } from '@/lib/utils';

interface BlogSEOProps {
  post: BlogPost;
}

export function BlogSEO({ post }: BlogSEOProps) {
  const author = React.useMemo(() => {
    if (typeof post.author === 'string') {
      return { name: post.author, url: '', bio: '' };
    } else if (post.author) {
      return post.author;
    } else {
      return { 
        name: post.author_name || 'Unknown Author', 
        url: '', 
        bio: '' 
      };
    }
  }, [post.author, post.author_name]);

  const extractImagesFromContent = (content: string): string[] => {
    if (!content) return [];
    
    const imgRegex = /<img[^>]+src="([^">]+)"/g;
    const images: string[] = [];
    let match;
    
    while ((match = imgRegex.exec(content)) !== null) {
      images.push(match[1]);
    }
    
    return images;
  };

  const contentImages = extractImagesFromContent(post.content || '');
  const allImages = [post.featured_image || post.image, ...contentImages].filter(Boolean);
  
  const slug = `${generateSlug(post?.title)}-${post?.id || 'unknown'}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "image": allImages,
    "author": {
      "@type": "Person",
      "name": author.name,
      ...(author.url && { "url": author.url }),
    },
    "publisher": {
      "@type": "Organization",
      "name": "ShowOnAI",
      "logo": {
        "@type": "ImageObject",
        "url": "/logo.png"
      }
    },
    "datePublished": post.published_at || post.publishedAt || post.date,
    "dateModified": post.updated_at || post.updatedAt || post.published_at || post.publishedAt || post.date,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://showonai.com/blog/${slug}`
    },
    "articleBody": post.content ? post.content.replace(/<[^>]*>/g, '') : post.excerpt,
  };

  const pageTitle = post.seo_title || `${post.title} | ShowOnAI Blog`;
  const createMetaDescription = (title: string, excerpt: string): string => {
    const combined = `${title} - ${excerpt}`;
    return combined.length > 160 ? combined.substring(0, 157) + '...' : combined;
  };
  
  const pageDescription = post.seo_description || createMetaDescription(post.title, post.excerpt);

  return (
    <Head>
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:image" content={post.featured_image || post.image || '/og-default.png'} />
      <meta property="og:url" content={`https://showonai.com/blog/${slug}`} />
      <meta property="og:type" content="article" />
      <meta property="og:site_name" content="ShowOnAI" />
      
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={post.featured_image || post.image || '/og-default.png'} />
      
      <meta property="article:author" content={author.name} />
      <meta property="article:published_time" content={post.published_at || post.publishedAt || post.date} />
      <meta property="article:modified_time" content={post.updated_at || post.updatedAt || post.published_at || post.publishedAt || post.date} />
      <meta property="article:section" content={post.category} />
      
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd, null, 2) }}
      />
    </Head>
  );
}
