import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { decrypt } from "@/lib/auth";
import { redirect } from "next/navigation";
import styles from './Profile.module.css';

export default async function Profile() {
  const cookieStore = await cookies();
  const session = cookieStore.get("session")?.value;
  if (!session) redirect("/login");
  
  const payload = await decrypt(session);
  const user = await prisma.user.findUnique({
    where: { id: payload.user.id }
  });

  if (!user) redirect("/login");

  return (
    <div className={styles.profileContainer}>
      <header className={styles.header}>
        <h1 className={styles.title}>Broker Profile</h1>
        <p className={styles.subtitle}>Manage your account details and settings</p>
      </header>

      <div className={styles.card}>
        <div className={styles.avatarSection}>
          <div className={styles.avatarLarge}>{user.name.charAt(0).toUpperCase()}</div>
          <div>
            <h2 className={styles.name}>{user.name}</h2>
            <p className={styles.role}>Real Estate Broker</p>
          </div>
        </div>

        <form className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="fullName">Full Name</label>
            <input type="text" id="fullName" defaultValue={user.name} className={styles.input} disabled />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email Address</label>
            <input type="email" id="email" defaultValue={user.email} className={styles.input} disabled />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="phone">Phone Number</label>
            <input type="tel" id="phone" defaultValue={user.phone || ''} className={styles.input} disabled />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="agency">Agency Name</label>
            <input type="text" id="agency" defaultValue={user.agency || ''} className={styles.input} disabled />
          </div>
        </form>
      </div>
    </div>
  );
}
