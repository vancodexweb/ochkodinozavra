'use client';

import { Card, Spinner } from '../../shared/ui';
import { formatDate } from '../../shared/lib';
import { RoleBadge, useSession } from '../../entities/session';
import { fullName, usePersonProfile } from '../../entities/person';
import styles from './DashboardOverviewView.module.css';

export function DashboardOverviewView() {
  const session = useSession();
  const profile = usePersonProfile();

  return (
    <div className={styles.page}>
      <h1>Overview</h1>

      <div className={styles.grid}>
        <Card>
          <div className={styles.cardTitle}>Account</div>
          {session.isLoading ? (
            <Spinner />
          ) : (
            <>
              <div className={styles.row}>
                <span className={styles.rowLabel}>Email</span>
                <span>{session.data?.user?.email}</span>
              </div>
              <div className={styles.row}>
                <span className={styles.rowLabel}>Role</span>
                {session.data?.user ? <RoleBadge role={session.data.user.role} /> : null}
              </div>
            </>
          )}
        </Card>

        <Card>
          <div className={styles.cardTitle}>Profile</div>
          {profile.isLoading ? (
            <Spinner />
          ) : profile.data ? (
            <>
              <div className={styles.row}>
                <span className={styles.rowLabel}>Full name</span>
                <span>{fullName(profile.data.profile)}</span>
              </div>
              <div className={styles.row}>
                <span className={styles.rowLabel}>Date of birth</span>
                <span>{formatDate(profile.data.profile.birthDate)}</span>
              </div>
            </>
          ) : (
            <span className={styles.rowLabel}>Profile unavailable</span>
          )}
        </Card>
      </div>
    </div>
  );
}
