import { MetadataRoute } from 'next'

// Function to fetch blog posts for sitemap
async function getBlogPosts() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://stg-landing.showon.ai/api/v1'}/blogs?published=true&limit=100`, {
      cache: 'no-store'
    });
    
    if (!response.ok) {
      console.error('Failed to fetch blog posts for sitemap');
      return [];
    }
    
    const data = await response.json();
    return data.data?.blogs || [];
  } catch (error) {
    console.error('Error fetching blog posts for sitemap:', error);
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://showonai.com'
  
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/onboarding`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/report`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/waitlist-confirmation`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ];

  // Dynamic blog posts
  const blogPosts = await getBlogPosts();
  const blogPages: MetadataRoute.Sitemap = blogPosts.map((post: any) => ({
    url: `${baseUrl}/blog/${post.slug || post.id}`,
    lastModified: new Date(post.updated_at || post.published_at || post.created_at),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  return [...staticPages, ...blogPages];
}