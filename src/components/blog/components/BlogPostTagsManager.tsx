
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tag, Plus, X } from 'lucide-react';

interface BlogPostTagsManagerProps {
  tags: string[];
  errors: Record<string, string>;
  onTagsChange: (tags: string[]) => void;
  onErrorChange: (field: string, message?: string) => void;
}

const BlogPostTagsManager: React.FC<BlogPostTagsManagerProps> = ({
  tags,
  errors,
  onTagsChange,
  onErrorChange,
}) => {
  const [tagInput, setTagInput] = useState('');

  const addTag = () => {
    if (!tagInput.trim()) return;
    
    if (tags.includes(tagInput.trim())) {
      onErrorChange('tag', 'Ce tag existe déjà');
      return;
    }
    
    const newTags = [...tags, tagInput.trim()];
    onTagsChange(newTags);
    setTagInput('');
    onErrorChange('tag');
  };

  const removeTag = (tagToRemove: string) => {
    const newTags = tags.filter(tag => tag !== tagToRemove);
    onTagsChange(newTags);
  };

  return (
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
        {tags.map(tag => (
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
  );
};

export default BlogPostTagsManager;
