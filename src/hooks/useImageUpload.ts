import { useState } from 'react';
import { uploadFileToStorage } from '@/services/storageService';

interface TemporaryImage {
  file: File;
  uploadedUrl?: string;
  isUploading?: boolean;
  progress?: number;
  error?: string;
}

interface UseImageUploadProps {
  type: 'featured' | 'avatar';
  formData: {
    slug?: string;
    title?: string;
    author_name?: string;
  };
  onImageUploaded: (url: string) => void;
  onError: (message: string) => void;
}

export function useImageUpload({
  type,
  formData,
  onImageUploaded,
  onError
}: UseImageUploadProps) {
  const [temporaryImage, setTemporaryImage] = useState<TemporaryImage | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const validateFile = (file: File): boolean => {
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      onError("Image file size must be less than 10MB. Please select a smaller image.");
      return false;
    }

    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      onError("Only image files are allowed (jpeg, png, webp, gif).");
      return false;
    }

    return true;
  };

  const startBackgroundUpload = async (file: File) => {
    try {
      const slug = type === 'featured' 
        ? (formData.slug || (formData.title ? formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') : 'untitled'))
        : (formData.slug || (formData.author_name ? formData.author_name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') : 'author'));

      const uploadedUrl = await uploadFileToStorage({
        file,
        slug,
        kind: type
      });

      // Update state with AWS URL
      setTemporaryImage(prev => prev ? {
        ...prev,
        uploadedUrl,
        isUploading: false,
        progress: 100,
        error: undefined
      } : null);

      onImageUploaded(uploadedUrl);
    } catch {
      // Handle upload error
      setTemporaryImage(prev => prev ? {
        ...prev,
        isUploading: false,
        error: "Upload failed. Please try again."
      } : null);
      onError("Failed to upload image. Please try again.");
    }
  };

  const handleImageSelect = (file: File) => {
    if (!validateFile(file)) {
      return;
    }

    setTemporaryImage({ 
      file, 
      isUploading: true, 
      progress: 0,
      error: undefined 
    });

    // Start background upload
    startBackgroundUpload(file);
  };

  const handleRetryUpload = (file: File) => {
    setTemporaryImage(prev => prev ? {
      ...prev,
      isUploading: true,
      error: undefined
    } : null);

    startBackgroundUpload(file);
  };

  const handleImageRemove = () => {
    setTemporaryImage(null);
    onImageUploaded("");
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    const files = Array.from(e.dataTransfer.files);
    
    if (files.length === 0) {
      onError("Please drop a file");
      return;
    }
    
    const imageFile = files[0];
    handleImageSelect(imageFile);
  };

  const getUploadedUrl = (): string | undefined => {
    return temporaryImage?.uploadedUrl;
  };

  const isUploading = (): boolean => {
    return temporaryImage?.isUploading || false;
  };

  const hasError = (): boolean => {
    return !!temporaryImage?.error;
  };

  return {
    temporaryImage,
    isDragOver,
    handleImageSelect,
    handleRetryUpload,
    handleImageRemove,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    getUploadedUrl,
    isUploading,
    hasError
  };
}
