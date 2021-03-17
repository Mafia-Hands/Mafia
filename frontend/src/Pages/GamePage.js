import { createContext } from 'react';
import CoreGamePage from './CoreGamePage';
import EntryScreen from './EntryScreen';
import GameOverPage from './GameOverPage';

import useGameState from '../Hooks/useGameState';

export const GameContext = createContext();

export default function GamePage() {
    const state = useGameState();
    let component;

    switch (state.screen) {
        case 'entry':
            component = <EntryScreen />;
            break;
        case 'core':
            component = <CoreGamePage />;
            break;
        case 'end':
            component = <GameOverPage />;
            break;
        default:
            throw new Error('Invalid Game Page screen state');
    }
    return (
        <GameContext.Provider value={{ state }}>
            {/* <VotingContext.Provider
                value={{ state: votingState, dispatch: votingDispatch }}
            > */}
            {component}
            {/* </VotingContext.Provider> */}
        </GameContext.Provider>
    );
}
