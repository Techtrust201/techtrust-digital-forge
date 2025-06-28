
import { useState, useEffect, useCallback } from 'react';

export interface PersistedContent {
  id: string;
  type: 'video' | 'image';
  content: any;
  prompt: string;
  style: string;
  optimizedData?: any;
  timestamp: number;
  url?: string;
  duration?: number;
  cost?: number;
}

export interface WorkflowState {
  currentStep: number;
  generatedContent: any;
  compositionData: any;
  prompt: string;
  style: string;
  contentType: 'video' | 'image';
  customDuration: string;
  model: string;
  previewContent: any;
}

export const useContentPersistence = () => {
  const [persistedContent, setPersistedContent] = useState<PersistedContent[]>([]);
  const [workflowState, setWorkflowState] = useState<WorkflowState>({
    currentStep: 1,
    generatedContent: null,
    compositionData: null,
    prompt: '',
    style: 'realistic',
    contentType: 'video',
    customDuration: '10',
    model: 'seedance-1-lite',
    previewContent: null
  });

  // Load content from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('generated_content_cache');
      if (saved) {
        const parsed = JSON.parse(saved);
        setPersistedContent(parsed);
      }

      const savedWorkflow = localStorage.getItem('workflow_state');
      if (savedWorkflow) {
        const parsedWorkflow = JSON.parse(savedWorkflow);
        setWorkflowState(parsedWorkflow);
      }
    } catch (error) {
      console.error('Error loading persisted content:', error);
    }
  }, []);

  // Save workflow state whenever it changes
  const updateWorkflowState = useCallback((updates: Partial<WorkflowState>) => {
    const newState = { ...workflowState, ...updates };
    setWorkflowState(newState);
    
    try {
      localStorage.setItem('workflow_state', JSON.stringify(newState));
    } catch (error) {
      console.error('Error saving workflow state:', error);
    }
  }, [workflowState]);

  // Save content to localStorage
  const saveContent = useCallback((content: Omit<PersistedContent, 'id' | 'timestamp'>) => {
    const newContent: PersistedContent = {
      ...content,
      id: Date.now().toString(),
      timestamp: Date.now()
    };

    const updated = [newContent, ...persistedContent].slice(0, 20); // Keep last 20
    setPersistedContent(updated);
    
    try {
      localStorage.setItem('generated_content_cache', JSON.stringify(updated));
    } catch (error) {
      console.error('Error saving content:', error);
    }

    return newContent;
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

  // Get content by ID
  const getContentById = useCallback((id: string) => {
    return persistedContent.find(content => content.id === id);
  }, [persistedContent]);

  return {
    persistedContent,
    workflowState,
    updateWorkflowState,
    saveContent,
    getRecentContent,
    clearOldContent,
    getContentById
  };
};
