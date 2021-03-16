import './App.css';
import { BrowserRouter as Router, Switch, Route, useHistory } from 'react-router-dom';
import PlayScreen from './Pages/PlayScreen';
import Home from './Pages/Home';
import React, { useState, useEffect } from 'react';
import HomeScreen from './Components/HomeScreen';
import NewGameScreen from './Components/NewGameScreen';

function App() {
    const [lobbyId, setLobbyId] = useState();
    const [allowIn, setAllowIn] = useState(false);

    const history = useHistory();

    const url = history.location.pathname.substring(1);

    useEffect(() => {
        history.push(lobbyId);
    }, [lobbyId]);

    return (
        <Switch>
            {allowIn && (
                <Route exact path="/:lobbyId">
                    <NewGameScreen />
                </Route>
            )}

            <Route path="/*">
                <HomeScreen lobbyId={url} setLobbyId={setLobbyId} setAllowIn={setAllowIn} />
            </Route>
        </Switch>
    );
}

export default App;
