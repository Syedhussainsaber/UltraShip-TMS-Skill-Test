import React from 'react';
import { MoreVertical } from 'lucide-react';
import styles from './GridView.module.scss';


export const GridView = ({ employees, onSelectEmployee }) => {
  return (
    <div className={styles.gridViewContainer}>
      <table className={styles.gridViewTable}>
        <thead className={styles.gridViewHeader}>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Status</th>
            <th>Salary</th>
            <th>Join Date</th>
            <th>Phone</th>
            <th>Website</th>
            <th>Company</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr 
              key={employee.id} 
              onClick={() => onSelectEmployee(employee)}
            >
              <td className={styles.gridViewCell}>{employee.name}</td>
              <td className={styles.gridViewCell}>{employee.email}</td>
              <td className={styles.gridViewCell}>{employee.department}</td>
              <td className={styles.gridViewCell}>
                <span 
                  className={`${styles.gridViewStatus} ${
                    styles[employee.status.toLowerCase().replace(/\s+/g, '')]
                  }`}
                >
                  {employee.status}
                </span>
              </td>
              <td className={styles.gridViewCell}>
                ${employee.salary.toLocaleString()}
              </td>
              <td className={styles.gridViewCell}>{employee.joinDate}</td>
              <td className={styles.gridViewCell}>{employee.phone}</td>
              <td className={styles.gridViewCell}>{employee.website}</td>
              <td className={styles.gridViewCell}>{employee.company.name}</td>
              <td className={styles.gridViewCell}>
                <button 
                  className={styles.gridViewAction}
                  onClick={(e) => {
                    e.stopPropagation();
                    // Handle action menu
                  }}
                >
                  <MoreVertical className={styles.gridViewActionIcon} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GridView;