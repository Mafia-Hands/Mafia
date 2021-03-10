import { React } from 'react';
import styles from '../Styles/TopBar.module.css';

const TopBar = ({ userName, role }) => {
  return (
    <div className={styles.container}>
      <p className={styles.userName}>{`Name: ${userName}`}</p>
      <p className={styles.userRole}>{`Role: ${role}`}</p>
      <div className={styles.timer}>Timer Placeholder</div>
      <button className={styles.settingsButton}>Settings</button>
    </div>
  );
};

export default TopBar;
