
import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, Phone, Mail, Clock, Send } from 'lucide-react';

const Support = () => {
  const [ticketForm, setTicketForm] = useState({
    subject: '',
    message: '',
    priority: 'normal'
  });

  const handleSubmitTicket = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Ticket soumis:', ticketForm);
    // Logique de soumission du ticket
  };

  const supportOptions = [
    {
      title: 'Chat en direct',
      description: 'Réponse immédiate de 9h à 18h',
      icon: MessageSquare,
      color: 'bg-green-100 text-green-600',
      action: 'Démarrer le chat'
    },
    {
      title: 'Support téléphonique',
      description: 'Appelez-nous au +33 1 23 45 67 89',
      icon: Phone,
      color: 'bg-blue-100 text-blue-600',
      action: 'Appeler maintenant'
    },
    {
      title: 'Email',
      description: 'support@techtrust.fr',
      icon: Mail,
      color: 'bg-purple-100 text-purple-600',
      action: 'Envoyer un email'
    }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Support & Aide</h1>
          <p className="text-gray-600">Notre équipe est là pour vous accompagner</p>
        </div>

        {/* Options de contact rapide */}
        <div className="grid md:grid-cols-3 gap-6">
          {supportOptions.map((option, index) => {
            const OptionIcon = option.icon;
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center">
                  <div className={`w-16 h-16 ${option.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <OptionIcon className="w-8 h-8" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">{option.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{option.description}</p>
                  <Button className="w-full">{option.action}</Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Formulaire de ticket */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Send className="w-5 h-5 text-blue-500" />
                Créer un ticket de support
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmitTicket} className="space-y-4">
                <div>
                  <Label htmlFor="subject">Sujet *</Label>
                  <Input
                    id="subject"
                    placeholder="Décrivez brièvement votre problème"
                    value={ticketForm.subject}
                    onChange={(e) => setTicketForm(prev => ({...prev, subject: e.target.value}))}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="priority">Priorité</Label>
                  <select 
                    className="w-full p-2 border rounded-md"
                    value={ticketForm.priority}
                    onChange={(e) => setTicketForm(prev => ({...prev, priority: e.target.value}))}
                  >
                    <option value="low">Faible</option>
                    <option value="normal">Normale</option>
                    <option value="high">Élevée</option>
                    <option value="urgent">Urgente</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    placeholder="Décrivez votre problème en détail..."
                    value={ticketForm.message}
                    onChange={(e) => setTicketForm(prev => ({...prev, message: e.target.value}))}
                    required
                    rows={5}
                  />
                </div>
                <Button type="submit" className="w-full">
                  <Send className="w-4 h-4 mr-2" />
                  Envoyer le ticket
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Heures d'ouverture et FAQ rapide */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-blue-500" />
                  Heures d'ouverture
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span>Lundi - Vendredi</span>
                  <span className="font-medium">9h00 - 18h00</span>
                </div>
                <div className="flex justify-between">
                  <span>Samedi</span>
                  <span className="font-medium">10h00 - 16h00</span>
                </div>
                <div className="flex justify-between">
                  <span>Dimanche</span>
                  <Badge variant="outline">Fermé</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Questions fréquentes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <h4 className="font-medium mb-1">Comment changer de plan ?</h4>
                  <p className="text-sm text-gray-600">Rendez-vous dans Mon Compte {'>'}  Mon Plan</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <h4 className="font-medium mb-1">Problème de facturation ?</h4>
                  <p className="text-sm text-gray-600">Contactez-nous directement par téléphone</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <h4 className="font-medium mb-1">Accès aux fonctionnalités ?</h4>
                  <p className="text-sm text-gray-600">Vérifiez votre plan actuel dans le tableau de bord</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Support;
