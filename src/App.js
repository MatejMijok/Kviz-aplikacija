//import logo from './logo.svg';
import React from 'react';
import './App.css';
import '@material/web/all';
import 'bootstrap/dist/css/bootstrap.css';
import Navigation from './Navigation';
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Navigation/>
    </Router>
  );
}

export default App;
