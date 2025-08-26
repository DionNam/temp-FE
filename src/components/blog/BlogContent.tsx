"use client";

import React from 'react';
import Image from 'next/image';
import { BlogPost } from '@/types/blog';

interface BlogContentProps {
  post: BlogPost;
}

export function BlogContent({ post }: BlogContentProps) {
  const author = React.useMemo(() => {
    if (typeof post.author === 'string') {
      return { id: '', name: post.author, avatar: '', bio: '', url: '' };
    } else if (post.author) {
      return post.author;
    } else {
      return { 
        id: post.author_id || '', 
        name: post.author_name || 'Unknown Author', 
        avatar: '', 
        bio: '', 
        url: '' 
      };
    }
  }, [post.author, post.author_name, post.author_id]);

  const imageUrl = post.featured_image || post.image;
  const authorAvatar = post.avatar || "";
  
  const publishDate = post.published_at || post.publishedAt || post.date;
  const formattedDate = new Date(publishDate || '').toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' });

  const processedContent = React.useMemo(() => {
    if (!post.content) return '';
    
    return post.content.replace(
      /<img([^>]*?)(?:\s+alt=["'][^"']*["'])?([^>]*?)>/g,
      (match, before, after) => {
        if (match.includes('alt=')) {
          return match;
        }
        const srcMatch = match.match(/src=["']([^"']*?)["']/);
        const defaultAlt = srcMatch ? `Image: ${srcMatch[1].split('/').pop()?.split('.')[0] || 'Blog image'}` : 'Blog image';
        return `<img${before} alt="${defaultAlt}"${after}>`;
      }
    );
  }, [post.content]);

  return (
    <article className="max-w-7xl mx-auto">
      <header className="text-center mb-8">
        <div className="flex items-center justify-center gap-4 text-sm text-gray-500 mb-6">
          <span className="bg-primary-blue-100 text-primary-blue-700 px-3 py-1 rounded-full text-xs font-medium">
            {post.category}
          </span>
          
          <div className="flex items-center gap-2">
            {authorAvatar && (
              <div className="relative w-6 h-6">
                <Image
                  src={authorAvatar}
                  alt={`Avatar of ${author.name}`}
                  fill
                  className="object-cover rounded-full"
                />
              </div>
            )}
            <span className="font-medium text-gray-700">{author.name}</span>
          </div>
          
          <span>•</span>
          
          <time dateTime={publishDate} className="text-gray-500">
            {formattedDate}
          </time>
        </div>
        
        <h1 className="font-manrope font-semibold text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight text-gray-900 mb-6">
          {post.title}
        </h1>
        
        <p className="font-manrope font-normal text-lg sm:text-xl text-gray-600 leading-relaxed mb-8 max-w-3xl mx-auto">
          {post.excerpt}
        </p>

        {imageUrl && (
        <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] mb-8 rounded-lg overflow-hidden">
          <Image
            src={imageUrl}
            alt={`Hero image for ${post.title}`}
            width={1200}
            height={400}
            className="object-cover w-full h-full mx-auto rounded-lg"
            priority
          />
        </div>
      )}
      </header>

      <div className="prose prose-lg max-w-none">
        <div 
          dangerouslySetInnerHTML={{ __html: processedContent || post.excerpt }}
          className="blog-content"
        />
      </div>
    </article>
  );
}
