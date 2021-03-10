import logo from './logo.svg';
import './App.css';
import TopBar from './Components/TopBar';

function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        <div style={{ width: '80%' }}>
          <TopBar userName='Reeve' role='Civilian' />
        </div>
      </header>
    </div>
  );
}

export default App;
