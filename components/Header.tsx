import { logoutUser } from '@/app/actions/auth';
import { cookies } from 'next/headers';
import { decrypt } from '@/lib/auth';
import styles from './Header.module.css';

export default async function Header() {
  const cookieStore = await cookies();
  const session = cookieStore.get('session')?.value;
  let userName = "Broker Agent";
  
  if (session) {
    try {
      const payload = await decrypt(session);
      if (payload?.user?.name) {
        userName = payload.user.name;
      }
    } catch (e) {
      // ignore
    }
  }

  const avatarLetter = userName.charAt(0).toUpperCase();

  return (
    <header className={styles.header}>
      <div className={styles.search}>
        <span className={styles.searchIcon}>🔍</span>
        <input type="text" placeholder="Search leads, deals..." className={styles.searchInput} />
      </div>
      <div className={styles.actions}>
        <button className={styles.iconButton}>🔔</button>
        <div className={styles.profile}>
          <div className={styles.avatar}>{avatarLetter}</div>
          <div className={styles.profileInfo}>
            <span className={styles.name}>{userName}</span>
            <span className={styles.role}>Broker</span>
          </div>
          <form action={logoutUser} style={{ marginLeft: '1rem' }}>
            <button type="submit" className={styles.iconButton} title="Logout" style={{ color: 'var(--deal-lost)', cursor: 'pointer' }}>
              ⎋
            </button>
          </form>
        </div>
      </div>
    </header>
  );
}
