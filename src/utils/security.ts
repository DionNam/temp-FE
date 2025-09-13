/**
 * Security utilities for content sanitization and validation
 */

export const SECURITY_CONFIG = {
  // Maximum allowed content size
  MAX_CONTENT_SIZE: 10 * 1024 * 1024, // 10MB
  
  // Allowed image formats
  ALLOWED_IMAGE_TYPES: [
    'image/jpeg',
    'image/jpg', 
    'image/png',
    'image/webp',
    'image/gif'
  ],
  
  // Blocked file types
  BLOCKED_TYPES: [
    'image/svg+xml', // Can contain scripts
    'application/javascript',
    'text/javascript',
    'application/x-javascript'
  ],
  
  // Maximum dimensions
  MAX_IMAGE_DIMENSIONS: {
    width: 1920,
    height: 1080
  }
};

/**
 * Validate if a file type is allowed
 */
export function isAllowedImageType(mimeType: string): boolean {
  return SECURITY_CONFIG.ALLOWED_IMAGE_TYPES.includes(mimeType);
}

/**
 * Validate if a file type is blocked
 */
export function isBlockedFileType(mimeType: string): boolean {
  return SECURITY_CONFIG.BLOCKED_TYPES.includes(mimeType);
}

/**
 * Sanitize filename to prevent path traversal
 */
export function sanitizeFilename(filename: string): string {
  return filename
    .replace(/[^a-zA-Z0-9._-]/g, '_')
    .replace(/\.{2,}/g, '.')
    .slice(0, 255);
}

/**
 * Validate Base64 data URL format
 */
export function isValidDataImageUrl(url: string): boolean {
  if (!url.startsWith('data:image/')) return false;
  
  // Check for valid image format
  const validFormats = ['jpeg', 'jpg', 'png', 'webp', 'gif'];
  const formatMatch = url.match(/^data:image\/([^;]+);base64,/);
  
  if (!formatMatch) return false;
  
  const format = formatMatch[1].toLowerCase();
  if (!validFormats.includes(format)) return false;
  
  // Check size limit
  if (url.length > SECURITY_CONFIG.MAX_CONTENT_SIZE) return false;
  
  return true;
}

/**
 * Content Security Policy for blog content
 */
export const CSP_DIRECTIVES = {
  'default-src': ["'self'"],
  'script-src': ["'self'", "'unsafe-inline'"], // TipTap needs unsafe-inline
  'style-src': ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
  'img-src': ["'self'", "data:", "https:"],
  'font-src': ["'self'", "https://fonts.gstatic.com"],
  'connect-src': ["'self'"],
  'frame-src': ["'none'"],
  'object-src': ["'none'"],
  'base-uri': ["'self'"],
  'form-action': ["'self'"]
};

/**
 * Generate CSP header string
 */
export function generateCSPHeader(): string {
  return Object.entries(CSP_DIRECTIVES)
    .map(([directive, sources]) => `${directive} ${sources.join(' ')}`)
    .join('; ');
}
