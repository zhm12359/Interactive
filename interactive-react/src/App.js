// ./src/App.js
import { Route, Link } from 'react-router-dom';
import React, { Component } from 'react';
import './App.css';
import About from './components/about';
import Home from './components/home';

import PageShell from './components/PageShell'

class App extends Component {
    render() {
        return (
            <div className="App">
                <nav>
                    <ul>
                        <li> <Link to="/"> Home </Link> </li>
                        <li> <Link to="about-us"> About </Link> </li>

                    </ul>
                </nav>
                <Route path="/" exact component={PageShell(Home)}></Route>
                <Route path="/about-us" exact component={PageShell(About)}></Route>
            </div>
        );
    }
}
export default App;