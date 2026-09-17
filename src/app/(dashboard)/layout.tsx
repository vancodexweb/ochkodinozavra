import type { ReactNode } from 'react';
import { AppHeader } from '../../widgets/app-header';
import { AppSidebar } from '../../widgets/app-sidebar';
import styles from './layout.module.css';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className={styles.shell}>
      <AppHeader />
      <div className={styles.body}>
        <AppSidebar />
        <main className={styles.main}>{children}</main>
      </div>
    </div>
  );
}
