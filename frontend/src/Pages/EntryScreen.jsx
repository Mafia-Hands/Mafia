import { React, useContext } from 'react';
import TopBarSettings from '../Components/TopBarSettings';
import Player from '../Components/Player';
import { GeneralContext } from '../App';

const EntryScreen = () => {
    const { state: generalState } = useContext(GeneralContext);
    return (
        <div>
            <TopBarSettings
                currentScreen={`You are a ${generalState.role}`}
                showSettings={true}
            />
            <div>
                <Player playerName={generalState.nickname} />
            </div>
        </div>
    );
};

export default EntryScreen;
