/** Client-safe route constants. Never put secrets or server URLs here. */
export const ROUTES = {
  home: '/',
  login: '/login',
  register: '/register',
  verifyEmail: '/verify-email',
  dashboard: '/dashboard',
  documents: '/documents',
  documentDetail: (id: string) => `/documents/${id}`,
} as const;

export const DEFAULT_PAGE_SIZE = 20;
