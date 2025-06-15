
import { useState } from 'react';
import { toast } from 'sonner';

export const useCommentActions = () => {
  const [isLoading, setIsLoading] = useState(false);

  const viewComment = async (commentId: string) => {
    setIsLoading(true);
    try {
      const comments = JSON.parse(localStorage.getItem('blog_comments') || '[]');
      const comment = comments.find((c: any) => c.id === commentId);
      
      if (comment) {
        // Marquer comme lu
        const updatedComments = comments.map((c: any) => 
          c.id === commentId ? { ...c, isRead: true } : c
        );
        localStorage.setItem('blog_comments', JSON.stringify(updatedComments));
        
        toast.success('Commentaire consulté');
        return comment;
      }
    } catch (error) {
      toast.error('Erreur lors de la consultation');
    } finally {
      setIsLoading(false);
    }
  };

  const deleteComment = async (commentId: string) => {
    setIsLoading(true);
    try {
      const comments = JSON.parse(localStorage.getItem('blog_comments') || '[]');
      const updatedComments = comments.filter((comment: any) => comment.id !== commentId);
      
      localStorage.setItem('blog_comments', JSON.stringify(updatedComments));
      toast.success('Commentaire supprimé');
    } catch (error) {
      toast.error('Erreur lors de la suppression');
    } finally {
      setIsLoading(false);
    }
  };

  const approveComment = async (commentId: string) => {
    setIsLoading(true);
    try {
      const comments = JSON.parse(localStorage.getItem('blog_comments') || '[]');
      const updatedComments = comments.map((comment: any) => 
        comment.id === commentId 
          ? { ...comment, status: 'approved', approvedAt: new Date().toISOString() }
          : comment
      );
      
      localStorage.setItem('blog_comments', JSON.stringify(updatedComments));
      toast.success('Commentaire approuvé');
    } catch (error) {
      toast.error('Erreur lors de l\'approbation');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    viewComment,
    deleteComment,
    approveComment,
    isLoading
  };
};
