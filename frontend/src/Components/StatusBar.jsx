import React, { useContext } from 'react';
import { GameContext } from '../Pages/GamePage';
import styles from '../Styles/Statusbar.module.css';

export default function StatusBar() {
    const { state } = useContext(GameContext);
    return (
        <div>
            <h1 className={styles.heading}> {state.status}</h1>
        </div>
    );
}
