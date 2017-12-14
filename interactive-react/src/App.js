// ./src/App.js
import { Route } from 'react-router-dom';
import React, { Component } from 'react';
import Subscribe from './components/Subscribe'
import ThankYou from './components/ThankYou'
import PageShell from './components/PageShell'
class App extends Component {
    render() {
        return (
            <div className="App">
                <Route path="/" exact component={PageShell(Subscribe)}></Route>
                <Route path="/thanks" exact component={PageShell(ThankYou)}></Route>
            </div>
        );
    }
}
export default App;