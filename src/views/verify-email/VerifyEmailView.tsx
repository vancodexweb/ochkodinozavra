import { AuthShell } from '../../shared/ui';
import { VerifyEmailForm } from '../../features/verify-email';

export interface VerifyEmailViewProps {
  defaultEmail?: string;
}

export function VerifyEmailView({ defaultEmail }: VerifyEmailViewProps) {
  return (
    <AuthShell title="Verify your email">
      <VerifyEmailForm defaultEmail={defaultEmail} />
    </AuthShell>
  );
}
