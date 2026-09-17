'use client';

import { useRouter } from 'next/navigation';
import { Button } from '../../../shared/ui';
import { ROUTES } from '../../../shared/config';
import { useLogout } from '../model/use-logout';

export function LogoutButton() {
  const router = useRouter();
  const logout = useLogout();

  function handleClick() {
    logout.mutate(undefined, {
      onSuccess: () => {
        router.push(ROUTES.login);
        router.refresh();
      },
    });
  }

  return (
    <Button variant="secondary" onClick={handleClick} loading={logout.isPending}>
      Sign out
    </Button>
  );
}
