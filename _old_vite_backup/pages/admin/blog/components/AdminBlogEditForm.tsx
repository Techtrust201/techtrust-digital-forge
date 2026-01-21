
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface AdminBlogEditFormProps {
  formData: {
    title: string;
    content: string;
    excerpt: string;
    category: string;
    status: string;
    author: string;
  };
  onChange: (field: string, value: string) => void;
}

const AdminBlogEditForm = ({ formData, onChange }: AdminBlogEditFormProps) => {
  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
      ['clean']
    ],
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Informations de base</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="title">Titre de l'article</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => onChange('title', e.target.value)}
              className="text-lg font-medium"
            />
          </div>

          <div>
            <Label htmlFor="excerpt">Extrait</Label>
            <Textarea
              id="excerpt"
              value={formData.excerpt}
              onChange={(e) => onChange('excerpt', e.target.value)}
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="author">Auteur</Label>
            <Input
              id="author"
              value={formData.author}
              onChange={(e) => onChange('author', e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Contenu de l'article</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mt-2">
            <ReactQuill
              theme="snow"
              value={formData.content}
              onChange={(value) => onChange('content', value)}
              modules={modules}
              style={{ height: '400px', marginBottom: '50px' }}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminBlogEditForm;
