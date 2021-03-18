import { React, useContext } from 'react';
import TopBarSettings from '../Components/TopBarSettings';
import Player from '../Components/Player';
import { GameContext } from './GamePage';

const GameOverPage = ({ userName, role }) => {
    const { state } = useContext(GameContext);
    return (
        <div>
            <TopBarSettings currentScreen={`WINNER are a ${state.winningRole}`} showSettings={true} />
            <div>
                {state.winners.map((name) => {
                    return <Player playerName={name} />;
                })}
            </div>
        </div>
    );
};

export default GameOverPage;
