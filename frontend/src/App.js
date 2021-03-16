import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PlayScreen from './Pages/PlayScreen';
import Home from './Pages/Home';

function App() {
    return (
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
    );
}

export default App;
