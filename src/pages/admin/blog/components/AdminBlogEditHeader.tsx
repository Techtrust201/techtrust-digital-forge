
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Eye, Trash2 } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { BlogPost } from '@/hooks/useBlogData';

interface AdminBlogEditHeaderProps {
  post: BlogPost;
  onDelete: () => void;
  onPreview: () => void;
  isDeleting: boolean;
}

const AdminBlogEditHeader: React.FC<AdminBlogEditHeaderProps> = ({
  post,
  onDelete,
  onPreview,
  isDeleting,
}) => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Button
          variant="secondary"
          className="hover-scale bg-secondary text-gray-900 border border-gray-300 shadow-sm rounded-full px-5 py-3 transition-all duration-200 focus:ring-2 focus:ring-blue-300 flex items-center gap-2"
          onClick={() => navigate('/admin/blog/posts')}
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          <span className="font-semibold">Retour</span>
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Modifier l'article</h1>
          <div className="flex items-center gap-2 mt-2">
            <Badge className={
              post.status === 'published' ? 'bg-green-100 text-green-800' :
              post.status === 'scheduled' ? 'bg-blue-100 text-blue-800' :
              'bg-gray-100 text-gray-800'
            }>
              {post.status === 'published' ? 'Publié' : 
              post.status === 'scheduled' ? 'Programmé' : 'Brouillon'}
            </Badge>
            <span className="text-sm text-gray-500">
              {post.views} vues • Créé le {new Date(post.created_at).toLocaleDateString('fr-FR')}
            </span>
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <Button 
          variant="outline" 
          onClick={onPreview}
        >
          <Eye className="w-4 h-4 mr-2" />
          Aperçu
        </Button>
        
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button 
              variant="outline" 
              className="text-red-600 hover:text-red-700"
              disabled={isDeleting}
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Supprimer
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Supprimer l'article</AlertDialogTitle>
              <AlertDialogDescription>
                Êtes-vous sûr de vouloir supprimer "{post.title}" ? Cette action est irréversible.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Annuler</AlertDialogCancel>
              <AlertDialogAction
                onClick={onDelete}
                className="bg-red-600 hover:bg-red-700"
                disabled={isDeleting}
              >
                {isDeleting ? 'Suppression...' : 'Supprimer'}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default AdminBlogEditHeader;

