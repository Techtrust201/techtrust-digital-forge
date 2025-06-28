
import { useState, useEffect, useCallback } from 'react';

export interface PersistedContent {
  id: string;
  type: 'video' | 'image';
  content: any;
  prompt: string;
  style: string;
  optimizedData?: any;
  timestamp: number;
}

export const useContentPersistence = () => {
  const [persistedContent, setPersistedContent] = useState<PersistedContent[]>([]);

  // Load content from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('generated_content_cache');
      if (saved) {
        const parsed = JSON.parse(saved);
        setPersistedContent(parsed);
      }
    } catch (error) {
      console.error('Error loading persisted content:', error);
    }
  }, []);

  // Save content to localStorage
  const saveContent = useCallback((content: Omit<PersistedContent, 'id' | 'timestamp'>) => {
    const newContent: PersistedContent = {
      ...content,
      id: Date.now().toString(),
      timestamp: Date.now()
    };

    const updated = [newContent, ...persistedContent].slice(0, 10); // Keep last 10
    setPersistedContent(updated);
    
    try {
      localStorage.setItem('generated_content_cache', JSON.stringify(updated));
    } catch (error) {
      console.error('Error saving content:', error);
    }
  }, [persistedContent]);

  // Get recent content
  const getRecentContent = useCallback(() => {
    return persistedContent.slice(0, 5);
  }, [persistedContent]);

  // Clear old content
  const clearOldContent = useCallback(() => {
    const oneDayAgo = Date.now() - (24 * 60 * 60 * 1000);
    const filtered = persistedContent.filter(content => content.timestamp > oneDayAgo);
    
    if (filtered.length !== persistedContent.length) {
      setPersistedContent(filtered);
      localStorage.setItem('generated_content_cache', JSON.stringify(filtered));
    }
  }, [persistedContent]);

  return {
    persistedContent,
    saveContent,
    getRecentContent,
    clearOldContent
  };
};
