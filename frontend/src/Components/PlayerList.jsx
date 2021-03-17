import { React, useContext } from 'react';
import styles from '../Styles/PlayerList.module.css';
import { GeneralContext } from '../App';
/**
 * @param playerNames MANDATORY prop: a list of strings (player names)
 */
const PlayerList = ({ playerNames }) => {
    const { state } = useContext(GeneralContext);

    return (
        <div className={styles.container}>
            <h3 className={styles.playerListHeader}>Player List</h3>
            <ul className={styles.playerList}>
                {state.players.map((playerName, index) => (
                    <li key={index}>{playerName}</li>
                ))}
            </ul>
        </div>
    );
};

export default PlayerList;
