"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Copy, Twitter, Facebook, Linkedin } from "lucide-react";

interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt?: string;
  category: string;
  author_name: string;
  author_email?: string;
  featured_image?: string;
  published_at?: string;
  created_at: string;
}

interface NewBlogContentProps {
  post: BlogPost;
  relatedPosts?: BlogPost[];
}

const categoryColors = {
  "Design": {
    bg: "bg-orange-50",
    border: "border-orange-200",
    text: "text-orange-800"
  },
  "Product": {
    bg: "bg-sky-50",
    border: "border-sky-200",
    text: "text-sky-800"
  },
  "Tools": {
    bg: "bg-pink-50",
    border: "border-pink-200",
    text: "text-pink-800"
  },
  "Leadership": {
    bg: "bg-purple-50",
    border: "border-purple-200",
    text: "text-purple-800"
  },
  "Research": {
    bg: "bg-gray-50",
    border: "border-gray-200",
    text: "text-gray-800"
  },
  "default": {
    bg: "bg-blue-50",
    border: "border-blue-200",
    text: "text-blue-800"
  }
};

function CategoryBadge({ category }: { category: string }) {
  const colors = categoryColors[category as keyof typeof categoryColors] || categoryColors.default;
  
  return (
    <div className={`${colors.bg} border ${colors.border} rounded-full px-3 py-1 inline-flex items-center`}>
      <span className={`font-medium text-sm ${colors.text}`}>
        {category}
      </span>
    </div>
  );
}

function RelatedBlogCard({ post }: { post: BlogPost }) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      day: 'numeric',
      month: 'short', 
      year: 'numeric'
    });
  };

  return (
    <Link href={`/blog/${post.id}`} className="block group">
      <div className="flex flex-col gap-4">
        <div className="aspect-[384/256] bg-gray-200 rounded-xl lg:rounded-2xl overflow-hidden">
          {post.featured_image ? (
            <Image
              src={post.featured_image}
              alt={post.title}
              width={384}
              height={256}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100" />
          )}
        </div>
        
        <div className="flex flex-col gap-4 lg:gap-6">
          <div className="flex flex-col gap-2">
            <p className="font-semibold text-sm text-blue-600">
              {post.author_name} • {formatDate(post.published_at || post.created_at)}
            </p>
            
            <div className="flex gap-3 lg:gap-4 items-start">
              <h3 className="font-semibold text-base lg:text-lg text-gray-900 leading-6 lg:leading-7 flex-1 group-hover:text-blue-600 transition-colors">
                {post.title}
              </h3>
              <ArrowUpRight className="w-5 h-5 lg:w-6 lg:h-6 text-gray-400 group-hover:text-blue-600 transition-colors flex-shrink-0 mt-0.5" />
            </div>
            
            <p className="text-gray-600 text-sm lg:text-base leading-5 lg:leading-6 line-clamp-2">
              {post.excerpt}
            </p>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <CategoryBadge category={post.category} />
          </div>
        </div>
      </div>
    </Link>
  );
}

