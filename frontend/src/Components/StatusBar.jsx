import React, { useContext } from 'react';
import { GameContext } from '../Pages/GamePage';
import styles from '../Styles/Statusbar.module.css';
import { animated, useSpring } from 'react-spring';

export default function StatusBar() {
    const { state } = useContext(GameContext);
    const props = useSpring({
        to: { opacity: 1 },
        from: { opacity: 0.3 },
        delay: 2000,
        reset: true,
    });

    return (
        <div>
            <animated.div style={props}>
                <h1 className={styles.heading}> {state.status}</h1>
            </animated.div>
        </div>
    );
}
