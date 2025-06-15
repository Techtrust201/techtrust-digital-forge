
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface BlogPost {
  id: string;
  title: string;
  content?: string;
  excerpt?: string;
  author: string;
  category: string;
  status: 'draft' | 'published' | 'scheduled';
  views: number;
  publish_date?: string;
  created_at: string;
  updated_at: string;
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  color: string;
  created_at: string;
}

export interface BlogComment {
  id: string;
  post_id?: string;
  author_name: string;
  author_email: string;
  content: string;
  status: 'pending' | 'approved' | 'spam' | 'rejected';
  ip_address?: string;
  created_at: string;
}

export const useBlogPosts = () => {
  return useQuery({
    queryKey: ['blog-posts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as BlogPost[];
    },
  });
};

export const useBlogCategories = () => {
  return useQuery({
    queryKey: ['blog-categories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blog_categories')
        .select('*')
        .order('name');
      
      if (error) throw error;
      return data as BlogCategory[];
    },
  });
};

export const useBlogComments = () => {
  return useQuery({
    queryKey: ['blog-comments'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blog_comments')
        .select(`
          *,
          blog_posts(title)
        `)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });
};

export const useBlogActions = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const createPost = useMutation({
    mutationFn: async (post: Omit<BlogPost, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('blog_posts')
        .insert([post])
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blog-posts'] });
      toast({ title: 'Article créé avec succès' });
    },
    onError: (error) => {
      toast({ title: 'Erreur lors de la création', description: error.message, variant: 'destructive' });
    },
  });

  const updatePost = useMutation({
    mutationFn: async ({ id, ...updates }: Partial<BlogPost> & { id: string }) => {
      const { data, error } = await supabase
        .from('blog_posts')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blog-posts'] });
      toast({ title: 'Article mis à jour' });
    },
  });

  const deletePost = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blog-posts'] });
      toast({ title: 'Article supprimé' });
    },
  });

  const createCategory = useMutation({
    mutationFn: async (category: Omit<BlogCategory, 'id' | 'created_at'>) => {
      const { data, error } = await supabase
        .from('blog_categories')
        .insert([category])
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blog-categories'] });
      toast({ title: 'Catégorie créée' });
    },
  });

  const updateCommentStatus = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: BlogComment['status'] }) => {
      const { data, error } = await supabase
        .from('blog_comments')
        .update({ status })
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blog-comments'] });
      toast({ title: 'Statut du commentaire mis à jour' });
    },
  });

  return {
    createPost,
    updatePost,
    deletePost,
    createCategory,
    updateCommentStatus,
  };
};
