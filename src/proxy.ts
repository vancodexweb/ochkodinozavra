import { NextResponse, type NextRequest } from 'next/server';

// Next.js 16 renamed middleware.ts -> proxy.ts and the exported function to
// `proxy`. Kept self-contained (no imports from src/app/api/_lib) since this
// file sits outside the FSD layer tree entirely - it is Next.js routing
// config, not an application slice.
const ACCESS_COOKIE = process.env.AUTH_ACCESS_COOKIE ?? 'oc_access';
const REFRESH_COOKIE = process.env.AUTH_REFRESH_COOKIE ?? 'oc_refresh';

const PROTECTED_PREFIXES = ['/dashboard', '/documents'];
const AUTH_PREFIXES = ['/login', '/register', '/verify-email'];

export function proxy(request: NextRequest): NextResponse {
  const { pathname } = request.nextUrl;
  const hasSession = Boolean(
    request.cookies.get(ACCESS_COOKIE)?.value ?? request.cookies.get(REFRESH_COOKIE)?.value,
  );

  const isProtected = PROTECTED_PREFIXES.some((prefix) => pathname.startsWith(prefix));
  if (isProtected && !hasSession) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('next', pathname);
    return NextResponse.redirect(loginUrl);
  }

  const isAuthPage = AUTH_PREFIXES.some((prefix) => pathname.startsWith(prefix));
  if (isAuthPage && hasSession) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/documents/:path*', '/login', '/register', '/verify-email'],
};
