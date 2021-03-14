import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PlayScreen from './Pages/PlayScreen';
import Home from './Pages/Home';
import TopBarGame from './Components/TopBarGame';
import GameEnv from './Components/GameEnv';
import BottomBar from './Components/BottomBar';
import { useState, useEffect } from 'react';
import socket from './Socket';
import HomePage from './Pages/HomePage';
import LobbyPage from './Pages/LobbyPage';
import GamePage from './Pages/GamePage';
import React, { useReducer } from 'react';
import NewGameScreen from './Pages/NewGameScreen';

const initialState = {
    screen: 'home',
    nickname: '',
    code: '',
    host: '',
    players: [],
    lobbyReady: false,
    isHost: false,
    role: '',
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'lobby-code':
            return { ...state, code: action.code };
        case 'create-lobby':
            return {
                ...state,
                nickname: action.nickname,
                host: action.nickname,
                isHost: true,
                players: [...state.players, action.nickname],
            };
        case 'join-lobby':
            return {
                ...state,
                nickname: action.nickname,
                code: action.code,
            };
        case 'lobby-ready':
            return {
                ...state,
                lobbyReady: true,
            };
        case 'change-screen':
            return {
                ...state,
                screen: action.screen,
            };
        case 'lobby-join':
            return {
                ...state,
                host: action.host,
                players: action.players,
            };
        case 'set-role':
            return {
                ...state,
                role: action.role,
            };
    }
};

export const GeneralContext = React.createContext();

/**
 * Main React Component
 */
function App() {
    const [state, dispatch] = useReducer(reducer, initialState);

    const confirmLobby = ({ success, errMsg }) => {
        if (!success) {
            alert(errMsg);
        } else {
            dispatch({ type: 'change-screen', screen: 'lobby' });
        }
    };

    const gameStart = ({ role }) => {
        // todo: ROLE should be eunum
        dispatch({ type: 'set-role', role: role.toLowerCase() });

        dispatch({ type: 'change-screen', screen: 'game' });
    };

    useEffect(() => {
        // Invoked only if player created lobby
        socket.on('lobby-code', ({ code }) => {
            dispatch({ type: 'lobby-code', code });
        });

        socket.on('lobby-confirm', confirmLobby);
        socket.on('lobby-join', (res) => dispatch({ type: 'lobby-join', ...res }));
        socket.on('lobby-ready', () => dispatch({ type: 'lobby-ready' }));
        socket.on('game-start', gameStart);
    }, []);

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
    }

    return (
        <GeneralContext.Provider value={{ state, dispatch }}>
            <Router>
                <Switch>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route path="/play">
                        <PlayScreen />
                    </Route>
                </Switch>
            </Router>
        </GeneralContext.Provider>
    );
}

export default App;
