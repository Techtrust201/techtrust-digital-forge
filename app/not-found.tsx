import Link from 'next/link';
import { Home, ArrowRight, Search, Phone } from 'lucide-react';

export default function NotFound() {
  return (
    <html lang="fr">
      <body className="font-sans antialiased bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 min-h-screen flex items-center justify-center p-4">
        <div className="max-w-2xl mx-auto text-center">
          {/* 404 visual */}
          <div className="mb-8">
            <p className="text-8xl lg:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              404
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full mt-4" />
          </div>

          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Page introuvable
          </h1>
          <p className="text-lg text-gray-600 mb-8 max-w-lg mx-auto">
            Désolé, la page que vous cherchez n&apos;existe plus ou a été déplacée. 
            Pas de panique, voici quelques liens utiles pour retrouver votre chemin.
          </p>

          {/* Quick links */}
          <div className="grid sm:grid-cols-2 gap-4 mb-8">
            <Link
              href="/fr"
              className="flex items-center gap-3 bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow border border-gray-100 group"
            >
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Home className="w-5 h-5 text-blue-600" aria-hidden="true" />
              </div>
              <div className="text-left">
                <p className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">Accueil</p>
                <p className="text-sm text-gray-500">Retour à la page d&apos;accueil</p>
              </div>
            </Link>

            <Link
              href="/fr/solutions"
              className="flex items-center gap-3 bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow border border-gray-100 group"
            >
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Search className="w-5 h-5 text-purple-600" aria-hidden="true" />
              </div>
              <div className="text-left">
                <p className="font-semibold text-gray-900 group-hover:text-purple-600 transition-colors">Nos solutions</p>
                <p className="text-sm text-gray-500">Découvrez nos services</p>
              </div>
            </Link>

            <Link
              href="/fr/blog"
              className="flex items-center gap-3 bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow border border-gray-100 group"
            >
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <ArrowRight className="w-5 h-5 text-green-600" aria-hidden="true" />
              </div>
              <div className="text-left">
                <p className="font-semibold text-gray-900 group-hover:text-green-600 transition-colors">Blog</p>
                <p className="text-sm text-gray-500">Articles et guides experts</p>
              </div>
            </Link>

            <Link
              href="/fr/contact"
              className="flex items-center gap-3 bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow border border-gray-100 group"
            >
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <Phone className="w-5 h-5 text-orange-600" aria-hidden="true" />
              </div>
              <div className="text-left">
                <p className="font-semibold text-gray-900 group-hover:text-orange-600 transition-colors">Contact</p>
                <p className="text-sm text-gray-500">Besoin d&apos;aide ? Écrivez-nous</p>
              </div>
            </Link>
          </div>

          {/* Popular pages */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h2 className="font-semibold text-gray-900 mb-4">Pages populaires</h2>
            <div className="flex flex-wrap gap-2 justify-center">
              {[
                { href: '/fr/pricing', label: 'Tarifs' },
                { href: '/fr/guide/prix-site-vitrine', label: 'Prix site vitrine' },
                { href: '/fr/guide/prix-site-ecommerce', label: 'Prix site e-commerce' },
                { href: '/fr/solutions/seo-referencement', label: 'SEO / Référencement' },
                { href: '/fr/solutions/growth-hacking', label: 'Growth Hacking IA' },
                { href: '/fr/solutions/agence-web', label: 'Création de site web' },
                { href: '/fr/a-propos', label: 'À propos' },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm bg-gray-100 hover:bg-blue-100 hover:text-blue-700 text-gray-700 px-3 py-1.5 rounded-full transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Techtrust branding */}
          <p className="mt-8 text-sm text-gray-400">
            Techtrust — Agence web &amp; Growth Hacking IA, Mougins (Cannes)
          </p>
        </div>
      </body>
    </html>
  );
}
