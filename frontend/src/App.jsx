import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import HomePage from './Pages/HomePage';
import GamePage from './Pages/GamePage';
import NewGameScreen from './Pages/NewGameScreen';
import useLobbyState from './Hooks/useLobbyState';

import { GeneralContext } from './Context';

// bgm selector
// The music is retrieved from freepd.com, and they are public domain copyright-free resources
/* eslint-disable */
function bgmLang() {
    var brsLang =(navigator.language || navigator.browserLanguage).toLowerCase().substr(0, 2);
    if (brsLang === 'zh')
        return "https://freepd.com/music/Arpent.mp3";
    else
        return "https://freepd.com/music/Goodnightmare.mp3";
}
/* eslint-enable */

/**
 * Main React Component
 */
function App() {
    const [state, dispatch] = useLobbyState();

    const pathname = window.location.pathname.substring(1);

    let component;

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

    return (
        <GeneralContext.Provider value={{ state, dispatch }}>
            <Router>
                <Switch>
                    <Route exact path="/">
                        <audio id ="bgm" autoPlay="autoPlay" preload="auto" loop="loop">
                            <source  src={bgmLang()} />
                            <track src="" kind="captions" srcLang="" label="" />
                        </audio>
                        <div id="brightness" style={{ height: '100vh', background : '#9B9B9B' }}>{component}</div>;
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
