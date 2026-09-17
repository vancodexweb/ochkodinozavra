/** Uniform error shape returned by every BFF route handler (see src/app/api/**). */
export interface ApiErrorPayload {
  message: string;
  code?: string;
}

export class ApiError extends Error {
  readonly status: number;
  readonly code?: string;

  constructor(status: number, payload: ApiErrorPayload) {
    super(payload.message);
    this.name = 'ApiError';
    this.status = status;
    this.code = payload.code;
  }
}
