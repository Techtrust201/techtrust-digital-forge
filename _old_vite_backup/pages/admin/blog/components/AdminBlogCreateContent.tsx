
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface AdminBlogCreateContentProps {
  title: string;
  excerpt: string;
  content: string;
  seoTitle: string;
  seoDescription: string;
  onTitleChange: (value: string) => void;
  onExcerptChange: (value: string) => void;
  onContentChange: (value: string) => void;
  onSeoTitleChange: (value: string) => void;
  onSeoDescriptionChange: (value: string) => void;
}

const AdminBlogCreateContent = ({
  title,
  excerpt,
  content,
  seoTitle,
  seoDescription,
  onTitleChange,
  onExcerptChange,
  onContentChange,
  onSeoTitleChange,
  onSeoDescriptionChange
}: AdminBlogCreateContentProps) => {
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
    <>
      <Card>
        <CardHeader>
          <CardTitle>Contenu de l'article</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="title">Titre de l'article *</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => onTitleChange(e.target.value)}
              placeholder="Saisissez le titre de votre article..."
              className="text-lg font-medium"
            />
          </div>

          <div>
            <Label htmlFor="excerpt">Extrait (optionnel)</Label>
            <Textarea
              id="excerpt"
              value={excerpt}
              onChange={(e) => onExcerptChange(e.target.value)}
              placeholder="Un court résumé de votre article..."
              rows={3}
            />
          </div>

          <div>
            <Label>Contenu de l'article *</Label>
            <div className="mt-2">
              <ReactQuill
                theme="snow"
                value={content}
                onChange={onContentChange}
                modules={modules}
                placeholder="Commencez à écrire votre article..."
                style={{ height: '400px', marginBottom: '50px' }}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>SEO et Métadonnées</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="seoTitle">Titre SEO</Label>
            <Input
              id="seoTitle"
              value={seoTitle}
              onChange={(e) => onSeoTitleChange(e.target.value)}
              placeholder="Titre optimisé pour les moteurs de recherche"
            />
            <p className="text-sm text-gray-500 mt-1">
              {seoTitle.length}/60 caractères recommandés
            </p>
          </div>

          <div>
            <Label htmlFor="seoDescription">Description SEO</Label>
            <Textarea
              id="seoDescription"
              value={seoDescription}
              onChange={(e) => onSeoDescriptionChange(e.target.value)}
              placeholder="Description pour les moteurs de recherche..."
              rows={3}
            />
            <p className="text-sm text-gray-500 mt-1">
              {seoDescription.length}/160 caractères recommandés
            </p>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default AdminBlogCreateContent;
