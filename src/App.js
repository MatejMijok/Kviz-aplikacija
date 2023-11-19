  //import logo from './logo.svg';
  import './App.css';
  import '@material/web/all';
  import 'bootstrap/dist/css/bootstrap.css';
  import { useRef, useEffect, useState } from 'react';
  import ConfigureModal from './ConfigureModal';

  function App() {
    const [activeTabIndex, setActiveTabIndex] = useState(0);
    const myRef = useRef(0);
    const [showConfiguration, setShowConfiguration] = useState(false);

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

    return (
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

              <div className='d-flex align-items-center justify-content-center'>
                <md-filled-button id='primaryButton'>Play</md-filled-button>
              </div>     
              <div className='d-flex align-items-center justify-content-center mt-3'>
                <md-filled-tonal-button 
                id='secondaryTonalButton' 
                onClick={handleConfigurationClick}
                >Configure</md-filled-tonal-button>
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
              </div>

              <div className='container-fluid'>
                  <div className='row justify-content-md-center'>
                    <div className='col-md-auto text-center mt-3'>
                      <md-filled-tonal-button id='primaryTonalButton'>Log in</md-filled-tonal-button>
                    </div>
                      
                    <div className='col-md-auto text-center mt-3'>
                      <md-filled-tonal-button id='primaryTonalButton'>Register</md-filled-tonal-button>
                    </div>
                  </div>
                </div>
            </div>
        </div>
    );
  }

  export default App;