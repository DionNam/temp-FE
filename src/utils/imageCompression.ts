import { SECURITY_CONFIG, isAllowedImageType, isBlockedFileType } from './security';

export interface CompressionOptions {
  maxSizeMB?: number;
  maxWidth?: number;
  maxHeight?: number;
  quality?: number;
  format?: 'webp' | 'jpeg' | 'png';
}

const DEFAULT_OPTIONS: CompressionOptions = {
  maxSizeMB: 5,
  maxWidth: SECURITY_CONFIG.MAX_IMAGE_DIMENSIONS.width,
  maxHeight: SECURITY_CONFIG.MAX_IMAGE_DIMENSIONS.height,
  quality: 0.8,
  format: 'webp'
};


export const compressImage = async (
  file: File, 
  options: CompressionOptions = {}
): Promise<string> => {
  const opts = { ...DEFAULT_OPTIONS, ...options };

  if (!file.type.startsWith('image/')) {
    throw new Error('File must be an image');
  }

  if (isBlockedFileType(file.type)) {
    throw new Error('This file type is not allowed for security reasons');
  }

  if (!isAllowedImageType(file.type)) {
    throw new Error('Only JPEG, PNG, WebP, and GIF images are allowed');
  }

  if (file.size > opts.maxSizeMB! * 1024 * 1024) {
    throw new Error(`File size must be less than ${opts.maxSizeMB}MB`);
  }

  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    if (!ctx) {
      reject(new Error('Canvas context not available'));
      return;
    }

    const img = new Image();
    // Hint: drawing onto canvas and re-encoding strips EXIF/metadata
    (ctx as CanvasRenderingContext2D).imageSmoothingEnabled = true;
    (ctx as CanvasRenderingContext2D).imageSmoothingQuality = 'high';
    
    img.onload = () => {
      try {
        let { width, height } = img;
        
        if (width > opts.maxWidth!) {
          height = (height * opts.maxWidth!) / width;
          width = opts.maxWidth!;
        }
        
        if (height > opts.maxHeight!) {
          width = (width * opts.maxHeight!) / height;
          height = opts.maxHeight!;
        }

        canvas.width = width;
        canvas.height = height;

        ctx.drawImage(img, 0, 0, width, height);

        const mimeType = `image/${opts.format}`;
        canvas.toBlob(
          (blob) => {
            if (blob) {
              const reader = new FileReader();
              reader.onload = () => {
                const result = reader.result as string;
                
                if (result.length > opts.maxSizeMB! * 1024 * 1024 * 1.33) { // Base64 is ~33% larger
                  reject(new Error(`Compressed image is still too large. Please use a smaller image.`));
                  return;
                }
                
                resolve(result);
              };
              reader.onerror = () => reject(new Error('Failed to read compressed image'));
              reader.readAsDataURL(blob);
            } else {
              reject(new Error('Failed to compress image'));
            }
          },
          mimeType,
          opts.quality
        );
      } catch (error) {
        reject(new Error(`Image processing failed: ${error}`));
      } finally {
        // Revoke object URL to avoid memory leaks
        URL.revokeObjectURL(img.src);
      }
    };

    img.onerror = () => reject(new Error('Failed to load image'));
    img.src = URL.createObjectURL(file);
  });
};


export const validateImageFile = (file: File, maxSizeMB: number = 5): boolean => {
  if (!file.type.startsWith('image/')) {
    return false;
  }

  if (file.size > maxSizeMB * 1024 * 1024) {
    return false;
  }

  return true;
};


export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};
