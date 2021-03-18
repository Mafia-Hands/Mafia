import { React, useContext } from 'react';
import { GeneralContext } from '../App';
import styles from '../Styles/LobbySettings.module.css';

/**
 * @param gameCode MANDATORY prop: string of game entry code
 */
const LobbySettings = ({ gameCode }) => {
    const { state } = useContext(GeneralContext);

    return (
        <div className={styles.container}>
            <div className={styles.lobbySettingsHeader}>
                <h3 className={styles.lobbySettingsTitle}>Game Settings</h3>
                <h3 id="room-code" className={styles.gameCode}>
                    Game Code: {state.code}
                </h3>
            </div>
            <div className={styles.lobbySettingsOptions}>
                <button className={styles.rolesButton} onClick={() => alert('Roles explanation screen goes here')}>
                    Roles
                </button>
                <div className={styles.mafiaSelectorContainer}>
                    <p className={styles.mafiaSelectorText}>Mafia</p>
                    <select className={styles.mafiaSelectorDropdown} name="MafiaNum">
                        <option value="0">0</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

export default LobbySettings;
