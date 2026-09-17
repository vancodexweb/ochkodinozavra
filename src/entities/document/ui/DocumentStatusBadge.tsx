import { Badge, type BadgeTone } from '../../../shared/ui';
import { DocumentStatus } from '../model/types';

const TONE_BY_STATUS: Record<DocumentStatus, BadgeTone> = {
  [DocumentStatus.DRAFT]: 'neutral',
  [DocumentStatus.SUBMITTED]: 'info',
  [DocumentStatus.APPROVED]: 'info',
  [DocumentStatus.REJECTED]: 'danger',
  [DocumentStatus.POSTED]: 'success',
  [DocumentStatus.CANCELLED]: 'neutral',
  [DocumentStatus.REVERSED]: 'warning',
};

export function DocumentStatusBadge({ status }: { status: DocumentStatus }) {
  return <Badge tone={TONE_BY_STATUS[status]}>{status}</Badge>;
}
