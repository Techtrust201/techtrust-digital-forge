
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import RichTextEditor from '@/components/blog/RichTextEditor';

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

const AdminBlogCreateContent: React.FC<AdminBlogCreateContentProps> = ({
  title,
  excerpt,
  content,
  seoTitle,
  seoDescription,
  onTitleChange,
  onExcerptChange,
  onContentChange,
  onSeoTitleChange,
  onSeoDescriptionChange,
}) => {
  const handleTitleChange = (value: string) => {
    onTitleChange(value);
    if (!seoTitle) onSeoTitleChange(value);
  };

  const handleExcerptChange = (value: string) => {
    onExcerptChange(value);
    if (!seoDescription) onSeoDescriptionChange(value);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Contenu de l'article</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="title">Titre de l'article</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => handleTitleChange(e.target.value)}
            placeholder="Entrez le titre de votre article..."
            className="mt-2"
          />
        </div>

        <div>
          <Label htmlFor="excerpt">Extrait</Label>
          <Textarea
            id="excerpt"
            value={excerpt}
            onChange={(e) => handleExcerptChange(e.target.value)}
            placeholder="Un court résumé de votre article..."
            className="mt-2"
            rows={3}
          />
        </div>

        <RichTextEditor
          value={content}
          onChange={onContentChange}
          label="Contenu"
          placeholder="Rédigez votre article ici..."
        />
      </CardContent>
    </Card>
  );
};

export default AdminBlogCreateContent;
