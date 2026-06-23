"use client";

import { useState, useTransition } from 'react';
import { createLead, updateLeadStatus, updateLeadDeal } from '@/app/actions/leads';
import styles from './Leads.module.css';

type Lead = {
  id: string;
  name: string;
  contact: string;
  location: string;
  address: string | null;
  requirements: string;
  budget: string;
  status: string;
  deal: string;
};

const statuses = ['Dial-out', 'Site Visit', 'Experience center Visit', 'Quotation shared'];

export default function LeadsClient({ initialLeads }: { initialLeads: Lead[] }) {
  const [showForm, setShowForm] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleAddLead = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    startTransition(async () => {
      await createLead(formData);
      setShowForm(false);
    });
  };

  const handleStatusChange = (id: string, newStatus: string) => {
    startTransition(async () => {
      await updateLeadStatus(id, newStatus);
    });
  };

  const handleDealChange = (id: string, newDeal: string) => {
    startTransition(async () => {
      await updateLeadDeal(id, newDeal);
    });
  }

  return (
    <div className={styles.leadsContainer}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Lead Management</h1>
          <p className={styles.subtitle}>Track and progress your real estate deals</p>
        </div>
        <button className={styles.btnPrimary} onClick={() => setShowForm(true)}>+ Register Lead</button>
      </header>

      {/* Kanban Board */}
      <div className={styles.board}>
        {statuses.map(status => (
          <div key={status} className={styles.column}>
            <div className={styles.columnHeader}>
              <h3>{status}</h3>
              <span className={styles.count}>{initialLeads.filter(l => l.status === status).length}</span>
            </div>
            
            <div className={styles.cardList}>
              {initialLeads.filter(l => l.status === status).map(lead => (
                <div key={lead.id} className={styles.card} style={{ opacity: isPending ? 0.6 : 1 }}>
                  <div className={styles.cardHeader}>
                    <h4>{lead.name}</h4>
                    <span className={`${styles.dealBadge} ${styles[lead.deal.toLowerCase().replace('-', '')]}`}>
                      {lead.deal}
                    </span>
                  </div>
                  <p className={styles.leadDetail}>📍 {lead.location}</p>
                  <p className={styles.leadDetail}>💰 {lead.budget}</p>
                  <p className={styles.leadDetail}>🏠 {lead.requirements}</p>
                  
                  <div className={styles.cardActions}>
                    <select 
                      value={lead.status} 
                      onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                      className={styles.statusSelect}
                      disabled={isPending}
                    >
                      {statuses.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                    
                    <select 
                      value={lead.deal} 
                      onChange={(e) => handleDealChange(lead.id, e.target.value)}
                      className={styles.dealSelect}
                      disabled={isPending}
                    >
                      <option value="In-progress">In-progress</option>
                      <option value="Closed">Closed</option>
                      <option value="Lost">Lost</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Registration Form Modal */}
      {showForm && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <h2>Register New Lead</h2>
              <button className={styles.closeBtn} onClick={() => setShowForm(false)}>×</button>
            </div>
            
            <form onSubmit={handleAddLead} className={styles.form}>
              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label>Name</label>
                  <input name="name" required className={styles.input} />
                </div>
                <div className={styles.formGroup}>
                  <label>Contact No</label>
                  <input name="contact" required className={styles.input} />
                </div>
                <div className={styles.formGroup}>
                  <label>Location</label>
                  <input name="location" required className={styles.input} />
                </div>
                <div className={styles.formGroup}>
                  <label>Address</label>
                  <input name="address" className={styles.input} />
                </div>
                <div className={styles.formGroup}>
                  <label>Requirements (e.g. 2BHK)</label>
                  <input name="requirements" required className={styles.input} />
                </div>
                <div className={styles.formGroup}>
                  <label>Budget</label>
                  <input name="budget" required className={styles.input} />
                </div>
              </div>
              
              <div className={styles.formActions}>
                <button type="button" className={styles.btnSecondary} onClick={() => setShowForm(false)} disabled={isPending}>Cancel</button>
                <button type="submit" className={styles.btnPrimary} disabled={isPending}>
                  {isPending ? 'Registering...' : 'Register Lead'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
