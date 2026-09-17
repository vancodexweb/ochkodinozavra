'use client';

import { useState } from 'react';
import { Button, Card, Spinner } from '../../shared/ui';
import { formatDate, formatMoney } from '../../shared/lib';
import { DEFAULT_PAGE_SIZE } from '../../shared/config';
import { DocumentStatusBadge, useDocuments } from '../../entities/document';
import styles from './DocumentsListView.module.css';

export function DocumentsListView() {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useDocuments({ page, limit: DEFAULT_PAGE_SIZE });

  return (
    <div className={styles.page}>
      <h1>Documents</h1>

      <Card>
        {isLoading ? (
          <Spinner />
        ) : !data || data.items.length === 0 ? (
          <div className={styles.empty}>No documents yet.</div>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Number</th>
                <th>Type</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {data.items.map((doc) => (
                <tr key={doc.id}>
                  <td>{doc.documentNumber}</td>
                  <td>{doc.type}</td>
                  <td>{formatDate(doc.date)}</td>
                  <td>{formatMoney(doc.amountTotal, doc.currency)}</td>
                  <td>
                    <DocumentStatusBadge status={doc.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Card>

      {data && data.meta.totalPages > 1 ? (
        <div className={styles.pagination}>
          <Button
            variant="secondary"
            disabled={page <= 1}
            onClick={() => setPage((current) => current - 1)}
          >
            Previous
          </Button>
          <span>
            Page {data.meta.page} of {data.meta.totalPages}
          </span>
          <Button
            variant="secondary"
            disabled={page >= data.meta.totalPages}
            onClick={() => setPage((current) => current + 1)}
          >
            Next
          </Button>
        </div>
      ) : null}
    </div>
  );
}
