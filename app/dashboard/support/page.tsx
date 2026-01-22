"use client";

import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  MessageCircle, 
  Phone,
  Mail,
  Clock,
  Send
} from 'lucide-react';

export default function SupportPage() {
  const [formData, setFormData] = useState({
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // TODO: Implement support ticket creation
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    setFormData({ subject: '', message: '' });
  };

  return (
    <DashboardLayout>
      <div className="space-y-8 max-w-4xl">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Support</h1>
          <p className="text-gray-600">Contactez notre équipe d&apos;assistance</p>
        </div>

        {/* Contact options */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="text-center">
            <CardContent className="pt-6">
              <MessageCircle className="w-12 h-12 text-blue-500 mx-auto mb-4" />
              <h3 className="font-bold text-gray-900 mb-2">Chat en direct</h3>
              <p className="text-sm text-gray-600 mb-4">
                Discutez avec un conseiller
              </p>
              <Button className="w-full">Démarrer le chat</Button>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="pt-6">
              <Phone className="w-12 h-12 text-green-500 mx-auto mb-4" />
              <h3 className="font-bold text-gray-900 mb-2">Téléphone</h3>
              <p className="text-sm text-gray-600 mb-4">
                +33 6 99 48 66 29
              </p>
              <Button variant="outline" className="w-full">Appeler</Button>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="pt-6">
              <Mail className="w-12 h-12 text-purple-500 mx-auto mb-4" />
              <h3 className="font-bold text-gray-900 mb-2">Email</h3>
              <p className="text-sm text-gray-600 mb-4">
                contact@tech-trust.fr
              </p>
              <Button variant="outline" className="w-full">Envoyer un email</Button>
            </CardContent>
          </Card>
        </div>

        {/* Support ticket form */}
        <Card>
          <CardHeader>
            <CardTitle>Créer un ticket</CardTitle>
            <CardDescription>
              Décrivez votre problème et nous vous répondrons dans les plus brefs délais
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="subject">Sujet</Label>
                <Input
                  id="subject"
                  placeholder="Décrivez brièvement votre problème"
                  value={formData.subject}
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  placeholder="Décrivez votre problème en détail..."
                  rows={6}
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  required
                />
              </div>

              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  'Envoi en cours...'
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Envoyer le ticket
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Support hours */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <Clock className="w-6 h-6 text-blue-500" />
              <h3 className="font-bold text-gray-900">Heures d&apos;ouverture</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-medium text-gray-900">Support standard</p>
                <p className="text-gray-600">Lundi - Vendredi : 9h - 18h</p>
              </div>
              <div>
                <p className="font-medium text-gray-900">Support premium</p>
                <p className="text-gray-600">7j/7 : 8h - 22h</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
