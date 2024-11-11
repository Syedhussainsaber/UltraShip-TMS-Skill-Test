import React from 'react';
import { User, MoreVertical } from 'lucide-react';
import styles from './TileView.module.scss';

export const TileView = ({ employees, onSelectEmployee }) => {
  return (
    <div className={styles.tileViewGrid}>
      {employees.map((employee) => (
        <div
          key={employee.id}
          className={styles.tileViewCard}
          onClick={() => onSelectEmployee(employee)}
        >
          <div className={styles.tileViewContent}>
            <div className={styles.tileViewHeader}>
              <div className={styles.tileViewAvatar}>
                <User />
              </div>
              <button 
                className={styles.tileViewAction}
                onClick={(e) => {
                  e.stopPropagation();
                  // Handle action menu
                }}
              >
                <MoreVertical />
              </button>
            </div>
            <h3 className={styles.tileViewName}>{employee.name}</h3>
            <p className={styles.tileViewDepartment}>{employee.department}</p>
            <p className={styles.tileViewEmail}>{employee.email}</p>
            <div className={styles.tileViewFooter}>
              <span 
                className={`${styles.tileViewStatus} ${
                  styles[employee.status.toLowerCase().replace(/\s+/g, '')]
                }`}
              >
                {employee.status}
              </span>
              <span className={styles.tileViewDate}>
                Since {employee.joinDate}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TileView;