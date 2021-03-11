import { React } from 'react';

import RoleAndRuleDialog from '../Pages/RoleAndRuleDialog';

import { useHistory } from 'react-router';


import { NavLink } from "react-router-dom";

import styles from '../Styles/TopBar.module.css';

const TopBar = ({ userName, role }) => {

  const history = useHistory();

  const handleInfoBtn = () => {
    history.push("/info");
  } 

  // const handleBackBtn = () => {
  //   history.replace("/");
  // }

  return (
    <div className={styles.container}>
      <p className={styles.userName}>{`Name: ${userName}`}</p>
      <p className={styles.userRole}>{`Role: ${role}`} 
        {/* <NavLink exact to="/info"> 
          <button onClick={() => handleInfoBtn}> 
            <i className="fa fa-info"></i>
          </button>  
        </NavLink> */}
        <button onClick={handleInfoBtn}> 
            <i className="fa fa-info"></i>
          </button>  
      </p>
      <div className={styles.timer}>Timer Placeholder</div>
      <button className={styles.settingsButton}>Settings</button>
      
    </div>
  );
};

export default TopBar;
