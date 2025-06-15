
import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, Check, X, Eye, Flag, User, Calendar } from 'lucide-react';

const AdminBlogCommentsPage = () => {
  const comments = [
    {
      id: 1,
      author: 'Jean Dupont',
      email: 'jean@example.com',
      content: 'Excellent article ! Ces techniques de growth hacking sont vraiment efficaces. Merci pour le partage.',
      article: 'Les tendances du Growth Hacking en 2024',
      status: 'pending',
      date: '2024-01-16 14:30',
      ip: '192.168.1.1'
    },
    {
      id: 2,
      author: 'Marie Lambert',
      email: 'marie@example.com',
      content: 'Je ne suis pas d\'accord avec certains points mentionnés. Avez-vous des sources pour appuyer vos affirmations ?',
      article: 'Comment optimiser son référencement naturel',
      status: 'approved',
      date: '2024-01-15 09:15',
      ip: '192.168.1.2'
    },
    {
      id: 3,
      author: 'Spammer Bot',
      email: 'spam@fake.com',
      content: 'Cliquez ici pour gagner de l\'argent rapidement !!! www.fake-site.com',
      article: 'L\'importance du community management',
      status: 'spam',
      date: '2024-01-14 23:45',
      ip: '192.168.1.3'
    },
    {
      id: 4,
      author: 'Claire Martin',
      email: 'claire@example.com',
      content: 'Super article, très informatif. J\'ai appliqué vos conseils et j\'ai déjà vu des résultats positifs !',
      article: 'Stratégies de marketing digital pour PME',
      status: 'approved',
      date: '2024-01-13 16:20',
      ip: '192.168.1.4'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'spam':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'rejected':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'approved':
        return 'Approuvé';
      case 'pending':
        return 'En attente';
      case 'spam':
        return 'Spam';
      case 'rejected':
        return 'Rejeté';
      default:
        return status;
    }
  };

  const statsData = [
    { label: 'Total commentaires', value: comments.length, icon: MessageCircle, color: 'text-blue-500' },
    { label: 'En attente', value: comments.filter(c => c.status === 'pending').length, icon: Eye, color: 'text-yellow-500' },
    { label: 'Approuvés', value: comments.filter(c => c.status === 'approved').length, icon: Check, color: 'text-green-500' },
    { label: 'Spam/Rejetés', value: comments.filter(c => c.status === 'spam').length, icon: Flag, color: 'text-red-500' },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Commentaires de blog</h1>
          <p className="text-gray-500 mt-2">Modération et gestion des commentaires</p>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {statsData.map((stat) => {
            const IconComponent = stat.icon;
            return (
              <Card key={stat.label}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <IconComponent className={`w-8 h-8 ${stat.color}`} />
                    <div>
                      <p className="text-2xl font-bold">{stat.value}</p>
                      <p className="text-sm text-gray-500">{stat.label}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Liste des commentaires */}
        <Card>
          <CardHeader>
            <CardTitle>Tous les commentaires</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {comments.map((comment) => (
                <div key={comment.id} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-sm">{comment.author.charAt(0)}</span>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{comment.author}</h4>
                        <p className="text-sm text-gray-500">{comment.email}</p>
                      </div>
                      <Badge className={getStatusColor(comment.status)}>
                        {getStatusLabel(comment.status)}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      {comment.status === 'pending' && (
                        <>
                          <Button size="sm" variant="outline" className="text-green-600 hover:text-green-700">
                            <Check className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                            <X className="w-4 h-4" />
                          </Button>
                        </>
                      )}
                      <Button size="sm" variant="outline">
                        <Flag className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="bg-white p-3 rounded border mb-3">
                    <p className="text-gray-900">{comment.content}</p>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center gap-4">
                      <span>Article: {comment.article}</span>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {comment.date}
                      </div>
                    </div>
                    <span>IP: {comment.ip}</span>
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

export default AdminBlogCommentsPage;
