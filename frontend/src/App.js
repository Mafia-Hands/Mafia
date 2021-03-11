import './App.css'
import TopBar from './Components/TopBar'
import GameEnv from './Components/GameEnv'
import BottomBar from './Components/BottomBar'
import LobbySettings from './Components/LobbySettings'

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <div style={{ width: '80%' }}>
                    <TopBar userName="Reeve" role="Civilian" />
                    <LobbySettings gameCode="ABC123"/>
                    <BottomBar />
                </div>
            </header>
        </div>
    )
}

export default App
