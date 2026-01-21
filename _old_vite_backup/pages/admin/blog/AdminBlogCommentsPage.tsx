
import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, Check, X, Eye, Flag, User, Calendar } from 'lucide-react';
import { useBlogComments, useBlogActions } from '@/hooks/useBlogData';
import { Skeleton } from '@/components/ui/skeleton';

const AdminBlogCommentsPage = () => {
  const { data: comments, isLoading } = useBlogComments();
  const { updateCommentStatus } = useBlogActions();

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

  const handleApprove = (id: string) => {
    updateCommentStatus.mutate({ id, status: 'approved' });
  };

  const handleReject = (id: string) => {
    updateCommentStatus.mutate({ id, status: 'rejected' });
  };

  const handleMarkAsSpam = (id: string) => {
    updateCommentStatus.mutate({ id, status: 'spam' });
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="space-y-6">
          <Skeleton className="h-8 w-64" />
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-32" />
            ))}
          </div>
        </div>
      </AdminLayout>
    );
  }

  const totalComments = comments?.length || 0;
  const pendingComments = comments?.filter(c => c.status === 'pending').length || 0;
  const approvedComments = comments?.filter(c => c.status === 'approved').length || 0;
  const spamComments = comments?.filter(c => c.status === 'spam').length || 0;

  const statsData = [
    { label: 'Total commentaires', value: totalComments, icon: MessageCircle, color: 'text-blue-500' },
    { label: 'En attente', value: pendingComments, icon: Eye, color: 'text-yellow-500' },
    { label: 'Approuvés', value: approvedComments, icon: Check, color: 'text-green-500' },
    { label: 'Spam/Rejetés', value: spamComments, icon: Flag, color: 'text-red-500' },
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
              <Card key={stat.label} className="hover:shadow-lg transition-shadow cursor-pointer">
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
              {comments?.map((comment: any) => (
                <div key={comment.id} className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-sm">{comment.author_name.charAt(0)}</span>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{comment.author_name}</h4>
                        <p className="text-sm text-gray-500">{comment.author_email}</p>
                      </div>
                      <Badge className={getStatusColor(comment.status)}>
                        {getStatusLabel(comment.status)}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      {comment.status === 'pending' && (
                        <>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="text-green-600 hover:text-green-700 hover:bg-green-50"
                            onClick={() => handleApprove(comment.id)}
                            disabled={updateCommentStatus.isPending}
                          >
                            <Check className="w-4 h-4" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            onClick={() => handleReject(comment.id)}
                            disabled={updateCommentStatus.isPending}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </>
                      )}
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="hover:bg-orange-50"
                        onClick={() => handleMarkAsSpam(comment.id)}
                        disabled={updateCommentStatus.isPending}
                      >
                        <Flag className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="bg-white p-3 rounded border mb-3">
                    <p className="text-gray-900">{comment.content}</p>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center gap-4">
                      <span>Article: {comment.blog_posts?.title || 'Article supprimé'}</span>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(comment.created_at).toLocaleString()}
                      </div>
                    </div>
                    {comment.ip_address && (
                      <span>IP: {comment.ip_address}</span>
                    )}
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
