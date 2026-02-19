import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  locale: string;
}

export default function Breadcrumbs({ items, locale }: BreadcrumbsProps) {
  const baseUrl = 'https://www.tech-trust.fr';

  // Build the full breadcrumb list with Home
  const allItems: BreadcrumbItem[] = [
    { label: 'Accueil', href: `/${locale}` },
    ...items,
  ];

  // JSON-LD BreadcrumbList schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": allItems.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.label,
      ...(item.href ? {
        "item": `${baseUrl}${item.href}`
      } : {})
    }))
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <nav aria-label="Fil d'Ariane" className="bg-gray-50 border-b border-gray-100">
        <div className="container mx-auto px-4">
          <ol className="flex items-center gap-1 py-3 text-sm text-gray-600 flex-wrap">
            {allItems.map((item, index) => {
              const isLast = index === allItems.length - 1;
              return (
                <li key={index} className="flex items-center gap-1">
                  {index > 0 && (
                    <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0" aria-hidden="true" />
                  )}
                  {isLast ? (
                    <span className="text-gray-900 font-medium" aria-current="page">
                      {index === 0 && <Home className="w-4 h-4 inline mr-1" aria-hidden="true" />}
                      {item.label}
                    </span>
                  ) : (
                    <Link
                      href={item.href || '#'}
                      className="hover:text-custom-blue transition-colors"
                    >
                      {index === 0 && <Home className="w-4 h-4 inline mr-1" aria-hidden="true" />}
                      {item.label}
                    </Link>
                  )}
                </li>
              );
            })}
          </ol>
        </div>
      </nav>
    </>
  );
}
