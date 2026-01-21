import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  HelpCircle,
  Search,
  MessageCircle,
  Phone,
  Mail,
  Book,
  Video,
  FileText,
  ChevronRight,
  ChevronDown,
  ExternalLink,
  Send,
  Clock,
  CheckCircle,
  Star,
} from "lucide-react";

const Help = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("faq");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [supportForm, setSupportForm] = useState({
    subject: "",
    category: "general",
    priority: "normal",
    message: "",
  });

  useEffect(() => {
    if (location.pathname.includes("/help/support")) setActiveTab("support");
    else if (location.pathname.includes("/help/tutorials"))
      setActiveTab("tutorials");
    else setActiveTab("faq");
  }, [location.pathname]);

  const changeTab = (tab: string) => {
    setActiveTab(tab);
    const base = "/dashboard/help";
    switch (tab) {
      case "support":
        navigate(base + "/support");
        break;
      case "tutorials":
        navigate(base + "/tutorials");
        break;
      default:
        navigate(base + "/faq");
    }
  };

  const faqData = [
    {
      id: 1,
      category: "Général",
      question: "Comment puis-je changer mon plan d'abonnement ?",
      answer:
        'Vous pouvez modifier votre plan à tout moment depuis la section "Mon Compte > Mon Plan". Les changements prennent effet immédiatement et vous ne payez que la différence au prorata.',
    },
    {
      id: 2,
      category: "Growth Hacking",
      question: "Comment fonctionne l'IA de prospection automatisée ?",
      answer:
        "Notre IA analyse votre marché cible, identifie les prospects qualifiés et lance automatiquement des séquences personnalisées. Elle apprend de vos interactions pour améliorer continuellement les performances.",
    },
    {
      id: 3,
      category: "Site Web",
      question: "Combien de temps faut-il pour créer mon site web ?",
      answer:
        "Un site Starter prend 5-7 jours, un site Business 10-15 jours, et un site Premium E-commerce 20-30 jours. Ces délais incluent les révisions et la mise en ligne.",
    },
    {
      id: 4,
      category: "Community Management",
      question: "Puis-je voir le contenu avant publication ?",
      answer:
        "Absolument ! Tous les contenus sont soumis à votre validation avant publication. Vous recevez un planning éditorial chaque semaine avec aperçu de tous les posts.",
    },
    {
      id: 5,
      category: "Facturation",
      question: "Comment puis-je télécharger mes factures ?",
      answer:
        'Toutes vos factures sont disponibles dans la section "Mon Compte > Facturation". Vous pouvez les télécharger en PDF et les recevoir par email automatiquement.',
    },
    {
      id: 6,
      category: "Technique",
      question: "Que faire si j'ai un problème technique ?",
      answer:
        "Contactez notre support technique via le chat en direct (clients Gold/Diamond) ou par email. Nous garantissons une réponse sous 2h pour les urgences.",
    },
  ];

  const tutorialsData = [
    {
      title: "Premiers pas avec Techtrust",
      duration: "10 min",
      type: "video",
      description:
        "Découvrez votre dashboard et configurez vos premiers outils",
      level: "Débutant",
    },
    {
      title: "Créer sa première campagne email",
      duration: "15 min",
      type: "video",
      description:
        "Guide complet pour lancer votre première campagne marketing",
      level: "Débutant",
    },
    {
      title: "Optimiser ses conversions avec l'IA",
      duration: "25 min",
      type: "video",
      description: "Techniques avancées pour maximiser vos taux de conversion",
      level: "Avancé",
    },
    {
      title: "Automatiser sa prospection",
      duration: "20 min",
      type: "guide",
      description:
        "Configurez des séquences automatisées pour générer des leads",
      level: "Intermédiaire",
    },
    {
      title: "Analyser ses performances",
      duration: "12 min",
      type: "guide",
      description:
        "Comprendre et utiliser les analytics pour améliorer vos résultats",
      level: "Intermédiaire",
    },
  ];

  const supportChannels = [
    {
      name: "Chat en direct",
      description: "Support instantané pour les clients Gold et Diamond",
      icon: MessageCircle,
      availability: "9h-18h, Lundi-Vendredi",
      responseTime: "Immédiat",
      color: "text-green-500",
      available: true,
    },
    {
      name: "Support par email",
      description: "Pour toutes vos questions et demandes",
      icon: Mail,
      availability: "24h/24, 7j/7",
      responseTime: "< 2h (urgences), < 24h (standard)",
      color: "text-blue-500",
      available: true,
    },
    {
      name: "Support téléphonique",
      description: "Assistance directe pour les clients Diamond",
      icon: Phone,
      availability: "9h-18h, Lundi-Vendredi",
      responseTime: "Immédiat",
      color: "text-purple-500",
      available: false,
    },
  ];

  const filteredFaq = faqData.filter(
    (item) =>
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSupportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(
      "🎫 Ticket de support créé ! Nous vous répondrons sous 24h à l'adresse email de votre compte."
    );
    setSupportForm({
      subject: "",
      category: "general",
      priority: "normal",
      message: "",
    });
  };

  const renderFAQ = () => (
    <div className="space-y-6">
      {/* Recherche */}
      <Card>
        <CardContent className="p-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <Input
              placeholder="Rechercher dans la FAQ..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 text-lg"
            />
          </div>
        </CardContent>
      </Card>

      {/* Questions fréquentes */}
      <Card>
        <CardHeader>
          <CardTitle>Questions fréquentes ({filteredFaq.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredFaq.map((item) => (
              <div key={item.id} className="border rounded-lg">
                <button
                  onClick={() =>
                    setExpandedFaq(expandedFaq === item.id ? null : item.id)
                  }
                  className="w-full p-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className="text-xs">
                      {item.category}
                    </Badge>
                    <span className="font-medium text-gray-900">
                      {item.question}
                    </span>
                  </div>
                  {expandedFaq === item.id ? (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  )}
                </button>
                {expandedFaq === item.id && (
                  <div className="px-4 pb-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="text-gray-700">{item.answer}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderTutorials = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Tutoriels et guides</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            {tutorialsData.map((tutorial, index) => (
              <Card
                key={index}
                className="hover:shadow-lg transition-shadow cursor-pointer"
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      {tutorial.type === "video" ? (
                        <Video className="w-6 h-6 text-red-500" />
                      ) : (
                        <FileText className="w-6 h-6 text-blue-500" />
                      )}
                      <Badge variant="outline" className="text-xs">
                        {tutorial.level}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Clock className="w-4 h-4" />
                      {tutorial.duration}
                    </div>
                  </div>

                  <h3 className="font-bold text-lg text-gray-900 mb-2">
                    {tutorial.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{tutorial.description}</p>

                  <Button className="w-full" variant="outline">
                    {tutorial.type === "video" ? "Regarder" : "Lire"}
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Ressources supplémentaires */}
      <Card>
        <CardHeader>
          <CardTitle>Ressources supplémentaires</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-20 flex-col gap-2">
              <Book className="w-6 h-6 text-blue-500" />
              <span>Documentation API</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <Video className="w-6 h-6 text-red-500" />
              <span>Webinaires</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <FileText className="w-6 h-6 text-green-500" />
              <span>Cas d'usage</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderSupport = () => (
    <div className="space-y-6">
      {/* Canaux de support */}
      <Card>
        <CardHeader>
          <CardTitle>Nos canaux de support</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            {supportChannels.map((channel) => {
              const ChannelIcon = channel.icon;
              return (
                <Card
                  key={channel.name}
                  className={`${
                    channel.available ? "hover:shadow-lg" : "opacity-60"
                  } transition-shadow`}
                >
                  <CardContent className="p-6 text-center">
                    <ChannelIcon
                      className={`w-12 h-12 ${channel.color} mx-auto mb-4`}
                    />
                    <h3 className="font-bold text-lg text-gray-900 mb-2">
                      {channel.name}
                    </h3>
                    <p className="text-gray-600 mb-4 text-sm">
                      {channel.description}
                    </p>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-500">Disponibilité:</span>
                        <span className="font-medium">
                          {channel.availability}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-500">Réponse:</span>
                        <span className="font-medium">
                          {channel.responseTime}
                        </span>
                      </div>
                    </div>
                    <Button
                      className={`w-full mt-4 ${
                        channel.available ? "" : "opacity-50 cursor-not-allowed"
                      }`}
                      disabled={!channel.available}
                    >
                      {channel.available ? "Contacter" : "Non disponible"}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Formulaire de contact */}
      <Card>
        <CardHeader>
          <CardTitle>Créer un ticket de support</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSupportSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="subject">Sujet</Label>
                <Input
                  id="subject"
                  value={supportForm.subject}
                  onChange={(e) =>
                    setSupportForm({ ...supportForm, subject: e.target.value })
                  }
                  placeholder="Décrivez brièvement votre problème"
                  className="mt-1"
                  required
                />
              </div>
              <div>
                <Label htmlFor="category">Catégorie</Label>
                <select
                  id="category"
                  value={supportForm.category}
                  onChange={(e) =>
                    setSupportForm({ ...supportForm, category: e.target.value })
                  }
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="general">Question générale</option>
                  <option value="technical">Problème technique</option>
                  <option value="billing">Facturation</option>
                  <option value="feature">Demande de fonctionnalité</option>
                  <option value="bug">Signaler un bug</option>
                </select>
              </div>
            </div>

            <div>
              <Label htmlFor="priority">Priorité</Label>
              <select
                id="priority"
                value={supportForm.priority}
                onChange={(e) =>
                  setSupportForm({ ...supportForm, priority: e.target.value })
                }
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="low">Faible - Question générale</option>
                <option value="normal">Normale - Problème non urgent</option>
                <option value="high">Élevée - Problème impactant</option>
                <option value="urgent">Urgente - Service indisponible</option>
              </select>
            </div>

            <div>
              <Label htmlFor="message">Description détaillée</Label>
              <Textarea
                id="message"
                value={supportForm.message}
                onChange={(e) =>
                  setSupportForm({ ...supportForm, message: e.target.value })
                }
                placeholder="Décrivez votre problème en détail. Incluez les étapes pour reproduire le problème si applicable."
                className="mt-1 min-h-32"
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600"
              disabled={!supportForm.subject || !supportForm.message}
            >
              <Send className="w-4 h-4 mr-2" />
              Envoyer le ticket
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Satisfaction */}
      <Card>
        <CardHeader>
          <CardTitle>Votre satisfaction nous importe</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <div className="flex justify-center gap-2 mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className="w-8 h-8 text-yellow-500 fill-current cursor-pointer hover:scale-110 transition-transform"
              />
            ))}
          </div>
          <p className="text-gray-600 mb-4">
            Comment évaluez-vous notre support client ?
          </p>
          <Button variant="outline">Laisser un avis</Button>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Centre d'aide 🆘
            </h1>
            <p className="text-gray-600">
              Trouvez des réponses et obtenez de l'aide
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Badge className="bg-green-100 text-green-800">
              <CheckCircle className="w-4 h-4 mr-1" />
              Support actif
            </Badge>
          </div>
        </div>

        {/* Navigation interne retirée - utilisation exclusive de la sidebar */}

        {/* Contenu */}
        {activeTab === "faq" && renderFAQ()}
        {activeTab === "tutorials" && renderTutorials()}
        {activeTab === "support" && renderSupport()}
      </div>
    </DashboardLayout>
  );
};

export default Help;
