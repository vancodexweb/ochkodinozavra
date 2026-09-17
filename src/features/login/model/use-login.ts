'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../../../shared/api';
import { SESSION_QUERY_KEY, type SessionResponse } from '../../../entities/session';

export interface LoginInput {
  email: string;
  password: string;
}

export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: LoginInput) => apiClient.post<SessionResponse>('/api/auth/login', input),
    onSuccess: (data) => {
      queryClient.setQueryData(SESSION_QUERY_KEY, data);
    },
  });
}
