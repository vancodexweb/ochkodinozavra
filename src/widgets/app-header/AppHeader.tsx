'use client';

import Link from 'next/link';
import { RoleBadge, useSession } from '../../entities/session';
import { LogoutButton } from '../../features/logout';
import { ROUTES } from '../../shared/config';
import styles from './AppHeader.module.css';

export function AppHeader() {
  const { data } = useSession();
  const user = data?.user;

  return (
    <header className={styles.header}>
      <Link className={styles.brand} href={ROUTES.dashboard}>
        Finance ERP
      </Link>
      {user ? (
        <div className={styles.userArea}>
          <span className={styles.email}>{user.email}</span>
          <RoleBadge role={user.role} />
          <LogoutButton />
        </div>
      ) : null}
    </header>
  );
}
