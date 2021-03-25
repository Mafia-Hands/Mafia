import { React, useContext } from 'react';
import { animated, useSpring } from 'react-spring';
import TopBarSettings from '../Components/TopBarSettings';
import Player from '../Components/Player';
import { GeneralContext } from '../Context';

const EntryScreen = () => {
    // get the current lobby state
    const { state: generalState } = useContext(GeneralContext);

    // used for the fade-in animation
    const props = useSpring({
        to: { opacity: 1 },
        from: { opacity: 0.1 },
        delay: 500,
        reset: true,
    });
    return (
        <div>
            <animated.div style={props}>
                <TopBarSettings currentScreen={`You are a ${generalState.role}`} />
                <div style={{ textAlign: 'center' }}>
                    <Player playerName={generalState.nickname} />
                </div>
            </animated.div>
        </div>
    );
};

export default EntryScreen;
