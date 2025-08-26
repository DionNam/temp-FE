"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { Footer } from "@/components/layout/Footer";
import { RichTextEditor } from "@/components/blog/RichTextEditor";
import { Button } from "@/components/ui/button";
import { Eye, Save, Send, Upload, X } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { useCreateBlog, useUpdateBlog, useBlog } from "@/hooks/useBlogQueries";
import { useAuthors } from "@/hooks/useAuthor";
import { useBlogCategories } from "@/hooks/useBlogFilters";
import { CreateBlogRequest } from "@/types/blog";
import { useToast, ToastContainer } from "@/components/ui/toast";
import { compressImage } from "@/utils/imageCompression";
import { PasswordProtection } from "@/components/blog/PasswordProtection";

function CreateBlogContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get("edit");

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const { toasts, removeToast, success, error: showError } = useToast();
  const [formData, setFormData] = useState<CreateBlogRequest>({
    title: "",
    excerpt: "",
    content: "",
    category: "",
    author_name: "",
    avatar: "",
    featured_image: "",
    meta_description: "",
    published: false,
    tags: [],
  });

  const {
    mutate: createBlog,
    isPending: createLoading,
    error: createError,
  } = useCreateBlog();
  const {
    mutate: updateBlog,
    isPending: updateLoading,
    error: updateError,
  } = useUpdateBlog();
  const { data: existingBlog, isLoading: fetchLoading } = useBlog(editId);
  const { data: authors, loading: authorsLoading } = useAuthors();
  const { data: categories, loading: categoriesLoading } = useBlogCategories();

  const isEditing = !!editId;
  const isLoading = createLoading || updateLoading;
  const error = createError?.message || updateError?.message;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (existingBlog && isEditing) {
      console.log("Setting form data with existing blog:", existingBlog);
      console.log("Existing blog content:", existingBlog.data.content);
      setFormData({
        title: existingBlog.data.title,
        excerpt: existingBlog.data.excerpt,
        content: existingBlog.data.content,
        category: existingBlog.data.category,
        author_name: existingBlog.data.author_name,
        avatar: existingBlog.data.avatar || "",
        featured_image: existingBlog.data.featured_image || "",
        published: existingBlog.data.published,
        tags: [],
      });
    }
  }, [existingBlog, isEditing]);

  const handleInputChange = (field: keyof CreateBlogRequest, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleContentChange = (newContent: string) => {
    handleInputChange("content", newContent);
  };

  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const authorAvatarInputRef = React.useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isAuthorAvatarDragOver, setIsAuthorAvatarDragOver] = useState(false);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        alert("Please select an image file");
        return;
      }

      try {
        const compressedImage = await compressImage(file);
        handleInputChange("featured_image", compressedImage);
      } catch (error) {
        alert(error instanceof Error ? error.message : 'Failed to process image');
      }
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    const files = Array.from(e.dataTransfer.files);
    const imageFile = files.find((file) => file.type.startsWith("image/"));

    if (imageFile) {
      try {
        const compressedImage = await compressImage(imageFile);
        handleInputChange("featured_image", compressedImage);
      } catch (error) {
        alert(error instanceof Error ? error.message : 'Failed to process image');
      }
    } else {
      alert("Please drop an image file");
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleAuthorAvatarUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        alert("Please select an image file");
        return;
      }

      try {
        const compressedImage = await compressImage(file);
        handleInputChange("avatar", compressedImage);
      } catch (error) {
        alert(error instanceof Error ? error.message : 'Failed to process image');
      }
    }
  };

  const handleAuthorAvatarDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsAuthorAvatarDragOver(true);
  };

  const handleAuthorAvatarDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsAuthorAvatarDragOver(false);
  };

  const handleAuthorAvatarDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsAuthorAvatarDragOver(false);

    const files = Array.from(e.dataTransfer.files);
    const imageFile = files.find((file) => file.type.startsWith("image/"));

    if (imageFile) {
      try {
        const compressedImage = await compressImage(imageFile);
        handleInputChange("avatar", compressedImage);
      } catch (error) {
        alert(error instanceof Error ? error.message : 'Failed to process image');
      }
    } else {
      alert("Please drop an image file");
    }
  };

  const handleAuthorAvatarUploadClick = () => {
    authorAvatarInputRef.current?.click();
  };

  const removeAuthorAvatar = () => {
    handleInputChange("avatar", "");
  };

  const removeFeaturedImage = () => {
    handleInputChange("featured_image", "");
  };

  const handlePreview = () => {
    setIsPreviewMode(!isPreviewMode);
  };

  const validateForm = () => {
    if (!formData.title.trim()) {
      alert("Please enter a title");
      return false;
    }
    if (!formData.excerpt.trim()) {
      alert("Please enter an excerpt");
      return false;
    }
    if (!formData.content.trim()) {
      alert("Please add some content");
      return false;
    }
    if (!formData.category) {
      alert("Please select a category");
      return false;
    }
    if (!formData.author_name.trim()) {
      alert("Please enter an author name");
      return false;
    }
    return true;
  };

  const handleSaveDraft = async () => {
    if (!validateForm()) return;

    try {
      const blogData = { ...formData, published: false };

      if (isEditing && editId) {
        await updateBlog({ id: editId, data: blogData });
        success("Draft updated successfully!");
      } else {
        await createBlog(blogData);
        success("Draft saved successfully!");
        router.push("/blog/management");
      }
    } catch (error) {
      console.error("Error saving draft:", error);
      showError("Failed to save draft", "Please try again.");
    }
  };

  const handlePublish = async () => {
    if (!validateForm()) return;

    try {
      const blogData = { ...formData, published: true };

      if (isEditing && editId) {
        await updateBlog({ id: editId, data: blogData });
        success("Blog updated and published successfully!");
      } else {
        await createBlog(blogData);
        success("Blog published successfully!");
      }

      router.push("/blog");
    } catch (error) {
      console.error("Error publishing blog:", error);
      showError("Failed to publish blog", "Please try again.");
    }
  };

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
  };

  if (!isMounted) {
    return (
      <div className="min-h-screen bg-white">
        <div className="flex items-center justify-center h-screen">
          <div className="text-gray-500">Loading...</div>
        </div>
      </div>
    );
  }

  if (isEditing && fetchLoading) {
    return (
      <div className="min-h-screen bg-primary-blue-50">
        <Header />
        <div className="flex items-center justify-center h-96">
          <div className="text-gray-500">Loading blog data...</div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <PasswordProtection onSuccess={handleAuthSuccess} />;
  }

  return (
    <div className="min-h-screen bg-primary-blue-50">
      <ToastContainer toasts={toasts} removeToast={removeToast} />
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            {isEditing ? "Edit Blog Post" : "Create New Blog Post"}
          </h1>
          <p className="mt-2 text-gray-600">
            {isEditing
              ? "Update your blog post"
              : "Write and publish your blog post"}
          </p>
        </div>

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="text-red-800 text-sm">{error}</div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                placeholder="Enter blog title..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Excerpt <span className="text-red-500">*</span>
              </label>
              <textarea
                value={formData.excerpt}
                onChange={(e) => handleInputChange("excerpt", e.target.value)}
                placeholder="Write a brief excerpt..."
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue-500 focus:border-transparent resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Featured Image <span className="text-red-500">*</span>
              </label>
              <div className="space-y-3">
                {formData.featured_image ? (
                  <div className="relative">
                    <Image
                      src={formData.featured_image}
                      alt="Featured image preview"
                      width={400}
                      height={192}
                      className="w-full h-48 object-cover rounded-lg border border-gray-300"
                    />
                    <button
                      type="button"
                      onClick={removeFeaturedImage}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div
                    className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
                      isDragOver
                        ? "border-blue-400 bg-blue-50"
                        : "border-gray-300 hover:border-gray-400 hover:bg-gray-50"
                    }`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={handleUploadClick}
                  >
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500 mb-2">
                      No featured image selected
                    </p>
                    <p className="text-sm text-gray-400">
                      This image will be used as the blog thumbnail
                    </p>
                    <p className="text-xs text-gray-400 mt-2">
                      Click to upload or drag and drop
                    </p>
                  </div>
                )}

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Content <span className="text-red-500">*</span>
              </label>
              <div className="border border-gray-300 rounded-lg overflow-hidden">
                <RichTextEditor
                  content={formData.content}
                  onChange={handleContentChange}
                  placeholder="Start writing your blog content..."
                  className="min-h-[400px]"
                />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Author</h3>
              {authorsLoading ? (
                <div className="text-sm text-gray-500">Loading authors...</div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Author Name *
                    </label>
                    {authors && authors.length > 0 ? (
                      <select
                        value={formData.author_name}
                        onChange={(e) =>
                          handleInputChange("author_name", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue-500 focus:border-transparent"
                      >
                        <option value="">Select an author...</option>
                        {Array.isArray(authors) &&
                          authors.map(
                            (author: { id: string; name: string }) => (
                              <option key={author.id} value={author.name}>
                                {author.name}
                              </option>
                            )
                          )}
                      </select>
                    ) : (
                      <input
                        type="text"
                        value={formData.author_name}
                        onChange={(e) =>
                          handleInputChange("author_name", e.target.value)
                        }
                        placeholder="Enter author name..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue-500 focus:border-transparent"
                      />
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Author Profile Picture
                    </label>
                    <div className="space-y-3">
                      {formData.avatar ? (
                        <div className="relative">
                          <Image
                            src={formData.avatar}
                            alt="Author avatar preview"
                            width={80}
                            height={80}
                            className="w-20 h-20 object-cover rounded-full border border-gray-300"
                          />
                          <button
                            type="button"
                            onClick={removeAuthorAvatar}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ) : (
                        <div
                          className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors ${
                            isAuthorAvatarDragOver
                              ? "border-blue-400 bg-blue-50"
                              : "border-gray-300 hover:border-gray-400 hover:bg-gray-50"
                          }`}
                          onDragOver={handleAuthorAvatarDragOver}
                          onDragLeave={handleAuthorAvatarDragLeave}
                          onDrop={handleAuthorAvatarDrop}
                          onClick={handleAuthorAvatarUploadClick}
                        >
                          <Upload className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                          <p className="text-sm text-gray-500 mb-1">
                            No profile picture selected
                          </p>
                          <p className="text-xs text-gray-400">
                            Click to upload or drag and drop
                          </p>
                        </div>
                      )}

                      <input
                        ref={authorAvatarInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleAuthorAvatarUpload}
                        className="hidden"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Category
              </h3>
              {categoriesLoading ? (
                <div className="text-sm text-gray-500">
                  Loading categories...
                </div>
              ) : (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      handleInputChange("category", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue-500 focus:border-transparent"
                  >
                    <option value="">Select a category...</option>
                    {Array.isArray(categories) &&
                      categories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    {(!categories || categories.length === 0) && (
                      <>
                        <option value="news">News</option>
                        <option value="tip">Tip</option>
                        <option value="interview">Interview</option>
                        <option value="product-update">Product Update</option>
                      </>
                    )}
                  </select>
                </div>
              )}
            </div>

            <div className="bg-transparent py-6 rounded-lg space-y-3">
              <Button
                type="button"
                onClick={handlePublish}
                disabled={isLoading}
                className="w-full bg-primary-blue-600 text-white hover:bg-primary-blue-700"
              >
                <Send className="w-4 h-4 mr-2" />
                {isLoading
                  ? isEditing
                    ? "Updating..."
                    : "Publishing..."
                  : isEditing
                  ? "Update & Publish"
                  : "Publish"}
              </Button>

              <Button
                type="button"
                variant="outline"
                onClick={handleSaveDraft}
                disabled={isLoading}
                className="w-full"
              >
                <Save className="w-4 h-4 mr-2" />
                {isLoading ? "Saving..." : "Save as Draft"}
              </Button>

              <Button
                type="button"
                variant="outline"
                onClick={handlePreview}
                className="w-full"
              >
                <Eye className="w-4 h-4 mr-2" />
                Preview
              </Button>
            </div>
          </div>
        </div>
      </div>

      {isPreviewMode && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-11/12 h-5/6 max-w-4xl flex flex-col">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold">Preview</h3>
              <Button
                type="button"
                variant="ghost"
                onClick={() => setIsPreviewMode(false)}
              >
                ×
              </Button>
            </div>
            <div className="flex-1 overflow-auto p-6">
              <article className="max-w-4xl mx-auto">
                <header className="mb-8">
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <span className="bg-primary-blue-100 text-primary-blue-700 px-3 py-1 rounded-full text-xs font-medium mr-4">
                      {formData.category}
                    </span>
                    <time>{new Date().toLocaleDateString()}</time>
                  </div>

                  <h1 className="font-bold text-3xl text-gray-900 mb-4">
                    {formData.title || "Blog Title"}
                  </h1>

                  <p className="text-xl text-gray-600 leading-relaxed mb-6">
                    {formData.excerpt || "Blog excerpt..."}
                  </p>

                  {formData.featured_image && (
                    <div className="mb-6">
                      <Image
                        src={formData.featured_image}
                        alt="Featured image"
                        width={800}
                        height={256}
                        className="w-full h-64 object-cover rounded-lg shadow-sm"
                      />
                    </div>
                  )}

                  <div className="flex items-center">
                    {formData.avatar ? (
                      <Image
                        src={formData.avatar}
                        alt="Author avatar"
                        width={48}
                        height={48}
                        className="w-12 h-12 rounded-full mr-4 object-cover"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
                    )}
                    <div>
                      <p className="font-medium text-gray-900">
                        {formData.author_name || "Author Name"}
                      </p>
                    </div>
                  </div>
                </header>

                <div className="prose prose-lg max-w-none mb-8">
                  <div
                    dangerouslySetInnerHTML={{
                      __html:
                        formData.content ||
                        "<p>Start writing your content...</p>",
                    }}
                    className="blog-content"
                  />
                </div>
              </article>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default function CreateBlogPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading...</p>
          </div>
        </div>
      }
    >
      <CreateBlogContent />
    </Suspense>
  );
}
