"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BlogPost } from '@/types/blog';
import { generateSlug, sortBlogPostsByDate } from '@/lib/utils';

interface RelatedArticlesProps {
  posts: BlogPost[];
  currentPostId: string;
}

const categories = {
  'news': 'News',
  'tip': 'Tips',
  'interview': 'Interview',
  'product-update': 'Product Update',
  'team': 'Team'
};

export const RelatedArticles: React.FC<RelatedArticlesProps> = ({ posts, currentPostId }) => {
  const filteredPosts = sortBlogPostsByDate(
    posts.filter(post => post.id !== currentPostId)
  ).slice(0, 3);

  if (filteredPosts.length === 0) {
    return null;
  }

  return (
    <section className="max-w-7xl w-full mx-auto mt-16 pt-16 border-t border-gray-200">
      <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Read More</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPosts.map((post) => {
          const imageUrl = post.featured_image || post.image || '/blog-placeholder.png';
          const publishDate = post.published_at || post.publishedAt || post.date;
          const formattedDate = new Date(publishDate || '').toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
          const authorName = typeof post.author === 'string' ? post.author : (post.author?.name || post.author_name);
          const categoryLabel = categories[post.category as keyof typeof categories] || post.category;
          const slug = `${generateSlug(post?.title)}-${post?.id || 'unknown'}`;

          return (
            <Link key={post.id} href={`/blog/${slug}`}>
              <article className="bg-transparent rounded-xl overflow-hidden group">
                <div className="relative h-48 w-full">
                  <Image
                    src={imageUrl}
                    alt={post.title}
                    fill
                    className="object-cover rounded-xl"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/blog-placeholder.png';
                    }}
                  />
                </div>

                <div className="py-3 sm:py-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary-blue-200 text-primary-blue-500 w-fit">
                      {categoryLabel}
                    </span>
                    <div className="flex items-center text-sm text-gray-500">
                      <span>{authorName}</span>
                      <span className="text-gray-500">•</span>
                      <span>{formattedDate}</span>
                    </div>
                  </div>

                  <h3 className="font-bold text-gray-900 mb-3 text-lg leading-tight line-clamp-2 group-hover:text-primary-blue-600 transition-colors">
                    {post.title}
                  </h3>

                  <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
                    {post.excerpt}
                  </p>
                </div>
              </article>
            </Link>
          );
        })}
      </div>
    </section>
  );
};
