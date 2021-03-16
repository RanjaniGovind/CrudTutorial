import React from 'react';
import logo from './logo.svg';
import './App.css';
import './App.css';  
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';  
import GetTutorial from './CRUD/GetTutorial'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <GetTutorial/>
      </header>
    </div>
  );
}

export default App;
