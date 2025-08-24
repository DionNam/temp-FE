import { NextRequest, NextResponse } from 'next/server';
import { BlogCacheManager } from '@/lib/cache';

export async function POST(request: NextRequest) {
  try {
    const { blogId, slug } = await request.json();
    
    if (!blogId) {
      return NextResponse.json({ error: 'Blog ID is required' }, { status: 400 });
    }

    BlogCacheManager.invalidateBlog(blogId, slug);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Cache invalidation error:', error);
    return NextResponse.json({ error: 'Failed to invalidate cache' }, { status: 500 });
  }
}
