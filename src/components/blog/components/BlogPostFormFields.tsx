
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface FormData {
  title: string;
  excerpt: string;
  content: string;
  author: string;
  image: string;
}

interface BlogPostFormFieldsProps {
  formData: FormData;
  errors: Record<string, string>;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const BlogPostFormFields: React.FC<BlogPostFormFieldsProps> = ({
  formData,
  errors,
  onChange,
}) => {
  return (
    <>
      <div>
        <Label htmlFor="title" className="text-base font-medium">Titre</Label>
        <Input
          id="title"
          name="title"
          placeholder="Titre de l'article"
          value={formData.title}
          onChange={onChange}
          className={errors.title ? 'border-red-500' : ''}
        />
        {errors.title && <p className="text-sm text-red-500 mt-1">{errors.title}</p>}
      </div>
      
      <div>
        <Label htmlFor="excerpt" className="text-base font-medium">Extrait</Label>
        <Textarea
          id="excerpt"
          name="excerpt"
          placeholder="Bref résumé de l'article"
          rows={2}
          value={formData.excerpt}
          onChange={onChange}
          className={errors.excerpt ? 'border-red-500' : ''}
        />
        {errors.excerpt && <p className="text-sm text-red-500 mt-1">{errors.excerpt}</p>}
      </div>
      
      <div>
        <Label htmlFor="content" className="text-base font-medium">Contenu</Label>
        <Textarea
          id="content"
          name="content"
          placeholder="Contenu de l'article"
          rows={10}
          value={formData.content}
          onChange={onChange}
          className={errors.content ? 'border-red-500' : ''}
        />
        {errors.content && <p className="text-sm text-red-500 mt-1">{errors.content}</p>}
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="author" className="text-base font-medium">Auteur</Label>
          <Input
            id="author"
            name="author"
            placeholder="Nom de l'auteur"
            value={formData.author}
            onChange={onChange}
          />
        </div>
        
        <div>
          <Label htmlFor="image" className="text-base font-medium">Image URL</Label>
          <Input
            id="image"
            name="image"
            placeholder="URL de l'image"
            value={formData.image}
            onChange={onChange}
          />
        </div>
      </div>
    </>
  );
};

export default BlogPostFormFields;
