'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../../../shared/api';

export function useLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => apiClient.post<void>('/api/auth/logout'),
    onSuccess: () => {
      queryClient.clear();
    },
  });
}
