'use client';

import { useMutation } from '@tanstack/react-query';
import { apiClient } from '../../../shared/api';

export interface VerifyEmailInput {
  email: string;
  code: string;
}

export function useVerifyEmail() {
  return useMutation({
    mutationFn: (input: VerifyEmailInput) =>
      apiClient.post<{ message: string }>('/api/auth/verify-email', input),
  });
}
