
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { DialogFooter } from '@/components/ui/dialog';
import { Tag, Plus, X } from 'lucide-react';

interface BlogPostFormProps {
  onSubmit: (post: {
    title: string;
    excerpt: string;
    content: string;
    author: string;
    image: string;
    tags: string[];
  }) => void;
  initialData?: {
    title: string;
    excerpt: string;
    content: string;
    author: string;
    image: string;
    tags: string[];
  };
}

const BlogPostForm: React.FC<BlogPostFormProps> = ({ onSubmit, initialData }) => {
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    excerpt: initialData?.excerpt || '',
    content: initialData?.content || '',
    author: initialData?.author || 'Équipe Techtrust',
    image: initialData?.image || '/placeholder.svg',
    tags: initialData?.tags || [],
  });
  const [tagInput, setTagInput] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Effacer l'erreur lorsque l'utilisateur modifie le champ
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const addTag = () => {
    if (!tagInput.trim()) return;
    if (formData.tags.includes(tagInput.trim())) {
      setErrors(prev => ({ ...prev, tag: 'Ce tag existe déjà' }));
      return;
    }
    setFormData(prev => ({
      ...prev,
      tags: [...prev.tags, tagInput.trim()]
    }));
    setTagInput('');
    if (errors.tag) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.tag;
        return newErrors;
      });
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation de base
    const newErrors: Record<string, string> = {};
    if (!formData.title.trim()) newErrors.title = 'Le titre est requis';
    if (!formData.excerpt.trim()) newErrors.excerpt = "L'extrait est requis";
    if (!formData.content.trim()) newErrors.content = 'Le contenu est requis';
    if (formData.tags.length === 0) newErrors.tags = 'Au moins un tag est requis';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="title" className="text-base font-medium">Titre</Label>
        <Input
          id="title"
          name="title"
          placeholder="Titre de l'article"
          value={formData.title}
          onChange={handleChange}
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
          onChange={handleChange}
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
          onChange={handleChange}
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
            onChange={handleChange}
          />
        </div>
        
        <div>
          <Label htmlFor="image" className="text-base font-medium">Image URL</Label>
          <Input
            id="image"
            name="image"
            placeholder="URL de l'image"
            value={formData.image}
            onChange={handleChange}
          />
        </div>
      </div>
      
      <div>
        <Label className="text-base font-medium">Tags</Label>
        <div className="flex gap-2 mb-2">
          <Input
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            placeholder="Ajouter un tag"
            className={errors.tag ? 'border-red-500' : ''}
          />
          <Button 
            type="button" 
            onClick={addTag} 
            variant="outline"
            size="icon"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        {errors.tag && <p className="text-sm text-red-500 mt-1">{errors.tag}</p>}
        {errors.tags && <p className="text-sm text-red-500 mt-1">{errors.tags}</p>}
        
        <div className="flex flex-wrap gap-2 mt-3">
          {formData.tags.map(tag => (
            <span 
              key={tag} 
              className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700"
            >
              <Tag className="mr-1 h-3 w-3" />
              {tag}
              <button 
                type="button"
                onClick={() => removeTag(tag)}
                className="ml-1 hover:text-blue-900"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
        </div>
      </div>
      
      <DialogFooter>
        <Button type="submit">Publier l'article</Button>
      </DialogFooter>
    </form>
  );
};

export default BlogPostForm;
