'use client';

import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../../../shared/api';
import type { SessionResponse } from './types';

export const SESSION_QUERY_KEY = ['session'] as const;

export function useSession() {
  return useQuery({
    queryKey: SESSION_QUERY_KEY,
    queryFn: () => apiClient.get<SessionResponse>('/api/auth/session'),
    staleTime: 60_000,
  });
}
