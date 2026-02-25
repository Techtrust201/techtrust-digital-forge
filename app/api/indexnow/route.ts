import { NextRequest, NextResponse } from 'next/server';

const INDEXNOW_KEY = 'de7d74b31aa541579eb8e52c338da879';
const SITE_HOST = 'www.tech-trust.fr';
const API_SECRET = process.env.INDEXNOW_API_SECRET || '';

export async function POST(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  if (!API_SECRET || authHeader !== `Bearer ${API_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let body: { urls?: string[] };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const { urls } = body;
  if (!urls || !Array.isArray(urls) || urls.length === 0) {
    return NextResponse.json({ error: 'urls array is required' }, { status: 400 });
  }

  if (urls.length > 10000) {
    return NextResponse.json({ error: 'Maximum 10000 URLs per request' }, { status: 400 });
  }

  const payload = {
    host: SITE_HOST,
    key: INDEXNOW_KEY,
    keyLocation: `https://${SITE_HOST}/${INDEXNOW_KEY}.txt`,
    urlList: urls,
  };

  const engines = [
    'https://api.indexnow.org/indexnow',
    'https://www.bing.com/indexnow',
    'https://yandex.com/indexnow',
  ];

  const results = await Promise.allSettled(
    engines.map(async (engine) => {
      const res = await fetch(engine, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: JSON.stringify(payload),
      });
      return { engine, status: res.status, ok: res.ok };
    })
  );

  const summary = results.map((r) =>
    r.status === 'fulfilled' ? r.value : { engine: 'unknown', error: r.reason?.message }
  );

  return NextResponse.json({ submitted: urls.length, results: summary });
}
