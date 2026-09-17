import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { BACKEND_API_URL, ACCESS_COOKIE, REFRESH_COOKIE } from '../../_lib/env';
import { decodeAccessToken, isExpired } from '../../_lib/jwt';
import { clearSessionCookies, type BackendTokenPair } from '../../_lib/set-session-cookies';

/**
 * /auth/logout requires a Bearer access token on the backend (enforced by
 * its global JWT guard, not just documented by @ApiBearerAuth) - without
 * one the guard rejects the request with 401 before the controller ever
 * revokes the refresh token, silently leaving it valid server-side even
 * though the browser's cookies got cleared. Refresh first if the access
 * token is already expired, so logout still revokes the session even
 * when the user clicks "Sign out" long after the access token's TTL.
 */
export async function POST() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get(REFRESH_COOKIE)?.value;
  let accessToken = cookieStore.get(ACCESS_COOKIE)?.value;
  const payload = accessToken ? decodeAccessToken(accessToken) : null;

  if (refreshToken) {
    if (!payload || isExpired(payload)) {
      const refreshed = await fetch(`${BACKEND_API_URL}/auth/refresh`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken }),
      }).catch(() => null);

      if (refreshed?.ok) {
        const tokens = (await refreshed.json()) as BackendTokenPair;
        accessToken = tokens.accessToken;
      }
    }

    await fetch(`${BACKEND_API_URL}/auth/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      },
      body: JSON.stringify({ refreshToken }),
    }).catch(() => undefined);
  }

  clearSessionCookies(cookieStore);

  return new NextResponse(null, { status: 204 });
}
