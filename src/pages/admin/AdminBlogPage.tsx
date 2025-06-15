import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  PenTool, 
  Eye, 
  MessageSquare, 
  Calendar,
  Search,
  Plus,
  MoreHorizontal,
  Edit,
  Trash2,
  CheckCircle
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useBlogActions } from '@/hooks/useBlogActions';
import { useCategoryActions } from '@/hooks/useCategoryActions';
import { useCommentActions } from '@/hooks/useCommentActions';

const AdminBlogPage = () => {
  const [activeTab, setActiveTab] = useState('articles');
  const [newArticle, setNewArticle] = useState({ title: '', content: '', category: '' });
  const [newCategory, setNewCategory] = useState({ name: '', description: '' });
  const [showNewArticleModal, setShowNewArticleModal] = useState(false);
  const [showNewCategoryModal, setShowNewCategoryModal] = useState(false);

  const { createArticle, publishArticle, saveDraft, deleteArticle, isLoading: blogLoading } = useBlogActions();
  const { createCategory, updateCategory, deleteCategory, isLoading: categoryLoading } = useCategoryActions();
  const { viewComment, deleteComment, approveComment, isLoading: commentLoading } = useCommentActions();

  // Données mockées
  const articles = [
    { id: '1', title: 'Growth Hacking 2025', status: 'published', views: 1250, comments: 8, author: 'Admin', date: '2025-01-15' },
    { id: '2', title: 'IA et Marketing', status: 'draft', views: 0, comments: 0, author: 'Admin', date: '2025-01-14' }
  ];

  const categories = [
    { id: '1', name: 'Growth Hacking', description: 'Stratégies de croissance', articles: 5 },
    { id: '2', name: 'IA Marketing', description: 'Intelligence artificielle', articles: 3 }
  ];

  const comments = [
    { id: '1', author: 'Marie D.', content: 'Excellent article !', status: 'pending', article: 'Growth Hacking 2025', date: '2025-01-15' },
    { id: '2', author: 'Jean M.', content: 'Très instructif', status: 'approved', article: 'Growth Hacking 2025', date: '2025-01-14' }
  ];

  const handleCreateArticle = async () => {
    if (!newArticle.title || !newArticle.content) return;
    
    await createArticle(newArticle);
    setNewArticle({ title: '', content: '', category: '' });
    setShowNewArticleModal(false);
  };

  const handleCreateCategory = async () => {
    if (!newCategory.name) return;
    
    await createCategory(newCategory);
    setNewCategory({ name: '', description: '' });
    setShowNewCategoryModal(false);
  };

  const renderArticles = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="relative">
          <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
          <Input placeholder="Rechercher un article..." className="pl-10 w-64" />
        </div>
        <Dialog open={showNewArticleModal} onOpenChange={setShowNewArticleModal}>
          <DialogTrigger asChild>
            <Button className="bg-red-500 hover:bg-red-600">
              <Plus className="w-4 h-4 mr-2" />
              Nouvel article
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Créer un nouvel article</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Input
                placeholder="Titre de l'article"
                value={newArticle.title}
                onChange={(e) => setNewArticle({...newArticle, title: e.target.value})}
              />
              <Textarea
                placeholder="Contenu de l'article"
                value={newArticle.content}
                onChange={(e) => setNewArticle({...newArticle, content: e.target.value})}
                rows={10}
              />
              <div className="flex gap-2">
                <Button onClick={handleCreateArticle} disabled={blogLoading}>
                  Publier l'article
                </Button>
                <Button variant="outline" onClick={() => saveDraft(newArticle)} disabled={blogLoading}>
                  Sauvegarder en brouillon
                </Button>
                <Button variant="outline" onClick={() => setShowNewArticleModal(false)}>
                  Aperçu
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {articles.map((article) => (
          <Card key={article.id}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h3 className="font-semibold">{article.title}</h3>
                    <Badge variant={article.status === 'published' ? 'default' : 'secondary'}>
                      {article.status === 'published' ? 'Publié' : 'Brouillon'}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-500 mt-2">
                    <span className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      {article.views} vues
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageSquare className="w-4 h-4" />
                      {article.comments} commentaires
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {article.date}
                    </span>
                  </div>
                </div>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => console.log('Modifier', article.id)}>
                      <Edit className="w-4 h-4 mr-2" />
                      Modifier
                    </DropdownMenuItem>
                    {article.status === 'draft' && (
                      <DropdownMenuItem onClick={() => publishArticle(article.id)}>
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Publier
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem 
                      onClick={() => deleteArticle(article.id)}
                      className="text-red-600"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Supprimer
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderCategories = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Catégories</h3>
        <Dialog open={showNewCategoryModal} onOpenChange={setShowNewCategoryModal}>
          <DialogTrigger asChild>
            <Button className="bg-red-500 hover:bg-red-600">
              <Plus className="w-4 h-4 mr-2" />
              Ajouter
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Créer une catégorie</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Input
                placeholder="Nom de la catégorie"
                value={newCategory.name}
                onChange={(e) => setNewCategory({...newCategory, name: e.target.value})}
              />
              <Textarea
                placeholder="Description"
                value={newCategory.description}
                onChange={(e) => setNewCategory({...newCategory, description: e.target.value})}
              />
              <Button onClick={handleCreateCategory} disabled={categoryLoading}>
                Créer la catégorie
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {categories.map((category) => (
          <Card key={category.id}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold">{category.name}</h4>
                  <p className="text-sm text-gray-500">{category.description}</p>
                  <p className="text-xs text-gray-400 mt-1">{category.articles} articles</p>
                </div>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => console.log('Modifier catégorie', category.id)}>
                      <Edit className="w-4 h-4 mr-2" />
                      Modifier
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => deleteCategory(category.id)}
                      className="text-red-600"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Supprimer
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderComments = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Commentaires</h3>
      
      <div className="grid gap-4">
        {comments.map((comment) => (
          <Card key={comment.id}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-semibold">{comment.author}</span>
                    <Badge variant={comment.status === 'approved' ? 'default' : 'secondary'}>
                      {comment.status === 'approved' ? 'Approuvé' : 'En attente'}
                    </Badge>
                  </div>
                  <p className="text-sm mb-2">{comment.content}</p>
                  <p className="text-xs text-gray-500">Sur: {comment.article} - {comment.date}</p>
                </div>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => viewComment(comment.id)}>
                      <Eye className="w-4 h-4 mr-2" />
                      Voir
                    </DropdownMenuItem>
                    {comment.status === 'pending' && (
                      <DropdownMenuItem onClick={() => approveComment(comment.id)}>
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Approuver
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem 
                      onClick={() => deleteComment(comment.id)}
                      className="text-red-600"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Supprimer
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestion du Blog</h1>
          <p className="text-gray-500 mt-2">Créez et gérez vos articles de blog</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Articles</CardTitle>
              <PenTool className="h-4 w-4 text-muted-foreground" />
            </Car\dHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">+2 ce mois</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Vues totales</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12,450</div>
              <p className="text-xs text-muted-foreground">+15% vs mois dernier</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Commentaires</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">156</div>
              <p className="text-xs text-muted-foreground">23 en attente</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Engagement</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8.2%</div>
              <p className="text-xs text-muted-foreground">+2.1% vs mois dernier</p>
            </CardContent>
          </Card>
        </div>

        {/* Navigation tabs */}
        <div className="border-b">
          <nav className="-mb-px flex space-x-8">
            {[
              { id: 'articles', label: 'Articles' },
              { id: 'categories', label: 'Catégories' },
              { id: 'comments', label: 'Commentaires' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-red-500 text-red-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div>
          {activeTab === 'articles' && renderArticles()}
          {activeTab === 'categories' && renderCategories()}
          {activeTab === 'comments' && renderComments()}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminBlogPage;
