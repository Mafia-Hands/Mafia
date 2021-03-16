import React from 'react';
import { Link } from 'react-router-dom';
import TopBarGame from '../Components/TopBarGame';
import GameEnv from '../Components/GameEnv';
import BottomBar from '../Components/BottomBar';

/**
 * Component that displays the Home Screen
 */
function Home() {
    return (
        <div className="App">
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/play">Play</Link>
                </li>
            </ul>
            <header className="App-header">
                <div style={{ width: '80%' }}>
                    <TopBarGame userDetails={['Reeve', 'Civilian']} showTimer showRole />
                    <GameEnv />
                    <BottomBar />
                </div>
            </header>
        </div>
    );
}

export default Home;
