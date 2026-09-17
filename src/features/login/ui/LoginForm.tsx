'use client';

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Alert, Button, FormField, Input } from '../../../shared/ui';
import { ApiError } from '../../../shared/api';
import { ROUTES } from '../../../shared/config';
import { useLogin } from '../model/use-login';
import styles from './LoginForm.module.css';

export interface LoginFormProps {
  nextPath?: string;
}

export function LoginForm({ nextPath }: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const login = useLogin();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    login.mutate(
      { email, password },
      {
        onSuccess: () => {
          router.push(nextPath && nextPath.startsWith('/') ? nextPath : ROUTES.dashboard);
          router.refresh();
        },
      },
    );
  }

  const errorMessage =
    login.error instanceof ApiError ? login.error.message : login.error ? 'Something went wrong' : null;

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      {errorMessage ? <Alert tone="error">{errorMessage}</Alert> : null}

      <FormField label="Email" htmlFor="login-email">
        <Input
          id="login-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </FormField>

      <FormField label="Password" htmlFor="login-password">
        <Input
          id="login-password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </FormField>

      <Button type="submit" fullWidth loading={login.isPending}>
        Sign in
      </Button>

      <div className={styles.footer}>
        <span>No account yet?</span>
        <Link href={ROUTES.register}>Register</Link>
      </div>
    </form>
  );
}
