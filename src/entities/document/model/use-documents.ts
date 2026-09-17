'use client';

import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../../../shared/api';
import type { DocumentsQuery, FinancialDocument, PaginatedResult } from './types';

function buildQueryString(query: DocumentsQuery): string {
  const params = new URLSearchParams();
  if (query.page) params.set('page', String(query.page));
  if (query.limit) params.set('limit', String(query.limit));
  if (query.type) params.set('type', query.type);
  if (query.status) params.set('status', query.status);
  const search = params.toString();
  return search ? `?${search}` : '';
}

export function useDocuments(query: DocumentsQuery) {
  return useQuery({
    queryKey: ['documents', query],
    queryFn: () =>
      apiClient.get<PaginatedResult<FinancialDocument>>(
        `/api/backend/documents${buildQueryString(query)}`,
      ),
  });
}

export function useDocument(id: string) {
  return useQuery({
    queryKey: ['documents', id],
    queryFn: () => apiClient.get<FinancialDocument>(`/api/backend/documents/${id}`),
    enabled: Boolean(id),
  });
}
