import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// import PlayScreen from './Pages/PlayScreen';
// import Home from './Pages/Home';
import HomePage from './Pages/HomePage';
import GamePage from './Pages/GamePage';
import NewGameScreen from './Pages/NewGameScreen';
import useLobbyState from './Hooks/useLobbyState';

export const GeneralContext = React.createContext();

/**
 * Main React Component
 */
function App() {
    const [state, dispatch] = useLobbyState();

    let component;

    switch (state.screen) {
        case 'home':
            component = <HomePage />;
            break;
        case 'lobby':
            component = <NewGameScreen />;
            break;
        case 'game':
            component = <GamePage />;
            break;
        default:
            throw new Error('Invalid App screen state');
    }

    return (
        <GeneralContext.Provider value={{ state, dispatch }}>
            <Router>
                <Switch>
                    <Route exact path="/">
                        {/* <Home /> */}
                        {component}
                    </Route>
                    <Route path="/play">
                        {/* <PlayScreen /> */}
                        {component}
                    </Route>
                </Switch>
            </Router>
        </GeneralContext.Provider>
    );
}

export default App;
