import { Badge } from '../../../shared/ui';
import type { Role } from '../model/types';

export function RoleBadge({ role }: { role: Role }) {
  return <Badge tone={role === 'ADMIN' ? 'info' : 'neutral'}>{role}</Badge>;
}
