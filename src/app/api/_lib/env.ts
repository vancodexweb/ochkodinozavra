/**
 * Server-only config, read directly from process.env. This module lives
 * inside src/app/api (the BFF's own internal plumbing) and is never
 * re-exported through src/shared - importing it from a client component
 * would leak nothing secret today, but the boundary keeps it that way.
 */
export const BACKEND_API_URL = process.env.BACKEND_API_URL ?? 'http://localhost:3000';
export const ACCESS_COOKIE = process.env.AUTH_ACCESS_COOKIE ?? 'oc_access';
export const REFRESH_COOKIE = process.env.AUTH_REFRESH_COOKIE ?? 'oc_refresh';
export const COOKIES_SECURE = process.env.COOKIES_SECURE === 'true';
export const REFRESH_COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 30;
