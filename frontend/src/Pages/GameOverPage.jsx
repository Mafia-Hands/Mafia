import { React, useContext } from 'react';
import TopBarSettings from '../Components/TopBarSettings';
import Player from '../Components/Player';
import { GameContext } from './GamePage';
import { animated, useSpring } from 'react-spring';

const GameOverPage = ({ userName, role }) => {
    const { state } = useContext(GameContext);
    const props = useSpring({
        to: { opacity: 1 },
        from: { opacity: 0.1 },
        delay: 500,
        reset: true,
    });
    return (
        <div>
            <animated.div style={props}>
                <TopBarSettings currentScreen={`WINNER are a ${state.winningRole}`} showSettings={true} />
                <div>
                    {state.winners.map((name) => {
                        return <Player playerName={name} />;
                    })}
                </div>
            </animated.div>
        </div>
    );
};

export default GameOverPage;
