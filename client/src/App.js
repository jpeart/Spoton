import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import InputFormGroup from "./pages/InputFormGroup";
import './App.css';
import Login from './components/Login/Login';
import logo from './SpotOnLogo.svg';
import logotext from './SpotOnText.svg';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <img src={logotext} className="App-logo-text" alt="logo-text" />
          </div>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/users/:id" component={InputFormGroup} user="Wilfred Brimley"/>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
