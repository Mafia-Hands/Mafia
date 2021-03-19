import {React} from 'react';
import TopBarGame from '../Components/TopBarGame';
import GameEnv from '../Components/GameEnv';
import BottomBar from '../Components/BottomBar';


export default function CoreGamePage({dayPeriod,dayNumber}) {
    return (
        <div>
            <TopBarGame showTimer={true} showRole={true} />
            <GameEnv />
            <BottomBar Period={dayPeriod} Number ={dayNumber}/>
        </div>
    );
}
