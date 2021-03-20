import { React, useContext } from 'react';
import TopBarSettings from '../Components/TopBarSettings';
import Player from '../Components/Player';
import { GeneralContext } from '../App';
import { animated, useSpring } from 'react-spring';

const EntryScreen = () => {
    const { state: generalState } = useContext(GeneralContext);
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
            <div style={{textAlign: 'center'}}>
                <Player playerName={generalState.nickname} />
            </div>
            </animated.div>
        </div>
    );
};

export default EntryScreen;
