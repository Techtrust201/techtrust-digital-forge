import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { locales, defaultLocale } from './i18n/request';

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'always'
});

export default function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Dashboard routes - pas d'i18n, ajouter headers noindex
  if (pathname.startsWith('/dashboard')) {
    const response = NextResponse.next();
    
    // Ajouter le header X-Robots-Tag pour empêcher l'indexation
    response.headers.set('X-Robots-Tag', 'noindex, nofollow');
    
    // Headers de sécurité supplémentaires
    response.headers.set('X-Frame-Options', 'DENY');
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    
    return response;
  }

  // Ne pas appliquer i18n sur /api/*
  if (pathname.startsWith('/api')) {
    return NextResponse.next();
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ['/((?!_next|_vercel|.*\\..*).*)']
};
