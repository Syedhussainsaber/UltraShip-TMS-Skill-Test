import React from 'react';
import { ChevronLeft, MoreVertical, User } from 'lucide-react';
import styles from './DetailView.module.scss';



export const DetailView = ({ employee, onClose }) => {
  if (!employee) return null;

  return (
    <div className={styles.detailViewOverlay}>
      <div 
        className={styles.detailViewModal}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.detailViewHeader}>
          <button
            onClick={onClose}
            className={styles.detailViewBackButton}
          >
            <ChevronLeft />
            <span>Back</span>
          </button>
          <button 
            className={styles.detailViewAction}
            onClick={(e) => {
              e.stopPropagation();
              // Handle action menu
            }}
          >
            <MoreVertical />
          </button>
        </div>

        <div className={styles.detailViewContent}>
          <div className={styles.detailViewProfile}>
            <div className={styles.detailViewAvatar}>
              <User />
            </div>
            <div className={styles.detailViewInfo}>
              <h2 className={styles.detailViewName}>{employee.name}</h2>
              <p className={styles.detailViewDepartment}>{employee.department}</p>
            </div>
          </div>

          <div className={styles.detailViewSection}>
            <h3 className={styles.detailViewSectionTitle}>Contact Information</h3>
            <div className={styles.detailViewGrid}>
              <div className={styles.detailViewField}>
                <span className={styles.detailViewLabel}>Email</span>
                <p>{employee.email}</p>
              </div>
              <div className={styles.detailViewField}>
                <span className={styles.detailViewLabel}>Phone</span>
                <p>{employee.phone}</p>
              </div>
              <div className={styles.detailViewField}>
                <span className={styles.detailViewLabel}>Website</span>
                <p>{employee.website}</p>
              </div>
            </div>
          </div>

          <div className={styles.detailViewSection}>
            <h3 className={styles.detailViewSectionTitle}>Employment Details</h3>
            <div className={styles.detailViewGrid}>
              <div className={styles.detailViewField}>
                <span className={styles.detailViewLabel}>Status</span>
                <p className={`${styles.detailViewStatus} ${
                  styles[employee.status.toLowerCase().replace(/\s+/g, '')]
                }`}>
                  {employee.status}
                </p>
              </div>
              <div className={styles.detailViewField}>
                <span className={styles.detailViewLabel}>Join Date</span>
                <p>{employee.joinDate}</p>
              </div>
              <div className={styles.detailViewField}>
                <span className={styles.detailViewLabel}>Salary</span>
                <p>${employee.salary.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailView;