
import { useState } from 'react';

interface FormData {
  title: string;
  excerpt: string;
  content: string;
  author: string;
  image: string;
  tags: string[];
}

export const useBlogPostFormValidation = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (formData: FormData): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.title.trim()) newErrors.title = 'Le titre est requis';
    if (!formData.excerpt.trim()) newErrors.excerpt = "L'extrait est requis";
    if (!formData.content.trim()) newErrors.content = 'Le contenu est requis';
    if (formData.tags.length === 0) newErrors.tags = 'Au moins un tag est requis';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const clearError = (field: string) => {
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const setError = (field: string, message: string) => {
    setErrors(prev => ({ ...prev, [field]: message }));
  };

  return {
    errors,
    validateForm,
    clearError,
    setError,
  };
};
