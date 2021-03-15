import './App.css';
import { BrowserRouter as Router, Switch, Route, useHistory } from 'react-router-dom';
import PlayScreen from './Pages/PlayScreen';
import Home from './Pages/Home';
import React, { useState, useEffect } from 'react';
import HomeScreen from './Components/HomeScreen';

function App() {
    const [lobbyId, setLobbyId] = useState();

    const history = useHistory();

    useEffect(() => {
        history.push(lobbyId);
    }, [lobbyId]);

    return (
        <Switch>
            <Route exact path="/">
                <HomeScreen />
            </Route>
            {/* <Route path="/play">
                <PlayScreen />
            </Route> */}
        </Switch>
    );
}

export default App;
