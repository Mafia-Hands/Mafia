import './App.css'
import CodeJoinBar from './Components/CodeJoinBar'
import CreateGame from './Components/CreateGame'
import NicknameBar from './Components/NicknameBar'

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <div style={{ width: '100%' }}>
                    <h1>MAFIA</h1>
                    <CodeJoinBar/>
                    <NicknameBar />
                    <CreateGame />
                </div>
            </header>
        </div>
    );
}

export default App;
