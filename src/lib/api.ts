import { 
  BlogPost, 
  BlogAuthor, 
  BlogListParams, 
  BlogListResponse,
  BlogResponse,
  UpdateBlogResponse,
  DeleteBlogResponse,
  CategoriesResponse,
  TagsResponse,
  CreateBlogRequest, 
  UpdateBlogRequest,
  CreateAuthorRequest,
  UpdateAuthorRequest,
  AuthorBlogsResponse
} from '@/types/blog';

const getApiBaseUrl = () => {
  if (typeof window === 'undefined') {
    return process.env.NEXT_PUBLIC_API_URL || '/api/v1';
  }
  return '/api/v1';
};

async function apiRequest<T>(
  endpoint: string, 
  options?: RequestInit & { 
    revalidate?: number;
    tags?: string[];
  }
): Promise<T> {
  const baseUrl = getApiBaseUrl();
  const url = `${baseUrl}${endpoint}`;
  const { revalidate, tags, ...fetchOptions } = options || {};
  
  const response = await fetch(url, {
    method: fetchOptions?.method || 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...fetchOptions?.headers,
    },
    next: revalidate || tags ? {
      revalidate,
      tags,
    } : undefined,
    ...fetchOptions,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return data;
}

export const blogApi = {
  getBlogs: (params?: BlogListParams): Promise<BlogListResponse> => {
    const searchParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          searchParams.append(key, value.toString());
        }
      });
    }
    const query = searchParams.toString();
    const endpoint = `/blogs${query ? `?${query}` : ''}`;
    return apiRequest<BlogListResponse>(endpoint, {
      revalidate: 300,
      tags: ['blogs', 'blog-list']
    });
  },

  getBlog: (id: string): Promise<BlogResponse> => {
    return apiRequest<BlogResponse>(`/blogs/${id}`, {
      revalidate: 600,
      tags: ['blogs', 'blog-detail', `blog-${id}`]
    });
  },

  getBlogBySlug: (slug: string): Promise<BlogPost> => {
    return apiRequest<BlogPost>(`/blogs/slug/${slug}`, {
      revalidate: 600,
      tags: ['blogs', 'blog-detail', `blog-slug-${slug}`]
    });
  },

  createBlog: (data: CreateBlogRequest): Promise<BlogPost> => {
    return apiRequest<BlogPost>('/blogs', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  updateBlog: (id: string, data: Partial<UpdateBlogRequest>): Promise<UpdateBlogResponse> => {
    return apiRequest<UpdateBlogResponse>(`/blogs/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  deleteBlog: (id: string): Promise<DeleteBlogResponse> => {
    return apiRequest<DeleteBlogResponse>(`/blogs/${id}`, {
      method: 'DELETE',
    });
  },

  getRelatedBlogs: (id: string): Promise<BlogPost[]> => {
    return apiRequest<BlogPost[]>(`/blogs/${id}/related`, {
      revalidate: 900,
      tags: ['blogs', 'related-blogs', `blog-${id}`]
    });
  },

  getCategories: (): Promise<CategoriesResponse> => {
    return apiRequest<CategoriesResponse>('/blog-categories', {
      revalidate: 3600,
      tags: ['categories']
    });
  },

  getTags: (): Promise<TagsResponse> => {
    return apiRequest<TagsResponse>('/blog-tags', {
      revalidate: 3600,
      tags: ['tags']
    });
  },
};

export const authorApi = {
  getAuthors: (): Promise<BlogAuthor[]> => {
    return apiRequest<BlogAuthor[]>('/blog-authors');
  },

  getAuthor: (id: string): Promise<BlogAuthor> => {
    return apiRequest<BlogAuthor>(`/blog-authors/${id}`);
  },

  createAuthor: (data: CreateAuthorRequest): Promise<BlogAuthor> => {
    return apiRequest<BlogAuthor>('/blog-authors', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  updateAuthor: (id: string, data: Partial<UpdateAuthorRequest>): Promise<BlogAuthor> => {
    return apiRequest<BlogAuthor>(`/blog-authors/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  deleteAuthor: (id: string): Promise<void> => {
    return apiRequest<void>(`/blog-authors/${id}`, {
      method: 'DELETE',
    });
  },

  getAuthorBlogs: (id: string, params?: BlogListParams): Promise<AuthorBlogsResponse> => {
    const searchParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          searchParams.append(key, value.toString());
        }
      });
    }
    const query = searchParams.toString();
    return apiRequest<AuthorBlogsResponse>(`/blog-authors/${id}/blogs${query ? `?${query}` : ''}`);
  },
};
