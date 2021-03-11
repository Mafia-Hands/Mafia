import './App.css';
import TopBar from './Components/TopBar';
import GameEnv from './Components/GameEnv';
import BottomBar from './Components/BottomBar';
import RuleAndRuleDialog from './Pages/RoleAndRuleDialog';
import { Switch, Route } from 'react-router-dom';
import SettingDialog from './Pages/SettingDialog';

function App() {

  return (
    
      <Switch>

        <Route path="/info">
            <RuleAndRuleDialog />
        </Route>

        <Route path="/setting">
            <SettingDialog />
        </Route>

        <Route path="/">
          <div className='App'>
            <header className='App-header'>
                <div style={{ width: '80%' }}>
                  <TopBar userName='Reeve' role='Civilian' />                  
                  <GameEnv />
                  <BottomBar />
                </div>
              </header>
            </div>
        </Route>

      </Switch>
    
  );

 
}

export default App;
