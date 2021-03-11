import './App.css';
import TopBar from './Components/TopBar';
import GameEnv from './Components/GameEnv';
import BottomBar from './Components/BottomBar';

import RoleTable from './Components/RoleTable';
import RuleParagraph from './Components/RuleParagraph';

import RuleAndRuleDialog from './Pages/RoleAndRuleDialog';

import SettingDialog from './Pages/SettingDialog';

import { Switch, Route, Link } from 'react-router-dom';

import { useHistory } from 'react-router';




function App() {

  const history = useHistory();

  const handleInfoBtn = () => {
    history.push('/info');
  } 

  const handleBackBtn = () => {
    history.goBack();
  }

  return (
    
      <Switch>

        <Route path="/info">
            <RuleAndRuleDialog />
        </Route>

        <Route path="/">
          <div className='App'>
            <header className='App-header'>
                <div style={{ width: '80%' }}>
                  

                  <TopBar userName='Reeve' role='Civilian' />
                  {/* <Link to="/info">  <button onClick={()=> handleInfoBtn}>xxxxxxxxxxx </button> </Link> */}
                  
                  <GameEnv />
                  <BottomBar />
                </div>
              </header>
            </div>
        </Route>

        
      </Switch>
    

    // <div className='App'>
    //         <header className='App-header'>
    //             <div style={{ width: '80%' }}>
    //               <TopBar userName='Reeve' role='Civilian' />
    //               <button onClick={()=> handleInfoBtn}>xxxxxxxxxxx </button>
    //               <GameEnv />
    //               <BottomBar />
    //             </div>
    //           </header>
    //         </div>
    

    // <RuleAndRuleDialog />
    // <SettingDialog />
  );
}

export default App;
