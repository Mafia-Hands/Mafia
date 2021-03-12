import './App.css';
import TopBarSettings from './Components/TopBarSettings';
import TopBarGame from './Components/TopBarGame';
import GameEnv from './Components/GameEnv';
import BottomBar from './Components/BottomBar';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <div style={{ width: '80%' }}>
                    <TopBarGame
                        userDetails={['Reeve', 'Civilian']}
                        showTimer={true}
                        showRole={true}
                    />
                    <TopBarSettings currentScreen="LOBBY" showSettings={true} />
                    <GameEnv />
                    <BottomBar />
                </div>
            </header>
        </div>
    );
}

export default App;
