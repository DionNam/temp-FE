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

export interface CreateBlogRequest {
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author_id?: string;
  author_name: string;
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

// Legacy dummy data - no longer used in production
/* export const blogData: BlogPost[] = [
  {
    id: '1',
    title: '2025년 SEO의 미래: AI가 주도하는 검색 최적화의 대전환',
    excerpt: '더 이상 검색엔진만을 위한 콘텐츠는 통하지 않습니다. ChatGPT, Perplexity, Gemini 같은 생성형 AI 플랫폼에 최적화된 \'GEO (Generative Engine Optimization)\' 전략이 새로운 SEO의 기준이 되고 있습니다.',
    author_name: '정하늘',
    author: {
      id: '1',
      name: '정하늘',
      bio: 'AI 기반 SEO 전문가이자 ShowOnAI의 콘텐츠 전략가',
      avatar: '/avatar-placeholder.png'
    },
    date: '2025년 7월 12일',
    category: 'news',
    image: '/blog-placeholder.png',
    featured_image: '/blog-placeholder.png',
    slug: '2025-seo-future',
    published: true,
    published_at: '2025년 7월 12일',
    created_at: '2025-07-12T00:00:00Z',
    updated_at: '2025-07-12T00:00:00Z',
    content: `
      <h1>2025년 SEO의 미래: AI가 주도하는 검색 최적화의 대전환</h1>
      
      <p>기존의 검색엔진을 위한 콘텐츠만으로는 부족합니다. <strong>ChatGPT, Perplexity, Gemini</strong>와 같은 AI 플랫폼을 위한 새로운 표준인 'GEO(Generative Engine Optimization)'가 등장했습니다.</p>
      
      <h2>SEO에서 GEO로: 새로운 최적화 방식의 등장</h2>
      
      <p>SEO는 키워드 중심이었지만, 생성형 AI는 직접적인 답변을 제공합니다. GEO는 AI가 인용할 수 있도록 콘텐츠를 최적화하는 방식입니다.</p>
      
      <ul>
        <li>자연스러운 언어로 질문에 답변하는 콘텐츠 구조</li>
        <li>전문성과 신뢰성을 보여주는 상세한 설명</li>
        <li>명확하고 구조화된 정보 제공</li>
      </ul>
      
      <blockquote>
        <p>"2025년, 검색은 클릭이 아니라 '응답'으로 이뤄집니다."</p>
      </blockquote>
      
      <h2>GEO 최적화 전략</h2>
      
      <p>AI가 콘텐츠를 참조할 수 있도록 하는 전략은 다음과 같습니다:</p>
      
      <ol>
        <li><strong>질문 중심의 콘텐츠 작성</strong>: 사용자가 실제로 묻는 질문에 직접 답변</li>
        <li><strong>구조화된 데이터 활용</strong>: JSON-LD를 통한 의미론적 마크업</li>
        <li><strong>전문성 입증</strong>: 출처, 인용, 전문가 정보 명시</li>
      </ol>
      
      <h2>결론: SEO의 진화는 계속된다</h2>
      
      <p>SEO는 GEO와 같은 새로운 형태로 진화하고 있습니다. 클릭이 아닌 AI 응답을 위한 콘텐츠가 필요합니다.</p>
    `,
    publishedAt: '2025년 7월 12일',
    metaDescription: '2025년 SEO의 미래와 AI가 주도하는 GEO(Generative Engine Optimization) 전략에 대해 알아보세요.',
    tags: ['SEO', 'AI', 'GEO', '검색최적화', '2025년'],
    seo: {
      title: '2025년 SEO의 미래: AI가 주도하는 검색 최적화 | ShowOnAI',
      description: '기존 SEO를 넘어선 GEO(Generative Engine Optimization) 전략으로 AI 시대의 검색 최적화를 준비하세요.',
      keywords: ['SEO', 'AI', 'GEO', 'Generative Engine Optimization', '검색최적화', 'ChatGPT', 'AI 마케팅']
    }
  },
  {
    id: '2',
    title: 'AI 시대의 SEO 전략: 키워드에서 의도 중심으로',
    excerpt: '검색 알고리즘이 점점 똑똑해지면서, SEO의 핵심은 더 이상 \'키워드 밀도\'가 아닙니다. 사용자 의도를 이해하는 콘텐츠가 중요해졌습니다.',
    author_name: '정유진',
    author: '정유진',
    date: '2025년 7월 5일',
    category: 'tip',
    image: '/blog-placeholder.png',
    featured_image: '/blog-placeholder.png',
    slug: 'ai-seo-strategy',
    published: true,
    published_at: '2025년 7월 5일',
    created_at: '2025-07-05T00:00:00Z',
    updated_at: '2025-07-05T00:00:00Z',
    content: ''
  },
  {
    id: '3',
    title: 'ChatGPT 시대, SEO는 어떻게 달라지는가?',
    excerpt: '생성형 AI의 등장으로 정보 탐색 방식이 바뀌고 있습니다. SEO 전문가들은 이제 \'검색\'이 아닌 \'응답\'을 위한 최적화를 고민해야 합니다.',
    author_name: '이현우',
    author: '이현우',
    date: '2025년 7월 17일',
    category: 'news',
    image: '/blog-placeholder.png',
    featured_image: '/blog-placeholder.png',
    slug: 'chatgpt-seo-changes',
    published: true,
    published_at: '2025년 7월 17일',
    created_at: '2025-07-17T00:00:00Z',
    updated_at: '2025-07-17T00:00:00Z',
    content: ''
  },
  {
    id: '4',
    title: '로컬 SEO의 새로운 패러다임: AI 기반 지역 검색 최적화',
    excerpt: '지역 기반 검색에서 AI의 역할이 커지고 있습니다. 사용자의 위치와 맥락을 이해하는 지능형 로컬 SEO 전략을 알아봅니다.',
    author_name: '김민수',
    author: '김민수',
    date: '2025년 7월 10일',
    category: 'tip',
    image: '/blog-placeholder.png',
    featured_image: '/blog-placeholder.png',
    slug: 'local-seo-paradigm',
    published: true,
    published_at: '2025년 7월 10일',
    created_at: '2025-07-10T00:00:00Z',
    updated_at: '2025-07-10T00:00:00Z',
    content: ''
  },
  {
    id: '5',
    title: 'ShowOnAI CEO 인터뷰: AI SEO의 미래와 비전',
    excerpt: 'ShowOnAI의 CEO와 함께 AI 기반 SEO 플랫폼의 비전과 국내 시장에서의 전략에 대해 이야기를 나눠봅니다.',
    author_name: '박지영',
    author: '박지영',
    date: '2025년 7월 15일',
    category: 'interview',
    image: '/blog-placeholder.png',
    featured_image: '/blog-placeholder.png',
    slug: 'showonai-ceo-interview',
    published: true,
    published_at: '2025년 7월 15일',
    created_at: '2025-07-15T00:00:00Z',
    updated_at: '2025-07-15T00:00:00Z',
    content: ''
  },
  {
    id: '6',
    title: 'ShowOnAI v2.0 업데이트: 새로운 AI 분석 기능 소개',
    excerpt: 'ShowOnAI의 새로운 버전에서 추가된 AI 기반 키워드 분석과 경쟁사 모니터링 기능을 자세히 살펴봅니다.',
    author_name: 'ShowOnAI Team',
    author: 'ShowOnAI Team',
    date: '2025년 7월 8일',
    category: 'product-update',
    image: '/blog-placeholder.png',
    featured_image: '/blog-placeholder.png',
    slug: 'showonai-v2-update',
    published: true,
    published_at: '2025년 7월 8일',
    created_at: '2025-07-08T00:00:00Z',
    updated_at: '2025-07-08T00:00:00Z',
    content: ''
  },
  {
    id: '7',
    title: '콘텐츠 마케팅과 SEO의 융합: AI 시대의 새로운 접근법',
    excerpt: 'AI가 콘텐츠를 이해하는 방식이 바뀌면서, 콘텐츠 마케팅과 SEO의 경계가 모호해지고 있습니다. 새로운 접근법을 알아봅니다.',
    author_name: '최서연',
    author: '최서연',
    date: '2025년 7월 3일',
    category: 'tip',
    image: '/blog-placeholder.png',
    featured_image: '/blog-placeholder.png',
    slug: 'content-marketing-seo-fusion',
    published: true,
    published_at: '2025년 7월 3일',
    created_at: '2025-07-03T00:00:00Z',
    updated_at: '2025-07-03T00:00:00Z',
    content: ''
  },
  {
    id: '8',
    title: '글로벌 SEO 전문가 인터뷰: 한국 시장의 특수성과 기회',
    excerpt: '글로벌 SEO 전문가와 함께 한국 시장의 특수성과 AI 기반 SEO에서의 기회에 대해 이야기를 나눠봅니다.',
    author_name: '이준호',
    author: '이준호',
    date: '2025년 7월 20일',
    category: 'interview',
    image: '/blog-placeholder.png',
    featured_image: '/blog-placeholder.png',
    slug: 'global-seo-expert-interview',
    published: true,
    published_at: '2025년 7월 20일',
    created_at: '2025-07-20T00:00:00Z',
    updated_at: '2025-07-20T00:00:00Z',
    content: ''
  }
]; */