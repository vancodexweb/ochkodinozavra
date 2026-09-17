import type { HTMLAttributes } from 'react';
import { cn } from '../../lib';
import styles from './Badge.module.css';

export type BadgeTone = 'neutral' | 'success' | 'warning' | 'danger' | 'info';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: BadgeTone;
}

export function Badge({ tone = 'neutral', className, ...rest }: BadgeProps) {
  return <span className={cn(styles.badge, styles[tone], className)} {...rest} />;
}
