
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Edit,
  Trash2,
  Eye,
  Calendar,
  User,
  FileText
} from 'lucide-react';
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

interface BlogPostListItemProps {
  post: any;
  getStatusColor: (status: string) => string;
  getStatusLabel: (status: string) => string;
  handleViewPost: (id: string) => void;
  handleEditPost: (id: string) => void;
  handlePublishPost: (id: string) => void;
  handleDeletePost: (id: string) => void;
  isDeleting: boolean;
  isPublishing: boolean;
}

const BlogPostListItem: React.FC<BlogPostListItemProps> = ({
  post,
  getStatusColor,
  getStatusLabel,
  handleViewPost,
  handleEditPost,
  handlePublishPost,
  handleDeletePost,
  isDeleting,
  isPublishing,
}) => (
  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
    <div className="flex-1">
      <div className="flex items-center gap-3 mb-2">
        <h3
          className="font-medium text-gray-900 hover:text-blue-600 cursor-pointer"
          onClick={() => handleViewPost(post.id)}
        >
          {post.title}
        </h3>
        <Badge className={getStatusColor(post.status)}>
          {getStatusLabel(post.status)}
        </Badge>
      </div>
      <div className="flex items-center gap-4 text-sm text-gray-500">
        <div className="flex items-center gap-1">
          <User className="w-4 h-4" />
          {post.author}
        </div>
        <div className="flex items-center gap-1">
          <FileText className="w-4 h-4" />
          {post.category}
        </div>
        {post.publish_date && (
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            {new Date(post.publish_date).toLocaleDateString()}
          </div>
        )}
        {post.status === 'published' && (
          <div className="flex items-center gap-1">
            <Eye className="w-4 h-4" />
            {post.views?.toLocaleString() || 0} vues
          </div>
        )}
      </div>
    </div>
    <div className="flex items-center gap-2">
      <Button variant="outline" size="sm" className="hover:bg-blue-50" onClick={() => handleViewPost(post.id)}>
        <Eye className="w-4 h-4" />
      </Button>
      <Button variant="outline" size="sm" className="hover:bg-green-50" onClick={() => handleEditPost(post.id)}>
        <Edit className="w-4 h-4" />
      </Button>
      {post.status === 'draft' && (
        <Button
          size="sm"
          className="bg-green-600 hover:bg-green-700 text-white"
          onClick={() => handlePublishPost(post.id)}
          disabled={isPublishing}
        >
          {isPublishing ? 'Publication...' : 'Publier'}
        </Button>
      )}
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="text-red-600 hover:text-red-700 hover:bg-red-50"
            disabled={isDeleting}
          >
            <Trash2 className="w-4 h-4" />
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
              onClick={() => handleDeletePost(post.id)}
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

export default BlogPostListItem;
