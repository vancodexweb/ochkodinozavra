import type { ReactNode } from 'react';
import { cn } from '../../lib';
import { Card } from '../card/Card';
import styles from './AuthShell.module.css';

export interface AuthShellProps {
  title: string;
  wide?: boolean;
  children: ReactNode;
}

export function AuthShell({ title, wide = false, children }: AuthShellProps) {
  return (
    <div className={styles.page}>
      <div className={cn(styles.container, wide && styles.wide)}>
        <Card>
          <h1 className={styles.title}>{title}</h1>
          {children}
        </Card>
      </div>
    </div>
  );
}
