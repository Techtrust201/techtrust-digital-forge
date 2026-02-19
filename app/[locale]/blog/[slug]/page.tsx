import { Metadata } from 'next';
import Link from 'next/link';
import { Calendar, Clock, ArrowLeft, User, Tag } from 'lucide-react';
import NavbarPublic from '@/components/NavbarPublic';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import { Button } from '@/components/ui/button';
import RelatedServices from '@/components/RelatedServices';
import { blogArticles, getArticleBySlug, getAllSlugs } from '@/lib/blog-data';

export const dynamic = 'force-static';

interface BlogPostPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllSlugs();
  const locales = ['fr', 'en'];
  
  return locales.flatMap(locale =>
    slugs.map(slug => ({ locale, slug }))
  );
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    return {
      title: 'Article non trouvé',
    };
  }

  return {
    title: article.title,
    description: article.excerpt,
    keywords: article.tags,
    authors: [{ name: article.author.name }],
    openGraph: {
      type: 'article',
      title: article.title,
      description: article.excerpt,
      publishedTime: article.date,
      modifiedTime: article.updatedDate || article.date,
      authors: [article.author.name],
      tags: article.tags,
      locale: locale === 'fr' ? 'fr_FR' : 'en_US',
      url: `https://www.tech-trust.fr/${locale}/blog/${slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt,
      creator: '@techtrust_fr',
    },
    alternates: {
      canonical: `https://www.tech-trust.fr/${locale}/blog/${slug}`,
      languages: {
        'fr': `https://www.tech-trust.fr/fr/blog/${slug}`,
        'en': `https://www.tech-trust.fr/en/blog/${slug}`,
        'x-default': `https://www.tech-trust.fr/fr/blog/${slug}`,
      },
    },
  };
}

