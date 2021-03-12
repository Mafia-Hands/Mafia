import { React } from 'react';
import styles from '../Styles/PlayerList.module.css';

/**
 * @param playerNames MANDATORY prop: a list of strings (player names)
 */
const PlayerList = ({playerNames}) => {
  return (
    <div className={styles.container}>
      <h3 className={styles.playerListHeader}>Player List</h3>
      <ul className={styles.playerList}>
        {playerNames.map((playerName, index) =>
          <li key={index}>
            {playerName}
          </li>
        )}
      </ul>
    </div>
  )
}

export default PlayerList