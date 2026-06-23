import Link from 'next/link';
import { registerUser } from '@/app/actions/auth';
import styles from './Register.module.css';

export default function Register() {
  return (
    <div className={styles.authContainer}>
      <div className={styles.authCard}>
        <div className={styles.logo}>
          Broker<span>CRM</span>
        </div>
        
        <h1 className={styles.title}>Create your account</h1>
        <p className={styles.subtitle}>Join the platform to manage your real estate pipeline</p>
        
        <form action={registerUser} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="fullName">Full Name</label>
            <input type="text" id="fullName" name="fullName" placeholder="e.g. Jane Doe" required className={styles.input} />
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="email">Email Address</label>
            <input type="email" id="email" name="email" placeholder="name@example.com" required className={styles.input} />
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="phone">Phone Number</label>
            <input type="tel" id="phone" name="phone" placeholder="+1 (555) 000-0000" className={styles.input} />
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" required className={styles.input} />
          </div>
          
          <button type="submit" className={styles.btnPrimary}>
            Register Account
          </button>
        </form>
        
        <p className={styles.footerText}>
          Already have an account? <Link href="/login" className={styles.link}>Sign in</Link>
        </p>
      </div>
    </div>
  );
}
