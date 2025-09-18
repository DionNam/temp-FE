// Blog configuration
export const BLOG_CONFIG = {
  // Blog categories - easily configurable
  categories: [
    'Content Marketing',
    'Data and Research', 
    'Case Study'
  ],
  
  // Default category for new posts
  defaultCategory: 'Content Marketing',
  
  // Posts per page
  postsPerPage: 9,
  
  // Related posts count
  relatedPostsCount: 3,
} as const;

// Helper function to get categories
export const getBlogCategories = () => {
  // Try to get from environment variable first (if set)
  const envCategories = process.env.NEXT_PUBLIC_BLOG_CATEGORIES;
  if (envCategories) {
    return envCategories.split(',').map(cat => cat.trim());
  }
  
  // Fall back to config
  return BLOG_CONFIG.categories;
};

// Helper function to validate category
export const isValidCategory = (category: string): boolean => {
  const categories = getBlogCategories() as string[];
  return categories.includes(category);
};

// Helper function to get category display name
export const getCategoryDisplayName = (category: string): string => {
  return category;
};

// Helper function to get category slug
export const getCategorySlug = (category: string): string => {
  return category.toLowerCase().replace(/\s+/g, '-');
};
