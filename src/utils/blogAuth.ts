export const BLOG_AUTH_KEY = 'blog_admin_authenticated';
export const BLOG_AUTH_EXPIRY_KEY = 'blog_admin_auth_expiry';

// Authentication session duration (4 hours)
const AUTH_DURATION = 4 * 60 * 60 * 1000; // 4 hours in milliseconds

export const setBlogAuthSession = (): void => {
  const expiryTime = Date.now() + AUTH_DURATION;
  localStorage.setItem(BLOG_AUTH_KEY, 'true');
  localStorage.setItem(BLOG_AUTH_EXPIRY_KEY, expiryTime.toString());
};

export const isBlogAuthenticated = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  const isAuth = localStorage.getItem(BLOG_AUTH_KEY);
  const expiryTime = localStorage.getItem(BLOG_AUTH_EXPIRY_KEY);
  
  if (!isAuth || !expiryTime) return false;
  
  const now = Date.now();
  const expiry = parseInt(expiryTime, 10);
  
  if (now > expiry) {
    // Session expired, clear it
    clearBlogAuthSession();
    return false;
  }
  
  return isAuth === 'true';
};

export const clearBlogAuthSession = (): void => {
  if (typeof window === 'undefined') return;
  
  localStorage.removeItem(BLOG_AUTH_KEY);
  localStorage.removeItem(BLOG_AUTH_EXPIRY_KEY);
};

export const checkBlogPassword = (password: string): boolean => {
  // Fallback to default password for testing if env var is not set
  const blogPassword = process.env.NEXT_PUBLIC_BLOG_PASSWORD || 'admin123';
  return password === blogPassword;
};
