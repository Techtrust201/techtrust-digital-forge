
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Save } from 'lucide-react';
import { BlogCategory } from '@/hooks/useBlogData';

interface FormData {
  title: string;
  content: string;
  excerpt: string;
  category: string;
  status: 'draft' | 'published' | 'scheduled';
  author: string;
}

interface AdminBlogEditSidebarProps {
  formData: FormData;
  categories: BlogCategory[] | undefined;
  onChange: (field: keyof FormData, value: string) => void;
  onSubmit: () => void;
  onPublish: () => void;
  isUpdating: boolean;
}

const AdminBlogEditSidebar: React.FC<AdminBlogEditSidebarProps> = ({
  formData,
  categories,
  onChange,
  onSubmit,
  onPublish,
  isUpdating,
}) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Publication</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="status">Statut</Label>
            <Select 
              value={formData.status} 
              onValueChange={(value: 'draft' | 'published' | 'scheduled') => 
                onChange('status', value)
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="draft">Brouillon</SelectItem>
                <SelectItem value="published">Publié</SelectItem>
                <SelectItem value="scheduled">Programmé</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex gap-2">
            <Button 
              onClick={onSubmit}
              className="flex-1"
              disabled={isUpdating}
            >
              <Save className="w-4 h-4 mr-2" />
              {isUpdating ? 'Sauvegarde...' : 'Sauvegarder'}
            </Button>
            
            {formData.status === 'draft' && (
              <Button 
                type="button"
                onClick={onPublish}
                className="bg-green-600 hover:bg-green-700"
                disabled={isUpdating}
              >
                Publier
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Métadonnées</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="category">Catégorie *</Label>
            <Select 
              value={formData.category} 
              onValueChange={(value) => onChange('category', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner une catégorie" />
              </SelectTrigger>
              <SelectContent>
                {categories?.map(category => (
                  <SelectItem key={category.id} value={category.name}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="author">Auteur</Label>
            <Input
              id="author"
              value={formData.author}
              onChange={(e) => onChange('author', e.target.value)}
              placeholder="Nom de l'auteur"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminBlogEditSidebar;
