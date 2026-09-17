export enum DocumentType {
  INVOICE = 'INVOICE',
  ACT = 'ACT',
  WAYBILL = 'WAYBILL',
  RECEIPT = 'RECEIPT',
  WRITE_OFF = 'WRITE_OFF',
  CORRECTION = 'CORRECTION',
  INTERNAL = 'INTERNAL',
}

export enum DocumentStatus {
  DRAFT = 'DRAFT',
  SUBMITTED = 'SUBMITTED',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  POSTED = 'POSTED',
  CANCELLED = 'CANCELLED',
  REVERSED = 'REVERSED',
}

/** Mirrors FinancialDocument from the pro-auth backend (documents module). */
export interface FinancialDocument {
  id: string;
  documentNumber: string;
  type: DocumentType;
  date: string;
  counterpartyId: string | null;
  contractId: string | null;
  currency: string;
  amountTotal: string;
  status: DocumentStatus;
  description: string;
  createdByUserId: string;
  approvedByUserId: string | null;
  approvedAt: string | null;
  rejectionReason: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedResult<T> {
  items: T[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface DocumentsQuery {
  page?: number;
  limit?: number;
  type?: DocumentType;
  status?: DocumentStatus;
}
