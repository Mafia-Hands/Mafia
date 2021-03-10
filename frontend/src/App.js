import './App.css'
import TopBar from './Components/TopBar'
import GameEnv from './Components/GameEnv'
import BottomBar from './Components/BottomBar'

function App() {
    const playerStates = [
        {
            playerId: '1',
            name: 'Player 1',
            state: 'alive',
        },
        {
            playerId: '2',
            name: 'Player 2',
            state: 'alive',
        },
        {
            playerId: '3',
            name: 'Player 3',
            state: 'alive',
        },
        {
            playerId: '4',
            name: 'Player 4',
            state: 'alive',
        },
        {
            playerId: '5',
            name: 'Player 5',
            state: 'alive',
        },
        {
            playerId: '6',
            name: 'Player 6',
            state: 'alive',
        },
        {
            playerId: '7',
            name: 'Player 6',
            state: 'alive',
        },
        // {
        //     playerId: "8",
        //     name: "Player 6",
        //     state: "alive",
        // },
        // {
        //     playerId: "9",
        //     name: "Player 6",
        //     state: "alive",
        // },
        // {
        //     playerId: "10",
        //     name: "Player 6",
        //     state: "alive",
        // },
        // {
        //     playerId: "11",
        //     name: "Player 6",
        //     state: "alive",
        // },
        // {
        //     playerId: "12",
        //     name: "Player 6",
        //     state: "alive",
        // },
    ]
    return (
        <div className="App">
            <header className="App-header">
                <div style={{ width: '80%' }}>
                    <TopBar userName="Reeve" role="Civilian" />
                    <GameEnv />

                    <BottomBar />
                </div>
            </header>
        </div>
    )
}

export default App
