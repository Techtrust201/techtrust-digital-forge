
import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Plus, MessageSquare, Tags, BarChart3 } from 'lucide-react';
import { useBlogPosts, useBlogCategories, useBlogComments } from '@/hooks/useBlogData';
import { useNavigate } from 'react-router-dom';

const AdminBlogPage = () => {
  const navigate = useNavigate();
  const { data: blogPosts } = useBlogPosts();
  const { data: categories } = useBlogCategories();
  const { data: comments } = useBlogComments();

  const publishedPosts = blogPosts?.filter(post => post.status === 'published').length || 0;
  const draftPosts = blogPosts?.filter(post => post.status === 'draft').length || 0;
  const totalViews = blogPosts?.reduce((sum, post) => sum + (post.views || 0), 0) || 0;
  const pendingComments = comments?.filter(comment => comment.status === 'pending').length || 0;

  const quickActions = [
    {
      title: 'Créer un article',
      description: 'Rédiger un nouvel article de blog',
      icon: Plus,
      action: () => navigate('/admin/blog/create'),
      color: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      title: 'Gérer les articles',
      description: 'Voir et modifier tous les articles',
      icon: FileText,
      action: () => navigate('/admin/blog/posts'),
      color: 'bg-green-500 hover:bg-green-600'
    },
    {
      title: 'Modérer les commentaires',
      description: 'Approuver ou rejeter les commentaires',
      icon: MessageSquare,
      action: () => navigate('/admin/blog/comments'),
      color: 'bg-orange-500 hover:bg-orange-600',
      badge: pendingComments > 0 ? pendingComments : undefined
    },
    {
      title: 'Gérer les catégories',
      description: 'Organiser vos catégories d\'articles',
      icon: Tags,
      action: () => navigate('/admin/blog/categories'),
      color: 'bg-purple-500 hover:bg-purple-600'
    }
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Gestion du Blog</h1>
            <p className="text-gray-500 mt-2">Gérer le contenu et les interactions de votre blog</p>
          </div>
          <Button 
            className="bg-red-500 hover:bg-red-600"
            onClick={() => navigate('/admin/blog/create')}
          >
            <Plus className="w-4 h-4 mr-2" />
            Nouvel article
          </Button>
        </div>

        {/* Statistiques rapides */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <FileText className="w-8 h-8 text-blue-500" />
                <div>
                  <p className="text-2xl font-bold">{blogPosts?.length || 0}</p>
                  <p className="text-sm text-gray-500">Total articles</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <BarChart3 className="w-8 h-8 text-green-500" />
                <div>
                  <p className="text-2xl font-bold">{totalViews.toLocaleString()}</p>
                  <p className="text-sm text-gray-500">Vues totales</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <MessageSquare className="w-8 h-8 text-orange-500" />
                <div>
                  <p className="text-2xl font-bold">{comments?.length || 0}</p>
                  <p className="text-sm text-gray-500">Commentaires</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Tags className="w-8 h-8 text-purple-500" />
                <div>
                  <p className="text-2xl font-bold">{categories?.length || 0}</p>
                  <p className="text-sm text-gray-500">Catégories</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Actions rapides */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {quickActions.map((action, index) => (
            <Card key={index} className="hover:shadow-lg transition-all cursor-pointer group" onClick={action.action}>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-lg ${action.color} transition-colors relative`}>
                    <action.icon className="w-6 h-6 text-white" />
                    {action.badge && (
                      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {action.badge}
                      </span>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {action.title}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">{action.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Aperçu des derniers articles */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Derniers articles
              <Button variant="outline" onClick={() => navigate('/admin/blog/posts')}>
                Voir tout
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {blogPosts?.slice(0, 5).map((post) => (
                <div key={post.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{post.title}</h4>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                      <span>{post.category}</span>
                      <span>•</span>
                      <span>{post.status === 'published' ? 'Publié' : 'Brouillon'}</span>
                      <span>•</span>
                      <span>{new Date(post.created_at).toLocaleDateString('fr-FR')}</span>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500">
                    {post.views} vues
                  </div>
                </div>
              ))}
              {(!blogPosts || blogPosts.length === 0) && (
                <div className="text-center py-8 text-gray-500">
                  <FileText className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                  <p>Aucun article pour le moment</p>
                  <Button 
                    variant="outline" 
                    className="mt-3"
                    onClick={() => navigate('/admin/blog/create')}
                  >
                    Créer votre premier article
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminBlogPage;
