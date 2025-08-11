export interface BlogCategory {
  id: string;
  name: string;
  label: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  category: string;
  image: string;
  slug: string;
}

export const blogData: BlogPost[] = [
  {
    id: '1',
    title: '2025년 SEO의 미래: AI가 주도하는 검색 최적화의 대전환',
    excerpt: '더 이상 검색엔진만을 위한 콘텐츠는 통하지 않습니다. ChatGPT, Perplexity, Gemini 같은 생성형 AI 플랫폼에 최적화된 \'GEO (Generative Engine Optimization)\' 전략이 새로운 SEO의 기준이 되고 있습니다.',
    author: '정하늘',
    date: '2025년 7월 12일',
    category: 'news',
    image: '/blog-placeholder.png',
    slug: '2025-seo-future'
  },
  {
    id: '2',
    title: 'AI 시대의 SEO 전략: 키워드에서 의도 중심으로',
    excerpt: '검색 알고리즘이 점점 똑똑해지면서, SEO의 핵심은 더 이상 \'키워드 밀도\'가 아닙니다. 사용자 의도를 이해하는 콘텐츠가 중요해졌습니다.',
    author: '정유진',
    date: '2025년 7월 5일',
    category: 'tip',
    image: '/blog-placeholder.png',
    slug: 'ai-seo-strategy'
  },
  {
    id: '3',
    title: 'ChatGPT 시대, SEO는 어떻게 달라지는가?',
    excerpt: '생성형 AI의 등장으로 정보 탐색 방식이 바뀌고 있습니다. SEO 전문가들은 이제 \'검색\'이 아닌 \'응답\'을 위한 최적화를 고민해야 합니다.',
    author: '이현우',
    date: '2025년 7월 17일',
    category: 'news',
    image: '/blog-placeholder.png',
    slug: 'chatgpt-seo-changes'
  },
  {
    id: '4',
    title: '로컬 SEO의 새로운 패러다임: AI 기반 지역 검색 최적화',
    excerpt: '지역 기반 검색에서 AI의 역할이 커지고 있습니다. 사용자의 위치와 맥락을 이해하는 지능형 로컬 SEO 전략을 알아봅니다.',
    author: '김민수',
    date: '2025년 7월 10일',
    category: 'tip',
    image: '/blog-placeholder.png',
    slug: 'local-seo-paradigm'
  },
  {
    id: '5',
    title: 'ShowOnAI CEO 인터뷰: AI SEO의 미래와 비전',
    excerpt: 'ShowOnAI의 CEO와 함께 AI 기반 SEO 플랫폼의 비전과 국내 시장에서의 전략에 대해 이야기를 나눠봅니다.',
    author: '박지영',
    date: '2025년 7월 15일',
    category: 'interview',
    image: '/blog-placeholder.png',
    slug: 'showonai-ceo-interview'
  },
  {
    id: '6',
    title: 'ShowOnAI v2.0 업데이트: 새로운 AI 분석 기능 소개',
    excerpt: 'ShowOnAI의 새로운 버전에서 추가된 AI 기반 키워드 분석과 경쟁사 모니터링 기능을 자세히 살펴봅니다.',
    author: 'ShowOnAI Team',
    date: '2025년 7월 8일',
    category: 'product-update',
    image: '/blog-placeholder.png',
    slug: 'showonai-v2-update'
  },
  {
    id: '7',
    title: '콘텐츠 마케팅과 SEO의 융합: AI 시대의 새로운 접근법',
    excerpt: 'AI가 콘텐츠를 이해하는 방식이 바뀌면서, 콘텐츠 마케팅과 SEO의 경계가 모호해지고 있습니다. 새로운 접근법을 알아봅니다.',
    author: '최서연',
    date: '2025년 7월 3일',
    category: 'tip',
    image: '/blog-placeholder.png',
    slug: 'content-marketing-seo-fusion'
  },
  {
    id: '8',
    title: '글로벌 SEO 전문가 인터뷰: 한국 시장의 특수성과 기회',
    excerpt: '글로벌 SEO 전문가와 함께 한국 시장의 특수성과 AI 기반 SEO에서의 기회에 대해 이야기를 나눠봅니다.',
    author: '이준호',
    date: '2025년 7월 20일',
    category: 'interview',
    image: '/blog-placeholder.png',
    slug: 'global-seo-expert-interview'
  }
]; 

export type BlogDetailSection =
  | {
      type: 'hero';
      title: string;
      subtitle: string;
      metadata: {
        category: string;
        author: string;
        date: string;
      };
    }
  | {
      type: 'image';
      image: string;
      overlayText: string;
      subtitle: string;
      watermark: string;
    }
  | {
      type: 'text';
      content: string;
      highlight?: string;
    }
  | {
      type: 'heading';
      title: string;
    }
  | {
      type: 'comparison';
      image: string;
      cards: {
        title: string;
        icon: string;
        description: string;
        color: string;
      }[];
      note?: string; 
    };

export type BlogDetail = {
  title: string;
  excerpt: string;
  author: string;
  date: string;
  category: string;
  image: string;
  heroImage: string;
  content: {
    sections: BlogDetailSection[];
  };
};