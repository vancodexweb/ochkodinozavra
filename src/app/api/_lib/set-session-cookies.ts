import type { cookies } from 'next/headers';
import { ACCESS_COOKIE, COOKIES_SECURE, REFRESH_COOKIE, REFRESH_COOKIE_MAX_AGE_SECONDS } from './env';

type CookieStore = Awaited<ReturnType<typeof cookies>>;

export interface BackendTokenPair {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export function setSessionCookies(cookieStore: CookieStore, tokens: BackendTokenPair): void {
  cookieStore.set(ACCESS_COOKIE, tokens.accessToken, {
    httpOnly: true,
    secure: COOKIES_SECURE,
    sameSite: 'lax',
    path: '/',
    maxAge: tokens.expiresIn,
  });
  cookieStore.set(REFRESH_COOKIE, tokens.refreshToken, {
    httpOnly: true,
    secure: COOKIES_SECURE,
    sameSite: 'lax',
    path: '/',
    maxAge: REFRESH_COOKIE_MAX_AGE_SECONDS,
  });
}

export function clearSessionCookies(cookieStore: CookieStore): void {
  cookieStore.delete(ACCESS_COOKIE);
  cookieStore.delete(REFRESH_COOKIE);
}
