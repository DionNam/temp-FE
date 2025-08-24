import { revalidatePath, revalidateTag } from 'next/cache';

export class BlogCacheManager {
  static invalidateAllBlogs() {
    revalidateTag('blogs');
    revalidateTag('blog-list');
    revalidateTag('blog-detail');
    revalidatePath('/blog');
  }

  static invalidateBlog(id: string, slug?: string) {
    revalidateTag(`blog-${id}`);
    if (slug) {
      revalidateTag(`blog-slug-${slug}`);
    }
    revalidateTag('blog-detail');
    revalidateTag('blog-list');
    revalidatePath('/blog');
  }

  static invalidateCategories() {
    revalidateTag('categories');
    revalidatePath('/blog');
  }

  static invalidateTags() {
    revalidateTag('tags');
    revalidatePath('/blog');
  }
}

export const invalidateBlogCache = async (blogId?: string) => {
  try {
    if (blogId) {
      await fetch(`/api/cache/invalidate-blog`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ blogId }),
      });
    } else {
      await fetch(`/api/cache/invalidate-all-blogs`, {
        method: 'POST',
      });
    }
  } catch (error) {
    console.error('Failed to invalidate cache:', error);
  }
};
