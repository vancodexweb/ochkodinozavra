import { AuthShell } from '../../shared/ui';
import { LoginForm } from '../../features/login';

export interface LoginViewProps {
  nextPath?: string;
}

export function LoginView({ nextPath }: LoginViewProps) {
  return (
    <AuthShell title="Sign in">
      <LoginForm nextPath={nextPath} />
    </AuthShell>
  );
}
