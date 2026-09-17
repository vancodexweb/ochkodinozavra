'use client';

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Alert, Button, FormField, Input } from '../../../shared/ui';
import { ApiError } from '../../../shared/api';
import { ROUTES } from '../../../shared/config';
import { useVerifyEmail } from '../model/use-verify-email';
import { useResendVerification } from '../model/use-resend-verification';
import styles from './VerifyEmailForm.module.css';

export interface VerifyEmailFormProps {
  defaultEmail?: string;
}

export function VerifyEmailForm({ defaultEmail = '' }: VerifyEmailFormProps) {
  const [email, setEmail] = useState(defaultEmail);
  const [code, setCode] = useState('');
  const router = useRouter();
  const verifyEmail = useVerifyEmail();
  const resend = useResendVerification();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    verifyEmail.mutate(
      { email, code },
      {
        onSuccess: () => {
          router.push(ROUTES.login);
        },
      },
    );
  }

  const activeError = verifyEmail.error ?? resend.error;
  const errorMessage =
    activeError instanceof ApiError ? activeError.message : activeError ? 'Something went wrong' : null;

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      {errorMessage ? <Alert tone="error">{errorMessage}</Alert> : null}
      {verifyEmail.isSuccess ? (
        <Alert tone="success">Email verified. Your account now awaits administrator approval.</Alert>
      ) : null}
      {resend.isSuccess ? <Alert tone="info">A new verification code has been sent.</Alert> : null}

      <FormField label="Email" htmlFor="verify-email">
        <Input
          id="verify-email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </FormField>

      <FormField label="Verification code" htmlFor="verify-code" hint="6-digit code sent to your email">
        <Input
          id="verify-code"
          inputMode="numeric"
          pattern="[0-9]{6}"
          maxLength={6}
          required
          value={code}
          onChange={(event) => setCode(event.target.value)}
        />
      </FormField>

      <Button type="submit" fullWidth loading={verifyEmail.isPending}>
        Verify email
      </Button>

      <div className={styles.resendRow}>
        <span>Didn&apos;t get a code?</span>
        <button
          type="button"
          className={styles.resendButton}
          disabled={!email || resend.isPending}
          onClick={() => resend.mutate(email)}
        >
          Resend code
        </button>
      </div>
    </form>
  );
}
