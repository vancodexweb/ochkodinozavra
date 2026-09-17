import type { Metadata } from 'next';
import { DashboardOverviewView } from '../../../views/dashboard-overview';

export const metadata: Metadata = { title: 'Overview' };

export default function DashboardPage() {
  return <DashboardOverviewView />;
}
