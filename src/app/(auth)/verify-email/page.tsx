import type { Metadata } from 'next';
import { VerifyEmailView } from '../../../views/verify-email';

export const metadata: Metadata = { title: 'Verify email' };

interface VerifyEmailPageProps {
  searchParams: Promise<{ email?: string }>;
}

export default async function VerifyEmailPage({ searchParams }: VerifyEmailPageProps) {
  const { email } = await searchParams;
  return <VerifyEmailView defaultEmail={email} />;
}
