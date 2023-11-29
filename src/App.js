  //import logo from './logo.svg';
  import React from 'react';
  import './App.css';
  import '@material/web/all';
  import 'bootstrap/dist/css/bootstrap.css';
  import { useRef, useEffect, useState } from 'react';
  import LoginModal from './LoginModal';
  import HomePanel from './HomePanel';
  import PlayPanel from './PlayPanel';
  import ProfilePanel from './ProfilePanel';

  function App() {
    const [activeTabIndex, setActiveTabIndex] = useState(0);
    const myRef = useRef(0);
    const [showLogin, setShowLogin] = useState(false);

    useEffect(() => {
      myRef.current.addEventListener('change', handleChange);
    });

    const handleChange = (event) =>{
      setActiveTabIndex(event.target.activeTabIndex);
    }
    
    const handleLoginClick = () =>{
      setShowLogin(true);
    }


    const handleCloseLogin = () =>{
      setShowLogin(false);
    }

    return (
    <>
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

        <div className='container-fluid' id='home-panel' role='tabpanel' aria-label='home-tab' hidden={activeTabIndex !== 0}>
          <HomePanel/>
        </div>   

        <div className="container-fluid" id='play-panel' role='tabpanel' aria-label='play-tab' hidden={activeTabIndex !== 1}>
          <PlayPanel/>
        </div>

        <div id='profile-panel' className='container-fluid' role='tabpanel' aria-label='stats-tab' hidden={activeTabIndex !== 2}>
          <ProfilePanel/>
        </div>

      </div>
    </>
    );
  }

  export default App;