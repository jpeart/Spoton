import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './components/login/Login';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </div>
        <Login className="App-intro"/>
      </div>
    );
  }
}

export default App;
