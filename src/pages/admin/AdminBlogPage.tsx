
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  FileText, 
  Plus, 
  Search, 
  Filter,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  Calendar,
  MessageSquare,
  TrendingUp,
  FolderOpen,
  Tag
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const AdminBlogPage = () => {
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState('');

  const getPageTitle = () => {
    const path = location.pathname;
    if (path.includes('/create')) return 'Créer un article';
    if (path.includes('/categories')) return 'Catégories';
    if (path.includes('/comments')) return 'Commentaires';
    return 'Gestion des Articles';
  };

  const getPageDescription = () => {
    const path = location.pathname;
    if (path.includes('/create')) return 'Créer un nouvel article de blog';
    if (path.includes('/categories')) return 'Gérer les catégories d\'articles';
    if (path.includes('/comments')) return 'Modérer les commentaires des lecteurs';
    return 'Gérez votre contenu et vos publications';
  };

  const mockPosts = [
    {
      id: 1,
      title: 'Les tendances du web design en 2024',
      author: 'Marie Dubois',
      status: 'published',
      category: 'Web Design',
      views: 1247,
      comments: 23,
      created: '2024-01-15',
      updated: '2024-01-20'
    },
    {
      id: 2,
      title: 'Comment optimiser votre SEO local',
      author: 'Pierre Martin',
      status: 'draft',
      category: 'SEO',
      views: 0,
      comments: 0,
      created: '2024-01-18',
      updated: '2024-01-18'
    },
    {
      id: 3,
      title: 'Growth Hacking : 10 stratégies qui marchent',
      author: 'Sophie Laurent',
      status: 'published',
      category: 'Marketing',
      views: 2156,
      comments: 45,
      created: '2024-01-10',
      updated: '2024-01-12'
    }
  ];

  const mockCategories = [
    { id: 1, name: 'Web Design', posts: 12, color: 'blue' },
    { id: 2, name: 'SEO', posts: 8, color: 'green' },
    { id: 3, name: 'Marketing', posts: 15, color: 'purple' },
    { id: 4, name: 'Development', posts: 6, color: 'orange' }
  ];

  const mockComments = [
    {
      id: 1,
      author: 'Jean Dupont',
      email: 'jean@email.com',
      content: 'Excellent article ! Très instructif.',
      post: 'Les tendances du web design en 2024',
      status: 'approved',
      created: '2024-01-20 14:30'
    },
    {
      id: 2,
      author: 'Marie Martin',
      email: 'marie@email.com',
      content: 'Pourriez-vous donner plus d\'exemples concrets ?',
      post: 'Growth Hacking : 10 stratégies',
      status: 'pending',
      created: '2024-01-19 16:45'
    },
    {
      id: 3,
      author: 'Spam Bot',
      email: 'spam@fake.com',
      content: 'Visitez notre site pour des offres incroyables !',
      post: 'Comment optimiser votre SEO',
      status: 'spam',
      created: '2024-01-18 09:15'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      case 'archived': return 'bg-gray-100 text-gray-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'spam': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'published': return 'Publié';
      case 'draft': return 'Brouillon';
      case 'archived': return 'Archivé';
      case 'approved': return 'Approuvé';
      case 'pending': return 'En attente';
      case 'spam': return 'Spam';
      default: return status;
    }
  };

  const getCategoryColor = (color: string) => {
    switch (color) {
      case 'blue': return 'bg-blue-100 text-blue-800';
      case 'green': return 'bg-green-100 text-green-800';
      case 'purple': return 'bg-purple-100 text-purple-800';
      case 'orange': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Page Créer un article
  if (location.pathname.includes('/create')) {
    return (
      <AdminLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{getPageTitle()}</h1>
            <p className="text-gray-500 mt-2">{getPageDescription()}</p>
          </div>

          <Card className="max-w-4xl">
            <CardHeader>
              <CardTitle>Nouvel article</CardTitle>
              <CardDescription>Rédigez et publiez un nouvel article de blog</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="text-sm font-medium">Titre de l'article</label>
                <Input placeholder="Entrez le titre de votre article..." />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Catégorie</label>
                  <select className="w-full p-2 border rounded-md">
                    <option value="">Sélectionner une catégorie</option>
                    <option value="web-design">Web Design</option>
                    <option value="seo">SEO</option>
                    <option value="marketing">Marketing</option>
                    <option value="development">Development</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium">Statut</label>
                  <select className="w-full p-2 border rounded-md">
                    <option value="draft">Brouillon</option>
                    <option value="published">Publié</option>
                    <option value="archived">Archivé</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">Extrait</label>
                <Textarea placeholder="Résumé de l'article..." rows={3} />
              </div>

              <div>
                <label className="text-sm font-medium">Contenu</label>
                <Textarea placeholder="Contenu de l'article..." rows={12} />
              </div>

              <div>
                <label className="text-sm font-medium">Tags</label>
                <Input placeholder="Séparez les tags par des virgules..." />
              </div>

              <div className="flex gap-2 pt-4">
                <Button className="bg-red-500 hover:bg-red-600">Publier l'article</Button>
                <Button variant="outline">Sauvegarder en brouillon</Button>
                <Button variant="outline">Aperçu</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </AdminLayout>
    );
  }

  // Page Catégories
  if (location.pathname.includes('/categories')) {
    return (
      <AdminLayout>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{getPageTitle()}</h1>
              <p className="text-gray-500 mt-2">{getPageDescription()}</p>
            </div>
            <Button className="bg-red-500 hover:bg-red-600">
              <Plus className="w-4 h-4 mr-2" />
              Nouvelle catégorie
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockCategories.map((category) => (
              <Card key={category.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <FolderOpen className="w-8 h-8 text-gray-600" />
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem>
                          <Edit className="w-4 h-4 mr-2" />
                          Modifier
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="w-4 h-4 mr-2" />
                          Supprimer
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Badge className={getCategoryColor(category.color)}>
                      {category.name}
                    </Badge>
                    <p className="text-sm text-gray-600">{category.posts} articles</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Ajouter une catégorie</CardTitle>
              <CardDescription>Créez une nouvelle catégorie pour organiser vos articles</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Input placeholder="Nom de la catégorie" />
                <select className="p-2 border rounded-md">
                  <option value="blue">Bleu</option>
                  <option value="green">Vert</option>
                  <option value="purple">Violet</option>
                  <option value="orange">Orange</option>
                </select>
                <Button className="bg-red-500 hover:bg-red-600">
                  <Plus className="w-4 h-4 mr-2" />
                  Ajouter
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </AdminLayout>
    );
  }

  // Page Commentaires
  if (location.pathname.includes('/comments')) {
    return (
      <AdminLayout>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{getPageTitle()}</h1>
              <p className="text-gray-500 mt-2">{getPageDescription()}</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline">Approuver tout</Button>
              <Button variant="outline" className="text-red-600">Supprimer le spam</Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Commentaires</CardTitle>
                <MessageSquare className="h-4 w-4 text-gray-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,234</div>
                <p className="text-xs text-gray-600">+12 aujourd'hui</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">En attente</CardTitle>
                <Calendar className="h-4 w-4 text-yellow-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">23</div>
                <p className="text-xs text-gray-600">À modérer</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Spam détecté</CardTitle>
                <Trash2 className="h-4 w-4 text-red-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8</div>
                <p className="text-xs text-gray-600">Cette semaine</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Commentaires récents</CardTitle>
                  <CardDescription>Modérez les commentaires des lecteurs</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Input
                    placeholder="Rechercher un commentaire..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-64"
                  />
                  <Button variant="outline">
                    <Filter className="w-4 h-4 mr-2" />
                    Filtres
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Auteur</TableHead>
                    <TableHead>Commentaire</TableHead>
                    <TableHead>Article</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockComments.map((comment) => (
                    <TableRow key={comment.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{comment.author}</div>
                          <div className="text-sm text-gray-500">{comment.email}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="max-w-xs truncate">{comment.content}</div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">{comment.post}</div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(comment.status)}>
                          {getStatusText(comment.status)}
                        </Badge>
                      </TableCell>
                      <TableCell>{comment.created}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="w-4 h-4 mr-2" />
                              Voir
                            </DropdownMenuItem>
                            {comment.status === 'pending' && (
                              <DropdownMenuItem>
                                <MessageSquare className="w-4 h-4 mr-2" />
                                Approuver
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="w-4 h-4 mr-2" />
                              Supprimer
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </AdminLayout>
    );
  }

  // Page principale Blog
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{getPageTitle()}</h1>
            <p className="text-gray-500 mt-2">Gérez votre contenu et vos publications</p>
          </div>
          <Button className="bg-red-500 hover:bg-red-600">
            <Plus className="w-4 h-4 mr-2" />
            Nouvel article
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Articles</CardTitle>
              <FileText className="h-4 w-4 text-gray-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">247</div>
              <p className="text-xs text-gray-600">+12 ce mois</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Articles Publiés</CardTitle>
              <Eye className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">189</div>
              <p className="text-xs text-gray-600">76% du total</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Vues Totales</CardTitle>
              <TrendingUp className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">45.2K</div>
              <p className="text-xs text-gray-600">+8.2% cette semaine</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Commentaires</CardTitle>
              <MessageSquare className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,234</div>
              <p className="text-xs text-gray-600">+15 aujourd'hui</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Articles de blog</CardTitle>
                <CardDescription>Gérez tous vos articles et publications</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Rechercher un article..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-64"
                  />
                </div>
                <Button variant="outline">
                  <Filter className="w-4 h-4 mr-2" />
                  Filtres
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Article</TableHead>
                  <TableHead>Auteur</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Catégorie</TableHead>
                  <TableHead>Vues</TableHead>
                  <TableHead>Commentaires</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockPosts.map((post) => (
                  <TableRow key={post.id}>
                    <TableCell>
                      <div className="font-medium max-w-xs truncate">{post.title}</div>
                    </TableCell>
                    <TableCell>{post.author}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(post.status)}>
                        {getStatusText(post.status)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{post.category}</Badge>
                    </TableCell>
                    <TableCell>{post.views.toLocaleString()}</TableCell>
                    <TableCell>{post.comments}</TableCell>
                    <TableCell>{post.created}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="w-4 h-4 mr-2" />
                            Voir
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="w-4 h-4 mr-2" />
                            Modifier
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="w-4 h-4 mr-2" />
                            Supprimer
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Articles les plus populaires</CardTitle>
              <CardDescription>Top 5 des articles les plus vus</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockPosts.slice(0, 3).map((post, index) => (
                  <div key={post.id} className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-red-100 text-red-600 rounded-full flex items-center justify-center font-bold">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-sm truncate">{post.title}</div>
                      <div className="text-xs text-gray-500">{post.views} vues</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Activité récente</CardTitle>
              <CardDescription>Dernières actions sur le blog</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div className="flex-1">
                    <div className="text-sm font-medium">Article publié</div>
                    <div className="text-xs text-gray-500">Les tendances du web design - il y a 2h</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div className="flex-1">
                    <div className="text-sm font-medium">Nouveau commentaire</div>
                    <div className="text-xs text-gray-500">Growth Hacking stratégies - il y a 4h</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <div className="flex-1">
                    <div className="text-sm font-medium">Brouillon sauvegardé</div>
                    <div className="text-xs text-gray-500">Optimiser votre SEO - il y a 1j</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminBlogPage;
