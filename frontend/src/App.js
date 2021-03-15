import './App.css';
import HomeScreenID from './Components/HomeScreenID';
import NewGameScreen from './Components/NewGameScreen';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <div style={{ width: '80%' }}>
                    <NewGameScreen/>
                </div>
            </header>
        </div>
    );
}

export default App;
