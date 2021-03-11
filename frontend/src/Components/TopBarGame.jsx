import { React } from 'react';
import styles from '../Styles/TopBarGame.module.css';

/**
 * @param userDetails [{userName: <string>, role: <string>}]
 * @param showTimer true/false OPTIONAL prop that will render Timer if true
 * @param showRole true/false OPTIONAL prop that will render Role if true
 */

const TopBarGame = ({ userDetails, showTimer, showRole }) => {
    const [userName, role] = userDetails;
    return (
        <div className={styles.container}>
            <p className={styles.userName}>{`Name: ${userName}`}</p>
            {showRole && (
                <div className={styles.userRole}>
                    <span>{`Role: ${role}   `}</span>
                    <button>Info</button>
                </div>
            )}
            {showTimer && <div className={styles.timer}>Timer Placeholder</div>}
            <button className={styles.settingsButton}>Settings</button>
        </div>
    );
};

export default TopBarGame;
