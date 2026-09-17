import { NextResponse, type NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import { BACKEND_API_URL, ACCESS_COOKIE, REFRESH_COOKIE } from '../../_lib/env';
import { clearSessionCookies, setSessionCookies, type BackendTokenPair } from '../../_lib/set-session-cookies';

interface RouteContext {
  params: Promise<{ path: string[] }>;
}

/**
 * One generic authenticated proxy for every backend resource that isn't
 * auth itself (documents, users, etc.) - a new resource on the backend
 * needs no new route handler here, just a call from the entity/feature
 * layer to `/api/backend/<resource>`. Attaches the access token from the
 * httpOnly cookie as a normal Bearer header and, on a single 401,
 * transparently refreshes once and retries before giving up.
 */
async function forward(request: NextRequest, { params }: RouteContext): Promise<NextResponse> {
  const { path } = await params;
  const backendPath = `/${path.join('/')}${request.nextUrl.search}`;
  const method = request.method;
  const hasBody = method !== 'GET' && method !== 'HEAD';
  const bodyText = hasBody ? await request.text() : undefined;

  const cookieStore = await cookies();
  let accessToken = cookieStore.get(ACCESS_COOKIE)?.value;

  const callBackend = (token: string | undefined) =>
    fetch(`${BACKEND_API_URL}${backendPath}`, {
      method,
      headers: {
        ...(hasBody ? { 'Content-Type': 'application/json' } : {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: bodyText,
    });

  let backendResponse = await callBackend(accessToken);

  if (backendResponse.status === 401) {
    const refreshToken = cookieStore.get(REFRESH_COOKIE)?.value;

    if (refreshToken) {
      const refreshed = await fetch(`${BACKEND_API_URL}/auth/refresh`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken }),
      });

      if (refreshed.ok) {
        const tokens = (await refreshed.json()) as BackendTokenPair;
        accessToken = tokens.accessToken;
        setSessionCookies(cookieStore, tokens);
        backendResponse = await callBackend(accessToken);
      } else {
        clearSessionCookies(cookieStore);
      }
    }
  }

  if (backendResponse.status === 204) {
    return new NextResponse(null, { status: 204 });
  }

  const isJson = backendResponse.headers.get('content-type')?.includes('application/json');
  const data = isJson ? await backendResponse.json().catch(() => null) : null;

  return NextResponse.json(data, { status: backendResponse.status });
}

export { forward as GET, forward as POST, forward as PATCH };
