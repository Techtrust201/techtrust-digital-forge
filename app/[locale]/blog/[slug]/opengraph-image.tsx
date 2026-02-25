import { ImageResponse } from 'next/og';
import { getArticleBySlug, getAllSlugs } from '@/lib/blog-data';

export const alt = 'Techtrust Blog';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export async function generateStaticParams() {
  const slugs = getAllSlugs();
  const locales = ['fr', 'en'];
  return locales.flatMap((locale) => slugs.map((slug) => ({ locale, slug })));
}

export default async function OGImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  const title = article?.title || 'Techtrust Blog';
  const category = article?.category || 'Article';
  const author = article?.author?.name || 'Techtrust';

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '60px',
          background: 'linear-gradient(135deg, #1e1b4b 0%, #4c1d95 50%, #0ea5e9 100%)',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Top: category badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div
            style={{
              background: 'rgba(255,255,255,0.2)',
              borderRadius: '9999px',
              padding: '8px 20px',
              color: 'white',
              fontSize: '20px',
              fontWeight: 600,
            }}
          >
            {category}
          </div>
        </div>

        {/* Middle: title */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
        >
          <div
            style={{
              color: 'white',
              fontSize: title.length > 60 ? '40px' : '48px',
              fontWeight: 700,
              lineHeight: 1.2,
              maxWidth: '900px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {title}
          </div>
        </div>

        {/* Bottom: author + branding */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '9999px',
                background: 'rgba(255,255,255,0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '20px',
                fontWeight: 700,
              }}
            >
              {author.charAt(0)}
            </div>
            <div style={{ color: 'rgba(255,255,255,0.9)', fontSize: '18px' }}>{author}</div>
          </div>
          <div
            style={{
              color: 'white',
              fontSize: '28px',
              fontWeight: 700,
              letterSpacing: '-0.5px',
            }}
          >
            tech-trust.fr
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
