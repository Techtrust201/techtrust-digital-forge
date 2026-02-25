import { blogArticles } from '@/lib/blog-data';

export const dynamic = 'force-static';

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export async function GET() {
  const baseUrl = 'https://www.tech-trust.fr';

  const twoDaysAgo = new Date();
  twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

  const recentArticles = blogArticles
    .filter((a) => new Date(a.updatedDate || a.date) >= twoDaysAgo)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const urls = recentArticles
    .map(
      (article) => `  <url>
    <loc>${baseUrl}/fr/blog/${article.slug}</loc>
    <news:news>
      <news:publication>
        <news:name>Techtrust</news:name>
        <news:language>fr</news:language>
      </news:publication>
      <news:publication_date>${new Date(article.date).toISOString()}</news:publication_date>
      <news:title>${escapeXml(article.title)}</news:title>
      <news:keywords>${article.tags.map(escapeXml).join(', ')}</news:keywords>
    </news:news>
  </url>`
    )
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
${urls}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
