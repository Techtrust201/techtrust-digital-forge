
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { DialogFooter } from '@/components/ui/dialog';
import BlogPostFormFields from './components/BlogPostFormFields';
import BlogPostTagsManager from './components/BlogPostTagsManager';
import { useBlogPostFormValidation } from './hooks/useBlogPostFormValidation';

interface BlogPostFormProps {
  onSubmit: (post: {
    title: string;
    excerpt: string;
    content: string;
    author: string;
    image: string;
    tags: string[];
  }) => void;
  initialData?: {
    title: string;
    excerpt: string;
    content: string;
    author: string;
    image: string;
    tags: string[];
  };
}

const BlogPostForm: React.FC<BlogPostFormProps> = ({ onSubmit, initialData }) => {
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    excerpt: initialData?.excerpt || '',
    content: initialData?.content || '',
    author: initialData?.author || 'Équipe Techtrust',
    image: initialData?.image || '/placeholder.svg',
    tags: initialData?.tags || [],
  });

  const { errors, validateForm, clearError, setError } = useBlogPostFormValidation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    clearError(name);
  };

  const handleTagsChange = (tags: string[]) => {
    setFormData(prev => ({ ...prev, tags }));
  };

  const handleErrorChange = (field: string, message?: string) => {
    if (message) {
      setError(field, message);
    } else {
      clearError(field);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm(formData)) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <BlogPostFormFields
        formData={formData}
        errors={errors}
        onChange={handleChange}
      />
      
      <BlogPostTagsManager
        tags={formData.tags}
        errors={errors}
        onTagsChange={handleTagsChange}
        onErrorChange={handleErrorChange}
      />
      
      <DialogFooter>
        <Button type="submit">Publier l'article</Button>
      </DialogFooter>
    </form>
  );
};

export default BlogPostForm;