// Simple markdown-like renderer for the content
function renderContent(content: string) {
  const lines = content.trim().split('\n');
  const elements: React.ReactNode[] = [];
  let currentList: string[] = [];
  let listKey = 0;

  const flushList = () => {
    if (currentList.length > 0) {
      elements.push(
        <ul key={`list-${listKey++}`} className="list-disc pl-6 space-y-2 mb-6 text-gray-700">
          {currentList.map((item, i) => (
            <li key={i} dangerouslySetInnerHTML={{ __html: formatInline(item) }} />
          ))}
        </ul>
      );
      currentList = [];
    }
  };

  const formatInline = (text: string): string => {
    return text
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      .replace(/`(.+?)`/g, '<code class="bg-gray-100 px-1.5 py-0.5 rounded text-sm text-custom-blue">$1</code>');
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    if (!line) {
      flushList();
      continue;
    }

    if (line.startsWith('## ')) {
      flushList();
      elements.push(
        <h2 key={i} className="text-2xl lg:text-3xl font-bold text-gray-900 mt-10 mb-4">
          <span dangerouslySetInnerHTML={{ __html: formatInline(line.slice(3)) }} />
        </h2>
      );
    } else if (line.startsWith('### ')) {
      flushList();
      elements.push(
        <h3 key={i} className="text-xl lg:text-2xl font-bold text-gray-900 mt-8 mb-3">
          <span dangerouslySetInnerHTML={{ __html: formatInline(line.slice(4)) }} />
        </h3>
      );
    } else if (line.startsWith('#### ')) {
      flushList();
      elements.push(
        <h4 key={i} className="text-lg font-bold text-gray-900 mt-6 mb-2">
          <span dangerouslySetInnerHTML={{ __html: formatInline(line.slice(5)) }} />
        </h4>
      );
    } else if (line.startsWith('- ')) {
      currentList.push(line.slice(2));
    } else if (/^\d+\.\s/.test(line)) {
      // Numbered list item - for simplicity, treat as unordered
      currentList.push(line.replace(/^\d+\.\s/, ''));
    } else if (line.startsWith('- ✅') || line.startsWith('- ❌')) {
      currentList.push(line.slice(2));
    } else {
      flushList();
      elements.push(
        <p key={i} className="text-gray-700 leading-relaxed mb-4">
          <span dangerouslySetInnerHTML={{ __html: formatInline(line) }} />
        </p>
      );
    }
  }

  flushList();
  return elements;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { locale, slug } = await params;
  const article = getArticleBySlug(slug);
  const localizedHref = (path: string) => `/${locale}${path}`;

  if (!article) {
    return (
      <div className="flex min-h-screen flex-col">
        <NavbarPublic />
        <main className="flex-1 pt-20 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Article non trouvé</h1>
            <p className="text-gray-600 mb-8">Cet article n&apos;existe pas ou a été déplacé.</p>
            <Button asChild>
              <Link href={localizedHref('/blog')}>Retour au blog</Link>
            </Button>
          </div>
        </main>
        <Footer locale={locale} />
      </div>
    );
  }

  // Related articles (exclude current)
  const relatedArticles = blogArticles
    .filter(a => a.slug !== slug)
    .slice(0, 3);

  return (
    <>
      {/* Article Schema JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": article.title,
            "description": article.excerpt,
            "image": {
              "@type": "ImageObject",
              "url": "https://www.tech-trust.fr/og-image.jpg",
              "width": 1200,
              "height": 630
            },
            "datePublished": article.date,
            "dateModified": article.updatedDate || article.date,
            "author": {
              "@type": "Person",
              "name": article.author.name,
              "jobTitle": article.author.role,
              "worksFor": {
                "@type": "Organization",
                "name": "Techtrust",
                "url": "https://www.tech-trust.fr"
              }
            },
            "publisher": {
              "@type": "Organization",
              "name": "Techtrust",
              "url": "https://www.tech-trust.fr",
              "logo": {
                "@type": "ImageObject",
                "url": "https://www.tech-trust.fr/logo-techtrust.svg"
              }
            },
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": `https://www.tech-trust.fr/${locale}/blog/${slug}`
            },
            "keywords": article.tags.join(', '),
            "articleSection": article.category,
            "wordCount": article.content.split(/\s+/).length,
            "inLanguage": locale === 'fr' ? 'fr-FR' : 'en-US'
          })
        }}
      />

      <div className="flex min-h-screen flex-col">
        <NavbarPublic />

        <main className="flex-1 pt-20">
          <Breadcrumbs
            locale={locale}
            items={[
              { label: 'Blog', href: `/${locale}/blog` },
              { label: article.title }
            ]}
          />

          {/* Article Header */}
          <section className="py-12 bg-gradient-to-br from-slate-50 to-blue-50">
            <div className="container mx-auto px-4 max-w-4xl">
              <Link
                href={localizedHref('/blog')}
                className="inline-flex items-center text-custom-blue hover:text-custom-purple transition-colors mb-6"
              >
                <ArrowLeft className="w-4 h-4 mr-2" aria-hidden="true" />
                Retour au blog
              </Link>

              <span className="inline-block bg-custom-blue/10 text-custom-blue text-sm font-medium px-3 py-1 rounded-full mb-4">
                {article.category}
              </span>

              <h1 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                {article.title}
              </h1>

              <p className="text-xl text-gray-600 mb-8">
                {article.excerpt}
              </p>

              {/* Meta info */}
              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" aria-hidden="true" />
                  <span>{article.author.name}</span>
                  <span className="text-gray-300">•</span>
                  <span>{article.author.role}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" aria-hidden="true" />
                  <time dateTime={article.date}>
                    {new Date(article.date).toLocaleDateString('fr-FR', { 
                      year: 'numeric', month: 'long', day: 'numeric' 
                    })}
                  </time>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" aria-hidden="true" />
                  <span>{article.readTime} de lecture</span>
                </div>
              </div>
            </div>
          </section>

          {/* Article Content */}
          <section className="py-12 bg-white">
            <div className="container mx-auto px-4 max-w-4xl">
              {/* TL;DR - Answer-first for GEO (AI citations) */}
              {article.tldr && (
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-l-4 border-custom-blue rounded-r-xl p-6 mb-10">
                  <p className="text-sm font-bold text-custom-blue uppercase tracking-wide mb-2">En bref (TL;DR)</p>
                  <p className="text-gray-800 leading-relaxed text-base">{article.tldr}</p>
                </div>
              )}

              <article className="prose prose-lg max-w-none">
                {renderContent(article.content)}
              </article>

              {/* Tags */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <div className="flex items-center gap-2 flex-wrap">
                  <Tag className="w-4 h-4 text-gray-500" aria-hidden="true" />
                  {article.tags.map(tag => (
                    <span
                      key={tag}
                      className="bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="mt-12 bg-gradient-to-r from-custom-blue to-custom-purple rounded-2xl p-8 text-center text-white">
                <h3 className="text-2xl font-bold mb-4">Besoin d&apos;aide pour votre projet digital ?</h3>
                <p className="text-gray-200 mb-6">
                  Nos experts sont là pour vous accompagner. Contactez-nous pour un devis gratuit.
                </p>
                <Button asChild className="bg-white text-custom-blue hover:bg-gray-100">
                  <Link href={localizedHref('/contact')}>
                    Demander un devis gratuit
                  </Link>
                </Button>
              </div>
            </div>
          </section>

          {/* Related Articles */}
          {relatedArticles.length > 0 && (
            <section className="py-16 bg-gray-50">
              <div className="container mx-auto px-4 max-w-6xl">
                <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                  Articles similaires
                </h2>
                <div className="grid md:grid-cols-3 gap-8">
                  {relatedArticles.map(related => (
                    <article key={related.slug} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="h-40 bg-gradient-to-br from-custom-blue to-custom-purple"></div>
                      <div className="p-6">
                        <span className="inline-block bg-custom-blue/10 text-custom-blue text-xs font-medium px-2 py-1 rounded-full mb-3">
                          {related.category}
                        </span>
                        <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">
                          <Link href={localizedHref(`/blog/${related.slug}`)} className="hover:text-custom-blue transition-colors">
                            {related.title}
                          </Link>
                        </h3>
                        <p className="text-sm text-gray-600 line-clamp-2">{related.excerpt}</p>
                        <div className="mt-4 flex items-center gap-2 text-xs text-gray-500">
                          <Calendar className="w-3 h-3" aria-hidden="true" />
                          <time dateTime={related.date}>
                            {new Date(related.date).toLocaleDateString('fr-FR')}
                          </time>
                          <span>•</span>
                          <span>{related.readTime}</span>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </section>
          )}

          <RelatedServices currentSlug="blog" locale={locale} />
        </main>

        <Footer locale={locale} />
      </div>
    </>
  );
}
