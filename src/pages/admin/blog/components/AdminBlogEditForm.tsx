
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import RichTextEditor from '@/components/blog/RichTextEditor';

interface FormData {
  title: string;
  content: string;
  excerpt: string;
  category: string;
  status: 'draft' | 'published' | 'scheduled';
  author: string;
}

interface AdminBlogEditFormProps {
  formData: FormData;
  onChange: (field: keyof FormData, value: string) => void;
}

const AdminBlogEditForm: React.FC<AdminBlogEditFormProps> = ({
  formData,
  onChange,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Contenu de l'article</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="title">Titre *</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => onChange('title', e.target.value)}
            placeholder="Titre de l'article"
            required
          />
        </div>
        
        <div>
          <Label htmlFor="excerpt">Extrait</Label>
          <Textarea
            id="excerpt"
            value={formData.excerpt}
            onChange={(e) => onChange('excerpt', e.target.value)}
            placeholder="Résumé court de l'article (optionnel)"
            rows={3}
          />
        </div>
        
        <RichTextEditor
          value={formData.content}
          onChange={(value) => onChange('content', value)}
          label="Contenu *"
          placeholder="Contenu complet de l'article"
        />
      </CardContent>
    </Card>
  );
};

export default AdminBlogEditForm;
