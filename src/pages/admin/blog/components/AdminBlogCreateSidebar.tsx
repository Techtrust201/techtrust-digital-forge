
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Plus, X } from 'lucide-react';
import { BlogCategory } from '@/hooks/useBlogData';

interface AdminBlogCreateSidebarProps {
  status: string;
  category: string;
  tags: string[];
  newTag: string;
  seoTitle: string;
  seoDescription: string;
  categories: BlogCategory[] | undefined;
  onStatusChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onNewTagChange: (value: string) => void;
  onAddTag: () => void;
  onRemoveTag: (tag: string) => void;
  onSeoTitleChange: (value: string) => void;
  onSeoDescriptionChange: (value: string) => void;
  onKeyPress: (e: React.KeyboardEvent) => void;
}

const AdminBlogCreateSidebar: React.FC<AdminBlogCreateSidebarProps> = ({
  status,
  category,
  tags,
  newTag,
  seoTitle,
  seoDescription,
  categories,
  onStatusChange,
  onCategoryChange,
  onNewTagChange,
  onAddTag,
  onRemoveTag,
  onSeoTitleChange,
  onSeoDescriptionChange,
  onKeyPress,
}) => {
  return (
    <div className="space-y-6">
      {/* Paramètres de publication */}
      <Card>
        <CardHeader>
          <CardTitle>Publication</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="status">Statut</Label>
            <Select value={status} onValueChange={onStatusChange}>
              <SelectTrigger className="mt-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="draft">Brouillon</SelectItem>
                <SelectItem value="published">Publié</SelectItem>
                <SelectItem value="scheduled">Programmé</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="category">Catégorie</Label>
            <Select value={category} onValueChange={onCategoryChange}>
              <SelectTrigger className="mt-2">
                <SelectValue placeholder="Sélectionner une catégorie" />
              </SelectTrigger>
              <SelectContent>
                {categories?.map((cat) => (
                  <SelectItem key={cat.id} value={cat.name}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Tags */}
      <Card>
        <CardHeader>
          <CardTitle>Tags</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              value={newTag}
              onChange={(e) => onNewTagChange(e.target.value)}
              onKeyPress={onKeyPress}
              placeholder="Ajouter un tag..."
              className="flex-1"
            />
            <Button onClick={onAddTag} size="sm">
              <Plus className="w-4 h-4" />
            </Button>
          </div>
          
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                  {tag}
                  <button
                    onClick={() => onRemoveTag(tag)}
                    className="ml-1 hover:text-red-600"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* SEO */}
      <Card>
        <CardHeader>
          <CardTitle>SEO</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="seo-title">Titre SEO</Label>
            <Input
              id="seo-title"
              value={seoTitle}
              onChange={(e) => onSeoTitleChange(e.target.value)}
              placeholder="Titre pour les moteurs de recherche..."
              className="mt-2"
            />
            <p className="text-xs text-gray-500 mt-1">
              {seoTitle.length}/60 caractères recommandés
            </p>
          </div>
          <div>
            <Label htmlFor="seo-description">Meta description</Label>
            <Textarea
              id="seo-description"
              value={seoDescription}
              onChange={(e) => onSeoDescriptionChange(e.target.value)}
              placeholder="Description pour les moteurs de recherche..."
              className="mt-2"
              rows={3}
            />
            <p className="text-xs text-gray-500 mt-1">
              {seoDescription.length}/160 caractères recommandés
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminBlogCreateSidebar;
