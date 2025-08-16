"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Footer } from '@/components/layout/Footer';
import { RichTextEditor } from '@/components/blog/RichTextEditor';
import { Button } from '@/components/ui/button';
import { Eye, Save, Send } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { useCreateBlog, useUpdateBlog, useBlog } from '@/hooks/useBlog';
import { useAuthors } from '@/hooks/useAuthor';
import { useBlogCategories } from '@/hooks/useBlogFilters';
import { CreateBlogRequest } from '@/types/blog';
import { useToast, ToastContainer } from '@/components/ui/toast';

export default function CreateBlogPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get('edit');
  
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const { toasts, removeToast, success, error: showError } = useToast();
  const [formData, setFormData] = useState<CreateBlogRequest>({
    title: '',
    excerpt: '',
    content: '',
    category: '',
    author_name: '',
    featured_image: '',
    meta_description: '',
    published: false,
    tags: []
  });

  const { createBlog, loading: createLoading, error: createError } = useCreateBlog();
  const { updateBlog, loading: updateLoading, error: updateError } = useUpdateBlog();
  const { data: existingBlog, loading: fetchLoading } = useBlog(editId);
  const { data: authors, loading: authorsLoading } = useAuthors();
  const { data: categories, loading: categoriesLoading } = useBlogCategories();
  
  const isEditing = !!editId;
  const isLoading = createLoading || updateLoading;
  const error = createError || updateError;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (existingBlog && isEditing) {
      console.log('Setting form data with existing blog:', existingBlog);
      console.log('Existing blog content:', existingBlog.content);
      setFormData({
        title: existingBlog.title,
        excerpt: existingBlog.excerpt,
        content: existingBlog.content,
        category: existingBlog.category,
        author_name: existingBlog.author_name,
        featured_image: existingBlog.featured_image || '',

        published: existingBlog.published,
        tags: []
      });
    }
  }, [existingBlog, isEditing]);

  const handleInputChange = (field: keyof CreateBlogRequest, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleContentChange = (newContent: string) => {
    handleInputChange('content', newContent);
  };

  const handlePreview = () => {
    setIsPreviewMode(!isPreviewMode);
  };



  const validateForm = () => {
    if (!formData.title.trim()) {
      alert('Please enter a title');
      return false;
    }
    if (!formData.excerpt.trim()) {
      alert('Please enter an excerpt');
      return false;
    }
    if (!formData.content.trim()) {
      alert('Please add some content');
      return false;
    }
    if (!formData.category) {
      alert('Please select a category');
      return false;
    }
    if (!formData.author_name.trim()) {
      alert('Please enter an author name');
      return false;
    }
    return true;
  };

  const handleSaveDraft = async () => {
    if (!validateForm()) return;

    try {
      const blogData = { ...formData, published: false };
      
      if (isEditing && editId) {
        await updateBlog(editId, blogData);
        success('Draft updated successfully!');
      } else {
        await createBlog(blogData);
        success('Draft saved successfully!');
        router.push('/blog/management');
      }
    } catch (error) {
      console.error('Error saving draft:', error);
      showError('Failed to save draft', 'Please try again.');
    }
  };

  const handlePublish = async () => {
    if (!validateForm()) return;

    try {
      const blogData = { ...formData, published: true };
      
      if (isEditing && editId) {
        await updateBlog(editId, blogData);
        success('Blog updated and published successfully!');
      } else {
        await createBlog(blogData);
        success('Blog published successfully!');
      }
      
      router.push('/blog');
    } catch (error) {
      console.error('Error publishing blog:', error);
      showError('Failed to publish blog', 'Please try again.');
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
            {isEditing ? 'Edit Blog Post' : 'Create New Blog Post'}
          </h1>
          <p className="mt-2 text-gray-600">
            {isEditing ? 'Update your blog post' : 'Write and publish your blog post'}
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
                Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="Enter blog title..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Excerpt *
              </label>
              <textarea
                value={formData.excerpt}
                onChange={(e) => handleInputChange('excerpt', e.target.value)}
                placeholder="Write a brief excerpt..."
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue-500 focus:border-transparent resize-none"
              />
          </div>
          
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Content *
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
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Author Name *
                  </label>
                  {authors && authors.length > 0 ? (
                    <select
                      value={formData.author_name}
                      onChange={(e) => handleInputChange('author_name', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue-500 focus:border-transparent"
                    >
                      <option value="">Select an author...</option>
                      {Array.isArray(authors) && authors.map((author: { id: string; name: string }) => (
                        <option key={author.id} value={author.name}>
                          {author.name}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type="text"
                      value={formData.author_name}
                      onChange={(e) => handleInputChange('author_name', e.target.value)}
                      placeholder="Enter author name..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue-500 focus:border-transparent"
                    />
                  )}
                </div>
              )}
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Category</h3>
              {categoriesLoading ? (
                <div className="text-sm text-gray-500">Loading categories...</div>
              ) : (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => handleInputChange('category', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue-500 focus:border-transparent"
                  >
                    <option value="">Select a category...</option>
                    {Array.isArray(categories) && categories.map((category) => (
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





            <div className="bg-transparent p-6 rounded-lg space-y-3">
              <Button
                type="button"
                onClick={handlePublish}
                disabled={isLoading}
                className="w-full bg-primary-blue-600 text-white hover:bg-primary-blue-700"
              >
                <Send className="w-4 h-4 mr-2" />
                {isLoading ? (isEditing ? 'Updating...' : 'Publishing...') : (isEditing ? 'Update & Publish' : 'Publish')}
              </Button>

          <Button
            type="button"
            variant="outline"
                onClick={handleSaveDraft}
                disabled={isLoading}
                className="w-full"
              >
                <Save className="w-4 h-4 mr-2" />
                {isLoading ? 'Saving...' : 'Save as Draft'}
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
                    {formData.title || 'Blog Title'}
                  </h1>
                  
                  <p className="text-xl text-gray-600 leading-relaxed mb-6">
                    {formData.excerpt || 'Blog excerpt...'}
                  </p>

                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
                    <div>
                      <p className="font-medium text-gray-900">{formData.author_name || 'Author Name'}</p>
                    </div>
                  </div>
                </header>

                <div className="prose prose-lg max-w-none mb-8">
                  <div 
                    dangerouslySetInnerHTML={{ __html: formData.content || '<p>Start writing your content...</p>' }}
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
