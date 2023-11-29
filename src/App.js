//import logo from './logo.svg';
import React from 'react';
import './App.css';
import '@material/web/all';
import 'bootstrap/dist/css/bootstrap.css';
import { useRef, useEffect, useState } from 'react';
import HomePanel from './HomePanel';
import PlayPanel from './PlayPanel';
import ProfilePanel from './ProfilePanel';
import Navigation from './Navigation';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Navigation />
    </Router>
  );
}

export default App;
