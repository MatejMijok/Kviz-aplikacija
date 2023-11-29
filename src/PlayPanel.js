  //import logo from './logo.svg';
  import React from 'react';
  import './App.css';
  import '@material/web/all';
  import 'bootstrap/dist/css/bootstrap.css';
  import { useState } from 'react';
  import ConfigureModal from './ConfigureModal';

  function PlayPanel() {
    const [showConfiguration, setShowConfiguration] = useState(false);
    
    const handleConfigurationClick = () => {
        setShowConfiguration(true);
      }

    const handleCloseConfiguration = () => {
        setShowConfiguration(false);
      };
    return (
    <>
              <div className='jumbotron jumbotron-fluid'>
                <h1 className='display-4 text-center mt-5 w-100' id='text'>Welcome to the Quiz!</h1>
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
    </>
    );
  }

  export default PlayPanel;