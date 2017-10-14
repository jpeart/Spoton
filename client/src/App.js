import React, { Component } from 'react';
import MainLayout from "./pages/MainLayout";
import Nav from "./components/Nav";
import logo from './logo.svg';
import './App.css';
import Login from './components/Login/Login';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Login className="App-intro"/>
        <MainLayout />
      </div>
    );
  }
}

export default App;

