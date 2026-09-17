import type { Metadata } from 'next';
import { LoginView } from '../../../views/login';

export const metadata: Metadata = { title: 'Sign in' };

interface LoginPageProps {
  searchParams: Promise<{ next?: string }>;
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const { next } = await searchParams;
  return <LoginView nextPath={next} />;
}
