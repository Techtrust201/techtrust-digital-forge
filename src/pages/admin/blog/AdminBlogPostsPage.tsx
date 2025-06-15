
import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, Plus, Edit, Trash2, Eye, Calendar, User } from 'lucide-react';

const AdminBlogPostsPage = () => {
  const blogPosts = [
    {
      id: 1,
      title: 'Les tendances du Growth Hacking en 2024',
      author: 'Marie Dubois',
      category: 'Growth Hacking',
      status: 'published',
      views: 2847,
      publishDate: '2024-01-15',
      lastModified: '2024-01-16'
    },
    {
      id: 2,
      title: 'Comment optimiser son référencement naturel',
      author: 'Pierre Martin',
      category: 'SEO',
      status: 'draft',
      views: 0,
      publishDate: null,
      lastModified: '2024-01-14'
    },
    {
      id: 3,
      title: 'L\'importance du community management',
      author: 'Sophie Lefebvre',
      category: 'Community',
      status: 'published',
      views: 1923,
      publishDate: '2024-01-12',
      lastModified: '2024-01-12'
    },
    {
      id: 4,
      title: 'Stratégies de marketing digital pour PME',
      author: 'Thomas Bernard',
      category: 'Marketing',
      status: 'scheduled',
      views: 0,
      publishDate: '2024-01-20',
      lastModified: '2024-01-14'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'draft':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'scheduled':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'published':
        return 'Publié';
      case 'draft':
        return 'Brouillon';
      case 'scheduled':
        return 'Programmé';
      default:
        return status;
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Articles de blog</h1>
            <p className="text-gray-500 mt-2">Gérer tous les articles de blog</p>
          </div>
          <Button className="bg-red-500 hover:bg-red-600">
            <Plus className="w-4 h-4 mr-2" />
            Nouvel article
          </Button>
        </div>

        {/* Stats rapides */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <FileText className="w-8 h-8 text-blue-500" />
                <div>
                  <p className="text-2xl font-bold">24</p>
                  <p className="text-sm text-gray-500">Total articles</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Eye className="w-8 h-8 text-green-500" />
                <div>
                  <p className="text-2xl font-bold">45.2K</p>
                  <p className="text-sm text-gray-500">Vues totales</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Calendar className="w-8 h-8 text-purple-500" />
                <div>
                  <p className="text-2xl font-bold">3</p>
                  <p className="text-sm text-gray-500">Programmés</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Edit className="w-8 h-8 text-orange-500" />
                <div>
                  <p className="text-2xl font-bold">5</p>
                  <p className="text-sm text-gray-500">Brouillons</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Liste des articles */}
        <Card>
          <CardHeader>
            <CardTitle>Tous les articles</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {blogPosts.map((post) => (
                <div key={post.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-medium text-gray-900">{post.title}</h3>
                      <Badge className={getStatusColor(post.status)}>
                        {getStatusLabel(post.status)}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {post.author}
                      </div>
                      <div className="flex items-center gap-1">
                        <FileText className="w-4 h-4" />
                        {post.category}
                      </div>
                      {post.publishDate && (
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {post.publishDate}
                        </div>
                      )}
                      {post.status === 'published' && (
                        <div className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          {post.views.toLocaleString()} vues
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminBlogPostsPage;
