
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Trash2, Eye, Calendar, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { BlogPost } from '@/hooks/useBlogData';

interface AdminBlogEditHeaderProps {
  post: BlogPost;
  onDelete: () => void;
  onPreview: () => void;
  isDeleting: boolean;
}

const AdminBlogEditHeader = ({
  post,
  onDelete,
  onPreview,
  isDeleting
}: AdminBlogEditHeaderProps) => {
  const navigate = useNavigate();

  return (
    <div className="space-y-4">
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
            <h1 className="text-3xl font-bold text-gray-900">Modifier l'article</h1>
            <p className="text-gray-500 mt-1">Éditez les détails de votre article</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            onClick={onPreview}
          >
            <Eye className="w-4 h-4 mr-2" />
            Aperçu
          </Button>
          <Button
            variant="outline"
            className="text-red-600 hover:text-red-700 hover:bg-red-50"
            onClick={onDelete}
            disabled={isDeleting}
          >
            <Trash2 className="w-4 h-4 mr-2" />
            {isDeleting ? 'Suppression...' : 'Supprimer'}
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
        <Badge className={
          post.status === 'published' ? 'bg-green-100 text-green-800' :
          post.status === 'scheduled' ? 'bg-blue-100 text-blue-800' :
          'bg-gray-100 text-gray-800'
        }>
          {post.status === 'published' ? 'Publié' : 
           post.status === 'scheduled' ? 'Programmé' : 'Brouillon'}
        </Badge>
        <div className="flex items-center gap-1 text-sm text-gray-500">
          <User className="w-4 h-4" />
          {post.author}
        </div>
        <div className="flex items-center gap-1 text-sm text-gray-500">
          <Calendar className="w-4 h-4" />
          Créé le {new Date(post.created_at).toLocaleDateString('fr-FR')}
        </div>
        <div className="flex items-center gap-1 text-sm text-gray-500">
          <Eye className="w-4 h-4" />
          {post.views} vues
        </div>
      </div>
    </div>
  );
};

export default AdminBlogEditHeader;
