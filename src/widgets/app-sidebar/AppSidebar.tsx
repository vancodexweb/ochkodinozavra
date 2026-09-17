'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '../../shared/lib';
import { ROUTES } from '../../shared/config';
import styles from './AppSidebar.module.css';

const NAV_ITEMS = [
  { href: ROUTES.dashboard, label: 'Overview' },
  { href: ROUTES.documents, label: 'Documents' },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <nav className={styles.sidebar} aria-label="Primary">
      {NAV_ITEMS.map((item) => {
        const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(styles.link, active && styles.linkActive)}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
