/**
 * Decodes the payload of the backend's access token WITHOUT verifying its
 * signature. That is safe here: we only ever read a token we ourselves
 * just received from the backend over HTTPS (login/refresh), purely to
 * mirror its claims (sub/email/role/permissions/exp) into the session
 * cookie's owner. Every actual authorization decision still happens on
 * the backend, which verifies the signature on every proxied request.
 */
export interface AccessTokenPayload {
  sub: string;
  email: string;
  role: string;
  permissions: string[];
  exp: number;
  iat: number;
}

export function decodeAccessToken(token: string): AccessTokenPayload | null {
  const segments = token.split('.');
  if (segments.length !== 3) return null;

  try {
    const json = Buffer.from(segments[1] as string, 'base64url').toString('utf8');
    const parsed = JSON.parse(json) as Partial<AccessTokenPayload>;
    if (!parsed.sub || !parsed.email || !parsed.role || typeof parsed.exp !== 'number') {
      return null;
    }
    return {
      sub: parsed.sub,
      email: parsed.email,
      role: parsed.role,
      permissions: parsed.permissions ?? [],
      exp: parsed.exp,
      iat: parsed.iat ?? 0,
    };
  } catch {
    return null;
  }
}

export function isExpired(payload: Pick<AccessTokenPayload, 'exp'>): boolean {
  return Date.now() >= payload.exp * 1000;
}

export interface SessionUser {
  id: string;
  email: string;
  role: string;
  permissions: string[];
}

export function toSessionUser(payload: AccessTokenPayload): SessionUser {
  return { id: payload.sub, email: payload.email, role: payload.role, permissions: payload.permissions };
}
