import React, { Component } from 'react';
//import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
//import rd3 from 'react-d3-library'
import Nav from "./components/Nav";
import InputFormGroup from "./pages/InputFormGroup";
import './App.css';
import Login from './components/Login/Login';
import logo from './SpotOn.svg';
import SVGChart from './pages/Viz/Viz1.js';
import glucosedataimport from './pages/Viz/glucoseData.json'
//import chartData from './pages/Viz/data.tsv';

const testdata = glucosedataimport;
const testwidth = 960;
const testheight = 500;

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />  
        </div>
        <Nav />
        <InputFormGroup />
        <Login />
        <SVGChart data={testdata} width={testwidth} height={testheight}/>
      </div>
    );
  }
}

export default App;

