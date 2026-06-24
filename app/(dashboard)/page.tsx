import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { decrypt } from "@/lib/auth";
import { redirect } from "next/navigation";
import styles from './Dashboard.module.css';

export default async function Home() {
  const cookieStore = await cookies();
  const session = cookieStore.get("session")?.value;
  if (!session) redirect("/login");
  
  const payload = await decrypt(session);
  const brokerId = payload.user.id as string;

  // Mock metrics for Vercel demo
  const totalLeads = 0;
  const siteVisits = 0;
  const activeDeals = 0;
  const closedDeals = 0;
  const recentActivity: any[] = [];

  return (
    <div className={styles.dashboard}>
      <header className={styles.header}>
        <h1 className={styles.title}>Dashboard</h1>
        <p className={styles.subtitle}>Overview of your real estate pipeline</p>
      </header>

      <div className={styles.metricsGrid}>
        <div className={styles.metricCard}>
          <h3>Total Leads</h3>
          <div className={styles.metricValue}>{totalLeads}</div>
          <div className={`${styles.metricTrend} ${styles.neutral}`}>All time</div>
        </div>
        <div className={styles.metricCard}>
          <h3>Site Visits</h3>
          <div className={styles.metricValue}>{siteVisits}</div>
          <div className={`${styles.metricTrend} ${styles.positive}`}>Current pipeline</div>
        </div>
        <div className={styles.metricCard}>
          <h3>Active Deals</h3>
          <div className={styles.metricValue}>{activeDeals}</div>
          <div className={`${styles.metricTrend} ${styles.neutral}`}>In progress</div>
        </div>
        <div className={styles.metricCard}>
          <h3>Deals Closed</h3>
          <div className={styles.metricValue}>{closedDeals}</div>
          <div className={`${styles.metricTrend} ${styles.positive}`}>Total won</div>
        </div>
      </div>

      <div className={styles.recentActivity}>
        <h2>Recent Activity</h2>
        <div className={styles.activityList}>
          {recentActivity.length === 0 ? (
            <p className={styles.subtitle}>No activity yet. Start by registering a lead!</p>
          ) : (
            recentActivity.map(lead => (
              <div key={lead.id} className={styles.activityItem}>
                <div className={styles.activityAvatar}>{lead.name.charAt(0)}</div>
                <div className={styles.activityInfo}>
                  <p><strong>{lead.name}</strong> is currently at <em>{lead.status}</em> ({lead.deal})</p>
                  <span className={styles.time}>{new Date(lead.updatedAt).toLocaleDateString()}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
