"use client";

import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { 
  Sparkles, 
  FileText,
  Image,
  Video,
  ArrowUp, 
  ArrowDown,
  Plus,
  Eye,
  Edit,
  Copy,
  Download,
  Wand2,
  RefreshCw
} from 'lucide-react';

export default function ContentCreationPage() {
  const [activeTab, setActiveTab] = useState('generator');
  const [prompt, setPrompt] = useState('');
  const [generatedContent, setGeneratedContent] = useState('');

  const contentHistory = [
    { id: 1, type: 'Article', title: 'Guide complet du Growth Hacking', date: '16 Jan 2024', words: 1500 },
    { id: 2, type: 'Social', title: 'Post LinkedIn - Tendances 2024', date: '15 Jan 2024', words: 280 },
    { id: 3, type: 'Email', title: 'Newsletter Janvier', date: '14 Jan 2024', words: 450 },
    { id: 4, type: 'Ad', title: 'Campagne Google Ads', date: '13 Jan 2024', words: 90 }
  ];

  const templates = [
    { id: 1, name: 'Article de Blog', icon: FileText, description: 'Articles SEO optimisés' },
    { id: 2, name: 'Post Social', icon: Image, description: 'Posts engageants' },
    { id: 3, name: 'Email Marketing', icon: FileText, description: 'Emails qui convertissent' },
    { id: 4, name: 'Script Vidéo', icon: Video, description: 'Scripts YouTube/TikTok' },
    { id: 5, name: 'Description Produit', icon: FileText, description: 'Fiches produits' },
    { id: 6, name: 'Landing Page', icon: FileText, description: 'Copywriting conversion' }
  ];

  const quickStats = [
    { title: 'Contenus créés', value: '156', change: '+23', positive: true, icon: FileText },
    { title: 'Mots générés', value: '45,230', change: '+5,420', positive: true, icon: Sparkles },
    { title: 'Temps économisé', value: '32h', change: '+8h', positive: true, icon: RefreshCw },
    { title: 'Score qualité', value: '94%', change: '+2%', positive: true, icon: Wand2 }
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Article': return 'bg-blue-100 text-blue-800';
      case 'Social': return 'bg-pink-100 text-pink-800';
      case 'Email': return 'bg-green-100 text-green-800';
      case 'Ad': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleGenerate = () => {
    // Simulation de génération
    setGeneratedContent(`Voici un exemple de contenu généré par l'IA basé sur votre prompt:

"${prompt}"

---

**Introduction**
Dans le monde digital d'aujourd'hui, il est essentiel de comprendre les mécanismes qui permettent aux entreprises de se démarquer...

**Points clés**
- L'importance d'une stratégie de contenu cohérente
- Les meilleures pratiques pour engager votre audience
- Comment mesurer l'impact de vos actions

**Conclusion**
En appliquant ces principes, vous pourrez significativement améliorer votre présence en ligne et atteindre vos objectifs business.`);
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <Sparkles className="w-8 h-8 text-purple-500" />
              Création de Contenu IA
            </h1>
            <p className="text-gray-600">Générez du contenu de qualité avec l&apos;intelligence artificielle</p>
          </div>
          <Badge className="bg-purple-100 text-purple-800 w-fit">
            <Sparkles className="w-3 h-3 mr-1" />
            GPT-4 Turbo
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickStats.map((stat, index) => {
            const StatIcon = stat.icon;
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <StatIcon className="w-8 h-8 text-purple-500" />
                    <div className={`flex items-center gap-1 text-sm ${stat.positive ? 'text-green-600' : 'text-red-600'}`}>
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

        <div className="border-b">
          <nav className="flex space-x-8">
            {['generator', 'templates', 'history'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab
                    ? 'border-purple-500 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab === 'generator' ? 'Générateur' : tab === 'templates' ? 'Templates' : 'Historique'}
              </button>
            ))}
          </nav>
        </div>

        {activeTab === 'generator' && (
          <div className="grid lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wand2 className="w-5 h-5 text-purple-500" />
                  Prompt
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea 
                  placeholder="Décrivez le contenu que vous souhaitez générer... Ex: Écris un article de blog sur les tendances du marketing digital en 2024, ciblé pour les PME"
                  className="min-h-[200px]"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                />
                <div className="flex gap-3">
                  <Button 
                    className="flex-1 bg-purple-500 hover:bg-purple-600"
                    onClick={handleGenerate}
                    disabled={!prompt}
                  >
                    <Sparkles className="w-4 h-4 mr-2" />
                    Générer
                  </Button>
                  <Button variant="outline">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Régénérer
                  </Button>
                </div>

                <div className="pt-4 border-t">
                  <h4 className="font-medium mb-3">Options rapides</h4>
                  <div className="flex flex-wrap gap-2">
                    {['Article SEO', 'Post LinkedIn', 'Email promo', 'Script vidéo'].map((option) => (
                      <Button 
                        key={option} 
                        variant="outline" 
                        size="sm"
                        onClick={() => setPrompt(`Génère un ${option.toLowerCase()} sur le thème de `)}
                      >
                        {option}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-purple-500" />
                    Résultat
                  </span>
                  {generatedContent && (
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon">
                        <Copy className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {generatedContent ? (
                  <div className="prose prose-sm max-w-none">
                    <div className="whitespace-pre-wrap text-gray-700">{generatedContent}</div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-[300px] text-gray-400">
                    <Sparkles className="w-12 h-12 mb-4" />
                    <p>Le contenu généré apparaîtra ici</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'templates' && (
          <Card>
            <CardHeader>
              <CardTitle>Templates de Contenu</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {templates.map((template) => {
                  const TemplateIcon = template.icon;
                  return (
                    <div key={template.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow cursor-pointer">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                          <TemplateIcon className="w-5 h-5 text-purple-600" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{template.name}</h4>
                          <p className="text-sm text-gray-600">{template.description}</p>
                        </div>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full"
                        onClick={() => {
                          setActiveTab('generator');
                          setPrompt(`Génère un ${template.name.toLowerCase()} sur le thème de `);
                        }}
                      >
                        <Plus className="w-4 h-4 mr-1" />
                        Utiliser
                      </Button>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === 'history' && (
          <Card>
            <CardHeader>
              <CardTitle>Historique des Contenus</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {contentHistory.map((content) => (
                  <div key={content.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-gray-400" />
                      <div>
                        <h4 className="font-medium text-gray-900">{content.title}</h4>
                        <p className="text-sm text-gray-600">{content.date} • {content.words} mots</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge className={getTypeColor(content.type)}>{content.type}</Badge>
                      <Button variant="ghost" size="icon">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}
