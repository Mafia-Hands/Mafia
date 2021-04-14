import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import HomePage from './Pages/HomePage';
import GamePage from './Pages/GamePage';
import NewGameScreen from './Pages/NewGameScreen';
import useLobbyState from './Hooks/useLobbyState';

import { GeneralContext } from './Context';

// export const GeneralContext = React.createContext();

/**
 * Main React Component
 */
function App() {
    const [state, dispatch] = useLobbyState();

    const pathname = window.location.pathname.substring(1);

    let component;

    let gameComponent;

    switch (state.screen) {
        case 'home':
            component = <HomePage code={pathname} />;
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

    if (state.screen === 'game') {
        gameComponent = <div id="brightness" style={{ height: '100vh', background : '#9B9B9B' }}>{component}</div>;
    } else {
        gameComponent = <div id="brightness" style={{ height: '100vh', background : '#9B9B9B' }}>{component}</div>
    }

    return (
        <GeneralContext.Provider value={{ state, dispatch }}>
            <Router>
                <Switch>
                    <Route exact path="/">
                        {gameComponent}
                    </Route>
                    <Route path="/*">
                        <Redirect to="/" />
                    </Route>
                </Switch>
            </Router>
        </GeneralContext.Provider>
    );
}

export default App;
