import { ApiError, type ApiErrorPayload } from './http-error';

/**
 * Talks ONLY to this Next.js app's own route handlers (same-origin,
 * `/api/auth/**` and `/api/backend/**`) - never directly to the pro-auth
 * backend. The BFF route handlers hold the real backend URL and the
 * httpOnly auth cookies; the browser never sees either. See
 * src/app/api/backend/[...path]/route.ts for the generic proxy this
 * hits for every resource besides auth itself.
 */
async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const isFormData = init?.body instanceof FormData;
  const response = await fetch(path, {
    ...init,
    credentials: 'same-origin',
    headers: isFormData
      ? init?.headers
      : { 'Content-Type': 'application/json', ...init?.headers },
  });

  if (response.status === 204) {
    return undefined as T;
  }

  const isJson = response.headers.get('content-type')?.includes('application/json');
  const data = isJson ? await response.json() : undefined;

  if (!response.ok) {
    const payload: ApiErrorPayload = data ?? { message: response.statusText };
    throw new ApiError(response.status, payload);
  }

  return data as T;
}

export const apiClient = {
  get: <T>(path: string) => request<T>(path),
  post: <T>(path: string, body?: unknown) =>
    request<T>(path, {
      method: 'POST',
      body: body instanceof FormData ? body : body !== undefined ? JSON.stringify(body) : undefined,
    }),
  patch: <T>(path: string, body?: unknown) =>
    request<T>(path, { method: 'PATCH', body: body !== undefined ? JSON.stringify(body) : undefined }),
};
