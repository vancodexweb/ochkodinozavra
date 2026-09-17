import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { BACKEND_API_URL, ACCESS_COOKIE, REFRESH_COOKIE } from '../../_lib/env';
import { decodeAccessToken, isExpired, toSessionUser } from '../../_lib/jwt';
import { clearSessionCookies, setSessionCookies, type BackendTokenPair } from '../../_lib/set-session-cookies';

/**
 * The single source of truth the browser uses to know "who am I". It never
 * returns a token - only the sanitized claims - and transparently rotates
 * an expired access token via the refresh cookie so a page reload doesn't
 * bounce a still-valid session to the login screen.
 */
export async function GET() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(ACCESS_COOKIE)?.value;
  const payload = accessToken ? decodeAccessToken(accessToken) : null;

  if (payload && !isExpired(payload)) {
    return NextResponse.json({ user: toSessionUser(payload) });
  }

  const refreshToken = cookieStore.get(REFRESH_COOKIE)?.value;
  if (!refreshToken) {
    return NextResponse.json({ user: null });
  }

  const refreshed = await fetch(`${BACKEND_API_URL}/auth/refresh`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refreshToken }),
  });

  if (!refreshed.ok) {
    clearSessionCookies(cookieStore);
    return NextResponse.json({ user: null });
  }

  const tokens = (await refreshed.json()) as BackendTokenPair;
  const newPayload = decodeAccessToken(tokens.accessToken);
  setSessionCookies(cookieStore, tokens);

  return NextResponse.json({ user: newPayload ? toSessionUser(newPayload) : null });
}
