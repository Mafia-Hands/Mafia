import { React } from 'react';
import TopBarGame from '../Components/TopBarGame';
import GameEnv from '../Components/GameEnv';
import BottomBar from '../Components/BottomBar';

// this component will be used in GamePage
export default function CoreGamePage() {
    return (
        <div>
            <TopBarGame showTimer showRole />
            <GameEnv />
            <BottomBar />
        </div>
    );
}
