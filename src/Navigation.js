/* eslint-disable no-unused-vars */
//import logo from './logo.svg';
import React from 'react';
import './App.css';
import '@material/web/all';
import 'bootstrap/dist/css/bootstrap.css';
import { useRef, useEffect, useState } from 'react';
import HomePanel from './HomePanel';
import PlayPanel from './PlayPanel';
import ProfilePanel from './ProfilePanel';
import Questions from './Questions';
import Results from './Results';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';

function Navigation() {
  const navigate = useNavigate();
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const tabRef = useRef();

  useEffect(() => {
    const handleChange = (event) => {
      setActiveTabIndex(event.target.activeTabIndex);
      switch (event.target.activeTabIndex) {
        case 0:
          navigate('/');
          break;
        case 1:
          navigate('/play');
          break;
        case 2:
          navigate('/profile');
          break;
        default:
          break;
      }
    };

    const currentTabRef = tabRef.current;
    currentTabRef.addEventListener('change', handleChange);

    return () => {
      currentTabRef.removeEventListener('change', handleChange);
    };
  }, [navigate]);


  return (
    <div className='container-fluid' id='container'>
      <div className='container-fluid'>
        <ul className='navbar-nav'>
          <md-tabs id='tabs' ref={tabRef}>
            <md-secondary-tab id='tabs' aria-controls='home-panel' active><p className='lead' id='text'>Home</p></md-secondary-tab>
            <md-secondary-tab id='tabs' aria-controls='play-panel'><p className='lead' id='text'>Play</p></md-secondary-tab>
            <md-secondary-tab id='tabs' aria-controls='profile-panel'><p className='lead' id='text'>Profile</p></md-secondary-tab>
          </md-tabs>
        </ul>
      </div>

      <Routes>
        <Route path="/play" element={<div className='container-fluid'><PlayPanel/></div>} />
        <Route path="/play/quiz" element={<div className='container-fluid'><Questions/></div>} />
        <Route path="/play/quiz/results" element={<div className='container-fluid'><Results/></div>} />
        <Route path="/profile" element={<div className='container-fluid'><ProfilePanel/></div>} />
        <Route path="/" element={<div className='container-fluid'><HomePanel/></div>} />
    </Routes>
    </div>
  );
}

export default Navigation;