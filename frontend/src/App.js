import './App.css';
import TopBar from './Components/TopBar';
import GameEnv from './Components/GameEnv';
import BottomBar from './Components/BottomBar';

function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        <div style={{ width: '80%' }}>
          <GameOver />
        </div>
      </header>
    </div>
  );
}

export default App;
