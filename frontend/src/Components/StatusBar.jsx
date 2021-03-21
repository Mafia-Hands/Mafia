import React, { useContext } from 'react';
import { GameContext } from '../Pages/GamePage';
import styles from '../Styles/Statusbar.module.css';
import classNames from 'classnames';

export default function StatusBar() {
    const { state } = useContext(GameContext);

    const isNight = state.dayPeriod === 'Night';

    // apply styles based on whether certain props is true
    const containerStyle = classNames({
        [styles.container]: true,
        [styles.day]: !isNight,
        [styles.night]: isNight,
    });

    return (
        <div className={containerStyle}>
            <h1 key={state.status} className={styles.heading}>
                {state.status}
            </h1>
        </div>
    );
}
