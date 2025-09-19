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
  RelatedBlogsResponse,
  CreateBlogRequest, 
  UpdateBlogRequest,
  CreateAuthorRequest,
  UpdateAuthorRequest,
  AuthorBlogsResponse
} from '@/types/blog';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api/v1';

async function apiRequest<T>(
  endpoint: string, 
  options?: RequestInit
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const response = await fetch(url, {
    method: options?.method || 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...options?.headers,
    },
    ...options,
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
    return apiRequest<BlogListResponse>(endpoint);
  },

  getBlog: (id: string): Promise<BlogResponse> => {
    return apiRequest<BlogResponse>(`/blogs/${id}`);
  },

  getBlogBySlug: (slug: string): Promise<BlogPost> => {
    return apiRequest<{ data: BlogPost }>(`/blogs/slug/${slug}`).then(response => response.data);
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

  getRelatedBlogs: (id: string): Promise<RelatedBlogsResponse> => {
    return apiRequest<RelatedBlogsResponse>(`/blogs/${id}/related`);
  },

  getCategories: (): Promise<CategoriesResponse> => {
    return apiRequest<CategoriesResponse>('/blog-categories');
  },

  getTags: (): Promise<TagsResponse> => {
    return apiRequest<TagsResponse>('/blog-tags');
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

export interface PresignedUploadRequest {
  slug: string;
  kind: 'featured' | 'avatar';
  filename: string;
  content_type: string;
  file_size?: number;
  expiry_seconds?: number;
}

export interface PresignedUploadResponse {
  key: string;
  upload_url: string;
  public_url: string;
}

export const storageApi = {
  getPresignedUploadUrl: (data: PresignedUploadRequest): Promise<PresignedUploadResponse> => {
    return apiRequest<PresignedUploadResponse>('/storage/presign-upload', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
};
