import './App.css';
import CodeJoinBar from './Components/CodeJoinBar';
import CreateGame from './Components/CreateGame';
import NicknameBar from './Components/NicknameBar';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                {/* This is for testing modals */}
                {/* Need to import these components  */}
                {/* <div style={{ width: '80%' }}>
                    
                    <TopBar userName="Reeve" role="Civilian" />
                    <GameEnv />
                    <BottomBar /> */}

                <div style={{ width: '100%' }}>
                    <h1>MAFIA</h1>
                    <CodeJoinBar />
                    <NicknameBar />
                    <CreateGame />
                </div>
            </header>
        </div>
    );
}

export default App;
