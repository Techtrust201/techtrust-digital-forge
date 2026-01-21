"use client";

import { useState } from 'react';
import Link from 'next/link';
import { BarChart3, Home, Settings, LogOut, User, Mail, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AccountPage() {
  const [name, setName] = useState('Jean Dupont');
  const [email, setEmail] = useState('jean.dupont@email.com');

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
            className="flex items-center px-6 py-3 text-gray-600 hover:bg-gray-50"
          >
            <BarChart3 className="w-5 h-5 mr-3" />
            Analytics
          </Link>
          <Link 
            href="/dashboard/account"
            className="flex items-center px-6 py-3 text-gray-900 bg-gray-100"
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
          <h1 className="text-3xl font-bold text-gray-900">Mon compte</h1>
          <p className="text-gray-600">Gérez vos informations personnelles</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Profile Section */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Profil</h2>
            
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nom complet
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-custom-blue"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-custom-blue"
                  />
                </div>
              </div>

              <Button className="bg-custom-blue hover:bg-custom-blue/90">
                Sauvegarder
              </Button>
            </form>
          </div>

          {/* Security Section */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Sécurité</h2>
            
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mot de passe actuel
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-custom-blue"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nouveau mot de passe
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-custom-blue"
                  />
                </div>
              </div>

              <Button variant="outline">
                Changer le mot de passe
              </Button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
