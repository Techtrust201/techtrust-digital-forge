import { Metadata } from 'next';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import NavbarPublic from '@/components/NavbarPublic';
import Footer from '@/components/Footer';

export const dynamic = 'force-static';

interface BlogPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta.blog' });
  
  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: `https://www.tech-trust.fr/${locale}/blog`,
      languages: {
        'fr': 'https://www.tech-trust.fr/fr/blog',
        'en': 'https://www.tech-trust.fr/en/blog',
      },
    },
  };
}

// Articles statiques pour l'instant (sera remplacé par un CMS)
const articles = [
  {
    slug: 'guide-seo-2025',
    title: 'Guide SEO 2025 : Les meilleures pratiques pour être bien référencé',
    excerpt: 'Découvrez les dernières tendances SEO et comment optimiser votre site pour les moteurs de recherche.',
    date: '2025-01-15',
    readTime: '8 min',
    category: 'SEO',
    image: '/blog/seo-guide.jpg'
  },
  {
    slug: 'growth-hacking-ia',
    title: 'Growth Hacking IA : Comment automatiser votre acquisition client',
    excerpt: 'L\'intelligence artificielle révolutionne le growth hacking. Voici comment en profiter.',
    date: '2025-01-10',
    readTime: '6 min',
    category: 'Growth',
    image: '/blog/growth-ia.jpg'
  },
  {
    slug: 'tendances-web-design-2025',
    title: 'Tendances Web Design 2025 : Ce qui va marquer l\'année',
    excerpt: 'Les tendances design à suivre pour créer des sites web modernes et engageants.',
    date: '2025-01-05',
    readTime: '5 min',
    category: 'Design',
    image: '/blog/design-trends.jpg'
  }
];

export default async function BlogPage({ params }: BlogPageProps) {
  const { locale } = await params;
  const localizedHref = (path: string) => `/${locale}${path}`;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            "name": "Blog Techtrust",
            "description": "Articles et conseils sur le digital, le SEO et le growth hacking",
            "url": `https://www.tech-trust.fr/${locale}/blog`,
            "publisher": {
              "@type": "Organization",
              "name": "Techtrust"
            }
          })
        }}
      />

      <div className="flex min-h-screen flex-col">
        <NavbarPublic />
        
        <main className="flex-1 pt-20">
          <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
            <div className="container mx-auto px-4 text-center">
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
                Notre <span className="text-custom-blue">Blog</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Actualités, conseils et tendances du digital pour booster votre business.
              </p>
            </div>
          </section>

          <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {articles.map((article) => (
                  <article 
                    key={article.slug}
                    className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-xl transition-shadow"
                  >
                    <div className="h-48 bg-gradient-to-br from-custom-blue to-custom-purple"></div>
                    <div className="p-6">
                      <span className="inline-block bg-custom-blue/10 text-custom-blue text-sm font-medium px-3 py-1 rounded-full mb-4">
                        {article.category}
                      </span>
                      <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                        {article.title}
                      </h2>
                      <p className="text-gray-600 mb-4 line-clamp-2">
                        {article.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <div className="flex items-center gap-4">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {new Date(article.date).toLocaleDateString('fr-FR')}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {article.readTime}
                          </span>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              <div className="text-center mt-12">
                <p className="text-gray-600">
                  Plus d'articles à venir bientôt...
                </p>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}
