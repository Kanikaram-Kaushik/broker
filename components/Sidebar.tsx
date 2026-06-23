"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Sidebar.module.css';

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>
        Broker<span>CRM</span>
      </div>
      <nav className={styles.nav}>
        <Link href="/" className={`${styles.navItem} ${pathname === '/' ? styles.active : ''}`}>
          <span className={styles.icon}>📊</span>
          Dashboard
        </Link>
        <Link href="/leads" className={`${styles.navItem} ${pathname.startsWith('/leads') ? styles.active : ''}`}>
          <span className={styles.icon}>👥</span>
          Leads
        </Link>
        <Link href="/profile" className={`${styles.navItem} ${pathname.startsWith('/profile') ? styles.active : ''}`}>
          <span className={styles.icon}>👤</span>
          Profile
        </Link>
      </nav>
    </aside>
  );
}
