import './App.css';
import PlayScreen from './Pages/PlayScreen';
import Home from './Pages/Home';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

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