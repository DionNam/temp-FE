// Shared types for blog components
export interface BlogPost {
  id: string;
  title: string;
  content?: string;
  excerpt?: string;
  category: string;
  author_name: string;
  author_email?: string;
  avatar?: string;
  author?: { avatar?: string } | string; // For backward compatibility
  slug?: string;
  featured_image?: string;
  published_at?: string;
  created_at: string;
}

export interface CategoryColor {
  bg: string;
  border: string;
  text: string;
}

export interface CategoryColors {
  [key: string]: CategoryColor;
}
