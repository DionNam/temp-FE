export interface BlogCategory {
  id: string;
  name: string;
  label: string;
}

export interface JSONLDData {
  "@context": string;
  "@type": string;
  headline: string;
  description: string;
  author?: {
    "@type": string;
    name: string;
  };
  datePublished?: string;
  dateModified?: string;
  mainEntityOfPage?: {
    "@type": string;
    "@id": string;
  };
  publisher?: {
    "@type": string;
    name: string;
  };
  image?: string;
}

export interface BlogAuthor {
  id: string;
  name: string;
  email?: string;
  bio?: string;
  avatar?: string;
  url?: string;
  created_at?: string;
  updated_at?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  slug: string;
  author_id?: string;
  author_name: string;
  avatar?: string;
  category: string;
  featured_image?: string;
  meta_description?: string;
  published: boolean;
  published_at?: string;
  seo_title?: string;
  seo_description?: string;
  seo_keywords?: string;
  og_image?: string;
  jsonld_data?: JSONLDData;
  
  tags?: string[];
  created_at: string;
  updated_at: string;

  image?: string;
  date?: string;
  metaDescription?: string;
  publishedAt?: string;
  updatedAt?: string;
  author?: BlogAuthor | string;
  seo?: {
    title?: string;
    description?: string;
    keywords?: string[];
    ogImage?: string;
  };
}

export interface BlogListParams {
  page?: number;
  limit?: number;
  category?: string;
  tag?: string;
  search?: string;
  published?: boolean;
  author_id?: string;
}

export interface BlogListResponse {
  data: {
    blogs: BlogPost[];
    total: number;
    page: number;
    limit: number;
    total_pages: number;
  };
  success: boolean;
}

export interface BlogResponse {
  data: BlogPost;
  success: boolean;
}

export interface UpdateBlogResponse {
  success: boolean;
  message: string;
  data: BlogPost;
}

export interface DeleteBlogResponse {
  success: boolean;
  message: string;
}

export interface CategoriesResponse {
  data: string[];
  success: boolean;
}

export interface TagsResponse {
  data: string[];
  success: boolean;
}

export interface RelatedBlogsResponse {
  data: BlogPost[];
  success: boolean;
}

export interface CreateBlogRequest {
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author_id?: string;
  author_name: string;
  avatar?: string;
  featured_image?: string;
  meta_description?: string;
  published?: boolean;
  tags?: string[];
}

export interface UpdateBlogRequest extends Partial<CreateBlogRequest> {
  id: string;
}

export interface CreateAuthorRequest {
  name: string;
  email?: string;
  bio?: string;
  avatar?: string;
  url?: string;
}

export interface UpdateAuthorRequest extends Partial<CreateAuthorRequest> {
  id: string;
}

export interface AuthorBlogsResponse {
  data: {
    blogs: BlogPost[];
    total: number;
    page: number;
    limit: number;
    total_pages: number;
  };
  success: boolean;
}

export interface BlogFormData {
  title: string;
  excerpt: string;
  content: string;
  category: string;
  image?: string;
  metaDescription?: string;
  tags?: string[];
}
