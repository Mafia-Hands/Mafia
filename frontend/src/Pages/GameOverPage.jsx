import { React } from 'react';
import TopBarSettings from '../Components/TopBarSettings';
import Player from '../Components/Player';

const GameOverPage = ({ userName, role }) => {
    return (
        <div>
            <TopBarSettings
                currentScreen={`WINNER are a ${role}`}
                showSettings={true}
            />
            <div>
                {userName.map((name) => {
                    return <Player playerName={name} />;
                })}
            </div>
        </div>
    );
};

export default GameOverPage;
