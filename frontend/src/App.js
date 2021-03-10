import './App.css';
import TopBar from './Components/TopBar';
import GameEnv from './Components/GameEnv';
import BottomBar from './Components/BottomBar';

import RoleTable from './Components/RoleTable';
import RuleParagraph from './Components/RuleParagraph';

import RuleAndRuleDialog from './Pages/RoleAndRuleDialog';
import Header from './Components/Header';

function App() {
  return (

    <div className='App'>
      <header className='App-header'>
        <div style={{ width: '80%' }}>
          <TopBar userName='Reeve' role='Civilian' />
          <GameEnv />
          <BottomBar />
        </div>
      </header>
    </div>
  );
}

export default App;
