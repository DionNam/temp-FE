import { NextResponse } from 'next/server';
import { BlogCacheManager } from '@/lib/cache';

export async function POST() {
  try {
    BlogCacheManager.invalidateAllBlogs();
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Cache invalidation error:', error);
    return NextResponse.json({ error: 'Failed to invalidate cache' }, { status: 500 });
  }
}
