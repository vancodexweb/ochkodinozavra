import type { HTMLAttributes } from 'react';
import { cn } from '../../lib';
import styles from './Alert.module.css';

export type AlertTone = 'error' | 'success' | 'info';

export interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  tone?: AlertTone;
}

export function Alert({ tone = 'info', className, role, ...rest }: AlertProps) {
  return (
    <div
      className={cn(styles.alert, styles[tone], className)}
      role={role ?? (tone === 'error' ? 'alert' : 'status')}
      {...rest}
    />
  );
}
