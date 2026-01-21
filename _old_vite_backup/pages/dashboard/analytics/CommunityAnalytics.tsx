
import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Users, 
  MessageSquare, 
  Heart, 
  Share, 
  TrendingUp, 
  ArrowUp, 
  ArrowDown,
  Star,
  Clock,
  AlertCircle,
  ThumbsUp,
  Eye,
  Calendar
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const CommunityAnalytics = () => {
  // Données simulées pour community management
  const engagementData = [
    { name: 'Lun', messages: 45, reactions: 189, partages: 23, mentions: 12 },
    { name: 'Mar', messages: 52, reactions: 234, partages: 31, mentions: 18 },
    { name: 'Mer', messages: 38, reactions: 156, partages: 19, mentions: 8 },
    { name: 'Jeu', messages: 67, reactions: 298, partages: 42, mentions: 25 },
    { name: 'Ven', messages: 84, reactions: 367, partages: 56, mentions: 34 },
    { name: 'Sam', messages: 91, reactions: 423, partages: 68, mentions: 41 },
    { name: 'Dim', messages: 73, reactions: 298, partages: 45, mentions: 28 }
  ];

  const sentimentData = [
    { name: 'Très positif', value: 45, color: '#10B981' },
    { name: 'Positif', value: 32, color: '#34D399' },
    { name: 'Neutre', value: 18, color: '#6B7280' },
    { name: 'Négatif', value: 5, color: '#F59E0B' }
  ];

  const topInfluencersData = [
    { name: '@sarah_tech', followers: '12.5K', engagement: '4.2%', mentions: 23 },
    { name: '@digital_expert', followers: '8.9K', engagement: '3.8%', mentions: 18 },
    { name: '@marketing_guru', followers: '15.2K', engagement: '2.9%', mentions: 15 },
    { name: '@growth_master', followers: '6.7K', engagement: '5.1%', mentions: 12 }
  ];

  const recentMentionsData = [
    { 
      id: 1, 
      author: '@client_heureux', 
      content: 'Excellent service client de @techtrust ! Très réactifs et professionnels 👏', 
      sentiment: 'positive',
      platform: 'Twitter',
      time: '2h'
    },
    { 
      id: 2, 
      author: '@startup_owner', 
      content: 'Leur solution de growth hacking a boosté nos conversions de 40% !', 
      sentiment: 'positive',
      platform: 'LinkedIn',
      time: '4h'
    },
    { 
      id: 3, 
      author: '@digital_agency', 
      content: 'Question sur les tarifs de @techtrust, quelqu\'un a des infos ?', 
      sentiment: 'neutral',
      platform: 'Twitter',
      time: '6h'
    }
  ];

  const quickStats = [
    {
      title: 'Mentions Totales',
      value: '1,248',
      change: '+18.3%',
      positive: true,
      icon: MessageSquare
    },
    {
      title: 'Sentiment Positif',
      value: '77%',
      change: '+5.2%',
      positive: true,
      icon: Heart
    },
    {
      title: 'Portée Organique',
      value: '89.2K',
      change: '+12.7%',
      positive: true,
      icon: Eye
    },
    {
      title: 'Taux de Réponse',
      value: '94%',
      change: '+2.1%',
      positive: true,
      icon: Clock
    }
  ];

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'text-green-600 bg-green-100';
      case 'negative': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return ThumbsUp;
      case 'negative': return AlertCircle;
      default: return MessageSquare;
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <Users className="w-8 h-8 text-green-500" />
              Analytics Community Management
            </h1>
            <p className="text-gray-600">
              Gestion et analyse de votre communauté en ligne
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge className="bg-green-100 text-green-800">
              <Heart className="w-3 h-3 mr-1" />
              77% positif
            </Badge>
            <Badge className="bg-blue-100 text-blue-800">
              <MessageSquare className="w-3 h-3 mr-1" />
              24 à traiter
            </Badge>
          </div>
        </div>

        {/* Stats rapides */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickStats.map((stat, index) => {
            const StatIcon = stat.icon;
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <StatIcon className="w-8 h-8 text-green-500" />
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
          {/* Graphiques principaux */}
          <div className="lg:col-span-2 space-y-6">
            {/* Évolution de l'engagement */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-500" />
                  Évolution de l'Engagement Communauté
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={engagementData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="messages" stroke="#10B981" strokeWidth={2} name="Messages" />
                    <Line type="monotone" dataKey="reactions" stroke="#3B82F6" strokeWidth={2} name="Réactions" />
                    <Line type="monotone" dataKey="partages" stroke="#8B5CF6" strokeWidth={2} name="Partages" />
                    <Line type="monotone" dataKey="mentions" stroke="#F59E0B" strokeWidth={2} name="Mentions" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Mentions récentes */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-green-500" />
                  Mentions Récentes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentMentionsData.map((mention) => {
                    const SentimentIcon = getSentimentIcon(mention.sentiment);
                    return (
                      <div key={mention.id} className="p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-sm">{mention.author}</span>
                            <Badge variant="outline" className="text-xs">{mention.platform}</Badge>
                            <Badge className={`text-xs ${getSentimentColor(mention.sentiment)}`}>
                              <SentimentIcon className="w-3 h-3 mr-1" />
                              {mention.sentiment}
                            </Badge>
                          </div>
                          <span className="text-xs text-gray-500">{mention.time}</span>
                        </div>
                        <p className="text-sm text-gray-800 mb-3">{mention.content}</p>
                        <div className="flex items-center gap-2">
                          <Button size="sm" variant="outline">Répondre</Button>
                          <Button size="sm" variant="ghost">Marquer comme lu</Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Top influenceurs */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-green-500" />
                  Top Influenceurs qui Parlent de Vous
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topInfluencersData.map((influencer, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-sm">{influencer.name.charAt(1).toUpperCase()}</span>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{influencer.name}</h4>
                          <p className="text-sm text-gray-600">{influencer.followers} followers</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">{influencer.mentions} mentions</div>
                        <div className="text-xs text-gray-500">{influencer.engagement} engagement</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Analyse de sentiment */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-green-500" />
                  Analyse de Sentiment
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {sentimentData.map((sentiment, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{sentiment.name}</span>
                        <span className="text-sm text-gray-600">{sentiment.value}%</span>
                      </div>
                      <div className="relative">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="h-2 rounded-full transition-all duration-300"
                            style={{ 
                              width: `${sentiment.value}%`,
                              backgroundColor: sentiment.color 
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
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
                    Répondre aux mentions
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Calendar className="w-4 h-4 mr-2" />
                    Programmer contenu
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Rapport détaillé
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Alertes */}
            <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <AlertCircle className="w-5 h-5 text-yellow-600" />
                  <h3 className="font-bold text-gray-900">Alertes</h3>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="p-2 bg-yellow-100 rounded text-yellow-800">
                    3 mentions négatives à traiter
                  </div>
                  <div className="p-2 bg-blue-100 rounded text-blue-800">
                    Pic d'activité détecté sur LinkedIn
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Score de satisfaction */}
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">4.8/5</div>
                <h3 className="font-bold text-gray-900 mb-2">Satisfaction Client</h3>
                <div className="flex justify-center mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star 
                      key={star} 
                      className={`w-5 h-5 ${star <= 4.8 ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                    />
                  ))}
                </div>
                <p className="text-sm text-gray-600">
                  Basé sur 247 avis
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CommunityAnalytics;
