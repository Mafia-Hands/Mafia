import { React } from 'react';
import { useHistory } from 'react-router';
import styles from '../Styles/TopBar.module.css';

const TopBar = ({ userName, role }) => {

  const history = useHistory();

  const handleInfoBtn = () => {
    history.push("/info");
  } 

  const handleSettingBtn = () => {
    history.push("/setting");
  }

  return (
    <div className={styles.container}>
      <p className={styles.userName}>{`Name: ${userName}`}</p>
      <p className={styles.userRole}>{`Role: ${role}`} 
        <button onClick={handleInfoBtn}> 
          <i className="fa fa-info"></i>
        </button>  
      </p>
      <div className={styles.timer}>Timer Placeholder</div>
      <button className={styles.settingsButton} onClick={handleSettingBtn} >Settings</button>
      
    </div>
  );
};

export default TopBar;
