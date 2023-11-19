import logo from './logo.svg';
import './App.css';
import '@material/web/all';
import 'bootstrap/dist/css/bootstrap.css';
import { useRef, useEffect, useState } from 'react';

function App() {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const myRef = useRef(0);

  useEffect(() => {
    myRef.current.addEventListener('change', handleChange);
  });

  const handleChange = (event) =>{
    setActiveTabIndex(event.target.activeTabIndex);
  }

  return (
    <div class='container-fluid' id='container'>
      <div class='container-fluid'>
        <ul class='navbar-nav'>
          <md-tabs id='tabs' ref={myRef}>
            <md-secondary-tab class='tabs' id='home-tab' aria-controls='menu-panel' active>Home</md-secondary-tab>
            <md-secondary-tab class='tabs' id='play-tab' aria-controls='play-panel'>Play</md-secondary-tab>
            <md-secondary-tab class='tabs' id='stats-tab' aria-controls='stats-panel'>Statistics</md-secondary-tab>
          </md-tabs>
        </ul>
      </div>

          <div class='container-fluid m-3' id='home-panel' role='tabpanel' aria-label='home-tab' hidden={activeTabIndex !== 0}>

          </div>
          <div id='play-panel' role='tabpanel' aria-label='play-tab' hidden={activeTabIndex !== 1}>
            <p>proba 2</p>
          </div>

          <div id='stats-panel' class='container-fluid' role='tabpanel' aria-label='stats-tab' hidden={activeTabIndex !== 2}>
            <div class='jumbotron jumbotron-fluid'>
                <h1 class="display-4 text-center mt-3" id='text'>Welcome!</h1>
                <p class='lead text-center' id='text'>We appreaciate your enthusiasm but you need to log in or register first!</p>
                <p class='lead text-center' id='text'>You can log in by clicking the appropriate button below and filling in the form!</p>

                <div class='container-fluid'>
                  <div class='row justify-content-md-center'>
                    <div class='col-md-auto text-center mt-3'>
                      <md-filled-tonal-button id='button'>Log in</md-filled-tonal-button>
                    </div>
                    
                    <div class='col-md-auto text-center mt-3'>
                      <md-filled-tonal-button id='button'>Register</md-filled-tonal-button>
                    </div>
                  </div>
                </div>
            </div>
          </div>
    </div>
  );
}

export default App;