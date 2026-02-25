import { blogArticles } from '@/lib/blog-data';

export const dynamic = 'force-static';

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export async function GET() {
  const baseUrl = 'https://www.tech-trust.fr';
  const sorted = [...blogArticles].sort(
    (a, b) => new Date(b.updatedDate || b.date).getTime() - new Date(a.updatedDate || a.date).getTime()
  );
  const lastBuildDate = new Date(sorted[0]?.updatedDate || sorted[0]?.date || Date.now()).toUTCString();

  const items = sorted
    .map(
      (article) => `    <item>
      <title>${escapeXml(article.title)}</title>
      <link>${baseUrl}/fr/blog/${article.slug}</link>
      <guid isPermaLink="true">${baseUrl}/fr/blog/${article.slug}</guid>
      <description>${escapeXml(article.excerpt)}</description>
      <pubDate>${new Date(article.date).toUTCString()}</pubDate>
      <author>contact@tech-trust.fr (${escapeXml(article.author.name)})</author>
      <category>${escapeXml(article.category)}</category>
      ${article.tags.map((t) => `<category>${escapeXml(t)}</category>`).join('\n      ')}
    </item>`
    )
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
  xmlns:atom="http://www.w3.org/2005/Atom"
  xmlns:dc="http://purl.org/dc/elements/1.1/"
  xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>Techtrust — Blog &amp; Guides experts</title>
    <link>${baseUrl}/fr/blog</link>
    <description>Articles et guides experts sur le SEO, le growth hacking IA, la création de sites web et les solutions digitales. Par Techtrust, agence digitale à Mougins (Cannes).</description>
    <language>fr</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml"/>
    <image>
      <url>${baseUrl}/logo-techtrust.png</url>
      <title>Techtrust</title>
      <link>${baseUrl}</link>
    </image>
    <managingEditor>contact@tech-trust.fr (Techtrust)</managingEditor>
    <webMaster>contact@tech-trust.fr (Techtrust)</webMaster>
    <copyright>© ${new Date().getFullYear()} Techtrust. Tous droits réservés.</copyright>
    <ttl>1440</ttl>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
