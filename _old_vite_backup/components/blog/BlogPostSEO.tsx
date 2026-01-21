
import React from 'react';
import { Helmet } from 'react-helmet-async';

interface BlogPostSEOProps {
  post: {
    id: string;
    title: string;
    excerpt?: string;
    content?: string;
    author: string;
    category: string;
    publish_date?: string;
    created_at: string;
    updated_at: string;
  };
  seoTitle?: string;
  seoDescription?: string;
}

const BlogPostSEO = ({ post, seoTitle, seoDescription }: BlogPostSEOProps) => {
  const title = seoTitle || post.title;
  const description = seoDescription || post.excerpt || post.content?.substring(0, 160) || '';
  const publishDate = post.publish_date || post.created_at;
  const modifiedDate = post.updated_at;
  const canonicalUrl = `https://www.tech-trust.fr/blog/${post.id}`;
  
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": title,
    "description": description,
    "image": `https://www.tech-trust.fr/og-blog-${post.category.toLowerCase().replace(/\s+/g, '-')}.jpg`,
    "author": {
      "@type": "Person",
      "name": post.author,
      "url": "https://www.tech-trust.fr/about"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Techtrust",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.tech-trust.fr/logo-techtrust-2025.png",
        "width": 300,
        "height": 60
      }
    },
    "datePublished": publishDate,
    "dateModified": modifiedDate,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": canonicalUrl
    },
    "articleSection": post.category,
    "keywords": [post.category, "techtrust", "growth hacking", "SEO", "marketing digital"],
    "wordCount": post.content?.split(' ').length || 0,
    "articleBody": post.content
  };

  const breadcrumbStructuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Accueil",
        "item": "https://www.tech-trust.fr"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Blog",
        "item": "https://www.tech-trust.fr/blog"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": post.category,
        "item": `https://www.tech-trust.fr/blog?category=${encodeURIComponent(post.category)}`
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": title,
        "item": canonicalUrl
      }
    ]
  };

  return (
    <Helmet>
      {/* Titre et meta descriptions */}
      <title>{title} | Blog Techtrust 2025</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={`${post.category}, techtrust, growth hacking, SEO, marketing digital, ${title.toLowerCase()}`} />
      
      {/* Article meta */}
      <meta name="article:published_time" content={publishDate} />
      <meta name="article:modified_time" content={modifiedDate} />
      <meta name="article:author" content={post.author} />
      <meta name="article:section" content={post.category} />
      <meta name="article:tag" content={post.category} />
      
      {/* Open Graph */}
      <meta property="og:type" content="article" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={`https://www.tech-trust.fr/og-blog-${post.category.toLowerCase().replace(/\s+/g, '-')}.jpg`} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="Techtrust Blog" />
      <meta property="article:published_time" content={publishDate} />
      <meta property="article:modified_time" content={modifiedDate} />
      <meta property="article:author" content={post.author} />
      <meta property="article:section" content={post.category} />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`https://www.tech-trust.fr/og-blog-${post.category.toLowerCase().replace(/\s+/g, '-')}.jpg`} />
      <meta name="twitter: creator" content="@techtrust_fr" />
      
      {/* Canonical */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Alternate languages */}
      <link rel="alternate" hrefLang="fr" href={canonicalUrl} />
      <link rel="alternate" hrefLang="x-default" href={canonicalUrl} />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbStructuredData)}
      </script>
    </Helmet>
  );
};

export default BlogPostSEO;
