
import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface OptimizedContent {
  optimizedPrompt: string;
  hashtags: string[];
  description: string;
  suggestions: string[];
  confidence: number;
}

export const useAIOptimization = () => {
  const [isOptimizing, setIsOptimizing] = useState(false);

  const optimizePrompt = useCallback(async (
    originalPrompt: string,
    contentType: 'video' | 'image',
    style: string
  ): Promise<OptimizedContent | null> => {
    if (!originalPrompt.trim()) return null;

    setIsOptimizing(true);
    
    try {
      console.log('Optimizing prompt with AI...');
      
      const { data, error } = await supabase.functions.invoke('optimize-content', {
        body: {
          prompt: originalPrompt,
          contentType,
          style
        }
      });

      if (error) throw error;

      toast.success('🤖 Contenu optimisé par l\'IA !');
      return data;

    } catch (error) {
      console.error('Error optimizing content:', error);
      toast.error('Erreur lors de l\'optimisation IA');
      return null;
    } finally {
      setIsOptimizing(false);
    }
  }, []);

  const generateSocialContent = useCallback(async (
    prompt: string,
    platforms: string[]
  ) => {
    try {
      const { data, error } = await supabase.functions.invoke('generate-social-content', {
        body: {
          prompt,
          platforms
        }
      });

      if (error) throw error;
      return data;

    } catch (error) {
      console.error('Error generating social content:', error);
      return null;
    }
  }, []);

  return {
    optimizePrompt,
    generateSocialContent,
    isOptimizing
  };
};
