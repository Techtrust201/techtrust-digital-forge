
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Save, Send } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { BlogCategory } from '@/hooks/useBlogData';

interface AdminBlogEditSidebarProps {
  formData: {
    title: string;
    content: string;
    excerpt: string;
    category: string;
    status: string;
    author: string;
  };
  categories?: BlogCategory[];
  onChange: (field: string, value: string) => void;
  onSubmit: () => void;
  onPublish: () => void;
  isUpdating: boolean;
}

const AdminBlogEditSidebar = ({
  formData,
  categories,
  onChange,
  onSubmit,
  onPublish,
  isUpdating
}: AdminBlogEditSidebarProps) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Publication</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Statut</Label>
            <Select value={formData.status} onValueChange={(value) => onChange('status', value)}>
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

          <div>
            <Label>Catégorie</Label>
            <Select value={formData.category} onValueChange={(value) => onChange('category', value)}>
              <SelectTrigger>
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

      <Card>
        <CardHeader>
          <CardTitle>Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button
            onClick={onSubmit}
            disabled={isUpdating}
            className="w-full"
            variant="outline"
          >
            <Save className="w-4 h-4 mr-2" />
            {isUpdating ? 'Sauvegarde...' : 'Sauvegarder'}
          </Button>
          
          <Button
            onClick={onPublish}
            disabled={isUpdating}
            className="w-full bg-red-500 hover:bg-red-600"
          >
            <Send className="w-4 h-4 mr-2" />
            {formData.status === 'published' ? 'Republier' : 'Publier'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminBlogEditSidebar;
