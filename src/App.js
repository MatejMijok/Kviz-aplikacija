  //import logo from './logo.svg';
  import React from 'react';
  import './App.css';
  import '@material/web/all';
  import 'bootstrap/dist/css/bootstrap.css';
  import { useRef, useEffect, useState } from 'react';
  import ConfigureModal from './ConfigureModal';
  import LoginModal from './LoginModal';

  function App() {
    const [activeTabIndex, setActiveTabIndex] = useState(0);
    const myRef = useRef(0);
    const [showConfiguration, setShowConfiguration] = useState(false);
    const [showLogin, setShowLogin] = useState(false);

    const handleConfigurationClick = () => {
      setShowConfiguration(true);
    }

    useEffect(() => {
      myRef.current.addEventListener('change', handleChange);
    });

    const handleChange = (event) =>{
      setActiveTabIndex(event.target.activeTabIndex);
    }
    
    const handleCloseConfiguration = () => {
      setShowConfiguration(false);
    };
    
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
              <md-secondary-tab id='tabs' aria-controls='menu-panel' active>Home</md-secondary-tab>
              <md-secondary-tab id='tabs' aria-controls='play-panel'>Play</md-secondary-tab>
              <md-secondary-tab id='tabs' aria-controls='stats-panel'>Statistics</md-secondary-tab>
            </md-tabs>
          </ul>
        </div>

            <div className='container-fluid' id='home-panel' role='tabpanel' aria-label='home-tab' hidden={activeTabIndex !== 0}>
              <div className='jumbotron jumbotron-fluid'>
                <h1 className='display-4 text-center mt-3 w-100' id='text'>Welcome to the Quiz!</h1>
                <p className='lead text-center' id='text'>Press the "Play" button to start playing</p>
                <p className='lead text-center' id='text'>or press the "Configure" button to adjust settings!</p>
              </div>

              <div className='container-fluid d-flex align-items-center justify-content-center'>    
                <div className='d-flex flex-column text-center'>
                  <md-filled-button id='primaryButton' class='mt-3'>Play</md-filled-button>
                  <md-filled-tonal-button 
                  id='secondaryTonalButton'
                  class='mt-3' 
                  onClick={handleConfigurationClick}
                  >Configure</md-filled-tonal-button>
                </div>
              </div>    
              <ConfigureModal show={showConfiguration} handleClose={handleCloseConfiguration} />

            </div>


            <div id='play-panel' role='tabpanel' aria-label='play-tab' hidden={activeTabIndex !== 1}>
              <p className='lead text-center' id='text'>Work in progress</p>
            </div>


            <div id='stats-panel' className='container-fluid' role='tabpanel' aria-label='stats-tab' hidden={activeTabIndex !== 2}>
              <div className='jumbotron jumbotron-fluid'>
                  <h1 className="display-4 text-center mt-3" id='text'>Welcome!</h1>
                  <p className='lead text-center' id='text'>We appreaciate your enthusiasm but you need to log in or register first!</p>
                  <p className='lead text-center' id='text'>You can log in by clicking the appropriate button below and filling in the form!</p>
              

              <div className='container-fluid d-flex align-items-center justify-content-center'>
                  <div className='d-flex flex-column text-center'>
                    <md-filled-tonal-button id='primaryTonalButton' onClick={handleLoginClick} class='mt-3'>Log in</md-filled-tonal-button>
                    <md-filled-tonal-button id='primaryTonalButton' class='mt-3'>Register</md-filled-tonal-button>
                  </div>
                </div>

                <LoginModal show={showLogin} handleClose={handleCloseLogin} />
              </div>
            </div>
        </div>
    </>
    );
  }

  export default App;