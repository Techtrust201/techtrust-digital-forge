
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Calendar, User } from 'lucide-react';

interface AdminBlogCreatePreviewProps {
  isOpen: boolean;
  onClose: (open: boolean) => void;
  title: string;
  excerpt: string;
  content: string;
  tags: string[];
}

const AdminBlogCreatePreview = ({
  isOpen,
  onClose,
  title,
  excerpt,
  content,
  tags
}: AdminBlogCreatePreviewProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Aperçu de l'article</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{title || 'Titre de l\'article'}</h1>
            
            <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
              <div className="flex items-center gap-1">
                <User className="w-4 h-4" />
                Admin
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {new Date().toLocaleDateString('fr-FR')}
              </div>
            </div>
            
            {excerpt && (
              <blockquote className="border-l-4 border-red-300 pl-4 italic text-gray-700 mb-6">
                {excerpt}
              </blockquote>
            )}
          </div>
          
          <div 
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: content || '<p>Contenu de l\'article...</p>' }}
          />
          
          {tags.length > 0 && (
            <div className="pt-6 border-t">
              <h4 className="font-medium mb-3">Mots-clés :</h4>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AdminBlogCreatePreview;
