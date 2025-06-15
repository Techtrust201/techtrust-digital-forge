
import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { useBlogCategories, useBlogActions } from '@/hooks/useBlogData';
import { useNavigate } from 'react-router-dom';
import { Skeleton } from '@/components/ui/skeleton';
import AdminBlogCreateHeader from './components/AdminBlogCreateHeader';
import AdminBlogCreateContent from './components/AdminBlogCreateContent';
import AdminBlogCreateSidebar from './components/AdminBlogCreateSidebar';
import AdminBlogCreatePreview from './components/AdminBlogCreatePreview';

const AdminBlogCreatePage = () => {
  const navigate = useNavigate();
  const { data: categories, isLoading: categoriesLoading } = useBlogCategories();
  const { createPost, updatePost } = useBlogActions();
  
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [content, setContent] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');
  const [status, setStatus] = useState('draft');
  const [seoTitle, setSeoTitle] = useState('');
  const [seoDescription, setSeoDescription] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const [currentPostId, setCurrentPostId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    }
  };

  const handleSaveDraft = async () => {
    if (!title.trim() || !content.trim()) {
      return;
    }

    setIsSaving(true);
    try {
      const postData = {
        title,
        content,
        excerpt: excerpt || title.substring(0, 160),
        author: 'Admin',
        category: category || 'Non classé',
        status: 'draft' as const,
        views: 0,
      };

      if (currentPostId) {
        await updatePost.mutateAsync({ id: currentPostId, ...postData });
      } else {
        const newPost = await createPost.mutateAsync(postData);
        setCurrentPostId(newPost.id);
      }
    } finally {
      setIsSaving(false);
    }
  };

  const handlePublish = async () => {
    if (!title.trim() || !content.trim() || !category) {
      return;
    }

    setIsSaving(true);
    try {
      const postData = {
        title,
        content,
        excerpt: excerpt || title.substring(0, 160),
        author: 'Admin',
        category,
        status: 'published' as const,
        views: 0,
        publish_date: new Date().toISOString(),
      };

      if (currentPostId) {
        await updatePost.mutateAsync({ id: currentPostId, ...postData });
      } else {
        await createPost.mutateAsync(postData);
      }
      
      navigate('/admin/blog/posts');
    } finally {
      setIsSaving(false);
    }
  };

  const handlePreview = () => {
    setShowPreview(true);
  };

  if (categoriesLoading) {
    return (
      <AdminLayout>
        <div className="space-y-6">
          <Skeleton className="h-8 w-64" />
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Skeleton className="h-96" />
            </div>
            <div className="space-y-4">
              <Skeleton className="h-32" />
              <Skeleton className="h-24" />
            </div>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <AdminBlogCreateHeader
          title={title}
          content={content}
          category={category}
          isSaving={isSaving}
          onPreview={handlePreview}
          onSaveDraft={handleSaveDraft}
          onPublish={handlePublish}
        />

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <AdminBlogCreateContent
              title={title}
              excerpt={excerpt}
              content={content}
              seoTitle={seoTitle}
              seoDescription={seoDescription}
              onTitleChange={setTitle}
              onExcerptChange={setExcerpt}
              onContentChange={setContent}
              onSeoTitleChange={setSeoTitle}
              onSeoDescriptionChange={setSeoDescription}
            />
          </div>

          <AdminBlogCreateSidebar
            status={status}
            category={category}
            tags={tags}
            newTag={newTag}
            seoTitle={seoTitle}
            seoDescription={seoDescription}
            categories={categories}
            onStatusChange={setStatus}
            onCategoryChange={setCategory}
            onNewTagChange={setNewTag}
            onAddTag={addTag}
            onRemoveTag={removeTag}
            onSeoTitleChange={setSeoTitle}
            onSeoDescriptionChange={setSeoDescription}
            onKeyPress={handleKeyPress}
          />
        </div>

        <AdminBlogCreatePreview
          isOpen={showPreview}
          onClose={setShowPreview}
          title={title}
          excerpt={excerpt}
          content={content}
          tags={tags}
        />
      </div>
    </AdminLayout>
  );
};

export default AdminBlogCreatePage;
