import { React, useContext } from 'react';
import { GameContext } from '../Pages/GamePage';
// import styles from '../Styles/BottomBar.module.css';

const BottomBar = () => {
    const { state } = useContext(GameContext);
    return(    
    <div>
        <h1>{`${state.dayPeriod} ${state.dayNumber}`}</h1>
    </div>
    )
};

export default BottomBar;