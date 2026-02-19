import { Metadata } from 'next';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import NavbarPublic from '@/components/NavbarPublic';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import { blogArticles } from '@/lib/blog-data';

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
        'x-default': 'https://www.tech-trust.fr/fr/blog',
      },
    },
  };
}

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
            "name": "Blog Techtrust - Conseils Digital, SEO & Growth Hacking",
            "description": "Articles d'experts sur le digital, le SEO, le growth hacking et la création de sites web. Conseils pratiques pour booster votre business en ligne.",
            "url": `https://www.tech-trust.fr/${locale}/blog`,
            "publisher": {
              "@type": "Organization",
              "name": "Techtrust",
              "url": "https://www.tech-trust.fr"
            },
            "blogPost": blogArticles.map(article => ({
              "@type": "BlogPosting",
              "headline": article.title,
              "description": article.excerpt,
              "datePublished": article.date,
              "dateModified": article.updatedDate || article.date,
              "author": {
                "@type": "Person",
                "name": article.author.name
              },
              "url": `https://www.tech-trust.fr/${locale}/blog/${article.slug}`
            }))
          })
        }}
      />

      <div className="flex min-h-screen flex-col">
        <NavbarPublic />
        
        <main className="flex-1 pt-20">
          <Breadcrumbs 
            locale={locale} 
            items={[
              { label: 'Blog' }
            ]} 
          />
          <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
            <div className="container mx-auto px-4 text-center">
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
                Notre <span className="text-custom-blue">Blog</span> Digital
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Conseils d&apos;experts, guides pratiques et actualités sur le SEO, le growth hacking, 
                la création de sites web et le marketing digital.
              </p>
            </div>
          </section>

          <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {blogArticles.map((article) => (
                  <article 
                    key={article.slug}
                    className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-xl transition-shadow group"
                  >
                    <Link href={localizedHref(`/blog/${article.slug}`)}>
                      <div className="h-48 bg-gradient-to-br from-custom-blue to-custom-purple relative overflow-hidden">
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                      </div>
                    </Link>
                    <div className="p-6">
                      <span className="inline-block bg-custom-blue/10 text-custom-blue text-sm font-medium px-3 py-1 rounded-full mb-4">
                        {article.category}
                      </span>
                      <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                        <Link href={localizedHref(`/blog/${article.slug}`)} className="hover:text-custom-blue transition-colors">
                          {article.title}
                        </Link>
                      </h2>
                      <p className="text-gray-600 mb-4 line-clamp-2">
                        {article.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <div className="flex items-center gap-4">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" aria-hidden="true" />
                            <time dateTime={article.date}>
                              {new Date(article.date).toLocaleDateString('fr-FR')}
                            </time>
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" aria-hidden="true" />
                            {article.readTime}
                          </span>
                        </div>
                        <Link 
                          href={localizedHref(`/blog/${article.slug}`)}
                          className="text-custom-blue hover:text-custom-purple transition-colors font-medium inline-flex items-center gap-1"
                        >
                          Lire
                          <ArrowRight className="w-3 h-3" aria-hidden="true" />
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        </main>

        <Footer locale={locale} />
      </div>
    </>
  );
}
