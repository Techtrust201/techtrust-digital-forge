
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';

interface AdminBlogCreatePreviewProps {
  isOpen: boolean;
  onClose: (open: boolean) => void;
  title: string;
  excerpt: string;
  content: string;
  tags: string[];
}

const AdminBlogCreatePreview: React.FC<AdminBlogCreatePreviewProps> = ({
  isOpen,
  onClose,
  title,
  excerpt,
  content,
  tags,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Aperçu de l'article</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{title}</h1>
            {excerpt && (
              <p className="text-xl text-gray-600 mb-6 italic">{excerpt}</p>
            )}
            <div className="flex gap-2 mb-4">
              {tags.map(tag => (
                <Badge key={tag} variant="secondary">{tag}</Badge>
              ))}
            </div>
            <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: content }} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AdminBlogCreatePreview;
