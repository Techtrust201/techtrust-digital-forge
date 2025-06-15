
import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Save, Eye, Send, Plus, X } from 'lucide-react';
import { useBlogCategories, useBlogActions } from '@/hooks/useBlogData';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useNavigate } from 'react-router-dom';
import { Skeleton } from '@/components/ui/skeleton';

const AdminBlogCreatePage = () => {
  const navigate = useNavigate();
  const { data: categories, isLoading: categoriesLoading } = useBlogCategories();
  const { createPost, updatePost } = useBlogActions();
  
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [content, setContent] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');
  const [status, setStatus] = useState('draft');
  const [seoTitle, setSeoTitle] = useState('');
  const [seoDescription, setSeoDescription] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const [currentPostId, setCurrentPostId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    }
  };

  const handleSaveDraft = async () => {
    if (!title.trim() || !content.trim()) {
      return;
    }

    setIsSaving(true);
    try {
      const postData = {
        title,
        content,
        excerpt: excerpt || title.substring(0, 160),
        author: 'Admin',
        category: category || 'Non classé',
        status: 'draft' as const,
        views: 0,
      };

      if (currentPostId) {
        await updatePost.mutateAsync({ id: currentPostId, ...postData });
      } else {
        const newPost = await createPost.mutateAsync(postData);
        setCurrentPostId(newPost.id);
      }
    } finally {
      setIsSaving(false);
    }
  };

  const handlePublish = async () => {
    if (!title.trim() || !content.trim() || !category) {
      return;
    }

    setIsSaving(true);
    try {
      const postData = {
        title,
        content,
        excerpt: excerpt || title.substring(0, 160),
        author: 'Admin',
        category,
        status: 'published' as const,
        views: 0,
        publish_date: new Date().toISOString(),
      };

      if (currentPostId) {
        await updatePost.mutateAsync({ id: currentPostId, ...postData });
      } else {
        await createPost.mutateAsync(postData);
      }
      
      navigate('/admin/blog/posts');
    } finally {
      setIsSaving(false);
    }
  };

  const handlePreview = () => {
    setShowPreview(true);
  };

  if (categoriesLoading) {
    return (
      <AdminLayout>
        <div className="space-y-6">
          <Skeleton className="h-8 w-64" />
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Skeleton className="h-96" />
            </div>
            <div className="space-y-4">
              <Skeleton className="h-32" />
              <Skeleton className="h-24" />
            </div>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Créer un article</h1>
            <p className="text-gray-500 mt-2">Rédiger un nouveau article de blog</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={handlePreview} disabled={!title || !content}>
              <Eye className="w-4 h-4 mr-2" />
              Aperçu
            </Button>
            <Button variant="outline" onClick={handleSaveDraft} disabled={isSaving || !title || !content}>
              <Save className="w-4 h-4 mr-2" />
              {isSaving ? 'Sauvegarde...' : 'Sauvegarder'}
            </Button>
            <Button 
              className="bg-red-500 hover:bg-red-600" 
              onClick={handlePublish}
              disabled={isSaving || !title || !content || !category}
            >
              <Send className="w-4 h-4 mr-2" />
              {isSaving ? 'Publication...' : 'Publier'}
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Contenu principal */}
          <div className="lg:col-span-2 space-y-6">
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
                    onChange={(e) => {
                      setTitle(e.target.value);
                      if (!seoTitle) setSeoTitle(e.target.value);
                    }}
                    placeholder="Entrez le titre de votre article..."
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="excerpt">Extrait</Label>
                  <Textarea
                    id="excerpt"
                    value={excerpt}
                    onChange={(e) => {
                      setExcerpt(e.target.value);
                      if (!seoDescription) setSeoDescription(e.target.value);
                    }}
                    placeholder="Un court résumé de votre article..."
                    className="mt-2"
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="content">Contenu</Label>
                  <Textarea
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Rédigez votre article ici..."
                    className="mt-2 min-h-[400px]"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Paramètres de publication */}
            <Card>
              <CardHeader>
                <CardTitle>Publication</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="status">Statut</Label>
                  <Select value={status} onValueChange={setStatus}>
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
                  <Select value={category} onValueChange={setCategory}>
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
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ajouter un tag..."
                    className="flex-1"
                  />
                  <Button onClick={addTag} size="sm">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                
                {tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                        {tag}
                        <button
                          onClick={() => removeTag(tag)}
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
                    onChange={(e) => setSeoTitle(e.target.value)}
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
                    onChange={(e) => setSeoDescription(e.target.value)}
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
        </div>

        {/* Preview Dialog */}
        <Dialog open={showPreview} onOpenChange={setShowPreview}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Aperçu de l'article</DialogTitle>
            </DialogHeader>
            <div className="space-y-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">{title}</h1>
                {excerpt && (
                  <p className="text-xl text-gray-600 mb-6 italic">{excerpt}</p>
                )}
                <div className="flex gap-2 mb-4">
                  {tags.map(tag => (
                    <Badge key={tag} variant="secondary">{tag}</Badge>
                  ))}
                </div>
                <div className="prose max-w-none">
                  <div className="whitespace-pre-wrap">{content}</div>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
};

export default AdminBlogCreatePage;
