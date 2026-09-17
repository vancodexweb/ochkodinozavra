export type Role = 'WORKER' | 'ADMIN' | (string & {});

export interface SessionUser {
  id: string;
  email: string;
  role: Role;
  permissions: string[];
}

export interface SessionResponse {
  user: SessionUser | null;
}
