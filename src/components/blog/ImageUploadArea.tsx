"use client";

import React, { useRef } from "react";
import { Upload, X } from "lucide-react";

interface TemporaryImage {
  file: File;
  uploadedUrl?: string;
  isUploading?: boolean;
  progress?: number;
  error?: string;
}

interface ImageUploadAreaProps {
  type: "featured" | "avatar";
  currentImage?: string;
  temporaryImage: TemporaryImage | null;
  onImageSelect: (file: File) => void;
  onImageRemove: () => void;
  onRetryUpload: (file: File) => void;
  isDragOver: boolean;
  onDragOver: (e: React.DragEvent) => void;
  onDragLeave: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent) => void;
  onClick: () => void;
  error?: string;
}

export function ImageUploadArea({
  type,
  currentImage,
  temporaryImage,
  onImageSelect,
  onImageRemove,
  onRetryUpload,
  isDragOver,
  onDragOver,
  onDragLeave,
  onDrop,
  error,
}: ImageUploadAreaProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onImageSelect(file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const isFeatured = type === "featured";

  return (
    <div className="space-y-3">
      {currentImage ? (
        <div className="relative">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={currentImage}
            alt={
              isFeatured ? "Featured image preview" : "Author avatar preview"
            }
            width={isFeatured ? 400 : 80}
            height={isFeatured ? 192 : 80}
            className={`${
              isFeatured ? "w-full h-48 rounded-lg" : "w-20 h-20 rounded-full"
            } object-cover border border-gray-300`}
          />

          <button
            type="button"
            onClick={onImageRemove}
            className={`absolute ${
              isFeatured ? "top-2 right-2" : "-top-2 -right-2"
            } bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors`}
          >
            <X className={isFeatured ? "w-4 h-4" : "w-3 h-3"} />
          </button>
        </div>
      ) : (
        <div
          className={`border-2 border-dashed rounded-lg text-center cursor-pointer transition-colors ${
            isDragOver
              ? "border-blue-400 bg-blue-50"
              : "border-gray-300 hover:border-gray-400 hover:bg-gray-50"
          } ${isFeatured ? "p-6" : "p-4"}`}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          onClick={handleUploadClick}
        >
          {temporaryImage?.isUploading ? (
            <>
              <div
                className={`${
                  isFeatured ? "w-8 h-8" : "w-6 h-6"
                } border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-2`}
              ></div>
              <p
                className={`${
                  isFeatured
                    ? "text-gray-500 mb-2"
                    : "text-sm text-gray-500 mb-1"
                }`}
              >
                Uploading...
              </p>
              {temporaryImage.progress !== undefined && (
                <p className="text-xs text-gray-400">
                  {temporaryImage.progress}%
                </p>
              )}
            </>
          ) : temporaryImage?.error ? (
            <>
              <div
                className={`${
                  isFeatured ? "w-8 h-8" : "w-6 h-6"
                } text-red-500 mx-auto mb-2`}
              >
                ⚠️
              </div>
              <p
                className={`${
                  isFeatured ? "text-red-500 mb-2" : "text-sm text-red-500 mb-1"
                }`}
              >
                Upload failed
              </p>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onRetryUpload(temporaryImage.file);
                }}
                className="text-xs bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
              >
                Retry
              </button>
            </>
          ) : (
            <>
              <Upload
                className={`${
                  isFeatured ? "w-8 h-8" : "w-6 h-6"
                } text-gray-400 mx-auto mb-2`}
              />
              <p
                className={`${
                  isFeatured
                    ? "text-gray-500 mb-2"
                    : "text-sm text-gray-500 mb-1"
                }`}
              >
                {isFeatured
                  ? "No featured image selected"
                  : "No profile picture selected"}
              </p>
              {isFeatured && (
                <p className="text-sm text-gray-400">
                  This image will be used as the blog thumbnail
                </p>
              )}
              <p className="text-xs text-gray-400 mt-2">
                Click to upload or drag and drop
              </p>
            </>
          )}
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />

      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
