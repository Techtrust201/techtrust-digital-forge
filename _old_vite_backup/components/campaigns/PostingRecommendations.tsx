
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Clock,
  Calendar,
  TrendingUp,
  Users,
  BarChart3,
  Target,
  Lightbulb,
  Zap
} from 'lucide-react';

interface PostingRecommendation {
  platform: string;
  bestTimes: string[];
  bestDays: string[];
  engagement_rate: number;
  reasoning: string;
  icon?: React.ReactNode;
  color?: string;
}

const PostingRecommendations = () => {
  const recommendations: PostingRecommendation[] = [
    {
      platform: 'TikTok',
      bestTimes: ['18:00-20:00', '21:00-23:00'],
      bestDays: ['Mardi', 'Jeudi', 'Vendredi'],
      engagement_rate: 0.18,
      reasoning: 'Pic d\'audience jeune en soirée, contenu viral optimal',
      color: 'bg-pink-500'
    },
    {
      platform: 'Instagram',
      bestTimes: ['11:00-13:00', '17:00-19:00'],
      bestDays: ['Mercredi', 'Vendredi', 'Dimanche'],
      engagement_rate: 0.12,
      reasoning: 'Pause déjeuner et fin de journée, visuels de qualité',
      color: 'bg-gradient-to-r from-purple-500 to-pink-500'
    },
    {
      platform: 'Facebook',
      bestTimes: ['13:00-15:00', '20:00-21:00'],
      bestDays: ['Mercredi', 'Jeudi', 'Samedi'],
      engagement_rate: 0.08,
      reasoning: 'Audience plus mature, contenu informatif privilégié',
      color: 'bg-blue-600'
    },
    {
      platform: 'YouTube',
      bestTimes: ['14:00-16:00', '20:00-22:00'],
      bestDays: ['Jeudi', 'Vendredi', 'Samedi', 'Dimanche'],
      engagement_rate: 0.06,
      reasoning: 'Consommation de contenu long, week-end favorable',
      color: 'bg-red-600'
    }
  ];

  const globalTips = [
    {
      icon: <Zap className="w-4 h-4" />,
      title: 'Moment optimal global',
      content: 'Publiez entre 19h-21h pour toucher le maximum d\'audience',
      color: 'text-yellow-600'
    },
    {
      icon: <Target className="w-4 h-4" />,
      title: 'Cohérence de publication',
      content: 'Maintenez un rythme régulier: 3-5 posts par semaine',
      color: 'text-blue-600'
    },
    {
      icon: <TrendingUp className="w-4 h-4" />,
      title: 'Analyse des tendances',
      content: 'Adaptez vos hashtags aux trends du moment',
      color: 'text-green-600'
    },
    {
      icon: <Users className="w-4 h-4" />,
      title: 'Engagement communautaire',
      content: 'Répondez aux commentaires dans les 2h pour booster l\'algorithme',
      color: 'text-purple-600'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Recommandations de publication IA</h3>
        <p className="text-gray-500 text-sm">Optimisez vos publications avec l'analyse des données d'engagement</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {recommendations.map((rec) => (
          <Card key={rec.platform} className="relative overflow-hidden">
            <div className={`absolute top-0 left-0 right-0 h-1 ${rec.color}`} />
            
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">{rec.platform}</CardTitle>
                <Badge variant="outline" className="text-green-600 border-green-200">
                  +{(rec.engagement_rate * 100).toFixed(1)}% engagement
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <span className="text-sm font-medium">Meilleurs créneaux</span>
                  </div>
                  <div className="space-y-1">
                    {rec.bestTimes.map((time, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {time}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span className="text-sm font-medium">Meilleurs jours</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {rec.bestDays.map((day, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {day}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-start gap-2">
                  <Lightbulb className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-gray-700">{rec.reasoning}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-blue-500" />
            Conseils stratégiques
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {globalTips.map((tip, index) => (
              <div key={index} className="flex items-start gap-3 p-3 border rounded-lg">
                <div className={`${tip.color} mt-0.5`}>
                  {tip.icon}
                </div>
                <div>
                  <h4 className="font-medium text-sm">{tip.title}</h4>
                  <p className="text-sm text-gray-600 mt-1">{tip.content}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardContent className="pt-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500 rounded-full">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 className="font-semibold text-blue-900">Boost IA automatique</h4>
              <p className="text-blue-700 text-sm">
                Nos algorithmes optimisent automatiquement vos horaires de publication 
                en analysant les performances de vos contenus précédents.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PostingRecommendations;
