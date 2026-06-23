import Link from 'next/link';
import { loginUser } from '@/app/actions/auth';
import styles from '../register/Register.module.css';

export default function Login() {
  return (
    <div className={styles.authContainer}>
      <div className={styles.authCard}>
        <div className={styles.logo}>
          Broker<span>CRM</span>
        </div>
        
        <h1 className={styles.title}>Welcome back</h1>
        <p className={styles.subtitle}>Sign in to manage your pipeline</p>
        
        <form action={loginUser} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email Address</label>
            <input type="email" id="email" name="email" placeholder="name@example.com" required className={styles.input} />
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" required className={styles.input} />
          </div>
          
          <button type="submit" className={styles.btnPrimary}>
            Sign In
          </button>
        </form>
        
        <p className={styles.footerText}>
          Don't have an account? <Link href="/register" className={styles.link}>Register</Link>
        </p>
      </div>
    </div>
  );
}
