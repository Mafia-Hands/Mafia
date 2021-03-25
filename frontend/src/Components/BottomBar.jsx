import { React, useContext } from 'react';
import classNames from 'classnames';
import { GameContext } from '../Context';

import styles from '../Styles/BottomBar.module.css';

const BottomBar = () => {
    // get the current game state
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
            <h1>{`${state.dayPeriod} ${state.dayNumber}`}</h1>
        </div>
    );
};

export default BottomBar;
