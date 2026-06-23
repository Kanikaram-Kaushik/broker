"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { sendVerificationCodes, verifyCode } from '@/app/actions/verification';
import styles from '../register/Register.module.css';

export default function VerifyPage() {
  const router = useRouter();
  const [emailCode, setEmailCode] = useState('');
  const [phoneCode, setPhoneCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [phoneVerified, setPhoneVerified] = useState(false);

  const handleSendCodes = async () => {
    setLoading(true);
    setError('');
    const res = await sendVerificationCodes();
    if (res.error) setError(res.error);
    else {
      setSent(true);
      if (res.devEmailOtp) {
        console.log("%c[DEV MODE] Email OTP:", "color: blue; font-weight: bold; font-size: 14px", res.devEmailOtp);
        console.log("%c[DEV MODE] Mobile OTP:", "color: green; font-weight: bold; font-size: 14px", res.devPhoneOtp);
        alert(`[DEV MODE] Verification Codes Generated!\n\nEmail OTP: ${res.devEmailOtp}\nMobile OTP: ${res.devPhoneOtp}\n\n(These are also in your browser console and VS Code terminal)`);
      }
    }
    setLoading(false);
  };

  const handleVerifyEmail = async () => {
    setError('');
    const formData = new FormData();
    formData.append('type', 'EMAIL');
    formData.append('code', emailCode);
    const res = await verifyCode(formData);
    if (res.error) setError(res.error);
    else {
      setEmailVerified(true);
      checkDone(true, phoneVerified);
    }
  };

  const handleVerifyPhone = async () => {
    setError('');
    const formData = new FormData();
    formData.append('type', 'PHONE');
    formData.append('code', phoneCode);
    const res = await verifyCode(formData);
    if (res.error) setError(res.error);
    else {
      setPhoneVerified(true);
      checkDone(emailVerified, true);
    }
  };

  const checkDone = (eVerified: boolean, pVerified: boolean) => {
    if (eVerified && pVerified) {
      router.push('/');
      router.refresh();
    }
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.authCard}>
        <div className={styles.logo}>Broker<span>CRM</span></div>
        <h1 className={styles.title}>Verify Your Account</h1>
        <p className={styles.subtitle}>
          Secure your account by verifying your email and mobile number.
        </p>

        {error && <div style={{ color: 'var(--deal-lost)', marginBottom: '1rem', textAlign: 'center' }}>{error}</div>}

        {!sent ? (
          <button onClick={handleSendCodes} disabled={loading} className={styles.btnPrimary}>
            {loading ? 'Sending Codes...' : 'Send Verification Codes'}
          </button>
        ) : (
          <div className={styles.form}>
            <div className={styles.formGroup}>
              <label>Email OTP</label>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <input 
                  type="text" 
                  value={emailCode}
                  onChange={(e) => setEmailCode(e.target.value)}
                  className={styles.input} 
                  placeholder="6-digit code"
                  disabled={emailVerified}
                  style={{ flex: 1 }}
                />
                <button 
                  onClick={handleVerifyEmail} 
                  disabled={emailVerified || !emailCode}
                  className={styles.btnPrimary}
                  style={{ marginTop: 0, padding: '0.75rem' }}
                >
                  {emailVerified ? 'Verified' : 'Verify'}
                </button>
              </div>
            </div>

            <div className={styles.formGroup}>
              <label>Mobile OTP</label>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <input 
                  type="text" 
                  value={phoneCode}
                  onChange={(e) => setPhoneCode(e.target.value)}
                  className={styles.input} 
                  placeholder="6-digit code"
                  disabled={phoneVerified}
                  style={{ flex: 1 }}
                />
                <button 
                  onClick={handleVerifyPhone} 
                  disabled={phoneVerified || !phoneCode}
                  className={styles.btnPrimary}
                  style={{ marginTop: 0, padding: '0.75rem' }}
                >
                  {phoneVerified ? 'Verified' : 'Verify'}
                </button>
              </div>
            </div>
            <p className={styles.footerText}>
              Check the server console output for the simulated OTP codes.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
