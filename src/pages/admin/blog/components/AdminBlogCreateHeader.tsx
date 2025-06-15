
import React from 'react';
import { Button } from '@/components/ui/button';
import { Save, Eye, Send } from 'lucide-react';

interface AdminBlogCreateHeaderProps {
  title: string;
  content: string;
  category: string;
  isSaving: boolean;
  onPreview: () => void;
  onSaveDraft: () => void;
  onPublish: () => void;
}

const AdminBlogCreateHeader: React.FC<AdminBlogCreateHeaderProps> = ({
  title,
  content,
  category,
  isSaving,
  onPreview,
  onSaveDraft,
  onPublish,
}) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Créer un article</h1>
        <p className="text-gray-500 mt-2">Rédiger un nouveau article de blog</p>
      </div>
      <div className="flex items-center gap-3">
        <Button variant="outline" onClick={onPreview} disabled={!title || !content}>
          <Eye className="w-4 h-4 mr-2" />
          Aperçu
        </Button>
        <Button variant="outline" onClick={onSaveDraft} disabled={isSaving || !title || !content}>
          <Save className="w-4 h-4 mr-2" />
          {isSaving ? 'Sauvegarde...' : 'Sauvegarder'}
        </Button>
        <Button 
          className="bg-red-500 hover:bg-red-600" 
          onClick={onPublish}
          disabled={isSaving || !title || !content || !category}
        >
          <Send className="w-4 h-4 mr-2" />
          {isSaving ? 'Publication...' : 'Publier'}
        </Button>
      </div>
    </div>
  );
};

export default AdminBlogCreateHeader;
