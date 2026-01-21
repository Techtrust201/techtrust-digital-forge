
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Save, Eye, Send } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface AdminBlogCreateHeaderProps {
  title: string;
  content: string;
  category: string;
  isSaving: boolean;
  onPreview: () => void;
  onSaveDraft: () => void;
  onPublish: () => void;
}

const AdminBlogCreateHeader = ({
  title,
  content,
  category,
  isSaving,
  onPreview,
  onSaveDraft,
  onPublish
}: AdminBlogCreateHeaderProps) => {
  const navigate = useNavigate();

  const canSaveDraft = title.trim() && content.trim();
  const canPublish = title.trim() && content.trim() && category.trim();

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          onClick={() => navigate('/admin/blog/posts')}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Retour
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Créer un article</h1>
          <p className="text-gray-500 mt-1">Rédigez un nouvel article de blog</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          onClick={onPreview}
          disabled={!title.trim() || !content.trim()}
        >
          <Eye className="w-4 h-4 mr-2" />
          Aperçu
        </Button>
        <Button
          variant="outline"
          onClick={onSaveDraft}
          disabled={!canSaveDraft || isSaving}
        >
          <Save className="w-4 h-4 mr-2" />
          {isSaving ? 'Sauvegarde...' : 'Sauvegarder'}
        </Button>
        <Button
          className="bg-red-500 hover:bg-red-600"
          onClick={onPublish}
          disabled={!canPublish || isSaving}
        >
          <Send className="w-4 h-4 mr-2" />
          Publier
        </Button>
      </div>
    </div>
  );
};

export default AdminBlogCreateHeader;
