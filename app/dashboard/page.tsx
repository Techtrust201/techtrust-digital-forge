"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { BarChart3, Users, Settings, LogOut, Home, TrendingUp, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);

  // Vérification auth côté client (placeholder)
  useEffect(() => {
    // À remplacer par une vraie vérification Supabase
    setUser({ email: 'user@example.com', name: 'Utilisateur' });
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-custom-blue"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-white shadow-lg">
        <div className="p-6">
          <Link href="/" className="text-2xl font-bold text-custom-blue">
            Techtrust
          </Link>
        </div>
        
        <nav className="mt-6">
          <Link 
            href="/dashboard"
            className="flex items-center px-6 py-3 text-gray-900 bg-gray-100"
          >
            <Home className="w-5 h-5 mr-3" />
            Dashboard
          </Link>
          <Link 
            href="/dashboard/analytics"
            className="flex items-center px-6 py-3 text-gray-600 hover:bg-gray-50"
          >
            <BarChart3 className="w-5 h-5 mr-3" />
            Analytics
          </Link>
          <Link 
            href="/dashboard/account"
            className="flex items-center px-6 py-3 text-gray-600 hover:bg-gray-50"
          >
            <Settings className="w-5 h-5 mr-3" />
            Mon compte
          </Link>
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-6">
          <Button variant="outline" className="w-full">
            <LogOut className="w-4 h-4 mr-2" />
            Déconnexion
          </Button>
        </div>
      </aside>

      {/* Main content */}
      <main className="ml-64 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Bienvenue, {user.name}
          </h1>
          <p className="text-gray-600">
            Voici un aperçu de votre activité
          </p>
        </div>

        {/* Stats cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-600 font-medium">Visiteurs</h3>
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <p className="text-3xl font-bold text-gray-900">1,234</p>
            <p className="text-sm text-green-500">+12% ce mois</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-600 font-medium">Leads</h3>
              <Users className="w-5 h-5 text-custom-blue" />
            </div>
            <p className="text-3xl font-bold text-gray-900">56</p>
            <p className="text-sm text-green-500">+8% ce mois</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-600 font-medium">Emails envoyés</h3>
              <Mail className="w-5 h-5 text-custom-purple" />
            </div>
            <p className="text-3xl font-bold text-gray-900">789</p>
            <p className="text-sm text-gray-500">Ce mois</p>
          </div>
        </div>

        {/* Recent activity */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Activité récente
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div>
                <p className="font-medium text-gray-900">Nouveau lead</p>
                <p className="text-sm text-gray-500">jean.dupont@email.com</p>
              </div>
              <span className="text-sm text-gray-500">Il y a 2h</span>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div>
                <p className="font-medium text-gray-900">Email ouvert</p>
                <p className="text-sm text-gray-500">Campagne "Promo Janvier"</p>
              </div>
              <span className="text-sm text-gray-500">Il y a 4h</span>
            </div>
            <div className="flex items-center justify-between py-3">
              <div>
                <p className="font-medium text-gray-900">Nouveau visiteur</p>
                <p className="text-sm text-gray-500">Page: /solutions/agence-web</p>
              </div>
              <span className="text-sm text-gray-500">Il y a 6h</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
