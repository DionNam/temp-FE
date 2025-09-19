import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { BlogPost } from './types';
import { formatDate } from './utils';
import { CategoryBadge } from './CategoryBadge';
import { AuthorAvatar } from './AuthorAvatar';

interface BlogCardProps {
  post: BlogPost;
  variant?: 'default' | 'featured' | 'related';
  showAuthor?: boolean;
  showCategory?: boolean;
}

export function BlogCard({ 
  post, 
  variant = 'default',
  showAuthor = true,
  showCategory = true
}: BlogCardProps) {
  const isFeature = variant === 'featured';
  const isRelated = variant === 'related';
  
  return (
    <Link href={`/blog/${post.slug || post.id}`} className="block group">
      <div className={`flex flex-col gap-4 ${isFeature ? 'sm:gap-5 lg:gap-4 w-full' : isRelated ? '' : 'sm:gap-5'}`}>
        {/* Image */}
        <div className={`aspect-[384/256] bg-gray-200 rounded-xl ${isFeature ? 'sm:rounded-2xl' : 'lg:rounded-2xl'} overflow-hidden`}>
          {post.featured_image ? (
            <Image
              src={post.featured_image}
              alt={post.title}
              width={isFeature ? 1216 : 384}
              height={isFeature ? 810 : 256}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              sizes={isFeature 
                ? "(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1216px"
                : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 384px"
              }
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100" />
          )}
        </div>
        
        {/* Content */}
        <div className={`flex flex-col gap-4 ${isFeature ? 'sm:gap-5 lg:gap-6 px-1 sm:px-0' : isRelated ? 'lg:gap-6' : 'sm:gap-5 lg:gap-6 px-1 sm:px-0'}`}>
          <div className={`flex flex-col gap-2 ${isFeature ? 'sm:gap-3' : ''}`}>
            {/* Author info for featured/related cards */}
            {showAuthor && (isFeature || isRelated) && (
              <div className="flex items-center gap-2">
                <AuthorAvatar post={post} size="sm" />
                <p className={`font-semibold ${isFeature ? 'text-xs sm:text-sm' : 'text-sm'} text-blue-600`}>
                  {post.author_name} • {formatDate(post.published_at || post.created_at)}
                </p>
              </div>
            )}
            
            {/* Title */}
            <div className={`flex gap-${isFeature ? '2 sm:gap-3 lg:gap-4' : isRelated ? '3 lg:gap-4' : '2 sm:gap-3 lg:gap-4'} items-start`}>
              {isFeature ? (
                <h2 className="font-semibold text-lg sm:text-xl lg:text-2xl text-gray-900 leading-6 sm:leading-7 lg:leading-8 flex-1 group-hover:text-blue-600 transition-colors">
                  {post.title}
                </h2>
              ) : isRelated ? (
                <h3 className="font-semibold text-base lg:text-lg text-gray-900 leading-6 lg:leading-7 flex-1 group-hover:text-blue-600 transition-colors">
                  {post.title}
                </h3>
              ) : (
                <h3 className="font-semibold text-sm sm:text-base lg:text-lg text-gray-900 leading-5 sm:leading-6 lg:leading-7 flex-1 group-hover:text-blue-600 transition-colors">
                  {post.title}
                </h3>
              )}
              <ArrowUpRight className={`${isFeature ? 'w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 mt-1' : isRelated ? 'w-5 h-5 lg:w-6 lg:h-6 mt-0.5' : 'w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 mt-0.5'} text-gray-400 group-hover:text-blue-600 transition-colors flex-shrink-0`} />
            </div>
            
            {/* Excerpt */}
            {post.excerpt && (
              <p className={`text-gray-600 ${isFeature ? 'text-sm sm:text-base lg:text-base leading-5 sm:leading-6 lg:leading-6' : isRelated ? 'text-sm lg:text-base leading-5 lg:leading-6' : 'text-xs sm:text-sm lg:text-base leading-4 sm:leading-5 lg:leading-6'} line-clamp-2`}>
                {post.excerpt}
              </p>
            )}
          </div>
          
          {/* Category */}
          {showCategory && (
            <div className="flex flex-wrap gap-2">
              <CategoryBadge category={post.category} />
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