export function NewBlogContent({ post, relatedPosts = [] }: NewBlogContentProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      day: 'numeric',
      month: 'short', 
      year: 'numeric'
    });
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
  };

  const handleShare = (platform: string) => {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(post.title);
    
    let shareUrl = '';
    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
        break;
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
  };

  return (
    <div className="bg-white flex flex-col items-center justify-start w-full">
      {/* Back Navigation */}
      <div className="box-border flex flex-col items-center justify-start pt-16 lg:pt-24 pb-0 px-0 w-full">
        <div className="flex gap-2 items-center justify-start max-w-[1216px] w-full px-4 lg:px-8">
          <ArrowLeft className="w-5 h-5 lg:w-6 lg:h-6 text-gray-400" />
          <Link href="/blog" className="font-normal text-lg lg:text-xl text-gray-500 hover:text-gray-700">
            Back
          </Link>
        </div>
      </div>

      {/* Header Section */}
      <div className="bg-white flex flex-col items-center justify-start overflow-hidden w-full">
        <div className="box-border flex flex-col gap-12 lg:gap-16 items-center justify-start px-0 py-16 lg:py-24 w-full">
          <div className="box-border flex flex-col gap-6 lg:gap-8 items-center justify-start max-w-[1280px] px-4 lg:px-8 w-full">
            <div className="flex flex-col gap-6 lg:gap-8 items-center justify-start w-full">
              <div className="flex flex-col gap-4 lg:gap-6 items-center justify-start max-w-[768px] w-full text-center">
                <div className="flex flex-col gap-2 lg:gap-3 items-start justify-start w-full">
                  <p className="font-semibold text-sm lg:text-base text-blue-500 w-full text-center">
                    {post.category}
                  </p>
                  <h1 className="font-semibold text-2xl sm:text-3xl lg:text-5xl text-gray-900 tracking-tight w-full text-center leading-tight lg:leading-[60px]">
                    {post.title}
                  </h1>
                </div>
                <p className="font-normal text-base sm:text-lg lg:text-xl text-gray-600 w-full text-center leading-6 sm:leading-7 lg:leading-[30px]">
                  {post.excerpt}
                </p>
              </div>
              
              {/* Author Info */}
              <div className="flex gap-3 items-center justify-start">
                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-base lg:text-lg font-semibold text-gray-700">
                    {post.author_name.charAt(0)}
                  </span>
                </div>
                <div className="flex flex-col items-start justify-start text-sm lg:text-base">
                  <p className="font-semibold text-gray-900">
                    {post.author_name}
                  </p>
                  <p className="font-normal text-gray-600">
                    {post.author_email || formatDate(post.published_at || post.created_at)}
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Featured Image */}
          <div className="box-border flex flex-col gap-12 lg:gap-16 items-center justify-start max-w-[1280px] px-4 lg:px-8 w-full">
            <div className="flex flex-col gap-8 lg:gap-12 items-center justify-start w-full">
              {post.featured_image && (
                <div className="aspect-[16/10] lg:aspect-[1024/560] bg-gray-200 rounded-xl lg:rounded-2xl w-full overflow-hidden">
                  <Image
                    src={post.featured_image}
                    alt={post.title}
                    width={1024}
                    height={560}
                    className="w-full h-full object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 90vw, 1024px"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Content Section */}
        <div className="box-border flex flex-col gap-12 lg:gap-16 items-center justify-start pb-16 lg:pb-24 pt-0 px-0 w-full">
          <div className="box-border flex flex-col gap-12 lg:gap-16 items-center justify-start max-w-[1280px] px-4 lg:px-8 w-full">
            <div className="flex flex-col gap-8 lg:gap-12 items-center justify-start w-full">
              <div className="flex flex-col items-start justify-start max-w-[720px] w-full">
                {/* Blog Content */}
                <div 
                  className="prose prose-sm sm:prose lg:prose-lg max-w-none w-full prose-headings:font-semibold prose-headings:text-gray-900 prose-p:text-gray-600 prose-p:leading-relaxed prose-li:text-gray-600"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
                
                {/* Categories and Social Links */}
                <div className="box-border flex flex-col sm:flex-row gap-4 sm:gap-6 items-start sm:items-center justify-between pt-6 border-t border-gray-200 w-full mt-8 lg:mt-12">
                  <div className="flex gap-2 items-start justify-start">
                    <CategoryBadge category={post.category} />
                  </div>
                  
                  <div className="flex flex-wrap gap-2 sm:gap-3 items-start justify-start">
                    <button
                      onClick={handleCopyLink}
                      className="bg-white border border-gray-300 rounded-lg px-3 sm:px-4 py-2 sm:py-2.5 flex items-center gap-2 hover:bg-gray-50 transition-colors text-sm"
                    >
                      <Copy className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                      <span className="font-semibold text-gray-700 hidden sm:inline">Copy link</span>
                      <span className="font-semibold text-gray-700 sm:hidden">Copy</span>
                    </button>
                    
                    <button
                      onClick={() => handleShare('twitter')}
                      className="bg-white border border-gray-300 rounded-lg p-2 sm:p-2.5 hover:bg-gray-50 transition-colors"
                    >
                      <Twitter className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                    </button>
                    
                    <button
                      onClick={() => handleShare('facebook')}
                      className="bg-white border border-gray-300 rounded-lg p-2 sm:p-2.5 hover:bg-gray-50 transition-colors"
                    >
                      <Facebook className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                    </button>
                    
                    <button
                      onClick={() => handleShare('linkedin')}
                      className="bg-white border border-gray-300 rounded-lg p-2 sm:p-2.5 hover:bg-gray-50 transition-colors"
                    >
                      <Linkedin className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Posts Section */}
      {relatedPosts && relatedPosts.length > 0 && (
        <div className="bg-white box-border flex flex-col gap-12 lg:gap-16 items-center justify-start overflow-hidden px-0 py-16 lg:py-24 w-full">
          <div className="box-border flex flex-col gap-6 lg:gap-8 items-start justify-start max-w-[1280px] px-4 lg:px-8 w-full">
            <div className="flex flex-wrap gap-6 lg:gap-8 items-start justify-between w-full">
              <div className="flex flex-col gap-4 lg:gap-5 items-start justify-start max-w-[768px] min-w-0 w-full lg:min-w-[480px]">
                <div className="flex flex-col gap-2 lg:gap-3 items-start justify-start w-full">
                  <p className="font-semibold text-sm lg:text-base text-blue-600 w-full">
                    Our blog
                  </p>
                  <h2 className="font-semibold text-2xl lg:text-3xl text-gray-900 tracking-tight w-full leading-8 lg:leading-11">
                    Latest blog posts
                  </h2>
                </div>
                <p className="font-normal text-base lg:text-xl text-gray-600 w-full leading-6 lg:leading-[30px]">
                  Tool and strategies modern teams need to help their companies grow.
                </p>
              </div>
            </div>
          </div>
          
          <div className="box-border flex flex-col gap-6 lg:gap-8 items-start justify-start max-w-[1280px] px-4 lg:px-8 w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 w-full">
              {relatedPosts.slice(0, 3).map((relatedPost) => (
                <RelatedBlogCard key={relatedPost.id} post={relatedPost} />
              ))}
            </div>
          </div>
          
          <div className="flex gap-3 items-start justify-start w-full max-w-80 px-4 lg:px-0">
            <Link
              href="/blog"
              className="flex-1 bg-white border border-gray-300 rounded-lg px-4 lg:px-5 py-2.5 lg:py-3 flex items-center justify-center hover:bg-gray-50 transition-colors"
            >
              <span className="font-semibold text-sm lg:text-base text-gray-700">
                View more posts
              </span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
