'use client';

import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../../../shared/api';
import type { PersonProfileResponse } from './types';

export function usePersonProfile() {
  return useQuery({
    queryKey: ['person', 'me'],
    queryFn: () => apiClient.get<PersonProfileResponse>('/api/backend/people/me'),
  });
}
