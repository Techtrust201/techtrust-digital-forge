
import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, 
  Users, 
  Eye, 
  MousePointer, 
  Globe, 
  Instagram, 
  Facebook, 
  Twitter,
  Calendar,
  ArrowUp,
  ArrowDown,
  BarChart3,
  PieChart,
  Activity
} from 'lucide-react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart as RechartsPieChart, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Analytics = () => {
  const [activeTab, setActiveTab] = useState('website');
  const [userData] = useState(() => {
    const user = localStorage.getItem('techtrust_user');
    return user ? JSON.parse(user) : null;
  });

  // Vérifier si l'utilisateur a accès aux analytics selon ses services
  const hasWebsiteAccess = () => {
    return userData?.services?.includes('site-web') || userData?.tier === 'silver' || userData?.tier === 'gold' || userData?.tier === 'diamond';
  };

  const hasSocialAccess = () => {
    return userData?.services?.includes('community-management') || userData?.tier === 'silver' || userData?.tier === 'gold' || userData?.tier === 'diamond';
  };

  const hasGrowthAccess = () => {
    return userData?.services?.includes('growth-hacking') || userData?.tier === 'gold' || userData?.tier === 'diamond';
  };

  const getWebsiteData = () => {
    if (!hasWebsiteAccess()) return null;
    
    const baseVisits = userData?.tier === 'diamond' ? 15000 : userData?.tier === 'gold' ? 8000 : userData?.tier === 'silver' ? 4000 : 1500;
    
    return {
      overview: {
        visits: baseVisits,
        visitors: Math.floor(baseVisits * 0.75),
        pageViews: Math.floor(baseVisits * 2.3),
        bounceRate: userData?.tier === 'diamond' ? 35 : userData?.tier === 'gold' ? 42 : 58,
        avgSession: userData?.tier === 'diamond' ? '4:35' : userData?.tier === 'gold' ? '3:20' : '2:15',
        conversion: userData?.tier === 'diamond' ? 4.2 : userData?.tier === 'gold' ? 2.8 : 1.5
      },
      traffic: [
        { name: 'Lun', visits: Math.floor(baseVisits * 0.12), conversion: 2.1 },
        { name: 'Mar', visits: Math.floor(baseVisits * 0.15), conversion: 2.8 },
        { name: 'Mer', visits: Math.floor(baseVisits * 0.18), conversion: 3.2 },
        { name: 'Jeu', visits: Math.floor(baseVisits * 0.16), conversion: 2.9 },
        { name: 'Ven', visits: Math.floor(baseVisits * 0.20), conversion: 3.5 },
        { name: 'Sam', visits: Math.floor(baseVisits * 0.10), conversion: 1.8 },
        { name: 'Dim', visits: Math.floor(baseVisits * 0.09), conversion: 1.5 }
      ],
      sources: [
        { name: 'Organique', value: 45, color: '#22c55e' },
        { name: 'Direct', value: 25, color: '#3b82f6' },
        { name: 'Réseaux sociaux', value: 20, color: '#f59e0b' },
        { name: 'Email', value: 10, color: '#ef4444' }
      ],
      pages: [
        { page: '/accueil', visits: Math.floor(baseVisits * 0.35), time: '3:45' },
        { page: '/services', visits: Math.floor(baseVisits * 0.22), time: '2:30' },
        { page: '/blog/article-1', visits: Math.floor(baseVisits * 0.15), time: '5:20' },
        { page: '/contact', visits: Math.floor(baseVisits * 0.18), time: '1:50' },
        { page: '/pricing', visits: Math.floor(baseVisits * 0.10), time: '4:10' }
      ]
    };
  };

  const getSocialData = () => {
    if (!hasSocialAccess()) return null;
    
    const baseFollowers = userData?.tier === 'diamond' ? 25000 : userData?.tier === 'gold' ? 12000 : userData?.tier === 'silver' ? 5000 : 2000;
    
    return {
      platforms: [
        {
          name: 'Instagram',
          icon: Instagram,
          followers: baseFollowers,
          growth: userData?.tier === 'diamond' ? 15.2 : userData?.tier === 'gold' ? 8.5 : 3.2,
          engagement: userData?.tier === 'diamond' ? 4.8 : userData?.tier === 'gold' ? 3.2 : 2.1,
          posts: 24,
          reach: Math.floor(baseFollowers * 3.2)
        },
        {
          name: 'Facebook',
          icon: Facebook,
          followers: Math.floor(baseFollowers * 0.8),
          growth: userData?.tier === 'diamond' ? 12.1 : userData?.tier === 'gold' ? 6.8 : 2.5,
          engagement: userData?.tier === 'diamond' ? 3.5 : userData?.tier === 'gold' ? 2.8 : 1.8,
          posts: 18,
          reach: Math.floor(baseFollowers * 2.1)
        },
        {
          name: 'LinkedIn',
          icon: Twitter,
          followers: Math.floor(baseFollowers * 0.6),
          growth: userData?.tier === 'diamond' ? 18.5 : userData?.tier === 'gold' ? 10.2 : 4.1,
          engagement: userData?.tier === 'diamond' ? 6.2 : userData?.tier === 'gold' ? 4.1 : 2.8,
          posts: 15,
          reach: Math.floor(baseFollowers * 1.8)
        }
      ],
      engagement: [
        { day: 'Lun', likes: 450, comments: 23, shares: 12 },
        { day: 'Mar', likes: 680, comments: 35, shares: 18 },
        { day: 'Mer', likes: 520, comments: 28, shares: 15 },
        { day: 'Jeu', likes: 750, comments: 42, shares: 22 },
        { day: 'Ven', likes: 890, comments: 56, shares: 28 },
        { day: 'Sam', likes: 1200, comments: 78, shares: 35 },
        { day: 'Dim', likes: 980, comments: 65, shares: 30 }
      ]
    };
  };

  const getGrowthData = () => {
    if (!hasGrowthAccess()) return null;
    
    const baseLeads = userData?.tier === 'diamond' ? 1500 : userData?.tier === 'gold' ? 800 : 400;
    
    return {
      overview: {
        leads: baseLeads,
        qualified: Math.floor(baseLeads * 0.65),
        converted: Math.floor(baseLeads * 0.18),
        revenue: Math.floor(baseLeads * 45),
        cost: Math.floor(baseLeads * 12),
        roi: userData?.tier === 'diamond' ? 375 : userData?.tier === 'gold' ? 275 : 190
      },
      campaigns: [
        { name: 'Email Marketing', leads: Math.floor(baseLeads * 0.35), cost: 450, roi: 280 },
        { name: 'LinkedIn Ads', leads: Math.floor(baseLeads * 0.25), cost: 680, roi: 320 },
        { name: 'SEO Content', leads: Math.floor(baseLeads * 0.20), cost: 320, roi: 450 },
        { name: 'Social Media', leads: Math.floor(baseLeads * 0.20), cost: 280, roi: 195 }
      ],
      funnel: [
        { stage: 'Visiteurs', value: Math.floor(baseLeads * 8), color: '#3b82f6' },
        { stage: 'Leads', value: baseLeads, color: '#22c55e' },
        { stage: 'Qualifiés', value: Math.floor(baseLeads * 0.65), color: '#f59e0b' },
        { stage: 'Clients', value: Math.floor(baseLeads * 0.18), color: '#ef4444' }
      ]
    };
  };

  const websiteData = getWebsiteData();
  const socialData = getSocialData();
  const growthData = getGrowthData();

  const renderAccessDenied = (serviceName: string) => (
    <div className="text-center py-16">
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <BarChart3 className="w-8 h-8 text-gray-400" />
      </div>
      <h3 className="text-xl font-medium text-gray-900 mb-2">
        Accès {serviceName} requis
      </h3>
      <p className="text-gray-600 mb-6">
        Ces analytics sont disponibles uniquement avec le service {serviceName}.
      </p>
      <Button className="bg-blue-500 hover:bg-blue-600">
        Upgrader mon plan
      </Button>
    </div>
  );

  const renderWebsiteAnalytics = () => {
    if (!websiteData) return renderAccessDenied('Site Web');
    
    return (
      <div className="space-y-6">
        {/* Vue d'ensemble */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Visiteurs uniques</p>
                  <p className="text-3xl font-bold text-gray-900">{websiteData.overview.visitors.toLocaleString()}</p>
                  <div className="flex items-center mt-2">
                    <ArrowUp className="w-4 h-4 text-green-500 mr-1" />
                    <span className="text-sm text-green-600">+12.5% vs mois dernier</span>
                  </div>
                </div>
                <Users className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Pages vues</p>
                  <p className="text-3xl font-bold text-gray-900">{websiteData.overview.pageViews.toLocaleString()}</p>
                  <div className="flex items-center mt-2">
                    <ArrowUp className="w-4 h-4 text-green-500 mr-1" />
                    <span className="text-sm text-green-600">+8.3% vs mois dernier</span>
                  </div>
                </div>
                <Eye className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Taux de conversion</p>
                  <p className="text-3xl font-bold text-gray-900">{websiteData.overview.conversion}%</p>
                  <div className="flex items-center mt-2">
                    <ArrowUp className="w-4 h-4 text-green-500 mr-1" />
                    <span className="text-sm text-green-600">+0.8% vs mois dernier</span>
                  </div>
                </div>
                <MousePointer className="w-8 h-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Graphiques */}
        <div className="grid lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Trafic des 7 derniers jours</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={websiteData.traffic}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="visits" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Sources de trafic</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <RechartsPieChart>
                  <Tooltip />
                  <RechartsPieChart data={websiteData.sources} cx="50%" cy="50%" outerRadius={80} dataKey="value">
                    {websiteData.sources.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </RechartsPieChart>
                </RechartsPieChart>
              </ResponsiveContainer>
              <div className="mt-4 space-y-2">
                {websiteData.sources.map((source) => (
                  <div key={source.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: source.color }} />
                      <span className="text-sm">{source.name}</span>
                    </div>
                    <span className="text-sm font-medium">{source.value}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Pages populaires */}
        <Card>
          <CardHeader>
            <CardTitle>Pages les plus visitées</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {websiteData.pages.map((page, index) => (
                <div key={page.page} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-4">
                    <Badge variant="outline">{index + 1}</Badge>
                    <div>
                      <p className="font-medium">{page.page}</p>
                      <p className="text-sm text-gray-600">{page.visits} visites</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Temps moyen</p>
                    <p className="font-medium">{page.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  const renderSocialAnalytics = () => {
    if (!socialData) return renderAccessDenied('Community Management');
    
    return (
      <div className="space-y-6">
        {/* Vue d'ensemble des plateformes */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {socialData.platforms.map((platform) => {
            const PlatformIcon = platform.icon;
            return (
              <Card key={platform.name}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <PlatformIcon className="w-8 h-8 text-blue-500" />
                    <Badge className={`${platform.growth > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {platform.growth > 0 ? '+' : ''}{platform.growth}%
                    </Badge>
                  </div>
                  <h3 className="font-bold text-lg text-gray-900 mb-2">{platform.name}</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Abonnés</span>
                      <span className="font-medium">{platform.followers.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Engagement</span>
                      <span className="font-medium">{platform.engagement}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Posts ce mois</span>
                      <span className="font-medium">{platform.posts}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Portée</span>
                      <span className="font-medium">{platform.reach.toLocaleString()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Engagement cette semaine */}
        <Card>
          <CardHeader>
            <CardTitle>Engagement cette semaine</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={socialData.engagement}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="likes" fill="#3b82f6" name="J'aime" />
                <Bar dataKey="comments" fill="#22c55e" name="Commentaires" />
                <Bar dataKey="shares" fill="#f59e0b" name="Partages" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    );
  };

  const renderGrowthAnalytics = () => {
    if (!growthData) return renderAccessDenied('Growth Hacking');
    
    return (
      <div className="space-y-6">
        {/* Métriques clés */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Leads générés</p>
                  <p className="text-3xl font-bold text-gray-900">{growthData.overview.leads.toLocaleString()}</p>
                  <div className="flex items-center mt-2">
                    <ArrowUp className="w-4 h-4 text-green-500 mr-1" />
                    <span className="text-sm text-green-600">+23% vs mois dernier</span>
                  </div>
                </div>
                <TrendingUp className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Taux de conversion</p>
                  <p className="text-3xl font-bold text-gray-900">{((growthData.overview.converted / growthData.overview.leads) * 100).toFixed(1)}%</p>
                  <div className="flex items-center mt-2">
                    <ArrowUp className="w-4 h-4 text-green-500 mr-1" />
                    <span className="text-sm text-green-600">+2.1% vs mois dernier</span>
                  </div>
                </div>
                <MousePointer className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">ROI Global</p>
                  <p className="text-3xl font-bold text-gray-900">{growthData.overview.roi}%</p>
                  <div className="flex items-center mt-2">
                    <ArrowUp className="w-4 h-4 text-green-500 mr-1" />
                    <span className="text-sm text-green-600">+45% vs mois dernier</span>
                  </div>
                </div>
                <Activity className="w-8 h-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Performance des campagnes */}
        <Card>
          <CardHeader>
            <CardTitle>Performance des campagnes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {growthData.campaigns.map((campaign) => (
                <div key={campaign.name} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900">{campaign.name}</h4>
                    <Badge className={campaign.roi > 200 ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}>
                      ROI: {campaign.roi}%
                    </Badge>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Leads</p>
                      <p className="font-bold">{campaign.leads}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Coût</p>
                      <p className="font-bold">{campaign.cost}€</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Coût/Lead</p>
                      <p className="font-bold">{Math.round(campaign.cost / campaign.leads)}€</p>
                    </div>
                  </div>
                  <Progress value={(campaign.leads / Math.max(...growthData.campaigns.map(c => c.leads))) * 100} className="mt-3" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Funnel de conversion */}
        <Card>
          <CardHeader>
            <CardTitle>Funnel de conversion</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {growthData.funnel.map((stage, index) => (
                <div key={stage.stage} className="relative">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-900">{stage.stage}</span>
                    <span className="text-lg font-bold" style={{ color: stage.color }}>
                      {stage.value.toLocaleString()}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="h-3 rounded-full transition-all duration-500" 
                      style={{ 
                        backgroundColor: stage.color,
                        width: `${(stage.value / growthData.funnel[0].value) * 100}%`
                      }}
                    />
                  </div>
                  {index < growthData.funnel.length - 1 && (
                    <div className="text-sm text-gray-500 mt-1">
                      Taux de conversion: {((stage.value / growthData.funnel[index].value) * 100).toFixed(1)}%
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Analytics & Performance 📊</h1>
            <p className="text-gray-600">Suivez vos performances en temps réel</p>
          </div>
          
          <div className="flex items-center gap-2">
            <Badge className="bg-blue-100 text-blue-800">
              <Calendar className="w-4 h-4 mr-1" />
              30 derniers jours
            </Badge>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-gray-200">
          {hasWebsiteAccess() && (
            <Button
              variant={activeTab === 'website' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('website')}
              className="flex items-center gap-2"
            >
              <Globe className="w-4 h-4" />
              Site Web
            </Button>
          )}
          {hasSocialAccess() && (
            <Button
              variant={activeTab === 'social' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('social')}
              className="flex items-center gap-2"
            >
              <Instagram className="w-4 h-4" />
              Réseaux Sociaux
            </Button>
          )}
          {hasGrowthAccess() && (
            <Button
              variant={activeTab === 'growth' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('growth')}
              className="flex items-center gap-2"
            >
              <TrendingUp className="w-4 h-4" />
              Growth Hacking
            </Button>
          )}
        </div>

        {/* Contenu selon l'onglet actif */}
        {activeTab === 'website' && renderWebsiteAnalytics()}
        {activeTab === 'social' && renderSocialAnalytics()}
        {activeTab === 'growth' && renderGrowthAnalytics()}
      </div>
    </DashboardLayout>
  );
};

export default Analytics;
