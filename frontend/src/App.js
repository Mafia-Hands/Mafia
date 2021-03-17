import './App.css';
// import { BrowserRouter as Router, Switch, Route, useHistory } from 'react-router';
import PlayScreen from './Pages/PlayScreen';
import Home from './Pages/Home';
import React, { useState, useEffect } from 'react';
import HomeScreen from './Components/HomeScreen';

import { Switch, Route, useHistory } from 'react-router';

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

    const [lobbyId, setLobbyId] = useState();
    const [allowIn, setAllowIn] = useState(false);

    const history = useHistory();

    const url = history.location.pathname.substring(1);

    useEffect(() => {
        history.push(lobbyId);
        state.screen = 'lobby';
    }, [lobbyId]);

    let component;

    switch (state.screen) {
        case 'home':
            component = <HomeScreen lobbyId={url} setLobbyId={setLobbyId} setAllowIn={setAllowIn} />;
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
            <Switch>
                {allowIn && (
                    <Route exact path="/:lobbyId">
                        {/* {(state.screen = 'lobby')} */}
                        {component}
                        {/* <NewGameScreen /> */}
                    </Route>
                )}
                <Route path="/*">{component}</Route>
            </Switch>
        </GeneralContext.Provider>
    );
}

export default App;
