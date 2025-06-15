
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
            <div 
              className="prose prose-lg prose-gray max-w-none
                prose-headings:text-gray-900 prose-headings:font-bold
                prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl
                prose-p:text-gray-700 prose-p:leading-relaxed
                prose-strong:text-gray-900 prose-strong:font-semibold
                prose-em:text-gray-700 prose-em:italic
                prose-ul:list-disc prose-ol:list-decimal
                prose-li:text-gray-700 prose-li:mb-1
                prose-blockquote:border-l-4 prose-blockquote:border-blue-300 prose-blockquote:pl-4 prose-blockquote:italic
                prose-code:bg-gray-100 prose-code:px-1 prose-code:rounded
                prose-a:text-blue-600 prose-a:underline hover:prose-a:text-blue-800"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AdminBlogCreatePreview;
