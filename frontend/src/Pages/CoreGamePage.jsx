import React from 'react';
import TopBarGame from '../Components/TopBarGame';
import GameEnv from '../Components/GameEnv';
import BottomBar from '../Components/BottomBar';

export default function CoreGamePage() {
    return (
        <div>
            <TopBarGame
                userDetails={['Reeve', 'Civilian']}
                showTimer={true}
                showRole={true}
            />
            <GameEnv />
            <BottomBar />
        </div>
    );
}