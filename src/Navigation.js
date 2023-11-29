//import logo from './logo.svg';
import React from 'react';
import './App.css';
import '@material/web/all';
import 'bootstrap/dist/css/bootstrap.css';
import { useRef, useEffect, useState } from 'react';
import HomePanel from './HomePanel';
import PlayPanel from './PlayPanel';
import ProfilePanel from './ProfilePanel';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';

function Navigation() {
  const navigate = useNavigate();
  const [setActiveTabIndex] = useState(0);
  const myRef = useRef(0);

  useEffect(() => {
    myRef.current.addEventListener('change', handleChange);
  });

  const handleChange = (event) =>{
    setActiveTabIndex(event.target.activeTabIndex);
    switch (event.target.activeTabIndex) {
      case 0:
        navigate("/");
        break;
      case 1:
        navigate("/play");
        break;
      case 2:
        navigate("/profile");
        break;
      default:
        break;
    }
  }

  return (
    <div className='container-fluid' id='container'>
      <div className='container-fluid'>
        <ul className='navbar-nav'>
          <md-tabs id='tabs' ref={myRef}>
            <md-secondary-tab id='tabs' aria-controls='home-panel' active>Home</md-secondary-tab>
            <md-secondary-tab id='tabs' aria-controls='play-panel'>Play</md-secondary-tab>
            <md-secondary-tab id='tabs' aria-controls='profile-panel'>Profile</md-secondary-tab>
          </md-tabs>
        </ul>
      </div>

      <Routes>
        <Route path="/play" element={<PlayPanel/>} />
        <Route path="/profile" element={<ProfilePanel/>} />
        <Route path="/" element={<HomePanel/>} />
      </Routes>
    </div>
  );
}

export default Navigation;