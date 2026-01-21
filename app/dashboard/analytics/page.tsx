"use client";

import Link from 'next/link';
import { BarChart3, Home, Settings, LogOut, TrendingUp, Users, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AnalyticsPage() {
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
            className="flex items-center px-6 py-3 text-gray-600 hover:bg-gray-50"
          >
            <Home className="w-5 h-5 mr-3" />
            Dashboard
          </Link>
          <Link 
            href="/dashboard/analytics"
            className="flex items-center px-6 py-3 text-gray-900 bg-gray-100"
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
          <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
          <p className="text-gray-600">Suivez vos performances en temps réel</p>
        </div>

        {/* Stats cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-600 font-medium">Visiteurs uniques</h3>
              <Users className="w-5 h-5 text-custom-blue" />
            </div>
            <p className="text-3xl font-bold text-gray-900">3,456</p>
            <p className="text-sm text-green-500">+15% vs mois dernier</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-600 font-medium">Pages vues</h3>
              <Eye className="w-5 h-5 text-custom-purple" />
            </div>
            <p className="text-3xl font-bold text-gray-900">12,890</p>
            <p className="text-sm text-green-500">+22% vs mois dernier</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-600 font-medium">Taux de conversion</h3>
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <p className="text-3xl font-bold text-gray-900">3.2%</p>
            <p className="text-sm text-green-500">+0.5% vs mois dernier</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-600 font-medium">Temps moyen</h3>
              <BarChart3 className="w-5 h-5 text-orange-500" />
            </div>
            <p className="text-3xl font-bold text-gray-900">2:45</p>
            <p className="text-sm text-gray-500">minutes</p>
          </div>
        </div>

        {/* Chart placeholder */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Évolution du trafic</h2>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">Graphique de trafic (à intégrer avec Recharts)</p>
          </div>
        </div>
      </main>
    </div>
  );
}
