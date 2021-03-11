import { React } from 'react';
import styles from '../Styles/LobbySettings.module.css';

function MafiaNumSelector(props) {
    return (
    <div>
        <p className={styles.mafiaSelectorText}>Mafia</p>
        <select className={styles.mafiaSelectorDropdown} name="MafiaNum">
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
        </select>
    </div>
    )
}

function LobbySettings(props) {
    const gameCode = props.gameCode
    return (
        <div className={styles.container}>
            <div className={styles.lobbySettingsHeader}>
                <h3 className={styles.lobbySettingsTitle}>Game Settings</h3>
                <h3 className={styles.gameCode}>Game Code: {gameCode}</h3>
            </div>
            <div className={styles.lobbySettingsOptions}>
                <a className={styles.rolesButton} onClick={() => alert('Roles explanation screen goes here')}>
                    Roles
                </a>
                <div>
                    <p className={styles.mafiaSelectorText}>Mafia</p>
                    <select className={styles.mafiaSelectorDropdown} name="MafiaNum">
                        <option value="0">0</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                    </select>
                </div>
            </div>
        </div>
    )
}

export default LobbySettings