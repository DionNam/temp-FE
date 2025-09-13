"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Footer } from "@/components/layout/Footer";
import { RichTextEditor } from "@/components/blog/RichTextEditor";
import { Button } from "@/components/ui/button";
import { Eye, Save, Send, X } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { useCreateBlog, useUpdateBlog, useBlog } from "@/hooks/useBlogQueries";
import { useAuthors } from "@/hooks/useAuthor";
import { useBlogCategories } from "@/hooks/useBlogFilters";
import { useImageUpload } from "@/hooks/useImageUpload";
import { CreateBlogRequest } from "@/types/blog";
import { useToast, ToastContainer } from "@/components/ui/toast";
import { ImageUploadArea } from "@/components/blog/ImageUploadArea";
import { sanitizeHtml } from "@/utils/sanitizeHtml";
import { validateForm, sanitizeInput, FORM_VALIDATION_SCHEMAS } from "@/utils/validation";

function CreateBlogContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get("edit");

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
    slug: "",
  });

  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

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
        slug: existingBlog.data.slug || "",
      });
    }
  }, [existingBlog, isEditing]);

  const handleInputChange = (field: keyof CreateBlogRequest, value: string) => {
    let sanitizedValue = value;
    
    if (field === 'title' || field === 'author_name' || field === 'category') {
      sanitizedValue = sanitizeInput(value);
    } else if (field === 'content') {
      sanitizedValue = value;
    } else if (field === 'excerpt') {
      sanitizedValue = sanitizeInput(value);
    }
    
    setFormData((prev) => ({
      ...prev,
      [field]: sanitizedValue,
    }));

    if (fieldErrors[field]) {
      setFieldErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const handleContentChange = (newContent: string) => {
    handleInputChange("content", newContent);

    if (fieldErrors.content) {
      setFieldErrors((prev) => ({
        ...prev,
        content: "",
      }));
    }
  };

  const featuredImageUpload = useImageUpload({
    type: "featured",
    formData: {
      slug: formData.slug,
      title: formData.title,
    },
    onImageUploaded: (url: string) => {
      handleInputChange("featured_image", url);
      if (fieldErrors.featured_image) {
        setFieldErrors((prev) => ({
          ...prev,
          featured_image: "",
        }));
      }
    },
    onError: (message: string) => {
      showError("File upload error", message);
    },
  });

  const avatarImageUpload = useImageUpload({
    type: "avatar",
    formData: {
      slug: formData.slug,
      author_name: formData.author_name,
    },
    onImageUploaded: (url: string) => {
      handleInputChange("avatar", url);
      if (fieldErrors.avatar) {
        setFieldErrors((prev) => ({
          ...prev,
          avatar: "",
        }));
      }
    },
    onError: (message: string) => {
      showError("File upload error", message);
    },
  });

  const uploadTemporaryImages = async (): Promise<{
    featuredImageUrl?: string;
    avatarUrl?: string;
  }> => {
    const uploadedUrls: { featuredImageUrl?: string; avatarUrl?: string } = {};

    const featuredUrl = featuredImageUpload.getUploadedUrl();
    const avatarUrl = avatarImageUpload.getUploadedUrl();

    if (featuredUrl) {
      uploadedUrls.featuredImageUrl = featuredUrl;
    }

    if (avatarUrl) {
      uploadedUrls.avatarUrl = avatarUrl;
    }

    return uploadedUrls;
  };

  const handlePreview = () => {
    setIsPreviewMode(!isPreviewMode);
  };

  const validateFormData = () => {
    const validationResult = validateForm(formData, FORM_VALIDATION_SCHEMAS.blog);
    
    const errors = { ...validationResult.errors };
    
    if (!formData.featured_image) {
      errors.featured_image = "Please upload a featured image";
    }
    if (!formData.avatar) {
      errors.avatar = "Please upload an author profile picture";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSaveDraft = async () => {
    if (!validateFormData()) return;

    try {
      const uploadedUrls = await uploadTemporaryImages();

      const blogData: CreateBlogRequest = {
        ...formData,
        published: false,
        featured_image:
          uploadedUrls.featuredImageUrl || formData.featured_image,
        avatar: uploadedUrls.avatarUrl || formData.avatar,
      };

      if (isEditing && editId) {
        await updateBlog({ id: editId, data: blogData });
        success("Draft updated successfully!");
        router.push("/blog/management");
      } else {
        await createBlog(blogData);
        success("Draft saved successfully!");
        router.push("/blog/management");
      }
    } catch (error) {
      console.error("Error saving draft:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";

      if (errorMessage.includes("File size must be less than 10MB")) {
        showError(
          "File size error",
          "Image file size must be less than 10MB. Please select a smaller image."
        );
      } else if (errorMessage.includes("Only image files are allowed")) {
        showError(
          "File type error",
          "Only image files are allowed (jpeg, png, webp, gif)."
        );
      } else if (errorMessage.includes("File upload failed")) {
        showError("Upload error", "File upload failed. Please try again.");
      } else {
        showError("Failed to save draft", "Please try again.");
      }
    }
  };

  const handlePublish = async () => {
    if (!validateFormData()) return;

    try {
      const uploadedUrls = await uploadTemporaryImages();

      const blogData: CreateBlogRequest = {
        ...formData,
        published: true,
        featured_image:
          uploadedUrls.featuredImageUrl || formData.featured_image,
        avatar: uploadedUrls.avatarUrl || formData.avatar,
      };

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
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";

      if (errorMessage.includes("File size must be less than 10MB")) {
        showError(
          "File size error",
          "Image file size must be less than 10MB. Please select a smaller image."
        );
      } else if (errorMessage.includes("Only image files are allowed")) {
        showError(
          "File type error",
          "Only image files are allowed (jpeg, png, webp, gif)."
        );
      } else if (errorMessage.includes("File upload failed")) {
        showError("Upload error", "File upload failed. Please try again.");
      } else {
        showError("Failed to publish blog", "Please try again.");
      }
    }
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
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue-500 focus:border-transparent ${
                  fieldErrors.title ? "border-red-500" : "border-gray-300"
                }`}
              />
              {fieldErrors.title && (
                <p className="text-red-500 text-sm mt-1">{fieldErrors.title}</p>
              )}
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
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue-500 focus:border-transparent resize-none ${
                  fieldErrors.excerpt ? "border-red-500" : "border-gray-300"
                }`}
              />
              {fieldErrors.excerpt && (
                <p className="text-red-500 text-sm mt-1">
                  {fieldErrors.excerpt}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Featured Image <span className="text-red-500">*</span>
              </label>
              <ImageUploadArea
                type="featured"
                currentImage={formData.featured_image}
                temporaryImage={featuredImageUpload.temporaryImage}
                onImageSelect={featuredImageUpload.handleImageSelect}
                onImageRemove={featuredImageUpload.handleImageRemove}
                onRetryUpload={featuredImageUpload.handleRetryUpload}
                isDragOver={featuredImageUpload.isDragOver}
                onDragOver={featuredImageUpload.handleDragOver}
                onDragLeave={featuredImageUpload.handleDragLeave}
                onDrop={featuredImageUpload.handleDrop}
                onClick={() => {}}
                error={fieldErrors.featured_image}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Content <span className="text-red-500">*</span>
              </label>
              <div
                className={`border rounded-lg overflow-hidden ${
                  fieldErrors.content ? "border-red-500" : "border-gray-300"
                }`}
              >
                <RichTextEditor
                  content={formData.content}
                  onChange={handleContentChange}
                  placeholder="Start writing your blog content..."
                  className="min-h-[400px]"
                />
              </div>
              {fieldErrors.content && (
                <p className="text-red-500 text-sm mt-1">
                  {fieldErrors.content}
                </p>
              )}
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
                      Author Name <span className="text-red-500">*</span>
                    </label>
                    {authors && authors.length > 0 ? (
                      <select
                        value={formData.author_name}
                        onChange={(e) =>
                          handleInputChange("author_name", e.target.value)
                        }
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue-500 focus:border-transparent ${
                          fieldErrors.author_name
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
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
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue-500 focus:border-transparent ${
                          fieldErrors.author_name
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                      />
                    )}
                    {fieldErrors.author_name && (
                      <p className="text-red-500 text-sm mt-1">
                        {fieldErrors.author_name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Author Profile Picture <span className="text-red-500">*</span>
                    </label>
                    <ImageUploadArea
                      type="avatar"
                      currentImage={formData.avatar}
                      temporaryImage={avatarImageUpload.temporaryImage}
                      onImageSelect={avatarImageUpload.handleImageSelect}
                      onImageRemove={avatarImageUpload.handleImageRemove}
                      onRetryUpload={avatarImageUpload.handleRetryUpload}
                      isDragOver={avatarImageUpload.isDragOver}
                      onDragOver={avatarImageUpload.handleDragOver}
                      onDragLeave={avatarImageUpload.handleDragLeave}
                      onDrop={avatarImageUpload.handleDrop}
                      onClick={() => {}}
                      error={fieldErrors.avatar}
                    />
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
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      handleInputChange("category", e.target.value)
                    }
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue-500 focus:border-transparent ${
                      fieldErrors.category
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
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
                  {fieldErrors.category && (
                    <p className="text-red-500 text-sm mt-1">
                      {fieldErrors.category}
                    </p>
                  )}
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
                <X className="w-4 h-4" />
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
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
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
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
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
                      __html: sanitizeHtml(
                        formData.content || "<p>Start writing your content...</p>"
                      ),
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
