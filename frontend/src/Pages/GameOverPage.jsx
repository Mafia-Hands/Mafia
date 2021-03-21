import { React, useContext } from 'react';
import socket from '../Socket';
import { Button } from '@material-ui/core';
import TopBarSettings from '../Components/TopBarSettings';
import Player from '../Components/Player';
import { GameContext } from './GamePage';
import { animated, useSpring } from 'react-spring';
import useLobbyState from '../Hooks/useLobbyState';


const GameOverPage = ({ userName, role }) => {
    const { state } = useContext(GameContext);
    const props = useSpring({
        to: { opacity: 1 },
        from: { opacity: 0.1 },
        delay: 500,
        reset: true,
    });

    const returnToLobby = () => {
        socket.emit('reset-lobby-update');
    };

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
            <Button
                variant="contained"
                color="secondary"
                size="small"
                id="reset-lobby"
                onClick={returnToLobby}
            >
                Return to the Lobby
            </Button>
        </div>
    );
};

export default GameOverPage;
