import React from 'react';
import CoreGamePage from './CoreGamePage';
import EntryScreen from './EntryScreen';
import GameOverPage from './GameOverPage';

import useGameState from '../Hooks/useGameState';

import { GameContext } from '../Context';

export default function GamePage() {
    // get the current game states
    // pass it to the child components
    const [state, dispatch] = useGameState();
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
    return <GameContext.Provider value={{ state, dispatch }}>{component}</GameContext.Provider>;
}
