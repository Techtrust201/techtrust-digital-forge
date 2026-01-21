
import { useState } from 'react';
import { toast } from 'sonner';

export const useCategoryActions = () => {
  const [isLoading, setIsLoading] = useState(false);

  const createCategory = async (categoryData: { name: string; description: string }) => {
    setIsLoading(true);
    try {
      const existingCategories = JSON.parse(localStorage.getItem('blog_categories') || '[]');
      const newCategory = {
        id: Math.random().toString(36).substr(2, 9),
        ...categoryData,
        createdAt: new Date().toISOString(),
        articlesCount: 0
      };

      const updatedCategories = [...existingCategories, newCategory];
      localStorage.setItem('blog_categories', JSON.stringify(updatedCategories));
      
      toast.success('Catégorie créée avec succès');
      return newCategory;
    } catch (error) {
      toast.error('Erreur lors de la création de la catégorie');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updateCategory = async (categoryId: string, categoryData: any) => {
    setIsLoading(true);
    try {
      const categories = JSON.parse(localStorage.getItem('blog_categories') || '[]');
      const updatedCategories = categories.map((category: any) => 
        category.id === categoryId 
          ? { ...category, ...categoryData, updatedAt: new Date().toISOString() }
          : category
      );
      
      localStorage.setItem('blog_categories', JSON.stringify(updatedCategories));
      toast.success('Catégorie modifiée avec succès');
    } catch (error) {
      toast.error('Erreur lors de la modification');
    } finally {
      setIsLoading(false);
    }
  };

  const deleteCategory = async (categoryId: string) => {
    setIsLoading(true);
    try {
      const categories = JSON.parse(localStorage.getItem('blog_categories') || '[]');
      const updatedCategories = categories.filter((category: any) => category.id !== categoryId);
      
      localStorage.setItem('blog_categories', JSON.stringify(updatedCategories));
      toast.success('Catégorie supprimée');
    } catch (error) {
      toast.error('Erreur lors de la suppression');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    createCategory,
    updateCategory,
    deleteCategory,
    isLoading
  };
};
