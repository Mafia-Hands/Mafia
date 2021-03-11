import { React } from 'react';
import styles from '../Styles/LobbySettings.module.css';

function LobbySettings(props) {
    const gameCode = props.gameCode
    return (
      <div className={styles.container}>
        <div className={styles.lobbySettingsHeader}>
            <h3 className={styles.lobbySettingsTitle}>Game Settings</h3>
            <h3 className={styles.gameCode}>Game Code: {gameCode}</h3>
        </div>
        <div className={styles.lobbySettingsOptions}>
            <button className={styles.rolesButton} onClick={() => alert('Roles explanation screen goes here')}>
                Roles
            </button>
            <p>Mafia</p>
        </div>
      </div>
    )
}

export default LobbySettings