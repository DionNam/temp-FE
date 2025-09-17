export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export interface ValidationRules {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: string) => string | null;
}

export const VALIDATION_PATTERNS = {
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  name: /^[a-zA-Z0-9\s가-힣\-_.,!?()]{2,50}$/,
  title: /^[a-zA-Z0-9\s가-힣!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{5,200}$/,
  slug: /^[a-z0-9-]{3,100}$/,
  url: /^https?:\/\/.+/,
  phone: /^[\+]?[1-9][\d]{0,15}$/,
  alphanumeric: /^[a-zA-Z0-9]+$/,
  noScript: /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
  noHtml: /<[^>]*>/g,
};

// Sanitization functions
export function sanitizeInput(input: string): string {
  if (!input) return '';
  
  return input
    .replace(/\s+/g, ' ') 
    .replace(/[<>]/g, '') 
    .slice(0, 1000);
}

export function sanitizeHtml(input: string): string {
  if (!input) return '';
  
  return input
    .replace(VALIDATION_PATTERNS.noScript, '') 
    .replace(/javascript:/gi, '') 
    .replace(/on\w+\s*=/gi, '') 
}

export function sanitizeEmail(email: string): string {
  if (!email) return '';
  
  return email
    .toLowerCase()
    .trim()
    .replace(/[^a-zA-Z0-9@._-]/g, '') 
    .slice(0, 254);
}

// Validation functions
export function validateField(
  value: string,
  fieldName: string,
  rules: ValidationRules
): string | null {
  if (!value && !rules.required) return null;
  
  if (rules.required && !value?.trim()) {
    return `${fieldName} is required`;
  }
  
  if (value && rules.minLength && value.length < rules.minLength) {
    return `${fieldName} must be at least ${rules.minLength} characters`;
  }
  
  if (value && rules.maxLength && value.length > rules.maxLength) {
    return `${fieldName} must be no more than ${rules.maxLength} characters`;
  }
  
  if (value && rules.pattern && !rules.pattern.test(value)) {
    return `${fieldName} format is invalid`;
  }
  
  if (value && rules.custom) {
    return rules.custom(value);
  }
  
  return null;
}

// Form validation schemas
export const FORM_VALIDATION_SCHEMAS = {
  blog: {
    title: {
      required: true,
      minLength: 5,
      maxLength: 200,
      pattern: VALIDATION_PATTERNS.title,
    },
    excerpt: {
      required: true,
      minLength: 10,
      maxLength: 500,
    },
    content: {
      required: true,
      minLength: 50,
      custom: (value: string) => {
        // Check content size limit (prevent oversized payloads)
        if (value.length > 1000000) { // 1MB limit for content with compressed images
          return 'Content is too large. Please reduce image sizes or content length.';
        }
        
        const textContent = value
          .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Remove scripts
          .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '') // Remove styles
          .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '') // Remove iframes
          .replace(/<object\b[^<]*(?:(?!<\/object>)<[^<]*)*<\/object>/gi, '') // Remove objects
          .replace(/<embed\b[^<]*>/gi, '') // Remove embeds
          .replace(/<link\b[^>]*>/gi, '') // Remove links
          .replace(/<meta\b[^>]*>/gi, '') // Remove meta tags
          .trim();
        
        // Check if there's meaningful content (text + images)
        const hasText = textContent.replace(/<[^>]*>/g, '').trim().length >= 20;
        const hasImages = textContent.includes('<img');
        
        if (!hasText && !hasImages) {
          return 'Content must contain at least 20 characters of text or at least one image';
        }
        
        if (hasText && textContent.replace(/<[^>]*>/g, '').trim().length < 20) {
          return 'Text content must be at least 20 characters long';
        }
        return null;
      },
    },
    author_name: {
      required: true,
      minLength: 2,
      maxLength: 50,
      pattern: VALIDATION_PATTERNS.name,
    },
    category: {
      required: true,
      minLength: 2,
      maxLength: 50,
    },
    slug: {
      required: false,
      pattern: VALIDATION_PATTERNS.slug,
    },
  },
  demo: {
    name: {
      required: true,
      minLength: 2,
      maxLength: 50,
      pattern: VALIDATION_PATTERNS.name,
    },
    email: {
      required: true,
      pattern: VALIDATION_PATTERNS.email,
      maxLength: 254,
    },
    employees: {
      required: true,
    },
    timeline: {
      required: true,
    },
    agency: {
      required: true,
    },
    agencyName: {
      required: false,
      minLength: 2,
      maxLength: 100,
      pattern: VALIDATION_PATTERNS.name,
    },
  },
};

// Main validation function
export function validateForm(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: Record<string, any>,
  schema: Record<string, ValidationRules>
): ValidationResult {
  const errors: Record<string, string> = {};
  
  for (const [fieldName, rules] of Object.entries(schema)) {
    const value = data[fieldName];
    const error = validateField(value, fieldName, rules);
    
    if (error) {
      errors[fieldName] = error;
    }
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

// Rate limiting for form submissions
const submissionAttempts = new Map<string, { count: number; lastAttempt: number }>();

export function checkRateLimit(
  identifier: string,
  maxAttempts: number = 5,
  windowMs: number = 15 * 60 * 1000 
): boolean {
  const now = Date.now();
  const attempts = submissionAttempts.get(identifier);
  
  if (!attempts) {
    submissionAttempts.set(identifier, { count: 1, lastAttempt: now });
    return true;
  }
  
  if (now - attempts.lastAttempt > windowMs) {
    submissionAttempts.set(identifier, { count: 1, lastAttempt: now });
    return true;
  }
  
  if (attempts.count >= maxAttempts) {
    return false;
  }
  
  attempts.count++;
  attempts.lastAttempt = now;
  return true;
}
