
import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  MessageSquare, 
  Heart, 
  Share, 
  TrendingUp, 
  Users, 
  ArrowUp, 
  ArrowDown,
  Instagram,
  Twitter,
  Facebook,
  Linkedin,
  Youtube
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const SocialAnalytics = () => {
  // Données simulées
  const socialData = [
    { name: 'Lun', followers: 1200, engagement: 240, reach: 5400 },
    { name: 'Mar', followers: 1350, engagement: 380, reach: 6200 },
    { name: 'Mer', followers: 1420, engagement: 420, reach: 7100 },
    { name: 'Jeu', followers: 1580, engagement: 520, reach: 8300 },
    { name: 'Ven', followers: 1720, engagement: 680, reach: 9400 },
    { name: 'Sam', followers: 1850, engagement: 720, reach: 10200 },
    { name: 'Dim', followers: 1920, engagement: 580, reach: 8900 }
  ];

  const platformsData = [
    { 
      name: 'Instagram', 
      followers: 12500, 
      engagement: 4.2, 
      growth: '+12.5%', 
      positive: true,
      icon: Instagram,
      color: 'text-pink-500'
    },
    { 
      name: 'Facebook', 
      followers: 8900, 
      engagement: 3.1, 
      growth: '+8.3%', 
      positive: true,
      icon: Facebook,
      color: 'text-blue-600'
    },
    { 
      name: 'Twitter', 
      followers: 5400, 
      engagement: 2.8, 
      growth: '-2.1%', 
      positive: false,
      icon: Twitter,
      color: 'text-sky-500'
    },
    { 
      name: 'LinkedIn', 
      followers: 3200, 
      engagement: 5.6, 
      growth: '+15.7%', 
      positive: true,
      icon: Linkedin,
      color: 'text-blue-700'
    }
  ];

  const topPostsData = [
    { id: 1, content: 'Nouveau service de growth hacking...', likes: 245, comments: 32, shares: 18, platform: 'Instagram' },
    { id: 2, content: 'Tips pour optimiser votre site web...', likes: 189, comments: 24, shares: 15, platform: 'Facebook' },
    { id: 3, content: 'Webinar gratuit sur le marketing digital...', likes: 156, comments: 41, shares: 28, platform: 'LinkedIn' },
    { id: 4, content: 'Tendances 2024 du e-commerce...', likes: 134, comments: 19, shares: 12, platform: 'Twitter' }
  ];

  const quickStats = [
    {
      title: 'Total Followers',
      value: '30,000+',
      change: '+12.5%',
      positive: true,
      icon: Users
    },
    {
      title: 'Engagement Moyen',
      value: '4.2%',
      change: '+0.8%',
      positive: true,
      icon: Heart
    },
    {
      title: 'Portée Mensuelle',
      value: '250K',
      change: '+18.3%',
      positive: true,
      icon: TrendingUp
    },
    {
      title: 'Partages',
      value: '1,248',
      change: '+25.1%',
      positive: true,
      icon: Share
    }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <MessageSquare className="w-8 h-8 text-pink-500" />
              Analytics Réseaux Sociaux
            </h1>
            <p className="text-gray-600">
              Performance de vos campagnes sur les réseaux sociaux
            </p>
          </div>
          <Badge className="bg-pink-100 text-pink-800 w-fit">
            <Heart className="w-3 h-3 mr-1" />
            Très engageant
          </Badge>
        </div>

        {/* Stats rapides */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickStats.map((stat, index) => {
            const StatIcon = stat.icon;
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <StatIcon className="w-8 h-8 text-pink-500" />
                    <div className={`flex items-center gap-1 text-sm ${
                      stat.positive ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {stat.positive ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
                      {stat.change}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
                    <p className="text-sm text-gray-600">{stat.title}</p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Graphique principal */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-pink-500" />
                  Évolution de l'Engagement
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={socialData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="followers" stroke="#EC4899" strokeWidth={2} name="Followers" />
                    <Line type="monotone" dataKey="engagement" stroke="#8B5CF6" strokeWidth={2} name="Engagement" />
                    <Line type="monotone" dataKey="reach" stroke="#06B6D4" strokeWidth={2} name="Portée" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Top Posts */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Posts les Plus Performants</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topPostsData.map((post) => (
                    <div key={post.id} className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <p className="text-sm text-gray-800 mb-2">{post.content}</p>
                          <Badge variant="outline" className="text-xs">{post.platform}</Badge>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Heart className="w-4 h-4" />
                          {post.likes}
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageSquare className="w-4 h-4" />
                          {post.comments}
                        </div>
                        <div className="flex items-center gap-1">
                          <Share className="w-4 h-4" />
                          {post.shares}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Plateformes */}
            <Card>
              <CardHeader>
                <CardTitle>Performance par Plateforme</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {platformsData.map((platform, index) => {
                    const PlatformIcon = platform.icon;
                    return (
                      <div key={index} className="p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <PlatformIcon className={`w-5 h-5 ${platform.color}`} />
                            <span className="font-medium">{platform.name}</span>
                          </div>
                          <div className={`flex items-center gap-1 text-sm ${
                            platform.positive ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {platform.positive ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                            {platform.growth}
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <div className="text-gray-500">Followers</div>
                            <div className="font-medium">{platform.followers.toLocaleString()}</div>
                          </div>
                          <div>
                            <div className="text-gray-500">Engagement</div>
                            <div className="font-medium">{platform.engagement}%</div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Actions rapides */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-bold text-gray-900 mb-4">Actions Rapides</h3>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Programmer post
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Heart className="w-4 h-4 mr-2" />
                    Analyser engagement
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Users className="w-4 h-4 mr-2" />
                    Audit audience
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recommandation */}
            <Card className="bg-gradient-to-br from-pink-50 to-purple-50 border-pink-200">
              <CardContent className="p-6 text-center">
                <MessageSquare className="w-8 h-8 text-pink-500 mx-auto mb-4" />
                <h3 className="font-bold text-gray-900 mb-2">Optimisation IA</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Meilleur moment pour poster : 14h-16h
                </p>
                <Button size="sm" className="bg-pink-500 hover:bg-pink-600">
                  Programmer maintenant
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SocialAnalytics;
