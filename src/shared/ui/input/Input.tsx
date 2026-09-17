import { forwardRef, type InputHTMLAttributes } from 'react';
import { cn } from '../../lib';
import styles from './Input.module.css';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  invalid?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { invalid, className, ...rest },
  ref,
) {
  return (
    <input ref={ref} className={cn(styles.input, invalid && styles.invalid, className)} {...rest} />
  );
});
