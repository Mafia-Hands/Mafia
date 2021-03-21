import { React, useContext } from 'react';
import { GameContext } from '../Pages/GamePage';
import styles from '../Styles/BottomBar.module.css';
import classNames from 'classnames';

const BottomBar = () => {
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
