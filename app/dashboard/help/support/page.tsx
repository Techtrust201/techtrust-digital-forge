"use client";

import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  MessageSquare, 
  Mail,
  Phone,
  Clock,
  Send,
  CheckCircle,
  AlertCircle,
  Loader2
} from 'lucide-react';

export default function SupportPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const previousTickets = [
    { id: 'TKT-001', subject: 'Problème connexion API', status: 'Résolu', date: '12 Jan 2024' },
    { id: 'TKT-002', subject: 'Question facturation', status: 'En cours', date: '15 Jan 2024' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1500);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Résolu': return 'bg-green-100 text-green-800';
      case 'En cours': return 'bg-blue-100 text-blue-800';
      case 'En attente': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8 max-w-4xl">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <MessageSquare className="w-8 h-8 text-blue-500" />
            Support
          </h1>
          <p className="text-gray-600">Contactez notre équipe support</p>
        </div>

        {/* Options de contact */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="text-center">
            <CardContent className="p-6">
              <Mail className="w-10 h-10 text-blue-500 mx-auto mb-4" />
              <h3 className="font-bold text-gray-900 mb-2">Email</h3>
              <p className="text-sm text-gray-600 mb-2">contact@techtrust.fr</p>
              <p className="text-xs text-gray-500">Réponse sous 24h</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-6">
              <Phone className="w-10 h-10 text-green-500 mx-auto mb-4" />
              <h3 className="font-bold text-gray-900 mb-2">Téléphone</h3>
              <p className="text-sm text-gray-600 mb-2">01 23 45 67 89</p>
              <p className="text-xs text-gray-500">Lun-Ven 9h-18h</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-6">
              <Clock className="w-10 h-10 text-purple-500 mx-auto mb-4" />
              <h3 className="font-bold text-gray-900 mb-2">Chat en direct</h3>
              <p className="text-sm text-gray-600 mb-2">Disponible</p>
              <Badge className="bg-green-100 text-green-800">En ligne</Badge>
            </CardContent>
          </Card>
        </div>

        {/* Formulaire de contact */}
        <Card>
          <CardHeader>
            <CardTitle>Créer un Ticket</CardTitle>
            <CardDescription>Décrivez votre problème et nous vous répondrons rapidement</CardDescription>
          </CardHeader>
          <CardContent>
            {submitted ? (
              <div className="text-center py-8">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Ticket envoyé !</h3>
                <p className="text-gray-600 mb-4">
                  Nous avons bien reçu votre demande. Notre équipe vous répondra sous 24h.
                </p>
                <Button onClick={() => setSubmitted(false)}>
                  Créer un nouveau ticket
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="subject">Sujet</Label>
                    <Input
                      id="subject"
                      placeholder="Ex: Problème de connexion"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Catégorie</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez une catégorie" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="technical">Problème technique</SelectItem>
                        <SelectItem value="billing">Facturation</SelectItem>
                        <SelectItem value="account">Mon compte</SelectItem>
                        <SelectItem value="feature">Demande de fonctionnalité</SelectItem>
                        <SelectItem value="other">Autre</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="priority">Priorité</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez la priorité" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Basse - Question générale</SelectItem>
                      <SelectItem value="medium">Moyenne - Problème mineur</SelectItem>
                      <SelectItem value="high">Haute - Problème bloquant</SelectItem>
                      <SelectItem value="urgent">Urgente - Service indisponible</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Description</Label>
                  <Textarea
                    id="message"
                    placeholder="Décrivez votre problème en détail..."
                    rows={6}
                    required
                  />
                </div>

                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Envoi en cours...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Envoyer le ticket
                    </>
                  )}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>

        {/* Tickets précédents */}
        <Card>
          <CardHeader>
            <CardTitle>Mes Tickets</CardTitle>
            <CardDescription>Historique de vos demandes de support</CardDescription>
          </CardHeader>
          <CardContent>
            {previousTickets.length > 0 ? (
              <div className="space-y-4">
                {previousTickets.map((ticket) => (
                  <div key={ticket.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-gray-900">{ticket.id}</span>
                        <Badge className={getStatusColor(ticket.status)}>{ticket.status}</Badge>
                      </div>
                      <p className="text-sm text-gray-600">{ticket.subject}</p>
                      <p className="text-xs text-gray-500">{ticket.date}</p>
                    </div>
                    <Button variant="outline" size="sm">Voir</Button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-600 py-4">Aucun ticket précédent</p>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
