import type { Metadata } from 'next';
import { DocumentsListView } from '../../../views/documents-list';

export const metadata: Metadata = { title: 'Documents' };

export default function DocumentsPage() {
  return <DocumentsListView />;
}
