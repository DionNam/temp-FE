import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { BlogPost } from '@/types/blog'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateSlug(title: string | undefined | null): string {
  if (!title || typeof title !== 'string') {
    return 'untitled';
  }
  
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    || 'untitled';
}

export function extractIdFromSlug(slug: string | undefined | null): string | null {
  if (!slug || typeof slug !== 'string') {
    return null;
  }
  
  const uuidRegex = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i;
  const match = slug.match(uuidRegex);
  if (match) {
    return match[0];
  }
  
  return null;
}

export function validateBlogPost(post: Partial<BlogPost>): BlogPost {
  return {
    id: post.id || 'unknown-id',
    title: post.title || 'Untitled Post',
    excerpt: post.excerpt || 'No excerpt available',
    content: post.content || '',
    slug: post.slug || generateSlug(post.title || 'untitled'),
    author_id: post.author_id,
    author_name: post.author_name || 'Unknown Author',
    category: post.category || 'uncategorized',
    featured_image: post.featured_image,
    meta_description: post.meta_description,
    published: post.published ?? false,
    published_at: post.published_at,
    seo_title: post.seo_title,
    seo_description: post.seo_description,
    seo_keywords: post.seo_keywords,
    og_image: post.og_image,
    jsonld_data: post.jsonld_data,
    tags: post.tags || [],
    created_at: post.created_at || new Date().toISOString(),
    updated_at: post.updated_at || new Date().toISOString(),
    image: post.image,
    date: post.date,
    metaDescription: post.metaDescription,
    publishedAt: post.publishedAt,
    updatedAt: post.updatedAt,
    author: post.author,
    seo: post.seo
  };
}

