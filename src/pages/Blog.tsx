
import React, { useState } from 'react';
import NavbarPublic from '@/components/NavbarPublic';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

const Blog = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "Growth Hacking IA : Comment l'Intelligence Artificielle Révolutionne l'Acquisition Client en 2025",
      excerpt: "Découvrez comment nos outils IA permettent d'automatiser complètement votre prospection et multiplier vos leads par 10.",
      content: `# Growth Hacking IA : La Révolution 2025

L'année 2025 marque un tournant décisif dans le domaine du **growth hacking**. Chez Techtrust, nous avons développé des outils d'intelligence artificielle qui révolutionnent complètement l'approche traditionnelle de l'acquisition client.

## Pourquoi l'IA change tout en 2025 ?

### 1. Automatisation totale de la prospection
Nos algorithmes d'IA analysent en temps réel :
- Les comportements des prospects sur les réseaux sociaux
- Les signaux d'achat faibles détectés sur le web
- Les patterns de conversion optimaux pour votre secteur

### 2. Personnalisation ultra-poussée
Chaque message de prospection est **généré automatiquement** et personnalisé selon :
- Le profil LinkedIn du prospect
- L'actualité de son entreprise
- Ses publications récentes
- Son secteur d'activité

### 3. Optimisation continue
L'IA apprend de chaque interaction pour :
- Améliorer les taux de réponse
- Identifier les meilleurs créneaux d'envoi
- Adapter le ton et le style selon les personas

## Résultats concrets de nos clients

**Cas d'usage 1 :** Une startup SaaS a multiplié ses leads qualifiés par **12** en 3 mois grâce à notre IA de prospection.

**Cas d'usage 2 :** Un cabinet de conseil a automatisé 90% de sa prospection LinkedIn et augmenté son taux de conversion de **340%**.

## Comment commencer dès aujourd'hui ?

1. **Audit gratuit** de votre stratégie actuelle
2. **Paramétrage personnalisé** de nos outils IA
3. **Formation** de votre équipe (2h suffisent !)
4. **Lancement** et suivi des performances

> "Avec Techtrust, j'ai remplacé mon commercial junior par une IA 10x plus performante" - *CEO d'une entreprise cliente*

## L'avenir du growth hacking est là

2025 sera l'année où les entreprises qui n'adoptent pas l'IA pour leur growth hacking perdront définitivement l'avantage concurrentiel. 

**Prêt à rejoindre la révolution ?** [Découvrez nos outils IA](https://www.tech-trust.fr/solutions/growth-hacking)`,
      author: "Équipe Techtrust",
      date: "2025-01-15",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop",
      tags: ["Growth Hacking", "IA", "Prospection", "2025"]
    },
    {
      id: 2,
      title: "Community Management Automatisé : L'IA qui Remplace Votre Community Manager",
      excerpt: "Découvrez comment notre IA génère du contenu viral, programme vos posts et engage avec votre audience 24h/24.",
      content: `# Community Management IA : L'Automation Parfaite

Le **community management** traditionnel demande énormément de temps et de créativité. En 2025, notre IA révolutionne cette approche en automatisant 95% des tâches.

## Ce que fait notre IA de Community Management

### Génération de contenu automatique
- **Posts Instagram** créés selon votre charte graphique
- **Threads Twitter** optimisés pour l'engagement  
- **Articles LinkedIn** personnalisés pour votre audience
- **Stories** interactives générées quotidiennement

### Programmation intelligente
L'IA analyse :
- Les heures optimales de publication pour VOTRE audience
- Les hashtags qui performent le mieux dans votre niche
- Les formats de contenu les plus engageants
- La fréquence idéale selon chaque plateforme

### Engagement automatisé
- Réponses aux commentaires en cohérence avec votre ton
- Messages privés de prospection personnalisés
- Interaction avec les comptes stratégiques de votre secteur
- Veille concurrentielle et réaction en temps réel

## ROI exceptionnel prouvé

**Cas client :** Une boutique e-commerce a augmenté son engagement de **450%** et ses ventes via les réseaux sociaux de **280%** en 6 mois.

### Comparaison coût/bénéfice :
- **Community Manager junior :** 35K€/an + charges
- **Notre IA :** 297€/mois (3 564€/an)
- **Économie :** Plus de 30K€/an !

## Fonctionnalités avancées 2025

### Multi-plateformes natif
Un seul dashboard pour gérer :
- Instagram, Facebook, LinkedIn
- TikTok, Twitter/X, YouTube
- Pinterest, Snapchat

### Analytics prédictifs
- Prédiction des posts qui vont devenir viraux
- Optimisation automatique du budget pub
- Identification des micro-influenceurs pertinents

## Comment démarrer ?

1. **Audit** de vos réseaux actuels (gratuit)
2. **Configuration** de votre IA personnalisée
3. **Test** sur une plateforme pendant 14 jours
4. **Déploiement** sur tous vos réseaux

**L'IA ne remplace pas votre créativité, elle la démultiplie !**

[Testez gratuitement pendant 14 jours](https://www.tech-trust.fr/pricing)`,
      author: "Équipe Techtrust", 
      date: "2025-01-10",
      image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=400&fit=crop",
      tags: ["Community Management", "IA", "Réseaux Sociaux", "Automatisation"]
    },
    {
      id: 3,
      title: "SEO IA 2025 : Comment Dominer Google avec l'Intelligence Artificielle",
      excerpt: "Notre IA SEO analyse la concurrence, optimise vos contenus et vous place automatiquement en première page Google.",
      content: `# SEO IA : Dominez Google en 2025

Le **SEO traditionnel** est mort. En 2025, seules les entreprises utilisant l'IA pour leur référencement dominent les résultats Google.

## Notre IA SEO révolutionnaire

### Analyse concurrentielle automatique
- Identification des **mots-clés gagnants** de vos concurrents
- Analyse des **backlinks** les plus performants de votre secteur  
- Détection des **opportunités** de mots-clés inexploitées
- **Benchmark** automatique des contenus top classés

### Génération de contenu SEO-optimisé
Notre IA crée :
- **Articles de blog** positionnés sur vos mots-clés cibles
- **Pages produits** optimisées pour la conversion
- **Méta-descriptions** irrésistibles avec CTR amélioré
- **Structures HTML** parfaites pour les Featured Snippets

### Optimisation technique automatique
- **Core Web Vitals** optimisés en temps réel
- **Schema markup** généré automatiquement
- **Maillage interne** intelligent et contextuel
- **Optimisation mobile** parfaite

## Résultats clients exceptionnels

**Cas d'étude :** Un e-commerce B2B a multiplié son trafic organique par **8** en 4 mois grâce à notre IA SEO.

### Métriques avant/après :
- **Positions moyennes :** 45 → 8
- **Trafic organique :** +720%
- **Conversions SEO :** +1200% 
- **ROI :** 2400% en 6 mois

## Les algorithmes Google 2025

Notre IA s'adapte en temps réel aux updates Google :
- **E-E-A-T** (Experience, Expertise, Authoritativeness, Trustworthiness)
- **Core Web Vitals** nouvelle génération
- **IA-friendly content** pour SGE (Search Generative Experience)
- **Voice Search** et recherche conversationnelle

## Fonctionnalités exclusives

### Prédiction des tendances
- Anticipe les **sujets qui vont exploser** dans 3-6 mois
- Identifie les **requêtes émergentes** avant vos concurrents
- Adapte votre **calendrier éditorial** aux tendances

### Optimisation multilingue
- **Traduction SEO** dans 50+ langues
- **Adaptation culturelle** des contenus par pays
- **Ciblage géographique** ultra-précis

## Comment démarrer votre domination SEO ?

1. **Audit SEO IA** gratuit de votre site (rapport en 24h)
2. **Stratégie personnalisée** avec mots-clés prioritaires  
3. **Implémentation** de notre IA sur votre site
4. **Suivi temps réel** des positions et performances

> "En 3 mois, nous sommes passés de la page 5 à la position #1 sur nos mots-clés stratégiques" - *Directeur Marketing client*

**2025 sera l'année du SEO IA. Prenez de l'avance !**

[Démarrez votre audit SEO gratuit](https://www.tech-trust.fr/contact)`,
      author: "Équipe Techtrust",
      date: "2025-01-05", 
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop",
      tags: ["SEO", "IA", "Google", "Référencement", "2025"]
    }
  ]);

  const [selectedPost, setSelectedPost] = useState<typeof posts[0] | null>(null);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Blog Techtrust 2025 - Growth Hacking IA & SEO",
    "description": "📚 Blog expert en growth hacking IA, community management automatisé, SEO 2025. Guides exclusifs, cas clients, stratégies d'acquisition avec l'IA.",
    "url": "https://www.tech-trust.fr/blog"
  };

  return (
    <>
      <SEO
        title="Blog Techtrust 2025 | Growth Hacking IA, SEO, Community Management - Techtrust"
        description="📚 Blog expert 2025 ! Guides exclusifs growth hacking IA, community management automatisé, SEO Google. Cas clients, stratégies d'acquisition, outils IA révolutionnaires."
        keywords="blog techtrust 2025, growth hacking ia, community management automatisé, seo ia, prospection automatique, outils ia marketing"
        canonicalUrl="https://www.tech-trust.fr/blog"
        structuredData={structuredData}
      />

      <div className="flex min-h-screen flex-col">
        <NavbarPublic />
        
        <main>
          {/* Hero Section */}
          <section className="py-20 lg:py-32 bg-gradient-to-br from-orange-50 to-gray-50">
            <div className="container mx-auto px-4">
              <div className="text-center max-w-4xl mx-auto">
                <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
                  Blog <span className="text-orange-600">Techtrust</span> 2025
                </h1>
                <p className="text-xl text-gray-600 mb-8">
                  Découvrez nos guides exclusifs, cas clients et stratégies avancées pour dominer votre marché avec l'IA et le growth hacking.
                </p>
              </div>
            </div>
          </section>

          {/* Blog Posts */}
          <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
              <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8 max-w-7xl mx-auto">
                {posts.map((post) => (
                  <article key={post.id} className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all group">
                    <div className="relative">
                      <img 
                        src={post.image} 
                        alt={post.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    
                    <div className="p-6">
                      <div className="flex flex-wrap gap-2 mb-3">
                        {post.tags.map((tag) => (
                          <span key={tag} className="inline-flex items-center rounded-full bg-orange-50 px-2.5 py-1 text-xs font-medium text-orange-700">
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                        {post.title}
                      </h2>
                      
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>
                      
                      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4" />
                          {post.author}
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          {new Date(post.date).toLocaleDateString('fr-FR')}
                        </div>
                      </div>
                      
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            className="w-full bg-orange-600 hover:bg-orange-700 group/btn"
                            onClick={() => setSelectedPost(post)}
                          >
                            Lire l'article
                            <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle className="text-2xl font-bold leading-tight">
                              {selectedPost?.title}
                            </DialogTitle>
                          </DialogHeader>
                          <div className="space-y-6">
                            <img 
                              src={selectedPost?.image} 
                              alt={selectedPost?.title}
                              className="w-full h-64 object-cover rounded-lg"
                            />
                            <div className="flex items-center gap-4 text-sm text-gray-500">
                              <div className="flex items-center gap-2">
                                <User className="w-4 h-4" />
                                {selectedPost?.author}
                              </div>
                              <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                {selectedPost && new Date(selectedPost.date).toLocaleDateString('fr-FR')}
                              </div>
                            </div>
                            <div className="prose max-w-none">
                              <div dangerouslySetInnerHTML={{ 
                                __html: selectedPost?.content.replace(/\n/g, '<br>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/^# (.*$)/gm, '<h1>$1</h1>').replace(/^## (.*$)/gm, '<h2>$1</h2>').replace(/^### (.*$)/gm, '<h3>$1</h3>') || ''
                              }} />
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Blog;
