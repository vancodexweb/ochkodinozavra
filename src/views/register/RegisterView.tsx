import { AuthShell } from '../../shared/ui';
import { RegisterForm } from '../../features/register';

export function RegisterView() {
  return (
    <AuthShell title="Create account" wide>
      <RegisterForm />
    </AuthShell>
  );
}
