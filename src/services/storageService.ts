import { storageApi, PresignedUploadRequest, PresignedUploadResponse } from '@/lib/api';

export interface UploadFileParams {
  file: File;
  slug: string;
  kind: 'featured' | 'avatar';
}

const ALLOWED_CONTENT_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
  'image/gif'
];

const MAX_FILE_SIZE = 10 * 1024 * 1024;

export const uploadFileToStorage = async ({
  file,
  slug,
  kind
}: UploadFileParams): Promise<string> => {
  try {
    if (!ALLOWED_CONTENT_TYPES.includes(file.type)) {
      throw new Error('Only image files are allowed (jpeg, png, webp, gif)');
    }

    if (file.size > MAX_FILE_SIZE) {
      throw new Error('File size must be less than 10MB');
    }

    const requestData: PresignedUploadRequest = {
      slug,
      kind,
      filename: file.name,
      content_type: file.type,
      file_size: file.size,
      expiry_seconds: 900
    };

    const presignedData: PresignedUploadResponse = await storageApi.getPresignedUploadUrl(requestData);

    const uploadResponse = await fetch(presignedData.upload_url, {
      method: 'PUT',
      body: file,
      headers: {
        'Content-Type': file.type,
      },
    });

    if (!uploadResponse.ok) {
      throw new Error(`Upload failed: ${uploadResponse.statusText}`);
    }

    return presignedData.public_url;
  } catch (error) {
    throw new Error(`File upload failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};
