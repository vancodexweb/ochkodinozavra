import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { BACKEND_API_URL } from '../../_lib/env';
import { decodeAccessToken, toSessionUser } from '../../_lib/jwt';
import { setSessionCookies, type BackendTokenPair } from '../../_lib/set-session-cookies';

export async function POST(request: Request) {
  const body = await request.json();

  const backendResponse = await fetch(`${BACKEND_API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  const data = await backendResponse.json().catch(() => null);

  if (!backendResponse.ok) {
    return NextResponse.json(data ?? { message: 'Login failed' }, { status: backendResponse.status });
  }

  const tokens = data as BackendTokenPair;
  const payload = decodeAccessToken(tokens.accessToken);

  const cookieStore = await cookies();
  setSessionCookies(cookieStore, tokens);

  return NextResponse.json({ user: payload ? toSessionUser(payload) : null });
}
