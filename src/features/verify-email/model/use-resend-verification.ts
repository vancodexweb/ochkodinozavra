'use client';

import { useMutation } from '@tanstack/react-query';
import { apiClient } from '../../../shared/api';

export function useResendVerification() {
  return useMutation({
    mutationFn: (email: string) =>
      apiClient.post<{ message: string }>('/api/auth/resend-verification', { email }),
  });
}
