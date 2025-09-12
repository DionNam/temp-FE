import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { randomBytes } from 'crypto';

export function middleware(request: NextRequest) {
  // Generate unique nonce for each request
  const nonce = randomBytes(16).toString('base64');
  
  // Clone the request headers and set a new header
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-nonce', nonce);

  // Create response with CSP header including the nonce
  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  // Set CSP header with nonce
  response.headers.set(
    'Content-Security-Policy',
    `default-src 'self'; img-src 'self' https: data: blob:; media-src 'self' https: data:; font-src 'self' https: data:; connect-src 'self' https:; script-src 'self' 'nonce-${nonce}'; style-src 'self' 'unsafe-inline'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'; upgrade-insecure-requests`
  );

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
