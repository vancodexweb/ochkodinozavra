import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { ROUTES } from '../shared/config';

export default async function RootPage() {
  const cookieStore = await cookies();
  const accessCookie = process.env.AUTH_ACCESS_COOKIE ?? 'oc_access';
  const refreshCookie = process.env.AUTH_REFRESH_COOKIE ?? 'oc_refresh';
  const hasSession = Boolean(
    cookieStore.get(accessCookie)?.value ?? cookieStore.get(refreshCookie)?.value,
  );

  redirect(hasSession ? ROUTES.dashboard : ROUTES.login);
}
